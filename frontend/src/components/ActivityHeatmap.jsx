import { DB } from "../data/db";

// ─── ACTIVITY HEATMAP ──────────────────────────────────────────────────────────
export function ActivityHeatmap({ uid, username }) {
  const activity = DB.getActivity(uid);
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const weeks = [];
  const monthLabels = [];
  let currentMonth = -1;

  for (let w=51; w>=0; w--) {
    const week = [];
    for (let d=6; d>=0; d--) {
      const date = new Date(today); date.setDate(today.getDate()-w*7-d);
      const dateStr = date.toISOString().split("T")[0];
      const count = activity[dateStr] || 0;
      const month = date.getMonth();
      if (month!==currentMonth && date.getDate()<=7) {
        const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        monthLabels.push({ label:months[month], weekIdx:51-w });
        currentMonth = month;
      }
      week.push({ dateStr, count, date, isToday:dateStr===todayStr });
    }
    weeks.push(week);
  }

  const getLevel = (count) => {
    if (count===0) return "empty";
    if (count===1) return "low";
    if (count===2) return "mid";
    if (count===3) return "high";
    return "full";
  };

  let cs=0;
  for (let i=0; i<365; i++) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) cs++;
    else break;
  }
  let ms=0, streak=0;
  for (let i=364; i>=0; i--) {
    const d=new Date(today); d.setDate(today.getDate()-i);
    if (activity[d.toISOString().split("T")[0]]) { streak++; ms=Math.max(ms,streak); } else streak=0;
  }

  const totalDays = Object.keys(activity).length;
  const totalUsage = Object.values(activity).reduce((a,b) => a+b, 0);

  return (
    <div className="heatmap-section">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8 }}>
        <div>
          <div className="heatmap-title">🟩 Activity Heatmap — {username}</div>
          <div className="heatmap-sub">{totalUsage} total analyses · {totalDays} active days this year</div>
        </div>
        <div className="streak-badges">
          <div className="streak-badge"><span style={{ fontSize:18 }}>🔥</span><div><div className="streak-badge-val">{cs}</div><div className="streak-badge-label">Day streak</div></div></div>
          <div className="streak-badge"><span style={{ fontSize:18 }}>🏆</span><div><div className="streak-badge-val">{ms}</div><div className="streak-badge-label">Best streak</div></div></div>
        </div>
      </div>
      <div style={{ display:"flex", marginBottom:4, paddingLeft:2, minHeight:14, overflow:"hidden", position:"relative" }}>
        {monthLabels.map((m,i) => (
          <span key={i} style={{ position:"absolute", left:m.weekIdx*15, fontSize:9, color:"var(--text-muted)", fontFamily:"var(--ff2)" }}>{m.label}</span>
        ))}
      </div>
      <div className="heatmap-grid">
        {weeks.map((week,wi) => (
          <div key={wi} className="heatmap-week">
            {week.map((day,di) => (
              <div key={di} className={`heatmap-cell ${getLevel(day.count)}${day.isToday&&day.count>0?" today-active":""}`} title={`${day.dateStr}: ${day.count} ${day.count===1?"analysis":"analyses"}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        {["empty","low","mid","high","full"].map(l => <div key={l} className={`heatmap-legend-cell ${l}`} />)}
        <span>More</span>
      </div>
    </div>
  );
}
