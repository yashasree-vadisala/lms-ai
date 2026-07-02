// ─── LOCAL STORAGE DB ──────────────────────────────────────────────────────────────
export const DB = {
  getUsers:       () => JSON.parse(localStorage.getItem("noteai_users") || "[]"),
  saveUsers:      (u) => localStorage.setItem("noteai_users", JSON.stringify(u)),
  getHistory:     (uid) => JSON.parse(localStorage.getItem(`noteai_hist_${uid}`) || "[]"),
  saveHistory:    (uid, h) => localStorage.setItem(`noteai_hist_${uid}`, JSON.stringify(h)),
  getSession:     () => JSON.parse(localStorage.getItem("noteai_session") || "null"),
  saveSession:    (s) => localStorage.setItem("noteai_session", JSON.stringify(s)),
  clearSession:   () => localStorage.removeItem("noteai_session"),
  getActivity:    (uid) => JSON.parse(localStorage.getItem(`noteai_activity_${uid}`) || "{}"),
  saveActivity:   (uid, a) => localStorage.setItem(`noteai_activity_${uid}`, JSON.stringify(a)),
  getTopics:      (uid) => JSON.parse(localStorage.getItem(`noteai_topics_${uid}`) || "{}"),
  saveTopics:     (uid, t) => localStorage.setItem(`noteai_topics_${uid}`, JSON.stringify(t)),
  getQuizScores:  (uid) => JSON.parse(localStorage.getItem(`noteai_quizscores_${uid}`) || "[]"),
  saveQuizScores: (uid, s) => localStorage.setItem(`noteai_quizscores_${uid}`, JSON.stringify(s)),
  getChatCount:   (uid) => parseInt(localStorage.getItem(`noteai_chatcount_${uid}`) || "0"),
  saveChatCount:  (uid, n) => localStorage.setItem(`noteai_chatcount_${uid}`, String(n)),
  getDailyChats:  (uid) => JSON.parse(localStorage.getItem(`noteai_dailychats_${uid}`) || "{}"),
  saveDailyChats: (uid, d) => localStorage.setItem(`noteai_dailychats_${uid}`, JSON.stringify(d)),
};

if (!DB.getUsers().length) {
  DB.saveUsers([{
    id: "admin-001", username: "Admin", email: "admin@noteai.com",
    password: "admin123", role: "admin",
    joined: new Date().toISOString(), analysisCount: 0
  }]);
}
