import { DB } from "../data/db";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { DailyImprovementGraph } from "./DailyImprovementGraph";

export function AdminUserHistory({ uid, uname, onBack }) {
  const history = DB.getHistory(uid);
  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <button className="back-btn" style={{ marginBottom:8 }} onClick={onBack}>← Back to Admin</button>
          <h1 className="history-title">📋 {uname}'s History</h1>
        </div>
        <div style={{ fontSize:13, color:"var(--text-muted)" }}>{history.length} records</div>
      </div>
      {history.length===0 ? (
        <div className="history-empty"><span className="history-empty-icon">📋</span><div className="history-empty-txt">No history for this user yet</div></div>
      ) : (
        <div className="history-list">
          {history.map(item => (
            <div key={item.id} className="history-card" style={{ cursor:"default" }}>
              <div className="history-card-header">
                <div className="history-card-source">🔗 {item.source||"Unknown source"}</div>
                <div className="history-card-date">{formatDate(item.date)}</div>
              </div>
              <div className="history-card-preview">{item.summary?.replace(/[#*]/g,"").slice(0,240)}…</div>
            </div>
          ))}
        </div>
      )}
      <ActivityHeatmap uid={uid} username={uname} />
      <DailyImprovementGraph uid={uid} />
    </div>
  );
}
