export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');`;

export const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --blue: #6366f1; --violet: #8b5cf6; --rose: #E11D48; --amber: #D97706; --green: #059669;
  --ff: 'DM Sans', sans-serif; --ff2: 'Syne', sans-serif;
}


/* Mobile Navbar */

.hamburger-btn {
  display: none;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.mobile-menu {
  display: none;
}

@media (max-width: 768px) {

  .hamburger-btn {
    display: block;
  }

  .desktop-nav {
    display: none !important;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    margin-top: 10px;
  }

  .mobile-menu button {
    width: 100%;
  }
}



[data-theme="dark"] {
  --bg: linear-gradient(135deg, #050510 0%, #0b0924 50%, #1e113a 100%);
  --surface: rgba(10,10,20,0.45); --surface-hover: rgba(15,15,30,0.7);
  --border: rgba(99,102,241,0.15); --border-strong: rgba(168,85,247,0.25);
  --text: #ffffff; --text-body: #cbd5e1; --text-muted: #a5b4fc;
  --input-bg: rgba(5,5,12,0.7); --card-bg: rgba(255,255,255,0.02);
  --tag-bg: linear-gradient(135deg,rgba(99,102,241,0.15),rgba(236,72,153,0.15));
  --tag-color: #c7d2fe; --tag-border: rgba(99,102,241,0.3);
  --nav-bg: rgba(5,5,16,0.6);
  --badge-bg: linear-gradient(135deg,rgba(99,102,241,0.2),rgba(236,72,153,0.15));
  --badge-border: rgba(99,102,241,0.4); --grid-line: rgba(99,102,241,0.04);
  --glow1: rgba(99,102,241,0.25); --glow2: rgba(236,72,153,0.2);
  --pill-bg: rgba(255,255,255,0.04); --pill-border: rgba(99,102,241,0.2); --pill-text: #a5b4fc;
  --input-border: rgba(99,102,241,0.25); --input-text: #ffffff; --placeholder: #475569;
  --drop-border: #a855f7; --drop-bg: linear-gradient(135deg,rgba(5,5,15,0.5),rgba(30,17,58,0.3));
  --tabs-bg: rgba(0,0,0,0.4); --tab-inactive: #94a3b8;
  --exp-bg: linear-gradient(135deg,rgba(255,255,255,0.03),rgba(99,102,241,0.05));
  --exp-border: rgba(139,92,246,0.25);
  --hero-border: rgba(99,102,241,0.25); --sline: rgba(139,92,246,0.3);
  --danger-bg: rgba(225,29,72,0.07); --danger-border: rgba(225,29,72,0.22);
  --success-bg: rgba(5,150,105,0.1); --success-border: rgba(5,150,105,0.3);
  --m-card-bg: rgba(255,255,255,0.03); --m-card-border: rgba(99,102,241,0.18);
  --m-card-border-hover: rgba(99,102,241,0.4); --m-divider: rgba(99,102,241,0.18);
  --m-eyebrow-bg: rgba(99,102,241,0.12); --m-eyebrow-border: rgba(99,102,241,0.22);
  --m-step-tag-bg: rgba(99,102,241,0.12); --m-step-tag-color: #a5b4fc;
  --m-pill-blue-bg: rgba(99,102,241,0.12); --m-pill-blue-color: #a5b4fc;
  --m-pill-violet-bg: rgba(139,92,246,0.12); --m-pill-violet-color: #c4b5fd;
  --m-pill-pink-bg: rgba(236,72,153,0.12); --m-pill-pink-color: #f9a8d4;
  --m-illus-card-bg: rgba(255,255,255,0.03);
  --m-stat-val-from: #a5b4fc; --m-stat-val-to: #f9a8d4;
  --heat-empty: rgba(16,185,129,0.08);
  --streak-bg: rgba(5,150,105,0.12); --streak-border: rgba(5,150,105,0.3);
  --chat-user-bg: linear-gradient(135deg,#6366f1,#8b5cf6);
  --chat-ai-bg: rgba(255,255,255,0.03); --chat-ai-border: rgba(99,102,241,0.2);
  --perf-card-bg: rgba(255,255,255,0.03); --perf-card-border: rgba(99,102,241,0.18);
}
[data-theme="light"] {
  --bg: linear-gradient(135deg,#f5f3ff 0%,#fdf2f8 40%,#e0e7ff 100%);
  --surface: rgba(255,255,255,0.45); --surface-hover: rgba(255,255,255,0.75);
  --border: rgba(99,102,241,0.12); --border-strong: rgba(99,102,241,0.2);
  --text: #0f172a; --text-body: #1e1b4b; --text-muted: #4f46e5;
  --input-bg: rgba(255,255,255,0.85); --card-bg: rgba(255,255,255,0.6);
  --tag-bg: linear-gradient(135deg,rgba(99,102,241,0.08),rgba(236,72,153,0.08));
  --tag-color: #4f46e5; --tag-border: rgba(99,102,241,0.15);
  --nav-bg: rgba(245,243,255,0.6);
  --badge-bg: linear-gradient(135deg,rgba(99,102,241,0.12),rgba(236,72,153,0.12));
  --badge-border: rgba(99,102,241,0.25); --grid-line: rgba(99,102,241,0.05);
  --glow1: rgba(99,102,241,0.35); --glow2: rgba(236,72,153,0.3);
  --pill-bg: rgba(255,255,255,0.8); --pill-border: rgba(99,102,241,0.15); --pill-text: #4f46e5;
  --input-border: rgba(99,102,241,0.2); --input-text: #0f172a; --placeholder: #94a3b8;
  --drop-border: #8b5cf6;
  --tabs-bg: rgba(99,102,241,0.08); --tab-inactive: #4f46e5;
  --exp-bg: linear-gradient(135deg,rgba(255,255,255,0.7),rgba(245,243,255,0.7));
  --exp-border: rgba(99,102,241,0.2);
  --hero-border: rgba(99,102,241,0.15); --sline: rgba(99,102,241,0.2);
  --danger-bg: rgba(225,29,72,0.06); --danger-border: rgba(225,29,72,0.2);
  --success-bg: rgba(5,150,105,0.08); --success-border: rgba(5,150,105,0.25);
  --m-card-bg: rgba(255,255,255,0.7); --m-card-border: rgba(99,102,241,0.14);
  --m-card-border-hover: rgba(99,102,241,0.35); --m-divider: rgba(99,102,241,0.15);
  --m-eyebrow-bg: rgba(99,102,241,0.08); --m-eyebrow-border: rgba(99,102,241,0.18);
  --m-step-tag-bg: rgba(99,102,241,0.08); --m-step-tag-color: #4f46e5;
  --m-pill-blue-bg: rgba(99,102,241,0.08); --m-pill-blue-color: #4338ca;
  --m-pill-violet-bg: rgba(139,92,246,0.08); --m-pill-violet-color: #6d28d9;
  --m-pill-pink-bg: rgba(236,72,153,0.08); --m-pill-pink-color: #be185d;
  --m-illus-card-bg: rgba(255,255,255,0.5);
  --m-stat-val-from: #6366f1; --m-stat-val-to: #ec4899;
  --heat-empty: rgba(16,185,129,0.08);
  --streak-bg: rgba(5,150,105,0.08); --streak-border: rgba(5,150,105,0.25);
  --chat-user-bg: linear-gradient(135deg,#6366f1,#8b5cf6);
  --chat-ai-bg: rgba(255,255,255,0.7); --chat-ai-border: rgba(99,102,241,0.15);
  --perf-card-bg: rgba(255,255,255,0.7); --perf-card-border: rgba(99,102,241,0.14);
}
html,body,#root { height:100%; width:100%; font-family:var(--ff); background:var(--bg); color:var(--text-body); -webkit-font-smoothing:antialiased; overflow-x:hidden; transition:background 0.45s ease,color 0.3s ease; }
.bg-grid { position:fixed; inset:0; z-index:0; pointer-events:none; background-image:linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px); background-size:60px 60px; }
.bg-glow,.bg-glow2 { position:fixed; border-radius:50%; z-index:0; pointer-events:none; filter:blur(60px); }
.bg-glow { width:700px; height:700px; background:radial-gradient(circle,var(--glow1) 0%,transparent 70%); top:-10%; right:-10%; }
.bg-glow2 { width:500px; height:500px; background:radial-gradient(circle,var(--glow2) 0%,transparent 70%); bottom:-10%; left:-10%; }
.app-wrap { position:relative; z-index:1; min-height:100vh; display:flex; flex-direction:column; }
.nav { display:flex; align-items:center; justify-content:space-between; padding:14px 28px; border-bottom:1px solid var(--border); position:sticky; top:0; z-index:100; background:var(--nav-bg); backdrop-filter:blur(30px); }
.nav-brand { font-family:var(--ff2); font-size:20px; font-weight:800; color:var(--text); letter-spacing:-0.5px; cursor:pointer; }
.nav-brand em { font-style:normal; color:var(--blue); }
.nav-right { display:flex; align-items:center; gap:10px; }
.nav-link { padding:6px 12px; border-radius:8px; border:1px solid var(--border); background:transparent; font-family:var(--ff); font-size:12px; font-weight:500; color:var(--text-muted); cursor:pointer; }
.nav-link:hover { border-color:var(--blue); color:var(--text); }
.nav-link.active { background:rgba(99,102,241,0.15); border-color:rgba(99,102,241,0.4); color:#a5b4fc; }
.avatar-circle { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#fff; cursor:pointer; }
.powered-badge { display:flex; align-items:center; gap:6px; padding:4px 10px; border-radius:20px; border:1px solid var(--badge-border); background:var(--badge-bg); font-size:10px; font-weight:500; color:var(--blue); }
.powered-dot { width:6px; height:6px; border-radius:50%; background:var(--blue); animation:pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
.theme-toggle-btn { width:36px; height:36px; border-radius:10px; border:1px solid var(--border); background:var(--surface); cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; }

/* AUTH */
.auth-page { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 20px; }
.auth-card { width:100%; max-width:420px; background:var(--surface); border:1px solid var(--border-strong); border-radius:22px; padding:36px 32px; backdrop-filter:blur(30px); box-shadow:0 24px 60px rgba(0,0,0,0.3); }
.auth-logo { text-align:center; margin-bottom:24px; }
.auth-logo-text { font-family:var(--ff2); font-size:28px; font-weight:800; color:var(--text); }
.auth-logo-text em { font-style:normal; color:var(--blue); }
.auth-tagline { font-size:13px; color:var(--text-muted); margin-top:4px; }
.auth-tabs { display:flex; gap:4px; background:rgba(0,0,0,0.4); border-radius:10px; padding:4px; margin-bottom:24px; }
.auth-tab { flex:1; padding:8px; border-radius:7px; border:none; background:transparent; font-family:var(--ff); font-size:13px; font-weight:500; color:#94a3b8; cursor:pointer; }
.auth-tab.active { background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; }
.form-group { margin-bottom:14px; }
.form-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--text-body); opacity:0.8; margin-bottom:6px; display:block; }
.form-input { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:11px 14px; font-family:var(--ff); font-size:14px; color:var(--input-text); outline:none; }
.form-input::placeholder { color:var(--placeholder); }
.form-input:focus { border-color:rgba(99,102,241,0.6); }
.auth-btn { width:100%; padding:13px; border:none; border-radius:11px; margin-top:6px; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:14px; font-weight:600; cursor:pointer; }
.auth-error { background:var(--danger-bg); border:1px solid var(--danger-border); border-radius:9px; padding:10px 12px; font-size:12px; color:#fb7185; margin-bottom:12px; }
.auth-success { background:var(--success-bg); border:1px solid var(--success-border); border-radius:9px; padding:10px 12px; font-size:12px; color:#34d399; margin-bottom:12px; }
.admin-hint { text-align:center; font-size:11px; color:var(--text-muted); margin-top:12px; opacity:0.7; }

/* MAIN */
.main-content { flex:1; display:flex; flex-direction:column; align-items:center; padding:32px 20px 80px; max-width:1200px; width:100%; margin:0 auto; }

/* HERO */
.hero { width:100%; display:flex; flex-direction:column; align-items:center; }
.hero-badge { display:inline-flex; align-items:center; gap:6px; padding:6px 14px; border-radius:20px; border:1px solid var(--badge-border); background:var(--badge-bg); font-size:11px; font-weight:500; color:var(--blue); margin-bottom:16px; }
.hero-badge-dot { width:6px; height:6px; border-radius:50%; background:var(--blue); }
.hero-title { font-family:var(--ff2); font-size:42px; font-weight:800; line-height:1.15; color:var(--text); letter-spacing:-1.5px; margin-bottom:8px; text-align:center; }
.hero-title .grad1 { background:linear-gradient(135deg,#6366f1,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hero-title .grad2 { background:linear-gradient(135deg,#8b5cf6,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.hero-sub { font-size:15px; line-height:1.6; color:var(--text-body); opacity:0.85; margin-bottom:28px; text-align:center; max-width:580px; }
.input-card { width:100%; max-width:680px; background:var(--surface); border:1px solid var(--border-strong); border-radius:20px; padding:24px; backdrop-filter:blur(30px); box-shadow:0 20px 40px rgba(0,0,0,0.15); }
.tab-row { display:flex; gap:4px; margin-bottom:20px; background:var(--tabs-bg); border-radius:12px; padding:4px; }
.tab-btn { flex:1; padding:9px; border-radius:8px; border:none; background:transparent; font-family:var(--ff); font-size:13px; font-weight:500; color:var(--tab-inactive); cursor:pointer; }
.tab-btn.active { background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; }
.input-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--text-body); opacity:0.8; margin-bottom:8px; }
.url-wrap { display:flex; align-items:center; gap:10px; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:12px; padding:12px 14px; margin-bottom:12px; }
.url-wrap:focus-within { border-color:rgba(99,102,241,0.6); }
.url-icon { font-size:14px; color:var(--text-muted); }
.url-input { flex:1; background:transparent; border:none; outline:none; font-family:var(--ff); font-size:14px; color:var(--input-text); width:100%; }
.url-input::placeholder { color:var(--placeholder); }
.tag-row { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:16px; }
.tag { padding:3px 8px; border-radius:6px; background:var(--tag-bg); border:1px solid var(--tag-border); font-size:10px; font-weight:600; color:var(--tag-color); }
.drop-zone { border:1.5px dashed var(--drop-border); border-radius:14px; background:var(--drop-bg); text-align:center; padding:40px 16px; cursor:pointer; position:relative; margin-bottom:16px; }
.drop-zone input { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; }
.dz-icon { font-size:28px; margin-bottom:8px; display:block; }
.dz-txt { font-size:13px; font-weight:600; color:var(--text); margin-bottom:4px; }
.dz-sub { font-size:11px; color:var(--text-body); opacity:0.8; }
.analyze-btn { width:100%; padding:13px; border:none; border-radius:12px; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; }
.analyze-btn:disabled { opacity:0.6; cursor:not-allowed; }
.error-box { background:var(--danger-bg); border:1px solid var(--danger-border); border-radius:10px; padding:12px; margin-bottom:12px; font-size:12px; color:#fb7185; }
.loading-overlay { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:40px; text-align:center; backdrop-filter:blur(20px); width:100%; max-width:680px; }
.spinner { width:32px; height:32px; border-radius:50%; border:2px solid var(--border); border-top-color:var(--blue); animation:spin .7s linear infinite; margin:0 auto 14px; }
@keyframes spin { to { transform:rotate(360deg); } }
.loading-title { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); }
.loading-sub { font-size:12px; color:var(--text-body); opacity:0.85; margin-top:4px; }

/* RESULTS */
.results-page { width:100%; max-width:780px; }
.results-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; gap:12px; flex-wrap:wrap; }
.results-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.back-btn { display:inline-flex; align-items:center; gap:6px; padding:6px 12px; border-radius:8px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff); font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; backdrop-filter:blur(10px); }
.source-chip { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:20px; background:var(--badge-bg); border:1px solid var(--badge-border); font-size:11px; font-weight:600; color:var(--text-body); margin-bottom:20px; max-width:100%; overflow:hidden; }
.source-chip-text { max-width:400px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--text); }
.action-row { display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap; }
.act-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border-radius:8px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff); font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; }
.act-btn:disabled { opacity:0.5; cursor:not-allowed; }
.act-btn.copied { background:rgba(5,150,105,.15); border-color:rgba(5,150,105,.4); color:#34d399; }
.act-btn.ppt-btn { background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(99,102,241,0.1)); border-color:rgba(139,92,246,0.4); color:#c4b5fd; }
.act-btn.pdf-btn { background:linear-gradient(135deg,rgba(225,29,72,0.12),rgba(239,68,68,0.08)); border-color:rgba(225,29,72,0.35); color:#fca5a5; }
.act-btn.chat-btn { background:linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.1)); border-color:rgba(16,185,129,0.4); color:#34d399; }
.act-btn.scenario-btn { background:linear-gradient(135deg,rgba(245,158,11,0.15),rgba(217,119,6,0.1)); border-color:rgba(245,158,11,0.4); color:#fcd34d; }
.summary-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; margin-bottom:20px; }
.summary-card .md h1 { font-family:var(--ff2); font-size:16px; font-weight:800; color:var(--text); margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--border); }
.summary-card .md h2 { font-family:var(--ff2); font-size:12px; font-weight:700; color:var(--blue); text-transform:uppercase; letter-spacing:.06em; margin:18px 0 8px; display:flex; align-items:center; gap:8px; }
.summary-card .md h2::before { content:''; display:block; flex:1; height:1px; background:var(--sline); }
.summary-card .md p { font-size:13.5px; line-height:1.65; color:var(--text-body); margin-bottom:10px; }
.summary-card .md li { font-size:13px; line-height:1.6; color:var(--text-body); margin-bottom:6px; padding-left:14px; position:relative; list-style:none; }
.summary-card .md li::before { content:'→'; position:absolute; left:0; color:var(--blue); font-weight:700; }
.quiz-cta { background:rgba(255,255,255,0.02); border:1px solid var(--border-strong); border-radius:16px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.qcta-title { font-family:var(--ff2); font-size:15px; font-weight:800; color:var(--text); }
.qcta-sub { font-size:12px; color:var(--text-body); opacity:0.85; margin-top:2px; }
.quiz-cta-btn { padding:10px 22px; border-radius:11px; border:none; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }
.scenario-cta { background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.25); border-radius:16px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-top:12px; }
.scenario-cta-btn { padding:10px 22px; border-radius:11px; border:none; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }

/* PPT MODAL */
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); z-index:999; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(6px); }
.modal-card { background:#0b0924; border:1px solid var(--border-strong); border-radius:22px; padding:32px; width:100%; max-width:480px; box-shadow:0 40px 80px rgba(0,0,0,0.5); }
.modal-title { font-family:var(--ff2); font-size:20px; font-weight:800; color:var(--text); margin-bottom:6px; }
.modal-sub { font-size:13px; color:var(--text-body); opacity:0.85; margin-bottom:24px; }
.slide-count-input { background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:10px 14px; font-family:var(--ff); font-size:14px; color:var(--input-text); outline:none; width:80px; text-align:center; }
.modal-btns { display:flex; gap:10px; }
.modal-btn { flex:1; padding:12px; border-radius:11px; font-family:var(--ff2); font-size:13px; font-weight:600; cursor:pointer; }
.modal-btn.primary { background:linear-gradient(135deg,var(--blue),var(--violet)); border:none; color:#fff; }
.modal-btn.secondary { background:transparent; border:1px solid var(--border-strong); color:var(--text-muted); }
.ppt-progress-bar { height:4px; border-radius:4px; background:var(--border); overflow:hidden; margin:16px 0 8px; }
.ppt-progress-fill { height:100%; background:linear-gradient(90deg,var(--blue),var(--violet)); transition:width 0.4s ease; }

/* PPT EDITOR */
.ppt-editor-page { width:100%; max-width:1000px; }
.ppt-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.ppt-title-h { font-family:var(--ff2); font-size:22px; font-weight:800; color:var(--text); }
.ppt-toolbar { display:flex; gap:8px; flex-wrap:wrap; }
.toolbar-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border-radius:8px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff); font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; }
.toolbar-btn.primary { background:linear-gradient(135deg,var(--blue),var(--violet)); border:none; color:#fff; }
.toolbar-btn:disabled { opacity:0.5; cursor:not-allowed; }
.slides-list { display:flex; gap:10px; overflow-x:auto; padding-bottom:12px; margin-bottom:20px; }
.slide-thumb { width:130px; flex-shrink:0; border:2px solid transparent; border-radius:10px; background:var(--surface); cursor:pointer; padding:8px; transition:all .2s; }
.slide-thumb.active { border-color:var(--blue); }
.slide-thumb-num { font-size:9px; color:var(--text-muted); margin-bottom:4px; font-family:var(--ff2); }
.slide-thumb-preview { font-size:10px; color:var(--text-body); line-height:1.3; overflow:hidden; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; }
.slide-editor { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; }
.slide-editor-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--blue); margin-bottom:8px; }
.slide-title-input { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:10px 14px; font-family:var(--ff2); font-size:16px; font-weight:700; color:var(--input-text); outline:none; margin-bottom:14px; }
.slide-title-input:focus { border-color:rgba(99,102,241,0.6); }
.slide-content-input { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:12px 14px; font-family:var(--ff); font-size:13px; color:var(--input-text); outline:none; min-height:150px; resize:vertical; line-height:1.6; }
.slide-content-input:focus { border-color:rgba(99,102,241,0.6); }
.slide-canvas-wrap { margin-top:20px; border-radius:14px; overflow:hidden; border:2px solid rgba(99,102,241,0.3); box-shadow:0 20px 60px rgba(0,0,0,0.5); aspect-ratio:16/9; position:relative; width:100%; }
.slide-canvas { width:100%; height:100%; position:relative; display:flex; flex-direction:column; }
.slide-canvas.type-title { background:linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%); }
.slide-canvas.type-overview { background:linear-gradient(135deg,#0a0a1a 0%,#1a1a3e 100%); }
.slide-canvas.type-content { background:linear-gradient(135deg,#050510 0%,#0d0d20 100%); }
.slide-canvas.type-highlight { background:linear-gradient(135deg,#0d0922 0%,#1a0d40 60%,#2d0d52 100%); }
.slide-canvas.type-conclusion { background:linear-gradient(135deg,#0f0c29 0%,#1e113a 50%,#2d1b4e 100%); }
.slide-top-bar { height:4px; width:100%; flex-shrink:0; }
.slide-num-badge { position:absolute; top:16px; right:16px; font-size:10px; font-family:var(--ff2); color:rgba(255,255,255,0.3); font-weight:700; letter-spacing:2px; }
.slide-corner-decoration { position:absolute; width:120px; height:120px; border-radius:50%; opacity:0.08; }
.slide-body { flex:1; display:flex; flex-direction:column; justify-content:center; padding:32px 40px; position:relative; z-index:1; }
.slide-tag { display:inline-block; font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; padding:3px 10px; border-radius:20px; margin-bottom:12px; }
.slide-main-title { font-family:var(--ff2); font-size:clamp(16px,3.5vw,28px); font-weight:800; color:#fff; line-height:1.2; margin-bottom:10px; text-shadow:0 2px 20px rgba(0,0,0,0.4); }
.slide-main-title.large { font-size:clamp(22px,5vw,38px); }
.slide-divider { width:40px; height:3px; border-radius:3px; margin-bottom:16px; }
.slide-bullets { list-style:none; display:flex; flex-direction:column; gap:8px; }
.slide-bullet-item { display:flex; align-items:flex-start; gap:10px; }
.slide-bullet-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; margin-top:6px; }
.slide-bullet-text { font-size:clamp(10px,1.8vw,14px); color:rgba(255,255,255,0.85); line-height:1.5; font-family:var(--ff); }
.slide-footer { display:flex; align-items:center; justify-content:space-between; padding:12px 40px; border-top:1px solid rgba(255,255,255,0.06); flex-shrink:0; }
.slide-footer-brand { font-family:var(--ff2); font-size:9px; font-weight:800; color:rgba(255,255,255,0.25); letter-spacing:1px; text-transform:uppercase; }
.slide-footer-progress { display:flex; gap:3px; }
.slide-footer-dot { width:16px; height:2px; border-radius:2px; }
.slide-grid-2col { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:4px; }
.slide-grid-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; }
.slide-grid-card-title { font-family:var(--ff2); font-size:clamp(9px,1.5vw,12px); font-weight:700; color:rgba(255,255,255,0.9); margin-bottom:4px; }
.slide-grid-card-text { font-size:clamp(8px,1.3vw,11px); color:rgba(255,255,255,0.6); line-height:1.4; }
.slide-subtitle { font-size:clamp(10px,1.8vw,14px); color:rgba(255,255,255,0.6); font-family:var(--ff); margin-bottom:20px; }

/* HISTORY PAGE */
.history-page { width:100%; max-width:780px; }
.history-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.history-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.history-empty { text-align:center; padding:60px 20px; color:var(--text-muted); }
.history-empty-icon { font-size:3rem; display:block; margin-bottom:12px; }
.history-empty-txt { font-size:15px; font-weight:600; color:var(--text); margin-bottom:6px; }
.history-list { display:flex; flex-direction:column; gap:12px; margin-bottom:32px; }
.history-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px 20px; cursor:pointer; transition:all .2s; backdrop-filter:blur(20px); }
.history-card:hover { border-color:var(--border-strong); transform:translateY(-2px); }
.history-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin-bottom:8px; }
.history-card-source { font-size:12px; color:var(--text-muted); word-break:break-all; flex:1; }
.history-card-date { font-size:11px; color:#64748b; white-space:nowrap; }
.history-card-preview { font-size:13px; color:var(--text-body); line-height:1.5; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; }
.history-card-footer { display:flex; gap:6px; margin-top:10px; }
.history-tag { padding:2px 8px; border-radius:5px; font-size:10px; font-weight:600; background:var(--tag-bg); border:1px solid var(--tag-border); color:var(--tag-color); }
.delete-btn { margin-left:auto; padding:3px 8px; border-radius:5px; border:none; background:var(--danger-bg); color:#fb7185; font-size:11px; cursor:pointer; }

/* HEATMAP */
.heatmap-section { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:22px; margin-bottom:20px; backdrop-filter:blur(20px); }
.heatmap-title { font-family:var(--ff2); font-size:14px; font-weight:700; color:var(--text); margin-bottom:4px; }
.heatmap-sub { font-size:11px; color:var(--text-muted); margin-bottom:16px; }
.heatmap-grid { display:flex; gap:3px; overflow-x:auto; padding-bottom:4px; }
.heatmap-week { display:flex; flex-direction:column; gap:3px; }
.heatmap-cell { width:12px; height:12px; border-radius:2px; cursor:default; transition:transform .15s,box-shadow .15s; }
.heatmap-cell:hover { transform:scale(1.4); }
.heatmap-cell.empty { background:var(--heat-empty); }
.heatmap-cell.low   { background:#4ade80; box-shadow:0 0 4px rgba(74,222,128,0.4); }
.heatmap-cell.mid   { background:#22c55e; box-shadow:0 0 5px rgba(34,197,94,0.5); }
.heatmap-cell.high  { background:#16a34a; box-shadow:0 0 6px rgba(22,163,74,0.55); }
.heatmap-cell.full  { background:#15803d; box-shadow:0 0 8px rgba(21,128,61,0.7); }
.heatmap-cell.today-active { outline:2px solid #4ade80; outline-offset:1px; }
.heatmap-legend { display:flex; align-items:center; gap:6px; margin-top:10px; font-size:10px; color:var(--text-muted); }
.heatmap-legend-cell { width:10px; height:10px; border-radius:2px; }
.heatmap-legend-cell.empty { background:var(--heat-empty); }
.heatmap-legend-cell.low  { background:#4ade80; }
.heatmap-legend-cell.mid  { background:#22c55e; }
.heatmap-legend-cell.high { background:#16a34a; }
.heatmap-legend-cell.full { background:#15803d; }
.streak-badges { display:flex; gap:10px; flex-wrap:wrap; margin-top:14px; }
.streak-badge { display:flex; align-items:center; gap:7px; padding:8px 14px; border-radius:10px; background:var(--streak-bg); border:1px solid var(--streak-border); }
.streak-badge-val { font-family:var(--ff2); font-size:18px; font-weight:800; color:#10b981; }
.streak-badge-label { font-size:11px; color:var(--text-muted); font-weight:500; }

/* IMPROVEMENT GRAPH */
.improvement-section { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:22px; margin-bottom:28px; backdrop-filter:blur(20px); }
.improvement-title { font-family:var(--ff2); font-size:14px; font-weight:700; color:var(--text); margin-bottom:2px; }
.improvement-sub { font-size:11px; color:var(--text-muted); margin-bottom:18px; }
.graph-tabs { display:flex; gap:4px; margin-bottom:16px; }
.graph-tab { padding:4px 12px; border-radius:6px; border:1px solid var(--border); background:transparent; font-family:var(--ff); font-size:11px; font-weight:600; color:var(--text-muted); cursor:pointer; }
.graph-tab.active { background:rgba(16,185,129,0.15); border-color:rgba(16,185,129,0.4); color:#10b981; }
.line-graph-wrap { position:relative; width:100%; height:160px; }
.line-graph-wrap svg { width:100%; height:100%; overflow:visible; }
.graph-tooltip { position:absolute; background:rgba(0,0,0,0.85); border:1px solid rgba(16,185,129,0.4); border-radius:8px; padding:6px 10px; font-size:11px; color:#fff; pointer-events:none; white-space:nowrap; transform:translate(-50%,-100%); margin-top:-8px; z-index:10; }
.graph-x-labels { display:flex; justify-content:space-between; margin-top:4px; padding:0 2px; }
.graph-x-label { font-size:9px; color:var(--text-muted); font-family:var(--ff2); text-align:center; }
.graph-stats-row { display:flex; gap:16px; flex-wrap:wrap; margin-top:14px; padding-top:14px; border-top:1px solid var(--border); }
.graph-stat { flex:1; min-width:80px; }
.graph-stat-val { font-family:var(--ff2); font-size:20px; font-weight:800; color:#10b981; }
.graph-stat-label { font-size:10px; color:var(--text-muted); margin-top:2px; }

/* ── PERFORMANCE PAGE ── */
.performance-page { width:100%; max-width:820px; }
.perf-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.perf-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.perf-stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:12px; margin-bottom:20px; }
.perf-stat-card { background:var(--perf-card-bg); border:1px solid var(--perf-card-border); border-radius:14px; padding:16px; display:flex; align-items:center; gap:12px; backdrop-filter:blur(20px); }
.perf-stat-icon { font-size:22px; }
.perf-stat-val { font-family:var(--ff2); font-size:22px; font-weight:800; color:#10b981; }
.perf-stat-label { font-size:11px; color:var(--text-muted); margin-top:2px; }
.perf-panel-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
@media(max-width:600px){ .perf-panel-grid { grid-template-columns:1fr; } }
.perf-panel { background:var(--perf-card-bg); border:1px solid var(--perf-card-border); border-radius:16px; padding:20px; backdrop-filter:blur(20px); }
.perf-panel-title { font-family:var(--ff2); font-size:13px; font-weight:700; color:var(--text); margin-bottom:4px; }
.perf-panel-sub { font-size:11px; color:var(--text-muted); margin-bottom:14px; }
.topic-bar-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.topic-name { font-size:12px; color:var(--text-body); min-width:120px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.topic-bar-bg { flex:1; height:8px; background:var(--border); border-radius:4px; overflow:hidden; }
.topic-bar-fill { height:100%; border-radius:4px; }
.topic-count { font-size:11px; color:var(--text-muted); min-width:24px; text-align:right; }
.quiz-score-summary { display:flex; gap:16px; margin-bottom:14px; }
.qss-item { flex:1; text-align:center; }
.qss-val { font-family:var(--ff2); font-size:20px; font-weight:800; }
.qss-label { font-size:10px; color:var(--text-muted); margin-top:2px; }
.quiz-history-bars { display:flex; gap:3px; align-items:flex-end; height:70px; margin-bottom:6px; }
.qh-bar { flex:1; border-radius:3px 3px 0 0; min-height:4px; cursor:default; transition:opacity .15s; }
.qh-bar:hover { opacity:0.75; }
.chat-stat-big { font-family:var(--ff2); font-size:30px; font-weight:800; color:#10b981; margin-bottom:4px; }
.chat-stat-label { font-size:12px; color:var(--text-muted); margin-bottom:14px; }
.chat-daily-bars { display:flex; gap:3px; align-items:flex-end; height:50px; }
.cdb-bar { flex:1; border-radius:3px 3px 0 0; background:rgba(16,185,129,0.5); min-height:4px; }
.milestone-badges { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
.milestone-badge { display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:10px; font-size:11px; font-weight:600; }
.milestone-badge.locked { background:rgba(255,255,255,0.04); border:1px solid var(--border); color:var(--text-muted); opacity:0.6; }
.milestone-badge.earned { background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.35); color:#10b981; }
.milestone-badge.gold { background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.35); color:#f59e0b; }
.weekly-chart-wrap { display:flex; gap:4px; align-items:flex-end; height:80px; }
.wcw-group { flex:1; display:flex; flex-direction:column; gap:2px; align-items:center; justify-content:flex-end; }
.wcw-bar-quiz { width:100%; border-radius:3px 3px 0 0; background:rgba(99,102,241,0.6); min-height:0; }
.wcw-bar-chat { width:100%; background:rgba(16,185,129,0.55); min-height:0; }
.wcw-label { font-size:9px; color:var(--text-muted); margin-top:4px; font-family:var(--ff2); }
.weekly-legend { display:flex; gap:14px; margin-top:10px; font-size:11px; color:var(--text-muted); }
.wl-dot { width:10px; height:10px; border-radius:2px; display:inline-block; margin-right:4px; }
.perf-panel-full { background:var(--perf-card-bg); border:1px solid var(--perf-card-border); border-radius:16px; padding:20px; backdrop-filter:blur(20px); margin-bottom:20px; }

/* ADMIN */
.admin-page { width:100%; max-width:1000px; }
.admin-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
.admin-title { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.admin-badge { padding:4px 10px; border-radius:20px; background:linear-gradient(135deg,rgba(245,158,11,0.2),rgba(236,72,153,0.1)); border:1px solid rgba(245,158,11,0.4); font-size:11px; font-weight:600; color:#fbbf24; }
.stat-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-bottom:28px; }
.stat-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px; backdrop-filter:blur(20px); }
.stat-val { font-family:var(--ff2); font-size:28px; font-weight:800; margin-bottom:4px; background:linear-gradient(135deg,#a5b4fc,#f9a8d4); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.stat-label { font-size:11px; color:var(--text-body); font-weight:600; opacity:0.85; }
.users-table { background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden; backdrop-filter:blur(20px); margin-bottom:28px; }
.table-header { padding:16px 20px; border-bottom:1px solid var(--border); font-family:var(--ff2); font-size:13px; font-weight:700; color:var(--text); }
.table-row { display:flex; align-items:center; padding:14px 20px; border-bottom:1px solid rgba(99,102,241,0.08); gap:12px; }
.table-row:last-child { border-bottom:none; }
.table-row:hover { background:rgba(99,102,241,0.04); }
.user-avatar { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; flex-shrink:0; }
.user-info { flex:1; min-width:0; }
.user-name { font-size:14px; font-weight:600; color:var(--text); margin-bottom:2px; }
.user-email { font-size:11px; color:var(--text-muted); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.user-meta { text-align:right; flex-shrink:0; }
.user-count { font-size:12px; color:var(--text-body); font-weight:600; }
.user-date { font-size:11px; color:#64748b; }
.user-role-badge { display:inline-block; padding:3px 8px; border-radius:5px; font-size:10px; font-weight:700; }
.user-role-badge.admin { background:rgba(245,158,11,0.15); color:#fbbf24; border:1px solid rgba(245,158,11,0.3); }
.user-role-badge.user { background:rgba(99,102,241,0.12); color:#a5b4fc; border:1px solid rgba(99,102,241,0.25); }
.view-history-btn { padding:4px 10px; border-radius:6px; border:1px solid var(--border); background:transparent; font-size:11px; color:var(--text-muted); cursor:pointer; }
.user-detail-row { cursor:pointer; }

/* QUIZ */
.quiz-page { width:100%; max-width:680px; }
.qprogress-bar { height:3px; border-radius:3px; background:var(--border-strong); margin-bottom:16px; overflow:hidden; }
.qprogress-fill { height:100%; background:linear-gradient(90deg,var(--blue),var(--violet)); transition:width .3s ease; }
.question-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; }
.q-text { font-family:var(--ff2); font-size:17px; font-weight:700; color:var(--text); line-height:1.4; margin-bottom:20px; }
.options-list { display:flex; flex-direction:column; gap:8px; }
.opt-btn { display:flex; align-items:flex-start; gap:10px; padding:12px 14px; border-radius:12px; border:1.5px solid var(--border-strong); background:var(--surface); font-family:var(--ff); font-size:13.5px; line-height:1.45; color:var(--text-body); cursor:pointer; text-align:left; }
.opt-btn:hover:not(:disabled) { background:var(--surface-hover); border-color:rgba(99,102,241,0.4); }
.opt-btn.correct { background:rgba(34,197,94,.15); border-color:rgba(34,197,94,.5); color:#4ade80; }
.opt-btn.wrong { background:rgba(239,68,68,.15); border-color:rgba(239,68,68,.5); color:#f87171; }
.opt-letter { width:24px; height:24px; border-radius:6px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-family:var(--ff2); font-size:10px; font-weight:700; background:var(--badge-bg); border:1px solid var(--border-strong); color:#a5b4fc; }
.opt-letter.correct { background:rgba(34,197,94,.25); color:#4ade80; }
.opt-letter.wrong { background:rgba(239,68,68,.22); color:#f87171; }
.explanation-box { margin-top:16px; padding:14px; border-radius:12px; background:var(--exp-bg); border:1px solid var(--exp-border); }
.explanation-box p { font-size:12.5px; line-height:1.6; color:var(--text-body); margin-bottom:12px; }
.next-btn { float:right; padding:10px 18px; border-radius:9px; border:none; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-size:12px; font-weight:700; cursor:pointer; }
.score-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:20px; padding:48px 20px; text-align:center; }
.score-emoji { font-size:3rem; display:block; margin-bottom:12px; }
.score-title { font-family:var(--ff2); font-size:22px; font-weight:800; color:var(--text); margin-bottom:4px; }
.score-actions { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-top:20px; }
.sa-btn { padding:12px 24px; border-radius:12px; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }
.sa-btn.primary { background:linear-gradient(135deg,var(--blue),var(--violet)); border:none; color:#fff; }
.sa-btn.secondary { background:transparent; border:1px solid var(--border-strong); color:var(--text-muted); }

/* ── SCENARIO / DESCRIPTIVE QUESTIONS ── */
.scenario-page { width:100%; max-width:740px; }
.scenario-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
.scenario-title-h { font-family:var(--ff2); font-size:24px; font-weight:800; color:var(--text); }
.sq-progress-bar { height:3px; border-radius:3px; background:var(--border-strong); margin-bottom:20px; overflow:hidden; }
.sq-progress-fill { height:100%; background:linear-gradient(90deg,#f59e0b,#d97706); transition:width .3s ease; }
.sq-type-badge { display:inline-flex; align-items:center; gap:5px; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; margin-bottom:12px; }
.sq-type-badge.scenario { background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.35); color:#fcd34d; }
.sq-type-badge.descriptive { background:rgba(139,92,246,0.15); border:1px solid rgba(139,92,246,0.35); color:#c4b5fd; }
.sq-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:24px; margin-bottom:16px; }
.sq-context-box { background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.2); border-radius:10px; padding:12px 14px; margin-bottom:16px; font-size:13px; color:var(--text-body); line-height:1.6; }
.sq-context-label { font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:#f59e0b; margin-bottom:6px; }
.sq-question-text { font-family:var(--ff2); font-size:17px; font-weight:700; color:var(--text); line-height:1.4; margin-bottom:16px; }
.sq-criteria-list { display:flex; flex-direction:column; gap:4px; margin-bottom:18px; }
.sq-criteria-item { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:var(--text-muted); line-height:1.5; }
.sq-criteria-dot { width:5px; height:5px; border-radius:50%; background:var(--blue); flex-shrink:0; margin-top:5px; }
.sq-answer-label { font-size:11px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:var(--blue); margin-bottom:8px; }
.sq-textarea { width:100%; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:12px; padding:14px; font-family:var(--ff); font-size:14px; color:var(--input-text); outline:none; min-height:130px; resize:vertical; line-height:1.65; }
.sq-textarea:focus { border-color:rgba(99,102,241,0.5); }
.sq-textarea::placeholder { color:var(--placeholder); }
.sq-submit-row { display:flex; justify-content:flex-end; margin-top:12px; gap:10px; }
.sq-submit-btn { padding:11px 24px; border:none; border-radius:11px; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }
.sq-submit-btn:disabled { opacity:0.5; cursor:not-allowed; }
.sq-skip-btn { padding:11px 18px; border-radius:11px; border:1px solid var(--border-strong); background:var(--surface); font-family:var(--ff2); font-size:13px; font-weight:600; color:var(--text-muted); cursor:pointer; }

/* Feedback card */
.sq-feedback-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:16px; padding:22px; margin-top:16px; }
.sq-feedback-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:10px; }
.sq-score-display { display:flex; align-items:center; gap:10px; }
.sq-score-circle { width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:var(--ff2); font-size:18px; font-weight:800; flex-shrink:0; }
.sq-score-circle.excellent { background:rgba(16,185,129,0.15); border:2px solid rgba(16,185,129,0.4); color:#10b981; }
.sq-score-circle.good { background:rgba(99,102,241,0.15); border:2px solid rgba(99,102,241,0.4); color:#a5b4fc; }
.sq-score-circle.satisfactory { background:rgba(245,158,11,0.15); border:2px solid rgba(245,158,11,0.4); color:#fcd34d; }
.sq-score-circle.needs { background:rgba(239,68,68,0.15); border:2px solid rgba(239,68,68,0.4); color:#f87171; }
.sq-grade-text { font-family:var(--ff2); font-size:15px; font-weight:800; color:var(--text); }
.sq-grade-sub { font-size:12px; color:var(--text-muted); margin-top:2px; }
.sq-feedback-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:14px; }
@media(max-width:560px) { .sq-feedback-grid { grid-template-columns:1fr; } }
.sq-fb-section { border-radius:10px; padding:12px 14px; }
.sq-fb-section.strengths { background:rgba(16,185,129,0.07); border:1px solid rgba(16,185,129,0.2); }
.sq-fb-section.improvements { background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.18); }
.sq-fb-section-title { font-size:11px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; margin-bottom:8px; }
.sq-fb-section.strengths .sq-fb-section-title { color:#10b981; }
.sq-fb-section.improvements .sq-fb-section-title { color:#f87171; }
.sq-fb-item { display:flex; align-items:flex-start; gap:7px; font-size:12.5px; color:var(--text-body); line-height:1.5; margin-bottom:5px; }
.sq-fb-bullet { font-size:14px; flex-shrink:0; margin-top:1px; }
.sq-detailed-feedback { background:var(--exp-bg); border:1px solid var(--exp-border); border-radius:10px; padding:12px 14px; font-size:13px; line-height:1.65; color:var(--text-body); margin-bottom:14px; }
.sq-sample-toggle { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:600; color:var(--text-muted); cursor:pointer; background:transparent; border:none; padding:0; margin-bottom:10px; }
.sq-sample-toggle:hover { color:var(--text); }
.sq-sample-answer { background:rgba(99,102,241,0.06); border:1px solid rgba(99,102,241,0.2); border-radius:10px; padding:12px 14px; font-size:13px; line-height:1.65; color:var(--text-body); margin-bottom:14px; }
.sq-sample-label { font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--blue); margin-bottom:6px; }
.sq-next-btn { width:100%; padding:12px; border:none; border-radius:11px; background:linear-gradient(135deg,#f59e0b,#d97706); color:#fff; font-family:var(--ff2); font-size:13px; font-weight:700; cursor:pointer; }

/* Scenario summary */
.sq-summary-card { background:var(--surface); border:1px solid var(--border-strong); border-radius:20px; padding:40px 24px; text-align:center; }
.sq-summary-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px; margin:24px 0; }
.sq-summary-stat { background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:12px; padding:14px; }
.sq-summary-val { font-family:var(--ff2); font-size:22px; font-weight:800; color:#f59e0b; }
.sq-summary-label { font-size:11px; color:var(--text-muted); margin-top:3px; }

/* CHATBOT */
.chatbot-page { width:100%; max-width:680px; }
.chat-container { background:var(--surface); border:1px solid var(--border-strong); border-radius:18px; overflow:hidden; backdrop-filter:blur(30px); }
.chat-header-bar { display:flex; align-items:center; gap:12px; padding:16px 20px; border-bottom:1px solid var(--border); }
.chat-avatar { width:38px; height:38px; border-radius:50%; background:linear-gradient(135deg,rgba(16,185,129,0.2),rgba(5,150,105,0.15)); border:1px solid rgba(16,185,129,0.3); display:flex; align-items:center; justify-content:center; font-size:18px; }
.chat-header-info .chat-name { font-family:var(--ff2); font-size:14px; font-weight:700; color:var(--text); }
.chat-header-info .chat-status { font-size:11px; color:#10b981; margin-top:1px; }
.quick-prompts { display:flex; gap:6px; flex-wrap:wrap; padding:12px 16px; border-bottom:1px solid var(--border); }
.quick-prompt-chip { padding:5px 10px; border-radius:20px; border:1px solid var(--border-strong); background:var(--card-bg); font-size:11px; color:var(--text-muted); cursor:pointer; transition:all .15s; white-space:nowrap; }
.quick-prompt-chip:hover { border-color:rgba(16,185,129,0.4); color:#10b981; }
.chat-messages-area { height:420px; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; }
.chat-messages-area::-webkit-scrollbar { width:4px; }
.chat-messages-area::-webkit-scrollbar-track { background:transparent; }
.chat-messages-area::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; }
.chat-msg-wrap { display:flex; flex-direction:column; }
.chat-msg-wrap.user { align-items:flex-end; }
.chat-msg-wrap.ai { align-items:flex-start; }
.chat-msg-label { font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; margin-bottom:4px; font-family:var(--ff2); }
.chat-msg-wrap.ai .chat-msg-label { color:#10b981; }
.chat-msg-wrap.user .chat-msg-label { color:#a5b4fc; }
.chat-bubble { max-width:82%; padding:11px 14px; border-radius:14px; font-size:13px; line-height:1.65; }
.chat-bubble.ai { background:var(--chat-ai-bg); border:1px solid var(--chat-ai-border); color:var(--text-body); border-bottom-left-radius:4px; }
.chat-bubble.user { background:var(--chat-user-bg); color:#fff; border-bottom-right-radius:4px; }
.chat-typing { display:flex; gap:4px; align-items:center; padding:10px 14px; background:var(--chat-ai-bg); border:1px solid var(--chat-ai-border); border-radius:14px; border-bottom-left-radius:4px; width:fit-content; }
.typing-dot { width:6px; height:6px; border-radius:50%; background:#10b981; opacity:0.4; animation:typingPulse 1.2s ease-in-out infinite; }
.typing-dot:nth-child(2) { animation-delay:.2s; }
.typing-dot:nth-child(3) { animation-delay:.4s; }
@keyframes typingPulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
.chat-input-row { display:flex; gap:8px; padding:12px 14px; border-top:1px solid var(--border); align-items:flex-end; }
.chat-textarea { flex:1; background:var(--input-bg); border:1.5px solid var(--input-border); border-radius:10px; padding:10px 12px; font-family:var(--ff); font-size:13px; color:var(--input-text); outline:none; resize:none; min-height:42px; max-height:100px; line-height:1.5; }
.chat-textarea:focus { border-color:rgba(16,185,129,0.5); }
.chat-send-btn { width:42px; height:42px; border-radius:10px; border:none; background:linear-gradient(135deg,#10b981,#059669); color:#fff; font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.chat-send-btn:disabled { opacity:0.5; cursor:not-allowed; }
.chat-context-note { font-size:11px; color:var(--text-muted); margin-top:8px; text-align:center; padding:0 4px; }

/* MARKETING */
.marketing-section { width:100%; max-width:900px; margin:40px auto 0; text-align:left; padding:0 16px; }
.m-title { font-family:var(--ff2); font-size:clamp(26px,5vw,38px); font-weight:800; color:var(--text); margin-bottom:12px; text-align:center; letter-spacing:-0.5px; }
.m-sub { font-size:clamp(13px,2vw,15px); color:var(--text-body); opacity:0.8; margin-bottom:40px; text-align:center; max-width:620px; margin-left:auto; margin-right:auto; line-height:1.5; }
.m-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; margin-bottom:48px; }
.m-card { background:var(--m-card-bg); border:1px solid var(--m-card-border); border-radius:18px; padding:24px 20px 20px; position:relative; overflow:hidden; transition:transform 0.25s ease,border-color 0.25s ease; backdrop-filter:blur(10px); }
.m-card:hover { transform:translateY(-4px); border-color:var(--m-card-border-hover); }
.m-card-accent { position:absolute; top:0; left:0; right:0; height:3px; border-radius:18px 18px 0 0; }
.m-card-icon-wrap { width:46px; height:46px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:14px; border:1px solid var(--border); }
.m-card-title { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); margin-bottom:7px; }
.m-card-desc { font-size:13px; color:var(--text-body); opacity:0.9; line-height:1.55; }
.steps-section { margin-bottom:52px; }
.step-item { display:flex; gap:16px; background:var(--m-card-bg); border:1px solid var(--m-card-border); border-radius:16px; padding:18px 20px; align-items:flex-start; backdrop-filter:blur(10px); margin-bottom:10px; }
.step-left { display:flex; flex-direction:column; align-items:center; }
.step-connector { width:2px; height:22px; background:rgba(99,102,241,0.2); margin:4px 0; }
.step-num { width:38px; height:38px; border-radius:50%; flex-shrink:0; background:linear-gradient(135deg,var(--blue),var(--violet)); color:#fff; font-family:var(--ff2); font-weight:800; font-size:14px; display:flex; align-items:center; justify-content:center; }
.step-content { flex:1; padding-top:4px; }
.step-title { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); margin-bottom:4px; }
.step-desc { font-size:13px; color:var(--text-body); opacity:0.85; line-height:1.5; }
.step-tag { display:inline-block; margin-top:7px; font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; padding:3px 8px; border-radius:5px; background:var(--m-step-tag-bg); color:var(--m-step-tag-color); }
.roles-section { margin-bottom:40px; }
.roles-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.role-card { border-left:3px solid var(--blue); background:var(--m-card-bg); padding:20px 18px; border-radius:0 16px 16px 0; border-top:1px solid var(--m-card-border); border-right:1px solid var(--m-card-border); border-bottom:1px solid var(--m-card-border); backdrop-filter:blur(10px); }
.role-card.violet-l { border-left-color:var(--violet); }
.role-card.rose-l { border-left-color:var(--rose); }
.role-header { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
.role-icon { font-size:20px; }
.role-name { font-family:var(--ff2); font-size:15px; font-weight:700; color:var(--text); }
.role-desc { font-size:13px; color:var(--text-body); opacity:0.85; line-height:1.5; margin-bottom:10px; }
.role-pill { display:inline-block; font-size:10px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; padding:3px 9px; border-radius:5px; }
.role-pill.blue { background:var(--m-pill-blue-bg); color:var(--m-pill-blue-color); }
.role-pill.violet { background:var(--m-pill-violet-bg); color:var(--m-pill-violet-color); }
.role-pill.pink { background:var(--m-pill-pink-bg); color:var(--m-pill-pink-color); }
.m-illus-banner { background:var(--m-illus-card-bg); border:1px solid var(--border-strong); border-radius:20px; padding:clamp(24px,5vw,40px); display:flex; flex-direction:column; gap:18px; margin-bottom:48px; backdrop-filter:blur(20px); overflow:hidden; }
.m-illus-eyebrow { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.09em; color:var(--blue); margin-bottom:10px; }
.m-illus-heading { font-family:var(--ff2); font-size:clamp(24px,4vw,34px); font-weight:800; color:var(--text); line-height:1.2; margin-bottom:12px; }
.m-illus-body { font-size:14px; color:var(--text-body); line-height:1.6; opacity:0.95; margin-bottom:24px; }
.m-banner-points { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; width:100%; }
.m-point-item { display:flex; gap:12px; align-items:flex-start; }
.m-point-bullet { color:var(--blue); font-size:16px; flex-shrink:0; padding-top:1px; }
.m-point-text strong { display:block; font-family:var(--ff2); font-size:13.5px; font-weight:700; color:var(--text); margin-bottom:2px; }
.m-point-text p { font-size:12.5px; color:var(--text-body); opacity:0.85; line-height:1.45; }
.m-eyebrow-wrap { text-align:center; margin-bottom:14px; }
.m-eyebrow { display:inline-flex; align-items:center; gap:6px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--blue); background:var(--m-eyebrow-bg); border:1px solid var(--m-eyebrow-border); padding:4px 13px; border-radius:20px; }
.m-eyebrow-dot { width:5px; height:5px; border-radius:50%; background:var(--blue); }
.m-stat-strip { display:flex; flex-wrap:wrap; background:var(--m-card-bg); border:1px solid var(--m-card-border); border-radius:16px; overflow:hidden; margin-top:2rem; backdrop-filter:blur(10px); }
.m-stat-cell { flex:1; min-width:100px; text-align:center; padding:20px 8px; border-right:1px solid var(--m-card-border); }
.m-stat-cell:last-child { border-right:none; }
.m-stat-val { font-family:var(--ff2); font-size:clamp(20px,4vw,26px); font-weight:800; margin-bottom:4px; background:linear-gradient(135deg,var(--m-stat-val-from),var(--m-stat-val-to)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.m-stat-label { font-size:11px; color:var(--text-body); font-weight:600; opacity:0.85; }
@media (max-width:480px) {
  .m-stat-cell { border-right:none; border-bottom:1px solid var(--m-card-border); }
  .m-stat-cell:last-child { border-bottom:none; }
  .step-item { flex-direction:column; text-align:center; }
  .table-row { flex-wrap:wrap; }
  .slide-body { padding:20px 24px; }
  .perf-stat-grid { grid-template-columns:repeat(2,1fr); }
}
  /* Additional styles for new features */
.draggable-element {
  transition: box-shadow 0.2s ease;
  cursor: move;
  user-select: none;
}
.draggable-element:hover {
  box-shadow: 0 0 0 2px rgba(99,102,241,0.5);
}
.slide-canvas-wrap {
  position: relative;
  overflow: hidden;
}
  
.slide-canvas-wrap .slide-canvas {
  position: relative;
  z-index: 1;
}
.draggable-element img {
  pointer-events: none;
}
`;

export const EXTRA_CSS = `
.slide-canvas-wrap {
  position: relative !important;
  overflow: hidden !important;
  width: 100% !important;
  height: 0 !important;
  padding-top: 56.25% !important;
}
.slide-canvas-wrap > .slide-canvas {
  position: absolute !important;
  top: 0 !important; left: 0 !important;
  right: 0 !important; bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
}


///changes
/* Mobile Menu */

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  margin-top: 10px;
}

.mobile-menu button {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: inherit;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.mobile-menu button:hover {
  background: rgba(255,255,255,0.10);
  transform: translateX(4px);
}

.mobile-menu button:active {
  transform: scale(0.98);
}

/* Hamburger Button */

.hamburger-btn {
  display: none;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 24px;
  cursor: pointer;
  padding: 4px 8px;
}

/* Mobile Only */

@media (max-width: 768px) {

  .hamburger-btn {
    display: block;
  }

  .desktop-nav {
    display: none !important;
  }

  .nav {
    justify-content: flex-start;
    gap: 12px;
  }
}



`;
