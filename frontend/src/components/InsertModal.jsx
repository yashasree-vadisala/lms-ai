import { useState } from "react";
import { correctSearchQuery } from "../utils/textUtils";
import { fetchImageAsBase64 } from "../utils/pptxBuilder";

// Add this after your existing components, before the export default App
export function InsertModal({ onClose, onInsert, type }) {
  const [converting, setConverting] = useState(false); 
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [shapeType, setShapeType] = useState("rectangle");
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [tableData, setTableData] = useState(() =>
    Array.from({ length: 3 }, (_, r) =>
      Array.from({ length: 3 }, (_, c) =>
        r === 0 ? `Header ${c + 1}` : `Cell ${r},${c + 1}`
      )
    )
  );
  const [imgTab, setImgTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchError, setSearchError] = useState("");

 
  // ── Improved image search: Pixabay → Unsplash → Wikipedia fallback
 const searchImages = async () => {
  if (!searchQuery.trim()) return;
  setSearchLoading(true);
  setSearchResults([]);
  setSelectedImg(null);
  setSearchError("");
 
  const q = correctSearchQuery(searchQuery.trim());
 
  try {
    const results = [];
 
    // ── 1. Wikipedia article thumbnail (very reliable) ───────────────────────
    try {
      const wikiRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`,
        { signal: AbortSignal.timeout(6000) }
      );
      if (wikiRes.ok) {
        const d = await wikiRes.json();
        if (d?.originalimage?.source) results.push(d.originalimage.source);
        else if (d?.thumbnail?.source) results.push(d.thumbnail.source);
      }
    } catch (_) {}
 
    // ── 2. Wikimedia Commons image search ────────────────────────────────────
    try {
      const commonsSearch = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&list=search` +
        `&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=20&format=json&origin=*`,
        { signal: AbortSignal.timeout(8000) }
      );
      if (commonsSearch.ok) {
        const cJson = await commonsSearch.json();
        const titles = (cJson?.query?.search || [])
          .map(r => r.title)
          .filter(t => /\.(jpe?g|png|webp)/i.test(t))
          .slice(0, 10);
 
        if (titles.length > 0) {
          const thumbRes = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query` +
            `&titles=${titles.map(encodeURIComponent).join("|")}` +
            `&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json&origin=*`,
            { signal: AbortSignal.timeout(8000) }
          );
          if (thumbRes.ok) {
            const tJson = await thumbRes.json();
            Object.values(tJson?.query?.pages || {})
              .map(p => p?.imageinfo?.[0]?.thumburl)
              .filter(Boolean)
              .filter(u => !/\.svg$/i.test(u))
              .slice(0, 6)
              .forEach(u => results.push(u));
          }
        }
      }
    } catch (_) {}
 
    // ── 3. Unsplash Source (no API key needed, always returns relevant image) ─
    // Each lock value gives a different photo for the same query
    for (let i = 0; i < 4; i++) {
      results.push(`https://source.unsplash.com/600x400/?${encodeURIComponent(q)}&sig=${i}`);
    }
 
    // ── 4. Picsum with keyword hint (guaranteed to load, themed by seed) ──────
    // Use as last-resort filler only if we still have fewer than 6
    if (results.length < 6) {
      const seed = q.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      for (let i = 0; results.length < 6; i++) {
        results.push(`https://picsum.photos/seed/${seed + i}/600/400`);
      }
    }
 
    // Deduplicate and cap at 9
    const unique = [...new Set(results)].slice(0, 9);
    setSearchResults(unique);
 
    if (unique.length === 0) {
      setSearchError("No images found. Try a different search term.");
    }
  } catch (err) {
    setSearchError("Search failed. Try uploading an image or using a URL instead.");
    // Picsum guaranteed fallback
    const seed = q.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    setSearchResults(
      Array.from({ length: 6 }, (_, i) =>
        `https://picsum.photos/seed/${seed + i}/600/400`
      )
    );
  }
 
  setSearchLoading(false);
};
 
 
  const rebuildTable = (rows, cols) => {
    setTableData(prev =>
      Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) =>
          prev[r]?.[c] ?? (r === 0 ? `Header ${c + 1}` : "")
        )
      )
    );
  };
  const handleRowChange = (val) => {
    const rows = Math.max(1, Math.min(10, parseInt(val) || 1));
    setTableRows(rows);
    rebuildTable(rows, tableCols);
  };
  const handleColChange = (val) => {
    const cols = Math.max(1, Math.min(8, parseInt(val) || 1));
    setTableCols(cols);
    rebuildTable(tableRows, cols);
  };
  const updateCell = (r, c, value) =>
    setTableData(prev =>
      prev.map((row, ri) => row.map((cell, ci) => (ri === r && ci === c ? value : cell)))
    );
 
  const handleImageUpload = async () => {
  if (selectedImg) {
    // Try base64, but fall back to direct URL if CORS blocked
    setConverting(true);
    const base64 = await fetchImageAsBase64(selectedImg);
    setConverting(false);
    onInsert({ type: "image", src: base64 || selectedImg, isBase64: !!base64 });
    onClose();
    return;
  }
  if (file) {
    const reader = new FileReader();
    reader.onload = e => { 
      onInsert({ type: "image", src: e.target.result, isBase64: true });
      onClose();
    };
    reader.readAsDataURL(file);
    return;
  }
  if (url) {
    // Don't block on CORS — just use the URL directly for preview
    // Export functions will attempt conversion at export time
    setConverting(true);
    const base64 = await fetchImageAsBase64(url);
    setConverting(false);
    // Use base64 if available, otherwise use URL directly (will show in preview, may not export)
    onInsert({ type: "image", src: base64 || url, isBase64: !!base64 });
    onClose();
  }
};
  const handleShapeInsert = () => { onInsert({ type: "shape", shape: shapeType }); onClose(); };
  const handleTableInsert = () => { onInsert({ type: "table", rows: tableRows, cols: tableCols, data: tableData }); onClose(); };
 
  const cellStyle = {
    background: "var(--input-bg)", border: "1px solid var(--input-border)",
    borderRadius: 4, padding: "4px 6px", fontSize: 12, color: "var(--input-text)",
    outline: "none", width: "100%", minWidth: 60, fontFamily: "var(--ff)",
  };
  const headerCellStyle = { ...cellStyle, fontWeight: 700, color: "#a5b4fc" };
  const tabBtn = (id, label) => (
    <button key={id} onClick={() => setImgTab(id)} style={{
      flex: 1, padding: "7px 4px", border: "none",
      borderBottom: imgTab === id ? "2px solid #6366f1" : "2px solid transparent",
      background: "transparent", color: imgTab === id ? "#a5b4fc" : "var(--text-muted)",
      fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--ff)",
    }}>{label}</button>
  );
 
  // ── Shape definitions — proper PowerPoint-style SVG previews
  const SHAPES = [
    { id: "rectangle", label: "Rectangle", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <rect x="4" y="4" width="52" height="32" rx="3" fill="#6366f1" />
      </svg>
    )},
    { id: "roundedRect", label: "Rounded", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <rect x="4" y="4" width="52" height="32" rx="12" fill="#8b5cf6" />
      </svg>
    )},
    { id: "circle", label: "Ellipse", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <ellipse cx="30" cy="20" rx="26" ry="16" fill="#6366f1" />
      </svg>
    )},
    { id: "triangle", label: "Triangle", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <polygon points="30,4 56,36 4,36" fill="#8b5cf6" />
      </svg>
    )},
    { id: "rightTriangle", label: "Right △", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <polygon points="4,36 56,36 4,4" fill="#6366f1" />
      </svg>
    )},
    { id: "diamond", label: "Diamond", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <polygon points="30,2 58,20 30,38 2,20" fill="#8b5cf6" />
      </svg>
    )},
    { id: "pentagon", label: "Pentagon", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <polygon points="30,2 56,18 46,38 14,38 4,18" fill="#6366f1" />
      </svg>
    )},
    { id: "hexagon", label: "Hexagon", preview: (
      <svg viewBox="0 0 60 40" style={{ width: 40, height: 28 }}>
        <polygon points="16,3 44,3 58,20 44,37 16,37 2,20" fill="#8b5cf6" />
      </svg>
    )},
    { id: "star", label: "Star 5pt", preview: (
      <svg viewBox="0 0 60 60" style={{ width: 32, height: 32 }}>
        <polygon points="30,2 36,22 58,22 40,36 46,58 30,44 14,58 20,36 2,22 24,22" fill="#f59e0b" />
      </svg>
    )},
    { id: "star6", label: "Star 6pt", preview: (
      <svg viewBox="0 0 60 60" style={{ width: 32, height: 32 }}>
        <polygon points="30,2 38,20 58,20 44,32 50,52 30,40 10,52 16,32 2,20 22,20" fill="#f59e0b" />
      </svg>
    )},
    { id: "cross", label: "Cross", preview: (
      <svg viewBox="0 0 60 60" style={{ width: 32, height: 32 }}>
        <polygon points="20,2 40,2 40,20 58,20 58,40 40,40 40,58 20,58 20,40 2,40 2,20 20,20" fill="#ec4899" />
      </svg>
    )},
    { id: "arrowRight", label: "Arrow →", preview: (
      <svg viewBox="0 0 80 40" style={{ width: 44, height: 28 }}>
        <polygon points="2,12 52,12 52,2 78,20 52,38 52,28 2,28" fill="#6366f1" />
      </svg>
    )},
    { id: "arrowLeft", label: "Arrow ←", preview: (
      <svg viewBox="0 0 80 40" style={{ width: 44, height: 28 }}>
        <polygon points="78,12 28,12 28,2 2,20 28,38 28,28 78,28" fill="#6366f1" />
      </svg>
    )},
    { id: "arrowDouble", label: "Arrow ↔", preview: (
      <svg viewBox="0 0 80 40" style={{ width: 44, height: 28 }}>
        <polygon points="2,20 22,4 22,14 58,14 58,4 78,20 58,36 58,26 22,26 22,36" fill="#8b5cf6" />
      </svg>
    )},
    { id: "callout", label: "Callout", preview: (
      <svg viewBox="0 0 70 50" style={{ width: 44, height: 32 }}>
        <rect x="4" y="2" width="62" height="36" rx="4" fill="#6366f1" />
        <polygon points="16,38 8,48 30,38" fill="#6366f1" />
      </svg>
    )},
    { id: "line", label: "Line", preview: (
      <svg viewBox="0 0 60 20" style={{ width: 44, height: 16 }}>
        <line x1="4" y1="10" x2="56" y2="10" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
      </svg>
    )},
    { id: "parallelogram", label: "Parallel.", preview: (
      <svg viewBox="0 0 70 40" style={{ width: 44, height: 28 }}>
        <polygon points="14,4 66,4 56,36 4,36" fill="#8b5cf6" />
      </svg>
    )},
    { id: "trapezoid", label: "Trapezoid", preview: (
      <svg viewBox="0 0 70 40" style={{ width: 44, height: 28 }}>
        <polygon points="14,4 56,4 66,36 4,36" fill="#6366f1" />
      </svg>
    )},
  ];
 
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" style={{
        maxWidth: type === "table" ? 640 : type === "shape" ? 600 : 520,
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <div className="modal-title">
          {type === "image" && "🖼️ Insert Image"}
          {type === "shape" && "📐 Insert Shape"}
          {type === "table" && "📊 Insert Table"}
        </div>
 
        {/* ── IMAGE ── */}
        {type === "image" && (
          <>
            <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 16 }}>
              {tabBtn("search", "🔍 Search")}
              {tabBtn("url", "🔗 URL")}
              {tabBtn("upload", "📁 Upload")}
            </div>
 
            {imgTab === "search" && (
              <>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input className="form-input" style={{ flex: 1 }} type="text"
  placeholder="e.g. machine learning, photosynthesis, solar system…"
  value={searchQuery}
  onChange={e => setSearchQuery(e.target.value)}
  onKeyDown={e => e.key === "Enter" && searchImages()} />
<button className="modal-btn primary" onClick={searchImages}
  style={{ whiteSpace: "nowrap", minWidth: 80 }}>
  🔍 Search
</button>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 12 }}>
                  Searches Wikipedia Commons & Unsplash for relevant educational images
                </div>
 
                {searchError && (
                  <div style={{ fontSize: 12, color: "#fb7185", marginBottom: 8 }}>⚠️ {searchError}</div>
                )}
 
                {searchLoading && (
                  <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)", fontSize: 13 }}>
                    <div className="spinner" style={{ width: 24, height: 24, margin: "0 auto 8px" }} />
                    Searching for relevant images…
                  </div>
                )}
 
                {searchResults.length > 0 && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
                      {searchResults.map((imgUrl, i) => (
                        <div key={i} onClick={() => setSelectedImg(selectedImg === imgUrl ? null : imgUrl)}
                          style={{
                            aspectRatio: "1", borderRadius: 8, overflow: "hidden",
                            border: selectedImg === imgUrl ? "2px solid #6366f1" : "2px solid var(--border)",
                            cursor: "pointer", background: "var(--input-bg)", position: "relative",
                          }}>
                          <img src={imgUrl} alt={`Result ${i + 1}`}
                            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{
                            display: "none", width: "100%", height: "100%",
                            alignItems: "center", justifyContent: "center",
                            fontSize: 10, color: "var(--text-muted)", position: "absolute", inset: 0,
                            background: "var(--input-bg)", textAlign: "center", padding: 4,
                          }}>
                            Image unavailable
                          </div>
                          {selectedImg === imgUrl && (
                            <div style={{
                              position: "absolute", top: 4, right: 4,
                              background: "#6366f1", borderRadius: "50%",
                              width: 20, height: 20, display: "flex",
                              alignItems: "center", justifyContent: "center",
                              fontSize: 11, color: "#fff",
                            }}>✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                    {!selectedImg && (
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 10 }}>
                        Click an image to select it
                      </div>
                    )}
                  </>
                )}
 
                {!searchLoading && searchResults.length === 0 && !searchQuery && (
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
                      Search for concepts, diagrams, or topics
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
                      {["solar system", "cell structure", "water cycle", "neural network", "world map", "DNA"].map(s => (
                        <span key={s} onClick={() => setSearchQuery(s)} style={{
                          padding: "4px 10px", borderRadius: 20, border: "1px solid var(--border)",
                          fontSize: 11, cursor: "pointer", color: "var(--text-muted)",
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
 
            {imgTab === "url" && (
              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Paste image URL</label>
                <input type="url" placeholder="https://example.com/image.jpg"
                  value={url} onChange={e => setUrl(e.target.value)} className="form-input" />
                {url && (
                  <img src={url} alt="Preview" style={{
                    marginTop: 10, width: "100%", maxHeight: 160,
                    objectFit: "contain", borderRadius: 8, border: "1px solid var(--border)",
                  }} onError={e => e.target.style.display = "none"} />
                )}
              </div>
            )}
 
            {imgTab === "upload" && (
              <div style={{ marginBottom: 16 }}>
                <label className="form-label">Upload from device</label>
                <input type="file" accept="image/*"
                  onChange={e => setFile(e.target.files[0])} className="form-input" />
                {file && <div style={{ marginTop: 8, fontSize: 12, color: "#10b981" }}>✅ {file.name}</div>}
              </div>
            )}
 
            <div className="modal-btns" style={{ marginTop: 8 }}>
              <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
              <button className="modal-btn primary" onClick={handleImageUpload}
                disabled={!selectedImg && !file && !url}>
                Insert Image
              </button>
            </div>
          </>
        )}
 
        {/* ── SHAPES — PowerPoint-style grid ── */}
        {type === "shape" && (
          <>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 14 }}>
              Choose a shape — all are resizable and repositionable on the slide
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(6, 1fr)",
              gap: 8, marginBottom: 20,
            }}>
              {SHAPES.map(s => (
                <button key={s.id} onClick={() => setShapeType(s.id)} style={{
                  padding: "10px 4px 8px",
                  border: `2px solid ${shapeType === s.id ? "var(--blue)" : "var(--border)"}`,
                  borderRadius: 8,
                  background: shapeType === s.id ? "rgba(99,102,241,0.15)" : "var(--surface)",
                  cursor: "pointer", textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                }}>
                  {s.preview}
                  <div style={{
                    fontSize: 9, color: shapeType === s.id ? "#a5b4fc" : "var(--text-muted)",
                    fontWeight: 600, lineHeight: 1.2,
                  }}>{s.label}</div>
                </button>
              ))}
            </div>
            <div className="modal-btns">
              <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
              <button className="modal-btn primary" onClick={handleShapeInsert}>Insert Shape</button>
            </div>
          </>
        )}
 
        {/* ── TABLE ── */}
        {type === "table" && (
          <>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-end", marginBottom: 18 }}>
              <div>
                <label className="form-label">Rows (1–10)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => handleRowChange(tableRows - 1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", cursor: "pointer", fontSize: 16 }}>−</button>
                  <input type="number" min={1} max={10} value={tableRows}
                    onChange={e => handleRowChange(e.target.value)} style={{ width: 52, textAlign: "center", background: "var(--input-bg)", border: "1px solid var(--input-border)", borderRadius: 7, padding: "5px 6px", color: "var(--input-text)", fontSize: 14, outline: "none" }} />
                  <button onClick={() => handleRowChange(tableRows + 1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", cursor: "pointer", fontSize: 16 }}>+</button>
                </div>
              </div>
              <div>
                <label className="form-label">Columns (1–8)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button onClick={() => handleColChange(tableCols - 1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", cursor: "pointer", fontSize: 16 }}>−</button>
                  <input type="number" min={1} max={8} value={tableCols}
                    onChange={e => handleColChange(e.target.value)} style={{ width: 52, textAlign: "center", background: "var(--input-bg)", border: "1px solid var(--input-border)", borderRadius: 7, padding: "5px 6px", color: "var(--input-text)", fontSize: 14, outline: "none" }} />
                  <button onClick={() => handleColChange(tableCols + 1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", cursor: "pointer", fontSize: 16 }}>+</button>
                </div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-muted)", paddingBottom: 6 }}>
                {tableRows} × {tableCols} table
              </div>
            </div>
            <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--blue)" }}>
              Edit cell content
            </div>
            <div style={{ overflowX: "auto", marginBottom: 18, borderRadius: 10, border: "1px solid var(--border)", background: "var(--card-bg)" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", minWidth: tableCols * 90 }}>
                <tbody>
                  {tableData.map((row, r) => (
                    <tr key={r}>
                      {row.map((cell, c) => (
                        <td key={c} style={{ border: "1px solid rgba(99,102,241,0.15)", padding: 4, background: r === 0 ? "rgba(99,102,241,0.08)" : "transparent" }}>
                          <input value={cell} onChange={e => updateCell(r, c, e.target.value)}
                            style={r === 0 ? headerCellStyle : cellStyle} placeholder={r === 0 ? `Col ${c + 1}` : ""} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 16 }}>
              💡 First row is treated as the header.
            </div>
            <div className="modal-btns">
              <button className="modal-btn secondary" onClick={onClose}>Cancel</button>
              <button className="modal-btn primary" onClick={handleTableInsert}>Insert Table</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
