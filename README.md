# ⚡ DevDash — Modern Developer Command Center (Next.js & React)

> **Architected, Designed & Built with Precision by [Sagar Murkute](https://github.com/sagarmurkute)**.

A futuristic, high-performance developer dashboard and engineering capability matrix built with **Next.js 14/15 (App Router), React 18/19, TypeScript, and Swiss & Glassmorphic CSS Design Tokens**.

---

## 📰 DevDash Dispatch: The 100-Feature Roadmap
Explore the official **[100 Engineering Capabilities Roadmap (`/roadmap`)](/roadmap)** covering AI Copilots, DevOps automation, AST diagnostics, cloud monitoring, and security scanners.

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

All data is structured cleanly in the browser's `localStorage` via `@/lib/storage`:
- `devdash_coding_hours`
- `devdash_projects`
- `devdash_habits`
- `devdash_notes`
- `devdash_kanban_tasks`
- `devdash_scratchpad_note`

Use the **Export Backup** button in the Weekly Analytics widget to download a portable JSON backup anytime.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see DevDash in action!

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📝 License
MIT &bull; Sagar Murkute
