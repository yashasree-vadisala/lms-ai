import { useState, useRef } from "react";
import { DB } from "../data/db";

// ─── DAILY IMPROVEMENT GRAPH ────────────────────────────────────────────────────
export function DailyImprovementGraph({ uid }) {
  const [range, setRange] = useState("30");
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const activity = DB.getActivity(uid);
  const days = parseInt(range);
  const today = new Date();

  const data = Array.from({ length:days }, (_,i) => {
    const d = new Date(today); d.setDate(today.getDate()-(days-1-i));
    const ds = d.toISOString().split("T")[0];
    return { date:ds, count:activity[ds]||0, dayLabel:d.toLocaleDateString("en-US",{month:"short",day:"numeric"}) };
  });

  const maxVal = Math.max(...data.map(d => d.count), 1);
  const totalSessions = data.reduce((s,d) => s+d.count, 0);
  const activeDays = data.filter(d => d.count>0).length;
  const avgPerDay = activeDays > 0 ? (totalSessions/activeDays).toFixed(1) : "0";
  const bestDay = data.reduce((best,d) => d.count>best.count ? d : best, data[0]);

  const W=700, H=120, PAD=8;
  const pts = data.map((d,i) => ({
    x: PAD+(i/(data.length-1))*(W-PAD*2),
    y: H-PAD-(d.count/maxVal)*(H-PAD*2),
    ...d
  }));

  const linePath = pts.map((p,i) => `${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;
  const labelStep = days<=14 ? 1 : days<=30 ? 5 : days<=60 ? 7 : 14;
  const xLabels = data.filter((_,i) => i%labelStep===0 || i===data.length-1);

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX-rect.left)/rect.width)*W;
    let closest=pts[0], minDist=Infinity;
    pts.forEach(p => { const dist=Math.abs(p.x-relX); if(dist<minDist){ minDist=dist; closest=p; } });
    if (minDist < (W/data.length)*0.8) setTooltip({ x:(closest.x/W)*100, y:(closest.y/H)*100, ...closest });
    else setTooltip(null);
  };

  return (
    <div className="improvement-section">
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:4 }}>
        <div>
          <div className="improvement-title">📈 Daily Improvement</div>
          <div className="improvement-sub">Analyses per day — track your learning consistency</div>
        </div>
        <div className="graph-tabs">
          {[["7","7d"],["14","14d"],["30","30d"],["90","90d"]].map(([v,l]) => (
            <button key={v} className={`graph-tab ${range===v?"active":""}`} onClick={() => setRange(v)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="line-graph-wrap" onMouseMove={handleMouseMove} onMouseLeave={() => setTooltip(null)}>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {[0.25,0.5,0.75,1].map(frac => {
            const y=PAD+(1-frac)*(H-PAD*2);
            return <line key={frac} x1={PAD} y1={y} x2={W-PAD} y2={y} stroke="rgba(16,185,129,0.08)" strokeWidth="1" />;
          })}
          <path d={areaPath} fill="url(#areaGrad)" />
          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p,i) => p.count > 0 && (
            <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#10b981" stroke="#0b0924" strokeWidth="1.5" />
          ))}
          {tooltip && <circle cx={tooltip.x/100*W} cy={tooltip.y/100*H} r="5.5" fill="#10b981" stroke="#fff" strokeWidth="2" />}
        </svg>
        {tooltip && (
          <div className="graph-tooltip" style={{ left:`${tooltip.x}%`, top:`${tooltip.y}%` }}>
            <strong style={{ color:"#10b981" }}>{tooltip.count}</strong> {tooltip.count===1?"session":"sessions"}<br />
            <span style={{ color:"#94a3b8", fontSize:10 }}>{tooltip.dayLabel}</span>
          </div>
        )}
      </div>
      <div className="graph-x-labels">
        {xLabels.map((d,i) => <div key={i} className="graph-x-label">{d.dayLabel}</div>)}
      </div>
      <div className="graph-stats-row">
        <div className="graph-stat"><div className="graph-stat-val">{totalSessions}</div><div className="graph-stat-label">Total in period</div></div>
        <div className="graph-stat"><div className="graph-stat-val">{activeDays}</div><div className="graph-stat-label">Active days</div></div>
        <div className="graph-stat"><div className="graph-stat-val">{avgPerDay}</div><div className="graph-stat-label">Avg / active day</div></div>
        <div className="graph-stat"><div className="graph-stat-val">{bestDay?.count||0}</div><div className="graph-stat-label">Best day</div></div>
      </div>
    </div>
  );
}
