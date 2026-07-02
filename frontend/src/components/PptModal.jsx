import { useState } from "react";

// ─── PPT MODAL ─────────────────────────────────────────────────────────────────
export function PptModal({ summary, onClose, onReady, language = "en" }) {
  const [count, setCount] = useState(6);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");

  const generate = async () => {
    if (count < 2 || count > 20) return;
    setGenerating(true); setProgress(10); setStatusMsg("Structuring content…");
    try {
      const fd = new FormData();
      fd.append("summary_text", summary);
      fd.append("slide_count", String(count));
      let slides;
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate-ppt", { method:"POST", body:fd, headers:{ Accept:"application/json" } });
        if (!res.ok) throw new Error("PPT endpoint failed");
        const data = await res.json();
        slides = data.slides;
      } catch {
        setProgress(50); setStatusMsg("Generating slides from summary…");
        const lines = summary.split("\n").filter(l => l.trim());
        const types = ["title","overview","content","content","highlight","conclusion"];
        const slideSize = Math.ceil(lines.length / count);
        slides = Array.from({ length:count }, (_,i) => {
          const chunk = lines.slice(i*slideSize,(i+1)*slideSize);
          const title = chunk.find(l => l.startsWith("#"))?.replace(/^#+\s*/,"") || (i===0 ? "Presentation Title" : `Topic ${i+1}`);
          const bullets = chunk.filter(l => !l.startsWith("#")).slice(0,5).map(l => l.replace(/^[\-\*•]\s*/,"").replace(/\*\*/g,"").trim()).filter(Boolean);
          return { title, content:bullets.join("\n") || "Key insight from this section", type:types[Math.min(i,types.length-1)] };
        });
      }
      setProgress(100); setStatusMsg("Done!");
      setTimeout(() => onReady(slides), 400);
    } catch { setGenerating(false); setProgress(0); }
  };

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="modal-title">🎯 Create Presentation</div>
        <div className="modal-sub">AI will generate professional slides from your summary content.</div>
        {!generating ? (
          <>
            <div style={{ marginBottom:20 }}>
              <label className="form-label" style={{ display:"block", marginBottom:10 }}>How many slides? (2–20)</label>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <input className="slide-count-input" type="number" min="2" max="20" value={count} onChange={e => setCount(parseInt(e.target.value)||6)} />
                <span style={{ fontSize:13, color:"var(--text-muted)" }}>slides</span>
                <div style={{ display:"flex", gap:6, marginLeft:"auto" }}>
                  {[4,6,8,10].map(n => (
                    <button key={n} onClick={() => setCount(n)} style={{ padding:"4px 10px", borderRadius:7, border:`1px solid ${count===n?"var(--blue)":"var(--border)"}`, background:count===n?"rgba(99,102,241,0.15)":"transparent", color:count===n?"#a5b4fc":"var(--text-muted)", fontSize:12, cursor:"pointer" }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-btns">
              <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
              <button className="modal-btn primary" onClick={generate}>✨ Generate {count} Slides</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div className="spinner" />
            <div style={{ fontFamily:"var(--ff2)", fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:4 }}>Building your presentation…</div>
            <div className="ppt-progress-bar"><div className="ppt-progress-fill" style={{ width:`${progress}%` }} /></div>
            <div style={{ fontSize:12, color:"var(--text-muted)" }}>{statusMsg}</div>
          </div>
        )}
      </div>
    </div>
  );
}
