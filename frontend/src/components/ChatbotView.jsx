import { useState, useEffect, useRef } from "react";

// ─── CHATBOT VIEW ───────────────────────────────────────────────────────────────
export function ChatbotView({ summary, onBack, onMessage }) {
  const [messages, setMessages] = useState([
    {
      role:"ai",
      text:"Hi! I've studied your notes carefully. Ask me anything — detailed explanations, real-world examples, comparisons between concepts, 'what if' scenarios, or why something matters. I'll answer descriptively, like a tutor — not just bullet points!"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const quickPrompts = [
    "Explain the main concept in depth",
    "Give me a real-world example",
    "Why is this topic important?",
    "Compare the key concepts here",
    "What would happen if this didn't exist?",
    "Explain this like I'm a beginner",
    "What are the practical applications?",
    "What are common misconceptions about this?",
  ];

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "42px";

    const newMessages = [...messages, { role:"user", text:msg }];
    setMessages(newMessages);
    setLoading(true);

    onMessage && onMessage();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: summary,
          messages: newMessages.map(m => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text
          }))
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Server error");
      const reply = data.reply || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role:"ai", text:reply }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        role:"ai",
        text:`⚠️ Could not reach the backend. Make sure your FastAPI server is running at http://127.0.0.1:8000\n\nError: ${err.message}`
      }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = "42px";
    e.target.style.height = Math.min(e.target.scrollHeight,100)+"px";
  };

  if (!summary) return (
    <div className="chatbot-page" style={{ textAlign:"center", paddingTop:60 }}>
      <div style={{ fontSize:"2rem" }}>💬</div>
      <p style={{ marginTop:8, fontSize:13 }}>Please analyze some content first before chatting.</p>
      <button className="back-btn" style={{ margin:"12px auto 0" }} onClick={onBack}>← Go back</button>
    </div>
  );

  return (
    <div className="chatbot-page">
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
        <button className="back-btn" onClick={onBack}>← Back to Notes</button>
        <h1 style={{ fontFamily:"var(--ff2)", fontSize:22, fontWeight:800, color:"var(--text)" }}>💬 Ask About Your Notes</h1>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:600, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:".04em", marginBottom:8 }}>Quick questions</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {quickPrompts.map(p => (
            <button key={p} onClick={() => sendMessage(p)} className="quick-prompt-chip">{p}</button>
          ))}
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header-bar">
          <div className="chat-avatar">✦</div>
          <div className="chat-header-info">
            <div className="chat-name">NoteAI Tutor</div>
            <div className="chat-status">● Ready to help</div>
          </div>
          <div style={{ marginLeft:"auto", fontSize:11, color:"var(--text-muted)", padding:"4px 10px", borderRadius:20, background:"var(--card-bg)", border:"1px solid var(--border)" }}>
            {messages.length-1} message{messages.length!==2?"s":""}
          </div>
        </div>
        <div className="chat-messages-area">
          {messages.map((m,i) => (
            <div key={i} className={`chat-msg-wrap ${m.role}`}>
              <div className="chat-msg-label">{m.role==="ai" ? "NoteAI Tutor" : "You"}</div>
              <div className={`chat-bubble ${m.role}`} style={{ whiteSpace:"pre-wrap" }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg-wrap ai">
              <div className="chat-msg-label">NoteAI Tutor</div>
              <div className="chat-typing">
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-row">
          <textarea ref={textareaRef} className="chat-textarea" value={input} onChange={handleTextareaChange} onKeyDown={handleKeyDown}
            placeholder="Ask anything about your notes… (Enter to send, Shift+Enter for new line)" rows={1} />
          <button className="chat-send-btn" onClick={() => sendMessage()} disabled={loading||!input.trim()} title="Send">→</button>
        </div>
      </div>
      <div className="chat-context-note">
        💡 Chat powered by Gemini AI via your local backend. Conversation history is sent each turn for multi-turn context.
      </div>
    </div>
  );
}
