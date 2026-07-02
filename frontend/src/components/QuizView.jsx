import { useState, useEffect } from "react";

// ─── QUIZ VIEW ──────────────────────────────────────────────────────────────────
export function QuizView({ summary, onBack, onFinish }) {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!summary) return;
    const fetchQuiz = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/generate-quiz", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ summary_text:summary }) });
        if (!res.ok) throw new Error("Quiz failed");
        const data = await res.json();
        if (data?.questions) {
          setQuestions(data.questions.map(q => ({
            question:q.question,
            options:q.answerOptions.map(a=>a.text),
            correct:q.answerOptions.findIndex(a=>a.isCorrect),
            explanation:q.answerOptions.find(a=>a.isCorrect)?.rationale || q.hint
          })));
        } else throw new Error("Unexpected structure");
      } catch {
        setQuestions([
          {question:"What is the primary purpose of AI summarization tools?",options:["Entertainment only","Distilling complex content into digestible insights","Replacing all human reading","Creating videos"],correct:1,explanation:"AI summarization tools extract key insights and present complex content in a concise, readable format."},
          {question:"Which format does NoteAI use to structure summaries?",options:["HTML tables","Plain text","Markdown with headers and bullets","CSV files"],correct:2,explanation:"NoteAI uses Markdown formatting with headers and bullet points for clean, scannable summaries."}
        ]);
      } finally { setLoading(false); }
      
    };
    fetchQuiz();
  }, [summary]);

  if (loading) return <div className="quiz-page"><div className="loading-overlay"><div className="spinner" /><div className="loading-title">Building quiz…</div></div></div>;
  if (!questions || questions.length===0) return <div className="quiz-page"><div className="error-box">Failed to load quiz.</div><button className="back-btn" onClick={onBack}>← Back</button></div>;

  if (done) {
    const pct = Math.round(score/questions.length*100);
    return (
      <div className="quiz-page">
        <div className="score-card">
          <span className="score-emoji">{pct>=75?"🏆":pct>=50?"📖":"💪"}</span>
          <div className="score-title">Quiz Complete!</div>
          <div style={{ fontSize:13, color:"var(--text-body)", marginBottom:20 }}>{pct>=75?"Excellent retention! You really understood the material.":pct>=50?"Good effort! Review your notes to improve further.":"Keep practicing — review your notes and try again!"}</div>
          <div style={{ fontFamily:"var(--ff2)", fontSize:"2rem", fontWeight:800, color:"#a5b4fc", marginBottom:20 }}>
            {score}/{questions.length}<span style={{ fontSize:"1rem", color:"var(--text-muted)", marginLeft:6 }}>({pct}%)</span>
          </div>
          <div className="score-actions">
            <button className="sa-btn primary" onClick={() => { setIdx(0); setSelected(null); setShowExp(false); setScore(0); setDone(false); }}>↺ Restart</button>
            <button className="sa-btn secondary" onClick={onBack}>← Back to Notes</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  const pct = Math.round((idx+1)/questions.length*100);
  return (
    <div className="quiz-page">
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <div style={{ fontFamily:"var(--ff2)", fontSize:18, fontWeight:800, color:"var(--text)" }}>Knowledge Quiz</div>
        <div style={{ padding:"4px 10px", borderRadius:20, background:"rgba(99,102,241,.15)", fontSize:11, fontWeight:600, color:"#a5b4fc" }}>{score}/{questions.length}</div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--text-body)", opacity:.8, marginBottom:6 }}>
        <span>Question {idx+1} of {questions.length}</span><span>{pct}%</span>
      </div>
      <div className="qprogress-bar"><div className="qprogress-fill" style={{ width:`${pct}%` }} /></div>
      <div className="question-card">
        <div className="q-text">{q.question}</div>
        <div className="options-list">
          {q.options.map((opt,i) => {
            let cls="opt-btn", letCls="opt-letter", icon=String.fromCharCode(65+i);
            if (showExp && i===q.correct) { cls+=" correct"; letCls+=" correct"; icon="✓"; }
            else if (showExp && selected===i) { cls+=" wrong"; letCls+=" wrong"; icon="✗"; }
            return (
              <button key={i} className={cls} disabled={showExp} onClick={() => {
                if (showExp) return;
                setSelected(i); setShowExp(true);
                if (i===q.correct) setScore(s=>s+1);
              }}>
                <span className={letCls}>{icon}</span>{opt}
              </button>
            );
          })}
        </div>
        {showExp && (
          <div className="explanation-box">
            <p><strong>Explanation:</strong> {q.explanation}</p>
            <button className="next-btn" onClick={() => {
              setSelected(null); setShowExp(false);
              if (idx+1 < questions.length) {
                setIdx(idx+1);
              } else {
                setDone(true);
                onFinish && onFinish(score, questions.length);
              }
            }}>
              {idx+1 < questions.length ? "Next →" : "Finish"}
            </button>
            <div style={{ clear:"both" }} />
          </div>
        )}
      </div>
    </div>
  );
}
