import { useState } from "react";
import { DB } from "../data/db";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { DailyImprovementGraph } from "./DailyImprovementGraph";

// ─── HISTORY PAGE ───────────────────────────────────────────────────────────────
export function HistoryPage({ session, onViewItem }) {
  const [history, setHistory] = useState(() => DB.getHistory(session.id));

  const deleteItem = (id,e) => {
    e.stopPropagation();
    const next = history.filter(h => h.id!==id);
    setHistory(next); DB.saveHistory(session.id,next);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})+" · "+d.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <h1 className="history-title">📚 Your History</h1>
        <div style={{ fontSize:13, color:"var(--text-muted)" }}>{history.length} saved analyses</div>
      </div>
      {history.length===0 ? (
        <div className="history-empty">
          <span className="history-empty-icon">📋</span>
          <div className="history-empty-txt">No history yet</div>
          <div>Analyze some content and it will appear here for easy revision later.</div>
        </div>
      ) : (
        <div className="history-list">
          {history.map(item => (
            <div key={item.id} className="history-card" onClick={() => onViewItem(item)}>
              <div className="history-card-header">
                <div className="history-card-source">🔗 {item.source||"Unknown source"}</div>
                <div className="history-card-date">{formatDate(item.date)}</div>
              </div>
              <div className="history-card-preview">{item.summary?.replace(/[#*]/g,"").slice(0,180)}…</div>
              <div className="history-card-footer">
                <span className="history-tag">Summary</span>
                <span className="history-tag">Quiz-ready</span>
                <button className="delete-btn" onClick={e => deleteItem(item.id,e)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ActivityHeatmap uid={session.id} username={session.username} />
      <DailyImprovementGraph uid={session.id} />
    </div>
  );
}
