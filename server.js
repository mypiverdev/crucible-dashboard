const express = require('express');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const app = express();
const PORT = 3000;
const PMO_ROOT = path.resolve('C:/projects/pmo');

// --- WebSocket for live updates ---
const http = require('http');
const server = http.createServer(app);
const clients = new Set();

server.on('upgrade', (req, socket, head) => {
  if (req.url === '/ws') {
    const key = req.headers['sec-websocket-key'];
    const accept = require('crypto')
      .createHash('sha1')
      .update(key + '258EAFA5-E914-47DA-95CA-5AB9BE11CF86')
      .digest('base64');

    socket.write(
      'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      `Sec-WebSocket-Accept: ${accept}\r\n\r\n`
    );

    clients.add(socket);
    socket.on('close', () => clients.delete(socket));
    socket.on('error', () => clients.delete(socket));
  }
});

function broadcast(data) {
  const frame = Buffer.alloc(2 + Buffer.byteLength(data));
  frame[0] = 0x81;
  const len = Buffer.byteLength(data);
  frame[1] = len;
  Buffer.from(data).copy(frame, 2);
  for (const client of clients) {
    try { client.write(frame); } catch {}
  }
}

// Watch PMO for changes
if (fs.existsSync(PMO_ROOT)) {
  chokidar.watch(PMO_ROOT, {
    ignoreInitial: true,
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    depth: 3
  }).on('all', (event, filePath) => {
    broadcast(JSON.stringify({ type: 'refresh', event, file: filePath }));
  });
}

// --- Static files ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Serve demos ---
app.use('/demos', express.static(path.join(PMO_ROOT, 'demos')));

// --- Serve reports ---
app.use('/reports', express.static(path.join(PMO_ROOT, 'reports')));

// --- Serve prototype files (full project trees for demos with relative screen paths) ---
const PROTOTYPES_ROOT = path.resolve('C:/Projects');
app.use('/prototype', express.static(PROTOTYPES_ROOT));

// --- API ---

// List all projects
app.get('/api/projects', (req, res) => {
  const indexPath = path.join(PMO_ROOT, 'index.json');
  if (!fs.existsSync(indexPath)) {
    return res.json({ projects: {} });
  }

  try {
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    const enriched = {};

    for (const [name, meta] of Object.entries(index.projects || {})) {
      const statePath = path.join(PMO_ROOT, name, 'state.json');
      let state = null;
      if (fs.existsSync(statePath)) {
        try { state = JSON.parse(fs.readFileSync(statePath, 'utf8')); } catch {}
      }

      // Check which deliverables exist
      const docsDir = path.join(PMO_ROOT, name, 'docs');
      const deliverables = {
        discovery: fs.existsSync(path.join(docsDir, 'discovery.md')),
        specification: fs.existsSync(path.join(docsDir, 'specification.md')),
        architecture: fs.existsSync(path.join(docsDir, 'architecture.md')),
        technology: fs.existsSync(path.join(docsDir, 'technology.md')),
        buildPlan: fs.existsSync(path.join(docsDir, 'build-plan.md')),
      };

      // Check for demos and reports (return filename so frontend knows extension)
      const demo = fs.existsSync(path.join(PMO_ROOT, 'demos', `${name}.html`));
      const researchReport = fs.existsSync(path.join(PMO_ROOT, 'reports', `${name}.html`))
        ? `${name}.html`
        : fs.existsSync(path.join(PMO_ROOT, 'reports', `${name}.pdf`))
          ? `${name}.pdf` : null;
      const buildProposal = fs.existsSync(path.join(PMO_ROOT, 'reports', `${name}-build-proposal.html`))
        ? `${name}-build-proposal.html`
        : fs.existsSync(path.join(PMO_ROOT, 'reports', `${name}-build-proposal.pdf`))
          ? `${name}-build-proposal.pdf` : null;
      const buildPlanReport = fs.existsSync(path.join(PMO_ROOT, 'reports', `${name}-build-plan.html`))
        ? `${name}-build-plan.html`
        : fs.existsSync(path.join(PMO_ROOT, 'reports', `${name}-build-plan.pdf`))
          ? `${name}-build-plan.pdf` : null;

      enriched[name] = {
        ...meta,
        // Override phase/status from state.json (source of truth)
        ...(state ? { phase: state.phase, status: state.status } : {}),
        state,
        deliverables,
        demo,
        researchReport,
        buildProposal,
        buildPlanReport
      };
    }

    res.json({ projects: enriched });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single project detail
app.get('/api/project/:name', (req, res) => {
  const { name } = req.params;
  const statePath = path.join(PMO_ROOT, name, 'state.json');
  const docsDir = path.join(PMO_ROOT, name, 'docs');

  if (!fs.existsSync(path.join(PMO_ROOT, name))) {
    return res.status(404).json({ error: 'Project not found' });
  }

  let state = null;
  if (fs.existsSync(statePath)) {
    try { state = JSON.parse(fs.readFileSync(statePath, 'utf8')); } catch {}
  }

  // List available docs
  const docs = [];
  if (fs.existsSync(docsDir)) {
    for (const file of fs.readdirSync(docsDir)) {
      if (file.endsWith('.md')) {
        docs.push(file.replace('.md', ''));
      }
    }
  }

  // Find report files
  const reportsDir = path.join(PMO_ROOT, 'reports');
  const reports = [];
  if (fs.existsSync(reportsDir)) {
    for (const file of fs.readdirSync(reportsDir)) {
      if (file.startsWith(name)) {
        reports.push(file);
      }
    }
  }

  const demo = fs.existsSync(path.join(PMO_ROOT, 'demos', `${name}.html`));

  res.json({ name, state, docs, reports, demo });
});

// Serve raw markdown doc
app.get('/api/project/:name/doc/:doc', (req, res) => {
  const { name, doc } = req.params;
  const filePath = path.join(PMO_ROOT, name, 'docs', `${doc}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Document not found' });
  }

  const content = fs.readFileSync(filePath, 'utf8');
  res.type('text/plain').send(content);
});

// Serve styled deliverable as full HTML page
app.get('/view/:name/:doc', (req, res) => {
  const { name, doc } = req.params;
  const filePath = path.join(PMO_ROOT, name, 'docs', `${doc}.md`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Document not found');
  }

  const md = fs.readFileSync(filePath, 'utf8');

  // Read project state for metadata
  const statePath = path.join(PMO_ROOT, name, 'state.json');
  let projectName = name;
  let projectDesc = '';
  if (fs.existsSync(statePath)) {
    try {
      const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
      projectName = state.name || name;
      projectDesc = state.description || '';
    } catch {}
  }

  const docTitle = doc.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName} — ${docTitle}</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy: #1E3A5F;
  --blue: #2D7DD2;
  --green: #28A745;
  --amber: #F4A261;
  --red: #E63946;
  --light-bg: #F8F9FA;
  --text: #333333;
  --text-light: #666666;
  --border: #DEE2E6;
  --white: #FFFFFF;
}

@page { size: letter; margin: 0.75in; }
html { font-size: 10.5pt; }

body {
  font-family: system-ui, 'Segoe UI', sans-serif;
  color: var(--text);
  line-height: 1.6;
  background: var(--white);
}

@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cover { box-shadow: none !important; }
  .no-print { display: none !important; }
}

/* ===== COVER ===== */
.cover {
  background: linear-gradient(135deg, #1E3A5F 0%, #0F1F33 60%, #162D4A 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.cover::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(ellipse at 30% 20%, rgba(45,125,210,0.12) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(45,125,210,0.08) 0%, transparent 50%);
  pointer-events: none;
}
.cover-content { position: relative; z-index: 1; max-width: 700px; }
.cover .brand-mark {
  font-size: 1.4rem; font-weight: 300; letter-spacing: 0.35em;
  text-transform: uppercase; color: rgba(255,255,255,0.7);
  margin-bottom: 60px; border: 1px solid rgba(255,255,255,0.2);
  display: inline-block; padding: 10px 28px; border-radius: 4px;
}
.cover h1 { font-size: 3rem; color: white; margin-bottom: 20px; font-weight: 700; letter-spacing: -0.02em; }
.cover .subtitle { font-size: 1.3rem; color: rgba(255,255,255,0.8); font-weight: 300; margin-bottom: 60px; line-height: 1.5; }
.cover .divider-line { width: 80px; height: 2px; background: var(--blue); margin: 0 auto 40px; }
.cover .meta { font-size: 0.95rem; color: rgba(255,255,255,0.6); line-height: 2; }
.cover .confidential {
  position: absolute; bottom: 40px; left: 0; right: 0; text-align: center;
  font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.35);
}

/* ===== PAGE HEADER ===== */
.page-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 56px; border-bottom: 2px solid var(--navy);
  font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.08em;
}
.page-header .logo-text { font-weight: 700; color: var(--navy); letter-spacing: 0.15em; }

/* ===== CONTENT ===== */
.content { padding: 48px 56px; max-width: 900px; margin: 0 auto; }

/* ===== TYPOGRAPHY ===== */
h1 { font-size: 2.4rem; color: var(--navy); font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin: 36px 0 16px; }
h2 { font-size: 1.6rem; color: var(--navy); font-weight: 700; letter-spacing: -0.01em; line-height: 1.3; margin: 32px 0 14px; border-bottom: 2px solid var(--blue); padding-bottom: 8px; }
h3 { font-size: 1.2rem; color: var(--navy); font-weight: 600; line-height: 1.3; margin: 24px 0 10px; }
h4 { font-size: 1.05rem; color: var(--navy); font-weight: 600; margin: 18px 0 8px; }
p { margin-bottom: 14px; line-height: 1.7; }
strong { color: var(--navy); }

/* Lists */
ul, ol { margin-bottom: 16px; padding-left: 0; list-style: none; }
ul li, ol li { padding: 6px 0 6px 26px; position: relative; line-height: 1.6; }
ul li::before {
  content: '\\25B6'; position: absolute; left: 0;
  color: var(--blue); font-size: 0.55rem; top: 12px;
}
ol { counter-reset: item; }
ol li { counter-increment: item; }
ol li::before {
  content: counter(item); position: absolute; left: 0;
  width: 22px; height: 22px; background: var(--navy); color: #fff;
  border-radius: 50%; font-size: 0.7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; top: 8px;
}

/* Tables */
table {
  width: 100%; border-collapse: collapse; margin: 20px 0;
  font-size: 0.92rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
thead th {
  background: var(--navy); color: white; padding: 12px 16px;
  text-align: left; font-weight: 600; font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid #15304D;
}
tbody td {
  padding: 11px 16px; border: 1px solid var(--border);
  vertical-align: top; line-height: 1.5;
}
tbody tr:nth-child(even) { background: #F8F9FA; }
tbody tr:hover { background: #EBF3FB; }

/* Blockquotes as callouts */
blockquote {
  border-left: 4px solid var(--blue); background: #EBF3FB;
  padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 20px 0;
}
blockquote p:last-child { margin-bottom: 0; }

/* Code */
code {
  background: rgba(45,125,210,0.08); padding: 2px 7px;
  border-radius: 4px; font-size: 0.88rem; color: var(--blue); font-weight: 500;
}
pre {
  background: #1b2e4a; color: #e2e8f0; padding: 20px 24px;
  border-radius: 10px; overflow-x: auto; margin: 20px 0;
  box-shadow: 0 4px 12px rgba(26,43,74,0.12);
}
pre code { background: none; padding: 0; color: #e2e8f0; font-size: 0.85rem; }

/* HR */
hr { border: none; height: 2px; background: linear-gradient(90deg, var(--blue), transparent); margin: 32px 0; }

/* Links */
a { color: var(--blue); text-decoration: none; font-weight: 500; }
a:hover { text-decoration: underline; }

/* Images */
img { max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin: 16px 0; }

/* Back to dashboard link */
.back-link {
  position: fixed; top: 16px; right: 20px; z-index: 100;
  background: var(--navy); color: white; padding: 8px 18px;
  border-radius: 6px; font-size: 0.82rem; font-weight: 600;
  text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  transition: background 0.15s;
}
.back-link:hover { background: #264E7A; text-decoration: none; color: white; }
</style>
</head>
<body>

<a class="back-link no-print" href="/" onclick="window.close();return false;">&#8592; Dashboard</a>

<!-- Cover Page -->
<div class="cover">
  <div class="cover-content">
    <div class="brand-mark">${projectName}</div>
    <h1>${docTitle}</h1>
    <div class="subtitle">${projectDesc}</div>
    <div class="divider-line"></div>
    <div class="meta">
      ${today}<br>
      Crucible Product Development Pipeline
    </div>
  </div>
  <div class="confidential">Confidential</div>
</div>

<!-- Content -->
<div class="page-header no-print">
  <span class="logo-text">${projectName}</span>
  <span>${docTitle}</span>
</div>
<div class="content" id="content"></div>

<script>
  const md = ${JSON.stringify(md)};
  document.getElementById('content').innerHTML = marked.parse(md);
</script>
</body>
</html>`;

  res.type('html').send(html);
});

// --- Start ---
server.listen(PORT, () => {
  console.log(`\n  Crucible Dashboard`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  PMO: ${PMO_ROOT}`);
  console.log(`  Watching for changes...\n`);
});
