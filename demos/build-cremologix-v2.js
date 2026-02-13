#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Helper to base64 encode HTML strings
function b64(html) {
  return Buffer.from(html).toString('base64');
}

// Brand colors
const colors = {
  navy: '#0A2540',
  teal: '#006D77',
  gold: '#F4A261',
  amber: '#E76F51',
  success: '#2A9D8F',
  warning: '#F4A261',
  danger: '#E63946',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray400: '#ced4da',
  gray500: '#adb5bd',
  gray600: '#6c757d',
  gray700: '#495057',
  gray800: '#343a40',
  gray900: '#212529',
};

// Common styles for all screens
const commonStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: ${colors.gray900}; line-height: 1.6; }
  body { overflow-x: hidden; }
`;

// Screen 1: Landing Page (CL-01)
const screen01 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CremoLogix - Landing</title>
<style>
  ${commonStyles}
  body { background: linear-gradient(135deg, ${colors.navy} 0%, ${colors.teal} 100%); color: white; }
  .hero { min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 60px 24px; }
  .logo { font-size: 36px; font-weight: 700; margin-bottom: 8px; letter-spacing: -0.5px; }
  .tagline { font-size: 14px; opacity: 0.9; margin-bottom: 40px; letter-spacing: 1px; text-transform: uppercase; }
  .hero h1 { font-size: 48px; font-weight: 700; margin-bottom: 20px; line-height: 1.2; max-width: 800px; }
  .hero p { font-size: 20px; opacity: 0.95; margin-bottom: 40px; max-width: 640px; }
  .cta-row { display: flex; gap: 16px; margin-bottom: 60px; flex-wrap: wrap; justify-content: center; }
  .cta-btn { padding: 16px 36px; border-radius: 8px; font-size: 16px; font-weight: 600; border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; display: inline-block; }
  .cta-btn.primary { background: ${colors.gold}; color: ${colors.navy}; }
  .cta-btn.secondary { background: rgba(255,255,255,0.15); color: white; border: 2px solid rgba(255,255,255,0.4); }
  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
  .value-props { max-width: 1000px; margin: 0 auto 60px; padding: 0 24px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
  .prop-card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 12px; padding: 32px; border: 1px solid rgba(255,255,255,0.2); }
  .prop-card .icon { font-size: 48px; margin-bottom: 16px; }
  .prop-card h3 { font-size: 20px; margin-bottom: 12px; }
  .prop-card p { opacity: 0.9; font-size: 15px; line-height: 1.6; }
  .trust { background: rgba(255,255,255,0.08); padding: 48px 24px; }
  .trust-content { max-width: 900px; margin: 0 auto; text-align: center; }
  .trust h2 { font-size: 32px; margin-bottom: 32px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 32px; }
  .stat { padding: 20px; }
  .stat-value { font-size: 36px; font-weight: 700; color: ${colors.gold}; margin-bottom: 8px; }
  .stat-label { font-size: 14px; opacity: 0.9; }
  footer { padding: 32px 24px; text-align: center; font-size: 13px; opacity: 0.7; }
</style>
</head>
<body>
  <div class="hero">
    <div class="logo">CremoLogix</div>
    <div class="tagline">Financial Empowerment Platform</div>
    <h1>Capital + Guidance for Growing Businesses</h1>
    <p>Whether you're ready for a loan or building toward one, CremoLogix is your financial partner</p>
    <div class="cta-row">
      <button class="cta-btn primary">Apply for a Loan</button>
      <button class="cta-btn secondary">Explore Our Tools</button>
    </div>
  </div>

  <div class="value-props">
    <div class="prop-card">
      <div class="icon">⚡</div>
      <h3>Fast Decisions</h3>
      <p>Connect your accounts and get verified terms in minutes, not days. Our AI-powered platform analyzes your complete financial picture instantly.</p>
    </div>
    <div class="prop-card">
      <div class="icon">🤝</div>
      <h3>Fair Lending</h3>
      <p>We look beyond credit scores. Our holistic approach considers your full financial story, including cash flow, assets, and business potential.</p>
    </div>
    <div class="prop-card">
      <div class="icon">📈</div>
      <h3>Ongoing Support</h3>
      <p>Not ready yet? We'll create a personalized improvement plan and support you until you qualify. 73% of our mentorship participants get approved.</p>
    </div>
  </div>

  <div class="trust">
    <div class="trust-content">
      <h2>A CDFI Committed to Impact</h2>
      <p>As a Community Development Financial Institution, we're mission-driven to serve underserved businesses and communities. Your success is our success.</p>
      <div class="stats">
        <div class="stat">
          <div class="stat-value">500+</div>
          <div class="stat-label">Businesses Funded</div>
        </div>
        <div class="stat">
          <div class="stat-value">$45M</div>
          <div class="stat-label">Capital Deployed</div>
        </div>
        <div class="stat">
          <div class="stat-value">92%</div>
          <div class="stat-label">Success Rate</div>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <p>© 2026 CremoLogix. Member FDIC. Equal Housing Lender. NMLS #123456.</p>
  </footer>
</body>
</html>`;

// Screen 2: Account Creation (CL-02)
const screen02 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Create Account</title>
<style>
  ${commonStyles}
  body { background: ${colors.gray100}; display: flex; justify-content: center; align-items: center; padding: 24px; min-height: 100vh; }
  .card { background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 48px; max-width: 480px; width: 100%; }
  .logo { text-align: center; font-size: 28px; font-weight: 700; color: ${colors.navy}; margin-bottom: 8px; }
  .tagline { text-align: center; font-size: 13px; color: ${colors.gray600}; margin-bottom: 32px; }
  h1 { font-size: 24px; font-weight: 600; color: ${colors.navy}; margin-bottom: 32px; text-align: center; }
  .social-btns { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
  .social-btn { padding: 12px; border-radius: 8px; font-size: 15px; font-weight: 500; border: 1px solid ${colors.gray300}; background: white; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; }
  .social-btn:hover { background: ${colors.gray100}; border-color: ${colors.gray400}; }
  .social-btn.google { color: ${colors.gray700}; }
  .social-btn.apple { background: #000; color: white; border: none; }
  .social-btn.apple:hover { background: #1a1a1a; }
  .divider { display: flex; align-items: center; margin: 24px 0; color: ${colors.gray500}; font-size: 14px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: ${colors.gray300}; }
  .divider span { padding: 0 16px; }
  .form-group { margin-bottom: 20px; }
  label { display: block; font-size: 14px; font-weight: 500; color: ${colors.gray700}; margin-bottom: 6px; }
  input { width: 100%; padding: 12px; border: 1px solid ${colors.gray300}; border-radius: 6px; font-size: 15px; font-family: inherit; transition: border-color 0.2s; }
  input:focus { outline: none; border-color: ${colors.teal}; }
  .checkbox { display: flex; align-items: start; gap: 10px; margin-bottom: 24px; }
  .checkbox input { width: auto; margin-top: 4px; }
  .checkbox label { font-size: 13px; color: ${colors.gray600}; font-weight: 400; }
  .checkbox a { color: ${colors.teal}; text-decoration: none; }
  .submit-btn { width: 100%; padding: 14px; background: ${colors.teal}; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
  .submit-btn:hover { background: #005662; }
  .signin { text-align: center; margin-top: 24px; font-size: 14px; color: ${colors.gray600}; }
  .signin a { color: ${colors.teal}; text-decoration: none; font-weight: 500; }
</style>
</head>
<body>
  <div class="card">
    <div class="logo">CremoLogix</div>
    <div class="tagline">Financial Empowerment Platform</div>
    <h1>Create Your Account</h1>

    <div class="social-btns">
      <button class="social-btn google">
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/></svg>
        Continue with Google
      </button>
      <button class="social-btn apple">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M14.902 10.48c-.034-3.482 2.844-5.161 2.973-5.24-1.619-2.368-4.141-2.694-5.038-2.73-2.145-.218-4.187 1.263-5.275 1.263-1.088 0-2.77-1.231-4.552-1.198-2.341.033-4.5 1.361-5.705 3.458-2.433 4.224-.622 10.476 1.748 13.901 1.159 1.677 2.54 3.559 4.354 3.492 1.781-.07 2.455-1.152 4.607-1.152 2.152 0 2.791 1.152 4.584 1.117 1.89-.033 3.087-1.699 4.245-3.377 1.338-1.94 1.889-3.817 1.923-3.914-.042-.018-3.688-1.415-3.723-5.62z"/><path d="M12.226 2.85C13.171 1.692 13.825.148 13.642 0c-1.197.048-2.646.797-3.504 1.803-.77.892-1.444 2.317-1.262 3.684 1.335.103 2.697-.678 3.35-1.637z"/></svg>
        Continue with Apple
      </button>
    </div>

    <div class="divider"><span>or use email</span></div>

    <form>
      <div class="form-group">
        <label>Email</label>
        <input type="email" placeholder="your@email.com">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" placeholder="At least 8 characters">
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" placeholder="Re-enter password">
      </div>
      <div class="checkbox">
        <input type="checkbox" id="terms">
        <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
      </div>
      <button type="submit" class="submit-btn">Create Account</button>
    </form>

    <div class="signin">Already have an account? <a href="#">Sign In</a></div>
  </div>
</body>
</html>`;

// Screen 3: Welcome Experience (CL-03)
const screen03 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome</title>
<style>
  ${commonStyles}
  body { background: linear-gradient(135deg, ${colors.navy} 0%, ${colors.teal} 100%); color: white; display: flex; justify-content: center; align-items: center; padding: 24px; min-height: 100vh; }
  .container { max-width: 640px; text-align: center; }
  .icon { font-size: 80px; margin-bottom: 32px; }
  h1 { font-size: 36px; font-weight: 700; margin-bottom: 24px; }
  p { font-size: 18px; line-height: 1.7; opacity: 0.95; margin-bottom: 20px; }
  .promise-box { background: rgba(255,255,255,0.12); backdrop-filter: blur(10px); border-radius: 12px; padding: 32px; margin: 40px 0; border: 1px solid rgba(255,255,255,0.25); text-align: left; }
  .promise-box h2 { font-size: 22px; margin-bottom: 20px; color: ${colors.gold}; }
  .promise-box ul { list-style: none; }
  .promise-box li { font-size: 16px; line-height: 1.8; padding-left: 28px; position: relative; margin-bottom: 12px; }
  .promise-box li::before { content: '✓'; position: absolute; left: 0; color: ${colors.gold}; font-weight: 700; font-size: 18px; }
  .cta-btn { padding: 16px 48px; background: ${colors.gold}; color: ${colors.navy}; border: none; border-radius: 8px; font-size: 18px; font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; margin-top: 24px; }
  .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }
</style>
</head>
<body>
  <div class="container">
    <div class="icon">🤝</div>
    <h1>Welcome to CremoLogix</h1>
    <p>We're excited to partner with you on your financial journey. Before we begin, here's how we work.</p>
    <p>Traditional lending can be opaque and frustrating. We believe in transparency and partnership. Whether you're approved today or need to build toward approval, we're here to support you.</p>

    <div class="promise-box">
      <h2>Our Promise to You</h2>
      <ul>
        <li>Give us what we need, and we'll give you an answer fast</li>
        <li>We'll show you exactly where you stand at every step</li>
        <li>If we can't help today, we'll show you how to get there</li>
        <li>You'll have full visibility into how your terms are determined</li>
        <li>We'll never surprise you with hidden fees or unexpected requirements</li>
      </ul>
    </div>

    <p>Ready to get started? The application takes about 15 minutes, and you'll get preliminary terms immediately.</p>

    <button class="cta-btn">Let's Get Started</button>
  </div>
</body>
</html>`;

// Screen 4: Borrower Dashboard (CL-04)
const screen04 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard</title>
<style>
  ${commonStyles}
  body { background: ${colors.gray100}; display: flex; min-height: 100vh; }
  .sidebar { width: 240px; background: ${colors.navy}; color: white; padding: 24px 0; flex-shrink: 0; }
  .logo { padding: 0 24px; font-size: 22px; font-weight: 700; margin-bottom: 32px; }
  .nav-item { padding: 12px 24px; display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8); cursor: pointer; transition: all 0.2s; border-left: 3px solid transparent; }
  .nav-item:hover { background: rgba(255,255,255,0.08); color: white; }
  .nav-item.active { background: rgba(255,255,255,0.12); color: white; border-left-color: ${colors.gold}; }
  .main { flex: 1; display: flex; flex-direction: column; }
  .topbar { background: white; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid ${colors.gray200}; }
  .topbar h2 { font-size: 20px; color: ${colors.navy}; }
  .topbar .right { display: flex; align-items: center; gap: 16px; }
  .notification { width: 36px; height: 36px; border-radius: 50%; background: ${colors.gray100}; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; }
  .notification::after { content: ''; position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: ${colors.danger}; border-radius: 50%; }
  .content { padding: 32px; flex: 1; overflow-y: auto; }
  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 32px; }
  .stat-card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  .stat-label { font-size: 13px; color: ${colors.gray600}; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
  .stat-value { font-size: 28px; font-weight: 700; color: ${colors.navy}; }
  .stat-badge { display: inline-block; padding: 4px 12px; background: ${colors.success}; color: white; border-radius: 12px; font-size: 12px; font-weight: 600; margin-top: 8px; }
  .gauge { width: 80px; height: 80px; border-radius: 50%; background: conic-gradient(${colors.success} 0deg 259deg, ${colors.gray200} 259deg 360deg); display: flex; align-items: center; justify-content: center; margin: 12px 0; }
  .gauge-inner { width: 60px; height: 60px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: ${colors.navy}; }
  .actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 32px; }
  .action-card { background: white; padding: 28px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
  .action-card:hover { border-color: ${colors.teal}; box-shadow: 0 4px 12px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .action-card.primary { background: linear-gradient(135deg, ${colors.teal} 0%, ${colors.navy} 100%); color: white; }
  .action-card .icon { font-size: 40px; margin-bottom: 16px; }
  .action-card h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .action-card p { font-size: 14px; opacity: 0.85; }
  .section-title { font-size: 20px; font-weight: 600; color: ${colors.navy}; margin-bottom: 20px; }
  .timeline { background: white; padding: 28px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  .timeline-item { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid ${colors.gray200}; }
  .timeline-item:last-child { border-bottom: none; }
  .timeline-icon { width: 40px; height: 40px; border-radius: 50%; background: ${colors.gray100}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .timeline-content h4 { font-size: 15px; font-weight: 600; color: ${colors.navy}; margin-bottom: 4px; }
  .timeline-content p { font-size: 13px; color: ${colors.gray600}; }
  .timeline-time { font-size: 12px; color: ${colors.gray500}; margin-top: 4px; }
</style>
</head>
<body>
  <div class="sidebar">
    <div class="logo">CremoLogix</div>
    <div class="nav-item active">🏠 Home</div>
    <div class="nav-item">📝 Apply</div>
    <div class="nav-item">💼 My Loans</div>
    <div class="nav-item">💪 Financial Health</div>
    <div class="nav-item">👥 Mentorship</div>
    <div class="nav-item">📄 Documents</div>
    <div class="nav-item">💬 Messages</div>
    <div class="nav-item">⚙️ Settings</div>
  </div>

  <div class="main">
    <div class="topbar">
      <h2>Welcome back, Sarah</h2>
      <div class="right">
        <div class="notification">🔔</div>
      </div>
    </div>

    <div class="content">
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-label">Application Status</div>
          <div class="stat-value">In Progress</div>
          <span class="stat-badge">Gate 2 Complete</span>
        </div>
        <div class="stat-card">
          <div class="stat-label">Financial Health Score</div>
          <div class="gauge">
            <div class="gauge-inner">712</div>
          </div>
          <p style="font-size: 13px; color: ${colors.success}; margin-top: 8px;">↑ 15 points this month</p>
        </div>
        <div class="stat-card">
          <div class="stat-label">Next Action</div>
          <div class="stat-value" style="font-size: 16px; margin-top: 8px;">Connect bank accounts to get verified terms</div>
        </div>
      </div>

      <div class="section-title">Quick Actions</div>
      <div class="actions-grid">
        <div class="action-card primary">
          <div class="icon">💰</div>
          <h3>Apply for a Loan</h3>
          <p>Continue your application or start a new one</p>
        </div>
        <div class="action-card">
          <div class="icon">💪</div>
          <h3>Financial Health Check</h3>
          <p>Connect accounts to track your progress</p>
        </div>
        <div class="action-card">
          <div class="icon">📚</div>
          <h3>Learning Center</h3>
          <p>Courses, guides, and resources to help you grow</p>
        </div>
      </div>

      <div class="section-title">Recent Activity</div>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-icon">✓</div>
          <div class="timeline-content">
            <h4>Identity verification complete</h4>
            <p>Your identity has been successfully verified</p>
            <div class="timeline-time">2 hours ago</div>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon">✓</div>
          <div class="timeline-content">
            <h4>Credit check complete</h4>
            <p>Soft credit check completed with no impact to your score</p>
            <div class="timeline-time">3 hours ago</div>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon">📝</div>
          <div class="timeline-content">
            <h4>Application started</h4>
            <p>Working capital loan application initiated</p>
            <div class="timeline-time">1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

// Screen 5: Gate 1 - Intent (CL-05)
const screen05 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gate 1 - Intent</title>
<style>
  ${commonStyles}
  body { background: ${colors.gray100}; padding: 24px; min-height: 100vh; }
  .container { max-width: 720px; margin: 0 auto; }
  .stepper { display: flex; justify-content: space-between; margin-bottom: 48px; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  .step { flex: 1; text-align: center; position: relative; }
  .step::after { content: ''; position: absolute; top: 18px; left: 60%; width: 80%; height: 2px; background: ${colors.gray300}; z-index: 0; }
  .step:last-child::after { display: none; }
  .step-circle { width: 36px; height: 36px; border-radius: 50%; background: ${colors.gray300}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
  .step.active .step-circle { background: ${colors.teal}; }
  .step-label { font-size: 12px; color: ${colors.gray600}; }
  .step.active .step-label { color: ${colors.teal}; font-weight: 600; }
  .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  h1 { font-size: 28px; font-weight: 600; color: ${colors.navy}; margin-bottom: 32px; }
  .form-group { margin-bottom: 28px; }
  label { display: block; font-size: 15px; font-weight: 600; color: ${colors.navy}; margin-bottom: 8px; }
  .helper { font-size: 13px; color: ${colors.gray600}; margin-bottom: 8px; }
  select { width: 100%; padding: 12px; border: 1px solid ${colors.gray300}; border-radius: 8px; font-size: 15px; font-family: inherit; background: white; cursor: pointer; }
  input { width: 100%; padding: 12px; border: 1px solid ${colors.gray300}; border-radius: 8px; font-size: 15px; font-family: inherit; }
  .toggle-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .toggle-card { padding: 24px; border: 2px solid ${colors.gray300}; border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: center; }
  .toggle-card:hover { border-color: ${colors.teal}; }
  .toggle-card.selected { border-color: ${colors.teal}; background: rgba(0, 109, 119, 0.05); }
  .toggle-card .icon { font-size: 36px; margin-bottom: 12px; }
  .toggle-card h3 { font-size: 16px; font-weight: 600; color: ${colors.navy}; margin-bottom: 8px; }
  .toggle-card p { font-size: 13px; color: ${colors.gray600}; }
  .continue-btn { width: 100%; padding: 16px; background: ${colors.teal}; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 32px; transition: background 0.2s; }
  .continue-btn:hover { background: #005662; }
</style>
</head>
<body>
  <div class="container">
    <div class="stepper">
      <div class="step active">
        <div class="step-circle">1</div>
        <div class="step-label">Intent</div>
      </div>
      <div class="step">
        <div class="step-circle">2</div>
        <div class="step-label">Basics</div>
      </div>
      <div class="step">
        <div class="step-circle">3</div>
        <div class="step-label">Connect</div>
      </div>
      <div class="step">
        <div class="step-circle">4</div>
        <div class="step-label">Review</div>
      </div>
      <div class="step">
        <div class="step-circle">5</div>
        <div class="step-label">Decision</div>
      </div>
      <div class="step">
        <div class="step-circle">6</div>
        <div class="step-label">Close</div>
      </div>
    </div>

    <div class="card">
      <h1>What are you looking for?</h1>

      <div class="form-group">
        <label>Loan Purpose</label>
        <select>
          <option>Select a purpose</option>
          <option selected>Working Capital</option>
          <option>Equipment Purchase</option>
          <option>Real Estate</option>
          <option>Startup Costs</option>
          <option>Business Expansion</option>
          <option>Refinance Existing Debt</option>
        </select>
      </div>

      <div class="form-group">
        <label>How much do you need?</label>
        <div class="helper">We typically lend between $10,000 and $500,000</div>
        <input type="text" value="$50,000" placeholder="$50,000">
      </div>

      <div class="form-group">
        <label>Business Type</label>
        <div class="toggle-cards">
          <div class="toggle-card">
            <div class="icon">💡</div>
            <h3>Startup</h3>
            <p>Less than 2 years old or pre-revenue</p>
          </div>
          <div class="toggle-card selected">
            <div class="icon">🏢</div>
            <h3>Existing Business</h3>
            <p>Established with operating history</p>
          </div>
        </div>
      </div>

      <button class="continue-btn">Continue</button>
    </div>
  </div>
</body>
</html>`;

// Screen 6: Gate 2a - Credit Check (CL-06)
const screen06 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gate 2a - Credit Check</title>
<style>
  ${commonStyles}
  body { background: ${colors.gray100}; padding: 24px; min-height: 100vh; }
  .container { max-width: 640px; margin: 0 auto; }
  .stepper { display: flex; justify-content: space-between; margin-bottom: 48px; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  .step { flex: 1; text-align: center; position: relative; }
  .step::after { content: ''; position: absolute; top: 18px; left: 60%; width: 80%; height: 2px; background: ${colors.gray300}; z-index: 0; }
  .step:last-child::after { display: none; }
  .step-circle { width: 36px; height: 36px; border-radius: 50%; background: ${colors.gray300}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
  .step.active .step-circle { background: ${colors.teal}; }
  .step.complete .step-circle { background: ${colors.success}; }
  .step.complete .step-circle::after { content: '✓'; }
  .step-label { font-size: 12px; color: ${colors.gray600}; }
  .step.active .step-label { color: ${colors.teal}; font-weight: 600; }
  .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); text-align: center; }
  .icon { font-size: 64px; margin-bottom: 24px; }
  h1 { font-size: 28px; font-weight: 600; color: ${colors.navy}; margin-bottom: 16px; }
  .subtitle { font-size: 16px; color: ${colors.gray600}; margin-bottom: 32px; }
  .assurance { display: inline-block; padding: 12px 24px; background: rgba(42, 157, 143, 0.1); color: ${colors.success}; border-radius: 8px; font-weight: 600; font-size: 14px; margin-bottom: 32px; }
  .checklist { text-align: left; margin: 32px 0; }
  .checklist h3 { font-size: 16px; font-weight: 600; color: ${colors.navy}; margin-bottom: 16px; }
  .checklist-item { display: flex; align-items: start; gap: 12px; padding: 12px 0; }
  .checklist-item .icon { font-size: 20px; margin: 0; }
  .checklist-item .text { flex: 1; }
  .checklist-item h4 { font-size: 15px; font-weight: 600; color: ${colors.navy}; margin-bottom: 4px; }
  .checklist-item p { font-size: 13px; color: ${colors.gray600}; }
  .consent { background: ${colors.gray100}; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: left; }
  .consent label { display: flex; align-items: start; gap: 12px; font-size: 13px; color: ${colors.gray700}; line-height: 1.6; cursor: pointer; }
  .consent input { margin-top: 4px; }
  .continue-btn { padding: 16px 48px; background: ${colors.teal}; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 24px; transition: background 0.2s; }
  .continue-btn:hover { background: #005662; }
  .security-badge { margin-top: 24px; padding: 16px; background: ${colors.gray100}; border-radius: 8px; display: inline-block; }
  .security-badge .icon { font-size: 24px; margin: 0; }
  .security-badge p { font-size: 12px; color: ${colors.gray600}; margin-top: 8px; }
</style>
</head>
<body>
  <div class="container">
    <div class="stepper">
      <div class="step complete">
        <div class="step-circle"></div>
        <div class="step-label">Intent</div>
      </div>
      <div class="step active">
        <div class="step-circle">2</div>
        <div class="step-label">Basics</div>
      </div>
      <div class="step">
        <div class="step-circle">3</div>
        <div class="step-label">Connect</div>
      </div>
      <div class="step">
        <div class="step-circle">4</div>
        <div class="step-label">Review</div>
      </div>
      <div class="step">
        <div class="step-circle">5</div>
        <div class="step-label">Decision</div>
      </div>
      <div class="step">
        <div class="step-circle">6</div>
        <div class="step-label">Close</div>
      </div>
    </div>

    <div class="card">
      <div class="icon">📊</div>
      <h1>Let's Check Your Credit</h1>
      <div class="subtitle">We need to review your credit history to provide you with accurate terms</div>

      <div class="assurance">✓ This is a soft pull — it won't affect your score</div>

      <div class="checklist">
        <h3>What we're checking:</h3>
        <div class="checklist-item">
          <div class="icon">📋</div>
          <div class="text">
            <h4>Credit History</h4>
            <p>Length of credit accounts and overall credit age</p>
          </div>
        </div>
        <div class="checklist-item">
          <div class="icon">💳</div>
          <div class="text">
            <h4>Payment Patterns</h4>
            <p>On-time payments and any delinquencies</p>
          </div>
        </div>
        <div class="checklist-item">
          <div class="icon">📈</div>
          <div class="text">
            <h4>Outstanding Accounts</h4>
            <p>Current balances and credit utilization</p>
          </div>
        </div>
      </div>

      <div class="consent">
        <label>
          <input type="checkbox" checked>
          <span>I authorize CremoLogix to obtain my credit report from one or more consumer reporting agencies. I understand this is a soft inquiry and will not affect my credit score. I have read and agree to the <a href="#" style="color: ${colors.teal};">Credit Authorization Agreement</a>.</span>
        </label>
      </div>

      <button class="continue-btn">Check My Credit</button>

      <div class="security-badge">
        <div class="icon">🔒</div>
        <p>Your information is encrypted and secure</p>
      </div>
    </div>
  </div>
</body>
</html>`;

// Screen 7: Gate 2b - Identity Verification (CL-07)
const screen07 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gate 2b - Identity Verification</title>
<style>
  ${commonStyles}
  body { background: ${colors.gray100}; padding: 24px; min-height: 100vh; }
  .container { max-width: 640px; margin: 0 auto; }
  .stepper { display: flex; justify-content: space-between; margin-bottom: 48px; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  .step { flex: 1; text-align: center; position: relative; }
  .step::after { content: ''; position: absolute; top: 18px; left: 60%; width: 80%; height: 2px; background: ${colors.gray300}; z-index: 0; }
  .step:last-child::after { display: none; }
  .step-circle { width: 36px; height: 36px; border-radius: 50%; background: ${colors.gray300}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
  .step.active .step-circle { background: ${colors.teal}; }
  .step.complete .step-circle { background: ${colors.success}; }
  .step.complete .step-circle::after { content: '✓'; }
  .step-label { font-size: 12px; color: ${colors.gray600}; }
  .step.active .step-label { color: ${colors.teal}; font-weight: 600; }
  .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  h1 { font-size: 28px; font-weight: 600; color: ${colors.navy}; margin-bottom: 32px; }
  .form-group { margin-bottom: 24px; }
  label { display: block; font-size: 14px; font-weight: 600; color: ${colors.navy}; margin-bottom: 8px; }
  input { width: 100%; padding: 12px; border: 1px solid ${colors.gray300}; border-radius: 8px; font-size: 15px; font-family: inherit; }
  input:focus { outline: none; border-color: ${colors.teal}; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .dob-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  select { width: 100%; padding: 12px; border: 1px solid ${colors.gray300}; border-radius: 8px; font-size: 15px; font-family: inherit; background: white; }
  .continue-btn { width: 100%; padding: 16px; background: ${colors.teal}; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 32px; transition: background 0.2s; }
  .continue-btn:hover { background: #005662; }
  .security { text-align: center; margin-top: 24px; padding: 16px; background: ${colors.gray100}; border-radius: 8px; }
  .security .icon { font-size: 24px; margin-bottom: 8px; }
  .security p { font-size: 13px; color: ${colors.gray600}; }
</style>
</head>
<body>
  <div class="container">
    <div class="stepper">
      <div class="step complete">
        <div class="step-circle"></div>
        <div class="step-label">Intent</div>
      </div>
      <div class="step active">
        <div class="step-circle">2</div>
        <div class="step-label">Basics</div>
      </div>
      <div class="step">
        <div class="step-circle">3</div>
        <div class="step-label">Connect</div>
      </div>
      <div class="step">
        <div class="step-circle">4</div>
        <div class="step-label">Review</div>
      </div>
      <div class="step">
        <div class="step-circle">5</div>
        <div class="step-label">Decision</div>
      </div>
      <div class="step">
        <div class="step-circle">6</div>
        <div class="step-label">Close</div>
      </div>
    </div>

    <div class="card">
      <h1>Verify Your Identity</h1>

      <form>
        <div class="row">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" value="Sarah" placeholder="First name">
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" value="Chen" placeholder="Last name">
          </div>
        </div>

        <div class="form-group">
          <label>Date of Birth</label>
          <div class="dob-row">
            <select>
              <option>Month</option>
              <option selected>March</option>
            </select>
            <select>
              <option>Day</option>
              <option selected>15</option>
            </select>
            <select>
              <option>Year</option>
              <option selected>1988</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Social Security Number</label>
          <input type="text" value="***-**-6789" placeholder="***-**-****">
        </div>

        <div class="form-group">
          <label>Street Address</label>
          <input type="text" value="742 Market Street, Apt 3B" placeholder="Street address">
        </div>

        <div class="row">
          <div class="form-group">
            <label>City</label>
            <input type="text" value="San Francisco" placeholder="City">
          </div>
          <div class="form-group">
            <label>State</label>
            <select>
              <option>Select state</option>
              <option selected>California</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>ZIP Code</label>
          <input type="text" value="94103" placeholder="ZIP code">
        </div>

        <button type="submit" class="continue-btn">Verify Identity</button>
      </form>

      <div class="security">
        <div class="icon">🔒</div>
        <p>256-bit encrypted • SOC 2 Type II certified • Your data is never sold</p>
      </div>
    </div>
  </div>
</body>
</html>`;

// Screen 8: Gate 2c - Business Information (CL-08)
const screen08 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gate 2c - Business Information</title>
<style>
  ${commonStyles}
  body { background: ${colors.gray100}; padding: 24px; min-height: 100vh; }
  .container { max-width: 720px; margin: 0 auto; }
  .stepper { display: flex; justify-content: space-between; margin-bottom: 48px; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  .step { flex: 1; text-align: center; position: relative; }
  .step::after { content: ''; position: absolute; top: 18px; left: 60%; width: 80%; height: 2px; background: ${colors.gray300}; z-index: 0; }
  .step:last-child::after { display: none; }
  .step-circle { width: 36px; height: 36px; border-radius: 50%; background: ${colors.gray300}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-weight: 600; font-size: 14px; position: relative; z-index: 1; }
  .step.active .step-circle { background: ${colors.teal}; }
  .step.complete .step-circle { background: ${colors.success}; }
  .step.complete .step-circle::after { content: '✓'; }
  .step-label { font-size: 12px; color: ${colors.gray600}; }
  .step.active .step-label { color: ${colors.teal}; font-weight: 600; }
  .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }
  h1 { font-size: 28px; font-weight: 600; color: ${colors.navy}; margin-bottom: 32px; }
  .form-group { margin-bottom: 24px; }
  label { display: block; font-size: 14px; font-weight: 600; color: ${colors.navy}; margin-bottom: 8px; }
  .helper { font-size: 13px; color: ${colors.gray600}; margin-bottom: 8px; }
  input { width: 100%; padding: 12px; border: 1px solid ${colors.gray300}; border-radius: 8px; font-size: 15px; font-family: inherit; }
  input:focus { outline: none; border-color: ${colors.teal}; }
  select { width: 100%; padding: 12px; border: 1px solid ${colors.gray300}; border-radius: 8px; font-size: 15px; font-family: inherit; background: white; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .section-title { font-size: 18px; font-weight: 600; color: ${colors.navy}; margin: 32px 0 20px; padding-top: 32px; border-top: 1px solid ${colors.gray200}; }
  .stage-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; }
  .stage-card { padding: 20px; border: 2px solid ${colors.gray300}; border-radius: 12px; cursor: pointer; transition: all 0.2s; text-align: center; }
  .stage-card:hover { border-color: ${colors.teal}; }
  .stage-card.selected { border-color: ${colors.teal}; background: rgba(0, 109, 119, 0.05); }
  .stage-card .icon { font-size: 32px; margin-bottom: 8px; }
  .stage-card h3 { font-size: 14px; font-weight: 600; color: ${colors.navy}; margin-bottom: 6px; }
  .stage-card p { font-size: 12px; color: ${colors.gray600}; line-height: 1.4; }
  .continue-btn { width: 100%; padding: 16px; background: ${colors.teal}; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; margin-top: 32px; transition: background 0.2s; }
  .continue-btn:hover { background: #005662; }
</style>
</head>
<body>
  <div class="container">
    <div class="stepper">
      <div class="step complete">
        <div class="step-circle"></div>
        <div class="step-label">Intent</div>
      </div>
      <div class="step active">
        <div class="step-circle">2</div>
        <div class="step-label">Basics</div>
      </div>
      <div class="step">
        <div class="step-circle">3</div>
        <div class="step-label">Connect</div>
      </div>
      <div class="step">
        <div class="step-circle">4</div>
        <div class="step-label">Review</div>
      </div>
      <div class="step">
        <div class="step-circle">5</div>
        <div class="step-label">Decision</div>
      </div>
      <div class="step">
        <div class="step-circle">6</div>
        <div class="step-label">Close</div>
      </div>
    </div>

    <div class="card">
      <h1>Tell Us About Your Business</h1>

      <form>
        <div class="form-group">
          <label>Business Name</label>
          <input type="text" value="Chen's Wellness Studio" placeholder="Legal business name">
        </div>

        <div class="form-group">
          <label>Employer Identification Number (EIN)</label>
          <div class="helper">Optional for very early startups</div>
          <input type="text" value="**-***4567" placeholder="XX-XXXXXXX">
        </div>

        <div class="row">
          <div class="form-group">
            <label>Entity Type</label>
            <select>
              <option>Select entity type</option>
              <option selected>LLC</option>
              <option>Corporation</option>
              <option>Sole Proprietorship</option>
              <option>Partnership</option>
              <option>Nonprofit</option>
            </select>
          </div>
          <div class="form-group">
            <label>Industry</label>
            <select>
              <option>Select industry</option>
              <option selected>Health & Wellness</option>
              <option>Retail</option>
              <option>Food & Beverage</option>
              <option>Professional Services</option>
              <option>Construction</option>
            </select>
          </div>
        </div>

        <div class="section-title">Business Details</div>

        <div class="row">
          <div class="form-group">
            <label>Years in Operation</label>
            <select>
              <option>Select years</option>
              <option selected>2-3 years</option>
              <option>Less than 1 year</option>
              <option>1-2 years</option>
              <option>3-5 years</option>
              <option>5-10 years</option>
              <option>10+ years</option>
            </select>
          </div>
          <div class="form-group">
            <label>Number of Employees</label>
            <select>
              <option>Select range</option>
              <option selected>1-5</option>
              <option>6-10</option>
              <option>11-25</option>
              <option>26-50</option>
              <option>51-100</option>
              <option>100+</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Annual Revenue Range</label>
          <select>
            <option>Select range</option>
            <option>Pre-revenue</option>
            <option>$1 - $50,000</option>
            <option selected>$50,000 - $100,000</option>
            <option>$100,000 - $250,000</option>
            <option>$250,000 - $500,000</option>
            <option>$500,000 - $1M</option>
            <option>$1M+</option>
          </select>
        </div>

        <button type="submit" class="continue-btn">Continue</button>
      </form>
    </div>
  </div>
</body>
</html>`;

// Continue with more screens...
// Due to length, I'll create the remaining screens in the next part

const screens = [
  { id: 'CL-01', title: 'Landing Page', icon: '🏠', b64: b64(screen01) },
  { id: 'CL-02', title: 'Account Creation', icon: '👤', b64: b64(screen02) },
  { id: 'CL-03', title: 'Welcome Experience', icon: '🤝', b64: b64(screen03) },
  { id: 'CL-04', title: 'Borrower Dashboard', icon: '📊', b64: b64(screen04) },
  { id: 'CL-05', title: 'Gate 1 - Intent', icon: '🎯', b64: b64(screen05) },
  { id: 'CL-06', title: 'Gate 2a - Credit Check', icon: '📈', b64: b64(screen06) },
  { id: 'CL-07', title: 'Gate 2b - Identity', icon: '🔐', b64: b64(screen07) },
  { id: 'CL-08', title: 'Gate 2c - Business Info', icon: '🏢', b64: b64(screen08) },
];

// Wrapper HTML template
const wrapperHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CremoLogix v2 - Borrower Experience Demo</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { height: 100%; overflow: hidden; font-family: 'Segoe UI', system-ui, sans-serif; }
  #demo-bar { height: 40px; background: ${colors.navy}; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; font-size: 14px; z-index: 100; position: relative; }
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
  #fade-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #000; opacity: 0; pointer-events: none; transition: opacity .15s; z-index: 10; }
  #fade-overlay.show { opacity: .15; }
  #navigator { position: fixed; bottom: 24px; right: 24px; z-index: 200; }
  #nav-toggle { width: 56px; height: 56px; border-radius: 50%; background: ${colors.teal}; color: white; border: none; font-size: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,.2); transition: all .2s; }
  #nav-toggle:hover { transform: scale(1.05); box-shadow: 0 6px 16px rgba(0,0,0,.3); }
  #nav-panel { position: absolute; bottom: 70px; right: 0; width: 320px; max-height: 500px; background: white; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.15); opacity: 0; transform: translateY(10px) scale(0.95); pointer-events: none; transition: all .2s; overflow: hidden; }
  #nav-panel.show { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
  #nav-panel .header { padding: 16px; background: ${colors.navy}; color: white; font-weight: 600; font-size: 14px; }
  #nav-list { list-style: none; max-height: 436px; overflow-y: auto; }
  #nav-list li { padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #eee; transition: background .15s; display: flex; align-items: center; gap: 10px; font-size: 14px; }
  #nav-list li:hover { background: #f8f9fa; }
  #nav-list li.active { background: rgba(0, 109, 119, .08); color: ${colors.teal}; font-weight: 600; }
  #nav-list li .icon { font-size: 18px; }
  #nav-list li .info { flex: 1; min-width: 0; }
  #nav-list li .id { font-size: 11px; opacity: .6; }
  #nav-list li .label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
</head>
<body>

<div id="demo-bar">
  <div class="left">
    <a href="../" class="back-btn">← Back to Gallery</a>
    <div class="title">CremoLogix v2 - Borrower Portal</div>
  </div>
  <div class="indicator" id="screen-indicator">1 / ${screens.length}</div>
  <div class="nav-btns">
    <button id="btn-prev" title="Previous">◀</button>
    <button id="btn-next" title="Next">▶</button>
  </div>
</div>

<div id="frame-wrap">
  <iframe id="app-frame"></iframe>
  <div id="fade-overlay"></div>
</div>

<div id="navigator">
  <button id="nav-toggle" title="Jump to screen">≡</button>
  <div id="nav-panel">
    <div class="header">All Screens (${screens.length})</div>
    <ul id="nav-list"></ul>
  </div>
</div>

<script>
const SCREENS = ${JSON.stringify(screens, null, 2)};

let current = 0;
const frame = document.getElementById('app-frame');
const fade = document.getElementById('fade-overlay');
const indicator = document.getElementById('screen-indicator');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const nav = document.getElementById('navigator');
const navToggle = document.getElementById('nav-toggle');
const navPanel = document.getElementById('nav-panel');
const navList = document.getElementById('nav-list');

SCREENS.forEach((s, i) => {
  const li = document.createElement('li');
  li.innerHTML = \`
    <span class="icon">\${s.icon}</span>
    <div class="info">
      <div class="id">\${s.id}</div>
      <div class="label">\${s.title}</div>
    </div>
  \`;
  li.addEventListener('click', () => {
    goTo(i);
    navPanel.classList.remove('show');
  });
  navList.appendChild(li);
});

function goTo(index) {
  if (index < 0 || index >= SCREENS.length || index === current) return;

  fade.classList.add('show');
  setTimeout(() => {
    current = index;
    frame.srcdoc = atob(SCREENS[current].b64);
    indicator.textContent = \`\${current + 1} / \${SCREENS.length}\`;
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === SCREENS.length - 1;

    document.querySelectorAll('#nav-list li').forEach((li, i) => {
      li.classList.toggle('active', i === current);
    });

    setTimeout(() => fade.classList.remove('show'), 50);
  }, 150);
}

btnPrev.addEventListener('click', () => goTo(current - 1));
btnNext.addEventListener('click', () => goTo(current + 1));
navToggle.addEventListener('click', () => navPanel.classList.toggle('show'));

document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) navPanel.classList.remove('show');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'Escape') navPanel.classList.remove('show');
});

goTo(0);
</script>

</body>
</html>`;

// Write the output file
const outputPath = path.join(__dirname, 'cremologix-v2', 'demo-borrower.html');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, wrapperHTML, 'utf8');

console.log(`✓ Created ${outputPath}`);
console.log(`✓ Generated ${screens.length} screens`);
console.log('  Note: This is phase 1 with 8 screens. Run phase 2 to add remaining 14 screens.');
