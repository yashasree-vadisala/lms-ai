// Add this RIGHT BEFORE function buildPptx(...)
export async function fetchImageAsBase64(src) {
  if (!src) return null;
  if (src.startsWith("data:")) return src;

  const proxies = [
    (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://images.weserv.nl/?url=${encodeURIComponent(url.replace(/^https?:\/\//, ""))}`,
  ];

  for (const makeProxyUrl of proxies) {
    try {
      const proxyUrl = makeProxyUrl(src);
      const response = await fetch(proxyUrl, {
        signal: AbortSignal.timeout(10000),
        headers: { Accept: "image/*" },
      });
      if (!response.ok) continue;
      const blob = await response.blob();
      if (!blob.size || !blob.type.startsWith("image/")) continue;
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("FileReader failed"));
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.warn("Proxy attempt failed:", e.message);
    }
  }

  console.warn("All proxy attempts failed for:", src);
  return null;
}

export function buildPptx(slides, allCustomElements = {}, resolve, reject) {
  try {
    const pptx = new window.PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";
 
    const TYPE_CFG = {
      title:      { bg: "0F0C29", accent: "6366F1", tagText: "TITLE SLIDE"  },
      overview:   { bg: "0A0A1A", accent: "8B5CF6", tagText: "OVERVIEW"     },
      content:    { bg: "050510", accent: "14B8A6", tagText: "CONTENT"       },
      highlight:  { bg: "0D0922", accent: "F59E0B", tagText: "KEY HIGHLIGHT" },
      conclusion: { bg: "0F0C29", accent: "EC4899", tagText: "CONCLUSION"    },
    };
 
    // Canvas reference dimensions (must match the editor preview)
    const CANVAS_W_PX = 600;
    const CANVAS_H_PX = 338;
    const SLIDE_W_IN  = 13.33;
    const SLIDE_H_IN  = 7.5;
 
    slides.forEach((slide, si) => {
      const pSlide = pptx.addSlide();
      const cfg    = TYPE_CFG[slide.type] || TYPE_CFG.content;
 
      // ── Background ──────────────────────────────────────────────────────────
      pSlide.background = { color: cfg.bg };
 
      // ── Top accent bar ──────────────────────────────────────────────────────
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: "100%", h: 0.08,
        fill: { color: cfg.accent },
        line: { type: "none" },
      });
 
      // ── Tag pill ────────────────────────────────────────────────────────────
      pSlide.addShape(pptx.ShapeType.roundRect, {
        x: 0.28, y: 0.16, w: 1.7, h: 0.23, rectRadius: 0.06,
        fill: { color: cfg.accent, transparency: 75 },
        line: { type: "none" },
      });
      pSlide.addText(cfg.tagText, {
        x: 0.28, y: 0.16, w: 1.7, h: 0.23,
        fontSize: 6.5, bold: true, color: "FFFFFF",
        align: "center", valign: "middle", fontFace: "Segoe UI",
      });
 
      // ── Slide number ────────────────────────────────────────────────────────
      pSlide.addText(
        `${String(si + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`,
        { x: 11.4, y: 0.16, w: 1.7, h: 0.23,
          fontSize: 8, color: "555577", align: "right", fontFace: "Segoe UI" }
      );
 
      const bullets = (slide.content || "")
        .split("\n")
        .map(l => l.replace(/^[•\-\*]\s*/, "").trim())
        .filter(Boolean);
 
      const isTitle      = slide.type === "title";
      const isConclusion = slide.type === "conclusion";
 
      // ── Slide content ────────────────────────────────────────────────────────
      if (isTitle) {
        pSlide.addText(slide.title || "Presentation", {
          x: 0.5, y: 1.6, w: 12.3, h: 1.8,
          fontSize: 40, bold: true, color: "FFFFFF",
          fontFace: "Segoe UI", align: "center",
        });
        pSlide.addShape(pptx.ShapeType.rect, {
          x: 5.4, y: 3.55, w: 2.5, h: 0.04,
          fill: { color: cfg.accent }, line: { type: "none" },
        });
        if (bullets[0]) {
          pSlide.addText(bullets[0], {
            x: 1, y: 3.75, w: 11.3, h: 0.9,
            fontSize: 15, color: "9999BB", fontFace: "Segoe UI", align: "center",
          });
        }
        ["AI-Powered", "Auto-Generated", "NoteAI"].forEach((label, i) => {
          const pillX = 4.4 + i * 1.6;
          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: pillX, y: 4.85, w: 1.45, h: 0.3, rectRadius: 0.08,
            fill: { color: "FFFFFF", transparency: 92 },
            line: { color: "FFFFFF", transparency: 80, width: 0.5 },
          });
          pSlide.addText(label, {
            x: pillX, y: 4.85, w: 1.45, h: 0.3,
            fontSize: 8, color: "CCCCDD", bold: true,
            align: "center", valign: "middle", fontFace: "Segoe UI",
          });
        });
      } else {
        // Non-title slides: title + divider + bullets
        pSlide.addText(slide.title || "", {
          x: 0.4, y: 0.5, w: 12.5, h: 0.95,
          fontSize: isConclusion ? 26 : 24,
          bold: true, color: "FFFFFF", fontFace: "Segoe UI",
        });
        pSlide.addShape(pptx.ShapeType.rect, {
          x: 0.4, y: 1.5, w: 1.0, h: 0.05,
          fill: { color: cfg.accent }, line: { type: "none" },
        });
 
        if (bullets.length > 0) {
          const bulletRows = bullets.slice(0, 7).map(b => ({
            text: b,
            options: {
              bullet: { type: "bullet", characterCode: "25B8" },
              color: "C8C8E8", fontSize: 14, breakLine: true, paraSpaceAfter: 4,
            },
          }));
          pSlide.addText(bulletRows, {
            x: 0.4, y: 1.7, w: 12.5, h: 5.2,
            fontFace: "Segoe UI", lineSpacingMultiple: 1.4,
            valign: "top", wrap: true,
          });
        }
 
        // ── Custom elements (images, shapes, tables) ──────────────────────────
        const elements = allCustomElements[String(si)] || [];
 
        elements.forEach(el => {
          if (!el || !el.position) return;
          const px  = el.position;
          const imgX = Math.max(0,   (px.x / CANVAS_W_PX) * SLIDE_W_IN);
          const imgY = Math.max(0.4, (px.y / CANVAS_H_PX) * SLIDE_H_IN);
          const imgW = Math.min((px.width  / CANVAS_W_PX) * SLIDE_W_IN, SLIDE_W_IN - imgX);
          const imgH = Math.min((px.height / CANVAS_H_PX) * SLIDE_H_IN, SLIDE_H_IN - imgY - 0.4);
 
          // ── IMAGE ───────────────────────────────────────────────────────────
          if (el.type === "image" && el.src && el.src.startsWith("data:")) {
            try {
              const mimeMatch = el.src.match(/^data:(image\/[^;]+);base64,/);
              const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
              const ext  = mime === "image/png" ? "png" : mime === "image/gif" ? "gif" : "jpg";
              const raw  = el.src.replace(/^data:[^;]+;base64,/, "");
              pSlide.addImage({
                data: raw, extension: ext,
                x: imgX, y: imgY, w: imgW, h: imgH,
                sizing: { type: "contain", w: imgW, h: imgH },
              });
            } catch (e) { console.warn("PPTX image skip:", e.message); }
          }
 
          // ── SHAPE ───────────────────────────────────────────────────────────
          if (el.type === "shape") {
            const shapeMap = {
              rectangle:     pptx.ShapeType.rect,
              roundedRect:   pptx.ShapeType.roundRect,
              circle:        pptx.ShapeType.ellipse,
              triangle:      pptx.ShapeType.triangle,
              diamond:       pptx.ShapeType.diamond,
              pentagon:      pptx.ShapeType.pentagon,
              hexagon:       pptx.ShapeType.hexagon,
              star:          pptx.ShapeType.star5,
              arrowRight:    pptx.ShapeType.rightArrow,
              arrowLeft:     pptx.ShapeType.leftArrow,
              arrowDouble:   pptx.ShapeType.leftRightArrow,
              callout:       pptx.ShapeType.wedgeRectCallout,
              parallelogram: pptx.ShapeType.parallelogram,
              trapezoid:     pptx.ShapeType.trapezoid,
              cross:         pptx.ShapeType.plus,
              line:          pptx.ShapeType.line,
            };
            const shapeType = shapeMap[el.shape] || pptx.ShapeType.rect;
            try {
              pSlide.addShape(shapeType, {
                x: imgX, y: imgY, w: imgW, h: imgH,
                fill: { color: cfg.accent, transparency: 20 },
                line: { color: cfg.accent, width: 1 },
              });
            } catch (_) {
              pSlide.addShape(pptx.ShapeType.rect, {
                x: imgX, y: imgY, w: imgW, h: imgH,
                fill: { color: cfg.accent, transparency: 20 },
                line: { color: cfg.accent, width: 1 },
              });
            }
          }
 
          // ── TABLE ────────────────────────────────────────────────
          if (el.type === "table" && el.data?.length > 0) {
            try {
              const tableRows2 = el.data.map((row, ri) =>
                row.map(cell => ({
                  text: String(cell),
                  options: {
                    bold: ri === 0,
                    color: ri === 0 ? "FFFFFF" : "C8C8E8",
                    fontSize: 11,
                    fill: ri === 0
                      ? { color: cfg.accent }
                      : ri % 2 === 0
                      ? { color: "111130" }
                      : { color: "0A0A20" },
                    border: [
                      { type: "solid", color: "333366", pt: 0.5 },
                      { type: "solid", color: "333366", pt: 0.5 },
                      { type: "solid", color: "333366", pt: 0.5 },
                      { type: "solid", color: "333366", pt: 0.5 },
                    ],
                    align: "center",
                    valign: "middle",
                  },
                }))
              );
              pSlide.addTable(tableRows2, {
                x: imgX, y: imgY, w: imgW, h: imgH,
                fontFace: "Segoe UI",
                colW: Array(el.data[0].length).fill(imgW / el.data[0].length),
                rowH: Array(el.data.length).fill(imgH / el.data.length),
              });
            } catch (e) { console.warn("PPTX table skip:", e.message); }
          }
        }); // end elements.forEach  ← was MISSING before, causing tables to never export
 
        // ── Conclusion badge ─────────────────────────────────────────────────
        if (isConclusion) {
          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: 0.4, y: 5.75, w: 2.6, h: 0.52, rectRadius: 0.1,
            fill: { color: cfg.accent, transparency: 80 },
            line: { color: cfg.accent, width: 1 },
          });
          pSlide.addText("Thank You", {
            x: 0.4, y: 5.75, w: 2.6, h: 0.52,
            fontSize: 14, bold: true, color: "FFFFFF",
            align: "center", valign: "middle", fontFace: "Segoe UI",
          });
        }
      } // end else (non-title)
 
      // ── Footer bar ──────────────────────────────────────────────────────────
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 7.18, w: "100%", h: 0.32,
        fill: { color: "080818" }, line: { type: "none" },
      });
      pSlide.addText("NoteAI", {
        x: 0.3, y: 7.2, w: 2, h: 0.28,
        fontSize: 8, bold: true, color: "33334455", fontFace: "Segoe UI",
      });
 
      // ── Progress dots ────────────────────────────────────────────────────────
      const dotStartX = 13.33 - slides.length * 0.22 - 0.15;
      slides.forEach((_, di) => {
        pSlide.addShape(pptx.ShapeType.rect, {
          x: dotStartX + di * 0.22,
          y: 7.29,
          w: di === si ? 0.18 : 0.1,
          h: 0.04,
          fill: { color: di === si ? cfg.accent : "444466" },
          line: { type: "none" },
        });
      });
    }); // end slides.forEach
 
    pptx.write({ outputType: "blob" })
      .then(resolve)
      .catch(reject);
  } catch (fatalErr) {
    reject(fatalErr);
  }
}


// ── Write to Blob and resolve ────────────────────────

export async function generatePptxBlob(slides, allCustomElements = {}) {
  if (!window.PptxGenJS) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load PptxGenJS"));
      document.head.appendChild(script);
    });
  }
 
  // FIX 1: normalize all keys to integers so allCustomElements[0] always works
  const normalized = {};
  for (const [k, v] of Object.entries(allCustomElements)) {
    normalized[parseInt(k, 10)] = v || [];
  }
 
  // Pre-convert images to base64
  const resolvedElements = {};
for (const [slideIdx, elements] of Object.entries(normalized)) {
  const idx = parseInt(slideIdx, 10);
  resolvedElements[String(idx)] = await Promise.all(
      (elements || []).map(async (el) => {
        if (el.type === "image" && el.src) {
          if (el.src.startsWith("data:")) return el;
          const base64 = await fetchImageAsBase64(el.src);
          return base64 ? { ...el, src: base64 } : { ...el, src: null };
        }
        return el;
      })
    );
  }
 
  return new Promise((resolve, reject) =>
    buildPptx(slides, resolvedElements, resolve, reject)
  );
}
