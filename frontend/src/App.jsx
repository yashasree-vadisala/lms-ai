import { useState, useEffect } from "react";
import { DB } from "./data/db";
import { extractTopic } from "./utils/textUtils";
import { CSS, EXTRA_CSS, FONTS } from "./styles/theme";
import { acColor } from "./data/constants";
import { AuthPage } from "./components/AuthPage";
import { HomeView } from "./components/HomeView";
import { ResultsView } from "./components/ResultsView";
import { QuizView } from "./components/QuizView";
import { ScenarioQuizView } from "./components/ScenarioQuizView";
import { ChatbotView } from "./components/ChatbotView";
import { PptEditorPage } from "./PptEditorPage";
import { HistoryPage } from "./components/HistoryPage";
import { PerformancePage } from "./components/PerformancePage";
import { AdminPage } from "./components/AdminPage";
import { AdminUserHistory } from "./components/AdminUserHistory";

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(() => DB.getSession());
  const [view, setView] = useState("home");
  const [adminSubView, setAdminSubView] = useState(null);
  const [summary, setSummary] = useState("");
  const [source, setSource] = useState("");
  const [pptSlides, setPptSlides] = useState(null);
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("noteai-theme") || "dark"; } catch { return "dark"; } });
  // In App(), add:
  const [language, setLanguage] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("noteai-theme", theme); } catch {}
  }, [theme]);

  const login = (user) => { DB.saveSession(user); setSession(user); setView("home"); };
  const logout = () => { DB.clearSession(); setSession(null); setView("home"); setSummary(""); setSource(""); setPptSlides(null); };

  const recordActivity = (uid) => {
    const today = new Date().toISOString().split("T")[0];
    const activity = DB.getActivity(uid);
    activity[today] = (activity[today] || 0) + 1;
    DB.saveActivity(uid, activity);
  };

  const saveToHistory = (uid, item) => {
    const hist = DB.getHistory(uid);
    hist.unshift({ ...item, id: Date.now(), date: new Date().toISOString() });
    DB.saveHistory(uid, hist.slice(0,50));
    const users = DB.getUsers();
    const idx = users.findIndex(u => u.id === uid);
    if (idx >= 0) { users[idx].analysisCount = (users[idx].analysisCount || 0) + 1; DB.saveUsers(users); }
    recordActivity(uid);
    const topic = item.source
      ? item.source
          .replace(/^https?:\/\/(www\.)?/i, "")
          .split(/[/?#]/)[0]
      : extractTopic(item.summary);
    const topics = DB.getTopics(uid);
    topics[topic] = (topics[topic] || 0) + 1;
    DB.saveTopics(uid, topics);
  };

  const saveQuizScore = (uid, score, total) => {
    const scores = DB.getQuizScores(uid);
    scores.push({ score, total, date: new Date().toISOString() });
    DB.saveQuizScores(uid, scores.slice(-100));
  };

  const recordChatMessage = (uid) => {
    const count = DB.getChatCount(uid) + 1;
    DB.saveChatCount(uid, count);
    const today = new Date().toISOString().split("T")[0];
    const daily = DB.getDailyChats(uid);
    daily[today] = (daily[today] || 0) + 1;
    DB.saveDailyChats(uid, daily);
  };

  return (
    <div style={{ position:"relative", minHeight:"100vh", width:"100%" }}>
      <style dangerouslySetInnerHTML={{ __html: FONTS + CSS + EXTRA_CSS }} />
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="bg-glow2" />
      <div className="app-wrap">
        
        
        <nav className="nav">
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <button
      className="hamburger-btn"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      ☰
    </button>

    <div
      className="nav-brand"
      onClick={() => session && setView("home")}
    >
      Note<em>AI</em>
    </div>
  </div>

  <div className="nav-right desktop-nav">
    {session ? (
      <>
        <button
          className={`nav-link ${view === "home" ? "active" : ""}`}
          onClick={() => setView("home")}
        >
          ✨ Analyze
        </button>

        <button
          className={`nav-link ${view === "history" ? "active" : ""}`}
          onClick={() => setView("history")}
        >
          📋 History
        </button>

        <button
          className={`nav-link ${view === "performance" ? "active" : ""}`}
          onClick={() => setView("performance")}
        >
          📊 Progress
        </button>

        {session.role === "admin" && (
          <button
            className={`nav-link ${view === "admin" ? "active" : ""}`}
            onClick={() => setView("admin")}
          >
            ⚙️ Admin
          </button>
        )}

        <button
          className="theme-toggle-btn"
          onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div
          className="avatar-circle"
          title={`${session.username} — click to log out`}
          onClick={logout}
          style={{ background: acColor(session.username) }}
        >
          {session.username[0].toUpperCase()}
        </div>
      </>
    ) : (
      <>
        <div className="powered-badge">
          <div className="powered-dot" />
          Gemini AI
        </div>

        <button
          className="theme-toggle-btn"
          onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </>
    )}
  </div>
</nav>




        {session && mobileMenuOpen && (
  <div className="mobile-menu">
    <button onClick={() => { setView("home"); setMobileMenuOpen(false); }}>
      ✨ Analyze
    </button>

    <button onClick={() => { setView("history"); setMobileMenuOpen(false); }}>
      📋 History
    </button>

    <button onClick={() => { setView("performance"); setMobileMenuOpen(false); }}>
      📊 Progress
    </button>

    <button onClick={logout}>
      Logout
    </button>
  </div>

)}

        {!session && <AuthPage onLogin={login} />}
        {session && (
          <div className="main-content">
            {view==="home" && (
              <HomeView session={session} language={language} setLanguage={setLanguage} onResult={(sum,src) => {
                setSummary(sum); setSource(src);
                saveToHistory(session.id, { summary:sum, source:src });
                setView("results");
              }} />
            )}
            {view==="results" && (
              <ResultsView summary={summary} source={source} language={language}
                onBack={() => setView("home")}
                onQuiz={() => setView("quiz")}
                onScenario={() => setView("scenario")}
                onChat={() => setView("chat")}
                onPptReady={(slides) => { setPptSlides(slides); setView("ppt"); }} />
            )}
            {view==="quiz" && (
  <QuizView summary={summary} language={language} onBack={() => setView("results")}
    onFinish={(score,total) => saveQuizScore(session.id, score, total)} />
)}
            {view==="scenario" && (
              <ScenarioQuizView summary={summary} onBack={() => setView("results")} />
            )}
            {view==="chat" && (
              <ChatbotView summary={summary} onBack={() => setView("results")}
                onMessage={() => recordChatMessage(session.id)} />
            )}
            {view==="ppt" && pptSlides && (
              <PptEditorPage slides={pptSlides} setSlides={setPptSlides} onBack={() => setView("results")} summary={summary} />
            )}
            {view==="history" && (
              <HistoryPage session={session} onViewItem={(item) => { setSummary(item.summary); setSource(item.source); setView("results"); }} />
            )}
            {view==="performance" && (
              <PerformancePage session={session} />
            )}
            {view==="admin" && session.role==="admin" && (
              <AdminPage onViewUserHistory={(uid,uname) => { setAdminSubView({uid,uname}); setView("admin-history"); }} />
            )}
            {view==="admin-history" && adminSubView && (
              <AdminUserHistory uid={adminSubView.uid} uname={adminSubView.uname} onBack={() => setView("admin")} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
