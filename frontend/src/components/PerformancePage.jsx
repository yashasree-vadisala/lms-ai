import { DB } from "../data/db";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { DailyImprovementGraph } from "./DailyImprovementGraph";

// ─── PERFORMANCE PAGE ──────────────────────────────────────────────────────────
export function PerformancePage({ session }) {
  const uid = session.id;
  const activity   = DB.getActivity(uid);
  const topics     = DB.getTopics(uid);
  const quizScores = DB.getQuizScores(uid);
  const chatCount  = DB.getChatCount(uid);
  const dailyChats = DB.getDailyChats(uid);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  let streak=0;
  for (let i=0; i<365; i++) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) streak++;
    else break;
  }
  let bestStreak=0, cur=0;
  for (let i=364; i>=0; i--) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) { cur++; bestStreak=Math.max(bestStreak,cur); } else cur=0;
  }

  const totalSessions = Object.values(activity).reduce((a,b)=>a+b,0);
  const activeDays    = Object.keys(activity).length;
  const avgQuiz = quizScores.length
    ? Math.round(quizScores.reduce((s,q)=>s+(q.score/q.total)*100,0)/quizScores.length)
    : 0;

  const topicEntries = Object.entries(topics).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const maxTopicCount = topicEntries[0]?.[1] || 1;
  const topicColors = ["#6366f1","#8b5cf6","#14b8a6","#f59e0b","#ec4899","#10b981","#3b82f6","#f43f5e"];

  const bestQuiz = quizScores.length ? Math.round(Math.max(...quizScores.map(q=>(q.score/q.total)*100))) : null;
  const lastQuiz = quizScores.length ? Math.round((quizScores[quizScores.length-1].score/quizScores[quizScores.length-1].total)*100) : null;

  const chatDays7 = Array.from({length:7},(_,i) => {
    const d=new Date(today); d.setDate(today.getDate()-(6-i));
    return dailyChats[d.toISOString().split("T")[0]] || 0;
  });
  const maxChatDay = Math.max(...chatDays7,1);

  const weekDayLabels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay()+6)%7));
  const weekData = Array.from({length:7},(_,i) => {
    const d=new Date(startOfWeek); d.setDate(startOfWeek.getDate()+i);
    const ds = d.toISOString().split("T")[0];
    return {
      quizCount: quizScores.filter(q=>q.date&&q.date.startsWith(ds)).length,
      chatCount: dailyChats[ds]||0,
    };
  });
  const maxWeek = Math.max(...weekData.map(d=>d.quizCount+d.chatCount),1);

  const milestones = [
    { label:"3-day streak",  val:3,   icon:"🔥", type:"streak" },
    { label:"7-day streak",  val:7,   icon:"🔥", type:"streak" },
    { label:"14-day streak", val:14,  icon:"🔥", type:"streak" },
    { label:"30-day streak", val:30,  icon:"🏆", type:"streak" },
    { label:"5 quizzes",     val:5,   icon:"🎯", type:"quiz" },
    { label:"20 quizzes",    val:20,  icon:"🎯", type:"quiz" },
    { label:"100 chats",     val:100, icon:"💬", type:"chat" },
  ];
  const earnedMilestone = (m) => {
    if (m.type==="streak")  return bestStreak >= m.val;
    if (m.type==="quiz")    return quizScores.length >= m.val;
    if (m.type==="chat")    return chatCount >= m.val;
    return false;
  };

  const statCards = [
    { icon:"🔥", val:streak,            label:"Day streak" },
    { icon:"🏆", val:bestStreak,         label:"Best streak" },
    { icon:"📊", val:totalSessions,      label:"Total analyses" },
    { icon:"📅", val:activeDays,         label:"Active days" },
    { icon:"🎯", val:`${avgQuiz}%`,      label:"Quiz avg" },
    { icon:"📝", val:quizScores.length,  label:"Quizzes taken" },
    { icon:"💬", val:chatCount,          label:"AI chats" },
    { icon:"🏷️", val:topicEntries.length,label:"Topics studied" },
  ];

  return (
    <div className="performance-page">
      <div className="perf-header">
        <h1 className="perf-title">📊 My Progress</h1>
        <div style={{ fontSize:13, color:"var(--text-muted)" }}>Welcome back, <strong style={{ color:"var(--text)" }}>{session.username}</strong>!</div>
      </div>
      <div className="perf-stat-grid">
        {statCards.map(s => (
          <div key={s.label} className="perf-stat-card">
            <div className="perf-stat-icon">{s.icon}</div>
            <div><div className="perf-stat-val">{s.val}</div><div className="perf-stat-label">{s.label}</div></div>
          </div>
        ))}
      </div>
      <ActivityHeatmap uid={uid} username={session.username} />
      <DailyImprovementGraph uid={uid} />
      <div className="perf-panel-grid">
        <div className="perf-panel">
          <div className="perf-panel-title">🏷️ Topics Studied</div>
          <div className="perf-panel-sub">Auto-extracted from your analysis history</div>
          {topicEntries.length === 0 ? (
            <div style={{ textAlign:"center", padding:"20px 0", color:"var(--text-muted)", fontSize:13 }}>No topics yet — analyze some content!</div>
          ) : (
            topicEntries.map(([topic,count],i) => (
              <div key={topic} className="topic-bar-row">
                <span className="topic-name" title={topic}>{topic}</span>
                <div className="topic-bar-bg">
                  <div className="topic-bar-fill" style={{ width:`${Math.round((count/maxTopicCount)*100)}%`, background:topicColors[i%topicColors.length] }} />
                </div>
                <span className="topic-count">{count}</span>
              </div>
            ))
          )}
        </div>
        <div className="perf-panel">
          <div className="perf-panel-title">🎯 Quiz Performance</div>
          <div className="perf-panel-sub">Score history — green ≥75% · amber ≥50% · red &lt;50%</div>
          {quizScores.length > 0 ? (
            <>
              <div className="quiz-score-summary">
                <div className="qss-item"><div className="qss-val" style={{ color:"#10b981" }}>{bestQuiz}%</div><div className="qss-label">Best</div></div>
                <div className="qss-item"><div className="qss-val" style={{ color:"#f59e0b" }}>{avgQuiz}%</div><div className="qss-label">Average</div></div>
                <div className="qss-item"><div className="qss-val" style={{ color: lastQuiz>=75?"#10b981":lastQuiz>=50?"#f59e0b":"#ef4444" }}>{lastQuiz}%</div><div className="qss-label">Latest</div></div>
                <div className="qss-item"><div className="qss-val" style={{ color:"var(--text-muted)" }}>{quizScores.length}</div><div className="qss-label">Total</div></div>
              </div>
              <div className="quiz-history-bars">
                {quizScores.slice(-20).map((q,i) => {
                  const pct = Math.round((q.score/q.total)*100);
                  const color = pct>=75 ? "#10b981" : pct>=50 ? "#f59e0b" : "#ef4444";
                  return <div key={i} className="qh-bar" style={{ height:`${Math.max(pct,5)}%`, background:color }} title={`${pct}% (${q.score}/${q.total})`} />;
                })}
              </div>
              <div style={{ fontSize:11, color:"var(--text-muted)" }}>Last {Math.min(quizScores.length,20)} quizzes shown</div>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"20px 0", color:"var(--text-muted)", fontSize:13 }}>No quizzes taken yet!</div>
          )}
        </div>
      </div>
      <div className="perf-panel-grid">
        <div className="perf-panel">
          <div className="perf-panel-title">💬 Chatbot Usage</div>
          <div className="perf-panel-sub">AI tutor conversation tracking</div>
          <div className="chat-stat-big">{chatCount}</div>
          <div className="chat-stat-label">Total AI messages sent</div>
          <div className="chat-daily-bars">
            {chatDays7.map((v,i) => (
              <div key={i} className="cdb-bar" style={{ height:`${Math.max((v/maxChatDay)*100, v>0?15:4)}%`, opacity:v>0?1:0.3 }} title={`${v} chats`} />
            ))}
          </div>
          <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:6 }}>Messages per day — last 7 days</div>
          <div style={{ marginTop:14, display:"flex", gap:12, flexWrap:"wrap" }}>
            <div><div style={{ fontFamily:"var(--ff2)", fontSize:16, fontWeight:700, color:"#10b981" }}>{chatDays7.reduce((a,b)=>a+b,0)}</div><div style={{ fontSize:10, color:"var(--text-muted)" }}>Chats this week</div></div>
            <div><div style={{ fontFamily:"var(--ff2)", fontSize:16, fontWeight:700, color:"#a5b4fc" }}>{dailyChats[todayStr]||0}</div><div style={{ fontSize:10, color:"var(--text-muted)" }}>Today</div></div>
          </div>
        </div>
        <div className="perf-panel">
          <div className="perf-panel-title">📅 This Week's Activity</div>
          <div className="perf-panel-sub">Quizzes vs chatbot usage by day</div>
          <div className="weekly-chart-wrap">
            {weekData.map((d,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:0, justifyContent:"flex-end", height:"100%" }}>
                <div className="wcw-bar-quiz" style={{ width:"100%", height:`${Math.round((d.quizCount/maxWeek)*80)}%`, minHeight:d.quizCount>0?4:0, borderRadius:"3px 3px 0 0" }} title={`${weekDayLabels[i]}: ${d.quizCount} quiz`} />
                <div className="wcw-bar-chat" style={{ width:"100%", height:`${Math.round((d.chatCount/maxWeek)*80)}%`, minHeight:d.chatCount>0?4:0 }} title={`${weekDayLabels[i]}: ${d.chatCount} chats`} />
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
            {weekDayLabels.map(l => <div key={l} className="wcw-label">{l}</div>)}
          </div>
          <div className="weekly-legend">
            <span><span className="wl-dot" style={{ background:"rgba(99,102,241,0.6)" }}></span>Quizzes</span>
            <span><span className="wl-dot" style={{ background:"rgba(16,185,129,0.55)" }}></span>AI Chats</span>
          </div>
        </div>
      </div>
      <div className="perf-panel-full">
        <div className="perf-panel-title" style={{ marginBottom:4 }}>🏅 Milestone Badges</div>
        <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:14 }}>Earn badges by reaching learning milestones — gold = achieved!</div>
        <div className="milestone-badges">
          {milestones.map(m => {
            const earned = earnedMilestone(m);
            return (
              <div key={m.label} className={`milestone-badge ${earned?"gold":"locked"}`}>
                <span>{m.icon}</span><span>{m.label}</span>{earned && <span style={{ fontSize:10 }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
