#!/usr/bin/env node
/**
 * Build script: generates a static version of the Crucible dashboard
 * for GitHub Pages deployment. Reads all PMO data and embeds it into
 * a self-contained index.html.
 */

const fs = require('fs');
const path = require('path');

const PMO_ROOT = path.resolve('C:/projects/pmo');
const DIST = path.join(__dirname, 'dist');

// --- Read PMO data (mirrors server.js /api/projects logic) ---
function buildProjectsData() {
  const indexPath = path.join(PMO_ROOT, 'index.json');
  if (!fs.existsSync(indexPath)) return {};

  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const enriched = {};

  for (const [name, meta] of Object.entries(index.projects || {})) {
    const statePath = path.join(PMO_ROOT, name, 'state.json');
    let state = null;
    if (fs.existsSync(statePath)) {
      try { state = JSON.parse(fs.readFileSync(statePath, 'utf8')); } catch {}
    }

    const docsDir = path.join(PMO_ROOT, name, 'docs');
    const deliverables = {
      discovery: fs.existsSync(path.join(docsDir, 'discovery.md')),
      specification: fs.existsSync(path.join(docsDir, 'specification.md')),
      architecture: fs.existsSync(path.join(docsDir, 'architecture.md')),
      technology: fs.existsSync(path.join(docsDir, 'technology.md')),
      buildPlan: fs.existsSync(path.join(docsDir, 'build-plan.md')),
    };

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
      ...(state ? { phase: state.phase, status: state.status } : {}),
      state,
      deliverables,
      demo,
      researchReport,
      buildProposal,
      buildPlanReport,
    };
  }

  return enriched;
}

// --- Read all markdown docs ---
function buildDocsData() {
  const docs = {};
  const indexPath = path.join(PMO_ROOT, 'index.json');
  if (!fs.existsSync(indexPath)) return docs;

  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

  for (const name of Object.keys(index.projects || {})) {
    const docsDir = path.join(PMO_ROOT, name, 'docs');
    if (!fs.existsSync(docsDir)) continue;

    for (const file of fs.readdirSync(docsDir)) {
      if (file.endsWith('.md')) {
        const key = `${name}/${file.replace('.md', '')}`;
        docs[key] = fs.readFileSync(path.join(docsDir, file), 'utf8');
      }
    }
  }

  return docs;
}

// --- Pre-generate styled doc viewer pages ---
function generateViewPages(docsData, projectsData) {
  for (const [key, md] of Object.entries(docsData)) {
    const [projectName, docSlug] = key.split('/');
    const viewDir = path.join(DIST, 'view', projectName);
    fs.mkdirSync(viewDir, { recursive: true });

    const data = projectsData[projectName];
    const displayName = data?.state?.name || data?.name || projectName;
    const description = data?.state?.description || data?.description || '';
    const docTitle = docSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${displayName} — ${docTitle}</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --navy: #1E3A5F; --blue: #2D7DD2; --green: #28A745; --amber: #F4A261;
  --red: #E63946; --light-bg: #F8F9FA; --text: #333333; --text-light: #666666;
  --border: #DEE2E6; --white: #FFFFFF;
}
@page { size: letter; margin: 0.75in; }
html { font-size: 10.5pt; }
body { font-family: system-ui, 'Segoe UI', sans-serif; color: var(--text); line-height: 1.6; background: var(--white); }
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .cover { box-shadow: none !important; } .no-print { display: none !important; } }
.cover { background: linear-gradient(135deg, #1E3A5F 0%, #0F1F33 60%, #162D4A 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; min-height: 100vh; position: relative; overflow: hidden; }
.cover::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(ellipse at 30% 20%, rgba(45,125,210,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(45,125,210,0.08) 0%, transparent 50%); pointer-events: none; }
.cover-content { position: relative; z-index: 1; max-width: 700px; }
.cover .brand-mark { font-size: 1.4rem; font-weight: 300; letter-spacing: 0.35em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 60px; border: 1px solid rgba(255,255,255,0.2); display: inline-block; padding: 10px 28px; border-radius: 4px; }
.cover h1 { font-size: 3rem; color: white; margin-bottom: 20px; font-weight: 700; letter-spacing: -0.02em; }
.cover .subtitle { font-size: 1.3rem; color: rgba(255,255,255,0.8); font-weight: 300; margin-bottom: 60px; line-height: 1.5; }
.cover .divider-line { width: 80px; height: 2px; background: var(--blue); margin: 0 auto 40px; }
.cover .meta { font-size: 0.95rem; color: rgba(255,255,255,0.6); line-height: 2; }
.cover .confidential { position: absolute; bottom: 40px; left: 0; right: 0; text-align: center; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
.page-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 56px; border-bottom: 2px solid var(--navy); font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.08em; }
.page-header .logo-text { font-weight: 700; color: var(--navy); letter-spacing: 0.15em; }
.content { padding: 48px 56px; max-width: 900px; margin: 0 auto; }
h1 { font-size: 2.4rem; color: var(--navy); font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; margin: 36px 0 16px; }
h2 { font-size: 1.6rem; color: var(--navy); font-weight: 700; letter-spacing: -0.01em; line-height: 1.3; margin: 32px 0 14px; border-bottom: 2px solid var(--blue); padding-bottom: 8px; }
h3 { font-size: 1.2rem; color: var(--navy); font-weight: 600; line-height: 1.3; margin: 24px 0 10px; }
h4 { font-size: 1.05rem; color: var(--navy); font-weight: 600; margin: 18px 0 8px; }
p { margin-bottom: 14px; line-height: 1.7; }
strong { color: var(--navy); }
ul, ol { margin-bottom: 16px; padding-left: 0; list-style: none; }
ul li, ol li { padding: 6px 0 6px 26px; position: relative; line-height: 1.6; }
ul li::before { content: '\\25B6'; position: absolute; left: 0; color: var(--blue); font-size: 0.55rem; top: 12px; }
ol { counter-reset: item; }
ol li { counter-increment: item; }
ol li::before { content: counter(item); position: absolute; left: 0; width: 22px; height: 22px; background: var(--navy); color: #fff; border-radius: 50%; font-size: 0.7rem; font-weight: 700; display: flex; align-items: center; justify-content: center; top: 8px; }
table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.92rem; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
thead th { background: var(--navy); color: white; padding: 12px 16px; text-align: left; font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid #15304D; }
tbody td { padding: 11px 16px; border: 1px solid var(--border); vertical-align: top; line-height: 1.5; }
tbody tr:nth-child(even) { background: #F8F9FA; }
tbody tr:hover { background: #EBF3FB; }
blockquote { border-left: 4px solid var(--blue); background: #EBF3FB; padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 20px 0; }
blockquote p:last-child { margin-bottom: 0; }
code { background: rgba(45,125,210,0.08); padding: 2px 7px; border-radius: 4px; font-size: 0.88rem; color: var(--blue); font-weight: 500; }
pre { background: #1b2e4a; color: #e2e8f0; padding: 20px 24px; border-radius: 10px; overflow-x: auto; margin: 20px 0; box-shadow: 0 4px 12px rgba(26,43,74,0.12); }
pre code { background: none; padding: 0; color: #e2e8f0; font-size: 0.85rem; }
hr { border: none; height: 2px; background: linear-gradient(90deg, var(--blue), transparent); margin: 32px 0; }
a { color: var(--blue); text-decoration: none; font-weight: 500; }
a:hover { text-decoration: underline; }
img { max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin: 16px 0; }
.back-link { position: fixed; top: 16px; right: 20px; z-index: 100; background: var(--navy); color: white; padding: 8px 18px; border-radius: 6px; font-size: 0.82rem; font-weight: 600; text-decoration: none; box-shadow: 0 2px 8px rgba(0,0,0,0.2); transition: background 0.15s; }
.back-link:hover { background: #264E7A; text-decoration: none; color: white; }
</style>
</head>
<body>
<a class="back-link no-print" href="../..">&#8592; Dashboard</a>
<div class="cover">
  <div class="cover-content">
    <div class="brand-mark">${displayName}</div>
    <h1>${docTitle}</h1>
    <div class="subtitle">${description.replace(/"/g, '&quot;').replace(/'/g, '&#39;')}</div>
    <div class="divider-line"></div>
    <div class="meta">${today}<br>Crucible Product Development Pipeline</div>
  </div>
  <div class="confidential">Confidential</div>
</div>
<div class="page-header no-print">
  <span class="logo-text">${displayName}</span>
  <span>${docTitle}</span>
</div>
<div class="content" id="content"></div>
<script>
  const md = ${JSON.stringify(md)};
  document.getElementById('content').innerHTML = marked.parse(md);
</script>
</body>
</html>`;

    fs.writeFileSync(path.join(viewDir, `${docSlug}.html`), html);
  }
}

// --- Generate challey report as HTML (source is markdown) ---
function generateMarkdownReport(filename, title) {
  const mdPath = path.join(PMO_ROOT, 'reports', filename);
  if (!fs.existsSync(mdPath)) return;

  const md = fs.readFileSync(mdPath, 'utf8');
  const htmlName = filename.replace('.md', '.html');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
<style>
body { font-family: system-ui, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 24px; color: #333; line-height: 1.7; }
h1 { color: #1E3A5F; border-bottom: 2px solid #2D7DD2; padding-bottom: 8px; }
h2 { color: #1E3A5F; margin-top: 28px; }
h3 { color: #1E3A5F; }
strong { color: #1E3A5F; }
table { width: 100%; border-collapse: collapse; margin: 16px 0; }
th { background: #1E3A5F; color: white; padding: 10px 14px; text-align: left; }
td { padding: 10px 14px; border: 1px solid #dee2e6; }
tr:nth-child(even) { background: #f8f9fa; }
blockquote { border-left: 4px solid #2D7DD2; background: #EBF3FB; padding: 16px 20px; margin: 16px 0; border-radius: 0 8px 8px 0; }
code { background: rgba(45,125,210,0.08); padding: 2px 6px; border-radius: 4px; color: #2D7DD2; }
</style>
</head>
<body>
<div id="content"></div>
<script>
  document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(md)});
</script>
</body>
</html>`;

  fs.writeFileSync(path.join(DIST, 'reports', htmlName), html);
}

// --- Main ---
console.log('Building static Crucible dashboard...');

const projectsData = buildProjectsData();
const docsData = buildDocsData();

console.log(`  Projects: ${Object.keys(projectsData).length}`);
console.log(`  Docs: ${Object.keys(docsData).length}`);

// Generate view pages
generateViewPages(docsData, projectsData);
console.log('  View pages generated');

// Generate markdown reports as HTML
generateMarkdownReport('challey.md', 'Challey — Project Summary Report');
console.log('  Markdown reports converted');

// Read the original index.html and patch it
const originalHtml = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf8');

// Build the embedded data script
const dataScript = `
<script>
// --- Embedded PMO data (generated by build-static.js) ---
window.__STATIC_MODE__ = true;
window.__PROJECTS_DATA__ = ${JSON.stringify({ projects: projectsData })};
window.__DOCS_DATA__ = ${JSON.stringify(docsData)};
</script>`;

// Patch the HTML:
// 1. Insert data script before the main <script> tag
// 2. Replace fetch('/api/projects') with reading embedded data
// 3. Replace fetch for docs with reading embedded data
// 4. Remove WebSocket code
// 5. Change /view/ links to relative paths

let html = originalHtml;

// Insert data script right before closing </head>
html = html.replace('</head>', dataScript + '\n</head>');

// Replace the loadProjects function to use embedded data
html = html.replace(
  /async function loadProjects\(\) \{[\s\S]*?^\s{2}\}/m,
  `async function loadProjects() {
    try {
      const data = window.__STATIC_MODE__ ? window.__PROJECTS_DATA__ : await (await fetch('/api/projects')).json();
      projects = data.projects || {};
      renderSidebar();
      if (selectedProject && projects[selectedProject]) {
        renderDetail(selectedProject);
      } else {
        renderHome();
      }
      const count = Object.keys(projects).length;
      document.getElementById('project-count').textContent =
        \`\${count} project\${count !== 1 ? 's' : ''}\`;
    } catch {
      projects = {};
      renderSidebar();
      renderHome();
    }
  }`
);

// Replace openDoc to use embedded data
html = html.replace(
  /async function openDoc\([\s\S]*?^\s{2}\}/m,
  `async function openDoc(projectName, docName, displayName) {
    try {
      let md;
      if (window.__STATIC_MODE__) {
        const key = projectName + '/' + docName;
        md = window.__DOCS_DATA__[key];
        if (!md) throw new Error('Not found');
      } else {
        const res = await fetch('/api/project/' + projectName + '/doc/' + docName);
        if (!res.ok) throw new Error('Not found');
        md = await res.text();
      }
      document.getElementById('modal-title').textContent = displayName;
      document.getElementById('modal-body').innerHTML = marked.parse(md);
      document.getElementById('modal-overlay').classList.add('open');
    } catch (err) {
      alert('Could not load document: ' + err.message);
    }
  }`
);

// Replace connectWS to be a no-op in static mode
html = html.replace(
  /function connectWS\(\) \{[\s\S]*?^\s{2}\}/m,
  `function connectWS() {
    if (window.__STATIC_MODE__) return;
    try {
      const ws = new WebSocket('ws://' + location.host + '/ws');
      ws.onmessage = () => loadProjects();
      ws.onclose = () => setTimeout(connectWS, 3000);
      ws.onerror = () => {};
    } catch {}
  }`
);

// Change /view/ links to relative paths (view/name/doc.html)
html = html.replace(
  /href="\/view\/\$\{name\}\/\$\{docName\}"/g,
  'href="view/${name}/${docName}.html"'
);

// Change /demos/ links to relative
html = html.replace(/\/demos\//g, 'demos/');
// Change /reports/ links to relative
html = html.replace(/\/reports\//g, 'reports/');

fs.writeFileSync(path.join(DIST, 'index.html'), html);
console.log('  index.html written');

// Copy logo if it exists
const logoPath = path.join(__dirname, 'cremologix-logo.svg');
if (fs.existsSync(logoPath)) {
  fs.copyFileSync(logoPath, path.join(DIST, 'cremologix-logo.svg'));
}

console.log('\nDone! Static site at: ' + DIST);
console.log('To test locally: npx serve dist');
console.log('To deploy: push dist/ to GitHub Pages');
