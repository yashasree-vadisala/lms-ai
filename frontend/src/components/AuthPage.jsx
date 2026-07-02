import { useState } from "react";
import { DB } from "../data/db";

// ─── AUTH PAGE ─────────────────────────────────────────────────────────────────
export function AuthPage({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = () => {
    setError("");
    const users = DB.getUsers();
    const user = users.find(u => (u.email===form.email || u.username===form.email) && u.password===form.password);
    if (!user) { setError("Invalid email/username or password."); return; }
    onLogin(user);
  };

  const handleSignup = () => {
    setError("");
    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) { setError("All fields are required."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const users = DB.getUsers();
    if (users.find(u => u.email===form.email)) { setError("Email already registered."); return; }
    const newUser = { id:"user-"+Date.now(), username:form.username.trim(), email:form.email.trim(), password:form.password, role:"user", joined:new Date().toISOString(), analysisCount:0 };
    DB.saveUsers([...users, newUser]);
    setSuccess("Account created! You can now log in.");
    setTab("login"); setForm({ username:"", email:newUser.email, password:"" });
  };
 


  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-text">Note<em>AI</em></div>
          <div className="auth-tagline">Turn any content into smart notes & quizzes</div>
        </div>
        <div className="auth-tabs">
          <button className={`auth-tab ${tab==="login"?"active":""}`} onClick={() => { setTab("login"); setError(""); setSuccess(""); }}>Log In</button>
          <button className={`auth-tab ${tab==="signup"?"active":""}`} onClick={() => { setTab("signup"); setError(""); setSuccess(""); }}>Sign Up</button>
        </div>
        {error && <div className="auth-error">⚠️ {error}</div>}
        {success && <div className="auth-success">✅ {success}</div>}
        {tab==="login" ? (
          <>
            <div className="form-group"><label className="form-label">Email or Username</label>
              <input className="form-input" type="text" placeholder="admin@noteai.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} onKeyDown={e => e.key==="Enter" && handleLogin()} /></div>
            <div className="form-group"><label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form,password:e.target.value})} onKeyDown={e => e.key==="Enter" && handleLogin()} /></div>
            <button className="auth-btn" onClick={handleLogin}>Log In →</button>
            <div className="admin-hint">Demo admin: admin@noteai.com / admin123</div>
          </>
        ) : (
          <>
            <div className="form-group"><label className="form-label">Username</label>
              <input className="form-input" type="text" placeholder="Your name" value={form.username} onChange={e => setForm({...form,username:e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({...form,password:e.target.value})} /></div>
            <button className="auth-btn" onClick={handleSignup}>Create Account →</button>
          </>
        )}
      </div>
    </div>
  );
}
