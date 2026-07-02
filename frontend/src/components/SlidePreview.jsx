import { typeConfig } from "../data/constants";

// ─── SLIDE PREVIEW ──────────────────────────────────────────────────────────────
export function SlidePreview({ slide, index, total }) {
  const cfg = typeConfig[slide.type] || typeConfig.content;
  const bullets = slide.content ? slide.content.split("\n").filter(l=>l.trim()).map(l=>l.replace(/^[•\-\*]\s*/,"").trim()).filter(Boolean) : [];
  const isTitle = slide.type === "title";
  const isConclusion = slide.type === "conclusion";
  const useGrid = bullets.length >= 4 && !isTitle && !isConclusion;

  return (
    <div className="slide-canvas-wrap">
      <div className={`slide-canvas type-${slide.type}`} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"flex", flexDirection:"column" }}>
        <div className="slide-corner-decoration" style={{ background:cfg.dot, top:-30, right:-30 }} />
        <div className="slide-corner-decoration" style={{ background:cfg.dot, bottom:-40, left:-20, width:80, height:80 }} />
        <div className="slide-top-bar" style={{ background:cfg.bar }} />
        <div className="slide-num-badge">{String(index+1).padStart(2,"0")} / {String(total).padStart(2,"0")}</div>
        <div className="slide-body">
          <div className="slide-tag" style={{ background:cfg.tag, color:cfg.tagColor }}>{cfg.tagText}</div>
          {isTitle ? (
            <>
              <div className="slide-main-title large">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              {bullets[0] && <div className="slide-subtitle">{bullets[0]}</div>}
              <div style={{ display:"flex", gap:8, marginTop:16, flexWrap:"wrap" }}>
                {["AI-Powered","Auto-Generated","NoteAI"].map(l => (
                  <span key={l} style={{ padding:"4px 12px", borderRadius:20, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", fontSize:"clamp(8px,1.4vw,11px)", color:"rgba(255,255,255,0.7)", fontFamily:"var(--ff2)", fontWeight:600 }}>{l}</span>
                ))}
              </div>
            </>
          ) : isConclusion ? (
            <>
              <div className="slide-main-title">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              {bullets.length > 0 && (
                <ul className="slide-bullets">
                  {bullets.slice(0,3).map((b,i) => (
                    <li key={i} className="slide-bullet-item"><div className="slide-bullet-dot" style={{ background:cfg.dot }} /><span className="slide-bullet-text">{b}</span></li>
                  ))}
                </ul>
              )}
              <div style={{ marginTop:20, padding:"10px 16px", borderRadius:8, background:"rgba(255,255,255,0.06)", border:`1px solid ${cfg.dot}40`, display:"inline-block" }}>
                <span style={{ fontFamily:"var(--ff2)", fontSize:"clamp(10px,1.8vw,14px)", color:cfg.tagColor, fontWeight:700 }}>Thank You</span>
              </div>
            </>
          ) : useGrid ? (
            <>
              <div className="slide-main-title">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              <div className="slide-grid-2col">
                {bullets.slice(0,4).map((b,i) => (
                  <div key={i} className="slide-grid-card">
                    <div className="slide-grid-card-title" style={{ color:cfg.tagColor }}>0{i+1}</div>
                    <div className="slide-grid-card-text">{b}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="slide-main-title">{slide.title}</div>
              <div className="slide-divider" style={{ background:cfg.divider }} />
              <ul className="slide-bullets">
                {bullets.slice(0,5).map((b,i) => (
                  <li key={i} className="slide-bullet-item"><div className="slide-bullet-dot" style={{ background:cfg.dot }} /><span className="slide-bullet-text">{b}</span></li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="slide-footer">
          <div className="slide-footer-brand">NoteAI</div>
          <div className="slide-footer-progress">
            {Array.from({ length:total }).map((_,i) => (
              <div key={i} className="slide-footer-dot" style={{ background:i===index ? cfg.dot : "rgba(255,255,255,0.2)", width:i===index ? 24 : 16 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
