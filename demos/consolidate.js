/**
 * Consolidates multi-file prototype portals into single HTML files.
 * Each screen's HTML is base64-encoded and decoded at runtime via iframe.srcdoc.
 *
 * Usage: node consolidate.js
 * Output: cremologix/demo-{portal}.html for each portal
 */

const fs = require('fs');
const path = require('path');

const ARCHIVE = path.resolve(__dirname, '../../Archive/CremoLogix-Prototype');
const OUTPUT = path.resolve(__dirname, 'cremologix');

// Portal definitions — mirrors the SCREENS arrays from the demo shells
const PORTALS = [
  {
    id: 'borrower',
    title: 'Borrower Experience',
    header: 'Borrower Experience Screens',
    screens: [
      { file: 'borrower/B-01-landing.html', name: 'Landing & Easy Apply', icon: '\u{1F3E0}' },
      { file: 'borrower/B-02-confirmation.html', name: 'Application Confirmation', icon: '\u2705' },
      { file: 'borrower/B-03-holding-message.html', name: 'Holding Message', icon: '\u23F3' },
      { file: 'borrower/B-04-kyc-verification.html', name: 'KYC Verification', icon: '\u{1F510}' },
      { file: 'borrower/B-05-kyc-confirmation.html', name: 'KYC Confirmation', icon: '\u2713' },
      { file: 'borrower/B-06-login.html', name: 'Login', icon: '\u{1F511}' },
      { file: 'borrower/B-07-dashboard.html', name: 'Dashboard', icon: '\u{1F4CA}' },
      { file: 'borrower/B-08-preliminary-term-sheet.html', name: 'Preliminary Term Sheet', icon: '\u{1F4CB}' },
      { file: 'borrower/B-09-conversational-collection.html', name: 'Document Collection', icon: '\u{1F4AC}' },
      { file: 'borrower/B-10-final-term-sheet.html', name: 'Final Term Sheet', icon: '\u{1F4C4}' },
      { file: 'borrower/B-11-esignature.html', name: 'E-Signature', icon: '\u270D\uFE0F' },
      { file: 'borrower/B-12-post-closing-dashboard.html', name: 'Post-Closing Dashboard', icon: '\u{1F389}' },
      { file: 'borrower/B-13-education-portal.html', name: 'Education Portal', icon: '\u{1F4DA}' },
      { file: 'borrower/B-14-vendor-marketplace.html', name: 'Vendor Marketplace', icon: '\u{1F3EA}' },
      { file: 'borrower/B-15-messaging.html', name: 'Messaging', icon: '\u2709\uFE0F' },
      { file: 'borrower/B-16-profile-settings.html', name: 'Profile & Settings', icon: '\u2699\uFE0F' },
      { file: 'borrower/B-17-broker-referred-welcome.html', name: 'Broker-Referred Welcome', icon: '\u{1F91D}' },
    ]
  },
  {
    id: 'denied',
    title: 'Denied Applicant',
    header: 'Denied Applicant Screens',
    screens: [
      { file: 'denied/D-01-denied-dashboard.html', name: 'Dashboard', icon: '\u{1F4CA}' },
      { file: 'denied/D-02-subscription-management.html', name: 'Subscription Management', icon: '\u{1F4E8}' },
      { file: 'denied/D-03-credit-repair-resources.html', name: 'Credit Repair Resources', icon: '\u{1F527}' },
      { file: 'denied/D-04-requalification-progress.html', name: 'Re-Qualification Progress', icon: '\u{1F4C8}' },
      { file: 'denied/D-05-reapply.html', name: 'Reapply', icon: '\u{1F504}' },
    ]
  },
  {
    id: 'broker',
    title: 'Broker Portal',
    header: 'Broker Portal Screens',
    screens: [
      { file: 'broker/BK-01-login.html', name: 'Login', icon: '\u{1F511}' },
      { file: 'broker/BK-02-dashboard.html', name: 'Dashboard', icon: '\u{1F4CA}' },
      { file: 'broker/BK-03-new-submission.html', name: 'New Submission', icon: '\u{1F4DD}' },
      { file: 'broker/BK-04-packet-incomplete.html', name: 'Packet Incomplete', icon: '\u{1F4CB}' },
      { file: 'broker/BK-05-deal-detail.html', name: 'Deal Detail', icon: '\u{1F50D}' },
      { file: 'broker/BK-06-notifications.html', name: 'Notifications', icon: '\u{1F514}' },
      { file: 'broker/BK-07-settings.html', name: 'Profile & Settings', icon: '\u2699\uFE0F' },
    ]
  },
  {
    id: 'intake',
    title: 'Intake Agent',
    header: 'Intake Agent Screens',
    screens: [
      { file: 'intake/IA-01-review-queue.html', name: 'Review Queue', icon: '\u{1F4CB}' },
      { file: 'intake/IA-02-deal-review.html', name: 'Deal Review', icon: '\u{1F50D}' },
      { file: 'intake/IA-03-completed-reviews.html', name: 'Completed Reviews', icon: '\u2705' },
      { file: 'intake/IA-04-settings.html', name: 'Settings', icon: '\u2699\uFE0F' },
    ]
  },
  {
    id: 'underwriter',
    title: 'Underwriter',
    header: 'Underwriter Screens',
    screens: [
      { file: 'underwriter/UW-01-dashboard.html', name: 'Dashboard', icon: '\u{1F4CA}' },
      { file: 'underwriter/UW-02-deal-detail-feed.html', name: 'Deal Detail', icon: '\u{1F50D}' },
      { file: 'underwriter/UW-03-financial-analysis.html', name: 'Financial Analysis', icon: '\u{1F4B0}' },
      { file: 'underwriter/UW-04-manual-analysis.html', name: 'Manual Analysis', icon: '\u270F\uFE0F' },
      { file: 'underwriter/UW-05-escalation-create.html', name: 'Create Escalation', icon: '\u26A0\uFE0F' },
      { file: 'underwriter/UW-06-escalation-response.html', name: 'Escalation Response', icon: '\u{1F4AC}' },
      { file: 'underwriter/UW-07-credit-memo.html', name: 'Credit Memo Review', icon: '\u{1F4DD}' },
      { file: 'underwriter/UW-08-route-questions.html', name: 'Route Questions', icon: '\u2753' },
      { file: 'underwriter/UW-09-virtual-workpapers.html', name: 'Virtual Workpapers', icon: '\u{1F4C2}' },
      { file: 'underwriter/UW-10-case-history.html', name: 'Case History', icon: '\u{1F4C5}' },
    ]
  },
  {
    id: 'cm',
    title: 'Credit Manager',
    header: 'Credit Manager Screens',
    screens: [
      { file: 'cm/CM-01-manager-dashboard.html', name: 'Manager Dashboard', icon: '\u{1F4CA}' },
      { file: 'cm/CM-02-case-assignment.html', name: 'Case Assignment', icon: '\u{1F465}' },
      { file: 'cm/CM-03-escalation-review.html', name: 'Escalation Review', icon: '\u26A0\uFE0F' },
      { file: 'cm/CM-04-final-review.html', name: 'Final Review', icon: '\u2705' },
      { file: 'cm/CM-05-all-deals.html', name: 'All Deals', icon: '\u{1F4CB}' },
      { file: 'cm/CM-06-team-performance.html', name: 'Team Performance', icon: '\u{1F3C6}' },
    ]
  },
  {
    id: 'external',
    title: 'External Funding',
    header: 'External Funding Screens',
    screens: [
      { file: 'external/EF-01-login.html', name: 'Login', icon: '\u{1F511}' },
      { file: 'external/EF-02-review-dashboard.html', name: 'Review Dashboard', icon: '\u{1F4CA}' },
      { file: 'external/EF-03-deal-review.html', name: 'Deal Review', icon: '\u{1F50D}' },
      { file: 'external/EF-04-decision-actions.html', name: 'Decision', icon: '\u2705' },
    ]
  },
  {
    id: 'finops',
    title: 'FinOps Resource',
    header: 'FinOps Resource Screens',
    screens: [
      { file: 'finops/FO-01-login.html', name: 'Login', icon: '\u{1F511}' },
      { file: 'finops/FO-02-dashboard.html', name: 'Dashboard', icon: '\u{1F4CA}' },
      { file: 'finops/FO-03-client-profile.html', name: 'Client Profile', icon: '\u{1F464}' },
      { file: 'finops/FO-04-financial-data.html', name: 'Financial Data', icon: '\u{1F4B0}' },
      { file: 'finops/FO-05-covenant-compliance.html', name: 'Covenant Compliance', icon: '\u{1F4CB}' },
      { file: 'finops/FO-06-gap-analysis.html', name: 'Gap Analysis', icon: '\u{1F50D}' },
      { file: 'finops/FO-07-messaging.html', name: 'Messaging', icon: '\u2709\uFE0F' },
      { file: 'finops/FO-08-notes.html', name: 'Notes', icon: '\u{1F4DD}' },
    ]
  },
  {
    id: 'admin',
    title: 'Administrator',
    header: 'Administrator Screens',
    screens: [
      { file: 'admin/AD-01-dashboard.html', name: 'Dashboard', icon: '\u{1F4CA}' },
      { file: 'admin/AD-02-loan-products.html', name: 'Loan Products', icon: '\u{1F4B3}' },
      { file: 'admin/AD-03-scoring-config.html', name: 'Scoring Configuration', icon: '\u{1F3AF}' },
      { file: 'admin/AD-04-workflow-config.html', name: 'Workflow Configuration', icon: '\u{1F504}' },
      { file: 'admin/AD-05-document-checklists.html', name: 'Document Checklists', icon: '\u{1F4CB}' },
      { file: 'admin/AD-06-notification-templates.html', name: 'Notification Templates', icon: '\u{1F514}' },
      { file: 'admin/AD-07-user-management.html', name: 'User Management', icon: '\u{1F465}' },
      { file: 'admin/AD-08-integration-management.html', name: 'Integration Management', icon: '\u{1F517}' },
      { file: 'admin/AD-09-system-parameters.html', name: 'System Parameters', icon: '\u2699\uFE0F' },
      { file: 'admin/AD-10-credit-memo-templates.html', name: 'Memo Templates', icon: '\u{1F4DD}' },
      { file: 'admin/AD-11-cdfi-reporting.html', name: 'CDFI Reporting', icon: '\u{1F4C8}' },
      { file: 'admin/AD-12-fair-lending-analytics.html', name: 'Fair Lending Analytics', icon: '\u2696\uFE0F' },
      { file: 'admin/AD-13-audit-trail.html', name: 'Audit Trail', icon: '\u{1F50D}' },
      { file: 'admin/AD-14-admin-settings.html', name: 'Admin Settings', icon: '\u{1F6E0}\uFE0F' },
    ]
  }
];

function buildPortal(portal) {
  // Read all screen files and base64 encode
  const screenData = portal.screens.map((screen, i) => {
    const filePath = path.join(ARCHIVE, screen.file);
    let html;
    try {
      html = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      console.warn(`  WARN: ${screen.file} not found, using placeholder`);
      html = `<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#666"><h2>${screen.name} — screen not found</h2></body></html>`;
    }
    const b64 = Buffer.from(html, 'utf8').toString('base64');
    return { ...screen, b64 };
  });

  // Build the SCREENS JS array
  const screensJS = screenData.map((s, i) =>
    `  { name: ${JSON.stringify(s.name)}, icon: ${JSON.stringify(s.icon)}, b64: ${JSON.stringify(s.b64)} }`
  ).join(',\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CremoLogix - ${portal.title} Demo</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; overflow: hidden; font-family: 'Segoe UI', system-ui, sans-serif; }
  #demo-bar { height: 40px; background: #1E3A5F; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; font-size: 14px; z-index: 100; position: relative; }
  #demo-bar .left { display: flex; align-items: center; min-width: 0; flex-shrink: 1; }
  #demo-bar .title { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  #demo-bar .back-btn { background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.25); color: #fff; height: 28px; padding: 0 12px; border-radius: 4px; cursor: pointer; font-size: 13px; font-family: inherit; display: flex; align-items: center; gap: 6px; transition: background .15s; text-decoration: none; margin-right: 12px; flex-shrink: 0; white-space: nowrap; }
  #demo-bar .back-btn:hover { background: rgba(255,255,255,.22); }
  #demo-bar .indicator { position: absolute; left: 50%; transform: translateX(-50%); opacity: .85; font-size: 13px; }
  #demo-bar .nav-btns { display: flex; gap: 6px; }
  #demo-bar .nav-btns button { background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.25); color: #fff; width: 32px; height: 28px; border-radius: 4px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: background .15s; }
  #demo-bar .nav-btns button:hover { background: rgba(255,255,255,.22); }
  #demo-bar .nav-btns button:disabled { opacity: .35; cursor: default; }
  #frame-wrap { position: relative; height: calc(100vh - 40px); background: #f0f0f0; }
  #app-frame { width: 100%; height: 100%; border: none; display: block; }
  #fade-overlay { position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none; transition: opacity .18s ease; }
  #fade-overlay.active { opacity: 1; }
  #navigator { position: fixed; bottom: 16px; right: 16px; z-index: 200; width: 280px; background: #1E3A5F; color: #fff; border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,.35); overflow: hidden; transition: transform .25s ease, opacity .25s ease; transform-origin: bottom right; max-height: 70vh; display: flex; flex-direction: column; }
  #navigator.collapsed { transform: scale(0); opacity: 0; pointer-events: none; }
  #nav-header { padding: 12px 14px 8px; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; opacity: .7; flex-shrink: 0; }
  #nav-list { list-style: none; padding: 6px 0; overflow-y: auto; flex: 1; }
  #nav-list li button { width: 100%; background: none; border: none; color: #fff; text-align: left; padding: 9px 14px 9px 42px; cursor: pointer; font-size: 13px; font-family: inherit; transition: background .12s; display: block; position: relative; }
  #nav-list li button:hover { background: rgba(255,255,255,.08); }
  #nav-list li button.active { background: #2D7DD2; font-weight: 600; }
  #nav-list li button .icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 20px; text-align: center; font-size: 14px; }
  #nav-list li button .num { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 11px; opacity: .5; }
  #nav-toggle { position: fixed; bottom: 16px; right: 16px; z-index: 201; width: 44px; height: 44px; border-radius: 50%; background: #1E3A5F; color: #fff; border: 2px solid rgba(255,255,255,.2); font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,.3); transition: background .15s; }
  #nav-toggle:hover { background: #2D7DD2; }
</style>
</head>
<body>
<div id="demo-bar">
  <div class="left">
    <a class="back-btn" href="../cremologix.html">&#8592; All Portals</a>
    <span class="title">${portal.title}</span>
  </div>
  <span class="indicator" id="screen-indicator"></span>
  <div class="nav-btns">
    <button id="btn-prev" title="Previous">&#8592;</button>
    <button id="btn-next" title="Next">&#8594;</button>
  </div>
</div>
<div id="frame-wrap">
  <iframe id="app-frame"></iframe>
  <div id="fade-overlay"></div>
</div>
<div id="navigator" class="collapsed">
  <div id="nav-header">${portal.header}</div>
  <ul id="nav-list"></ul>
</div>
<button id="nav-toggle" title="Toggle navigator (Esc)">&#9776;</button>
<script>
const SCREENS = [
${screensJS}
];
let current = 0;
const frame = document.getElementById('app-frame');
const fade = document.getElementById('fade-overlay');
const indicator = document.getElementById('screen-indicator');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const nav = document.getElementById('navigator');
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

SCREENS.forEach((s, i) => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.innerHTML = '<span class="icon">' + s.icon + '</span>' + s.name + '<span class="num">' + (i+1) + '</span>';
  btn.addEventListener('click', () => goTo(i));
  btn.dataset.index = i;
  li.appendChild(btn);
  navList.appendChild(li);
});

function goTo(index) {
  if (index < 0 || index >= SCREENS.length) return;
  fade.classList.add('active');
  setTimeout(() => {
    current = index;
    frame.srcdoc = atob(SCREENS[current].b64);
    updateUI();
    setTimeout(() => fade.classList.remove('active'), 80);
  }, 180);
}

function updateUI() {
  indicator.textContent = (current+1) + ' / ' + SCREENS.length + ' \\u2014 ' + SCREENS[current].name;
  btnPrev.disabled = current === 0;
  btnNext.disabled = current === SCREENS.length - 1;
  navList.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === current));
}

btnPrev.addEventListener('click', () => goTo(current - 1));
btnNext.addEventListener('click', () => goTo(current + 1));
navToggle.addEventListener('click', () => nav.classList.toggle('collapsed'));
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'Escape') nav.classList.toggle('collapsed');
});

frame.srcdoc = atob(SCREENS[0].b64);
updateUI();
<\/script>
</body>
</html>`;
}

// Main
if (!fs.existsSync(OUTPUT)) {
  fs.mkdirSync(OUTPUT, { recursive: true });
}

let totalScreens = 0;
for (const portal of PORTALS) {
  process.stdout.write(`Building ${portal.id} (${portal.screens.length} screens)... `);
  const html = buildPortal(portal);
  const outPath = path.join(OUTPUT, `demo-${portal.id}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  const sizeKB = Math.round(html.length / 1024);
  console.log(`${sizeKB} KB`);
  totalScreens += portal.screens.length;
}

console.log(`\nDone: ${PORTALS.length} portals, ${totalScreens} screens consolidated into ${OUTPUT}`);
