export function renderMd(text) {
  if (!text) return "";
  return text
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^[\-\*•] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, m => `<ul>${m}</ul>`)
    .replace(/<\/ul>\s*<ul>/g, "")
    .replace(/\n\n+/g, "</p><p>");
}

export function extractTopic(summary) {
  if (!summary) return "General";
  const h1 = summary.match(/^# (.+)$/m);
  if (h1) return h1[1].replace(/\*\*/g,"").trim().slice(0,50);
  const h2 = summary.match(/^## (.+)$/m);
  if (h2) return h2[1].replace(/\*\*/g,"").trim().slice(0,50);
  const bold = summary.match(/\*\*(.+?)\*\*/);
  if (bold) return bold[1].trim().slice(0,50);
  const firstLine = summary.split("\n").find(l => l.trim().length > 5);
  if (!firstLine) return "General";
  return firstLine
    .replace(/[#*]/g, "")
    .replace(/^(this video|this content|in this video|in this tutorial|this tutorial|the video|the content)\s+(is\s+)?(about|explains?|covers?|discusses?|shows?|teaches?|tutorials? on|on how to|on)\s+/i, "")
    .trim()
    .slice(0, 50) || "General";
}

export const SEARCH_ALIASES = {
  phyton:"python", phytoon:"python", pithon:"python",
  javascrip:"javascript", javscript:"javascript",
  recat:"react", ract:"react",
  databse:"database", databasse:"database",
  machien:"machine", learnin:"learning",
  nueral:"neural", nural:"neural",
  artifical:"artificial", inteligence:"intelligence",
  algoritm:"algorithm", algrithm:"algorithm",
  programing:"programming", programmin:"programming",
  netwrok:"network", secutiry:"security",
  analyisis:"analysis", analisys:"analysis",
  visulization:"visualization",
  sofware:"software", enginneering:"engineering",
  computor:"computer", compter:"computer",
  photosinthesis:"photosynthesis", volcono:"volcano",
  einstien:"einstein", celluar:"cellular",
};

export function correctSearchQuery(raw) {
  return raw.trim().toLowerCase()
    .split(/\s+/)
    .map(w => SEARCH_ALIASES[w] || w)
    .join(" ");
}
