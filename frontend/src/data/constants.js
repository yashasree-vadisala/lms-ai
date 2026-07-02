export const TAGS = ["YouTube","Instagram","TikTok","Facebook","Twitter","Wikipedia","News","Blogs"];

export const PLATFORMS = [
  { icon: "🔴", label: "YouTube" }, { icon: "📸", label: "Instagram" },
  { icon: "🎵", label: "TikTok" },  { icon: "📘", label: "Facebook" },
  { icon: "🐦", label: "Twitter" }, { icon: "🌐", label: "Any URL" },
];

export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "hi", label: "हिंदी (Hindi)", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు (Telugu)", flag: "🇮🇳" },
  { code: "ta", label: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
  { code: "ml", label: "മലയാളം (Malayalam)", flag: "🇮🇳" },
  { code: "mr", label: "मराठी (Marathi)", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা (Bengali)", flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી (Gujarati)", flag: "🇮🇳" },
  { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)", flag: "🇮🇳" },
  { code: "ur", label: "اردو (Urdu)", flag: "🇵🇰" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "zh", label: "中文 (Chinese)", flag: "🇨🇳" },
  { code: "ja", label: "日本語 (Japanese)", flag: "🇯🇵" },
  { code: "ko", label: "한국어 (Korean)", flag: "🇰🇷" },
  { code: "ar", label: "العربية (Arabic)", flag: "🇸🇦" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "th", label: "ภาษาไทย (Thai)", flag: "🇹🇭" },
];

export const avatarColors = ["#6366f1","#8b5cf6","#ec4899","#14b8a6","#f59e0b","#10b981"];

export const acColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

export const typeConfig = {
  title:      { bar:"linear-gradient(90deg,#6366f1,#818cf8)", tag:"rgba(99,102,241,0.25)",  tagColor:"#a5b4fc", tagText:"Title Slide",   dot:"#6366f1", divider:"#6366f1" },
  overview:   { bar:"linear-gradient(90deg,#8b5cf6,#a78bfa)", tag:"rgba(139,92,246,0.25)", tagColor:"#c4b5fd", tagText:"Overview",      dot:"#8b5cf6", divider:"#8b5cf6" },
  content:    { bar:"linear-gradient(90deg,#14b8a6,#2dd4bf)", tag:"rgba(20,184,166,0.2)",   tagColor:"#5eead4", tagText:"Content",       dot:"#14b8a6", divider:"#14b8a6" },
  highlight:  { bar:"linear-gradient(90deg,#f59e0b,#fbbf24)", tag:"rgba(245,158,11,0.2)",   tagColor:"#fcd34d", tagText:"Key Highlight", dot:"#f59e0b", divider:"#f59e0b" },
  conclusion: { bar:"linear-gradient(90deg,#ec4899,#f9a8d4)", tag:"rgba(236,72,153,0.2)",   tagColor:"#f9a8d4", tagText:"Conclusion",    dot:"#ec4899", divider:"#ec4899" },
};
