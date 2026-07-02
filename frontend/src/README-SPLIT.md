# App.jsx split into files

Your 5094-line `App.jsx` has been split into 26 files with **zero logic changes** —
every line of actual code is byte-for-byte the same, just moved and wired up
with imports/exports.

## How to install this

1. In your `frontend/src/` folder, **back up or delete your current `App.jsx`
   and `PptEditorPage.jsx`** (they're being replaced).
2. Copy everything from this folder into `frontend/src/`, keeping the
   subfolders (`components/`, `data/`, `styles/`, `utils/`).
3. Your `main.jsx` should already do `import App from "./App.jsx"` — no
   change needed there, since `App.jsx` still has `export default function App()`.
4. Run your dev server as usual (`npm run dev`). Nothing else changes —
   same routes/views, same `localStorage` keys, same behavior.

## New structure

```
src/
├── App.jsx                     — main App component (was line 1691-1916)
├── PptEditorPage.jsx           — kept at root, same as your existing layout
├── components/
│   ├── AuthPage.jsx
│   ├── HomeView.jsx
│   ├── ResultsView.jsx
│   ├── PptModal.jsx
│   ├── SlidePreview.jsx
│   ├── ResizableSlidePreview.jsx
│   ├── ScenarioQuizView.jsx
│   ├── DailyImprovementGraph.jsx
│   ├── ActivityHeatmap.jsx
│   ├── PerformancePage.jsx
│   ├── ChatbotView.jsx
│   ├── HistoryPage.jsx
│   ├── AdminContentTrends.jsx
│   ├── AdminPage.jsx
│   ├── AdminUserHistory.jsx
│   ├── QuizView.jsx
│   └── InsertModal.jsx
├── data/
│   ├── db.js                   — the localStorage DB wrapper
│   └── constants.js            — TAGS, PLATFORMS, LANGUAGES, avatarColors, typeConfig
├── styles/
│   └── theme.js                — FONTS, CSS, EXTRA_CSS strings (injected via <style>)
└── utils/
    ├── textUtils.js            — renderMd, extractTopic, correctSearchQuery, SEARCH_ALIASES
    ├── fileUtils.js            — downloadBlob
    ├── pptxBuilder.js          — buildPptx, generatePptxBlob, fetchImageAsBase64
    └── pdfBuilder.js           — buildPdf, generatePdfBlob, drawPolygonPdf
```

## How this was done (for your confidence)

This wasn't a manual copy-paste — it was done with a script that:
1. Parsed your original file into an AST (abstract syntax tree) so every
   function/component boundary was found precisely (no line was
   guessed or retyped).
2. Analyzed which top-level names each piece of code actually references
   (e.g. `HomeView` uses `TAGS`, `PLATFORMS`, `LANGUAGES`) to auto-generate
   the correct `import`/`export` statements.
3. Printed each piece back out preserving your original formatting exactly.
4. Bundled the whole thing back together with esbuild to confirm every
   import resolves and nothing is missing or duplicated — this succeeded
   with no errors.

Your existing `App.css`, `index.css`, and `main.jsx` were not touched.
