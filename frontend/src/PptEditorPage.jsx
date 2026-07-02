import { useState } from "react";

// ─── PPT EDITOR ─────────────────────────────────────────────────────────────────
// Replace your existing PptEditorPage component with this one
export function PptEditorPage({ slides, setSlides, onBack, summary }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [showPptModal, setShowPptModal] = useState(false);
  const [exportMsg, setExportMsg] = useState("");
  const [pptxLoading, setPptxLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(null);
  const [customElements, setCustomElements] = useState({});
  const [slideLayouts, setSlideLayouts] = useState({});
  const [slideTheme, setSlideTheme] = useState("cosmic"); // cosmic | ocean | forest | sunset | mono
const [showThemePicker, setShowThemePicker] = useState(false);
  const updateSlide = (field, value) => setSlides(slides.map((s,i) => i === activeIdx ? {...s, [field]: value} : s));
 const SLIDE_THEMES = {
  cosmic: {
    name: "Cosmic", emoji: "🌌",
    types: {
      title:      { bg:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)", bar:"linear-gradient(90deg,#6366f1,#818cf8)", tag:"rgba(99,102,241,0.25)", tagColor:"#a5b4fc", tagText:"Title Slide", dot:"#6366f1", divider:"#6366f1" },
      overview:   { bg:"linear-gradient(135deg,#0a0a1a,#1a1a3e)", bar:"linear-gradient(90deg,#8b5cf6,#a78bfa)", tag:"rgba(139,92,246,0.25)", tagColor:"#c4b5fd", tagText:"Overview", dot:"#8b5cf6", divider:"#8b5cf6" },
      content:    { bg:"linear-gradient(135deg,#050510,#0d0d20)", bar:"linear-gradient(90deg,#14b8a6,#2dd4bf)", tag:"rgba(20,184,166,0.2)", tagColor:"#5eead4", tagText:"Content", dot:"#14b8a6", divider:"#14b8a6" },
      highlight:  { bg:"linear-gradient(135deg,#0d0922,#1a0d40,#2d0d52)", bar:"linear-gradient(90deg,#f59e0b,#fbbf24)", tag:"rgba(245,158,11,0.2)", tagColor:"#fcd34d", tagText:"Key Highlight", dot:"#f59e0b", divider:"#f59e0b" },
      conclusion: { bg:"linear-gradient(135deg,#0f0c29,#1e113a,#2d1b4e)", bar:"linear-gradient(90deg,#ec4899,#f9a8d4)", tag:"rgba(236,72,153,0.2)", tagColor:"#f9a8d4", tagText:"Conclusion", dot:"#ec4899", divider:"#ec4899" },
    }
  },
  ocean: {
    name: "Ocean", emoji: "🌊",
    types: {
      title:      { bg:"linear-gradient(135deg,#0c1445,#0f3460,#16213e)", bar:"linear-gradient(90deg,#0ea5e9,#38bdf8)", tag:"rgba(14,165,233,0.25)", tagColor:"#7dd3fc", tagText:"Title Slide", dot:"#0ea5e9", divider:"#0ea5e9" },
      overview:   { bg:"linear-gradient(135deg,#0a1628,#0d2d4a)", bar:"linear-gradient(90deg,#06b6d4,#22d3ee)", tag:"rgba(6,182,212,0.25)", tagColor:"#67e8f9", tagText:"Overview", dot:"#06b6d4", divider:"#06b6d4" },
      content:    { bg:"linear-gradient(135deg,#071520,#0a2030)", bar:"linear-gradient(90deg,#3b82f6,#60a5fa)", tag:"rgba(59,130,246,0.2)", tagColor:"#93c5fd", tagText:"Content", dot:"#3b82f6", divider:"#3b82f6" },
      highlight:  { bg:"linear-gradient(135deg,#062030,#0a3050,#0d4060)", bar:"linear-gradient(90deg,#10b981,#34d399)", tag:"rgba(16,185,129,0.2)", tagColor:"#6ee7b7", tagText:"Key Highlight", dot:"#10b981", divider:"#10b981" },
      conclusion: { bg:"linear-gradient(135deg,#0c1445,#0f2460,#12346e)", bar:"linear-gradient(90deg,#818cf8,#a5b4fc)", tag:"rgba(129,140,248,0.2)", tagColor:"#c7d2fe", tagText:"Conclusion", dot:"#818cf8", divider:"#818cf8" },
    }
  },
  forest: {
    name: "Forest", emoji: "🌿",
    types: {
      title:      { bg:"linear-gradient(135deg,#052e16,#14532d,#166534)", bar:"linear-gradient(90deg,#22c55e,#4ade80)", tag:"rgba(34,197,94,0.25)", tagColor:"#86efac", tagText:"Title Slide", dot:"#22c55e", divider:"#22c55e" },
      overview:   { bg:"linear-gradient(135deg,#041f0e,#073420)", bar:"linear-gradient(90deg,#10b981,#34d399)", tag:"rgba(16,185,129,0.25)", tagColor:"#6ee7b7", tagText:"Overview", dot:"#10b981", divider:"#10b981" },
      content:    { bg:"linear-gradient(135deg,#031409,#051f10)", bar:"linear-gradient(90deg,#84cc16,#a3e635)", tag:"rgba(132,204,22,0.2)", tagColor:"#bef264", tagText:"Content", dot:"#84cc16", divider:"#84cc16" },
      highlight:  { bg:"linear-gradient(135deg,#0a2010,#142e1a,#1a3e22)", bar:"linear-gradient(90deg,#f59e0b,#fbbf24)", tag:"rgba(245,158,11,0.2)", tagColor:"#fcd34d", tagText:"Key Highlight", dot:"#f59e0b", divider:"#f59e0b" },
      conclusion: { bg:"linear-gradient(135deg,#052e16,#0a4020,#0e5028)", bar:"linear-gradient(90deg,#6ee7b7,#a7f3d0)", tag:"rgba(110,231,183,0.2)", tagColor:"#d1fae5", tagText:"Conclusion", dot:"#6ee7b7", divider:"#6ee7b7" },
    }
  },
  sunset: {
    name: "Sunset", emoji: "🌅",
    types: {
      title:      { bg:"linear-gradient(135deg,#1c0a00,#3d1500,#5a1e00)", bar:"linear-gradient(90deg,#f97316,#fb923c)", tag:"rgba(249,115,22,0.25)", tagColor:"#fdba74", tagText:"Title Slide", dot:"#f97316", divider:"#f97316" },
      overview:   { bg:"linear-gradient(135deg,#150a00,#2c1200)", bar:"linear-gradient(90deg,#ef4444,#f87171)", tag:"rgba(239,68,68,0.25)", tagColor:"#fca5a5", tagText:"Overview", dot:"#ef4444", divider:"#ef4444" },
      content:    { bg:"linear-gradient(135deg,#0e0600,#1c0c00)", bar:"linear-gradient(90deg,#f59e0b,#fbbf24)", tag:"rgba(245,158,11,0.2)", tagColor:"#fcd34d", tagText:"Content", dot:"#f59e0b", divider:"#f59e0b" },
      highlight:  { bg:"linear-gradient(135deg,#1a0510,#2d0a1a,#3d0f24)", bar:"linear-gradient(90deg,#ec4899,#f9a8d4)", tag:"rgba(236,72,153,0.2)", tagColor:"#f9a8d4", tagText:"Key Highlight", dot:"#ec4899", divider:"#ec4899" },
      conclusion: { bg:"linear-gradient(135deg,#1c0a00,#2e1000,#3d1500)", bar:"linear-gradient(90deg,#fb923c,#fed7aa)", tag:"rgba(251,146,60,0.2)", tagColor:"#fed7aa", tagText:"Conclusion", dot:"#fb923c", divider:"#fb923c" },
    }
  },
  mono: {
    name: "Minimal", emoji: "⬜",
    types: {
      title:      { bg:"linear-gradient(135deg,#0a0a0a,#1a1a1a,#111111)", bar:"linear-gradient(90deg,#e2e8f0,#f1f5f9)", tag:"rgba(226,232,240,0.15)", tagColor:"#e2e8f0", tagText:"Title Slide", dot:"#e2e8f0", divider:"#e2e8f0" },
      overview:   { bg:"linear-gradient(135deg,#080808,#141414)", bar:"linear-gradient(90deg,#94a3b8,#cbd5e1)", tag:"rgba(148,163,184,0.15)", tagColor:"#cbd5e1", tagText:"Overview", dot:"#94a3b8", divider:"#94a3b8" },
      content:    { bg:"linear-gradient(135deg,#050505,#0f0f0f)", bar:"linear-gradient(90deg,#64748b,#94a3b8)", tag:"rgba(100,116,139,0.15)", tagColor:"#94a3b8", tagText:"Content", dot:"#64748b", divider:"#64748b" },
      highlight:  { bg:"linear-gradient(135deg,#0a0a0a,#161616,#1e1e1e)", bar:"linear-gradient(90deg,#f1f5f9,#ffffff)", tag:"rgba(241,245,249,0.15)", tagColor:"#f1f5f9", tagText:"Key Highlight", dot:"#f1f5f9", divider:"#f1f5f9" },
      conclusion: { bg:"linear-gradient(135deg,#0a0a0a,#141414,#1c1c1c)", bar:"linear-gradient(90deg,#475569,#64748b)", tag:"rgba(71,85,105,0.2)", tagColor:"#94a3b8", tagText:"Conclusion", dot:"#64748b", divider:"#64748b" },
    }
  },
  aurora: {
    name: "Aurora", emoji: "🌈",
    types: {
      title:      { bg:"linear-gradient(135deg,#001a0a,#003320,#004d30)", bar:"linear-gradient(90deg,#00ff88,#00ffcc)", tag:"rgba(0,255,136,0.2)", tagColor:"#00ffbb", tagText:"Title Slide", dot:"#00ff88", divider:"#00ff88" },
      overview:   { bg:"linear-gradient(135deg,#00001a,#00003d,#000055)", bar:"linear-gradient(90deg,#8b00ff,#bb44ff)", tag:"rgba(139,0,255,0.25)", tagColor:"#cc77ff", tagText:"Overview", dot:"#9922ff", divider:"#9922ff" },
      content:    { bg:"linear-gradient(135deg,#001520,#002535,#003045)", bar:"linear-gradient(90deg,#00ccff,#44eeff)", tag:"rgba(0,204,255,0.2)", tagColor:"#66eeff", tagText:"Content", dot:"#00ccff", divider:"#00ccff" },
      highlight:  { bg:"linear-gradient(135deg,#0a0015,#150025,#1a0030)", bar:"linear-gradient(90deg,#ff00cc,#ff44dd)", tag:"rgba(255,0,204,0.2)", tagColor:"#ff88ee", tagText:"Key Highlight", dot:"#ff00cc", divider:"#ff00cc" },
      conclusion: { bg:"linear-gradient(135deg,#001a0a,#00330f,#004d15)", bar:"linear-gradient(90deg,#00ff88,#99ffcc)", tag:"rgba(0,255,136,0.15)", tagColor:"#aaffdd", tagText:"Conclusion", dot:"#00ff88", divider:"#00ff88" },
    }
  },
  corporate: {
    name: "Corporate", emoji: "💼",
    types: {
      title:      { bg:"linear-gradient(135deg,#003366,#004488,#0055aa)", bar:"linear-gradient(90deg,#ffffff,#e8f4ff)", tag:"rgba(255,255,255,0.2)", tagColor:"#ffffff", tagText:"Title Slide", dot:"#ffffff", divider:"#aaddff" },
      overview:   { bg:"linear-gradient(135deg,#001e3c,#003060,#004080)", bar:"linear-gradient(90deg,#60a5fa,#93c5fd)", tag:"rgba(96,165,250,0.25)", tagColor:"#bfdbfe", tagText:"Overview", dot:"#60a5fa", divider:"#60a5fa" },
      content:    { bg:"linear-gradient(135deg,#0a1628,#0d2040,#102858)", bar:"linear-gradient(90deg,#38bdf8,#7dd3fc)", tag:"rgba(56,189,248,0.2)", tagColor:"#bae6fd", tagText:"Content", dot:"#38bdf8", divider:"#38bdf8" },
      highlight:  { bg:"linear-gradient(135deg,#003366,#004080,#0050a0)", bar:"linear-gradient(90deg,#fbbf24,#fcd34d)", tag:"rgba(251,191,36,0.2)", tagColor:"#fde68a", tagText:"Key Highlight", dot:"#fbbf24", divider:"#fbbf24" },
      conclusion: { bg:"linear-gradient(135deg,#001830,#002a50,#003870)", bar:"linear-gradient(90deg,#93c5fd,#bfdbfe)", tag:"rgba(147,197,253,0.2)", tagColor:"#dbeafe", tagText:"Conclusion", dot:"#93c5fd", divider:"#93c5fd" },
    }
  },
  volcano: {
    name: "Volcano", emoji: "🌋",
    types: {
      title:      { bg:"linear-gradient(135deg,#1a0000,#3d0800,#6b0f00)", bar:"linear-gradient(90deg,#ff4500,#ff6a00)", tag:"rgba(255,69,0,0.25)", tagColor:"#ff9966", tagText:"Title Slide", dot:"#ff4500", divider:"#ff4500" },
      overview:   { bg:"linear-gradient(135deg,#0f0000,#280500,#400a00)", bar:"linear-gradient(90deg,#dc2626,#ef4444)", tag:"rgba(220,38,38,0.25)", tagColor:"#fca5a5", tagText:"Overview", dot:"#dc2626", divider:"#dc2626" },
      content:    { bg:"linear-gradient(135deg,#0a0000,#1a0300,#2d0500)", bar:"linear-gradient(90deg,#f97316,#fb923c)", tag:"rgba(249,115,22,0.2)", tagColor:"#fdba74", tagText:"Content", dot:"#f97316", divider:"#f97316" },
      highlight:  { bg:"linear-gradient(135deg,#150000,#2a0500,#420800)", bar:"linear-gradient(90deg,#fbbf24,#fde68a)", tag:"rgba(251,191,36,0.2)", tagColor:"#fef08a", tagText:"Key Highlight", dot:"#fbbf24", divider:"#fbbf24" },
      conclusion: { bg:"linear-gradient(135deg,#1a0000,#350600,#500a00)", bar:"linear-gradient(90deg,#ff6a00,#ffaa44)", tag:"rgba(255,106,0,0.2)", tagColor:"#ffcc88", tagText:"Conclusion", dot:"#ff6a00", divider:"#ff6a00" },
    }
  },
  galaxy: {
    name: "Galaxy", emoji: "✨",
    types: {
      title:      { bg:"linear-gradient(135deg,#0d001a,#1a0033,#2d004d)", bar:"linear-gradient(90deg,#e040fb,#ea80fc)", tag:"rgba(224,64,251,0.25)", tagColor:"#f3b3ff", tagText:"Title Slide", dot:"#e040fb", divider:"#e040fb" },
      overview:   { bg:"linear-gradient(135deg,#08001a,#120030,#1c0045)", bar:"linear-gradient(90deg,#7c3aed,#a855f7)", tag:"rgba(124,58,237,0.25)", tagColor:"#d8b4fe", tagText:"Overview", dot:"#7c3aed", divider:"#7c3aed" },
      content:    { bg:"linear-gradient(135deg,#050010,#0a0020,#100030)", bar:"linear-gradient(90deg,#6366f1,#818cf8)", tag:"rgba(99,102,241,0.2)", tagColor:"#c7d2fe", tagText:"Content", dot:"#6366f1", divider:"#6366f1" },
      highlight:  { bg:"linear-gradient(135deg,#0a001a,#150030,#200045)", bar:"linear-gradient(90deg,#f472b6,#fb7185)", tag:"rgba(244,114,182,0.2)", tagColor:"#fda4af", tagText:"Key Highlight", dot:"#f472b6", divider:"#f472b6" },
      conclusion: { bg:"linear-gradient(135deg,#0d001a,#1e0040,#2d005d)", bar:"linear-gradient(90deg,#e040fb,#c084fc)", tag:"rgba(224,64,251,0.15)", tagColor:"#e9d5ff", tagText:"Conclusion", dot:"#c084fc", divider:"#c084fc" },
    }
  },
  paper: {
    name: "Paper", emoji: "📄",
    types: {
      title:      { bg:"linear-gradient(135deg,#fefce8,#fef9c3,#fef08a)", bar:"linear-gradient(90deg,#92400e,#b45309)", tag:"rgba(146,64,14,0.15)", tagColor:"#92400e", tagText:"Title Slide", dot:"#92400e", divider:"#b45309" },
      overview:   { bg:"linear-gradient(135deg,#fafaf9,#f5f5f4,#e7e5e4)", bar:"linear-gradient(90deg,#44403c,#57534e)", tag:"rgba(68,64,60,0.12)", tagColor:"#44403c", tagText:"Overview", dot:"#44403c", divider:"#44403c" },
      content:    { bg:"linear-gradient(135deg,#f0fdf4,#dcfce7,#bbf7d0)", bar:"linear-gradient(90deg,#14532d,#166534)", tag:"rgba(20,83,45,0.15)", tagColor:"#14532d", tagText:"Content", dot:"#14532d", divider:"#14532d" },
      highlight:  { bg:"linear-gradient(135deg,#fff7ed,#ffedd5,#fed7aa)", bar:"linear-gradient(90deg,#c2410c,#ea580c)", tag:"rgba(194,65,12,0.15)", tagColor:"#c2410c", tagText:"Key Highlight", dot:"#c2410c", divider:"#c2410c" },
      conclusion: { bg:"linear-gradient(135deg,#fefce8,#fef9c3,#fde68a)", bar:"linear-gradient(90deg,#713f12,#92400e)", tag:"rgba(113,63,18,0.15)", tagColor:"#713f12", tagText:"Conclusion", dot:"#713f12", divider:"#713f12" },
    }
  },
};
 
 

  const addSlide = () => {
    const next = [...slides, { 
      title: "New Slide", 
      content: "Key point one\nKey point two\nKey point three", 
      type: "content"
    }];
    setSlides(next); 
    setActiveIdx(next.length-1);
  };
  
  const deleteSlide = (i) => {
    if (slides.length <= 1) return;
    const next = slides.filter((_,idx) => idx !== i);
    setSlides(next); 
    setActiveIdx(Math.min(activeIdx, next.length-1));
  };

  const insertElement = (element) => {
    const slideElements = customElements[String(activeIdx)] || [];
    const newElement = {
      id: Date.now(),
      ...element,
      position: { 
  x: 50, y: 50, 
  width: element.type === "table" ? 200 : element.type === "shape" && element.shape === "line" ? 180 : 120, 
  height: element.type === "table" ? 150 : element.type === "shape" && element.shape === "line" ? 8 : 120 
}
    };
    
    setCustomElements({
  ...customElements,
  [String(activeIdx)]: [...slideElements, newElement]
});
  };

  const deleteElement = (elementId) => {
    const slideElements = customElements[String(activeIdx)] || [];
    setCustomElements({
  ...customElements,
  [String(activeIdx)]: slideElements.filter(el => el.id !== elementId)
});
  };

  const startDrag = (e, elementId) => {
  const element = (customElements[String(activeIdx)] || []).find(el => el.id === elementId);
    if (!element) return;
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...element.position };
    
    const onMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      setCustomElements(prev => ({
  ...prev,
  [String(activeIdx)]: (prev[String(activeIdx)] || []).map(el =>
          el.id === element.id
            ? { ...el, position: { ...startPos, x: startPos.x + dx, y: startPos.y + dy } }
            : el
        )
      }));
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

   const renderCustomElement = (element) => {
    const baseStyle = {
      position: "absolute",
      left: element.position.x,
      top: element.position.y,
      width: element.position.width,
      height: element.position.height,
      cursor: "move",
      zIndex: 10,
      boxSizing: "border-box",
    };
 
    const ResizeHandle = ({ dir }) => {
      const handleStyle = {
        position: "absolute",
        width: 10, height: 10,
        background: "#6366f1",
        border: "2px solid #fff",
        borderRadius: 2,
        zIndex: 20,
        ...(dir === "se" ? { bottom: -5, right: -5, cursor: "se-resize" } :
            dir === "sw" ? { bottom: -5, left:  -5, cursor: "sw-resize" } :
            dir === "ne" ? { top:    -5, right: -5, cursor: "ne-resize" } :
                           { top:    -5, left:  -5, cursor: "nw-resize" }),
      };
      return (
        <div
          style={handleStyle}
          onMouseDown={(e) => {
            e.stopPropagation();
            const startX = e.clientX, startY = e.clientY;
            const startPos = { ...element.position };
            const onMove = (me) => {
              const dx = me.clientX - startX, dy = me.clientY - startY;
              let { x, y, width, height } = startPos;
              const minW = element.shape === "line" ? 30 : 40;
const minH = element.shape === "line" ? 4 : 40;
if (dir === "se") { width = Math.max(minW, width + dx); height = Math.max(minH, height + dy); }
if (dir === "sw") { x = x + dx; width = Math.max(minW, width - dx); height = Math.max(minH, height + dy); }
if (dir === "ne") { y = y + dy; width = Math.max(minW, width + dx); height = Math.max(minH, height - dy); }
if (dir === "nw") { x = x + dx; y = y + dy; width = Math.max(minW, width - dx); height = Math.max(minH, height - dy); }
              setCustomElements(prev => ({
  ...prev,
  [String(activeIdx)]: (prev[String(activeIdx)] || []).map(el =>
                  el.id === element.id ? { ...el, position: { x, y, width, height } } : el
                ),
              }));
            };
            const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
          }}
        />
      );
    };
 
    const deleteBtn = (
      <button onClick={() => deleteElement(element.id)} style={{
        position: "absolute", top: -10, right: -10,
        background: "#ef4444", color: "#fff", border: "none",
        borderRadius: "50%", width: 22, height: 22,
        cursor: "pointer", fontSize: 12, zIndex: 21, lineHeight: "22px", textAlign: "center",
      }}>×</button>
    );
 
    if (element.type === "image") {
      return (
        <div key={element.id} style={baseStyle} onMouseDown={(e) => startDrag(e, element.id)} className="draggable-element">
          <img src={element.src} alt="Inserted" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 4, display: "block" }} />
          <ResizeHandle dir="se" /><ResizeHandle dir="sw" /><ResizeHandle dir="ne" /><ResizeHandle dir="nw" />
          {deleteBtn}
        </div>
      );
    }
  if (element.type === "shape") {
    // SVG-based PowerPoint-style shape rendering
    const getShapeSVG = (shapeId, w, h) => {
      const fill = "url(#shapeGrad)";
      switch (shapeId) {
        case "rectangle":    return `<rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="${fill}" />`;
        case "roundedRect":  return `<rect x="0" y="0" width="${w}" height="${h}" rx="${Math.min(w,h)*0.2}" fill="${fill}" />`;
        case "circle":       return `<ellipse cx="${w/2}" cy="${h/2}" rx="${w/2}" ry="${h/2}" fill="${fill}" />`;
        case "triangle":     return `<polygon points="${w/2},0 ${w},${h} 0,${h}" fill="${fill}" />`;
        case "rightTriangle":return `<polygon points="0,0 ${w},${h} 0,${h}" fill="${fill}" />`;
        case "diamond":      return `<polygon points="${w/2},0 ${w},${h/2} ${w/2},${h} 0,${h/2}" fill="${fill}" />`;
        case "pentagon": {
          const a=(2*Math.PI/5), pts=Array.from({length:5},(_,i)=>{const ang=-Math.PI/2+i*a; return `${w/2+w/2*Math.cos(ang)},${h/2+h/2*Math.sin(ang)}`;}).join(" ");
          return `<polygon points="${pts}" fill="${fill}" />`;
        }
        case "hexagon": {
          const pts=Array.from({length:6},(_,i)=>{const ang=i*Math.PI/3; return `${w/2+w/2*Math.cos(ang)},${h/2+h/2*Math.sin(ang)}`;}).join(" ");
          return `<polygon points="${pts}" fill="${fill}" />`;
        }
        case "star": {
          const outer=Math.min(w,h)/2, inner=outer*0.4;
          const pts=Array.from({length:10},(_,i)=>{const ang=-Math.PI/2+i*Math.PI/5,r=i%2===0?outer:inner; return `${w/2+r*Math.cos(ang)},${h/2+r*Math.sin(ang)}`;}).join(" ");
          return `<polygon points="${pts}" fill="${fill}" />`;
        }
        case "star6": {
          const outer=Math.min(w,h)/2, inner=outer*0.5;
          const pts=Array.from({length:12},(_,i)=>{const ang=-Math.PI/2+i*Math.PI/6,r=i%2===0?outer:inner; return `${w/2+r*Math.cos(ang)},${h/2+r*Math.sin(ang)}`;}).join(" ");
          return `<polygon points="${pts}" fill="${fill}" />`;
        }
        case "cross": {
          const t=Math.min(w,h)*0.3;
          return `<polygon points="${(w-t)/2},0 ${(w+t)/2},0 ${(w+t)/2},${(h-t)/2} ${w},${(h-t)/2} ${w},${(h+t)/2} ${(w+t)/2},${(h+t)/2} ${(w+t)/2},${h} ${(w-t)/2},${h} ${(w-t)/2},${(h+t)/2} 0,${(h+t)/2} 0,${(h-t)/2} ${(w-t)/2},${(h-t)/2}" fill="${fill}" />`;
        }
        case "arrowRight": {
          const head=w*0.35, shaft=h*0.35;
          return `<polygon points="0,${(h-shaft)/2} ${w-head},${(h-shaft)/2} ${w-head},0 ${w},${h/2} ${w-head},${h} ${w-head},${(h+shaft)/2} 0,${(h+shaft)/2}" fill="${fill}" />`;
        }
        case "arrowLeft": {
          const head=w*0.35, shaft=h*0.35;
          return `<polygon points="${w},${(h-shaft)/2} ${head},${(h-shaft)/2} ${head},0 0,${h/2} ${head},${h} ${head},${(h+shaft)/2} ${w},${(h+shaft)/2}" fill="${fill}" />`;
        }
        case "arrowDouble": {
          const head=w*0.25, shaft=h*0.35;
          return `<polygon points="0,${h/2} ${head},0 ${head},${(h-shaft)/2} ${w-head},${(h-shaft)/2} ${w-head},0 ${w},${h/2} ${w-head},${h} ${w-head},${(h+shaft)/2} ${head},${(h+shaft)/2} ${head},${h}" fill="${fill}" />`;
        }
        case "callout": {
          const tail=h*0.25;
          return `<rect x="0" y="0" width="${w}" height="${h-tail}" rx="4" fill="${fill}" /><polygon points="${w*0.2},${h-tail} ${w*0.1},${h} ${w*0.35},${h-tail}" fill="${fill}" />`;
        }
        case "parallelogram": {
          const skew=w*0.18;
          return `<polygon points="${skew},0 ${w},0 ${w-skew},${h} 0,${h}" fill="${fill}" />`;
        }
        case "trapezoid": {
          const inset=w*0.15;
          return `<polygon points="${inset},0 ${w-inset},0 ${w},${h} 0,${h}" fill="${fill}" />`;
        }
        case "line":
          return `<line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="#6366f1" stroke-width="4" stroke-linecap="round" />`;
        default:
          return `<rect x="0" y="0" width="${w}" height="${h}" rx="3" fill="${fill}" />`;
      }
    };
 
    const w = element.position.width;
    const h = element.position.height;
    const svgContent = getShapeSVG(element.shape || "rectangle", w, h);
 
    return (
      <div key={element.id} style={{ ...baseStyle }} onMouseDown={(e) => startDrag(e, element.id)} className="draggable-element">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <linearGradient id={`shapeGrad`} x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <g dangerouslySetInnerHTML={{ __html: svgContent }} />
        </svg>
        <ResizeHandle dir="se" /><ResizeHandle dir="sw" /><ResizeHandle dir="ne" /><ResizeHandle dir="nw" />
        {deleteBtn}
      </div>
    );
  }
 
    if (element.type === "table") {
      return (
        <div
          key={element.id}
          style={{ ...baseStyle, background: "rgba(5,5,20,0.9)", borderRadius: 8, border: "1px solid rgba(99,102,241,0.4)", overflow: "hidden", display: "flex", flexDirection: "column" }}
          onMouseDown={(e) => { if (e.target.tagName === "INPUT") return; startDrag(e, element.id); }}
          className="draggable-element"
        >
          <div style={{ overflow: "hidden", flex: 1, width: "100%", height: "100%" }}>
            <table style={{ width: "100%", height: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <tbody>
                {element.data.map((row, r) => (
                  <tr key={r} style={{ height: `${100 / element.data.length}%` }}>
                    {row.map((cell, c) => (
                      <td key={c} style={{
                        border: "1px solid rgba(99,102,241,0.25)",
                        padding: "2px 4px",
                        background: r === 0 ? "rgba(99,102,241,0.25)" : r % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                        overflow: "hidden",
                        width: `${100 / row.length}%`,
                      }}>
                        <input
                          value={cell}
                          onChange={e => {
                            setCustomElements(prev => ({
                              ...prev,
                              [String(activeIdx)]: (prev[String(activeIdx)] || []).map(el =>
                                el.id === element.id
                                  ? { ...el, data: el.data.map((row2, ri) => row2.map((c2, ci) => ri === r && ci === c ? e.target.value : c2)) }
                                  : el
                              ),
                            }));
                          }}
                          onMouseDown={ev => ev.stopPropagation()}
                          style={{
                            background: "transparent", border: "none", outline: "none",
                            color: r === 0 ? "#a5b4fc" : "rgba(255,255,255,0.85)",
                            fontWeight: r === 0 ? 700 : 400,
                            fontSize: Math.max(9, Math.min(13, element.position.height / element.data.length / 2.2)),
                            width: "100%", textAlign: "center", cursor: "text", fontFamily: "var(--ff)",
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ResizeHandle dir="se" /><ResizeHandle dir="sw" /><ResizeHandle dir="ne" /><ResizeHandle dir="nw" />
          {deleteBtn}
        </div>
      );
    }
 
    return null;
  };
   
     
 
 const exportPptx = async () => {
  setPptxLoading(true);
  setExportMsg("⏳ Fetching images & building slides…");
  try {
    const blob = await generatePptxBlob(slides, customElements);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "noteai-presentation.pptx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setExportMsg("✅ PowerPoint downloaded successfully!");
  } catch (e) {
    setExportMsg("⚠️ PPTX export failed: " + e.message);
  }
  setPptxLoading(false);
  setTimeout(() => setExportMsg(""), 6000);
};

  const exportPdf = async () => {
    setPdfLoading(true);
    setExportMsg("");
    try {
      const slideText = slides
        .map((s, i) => `# Slide ${i + 1}: ${s.title}\n\n${s.content || ""}`)
        .join("\n\n---\n\n");
      const blob = await generatePdfBlob(
        slideText,
        `Presentation — ${slides.length} slides`,
        customElements,
        slides
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "noteai-presentation.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      setExportMsg("✅ PDF downloaded successfully!");
    } catch (e) {
      setExportMsg("⚠️ PDF export failed: " + e.message);
    }
    setPdfLoading(false);
    setTimeout(() => setExportMsg(""), 4000);
  };

  const active = slides[activeIdx] || slides[0];
  const cfg = typeConfig[active?.type] || typeConfig.content;

  return (
    <div className="ppt-editor-page">
      <div className="ppt-header">
        <h1 className="ppt-title-h">🎨 Presentation Editor</h1>
        <div className="ppt-toolbar">
          <button className="toolbar-btn" onClick={onBack}>← Back</button>
          <button className="toolbar-btn" onClick={() => setShowPptModal(true)}>🔄 Regenerate</button>
          <button className="toolbar-btn" onClick={() => setShowInsertModal("image")}>🖼️ Image</button>
          <button className="toolbar-btn" onClick={() => setShowInsertModal("shape")}>📐 Shape</button>
          <button className="toolbar-btn" onClick={() => setShowInsertModal("table")}>📊 Table</button>
          <button className="toolbar-btn" onClick={exportPdf} disabled={pdfLoading} style={{ background: "linear-gradient(135deg,rgba(225,29,72,0.15),rgba(239,68,68,0.1))", borderColor: "rgba(225,29,72,0.4)", color: "#fca5a5" }}>
            {pdfLoading ? "⏳ PDF…" : "📄 Export PDF"}
          </button>
          <div style={{ position:"relative" }} data-theme-picker>
  <button className="toolbar-btn" onClick={() => setShowThemePicker(p => !p)}
    style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))", borderColor:"rgba(139,92,246,0.35)", color:"#c4b5fd" }}>
    🎨 {SLIDE_THEMES[slideTheme].emoji} {SLIDE_THEMES[slideTheme].name}
  </button>
  {showThemePicker && (
    <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, zIndex:200, background:"#0b0924", border:"1px solid var(--border-strong)", borderRadius:14, padding:12, width:260, boxShadow:"0 20px 40px rgba(0,0,0,0.6)" }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:"var(--text-muted)", marginBottom:10 }}>Slide Theme</div>
      {Object.entries(SLIDE_THEMES).map(([key, t]) => (
        <button key={key} onClick={() => { setSlideTheme(key); setShowThemePicker(false); }}
          style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"9px 10px", borderRadius:9, border:`1px solid ${slideTheme===key?"rgba(99,102,241,0.5)":"transparent"}`, background:slideTheme===key?"rgba(99,102,241,0.12)":"transparent", cursor:"pointer", marginBottom:4, textAlign:"left" }}>
          <div style={{ display:"flex", gap:2, flexShrink:0 }}>
            {["title","content","highlight"].map(tp => (
              <div key={tp} style={{ width:14, height:20, borderRadius:2, background:t.types[tp]?.bg || "#0a0a1a", border:"1px solid rgba(255,255,255,0.08)", overflow:"hidden", position:"relative" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:t.types[tp]?.bar || "#6366f1" }} />
              </div>
            ))}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:600, color:slideTheme===key?"#a5b4fc":"var(--text)", fontFamily:"var(--ff2)" }}>{t.emoji} {t.name}</div>
            <div style={{ fontSize:10, color:"var(--text-muted)" }}>
              {key==="cosmic"?"Purples & teals":key==="ocean"?"Blues & cyans":key==="forest"?"Natural greens":key==="sunset"?"Warm oranges":"Monochrome"}
            </div>
          </div>
          {slideTheme===key && <span style={{ color:"#a5b4fc", fontSize:13 }}>✓</span>}
        </button>
      ))}
    </div>
  )}
</div>
          <button className="toolbar-btn primary" onClick={exportPptx} disabled={pptxLoading}>
            {pptxLoading ? "⏳ Building…" : "⬇ Export .pptx"}
          </button>
        </div>
      </div>
      
      {exportMsg && <div className={exportMsg.startsWith("⚠️") ? "auth-error" : "auth-success"} style={{ marginBottom: 14 }}>{exportMsg}</div>}
      
      <div className="slides-list">
        {slides.map((s, i) => {
          const c = typeConfig[s.type] || typeConfig.content;
          return (
            <div key={i} className={`slide-thumb ${activeIdx === i ? "active" : ""}`} onClick={() => setActiveIdx(i)}>
              <div className="slide-thumb-num" style={{ color: c.dot }}>Slide {i+1} · {s.type}</div>
              <div className="slide-thumb-preview"><strong>{s.title}</strong><br />{s.content?.split("\n")[0]}</div>
            </div>
          );
        })}
        <div className="slide-thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 80 }} onClick={addSlide}>
          <span style={{ fontSize: 20, color: "#a5b4fc" }}>＋</span>
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20, alignItems: "start" }}>
        <div className="slide-editor">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div className="slide-editor-label">Slide {activeIdx+1} of {slides.length}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <select value={active.type} onChange={e => updateSlide("type", e.target.value)}
                style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", borderRadius: 7, padding: "4px 10px", color: cfg.dot, fontSize: 12, cursor: "pointer", outline: "none" }}>
                {["title", "overview", "content", "highlight", "conclusion"].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {slides.length > 1 && (
                <button onClick={() => deleteSlide(activeIdx)} style={{ padding: "4px 10px", borderRadius: 7, border: "1px solid var(--danger-border)", background: "var(--danger-bg)", color: "#fb7185", fontSize: 12, cursor: "pointer" }}>🗑</button>
              )}
            </div>
          </div>
          
          <div className="slide-editor-label">Slide Title</div>
          <input className="slide-title-input" type="text" value={active.title} onChange={e => updateSlide("title", e.target.value)} placeholder="Slide title…" />
          
          <div className="slide-editor-label">Content (one point per line)</div>
          <textarea className="slide-content-input" value={active.content} onChange={e => updateSlide("content", e.target.value)} placeholder={"Point one\nPoint two\nPoint three"} />
          
          <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 9, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", fontSize: 11, color: "var(--text-muted)" }}>
            💡 <strong style={{ color: "var(--text)" }}>Design Tips:</strong> Use the toolbar above to add images, shapes, or tables. Drag any element to reposition it.
          </div>
          
          {customElements[String(activeIdx)] && (
            <div style={{ marginTop: 16 }}>
              <div className="slide-editor-label">Inserted Elements ({customElements[String(activeIdx)].length})</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {customElements[String(activeIdx)].map(el => (
                  <div key={el.id} style={{ padding: "4px 8px", borderRadius: 6, background: "rgba(99,102,241,0.12)", fontSize: 11, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {el.type === "image" && "🖼️"}
                    {el.type === "shape" && "📐"}
                    {el.type === "table" && "📊"}
                    <button onClick={() => deleteElement(el.id)} style={{ background: "none", border: "none", color: "#fb7185", cursor: "pointer", fontSize: 14 }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
    <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>
      Live Preview — drag corners to resize content box
    </div>
    <ResizableSlidePreview
  slide={active}
  index={activeIdx}
  total={slides.length}
  layout={slideLayouts[activeIdx]}
  onLayoutChange={(layout) => setSlideLayouts(prev => ({ ...prev, [activeIdx]: layout }))}
  customElements={customElements[String(activeIdx)] || []}
  renderCustomElement={renderCustomElement}
  slideTheme={slideTheme}
  slideThemes={SLIDE_THEMES}
/>
  </div>
      </div>
      
      {showPptModal && (
        <PptModal summary={summary} onClose={() => setShowPptModal(false)}
          onReady={(newSlides) => { setSlides(newSlides); setActiveIdx(0); setShowPptModal(false); }} />
      )}
      
      {showInsertModal && (
        <InsertModal 
          onClose={() => setShowInsertModal(null)} 
          onInsert={insertElement}
          type={showInsertModal}
        />
      )}
    </div>
  );
}
