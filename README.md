# ⚡ DevDash — Modern Developer Command Center

A futuristic, high-performance developer dashboard built with **Vanilla HTML5, CSS3, and Modern JavaScript (ES6+)**. Designed for engineering productivity, daily habit tracking, coding volume analytics, and streak preservation with zero external build tool dependencies.

---

## ✨ Features Breakdown

- **🔥 GitHub Streak Matrix (Manual + Live API)**: 52-week contribution heatmap, streak counters, real-time public GitHub API sync (`api.github.com`), and manual commit logger with custom messages.
- **⏳ Daily Coding Hours Tracker**: Track daily coding goals (e.g. 6.0h/day), multi-language volume distribution (JS, TS, Python, CSS), and quick `+30m`/`+1h` logging.
- **🚀 Projects in Progress Tracker**: Manage active repositories and projects with sprint progress sliders, status pills, and direct repository links.
- **🎯 Developer Habit Matrix**: 7-day interactive checklist (Mon–Sun) tracking core dev routines (LeetCode, Git Streak, PR Reviews, Deep Focus) with streak counts.
- **💡 Notes & Ideas Vault**: Categorized idea cards (Architecture, UI/UX, Bug Fixes, Snippets) with instant live search and 1-click clipboard copying.
- **⏱️ Pomodoro Focus Station**: Circular SVG countdown timer with synthesized Web Audio chimes, automatically logging focus intervals to your Daily Coding Hours.
- **📊 Weekly Engineering Analytics**: Interactive Mon–Sun coding volume bar chart, consistency score, sprint velocity, and JSON backup export/import.
- **📋 Sprint Kanban Board**: Backlog, In-Progress, and Done board with priorities, tags, and persistent storage.
- **🛠️ Developer Utility Toolbox**: Offline JSON Prettifier / Minifier / Validator, Base64/URL converter, and snippet vault.
- **🌐 Live Multi-Timezone Header & Command Palette (`Ctrl+K`)**: Clocks for Local, UTC, San Francisco, London, and Tokyo plus full keyboard shortcuts.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + K` / `Cmd + K` | Open Command Palette |
| `Esc` | Close any active modal or palette |
| `↑` / `↓` | Navigate Command Palette results |
| `Enter` | Execute selected command |

---

## 💾 Local Storage Architecture

All data is structured cleanly in the browser's `localStorage` via `DevDashStorage`:
- `devdash_coding_hours`
- `devdash_projects`
- `devdash_habits`
- `devdash_notes`
- `devdash_kanban_tasks`
- `devdash_scratchpad_note`

Use the **Export Backup** button in the Weekly Analytics widget to download a portable JSON backup anytime (ready for future database API migrations!).

---

## 🚀 Getting Started

Simply open `index.html` in your browser or run:

```bash
# Using Python
python -m http.server 3000

# Using Node / npx
npx serve .
```

---

## 📝 License
MIT
