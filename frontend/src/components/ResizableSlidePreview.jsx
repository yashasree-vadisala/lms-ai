import { useRef } from "react";

export function ResizableSlidePreview({ slide, index, total, layout, onLayoutChange, customElements, renderCustomElement, slideTheme, slideThemes }) {
  const containerRef = useRef(null);
  const themeTypes = slideThemes?.[slideTheme]?.types || {};
  const cfg = themeTypes[slide.type] || themeTypes.content || {
    bar:"linear-gradient(90deg,#6366f1,#818cf8)", tag:"rgba(99,102,241,0.25)",
    tagColor:"#a5b4fc", tagText:"Content", dot:"#6366f1", divider:"#6366f1",
    bg:"linear-gradient(135deg,#050510,#0d0d20)"
  };

  const bullets = slide.content
    ? slide.content.split("\n").filter(l => l.trim()).map(l => l.replace(/^[•\-\*]\s*/,"").trim()).filter(Boolean)
    : [];
  const isTitle = slide.type === "title";
  const isConclusion = slide.type === "conclusion";
  const useGrid = bullets.length >= 4 && !isTitle && !isConclusion;

  const defaultLayout = isTitle
    ? { xPct: 5, yPct: 22, wPct: 90, hPct: 62 }
    : { xPct: 5, yPct: 38, wPct: 90, hPct: 52 };

  const active = layout || defaultLayout;

  const startResize = (e, dir) => {
    e.stopPropagation();
    e.preventDefault();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const startX = e.clientX, startY = e.clientY;
    const startLayout = { ...active };

    const onMove = (me) => {
      const dxPct = ((me.clientX - startX) / rect.width) * 100;
      const dyPct = ((me.clientY - startY) / rect.height) * 100;
      let { xPct, yPct, wPct, hPct } = startLayout;
      const MIN_W = 20, MIN_H = 15;
      if (dir === "se") { wPct = Math.max(MIN_W, wPct + dxPct); hPct = Math.max(MIN_H, hPct + dyPct); }
      else if (dir === "sw") { const nw = Math.max(MIN_W, wPct - dxPct); xPct = xPct + (wPct - nw); wPct = nw; hPct = Math.max(MIN_H, hPct + dyPct); }
      else if (dir === "ne") { wPct = Math.max(MIN_W, wPct + dxPct); const nh = Math.max(MIN_H, hPct - dyPct); yPct = yPct + (hPct - nh); hPct = nh; }
      else if (dir === "nw") { const nw = Math.max(MIN_W, wPct - dxPct); const nh = Math.max(MIN_H, hPct - dyPct); xPct = xPct + (wPct - nw); yPct = yPct + (hPct - nh); wPct = nw; hPct = nh; }
      xPct = Math.max(0, Math.min(xPct, 95));
      yPct = Math.max(0, Math.min(yPct, 85));
      wPct = Math.min(wPct, 100 - xPct);
      hPct = Math.min(hPct, 100 - yPct);
      onLayoutChange({ xPct, yPct, wPct, hPct });
    };

    const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const resetLayout = () => onLayoutChange(defaultLayout);

  const Handle = ({ dir }) => {
    const pos = {
      se: { bottom: -6, right: -6, cursor: "se-resize" },
      sw: { bottom: -6, left:  -6, cursor: "sw-resize" },
      ne: { top:    -6, right: -6, cursor: "ne-resize" },
      nw: { top:    -6, left:  -6, cursor: "nw-resize" },
    }[dir];
    return (
      <div onMouseDown={(e) => startResize(e, dir)} style={{
        position: "absolute", width: 12, height: 12,
        background: "#6366f1", border: "2px solid #fff",
        borderRadius: 3, zIndex: 30, ...pos,
      }} />
    );
  };

  const fontScale = Math.max(0.55, Math.min(1, active.hPct / 52));
  const titleSize     = `clamp(11px, ${3.5 * fontScale}vw, ${28 * fontScale}px)`;
  const bulletSize    = `clamp(9px,  ${1.8 * fontScale}vw, ${14 * fontScale}px)`;
  const gridTitleSize = `clamp(8px,  ${1.5 * fontScale}vw, ${12 * fontScale}px)`;
  const gridTextSize  = `clamp(7px,  ${1.3 * fontScale}vw, ${11 * fontScale}px)`;

  return (
    <div ref={containerRef} className="slide-canvas-wrap" style={{ marginTop: 0 }}>
      <div style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        background: cfg.bg,
      }}>
        <div className="slide-corner-decoration" style={{ background: cfg.dot, top: -30, right: -30 }} />
        <div className="slide-corner-decoration" style={{ background: cfg.dot, bottom: -40, left: -20, width: 80, height: 80 }} />
        <div className="slide-top-bar" style={{ background: cfg.bar, flexShrink: 0 }} />
        <div className="slide-num-badge">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div style={{
          position: "absolute", top: "12%", left: "5%",
          fontSize: "clamp(7px,1.2vw,9px)", fontWeight: 700,
          letterSpacing: ".12em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: 20,
          background: cfg.tag, color: cfg.tagColor,
          zIndex: 2, pointerEvents: "none",
        }}>
          {cfg.tagText}
        </div>

        {/* Resizable content box */}
        <div style={{
          position: "absolute",
          left: `${active.xPct}%`, top: `${active.yPct}%`,
          width: `${active.wPct}%`, height: `${active.hPct}%`,
          zIndex: 5,
          border: "1.5px dashed rgba(99,102,241,0.6)",
          borderRadius: 6, boxSizing: "border-box",
          padding: "8px 10px", overflow: "hidden",
        }}>
          {isTitle ? (
            <>
              <div className="slide-main-title large" style={{ fontSize: titleSize }}>{slide.title}</div>
              <div className="slide-divider" style={{ background: cfg.divider }} />
              {bullets[0] && <div className="slide-subtitle" style={{ fontSize: bulletSize }}>{bullets[0]}</div>}
              <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                {["AI-Powered","Auto-Generated","NoteAI"].map(l => (
                  <span key={l} style={{ padding: "2px 8px", borderRadius: 20, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", fontSize: `clamp(7px,1.1vw,${9 * fontScale}px)`, color: "rgba(255,255,255,0.7)", fontFamily: "var(--ff2)", fontWeight: 600 }}>{l}</span>
                ))}
              </div>
            </>
          ) : isConclusion ? (
            <>
              <div className="slide-main-title" style={{ fontSize: titleSize, marginBottom: 6 }}>{slide.title}</div>
              <div className="slide-divider" style={{ background: cfg.divider }} />
              <ul className="slide-bullets">
                {bullets.slice(0, 3).map((b, i) => (
                  <li key={i} className="slide-bullet-item">
                    <div className="slide-bullet-dot" style={{ background: cfg.dot }} />
                    <span className="slide-bullet-text" style={{ fontSize: bulletSize }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 10, padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: `1px solid ${cfg.dot}40`, display: "inline-block" }}>
                <span style={{ fontFamily: "var(--ff2)", fontSize: bulletSize, color: cfg.tagColor, fontWeight: 700 }}>Thank You</span>
              </div>
            </>
          ) : useGrid ? (
            <>
              <div className="slide-main-title" style={{ fontSize: titleSize, marginBottom: 4 }}>{slide.title}</div>
              <div className="slide-divider" style={{ background: cfg.divider }} />
              <div className="slide-grid-2col" style={{ marginTop: 4 }}>
                {bullets.slice(0, 4).map((b, i) => (
                  <div key={i} className="slide-grid-card">
                    <div className="slide-grid-card-title" style={{ color: cfg.tagColor, fontSize: gridTitleSize }}>0{i+1}</div>
                    <div className="slide-grid-card-text" style={{ fontSize: gridTextSize }}>{b}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="slide-main-title" style={{ fontSize: titleSize, marginBottom: 4 }}>{slide.title}</div>
              <div className="slide-divider" style={{ background: cfg.divider }} />
              <ul className="slide-bullets">
                {bullets.slice(0, 5).map((b, i) => (
                  <li key={i} className="slide-bullet-item">
                    <div className="slide-bullet-dot" style={{ background: cfg.dot }} />
                    <span className="slide-bullet-text" style={{ fontSize: bulletSize }}>{b}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Handle dir="se" /><Handle dir="sw" /><Handle dir="ne" /><Handle dir="nw" />
        </div>

        <div className="slide-footer" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3 }}>
          <div className="slide-footer-brand">NoteAI</div>
          <div className="slide-footer-progress">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className="slide-footer-dot" style={{ background: i === index ? cfg.dot : "rgba(255,255,255,0.2)", width: i === index ? 24 : 16 }} />
            ))}
          </div>
        </div>
      </div>

      {customElements.map(el => renderCustomElement(el))}

      <button onClick={resetLayout} title="Reset layout" style={{
        position: "absolute", top: 6, right: 6, zIndex: 40,
        padding: "3px 8px", borderRadius: 6,
        border: "1px solid rgba(99,102,241,0.4)",
        background: "rgba(10,10,30,0.85)", color: "#a5b4fc",
        fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "var(--ff)",
      }}>↺ Reset</button>
    </div>
  );
}
