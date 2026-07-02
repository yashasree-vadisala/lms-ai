import { DB } from "../data/db";
import { acColor } from "../data/constants";

export function AdminContentTrends() {
  const users = DB.getUsers();
  const TREND_COLORS = ["#6366f1","#8b5cf6","#14b8a6","#f59e0b","#ec4899","#10b981","#3b82f6","#f43f5e"];
  const PLATFORM_DEFS = [
    { name:"YouTube",   icon:"🔴", keys:["youtube","youtu.be"] },
    { name:"Instagram", icon:"📸", keys:["instagram","instagr.am"] },
    { name:"TikTok",    icon:"🎵", keys:["tiktok"] },
    { name:"Twitter/X", icon:"🐦", keys:["twitter","x.com"] },
    { name:"Facebook",  icon:"📘", keys:["facebook","fb.watch","fb.com"] },
    { name:"File",      icon:"📁", keys:[".mp4",".mov",".webm",".avi",".mkv"] },
    { name:"Other",     icon:"🌐", keys:[] },
  ];

  const allTopics = {};
  const allActivity = {};
  const allSources = [];

  users.forEach(u => {
    const topics = DB.getTopics(u.id);
    Object.entries(topics).forEach(([k,v]) => { allTopics[k] = (allTopics[k]||0)+v; });
    const activity = DB.getActivity(u.id);
    Object.entries(activity).forEach(([k,v]) => { allActivity[k] = (allActivity[k]||0)+v; });
    DB.getHistory(u.id).forEach(h => { if (h.source) allSources.push(h.source.toLowerCase()); });
  });

  const topicEntries = Object.entries(allTopics).sort((a,b)=>b[1]-a[1]).slice(0,8);
  const maxT = topicEntries[0]?.[1] || 1;
  const totalAnalyses = Object.values(allActivity).reduce((a,b)=>a+b,0);

  const detectPlatform = (url) => {
    for (const p of PLATFORM_DEFS.slice(0,-1)) {
      if (p.keys.some(k => url.includes(k))) return p.name;
    }
    return "Other";
  };

  const platformCounts = {};
  PLATFORM_DEFS.forEach(p => { platformCounts[p.name] = 0; });
  allSources.forEach(src => { platformCounts[detectPlatform(src)]++; });
  const totalSources = allSources.length || 1;
  const platformEntries = PLATFORM_DEFS
    .filter(p => platformCounts[p.name] > 0)
    .sort((a,b) => platformCounts[b.name] - platformCounts[a.name]);

  const today = new Date();
  const days14 = Array.from({length:14}, (_,i) => {
    const d = new Date(today); d.setDate(today.getDate()-(13-i));
    const key = d.toISOString().split("T")[0];
    return {
      key,
      label: d.toLocaleDateString("en-US",{month:"short",day:"numeric"}),
      val: allActivity[key] || 0,
    };
  });
  const maxBar = Math.max(...days14.map(d=>d.val), 1);

  const topUsers = [...users]
    .sort((a,b) => (b.analysisCount||0) - (a.analysisCount||0))
    .slice(0,5);
  const maxUserCount = topUsers[0]?.analysisCount || 1;

  return (
    <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:22, marginBottom:28, backdropFilter:"blur(20px)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:4 }}>
        <div style={{ fontFamily:"var(--ff2)", fontSize:15, fontWeight:700, color:"var(--text)", display:"flex", alignItems:"center", gap:8 }}>
          📊 Content Analysis Trends
          <span style={{ padding:"3px 10px", borderRadius:20, background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.25)", fontSize:10, fontWeight:600, color:"#a5b4fc" }}>All Users</span>
        </div>
        <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
          {[
            { val:totalAnalyses,       label:"Total analyses",  color:"#10b981" },
            { val:topicEntries.length, label:"Unique topics",   color:"#a5b4fc" },
            { val:allSources.length,   label:"Sources analyzed", color:"#f9a8d4" },
          ].map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"var(--ff2)", fontSize:18, fontWeight:800, color:s.color }}>{s.val}</div>
              <div style={{ fontSize:10, color:"var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:18 }}>
        Aggregated across all registered users — topics studied, platforms used, and activity trends
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:20, marginBottom:20 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
            🏷️ Top Topics Studied
          </div>
          {topicEntries.length === 0 ? (
            <div style={{ fontSize:13, color:"var(--text-muted)", padding:"20px 0", textAlign:"center" }}>
              No topics recorded yet — users need to analyze content first.
            </div>
          ) : (
            topicEntries.map(([topic, count], i) => (
              <div key={topic} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
                <div style={{ fontSize:12, color:"var(--text-body)", minWidth:160, maxWidth:"none", lineHeight:1.4, wordBreak:"break-word" }} title={topic}>
                  {topic}
                </div>
                <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4, overflow:"hidden", marginTop:4 }}>
                  <div style={{ height:"100%", borderRadius:4, width:`${Math.round((count/maxT)*100)}%`, background:TREND_COLORS[i%TREND_COLORS.length] }} />
                </div>
                <div style={{ fontSize:11, color:"var(--text-muted)", minWidth:20, textAlign:"right", fontFamily:"var(--ff2)", fontWeight:600, marginTop:2 }}>{count}</div>
              </div>
            ))
          )}
        </div>

        <div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
            🌐 Platform Breakdown
          </div>
          {platformEntries.length === 0 ? (
            <div style={{ fontSize:13, color:"var(--text-muted)", padding:"20px 0", textAlign:"center" }}>
              No history yet — no source URLs recorded.
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(80px,1fr))", gap:8 }}>
              {platformEntries.map(p => (
                <div key={p.name} style={{ background:"var(--card-bg)", border:"1px solid var(--border)", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>{p.icon}</div>
                  <div style={{ fontSize:10, color:"var(--text-muted)", marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontFamily:"var(--ff2)", fontSize:16, fontWeight:700, color:"var(--text)" }}>{platformCounts[p.name]}</div>
                  <div style={{ fontSize:10, color:"var(--text-muted)" }}>{Math.round((platformCounts[p.name]/totalSources)*100)}%</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
          🏆 Most Active Users
        </div>
        {topUsers.length === 0 || topUsers.every(u => !u.analysisCount) ? (
          <div style={{ fontSize:13, color:"var(--text-muted)", textAlign:"center", padding:"12px 0" }}>No activity recorded yet.</div>
        ) : (
          topUsers.filter(u => (u.analysisCount||0) > 0).map((u, i) => (
            <div key={u.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              <div style={{ width:22, height:22, borderRadius:50, background:acColor(u.username), display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:"#fff", flexShrink:0 }}>
                {u.username[0].toUpperCase()}
              </div>
              <div style={{ fontSize:12, color:"var(--text-body)", minWidth:100, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }} title={u.username}>
                {u.username}
              </div>
              <div style={{ flex:1, height:8, background:"var(--border)", borderRadius:4, overflow:"hidden" }}>
                <div style={{ height:"100%", borderRadius:4, width:`${Math.round(((u.analysisCount||0)/maxUserCount)*100)}%`, background: i===0 ? "#f59e0b" : i===1 ? "#94a3b8" : i===2 ? "#cd7f32" : "#6366f1" }} />
              </div>
              <div style={{ fontSize:11, color:"var(--text-muted)", minWidth:50, textAlign:"right", fontFamily:"var(--ff2)", fontWeight:600 }}>
                {u.analysisCount||0} <span style={{ fontWeight:400, fontSize:10 }}>analyses</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ borderTop:"1px solid var(--border)", paddingTop:16 }}>
        <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--blue)", marginBottom:10 }}>
          📈 Combined Activity — Last 14 Days (All Users)
        </div>
        <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:60 }}>
          {days14.map((d,i) => (
            <div key={i}
              title={`${d.label}: ${d.val} ${d.val===1?"analysis":"analyses"}`}
              style={{
                flex:1,
                borderRadius:"3px 3px 0 0",
                background: d.val > 0 ? "#6366f1" : "var(--border)",
                height: `${Math.max((d.val/maxBar)*100, d.val>0?10:4)}%`,
                minHeight: d.val > 0 ? 4 : 2,
                opacity: d.val > 0 ? 1 : 0.35,
                transition: "height 0.3s ease",
              }}
            />
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
          {days14.filter((_,i) => i%2===0 || i===13).map(d => (
            <div key={d.key} style={{ fontSize:9, color:"var(--text-muted)", fontFamily:"var(--ff2)" }}>{d.label}</div>
          ))}
        </div>
        <div style={{ display:"flex", gap:20, marginTop:12, flexWrap:"wrap" }}>
          {[
            { val: days14.reduce((a,d)=>a+d.val,0), label:"Total this period" },
            { val: days14.filter(d=>d.val>0).length, label:"Active days" },
            { val: Math.max(...days14.map(d=>d.val)), label:"Peak day" },
            { val: (days14.reduce((a,d)=>a+d.val,0) / Math.max(days14.filter(d=>d.val>0).length,1)).toFixed(1), label:"Avg / active day" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily:"var(--ff2)", fontSize:17, fontWeight:800, color:"#6366f1" }}>{s.val}</div>
              <div style={{ fontSize:10, color:"var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
