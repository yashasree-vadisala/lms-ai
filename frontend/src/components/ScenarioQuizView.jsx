import { useState, useEffect } from "react";

// ─── SCENARIO / DESCRIPTIVE QUIZ VIEW ──────────────────────────────────────────
export function ScenarioQuizView({ summary, onBack }) {
  const [phase, setPhase] = useState("loading"); // loading | answering | done
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});         // { idx: string }
  const [feedbacks, setFeedbacks] = useState({});     // { idx: feedbackObj }
  const [evaluating, setEvaluating] = useState(false);
  const [showSample, setShowSample] = useState({});   // { idx: bool }
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate-scenario-questions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  
});
        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || "Failed to generate questions");
        setQuestions(data.questions || []);
        setPhase("answering");
      } catch (e) {
        // Fallback questions
        setQuestions([
          { questionNumber:1, type:"scenario", question:"You are a project manager and your team is struggling to apply these concepts. How would you guide them?", context:"Your team has just learned about the core topics in this content but is unsure how to practically implement them in an ongoing project.", sampleAnswer:"I would first assess which specific concepts are unclear, then organize a focused workshop breaking down each concept with real examples from our project context. I'd create action items tied directly to our current tasks, assign mentors for follow-up, and set checkpoints to measure understanding over the next two weeks.", evaluationCriteria:["Identifies root cause of confusion","Proposes concrete steps","Considers follow-up and accountability","Ties back to practical application"] },
          { questionNumber:2, type:"descriptive", question:"Explain the most important concept from this content and why it matters.", context:"", sampleAnswer:"The most important concept is the central theme discussed throughout the material. It matters because it directly influences outcomes in real-world contexts, provides a framework for decision-making, and builds on foundational knowledge that learners need to progress. Understanding it deeply allows practitioners to apply it flexibly across different situations.", evaluationCriteria:["Clearly identifies the concept","Explains the significance","Connects to real-world application","Demonstrates depth of understanding"] },
          { questionNumber:3, type:"scenario", question:"A stakeholder challenges the approach described in this content. How would you defend or critique it?", context:"In a meeting, a senior stakeholder argues that the methods described are outdated and should be replaced with a newer approach they read about.", sampleAnswer:"I would acknowledge the stakeholder's perspective respectfully, then present evidence from the content that supports the current approach, including its proven effectiveness, implementation maturity, and fit for our specific context. I'd also explore what the newer approach offers and propose a structured comparison or pilot to evaluate both objectively rather than dismissing either perspective.", evaluationCriteria:["Shows balanced critical thinking","Uses evidence from the content","Proposes constructive resolution","Demonstrates communication skill"] },
          { questionNumber:4, type:"descriptive", question:"Compare and contrast two key ideas presented in this content.", context:"", sampleAnswer:"Two key ideas from the content are related but distinct in their focus and application. The first idea emphasizes foundational principles and systematic thinking, while the second focuses on adaptive implementation and contextual flexibility. Together they form a complementary framework where the first provides structure and the second enables practical agility. Understanding both helps practitioners avoid being too rigid or too chaotic in their approach.", evaluationCriteria:["Identifies two distinct ideas","Explains similarities","Explains differences","Shows how they relate to each other"] },
          { questionNumber:5, type:"scenario", question:"What would happen if the key principles from this content were ignored?", context:"An organization decides to skip implementing the core recommendations from this content due to time and budget pressures.", sampleAnswer:"Ignoring the key principles would likely lead to short-term efficiency but long-term problems. Without the foundational framework, teams would make inconsistent decisions, accumulate technical or process debt, and face increasing difficulty scaling. The lack of structure would result in rework, communication breakdowns, and reduced quality. Ultimately, the organization would spend more time and money correcting avoidable mistakes than the initial investment would have cost.", evaluationCriteria:["Identifies short vs long-term consequences","Shows causal reasoning","Provides specific impacts","Demonstrates understanding of content's value"] },
          { questionNumber:6, type:"descriptive", question:"How would you apply the knowledge from this content in your own field or role?", context:"", sampleAnswer:"I would apply this knowledge by first identifying where the core concepts map to existing challenges in my role. I would create a prioritized list of improvements grounded in the content's frameworks, then pilot changes in a low-risk area before broader rollout. I would document outcomes, gather feedback from stakeholders, and iterate. This approach ensures the knowledge is translated into measurable impact rather than remaining theoretical.", evaluationCriteria:["Personalizes to specific role","Shows structured implementation thinking","Mentions feedback and iteration","Connects knowledge to measurable outcomes"] },
        ]);
        setPhase("answering");
      }
    };
    fetchQuestions();
  }, [summary]);

  const currentQ = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(feedbacks).length;

  const handleSubmitAnswer = async () => {
    const answer = (answers[currentIdx] || "").trim();
    if (!answer) return;
    setEvaluating(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/evaluate-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQ.question,
          context: currentQ.context || "",
          sampleAnswer: currentQ.sampleAnswer,
          evaluationCriteria: currentQ.evaluationCriteria,
          userAnswer: answer,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Evaluation failed");
      setFeedbacks(prev => ({ ...prev, [currentIdx]: data.feedback }));
    } catch {
      // Fallback evaluation
      const wordCount = answer.split(/\s+/).filter(Boolean).length;
      const score = Math.min(10, Math.max(1, Math.round(wordCount / 10)));
      const grade = score >= 8 ? "Excellent" : score >= 6 ? "Good" : score >= 4 ? "Satisfactory" : "Needs Improvement";
      setFeedbacks(prev => ({ ...prev, [currentIdx]: {
        score, grade,
        strengths: ["Shows attempt to engage with the question", "Provides some relevant information"],
        improvements: ["Add more specific details and examples", "Connect your answer more directly to the key concepts"],
        detailedFeedback: "Your answer demonstrates basic understanding of the topic. To improve, try to be more specific and provide concrete examples that illustrate the concepts. Make sure to address all parts of the question and connect your response to the core ideas from the content."
      }}));
    }
    setEvaluating(false);
  };

  const handleNext = () => {
    if (currentIdx + 1 < totalQ) {
      setCurrentIdx(i => i + 1);
    } else {
      setPhase("done");
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const getScoreClass = (score) => {
    if (score >= 8) return "excellent";
    if (score >= 6) return "good";
    if (score >= 4) return "satisfactory";
    return "needs";
  };

  const avgScore = answeredCount > 0
    ? Math.round(Object.values(feedbacks).reduce((s, f) => s + f.score, 0) / answeredCount * 10) / 10
    : 0;

  if (phase === "loading") return (
    <div className="scenario-page">
      <div className="loading-overlay" style={{ marginTop:40 }}>
        <div className="spinner" style={{ borderTopColor:"#f59e0b" }} />
        <div className="loading-title">Generating deep questions…</div>
        <div className="loading-sub">AI is crafting scenario & descriptive challenges from your notes</div>
      </div>
    </div>
  );

  if (phase === "done") {
    const excellent = Object.values(feedbacks).filter(f => f.score >= 8).length;
    const good = Object.values(feedbacks).filter(f => f.score >= 6 && f.score < 8).length;
    const needsWork = Object.values(feedbacks).filter(f => f.score < 6).length;
    return (
      <div className="scenario-page">
        <div className="sq-summary-card">
          <span style={{ fontSize:"3rem", display:"block", marginBottom:12 }}>
            {avgScore >= 8 ? "🏆" : avgScore >= 6 ? "📖" : "💪"}
          </span>
          <div style={{ fontFamily:"var(--ff2)", fontSize:22, fontWeight:800, color:"var(--text)", marginBottom:6 }}>
            Deep Questions Complete!
          </div>
          <div style={{ fontSize:13, color:"var(--text-body)", opacity:0.85, marginBottom:4 }}>
            {avgScore >= 8 ? "Outstanding critical thinking! You demonstrated excellent depth of understanding." : avgScore >= 6 ? "Good effort! Your analytical skills are developing well." : "Keep practicing — review your notes and work on building deeper explanations."}
          </div>
          <div className="sq-summary-grid">
            <div className="sq-summary-stat">
              <div className="sq-summary-val">{answeredCount}/{totalQ}</div>
              <div className="sq-summary-label">Answered</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#10b981" }}>{avgScore}/10</div>
              <div className="sq-summary-label">Avg Score</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#10b981" }}>{excellent}</div>
              <div className="sq-summary-label">Excellent</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#f59e0b" }}>{good}</div>
              <div className="sq-summary-label">Good</div>
            </div>
            <div className="sq-summary-stat">
              <div className="sq-summary-val" style={{ color:"#f87171" }}>{needsWork}</div>
              <div className="sq-summary-label">Needs Work</div>
            </div>
          </div>
          <div className="score-actions">
            <button className="sa-btn primary" onClick={() => { setCurrentIdx(0); setAnswers({}); setFeedbacks({}); setShowSample({}); setPhase("loading"); }}>
              🔄 Try Again
            </button>
            <button className="sa-btn secondary" onClick={onBack}>← Back to Notes</button>
          </div>
        </div>
      </div>
    );
  }

  const fb = feedbacks[currentIdx];
  const progressPct = Math.round(((currentIdx + (fb ? 1 : 0)) / totalQ) * 100);

  return (
    <div className="scenario-page">
      <div className="scenario-header">
        <h1 className="scenario-title-h">🧠 Deep Questions</h1>
        <button className="back-btn" onClick={onBack}>← Back to Notes</button>
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--text-body)", opacity:.8, marginBottom:6 }}>
        <span>Question {currentIdx + 1} of {totalQ}</span>
        <span>{answeredCount} answered · {progressPct}% complete</span>
      </div>
      <div className="sq-progress-bar"><div className="sq-progress-fill" style={{ width:`${progressPct}%` }} /></div>

      {currentQ && (
        <div className="sq-card">
          {/* Type badge */}
          <div className={`sq-type-badge ${currentQ.type}`}>
            {currentQ.type === "scenario" ? "🎭 Scenario" : "📝 Descriptive"}
          </div>

          {/* Scenario context box */}
          {currentQ.type === "scenario" && currentQ.context && (
            <div className="sq-context-box">
              <div className="sq-context-label">📌 Scenario Setup</div>
              {currentQ.context}
            </div>
          )}

          {/* Question */}
          <div className="sq-question-text">{currentQ.question}</div>

          {/* Evaluation criteria hint */}
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", color:"var(--text-muted)", marginBottom:6 }}>
              Your answer should cover:
            </div>
            <div className="sq-criteria-list">
              {currentQ.evaluationCriteria.map((c, i) => (
                <div key={i} className="sq-criteria-item">
                  <div className="sq-criteria-dot" />
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Answer textarea (only if not yet evaluated) */}
          {!fb && (
            <>
              <div className="sq-answer-label">Your Answer</div>
              <textarea
                className="sq-textarea"
                placeholder="Write your detailed answer here… (aim for at least 3-4 sentences)"
                value={answers[currentIdx] || ""}
                onChange={e => setAnswers(prev => ({ ...prev, [currentIdx]: e.target.value }))}
                disabled={evaluating}
              />
              <div className="sq-submit-row">
                <button className="sq-skip-btn" onClick={handleSkip} disabled={evaluating}>
                  Skip →
                </button>
                <button
                  className="sq-submit-btn"
                  onClick={handleSubmitAnswer}
                  disabled={evaluating || !(answers[currentIdx] || "").trim()}
                >
                  {evaluating ? "⏳ Evaluating…" : "Submit for Feedback →"}
                </button>
              </div>
            </>
          )}

          {/* Show answer text as read-only after submission */}
          {fb && answers[currentIdx] && (
            <div style={{ marginBottom:14 }}>
              <div className="sq-answer-label">Your Answer</div>
              <div style={{ background:"var(--input-bg)", border:"1px solid var(--input-border)", borderRadius:12, padding:"14px", fontSize:14, color:"var(--text-body)", lineHeight:1.65, whiteSpace:"pre-wrap" }}>
                {answers[currentIdx]}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feedback card */}
      {fb && (
        <div className="sq-feedback-card">
          <div className="sq-feedback-header">
            <div className="sq-score-display">
              <div className={`sq-score-circle ${getScoreClass(fb.score)}`}>{fb.score}/10</div>
              <div>
                <div className="sq-grade-text">{fb.grade}</div>
                <div className="sq-grade-sub">AI Evaluation</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["Excellent","Good","Satisfactory","Needs Improvement","Incomplete"].indexOf(fb.grade) >= 0 && (
                <span style={{
                  padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700,
                  background: fb.score >= 8 ? "rgba(16,185,129,0.15)" : fb.score >= 6 ? "rgba(99,102,241,0.15)" : fb.score >= 4 ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                  border: fb.score >= 8 ? "1px solid rgba(16,185,129,0.4)" : fb.score >= 6 ? "1px solid rgba(99,102,241,0.4)" : fb.score >= 4 ? "1px solid rgba(245,158,11,0.4)" : "1px solid rgba(239,68,68,0.4)",
                  color: fb.score >= 8 ? "#10b981" : fb.score >= 6 ? "#a5b4fc" : fb.score >= 4 ? "#fcd34d" : "#f87171",
                }}>{fb.grade}</span>
              )}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="sq-feedback-grid">
            <div className="sq-fb-section strengths">
              <div className="sq-fb-section-title">✅ Strengths</div>
              {fb.strengths.map((s, i) => (
                <div key={i} className="sq-fb-item">
                  <span className="sq-fb-bullet">✓</span>{s}
                </div>
              ))}
            </div>
            <div className="sq-fb-section improvements">
              <div className="sq-fb-section-title">🔧 To Improve</div>
              {fb.improvements.map((s, i) => (
                <div key={i} className="sq-fb-item">
                  <span className="sq-fb-bullet">→</span>{s}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed feedback paragraph */}
          <div className="sq-detailed-feedback">{fb.detailedFeedback}</div>

          {/* Sample answer toggle */}
          <button
            className="sq-sample-toggle"
            onClick={() => setShowSample(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }))}
          >
            {showSample[currentIdx] ? "▲ Hide" : "▼ Show"} model answer
          </button>
          {showSample[currentIdx] && currentQ && (
            <div className="sq-sample-answer">
              <div className="sq-sample-label">📖 Model Answer</div>
              {currentQ.sampleAnswer}
            </div>
          )}

          {/* Next button */}
          <button className="sq-next-btn" onClick={handleNext}>
            {currentIdx + 1 < totalQ ? `Next Question (${currentIdx + 2}/${totalQ}) →` : "View Results →"}
          </button>
        </div>
      )}
    </div>
  );
}
