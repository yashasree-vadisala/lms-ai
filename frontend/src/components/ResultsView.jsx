import { useState } from "react";
import { generatePdfBlob } from "../utils/pdfBuilder";
import { renderMd } from "../utils/textUtils";
import { PptModal } from "./PptModal";

// ─── RESULTS VIEW ───────────────────────────────────────────────────────────────
export function ResultsView({ summary, source, onBack, onQuiz, onScenario, onChat, onPptReady, language })  {
  const [copied, setCopied] = useState(false);
  const [showPptModal, setShowPptModal] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const downloadTxt = () => {
    const b = new Blob([summary], { type:"text/plain" });
    const a = document.createElement("a"); a.href=URL.createObjectURL(b); a.download="notes.txt"; a.click();
  };

  const downloadPdf = async () => {
  setPdfLoading(true);
  try {
    const blob = await generatePdfBlob(summary, source);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "noteai-notes.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  } catch (e) {
    alert("PDF generation failed: " + e.message);
  }
  setPdfLoading(false);
};

  if (!summary) return (
    <div className="results-page" style={{ textAlign:"center", paddingTop:60 }}>
      <div style={{ fontSize:"2rem" }}>📋</div>
      <p style={{ marginTop:8, fontSize:13 }}>Analyze a content source first.</p>
      <button className="back-btn" style={{ margin:"12px auto 0" }} onClick={onBack}>← Go back</button>
    </div>
  );

  return (
    <div className="results-page">
      <div className="results-header">
        <h1 className="results-title">📋 Smart Notes</h1>
        <button className="back-btn" onClick={onBack}>← Analyze Another</button>
      </div>
      {source && <div className="source-chip">🔗 <span className="source-chip-text">{source}</span></div>}
      <div className="action-row">
        <button className={`act-btn ${copied?"copied":""}`} onClick={() => { navigator.clipboard.writeText(summary); setCopied(true); setTimeout(()=>setCopied(false),2000); }}>
          {copied ? "✓ Copied!" : "⎘ Copy"}
        </button>
        <button className="act-btn" onClick={downloadTxt}>↓ .txt</button>
        <button className="act-btn pdf-btn" onClick={downloadPdf} disabled={pdfLoading}>
          {pdfLoading ? "⏳ Generating…" : "📄 Download PDF"}
        </button>
        <button className="act-btn ppt-btn" onClick={() => setShowPptModal(true)}>🎯 Create Presentation</button>
        <button className="act-btn chat-btn" onClick={onChat}>💬 Ask AI About This</button>
      </div>
      <div className="summary-card">
        <div className="md" dangerouslySetInnerHTML={{ __html: renderMd(summary) }} />
      </div>

      {/* Multiple choice quiz CTA */}
      <div className="quiz-cta">
        <div>
          <div className="qcta-title">🎯 Multiple Choice Quiz</div>
          <div className="qcta-sub">Test your understanding with 5 AI-generated questions.</div>
        </div>
        <button className="quiz-cta-btn" onClick={onQuiz}>Start Quiz →</button>
      </div>

      {/* Scenario & Descriptive Questions CTA */}
      <div className="scenario-cta">
        <div>
          <div className="qcta-title">🧠 Scenario &amp; Descriptive Questions</div>
          <div className="qcta-sub">6 in-depth questions — real-world scenarios + analytical answers, evaluated by AI.</div>
        </div>
        <button className="scenario-cta-btn" onClick={onScenario}>Try Deep Questions →</button>
      </div>

      {showPptModal && <PptModal summary={summary} language={language} onClose={() => setShowPptModal(false)} onReady={(slides) => { setShowPptModal(false); onPptReady(slides); }} />}
    </div>
  );
}
