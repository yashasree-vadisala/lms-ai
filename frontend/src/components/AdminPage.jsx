import { useState } from "react";
import { DB } from "../data/db";
import { AdminContentTrends } from "./AdminContentTrends";
import { acColor } from "../data/constants";
import { ActivityHeatmap } from "./ActivityHeatmap";
import { DailyImprovementGraph } from "./DailyImprovementGraph";

// ─── ADMIN PAGE ─────────────────────────────────────────────────────────────────
export function AdminPage({ onViewUserHistory }) {
  const [expandedUser, setExpandedUser] = useState(null);
  const users = DB.getUsers();
  const totalAnalyses = users.reduce((s,u)=>s+(u.analysisCount||0),0);
  const today = new Date().toDateString();
  const newToday = users.filter(u => new Date(u.joined).toDateString()===today).length;
  const activeToday = users.filter(u => {
    const a=DB.getActivity(u.id); const t=new Date().toISOString().split("T")[0];
    return a[t]>0;
  }).length;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">⚙️ Admin Panel</h1>
        <div className="admin-badge">🔐 Admin Access</div>
      </div>

      <div className="stat-grid">
        {[
          { val:users.length,                                    label:"Total Users" },
          { val:totalAnalyses,                                   label:"Total Analyses" },
          { val:activeToday,                                     label:"Active Today" },
          { val:newToday,                                        label:"New Today" },
          { val:users.filter(u=>u.role==="admin").length,        label:"Admins" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <AdminContentTrends />

      <div className="users-table">
        <div className="table-header">👥 Registered Users ({users.length})</div>
        {users.map(u => {
          const activity=DB.getActivity(u.id);
          const todayKey=new Date().toISOString().split("T")[0];
          const todayUsage=activity[todayKey]||0;
          const last7=Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-i); return activity[d.toISOString().split("T")[0]]||0; }).reverse();
          const maxBar=Math.max(...last7,1);
          const isExpanded=expandedUser===u.id;
          return (
            <div key={u.id}>
              <div className="table-row user-detail-row" onClick={() => setExpandedUser(isExpanded?null:u.id)}>
                <div className="user-avatar" style={{ background:acColor(u.username) }}>{u.username[0].toUpperCase()}</div>
                <div className="user-info">
                  <div className="user-name">{u.username} <span className={`user-role-badge ${u.role}`}>{u.role}</span></div>
                  <div className="user-email">{u.email}</div>
                </div>
                <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:28, flexShrink:0 }}>
                  {last7.map((v,i) => (
                    <div key={i} style={{ width:6, height:`${(v/maxBar)*100}%`, minHeight:2, borderRadius:2, background:v>0?"#10b981":"var(--border)", opacity:v===0?0.3:1 }} title={`${v} analyses`} />
                  ))}
                </div>
                <div className="user-meta">
                  <div className="user-count">{u.analysisCount||0} total · {todayUsage} today</div>
                  <div className="user-date">Joined {new Date(u.joined).toLocaleDateString()}</div>
                </div>
                <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                  <button className="view-history-btn" onClick={e => { e.stopPropagation(); onViewUserHistory(u.id,u.username); }}>History</button>
                  <div style={{ padding:"4px 8px", borderRadius:6, border:"1px solid var(--border)", fontSize:11, color:"var(--text-muted)", cursor:"pointer" }}>{isExpanded?"▲":"▼"}</div>
                </div>
              </div>
              {isExpanded && (
                <div style={{ padding:"0 20px 16px", borderBottom:"1px solid rgba(99,102,241,0.08)" }}>
                  <ActivityHeatmap uid={u.id} username={u.username} />
                  <DailyImprovementGraph uid={u.id} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
