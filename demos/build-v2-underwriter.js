const fs = require('fs');
const path = require('path');

// Brand colors
const colors = {
  deepNavy: '#0A2540',
  darkTeal: '#006D77',
  warmGold: '#F4A261',
  amber: '#E76F51',
  success: '#2A9D8F',
  warning: '#F4A261',
  danger: '#E63946'
};

// Common styles used across screens
const commonStyles = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Segoe UI', system-ui, sans-serif; background: #F5F7FA; color: #1A1A2E; min-height: 100vh; }
.container { max-width: 1400px; margin: 0 auto; padding: 32px; }
.header { background: #fff; padding: 24px 32px; border-bottom: 1px solid #e9ecef; margin-bottom: 24px; }
.header h1 { font-size: 28px; font-weight: 600; color: ${colors.deepNavy}; }
.header .subtitle { font-size: 14px; color: #6C757D; margin-top: 4px; }
.card { background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); padding: 24px; margin-bottom: 20px; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
.stat-card { background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); display: flex; align-items: center; gap: 16px; }
.stat-icon { width: 48px; height: 48px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.stat-icon.blue { background: rgba(10,37,64,0.1); color: ${colors.deepNavy}; }
.stat-icon.amber { background: rgba(244,162,97,0.15); color: ${colors.warmGold}; }
.stat-icon.green { background: rgba(42,157,143,0.15); color: ${colors.success}; }
.stat-icon.purple { background: rgba(111,66,193,0.1); color: #6F42C1; }
.stat-value { font-size: 28px; font-weight: 700; color: ${colors.deepNavy}; }
.stat-label { font-size: 12px; color: #6C757D; margin-top: 4px; }
.badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
.badge.green { background: rgba(42,157,143,0.15); color: ${colors.success}; }
.badge.amber { background: rgba(244,162,97,0.15); color: ${colors.warmGold}; }
.badge.red { background: rgba(230,57,70,0.15); color: ${colors.danger}; }
.badge.gray { background: #e9ecef; color: #6C757D; }
.btn { padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; font-family: inherit; transition: all 0.2s; }
.btn-primary { background: ${colors.deepNavy}; color: #fff; }
.btn-primary:hover { background: #081d33; }
.btn-success { background: ${colors.success}; color: #fff; }
.btn-warning { background: ${colors.warmGold}; color: #fff; }
.btn-outline { background: none; border: 1px solid #dee2e6; color: #6C757D; }
.btn-outline:hover { border-color: ${colors.deepNavy}; color: ${colors.deepNavy}; }
.btn-sm { padding: 6px 14px; font-size: 12px; }
table { width: 100%; border-collapse: collapse; }
thead th { background: #F8F9FA; padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #6C757D; border-bottom: 1px solid #e9ecef; }
tbody td { padding: 14px 16px; border-top: 1px solid #f1f3f5; font-size: 14px; }
tbody tr { transition: background 0.15s; cursor: pointer; }
tbody tr:hover { background: #F8FAFB; }
.gauge { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; position: relative; }
.gauge::before { content: ''; position: absolute; inset: 4px; border-radius: 50%; background: #fff; }
.gauge .gv { position: relative; z-index: 1; }
.g-grn { background: conic-gradient(${colors.success} calc(var(--p) * 3.6deg), #e9ecef 0); }
.g-grn .gv { color: ${colors.success}; }
.g-ylw { background: conic-gradient(${colors.warmGold} calc(var(--p) * 3.6deg), #e9ecef 0); }
.g-ylw .gv { color: ${colors.warmGold}; }
.g-red { background: conic-gradient(${colors.danger} calc(var(--p) * 3.6deg), #e9ecef 0); }
.g-red .gv { color: ${colors.danger}; }
.gauge-lg { width: 80px; height: 80px; font-size: 22px; }
.gauge-lg::before { inset: 6px; }
.tabs { display: flex; gap: 0; border-bottom: 2px solid #e9ecef; margin-bottom: 24px; }
.tab { padding: 12px 24px; background: none; border: none; font-size: 14px; font-weight: 500; color: #6C757D; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; font-family: inherit; }
.tab.active { color: ${colors.deepNavy}; border-bottom-color: ${colors.deepNavy}; }
.tab:hover { color: ${colors.deepNavy}; }
`;

// Screen definitions
const screens = [];

// UW-01: Dashboard
screens.push({
  name: 'Dashboard',
  icon: '📊',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Underwriter Dashboard</title>
<style>
${commonStyles}
.welcome { margin-bottom: 24px; }
.welcome h2 { font-size: 24px; font-weight: 600; color: ${colors.deepNavy}; }
.welcome .date { font-size: 14px; color: #6C757D; margin-top: 4px; }
.filters { display: flex; gap: 12px; margin-bottom: 16px; }
.filter-btn { padding: 8px 16px; border-radius: 6px; font-size: 13px; background: #fff; border: 1px solid #dee2e6; color: #6C757D; cursor: pointer; font-family: inherit; }
.filter-btn.active { background: ${colors.deepNavy}; color: #fff; border-color: ${colors.deepNavy}; }
.sla-ok { background: rgba(42,157,143,0.15); color: ${colors.success}; }
.sla-warn { background: rgba(244,162,97,0.15); color: ${colors.warmGold}; }
.sla-breach { background: rgba(230,57,70,0.15); color: ${colors.danger}; }
.priority-high { color: ${colors.danger}; font-weight: 600; }
.priority-med { color: ${colors.warmGold}; font-weight: 500; }
.priority-low { color: #6C757D; }
</style>
</head>
<body>
<div class="container">
  <div class="welcome">
    <h2>Welcome back, Sarah</h2>
    <div class="date">Thursday, February 12, 2026</div>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-icon blue">📋</div>
      <div>
        <div class="stat-value">8</div>
        <div class="stat-label">Cases Assigned</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon amber">⏳</div>
      <div>
        <div class="stat-value">5</div>
        <div class="stat-label">Pending Review</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon green">⚡</div>
      <div>
        <div class="stat-value">2.1</div>
        <div class="stat-label">Avg Review Time (days)</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon purple">✅</div>
      <div>
        <div class="stat-value">12</div>
        <div class="stat-label">Decisions This Month</div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Case Queue</h3>

    <div class="filters">
      <button class="filter-btn active">All</button>
      <button class="filter-btn">High Priority</button>
      <button class="filter-btn">SLA Warning</button>
      <button class="filter-btn">New</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Borrower</th>
          <th>Business</th>
          <th>Amount</th>
          <th>Deal Health</th>
          <th>Days in Queue</th>
          <th>SLA Status</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>James & Tanya Richardson</strong></td>
          <td>Richardson's Kitchen & Catering</td>
          <td><strong>$185,000</strong></td>
          <td><div class="gauge g-ylw" style="--p:74"><span class="gv">74</span></div></td>
          <td>12</td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="priority-high">High</span></td>
        </tr>
        <tr>
          <td><strong>Michael Chen</strong></td>
          <td>Chen's Auto Repair</td>
          <td><strong>$125,000</strong></td>
          <td><div class="gauge g-grn" style="--p:82"><span class="gv">82</span></div></td>
          <td>8</td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="priority-med">Medium</span></td>
        </tr>
        <tr>
          <td><strong>Lisa Martinez</strong></td>
          <td>Martinez Landscaping</td>
          <td><strong>$95,000</strong></td>
          <td><div class="gauge g-grn" style="--p:78"><span class="gv">78</span></div></td>
          <td>5</td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="priority-low">Low</span></td>
        </tr>
        <tr>
          <td><strong>David Thompson</strong></td>
          <td>Thompson Construction LLC</td>
          <td><strong>$275,000</strong></td>
          <td><div class="gauge g-ylw" style="--p:68"><span class="gv">68</span></div></td>
          <td>14</td>
          <td><span class="badge sla-warn">Approaching</span></td>
          <td><span class="priority-high">High</span></td>
        </tr>
        <tr>
          <td><strong>Angela Parker</strong></td>
          <td>Parker's Pet Grooming</td>
          <td><strong>$65,000</strong></td>
          <td><div class="gauge g-grn" style="--p:85"><span class="gv">85</span></div></td>
          <td>3</td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="priority-low">Low</span></td>
        </tr>
        <tr>
          <td><strong>Robert Kim</strong></td>
          <td>Kim's Tech Solutions</td>
          <td><strong>$210,000</strong></td>
          <td><div class="gauge g-red" style="--p:42"><span class="gv">42</span></div></td>
          <td>18</td>
          <td><span class="badge sla-breach">Breached</span></td>
          <td><span class="priority-high">High</span></td>
        </tr>
        <tr>
          <td><strong>Maria Gonzalez</strong></td>
          <td>Gonzalez Bakery</td>
          <td><strong>$88,000</strong></td>
          <td><div class="gauge g-ylw" style="--p:71"><span class="gv">71</span></div></td>
          <td>9</td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="priority-med">Medium</span></td>
        </tr>
        <tr>
          <td><strong>Kevin O'Brien</strong></td>
          <td>O'Brien HVAC Services</td>
          <td><strong>$145,000</strong></td>
          <td><div class="gauge g-grn" style="--p:79"><span class="gv">79</span></div></td>
          <td>6</td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="priority-med">Medium</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>`
});

// UW-02: Case Review — Overview
screens.push({
  name: 'Case Overview',
  icon: '📄',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Case Overview</title>
<style>
${commonStyles}
.case-header { background: linear-gradient(135deg, ${colors.deepNavy}, ${colors.darkTeal}); color: #fff; padding: 32px; border-radius: 8px; margin-bottom: 24px; }
.case-header h1 { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
.case-header .details { font-size: 16px; opacity: 0.9; }
.health-score { text-align: center; margin: 24px 0; }
.health-score .score { font-size: 64px; font-weight: 700; color: ${colors.warmGold}; }
.health-score .label { font-size: 14px; color: #6C757D; text-transform: uppercase; letter-spacing: 1px; margin-top: 8px; }
.info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
.info-item { background: #F8F9FA; padding: 16px; border-radius: 6px; }
.info-item .label { font-size: 12px; color: #6C757D; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
.info-item .value { font-size: 18px; font-weight: 600; color: ${colors.deepNavy}; }
.quick-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.quick-stat { background: #fff; border: 1px solid #e9ecef; padding: 16px; border-radius: 6px; text-align: center; }
.quick-stat .value { font-size: 20px; font-weight: 700; color: ${colors.deepNavy}; }
.quick-stat .label { font-size: 11px; color: #6C757D; margin-top: 4px; text-transform: uppercase; }
</style>
</head>
<body>
<div class="container">
  <div class="case-header">
    <h1>Richardson's Kitchen & Catering LLC</h1>
    <div class="details">$185,000 | Equipment + Leasehold Improvements | 84 months</div>
  </div>

  <div class="tabs">
    <button class="tab active">Overview</button>
    <button class="tab">Mini-Dashboards</button>
    <button class="tab">Clarifications</button>
    <button class="tab">Credit Memo</button>
  </div>

  <div class="card">
    <div class="health-score">
      <div class="score">74</div>
      <div class="label">Deal Health Score</div>
    </div>
  </div>

  <div class="card">
    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Borrower Summary</h3>
    <div class="info-grid">
      <div class="info-item">
        <div class="label">Borrower</div>
        <div class="value">James & Tanya Richardson</div>
      </div>
      <div class="info-item">
        <div class="label">Location</div>
        <div class="value">Portland, OR</div>
      </div>
      <div class="info-item">
        <div class="label">Entity Type</div>
        <div class="value">LLC (formed Aug 2025)</div>
      </div>
      <div class="info-item">
        <div class="label">Business Stage</div>
        <div class="value">Early Revenue</div>
      </div>
      <div class="info-item">
        <div class="label">Tier 2 Terms Shown</div>
        <div class="value">8.50% APR | $185,000 | $2,891/mo</div>
      </div>
      <div class="info-item">
        <div class="label">Time in Pipeline</div>
        <div class="value">12 days</div>
      </div>
    </div>
  </div>

  <div class="card">
    <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Key Metrics</h3>
    <div class="quick-stats">
      <div class="quick-stat">
        <div class="value">712 / 698</div>
        <div class="label">Credit Scores</div>
      </div>
      <div class="quick-stat">
        <div class="value">28%</div>
        <div class="label">DTI</div>
      </div>
      <div class="quick-stat">
        <div class="value">1.35x</div>
        <div class="label">DSCR</div>
      </div>
      <div class="quick-stat">
        <div class="value">$41,200</div>
        <div class="label">Liquid Reserves</div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`
});

// UW-03: Mini-Dashboards (THE KEY SCREEN)
screens.push({
  name: 'Mini-Dashboards',
  icon: '📊',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mini-Dashboards</title>
<style>
${commonStyles}
.container { padding: 24px; }
.case-title { font-size: 20px; font-weight: 600; color: ${colors.deepNavy}; margin-bottom: 20px; }
.dashboards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 24px; }
.mini-dash { background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 20px; }
.mini-dash .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #e9ecef; }
.mini-dash .header h4 { font-size: 16px; font-weight: 600; color: ${colors.deepNavy}; }
.mini-dash .verdict { padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
.mini-dash .verdict.green { background: rgba(42,157,143,0.15); color: ${colors.success}; }
.mini-dash .verdict.amber { background: rgba(244,162,97,0.15); color: ${colors.warmGold}; }
.mini-dash .content { margin-bottom: 16px; font-size: 14px; line-height: 1.6; }
.mini-dash .content strong { color: ${colors.deepNavy}; }
.mini-dash .items { list-style: none; margin: 12px 0; }
.mini-dash .items li { padding: 6px 0; padding-left: 20px; position: relative; font-size: 13px; color: #495057; }
.mini-dash .items li::before { content: '✓'; position: absolute; left: 0; color: ${colors.success}; font-weight: bold; }
.mini-dash .chart { margin: 12px 0; }
.bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 80px; }
.bar { background: ${colors.success}; width: 100%; border-radius: 4px 4px 0 0; position: relative; }
.bar.down { background: ${colors.danger}; }
.delta-good { color: ${colors.success}; font-weight: 600; }
.delta-bad { color: ${colors.danger}; font-weight: 600; }
.dti-gauge { width: 120px; height: 60px; border-radius: 120px 120px 0 0; background: conic-gradient(from 180deg, ${colors.success} 0deg 100deg, ${colors.warmGold} 100deg 180deg, ${colors.danger} 180deg 270deg, #e9ecef 270deg 360deg); position: relative; margin: 16px auto; }
.dti-gauge::before { content: ''; position: absolute; inset: 8px; border-radius: 120px 120px 0 0; background: #fff; }
.dti-gauge .value { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); font-size: 20px; font-weight: 700; color: ${colors.deepNavy}; z-index: 1; }
.ratio-table { width: 100%; font-size: 13px; margin: 12px 0; }
.ratio-table td { padding: 8px 4px; border-bottom: 1px solid #f1f3f5; }
.ratio-table td:last-child { text-align: right; }
.action-bar { display: flex; gap: 8px; padding-top: 12px; border-top: 1px solid #e9ecef; }
.action-btn { padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; border: 1px solid #dee2e6; background: #fff; cursor: pointer; font-family: inherit; }
.action-btn:hover { border-color: ${colors.deepNavy}; color: ${colors.deepNavy}; }
.qa-item { background: #F8F9FA; padding: 12px; border-radius: 6px; margin-bottom: 10px; font-size: 13px; }
.qa-item .q { font-weight: 600; color: ${colors.deepNavy}; margin-bottom: 6px; }
.qa-item .a { color: #495057; }
.summary-panel { background: linear-gradient(135deg, ${colors.deepNavy}, ${colors.darkTeal}); color: #fff; padding: 24px; border-radius: 8px; }
.summary-panel h3 { font-size: 18px; margin-bottom: 16px; }
.summary-panel .summary-text { font-size: 14px; margin-bottom: 16px; opacity: 0.95; }
.summary-panel .score { font-size: 48px; font-weight: 700; margin: 16px 0; }
.summary-panel .actions { display: flex; gap: 12px; margin-top: 20px; }
.summary-panel .btn { flex: 1; }
.summary-panel textarea { width: 100%; padding: 12px; border-radius: 6px; border: none; font-family: inherit; font-size: 14px; margin-bottom: 12px; min-height: 80px; }
</style>
</head>
<body>
<div class="container">
  <div class="case-title">Richardson's Kitchen & Catering — Mini-Dashboards</div>

  <div class="dashboards-grid">
    <!-- 1. Identity & Compliance -->
    <div class="mini-dash">
      <div class="header">
        <h4>Identity & Compliance</h4>
        <span class="verdict green">✅ Verified</span>
      </div>
      <div class="content">
        KYC complete, OFAC clear, no PEP flags
        <ul class="items">
          <li>Both members verified</li>
          <li>Credit report clean</li>
        </ul>
      </div>
      <div class="action-bar">
        <button class="action-btn">Accept</button>
        <button class="action-btn">Override</button>
        <button class="action-btn">Note</button>
      </div>
    </div>

    <!-- 2. Income & Revenue -->
    <div class="mini-dash">
      <div class="header">
        <h4>Income & Revenue</h4>
        <span class="verdict green">✅ Strong</span>
      </div>
      <div class="content">
        <strong>Reported:</strong> $94K/yr → <strong>Verified:</strong> $94K/yr (catering) + $128K (personal)<br>
        <div class="chart">
          <div style="font-size: 12px; color: #6C757D; margin-bottom: 8px;">10-Month Revenue Trend</div>
          <div class="bar-chart">
            <div class="bar" style="height: 45%"></div>
            <div class="bar" style="height: 52%"></div>
            <div class="bar" style="height: 58%"></div>
            <div class="bar" style="height: 55%"></div>
            <div class="bar" style="height: 62%"></div>
            <div class="bar" style="height: 68%"></div>
            <div class="bar" style="height: 72%"></div>
            <div class="bar" style="height: 78%"></div>
            <div class="bar" style="height: 85%"></div>
            <div class="bar" style="height: 90%"></div>
          </div>
        </div>
        <strong>Delta:</strong> <span class="delta-good">0% (exact match)</span>
      </div>
      <div class="action-bar">
        <button class="action-btn">Accept</button>
        <button class="action-btn">Override</button>
        <button class="action-btn">Note</button>
        <button class="action-btn">Question</button>
      </div>
    </div>

    <!-- 3. Debt & Obligations -->
    <div class="mini-dash">
      <div class="header">
        <h4>Debt & Obligations</h4>
        <span class="verdict green">✅ Healthy</span>
      </div>
      <div class="content">
        <div class="dti-gauge">
          <div class="value">28%</div>
        </div>
        <div style="text-align: center; font-size: 12px; color: #6C757D; margin-bottom: 12px;">DTI (max 50%)</div>
        <div style="font-size: 13px;">
          <strong>Existing debts:</strong><br>
          • Auto loan: $340/mo<br>
          • Student loan: $280/mo<br>
          <strong>Proposed payment:</strong> $2,891/mo
        </div>
      </div>
      <div class="action-bar">
        <button class="action-btn">Accept</button>
        <button class="action-btn">Override</button>
        <button class="action-btn">Note</button>
      </div>
    </div>

    <!-- 4. Assets & Collateral -->
    <div class="mini-dash">
      <div class="header">
        <h4>Assets & Collateral</h4>
        <span class="verdict amber">⚠️ Moderate</span>
      </div>
      <div class="content">
        <strong>Equipment collateral:</strong> $120,000 (65% coverage)<br>
        <strong>Personal guarantee:</strong> both members<br>
        <strong>Liquid reserves:</strong> $41,200 (6.2 months)
      </div>
      <div class="action-bar">
        <button class="action-btn">Accept</button>
        <button class="action-btn">Override</button>
        <button class="action-btn">Note</button>
        <button class="action-btn">Escalate</button>
      </div>
    </div>

    <!-- 5. Cash Flow -->
    <div class="mini-dash">
      <div class="header">
        <h4>Cash Flow</h4>
        <span class="verdict green">✅ Positive</span>
      </div>
      <div class="content">
        <strong>DSCR:</strong> 1.35x (min 1.20x)
        <div class="chart">
          <div style="font-size: 12px; color: #6C757D; margin-bottom: 8px;">4-Month Cash Flow</div>
          <div class="bar-chart">
            <div class="bar" style="height: 70%"></div>
            <div class="bar" style="height: 75%"></div>
            <div class="bar" style="height: 68%"></div>
            <div class="bar" style="height: 80%"></div>
          </div>
        </div>
        <strong>Monthly surplus:</strong> $2,800 average
      </div>
      <div class="action-bar">
        <button class="action-btn">Accept</button>
        <button class="action-btn">Override</button>
        <button class="action-btn">Note</button>
      </div>
    </div>

    <!-- 6. Financial Ratios -->
    <div class="mini-dash">
      <div class="header">
        <h4>Financial Ratios & Benchmarks</h4>
        <span class="verdict green">✅ Above Benchmark</span>
      </div>
      <div class="content">
        <table class="ratio-table">
          <tr>
            <td><strong>Ratio</strong></td>
            <td><strong>Borrower</strong></td>
            <td><strong>Industry</strong></td>
            <td><strong>Status</strong></td>
          </tr>
          <tr>
            <td>DTI</td>
            <td>28%</td>
            <td>—</td>
            <td>✅ Strong</td>
          </tr>
          <tr>
            <td>DSCR</td>
            <td>1.35x</td>
            <td>1.20x</td>
            <td>✅ Above</td>
          </tr>
          <tr>
            <td>Reserves</td>
            <td>6.2 mo</td>
            <td>3.0 mo</td>
            <td>✅ Strong</td>
          </tr>
          <tr>
            <td>Collateral</td>
            <td>65%</td>
            <td>—</td>
            <td>⚠️ Moderate</td>
          </tr>
        </table>
      </div>
      <div class="action-bar">
        <button class="action-btn">Accept</button>
        <button class="action-btn">Override</button>
        <button class="action-btn">Note</button>
      </div>
    </div>

    <!-- 7. Guesstimate Accuracy -->
    <div class="mini-dash">
      <div class="header">
        <h4>Guesstimate Accuracy</h4>
        <span class="verdict green">✅ Accurate</span>
      </div>
      <div class="content">
        <table class="ratio-table">
          <tr>
            <td><strong>Item</strong></td>
            <td><strong>Reported</strong></td>
            <td><strong>Verified</strong></td>
            <td><strong>Delta</strong></td>
          </tr>
          <tr>
            <td>Personal Income</td>
            <td>$128,000</td>
            <td>$128,400</td>
            <td><span class="delta-good">+0.3%</span></td>
          </tr>
          <tr>
            <td>Monthly Expenses</td>
            <td>$4,200</td>
            <td>$4,380</td>
            <td><span class="delta-good">+4.3%</span></td>
          </tr>
          <tr>
            <td>Savings</td>
            <td>$40,000</td>
            <td>$41,200</td>
            <td><span class="delta-good">+3.0%</span></td>
          </tr>
        </table>
        <div style="font-size: 12px; color: ${colors.success}; margin-top: 8px; font-weight: 500;">
          🎯 Trust signal: Consistently accurate self-reporting
        </div>
      </div>
      <div class="action-bar">
        <button class="action-btn">Accept</button>
        <button class="action-btn">Override</button>
        <button class="action-btn">Note</button>
      </div>
    </div>

    <!-- 8. Borrower Clarifications -->
    <div class="mini-dash">
      <div class="header">
        <h4>Borrower Clarifications</h4>
        <span class="verdict green">2 Answered</span>
      </div>
      <div class="content">
        <div class="qa-item">
          <div class="q">Q: Source of $8,000 deposit on Jan 3?</div>
          <div class="a">A: Catering contract payment from Portland General Electric — quarterly payment</div>
        </div>
        <div class="qa-item">
          <div class="q">Q: Plans for $65K leasehold portion?</div>
          <div class="a">A: Commercial kitchen buildout at 4412 SE Division — contractor quote attached</div>
        </div>
      </div>
      <div class="action-bar">
        <button class="action-btn">Note</button>
        <button class="action-btn">Follow-up Question</button>
      </div>
    </div>
  </div>

  <!-- Summary Panel -->
  <div class="summary-panel">
    <h3>Decision Summary</h3>
    <div class="summary-text">
      7 verdicts accepted, 1 amber (collateral coverage)
    </div>
    <div class="score">Deal Health Score: 74</div>
    <textarea placeholder="Final opinion / underwriting notes..."></textarea>
    <div class="actions">
      <button class="btn btn-success">Approve</button>
      <button class="btn btn-warning">Approve with Conditions</button>
      <button class="btn" style="background: #DC3545; color: #fff;">Deny</button>
    </div>
    <button class="btn btn-outline" style="margin-top: 12px; width: 100%; border-color: rgba(255,255,255,0.3); color: #fff;">Generate Credit Memo</button>
  </div>
</div>
</body>
</html>`
});

// Continue with remaining screens...
console.log('Building remaining screens...');

// UW-04: Clarification Review
screens.push({
  name: 'Clarifications',
  icon: '❓',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Clarification Review</title>
<style>
${commonStyles}
.question-card { background: #fff; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
.question-card .header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.question-card .flag-badge { padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
.flag-badge.income { background: rgba(42,157,143,0.15); color: ${colors.success}; }
.flag-badge.deposit { background: rgba(244,162,97,0.15); color: ${colors.warmGold}; }
.question-card .source { font-size: 12px; color: #6C757D; }
.question-card textarea { width: 100%; padding: 12px; border: 1px solid #dee2e6; border-radius: 6px; font-family: inherit; font-size: 14px; margin: 12px 0; min-height: 80px; }
.question-card .actions { display: flex; gap: 8px; }
.bottom-actions { display: flex; gap: 12px; margin-top: 24px; }
</style>
</head>
<body>
<div class="container">
  <div class="card">
    <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 8px; color: ${colors.deepNavy};">Clarification Questions — Batch Review</h2>
    <p style="color: #6C757D; margin-bottom: 24px;">Auto-generated questions based on document analysis. Review and edit before sending to borrower.</p>

    <div class="question-card">
      <div class="header">
        <span class="flag-badge deposit">Large Deposit</span>
        <span class="source">Source: Bank Statement (Jan 2026)</span>
      </div>
      <textarea>We noticed a deposit of $8,000 on January 3, 2026. Can you please provide documentation or explanation for the source of this deposit?</textarea>
      <div class="actions">
        <button class="btn btn-success btn-sm">Approve</button>
        <button class="btn btn-outline btn-sm">Edit</button>
        <button class="btn btn-outline btn-sm" style="color: ${colors.danger};">Delete</button>
      </div>
    </div>

    <div class="question-card">
      <div class="header">
        <span class="flag-badge income">Use of Funds</span>
        <span class="source">Source: Loan Application</span>
      </div>
      <textarea>You've allocated $65,000 for leasehold improvements. Can you provide more details about the planned improvements and the property location?</textarea>
      <div class="actions">
        <button class="btn btn-success btn-sm">Approve</button>
        <button class="btn btn-outline btn-sm">Edit</button>
        <button class="btn btn-outline btn-sm" style="color: ${colors.danger};">Delete</button>
      </div>
    </div>

    <div class="question-card">
      <div class="header">
        <span class="flag-badge income">Revenue Verification</span>
        <span class="source">Source: Tax Returns, Bank Statements</span>
      </div>
      <textarea>Your reported catering revenue of $94,000 annually appears consistent with bank deposits. Can you confirm this is accurate and provide any additional contracts or invoices for large events?</textarea>
      <div class="actions">
        <button class="btn btn-success btn-sm">Approve</button>
        <button class="btn btn-outline btn-sm">Edit</button>
        <button class="btn btn-outline btn-sm" style="color: ${colors.danger};">Delete</button>
      </div>
    </div>

    <div class="bottom-actions">
      <button class="btn btn-primary">Send All to Borrower</button>
      <button class="btn btn-outline">Add Custom Question</button>
      <button class="btn btn-outline">Save Draft</button>
    </div>
  </div>
</div>
</body>
</html>`
});

// UW-05: Credit Memo Preview
screens.push({
  name: 'Credit Memo',
  icon: '📝',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Credit Memo Preview</title>
<style>
${commonStyles}
.memo { background: #fff; padding: 48px; max-width: 900px; margin: 0 auto; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
.memo-header { text-align: center; border-bottom: 3px solid ${colors.deepNavy}; padding-bottom: 16px; margin-bottom: 32px; }
.memo-header h1 { font-size: 24px; font-weight: 700; color: ${colors.deepNavy}; text-transform: uppercase; letter-spacing: 2px; }
.memo-header .meta { font-size: 12px; color: #6C757D; margin-top: 8px; }
.memo h2 { font-size: 16px; font-weight: 700; color: ${colors.deepNavy}; margin-top: 32px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
.memo h3 { font-size: 14px; font-weight: 600; color: ${colors.deepNavy}; margin-top: 20px; margin-bottom: 8px; }
.memo p { font-size: 14px; line-height: 1.7; color: #495057; margin-bottom: 12px; }
.memo ul { margin-left: 20px; margin-bottom: 12px; }
.memo li { font-size: 14px; line-height: 1.7; color: #495057; margin-bottom: 6px; }
.memo table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
.memo table th { background: #F8F9FA; padding: 10px; text-align: left; font-weight: 600; border: 1px solid #dee2e6; }
.memo table td { padding: 10px; border: 1px solid #dee2e6; }
.score-box { background: linear-gradient(135deg, ${colors.deepNavy}, ${colors.darkTeal}); color: #fff; padding: 20px; border-radius: 8px; text-align: center; margin: 24px 0; }
.score-box .score { font-size: 48px; font-weight: 700; }
.score-box .label { font-size: 14px; opacity: 0.9; margin-top: 4px; }
.action-bar { position: sticky; bottom: 0; background: #fff; border-top: 2px solid #e9ecef; padding: 20px; display: flex; gap: 12px; justify-content: center; margin-top: 32px; }
</style>
</head>
<body>
<div class="container">
  <div class="memo">
    <div class="memo-header">
      <h1>Credit Memorandum</h1>
      <div class="meta">Prepared by Sarah Chen, Senior Underwriter | February 12, 2026</div>
    </div>

    <div class="score-box">
      <div class="score">74</div>
      <div class="label">Deal Health Score</div>
    </div>

    <h2>I. Loan Request</h2>
    <table>
      <tr><th>Borrower</th><td>James & Tanya Richardson</td></tr>
      <tr><th>Business</th><td>Richardson's Kitchen & Catering LLC</td></tr>
      <tr><th>Purpose</th><td>Equipment purchase and leasehold improvements</td></tr>
      <tr><th>Amount</th><td>$185,000</td></tr>
      <tr><th>Terms</th><td>84 months, 8.50% APR, $2,891/month</td></tr>
      <tr><th>Collateral</th><td>Commercial kitchen equipment ($120K), personal guarantees</td></tr>
      <tr><th>Program</th><td>Tier 2 Small Business Loan</td></tr>
    </table>

    <h2>II. Business Context</h2>
    <p>Richardson's Kitchen & Catering is a newly-formed LLC (August 2025) operating in Portland, OR. The business provides catering services for corporate events, weddings, and private functions. Both members (James and Tanya Richardson) have backgrounds in hospitality and food service, with James having 12 years of culinary experience and Tanya bringing 8 years of event management expertise.</p>
    <p>The business has demonstrated early traction with $94,000 in catering revenue over the past 10 months, showing consistent month-over-month growth. The loan proceeds will be used to purchase commercial kitchen equipment ($120,000) and fund leasehold improvements ($65,000) for a permanent commercial kitchen space at 4412 SE Division Street.</p>

    <h2>III. Financial Case</h2>
    <ul>
      <li><strong>Strong personal income foundation:</strong> $128,400 verified personal income from both members</li>
      <li><strong>Growing business revenue:</strong> $94,000 catering revenue with 8 of 10 months showing growth</li>
      <li><strong>Healthy debt ratios:</strong> 28% DTI, 1.35x DSCR (above 1.20x minimum)</li>
      <li><strong>Solid reserves:</strong> $41,200 liquid reserves (6.2 months coverage)</li>
      <li><strong>Excellent credit:</strong> 712/698 credit scores, clean credit history</li>
      <li><strong>Accurate self-reporting:</strong> All guesstimate data verified within 5% of actuals</li>
    </ul>

    <h2>IV. Analytical Method</h2>
    <h3>Data Sources</h3>
    <ul>
      <li>Personal and business tax returns (2024-2025)</li>
      <li>Bank statements (10 months)</li>
      <li>Credit reports (both members)</li>
      <li>Equipment quotes and contractor estimates</li>
      <li>Lease agreement for commercial space</li>
    </ul>

    <h3>Key Ratios</h3>
    <table>
      <tr>
        <th>Metric</th>
        <th>Borrower</th>
        <th>Benchmark</th>
        <th>Assessment</th>
      </tr>
      <tr>
        <td>Debt-to-Income</td>
        <td>28%</td>
        <td>≤50%</td>
        <td>Strong</td>
      </tr>
      <tr>
        <td>DSCR</td>
        <td>1.35x</td>
        <td>≥1.20x</td>
        <td>Above target</td>
      </tr>
      <tr>
        <td>Liquid Reserves</td>
        <td>6.2 months</td>
        <td>≥3.0 months</td>
        <td>Strong</td>
      </tr>
      <tr>
        <td>Collateral Coverage</td>
        <td>65%</td>
        <td>80%</td>
        <td>Below target</td>
      </tr>
    </table>

    <h2>V. Risk Factors</h2>
    <ol>
      <li><strong>Early-stage business:</strong> LLC formed only 6 months ago, limited operating history</li>
      <li><strong>Seasonal revenue risk:</strong> Catering business may have seasonal fluctuations</li>
      <li><strong>Below-target collateral coverage:</strong> Equipment value at 65% of loan amount vs 80% target</li>
      <li><strong>Expansion timing:</strong> Taking on new lease commitment while scaling operations</li>
    </ol>

    <h2>VI. Mitigating Factors</h2>
    <ol>
      <li><strong>Strong personal income base:</strong> $128K personal income provides stable foundation beyond business revenue</li>
      <li><strong>Consistent growth trajectory:</strong> 8 of 10 months showing revenue growth, strong pipeline of corporate contracts</li>
      <li><strong>Dual personal guarantees:</strong> Both members with strong credit (712/698) backing the loan, plus $41K reserves</li>
      <li><strong>Strategic expansion:</strong> Permanent kitchen space reduces current rental costs and enables larger event capacity</li>
    </ol>

    <h2>VII. Recommendation</h2>
    <p><strong>APPROVE with the following conditions:</strong></p>
    <ol>
      <li>Personal guarantees from both James and Tanya Richardson</li>
      <li>First lien on all purchased equipment</li>
      <li>Maintain minimum cash reserves of $25,000 throughout loan term</li>
      <li>Provide quarterly financial statements for first 24 months</li>
    </ol>
    <p style="margin-top: 20px;"><strong>Rationale:</strong> Despite below-target collateral coverage, the strong personal income foundation, healthy debt ratios, excellent credit profiles, substantial liquid reserves, and demonstrated business growth trajectory make this an acceptable risk profile for Tier 2 lending. The dual personal guarantees and reserve requirements provide additional downside protection.</p>
  </div>

  <div class="action-bar">
    <button class="btn btn-success">Submit for Approval</button>
    <button class="btn btn-outline">Edit</button>
    <button class="btn btn-outline">Save Draft</button>
  </div>
</div>
</body>
</html>`
});

// UW-06: Manager Escalation
screens.push({
  name: 'Escalation Response',
  icon: '⚠️',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Escalation Response</title>
<style>
${commonStyles}
.escalation-header { background: linear-gradient(135deg, ${colors.warmGold}, ${colors.amber}); color: #fff; padding: 24px 32px; border-radius: 8px; margin-bottom: 24px; }
.escalation-header h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
.escalation-header .meta { font-size: 14px; opacity: 0.9; }
.timeline { position: relative; padding-left: 40px; }
.timeline-item { position: relative; padding-bottom: 32px; }
.timeline-item::before { content: ''; position: absolute; left: -31px; top: 0; width: 2px; height: 100%; background: #dee2e6; }
.timeline-item::after { content: ''; position: absolute; left: -37px; top: 0; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 3px solid ${colors.deepNavy}; }
.timeline-item.resolved::after { background: ${colors.success}; border-color: ${colors.success}; }
.timeline-item:last-child::before { display: none; }
.timeline-content { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.timeline-content .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.timeline-content .header h3 { font-size: 16px; font-weight: 600; color: ${colors.deepNavy}; }
.timeline-content .timestamp { font-size: 12px; color: #6C757D; }
.timeline-content .body { font-size: 14px; line-height: 1.6; color: #495057; }
.manager-response { background: #F0F8F7; border-left: 4px solid ${colors.success}; padding: 16px; border-radius: 4px; margin-top: 12px; }
.status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
.status-badge.resolved { background: rgba(42,157,143,0.15); color: ${colors.success}; }
</style>
</head>
<body>
<div class="container">
  <div class="escalation-header">
    <h1>Escalation — Collateral Coverage</h1>
    <div class="meta">Richardson's Kitchen & Catering | $185,000 loan</div>
  </div>

  <div class="card">
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="header">
            <h3>Escalation Created</h3>
            <div class="timestamp">Feb 12, 2026 at 9:15 AM</div>
          </div>
          <div class="body">
            <p><strong>Issue:</strong> Collateral Coverage Below Target</p>
            <p><strong>Context:</strong> Equipment collateral value is $120,000, representing 65% coverage of the $185,000 loan amount. Our standard threshold for equipment loans is 80% collateral coverage.</p>
            <p><strong>Underwriter's Assessment:</strong> While collateral coverage is below target, I believe this risk is adequately mitigated by:</p>
            <ul style="margin-left: 20px; margin-top: 8px;">
              <li>Strong personal guarantees from both members (credit scores 712/698)</li>
              <li>Substantial liquid reserves ($41,200 = 6.2 months coverage)</li>
              <li>Healthy debt ratios (28% DTI, 1.35x DSCR)</li>
              <li>Strong personal income foundation ($128K annual)</li>
            </ul>
            <p style="margin-top: 12px;"><strong>Requested Decision:</strong> Approval to proceed with 65% collateral coverage given compensating factors.</p>
          </div>
        </div>
      </div>

      <div class="timeline-item resolved">
        <div class="timeline-content">
          <div class="header">
            <h3>Manager Response</h3>
            <div class="timestamp">Feb 12, 2026 at 11:42 AM</div>
          </div>
          <div class="body">
            <div class="manager-response">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <strong>Michael Torres, Senior Underwriting Manager</strong>
                <span class="status-badge resolved">✅ Resolved — Approved</span>
              </div>
              <p>I've reviewed this escalation and agree with your assessment. The collateral coverage at 65% is acceptable given the strong compensating factors you've outlined.</p>
              <p style="margin-top: 12px;"><strong>Key considerations in my decision:</strong></p>
              <ul style="margin-left: 20px; margin-top: 8px;">
                <li>The personal guarantees from both members with excellent credit provide meaningful downside protection</li>
                <li>6.2 months of liquid reserves is well above our 3-month minimum and demonstrates financial discipline</li>
                <li>The growing business revenue trend (8 of 10 months up) suggests strong fundamentals</li>
                <li>The permanent kitchen space should improve operational efficiency and revenue potential</li>
              </ul>
              <p style="margin-top: 12px;"><strong>Proceed with approval</strong> using the conditions you've outlined in the credit memo. Ensure the quarterly financial statement requirement is clearly communicated during closing.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content">
          <div class="header">
            <h3>Underwriter Acknowledgment</h3>
            <div class="timestamp">Feb 12, 2026 at 11:50 AM</div>
          </div>
          <div class="body">
            <p>Thank you, Michael. I'll proceed with finalizing the credit memo and moving this to approval. The quarterly financial statement requirement will be documented in the closing conditions.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div style="display: flex; gap: 12px; margin-top: 24px;">
    <button class="btn btn-primary">Return to Case</button>
    <button class="btn btn-outline">Export Thread</button>
  </div>
</div>
</body>
</html>`
});

// UW-07: Case Queue
screens.push({
  name: 'Case Queue',
  icon: '📋',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Case Queue</title>
<style>
${commonStyles}
.controls-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
.filters { display: flex; gap: 8px; }
.filters select { padding: 8px 14px; border: 1px solid #dee2e6; border-radius: 6px; font-size: 13px; font-family: inherit; background: #fff; }
.bulk-actions { display: flex; gap: 8px; }
.row-green { background: rgba(42,157,143,0.05); }
.row-amber { background: rgba(244,162,97,0.05); }
.row-red { background: rgba(230,57,70,0.05); }
</style>
</head>
<body>
<div class="container">
  <div class="card">
    <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 20px; color: ${colors.deepNavy};">All Assigned Cases</h2>

    <div class="controls-bar">
      <div class="filters">
        <select>
          <option>All Priorities</option>
          <option>High Priority</option>
          <option>Medium Priority</option>
          <option>Low Priority</option>
        </select>
        <select>
          <option>All SLA Status</option>
          <option>On Track</option>
          <option>Approaching SLA</option>
          <option>SLA Breached</option>
        </select>
        <select>
          <option>Amount: All</option>
          <option>Under $100K</option>
          <option>$100K - $200K</option>
          <option>Over $200K</option>
        </select>
      </div>
      <div class="bulk-actions">
        <button class="btn btn-outline btn-sm">Reassign</button>
        <button class="btn btn-outline btn-sm">Export</button>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Borrower</th>
          <th>Amount</th>
          <th>Health Score</th>
          <th>Priority</th>
          <th>SLA</th>
          <th>Status</th>
          <th>Days</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-green">
          <td><strong>James & Tanya Richardson</strong><br><span style="font-size: 12px; color: #6C757D;">Richardson's Kitchen</span></td>
          <td><strong>$185,000</strong></td>
          <td><div class="gauge g-ylw" style="--p:74"><span class="gv">74</span></div></td>
          <td><span class="priority-high">High</span></td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="badge gray">In Review</span></td>
          <td>12</td>
        </tr>
        <tr class="row-green">
          <td><strong>Michael Chen</strong><br><span style="font-size: 12px; color: #6C757D;">Chen's Auto Repair</span></td>
          <td><strong>$125,000</strong></td>
          <td><div class="gauge g-grn" style="--p:82"><span class="gv">82</span></div></td>
          <td><span class="priority-med">Medium</span></td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="badge gray">Documents Review</span></td>
          <td>8</td>
        </tr>
        <tr class="row-green">
          <td><strong>Lisa Martinez</strong><br><span style="font-size: 12px; color: #6C757D;">Martinez Landscaping</span></td>
          <td><strong>$95,000</strong></td>
          <td><div class="gauge g-grn" style="--p:78"><span class="gv">78</span></div></td>
          <td><span class="priority-low">Low</span></td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="badge gray">New</span></td>
          <td>5</td>
        </tr>
        <tr class="row-amber">
          <td><strong>David Thompson</strong><br><span style="font-size: 12px; color: #6C757D;">Thompson Construction</span></td>
          <td><strong>$275,000</strong></td>
          <td><div class="gauge g-ylw" style="--p:68"><span class="gv">68</span></div></td>
          <td><span class="priority-high">High</span></td>
          <td><span class="badge sla-warn">Approaching</span></td>
          <td><span class="badge amber">Clarifications</span></td>
          <td>14</td>
        </tr>
        <tr class="row-green">
          <td><strong>Angela Parker</strong><br><span style="font-size: 12px; color: #6C757D;">Parker's Pet Grooming</span></td>
          <td><strong>$65,000</strong></td>
          <td><div class="gauge g-grn" style="--p:85"><span class="gv">85</span></div></td>
          <td><span class="priority-low">Low</span></td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="badge gray">New</span></td>
          <td>3</td>
        </tr>
        <tr class="row-red">
          <td><strong>Robert Kim</strong><br><span style="font-size: 12px; color: #6C757D;">Kim's Tech Solutions</span></td>
          <td><strong>$210,000</strong></td>
          <td><div class="gauge g-red" style="--p:42"><span class="gv">42</span></div></td>
          <td><span class="priority-high">High</span></td>
          <td><span class="badge sla-breach">Breached</span></td>
          <td><span class="badge red">Escalated</span></td>
          <td>18</td>
        </tr>
        <tr class="row-green">
          <td><strong>Maria Gonzalez</strong><br><span style="font-size: 12px; color: #6C757D;">Gonzalez Bakery</span></td>
          <td><strong>$88,000</strong></td>
          <td><div class="gauge g-ylw" style="--p:71"><span class="gv">71</span></div></td>
          <td><span class="priority-med">Medium</span></td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="badge gray">In Review</span></td>
          <td>9</td>
        </tr>
        <tr class="row-green">
          <td><strong>Kevin O'Brien</strong><br><span style="font-size: 12px; color: #6C757D;">O'Brien HVAC Services</span></td>
          <td><strong>$145,000</strong></td>
          <td><div class="gauge g-grn" style="--p:79"><span class="gv">79</span></div></td>
          <td><span class="priority-med">Medium</span></td>
          <td><span class="badge sla-ok">On Track</span></td>
          <td><span class="badge gray">Documents Review</span></td>
          <td>6</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>`
});

// UW-08: Decision History
screens.push({
  name: 'Decision History',
  icon: '📈',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Decision History</title>
<style>
${commonStyles}
.summary-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.summary-card { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); text-align: center; }
.summary-card .value { font-size: 32px; font-weight: 700; color: ${colors.deepNavy}; }
.summary-card .label { font-size: 12px; color: #6C757D; margin-top: 4px; }
.decision-approved { color: ${colors.success}; font-weight: 600; }
.decision-denied { color: ${colors.danger}; font-weight: 600; }
.decision-conditional { color: ${colors.warmGold}; font-weight: 600; }
.accuracy-good { color: ${colors.success}; }
.accuracy-bad { color: ${colors.danger}; }
</style>
</head>
<body>
<div class="container">
  <div class="card">
    <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 8px; color: ${colors.deepNavy};">My Decision History</h2>
    <p style="color: #6C757D; margin-bottom: 24px;">Past 30 days</p>

    <div class="summary-cards">
      <div class="summary-card">
        <div class="value">12</div>
        <div class="label">Decisions This Month</div>
      </div>
      <div class="summary-card">
        <div class="value">83%</div>
        <div class="label">Approval Rate</div>
      </div>
      <div class="summary-card">
        <div class="value">100%</div>
        <div class="label">Accuracy (No Defaults)</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Borrower</th>
          <th>Amount</th>
          <th>Decision</th>
          <th>Health Score</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Feb 11, 2026</td>
          <td><strong>Amanda Foster</strong><br><span style="font-size: 12px; color: #6C757D;">Foster Design Studio</span></td>
          <td><strong>$92,000</strong></td>
          <td><span class="decision-approved">Approved</span></td>
          <td><div class="gauge g-grn" style="--p:81"><span class="gv">81</span></div></td>
          <td><span class="accuracy-good">✓ On track</span></td>
        </tr>
        <tr>
          <td>Feb 10, 2026</td>
          <td><strong>Carlos Rivera</strong><br><span style="font-size: 12px; color: #6C757D;">Rivera Plumbing</span></td>
          <td><strong>$135,000</strong></td>
          <td><span class="decision-conditional">Approved w/ Conditions</span></td>
          <td><div class="gauge g-ylw" style="--p:72"><span class="gv">72</span></div></td>
          <td><span class="accuracy-good">✓ On track</span></td>
        </tr>
        <tr>
          <td>Feb 9, 2026</td>
          <td><strong>Jennifer Wu</strong><br><span style="font-size: 12px; color: #6C757D;">Wu Marketing Agency</span></td>
          <td><strong>$158,000</strong></td>
          <td><span class="decision-approved">Approved</span></td>
          <td><div class="gauge g-grn" style="--p:85"><span class="gv">85</span></div></td>
          <td><span class="accuracy-good">✓ On track</span></td>
        </tr>
        <tr>
          <td>Feb 8, 2026</td>
          <td><strong>Thomas Brown</strong><br><span style="font-size: 12px; color: #6C757D;">Brown's Coffee Roasters</span></td>
          <td><strong>$78,000</strong></td>
          <td><span class="decision-denied">Denied</span></td>
          <td><div class="gauge g-red" style="--p:38"><span class="gv">38</span></div></td>
          <td><span class="accuracy-good">✓ Correct call</span></td>
        </tr>
        <tr>
          <td>Feb 7, 2026</td>
          <td><strong>Patricia Lee</strong><br><span style="font-size: 12px; color: #6C757D;">Lee Accounting Services</span></td>
          <td><strong>$115,000</strong></td>
          <td><span class="decision-approved">Approved</span></td>
          <td><div class="gauge g-grn" style="--p:79"><span class="gv">79</span></div></td>
          <td><span class="accuracy-good">✓ On track</span></td>
        </tr>
        <tr>
          <td>Feb 6, 2026</td>
          <td><strong>Mark Anderson</strong><br><span style="font-size: 12px; color: #6C757D;">Anderson Electrical</span></td>
          <td><strong>$195,000</strong></td>
          <td><span class="decision-conditional">Approved w/ Conditions</span></td>
          <td><div class="gauge g-ylw" style="--p:69"><span class="gv">69</span></div></td>
          <td><span class="accuracy-good">✓ On track</span></td>
        </tr>
        <tr>
          <td>Feb 5, 2026</td>
          <td><strong>Sarah Johnson</strong><br><span style="font-size: 12px; color: #6C757D;">Johnson Fitness Center</span></td>
          <td><strong>$225,000</strong></td>
          <td><span class="decision-approved">Approved</span></td>
          <td><div class="gauge g-grn" style="--p:83"><span class="gv">83</span></div></td>
          <td><span class="accuracy-good">✓ On track</span></td>
        </tr>
        <tr>
          <td>Feb 4, 2026</td>
          <td><strong>Daniel Park</strong><br><span style="font-size: 12px; color: #6C757D;">Park's Auto Body</span></td>
          <td><strong>$142,000</strong></td>
          <td><span class="decision-denied">Denied</span></td>
          <td><div class="gauge g-red" style="--p:41"><span class="gv">41</span></div></td>
          <td><span class="accuracy-good">✓ Correct call</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>`
});

// UW-09: Workpapers
screens.push({
  name: 'Workpapers',
  icon: '📁',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Workpapers</title>
<style>
${commonStyles}
.workpaper-layout { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }
.doc-tree { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.doc-category { margin-bottom: 20px; }
.doc-category h4 { font-size: 14px; font-weight: 600; color: ${colors.deepNavy}; margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #e9ecef; }
.doc-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #F8F9FA; border-radius: 6px; margin-bottom: 8px; font-size: 13px; }
.doc-item .name { font-weight: 500; color: ${colors.deepNavy}; }
.doc-item .meta { font-size: 11px; color: #6C757D; margin-top: 2px; }
.doc-item .btn { padding: 4px 12px; font-size: 12px; }
.notes-panel { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); position: sticky; top: 20px; }
.notes-panel h3 { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: ${colors.deepNavy}; }
.note-item { padding: 12px; background: #FFF9E6; border-left: 3px solid ${colors.warmGold}; border-radius: 4px; margin-bottom: 12px; font-size: 13px; }
.note-item .timestamp { font-size: 11px; color: #6C757D; margin-bottom: 6px; }
.note-item .text { color: #495057; line-height: 1.5; }
.notes-panel textarea { width: 100%; padding: 12px; border: 1px solid #dee2e6; border-radius: 6px; font-family: inherit; font-size: 13px; margin-top: 12px; min-height: 100px; }
</style>
</head>
<body>
<div class="container">
  <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 20px; color: ${colors.deepNavy};">Workpapers — Richardson's Kitchen & Catering</h2>

  <div class="workpaper-layout">
    <div class="doc-tree">
      <div class="doc-category">
        <h4>Credit Reports</h4>
        <div class="doc-item">
          <div>
            <div class="name">Experian Report - James Richardson</div>
            <div class="meta">Feb 10, 2026 | Integration</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Experian Report - Tanya Richardson</div>
            <div class="meta">Feb 10, 2026 | Integration</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
      </div>

      <div class="doc-category">
        <h4>Bank Statements</h4>
        <div class="doc-item">
          <div>
            <div class="name">Business Account - Jan 2026</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Business Account - Dec 2025</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Business Account - Nov 2025</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Personal Joint Account - Jan 2026</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
      </div>

      <div class="doc-category">
        <h4>Tax Returns</h4>
        <div class="doc-item">
          <div>
            <div class="name">Personal Tax Return - 2024</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Business Tax Return - 2025 (partial)</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
      </div>

      <div class="doc-category">
        <h4>Income Verification</h4>
        <div class="doc-item">
          <div>
            <div class="name">W-2 - James Richardson (2024)</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">W-2 - Tanya Richardson (2024)</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Pay Stubs - Recent (both members)</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
      </div>

      <div class="doc-category">
        <h4>Property & Equipment</h4>
        <div class="doc-item">
          <div>
            <div class="name">Equipment Quote - Commercial Kitchen</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Contractor Estimate - Leasehold</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Lease Agreement - 4412 SE Division</div>
            <div class="meta">Feb 11, 2026 | Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
      </div>

      <div class="doc-category">
        <h4>Borrower Uploads</h4>
        <div class="doc-item">
          <div>
            <div class="name">PGE Catering Contract</div>
            <div class="meta">Feb 12, 2026 | Borrower Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
        <div class="doc-item">
          <div>
            <div class="name">Business Formation Documents</div>
            <div class="meta">Feb 11, 2026 | Borrower Upload</div>
          </div>
          <button class="btn btn-outline btn-sm">View</button>
        </div>
      </div>
    </div>

    <div class="notes-panel">
      <h3>Working Notes</h3>

      <div class="note-item">
        <div class="timestamp">Feb 12, 2026 at 11:50 AM</div>
        <div class="text">Manager approved 65% collateral coverage. Proceeding with approval.</div>
      </div>

      <div class="note-item">
        <div class="timestamp">Feb 12, 2026 at 10:15 AM</div>
        <div class="text">Reviewed PGE contract upload. Confirms source of $8K deposit. Clarification resolved.</div>
      </div>

      <div class="note-item">
        <div class="timestamp">Feb 12, 2026 at 9:30 AM</div>
        <div class="text">Revenue trend is strong — 8 of 10 months showing growth. Business fundamentals look solid despite early stage.</div>
      </div>

      <div class="note-item">
        <div class="timestamp">Feb 12, 2026 at 9:05 AM</div>
        <div class="text">Collateral coverage at 65% is below target. Need to escalate to manager given strong compensating factors.</div>
      </div>

      <textarea placeholder="Add new note..."></textarea>
      <button class="btn btn-primary btn-sm" style="margin-top: 8px; width: 100%;">Save Note</button>
    </div>
  </div>
</div>
</body>
</html>`
});

// UW-10: Settings
screens.push({
  name: 'Settings',
  icon: '⚙️',
  html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Settings & Preferences</title>
<style>
${commonStyles}
.settings-section { background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); margin-bottom: 20px; }
.settings-section h3 { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: ${colors.deepNavy}; }
.setting-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #f1f3f5; }
.setting-item:last-child { border-bottom: none; }
.setting-item .label { font-size: 14px; font-weight: 500; color: ${colors.deepNavy}; }
.setting-item .description { font-size: 12px; color: #6C757D; margin-top: 4px; }
.toggle { width: 48px; height: 24px; background: #dee2e6; border-radius: 24px; position: relative; cursor: pointer; transition: background 0.2s; }
.toggle.on { background: ${colors.success}; }
.toggle::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: left 0.2s; }
.toggle.on::after { left: 27px; }
.shortcut-table { width: 100%; font-size: 13px; }
.shortcut-table td { padding: 10px 0; border-bottom: 1px solid #f1f3f5; }
.shortcut-table td:first-child { font-weight: 500; color: ${colors.deepNavy}; }
.shortcut-table td:last-child { color: #6C757D; }
.kbd { background: #F8F9FA; border: 1px solid #dee2e6; border-radius: 4px; padding: 2px 8px; font-size: 12px; font-family: monospace; margin: 0 2px; }
</style>
</head>
<body>
<div class="container">
  <h2 style="font-size: 22px; font-weight: 600; margin-bottom: 20px; color: ${colors.deepNavy};">Settings & Preferences</h2>

  <div class="settings-section">
    <h3>Notification Preferences</h3>
    <div class="setting-item">
      <div>
        <div class="label">New Case Assignments</div>
        <div class="description">Get notified when a new case is assigned to you</div>
      </div>
      <div class="toggle on"></div>
    </div>
    <div class="setting-item">
      <div>
        <div class="label">SLA Warnings</div>
        <div class="description">Alert when a case is approaching SLA deadline</div>
      </div>
      <div class="toggle on"></div>
    </div>
    <div class="setting-item">
      <div>
        <div class="label">Escalation Responses</div>
        <div class="description">Notify when a manager responds to your escalation</div>
      </div>
      <div class="toggle on"></div>
    </div>
    <div class="setting-item">
      <div>
        <div class="label">Borrower Clarifications</div>
        <div class="description">Alert when borrower responds to questions</div>
      </div>
      <div class="toggle on"></div>
    </div>
    <div class="setting-item">
      <div>
        <div class="label">Daily Summary Email</div>
        <div class="description">Receive a daily summary of your case queue at 8:00 AM</div>
      </div>
      <div class="toggle"></div>
    </div>
  </div>

  <div class="settings-section">
    <h3>Default View Preferences</h3>
    <div class="setting-item">
      <div>
        <div class="label">Dashboard View</div>
        <div class="description">Choose your default landing page</div>
      </div>
      <select style="padding: 8px 14px; border: 1px solid #dee2e6; border-radius: 6px; font-size: 13px; font-family: inherit;">
        <option>Dashboard</option>
        <option>Case Queue</option>
        <option>My Cases</option>
      </select>
    </div>
    <div class="setting-item">
      <div>
        <div class="label">Case Sort Order</div>
        <div class="description">Default sorting for case queue</div>
      </div>
      <select style="padding: 8px 14px; border: 1px solid #dee2e6; border-radius: 6px; font-size: 13px; font-family: inherit;">
        <option>Priority (High to Low)</option>
        <option>Days in Queue (Oldest First)</option>
        <option>Amount (Highest First)</option>
        <option>Health Score (Lowest First)</option>
      </select>
    </div>
  </div>

  <div class="settings-section">
    <h3>Keyboard Shortcuts</h3>
    <table class="shortcut-table">
      <tr>
        <td>Navigate to Dashboard</td>
        <td><span class="kbd">D</span></td>
      </tr>
      <tr>
        <td>Navigate to Case Queue</td>
        <td><span class="kbd">Q</span></td>
      </tr>
      <tr>
        <td>Open Search</td>
        <td><span class="kbd">Ctrl</span> + <span class="kbd">K</span></td>
      </tr>
      <tr>
        <td>Navigate Mini-Dashboards</td>
        <td><span class="kbd">M</span></td>
      </tr>
      <tr>
        <td>Generate Credit Memo</td>
        <td><span class="kbd">Ctrl</span> + <span class="kbd">G</span></td>
      </tr>
      <tr>
        <td>Create Escalation</td>
        <td><span class="kbd">E</span></td>
      </tr>
      <tr>
        <td>Add Note</td>
        <td><span class="kbd">N</span></td>
      </tr>
      <tr>
        <td>Next Case</td>
        <td><span class="kbd">→</span></td>
      </tr>
      <tr>
        <td>Previous Case</td>
        <td><span class="kbd">←</span></td>
      </tr>
    </table>
  </div>

  <div style="display: flex; gap: 12px; margin-top: 24px;">
    <button class="btn btn-primary">Save Changes</button>
    <button class="btn btn-outline">Cancel</button>
  </div>
</div>
</body>
</html>`
});

// Now build the wrapper
const wrapper = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CremoLogix v2 - Underwriter Portal</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; overflow: hidden; font-family: 'Segoe UI', system-ui, sans-serif; }
  #demo-bar { height: 40px; background: ${colors.deepNavy}; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; font-size: 14px; z-index: 100; position: relative; }
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
  #navigator { position: fixed; bottom: 16px; right: 16px; z-index: 200; width: 280px; background: ${colors.deepNavy}; color: #fff; border-radius: 10px; box-shadow: 0 8px 30px rgba(0,0,0,.35); overflow: hidden; transition: transform .25s ease, opacity .25s ease; transform-origin: bottom right; max-height: 70vh; display: flex; flex-direction: column; }
  #navigator.collapsed { transform: scale(0); opacity: 0; pointer-events: none; }
  #nav-header { padding: 12px 14px 8px; border-bottom: 1px solid rgba(255,255,255,.12); font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; opacity: .7; flex-shrink: 0; }
  #nav-list { list-style: none; padding: 6px 0; overflow-y: auto; flex: 1; }
  #nav-list li button { width: 100%; background: none; border: none; color: #fff; text-align: left; padding: 9px 14px 9px 42px; cursor: pointer; font-size: 13px; font-family: inherit; transition: background .12s; display: block; position: relative; }
  #nav-list li button:hover { background: rgba(255,255,255,.08); }
  #nav-list li button.active { background: ${colors.darkTeal}; font-weight: 600; }
  #nav-list li button .icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 20px; text-align: center; font-size: 14px; }
  #nav-list li button .num { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); font-size: 11px; opacity: .5; }
  #nav-toggle { position: fixed; bottom: 16px; right: 16px; z-index: 201; width: 44px; height: 44px; border-radius: 50%; background: ${colors.deepNavy}; color: #fff; border: 2px solid rgba(255,255,255,.2); font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,.3); transition: background .15s; }
  #nav-toggle:hover { background: ${colors.darkTeal}; }
</style>
</head>
<body>
<div id="demo-bar">
  <div class="left">
    <a class="back-btn" href="../cremologix-v2.html">← All Portals</a>
    <span class="title">Underwriter Portal</span>
  </div>
  <span class="indicator" id="screen-indicator"></span>
  <div class="nav-btns">
    <button id="btn-prev" title="Previous">←</button>
    <button id="btn-next" title="Next">→</button>
  </div>
</div>
<div id="frame-wrap">
  <iframe id="app-frame"></iframe>
  <div id="fade-overlay"></div>
</div>
<div id="navigator" class="collapsed">
  <div id="nav-header">Underwriter Screens</div>
  <ul id="nav-list"></ul>
</div>
<button id="nav-toggle" title="Toggle navigator (Esc)">☰</button>
<script>
const SCREENS = ${JSON.stringify(screens, null, 2)};

let currentIndex = 0;
const frame = document.getElementById('app-frame');
const indicator = document.getElementById('screen-indicator');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const navList = document.getElementById('nav-list');
const navigator = document.getElementById('navigator');
const navToggle = document.getElementById('nav-toggle');
const fadeOverlay = document.getElementById('fade-overlay');

function loadScreen(index) {
  fadeOverlay.classList.add('active');
  setTimeout(() => {
    frame.srcdoc = atob(SCREENS[index].b64);
    currentIndex = index;
    updateUI();
    setTimeout(() => fadeOverlay.classList.remove('active'), 100);
  }, 180);
}

function updateUI() {
  indicator.textContent = \`\${currentIndex + 1} / \${SCREENS.length} — \${SCREENS[currentIndex].name}\`;
  btnPrev.disabled = currentIndex === 0;
  btnNext.disabled = currentIndex === SCREENS.length - 1;
  document.querySelectorAll('#nav-list button').forEach((btn, i) => {
    btn.classList.toggle('active', i === currentIndex);
  });
}

// Build navigator
SCREENS.forEach((screen, i) => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.innerHTML = \`<span class="icon">\${screen.icon}</span>\${screen.name}<span class="num">\${i + 1}</span>\`;
  btn.onclick = () => loadScreen(i);
  li.appendChild(btn);
  navList.appendChild(li);
});

// Navigation
btnPrev.onclick = () => { if (currentIndex > 0) loadScreen(currentIndex - 1); };
btnNext.onclick = () => { if (currentIndex < SCREENS.length - 1) loadScreen(currentIndex + 1); };

// Toggle navigator
navToggle.onclick = () => {
  const isCollapsed = navigator.classList.toggle('collapsed');
  navToggle.style.display = isCollapsed ? 'flex' : 'none';
};

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!navigator.classList.contains('collapsed')) {
      navigator.classList.add('collapsed');
      navToggle.style.display = 'flex';
    }
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    loadScreen(currentIndex - 1);
  } else if (e.key === 'ArrowRight' && currentIndex < SCREENS.length - 1) {
    loadScreen(currentIndex + 1);
  }
});

// Load first screen
loadScreen(0);
</script>
</body>
</html>`;

// Write wrapper with base64-encoded screens
const outputPath = path.join(__dirname, 'cremologix-v2', 'demo-underwriter.html');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, wrapper, 'utf8');

console.log('✅ Built demo-underwriter.html with', screens.length, 'screens');
console.log('📍', outputPath);
