# ⚡ DevStreak — Modern Developer Command Center

<div align="center">

![DevStreak Banner](https://img.shields.io/badge/DevStreak-v2.2.0-blue?style=for-the-badge&logo=next.js&logoColor=white)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>A state-of-the-art developer dashboard, habit tracking matrix, and engineering capability platform crafted with pixel precision for high-output software engineers.</b>
</p>

[Explore Features](#-features) • [Quickstart](#-quickstart) • [Architecture](#-clean-architecture) • [Keyboard Shortcuts](#-keyboard-shortcuts) • [Roadmap](#-100-engineering-roadmap)

</div>

---

## 📸 Overview & Dashboard Layout

DevStreak unifies your entire development workflow into a high-performance, single-pane command center:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ ⚡ DevStreak    Good morning, Sagar 👋          [ 🔍 Search anything...  ⌘K ]  🔔  [SK Sagar ⌄]│
├──────────────┬──────────────────────────────────────────────────────────────────────────────┤
│ 🏠 Dashboard │ [🔥 Streak: 32d]  [⏱️ Hours: 4.6h]  [☑️ Tasks: 12]  [📁 Projects: 8]  [📈 Score: 86]│
│ 📁 Projects  ├───────────────────────────────┬────────────────────────┬─────────────────────┤
│ ☑️ Tasks     │ GitHub Contribution (90 Days) │ Focus Session (25:00)  │ Today's Agenda      │
│ 🎯 Habits    │  ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■    │      ╭───────╮         │  [✓] Code DevStreak │
│ ⏱️ Focus     │  Feb    Mar    Apr    May     │      │ 25:00 │         │  [ ] DSA Practice   │
│ 📖 Learning  │  523 contribs | Streak: 32d   │      ╰───────╯         │  [ ] Team Meeting   │
│ 📝 Notes     ├───────────────────────────────┼────────────────────────┼─────────────────────┤
│ 📊 Analytics │ Projects Overview             │ Habit Tracker          │ Recent Activity     │
│ 📅 Calendar  │  ⚡ DevStreak      [75%] OnTrk│  </> Code Daily ●●●●●●●│  🔀 Pushed 3 commits│
│ 🎯 Goals     │  🌐 Portfolio      [40%] InPrg│  📖 Read Books  ●●●●◐○○│  ⏱️ 2 Pomodoros done│
│ 🏆 Trophies  │  💬 AI Chat App    [60%] OnTrk│  🧠 DSA Practice●●●◐○○○│  🧩 Solved 5 DSA    │
│ ⚙️ Settings  │  📄 Blog Platform  [20%] InPrg│  🏋️ Workout     ●●●●●◐○│  📁 Project updated │
├──────────────┴───────────────────────────────┴────────────────────────┴─────────────────────┤
│ 💎 Level 12  [=======================>      ]  XP 2,450 / 3,500                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 1. 🧭 Sidebar Navigation & Gamification
- **12 Dedicated Sections**: Dashboard, Projects, Tasks, Habits, Focus, Learning, Notes, Analytics, Calendar, Goals, Achievements, and Settings.
- **Level 12 XP Progression**: Real-time experience points bar tracking daily coding milestones (`XP 2,450 / 3,500`).

### 2. 📊 Swiss Metric Stat Cards
- **🔥 Current Streak**: `32 days` with all-time personal best indicator (`Best: 47 days`).
- **⏱️ Daily Coding Hours**: `4.6 hrs` with daily percentage comparison (`↑ 12% from yesterday`).
- **☑️ Tasks Completed**: `12 tasks` completed across active sprints (`↑ 20% from yesterday`).
- **📁 Active Projects**: `8 projects` with urgent milestone alerts (`2 due this week`).
- **📈 Productivity Score**: Composite score of `86 /100` (`↑ 8% from yesterday`).

### 3. 🌿 90-Day GitHub Contribution Heatmap
- 13-week by 7-day contribution grid with green gradient activity levels.
- Month milestones: `Feb`, `Mar`, `Apr`, `May`.
- Interactive hover cards detailing commit counts and timestamps.
- Summary analytics: `523 contributions in last 90 days` and longest active streak counter.

### 4. ⏱️ Focus Session (Pomodoro Station)
- Animated circular SVG countdown timer with thick progress ring (`#2563EB`).
- Integrated Web Audio synthesizer chime frequencies for session start and completion.
- Multi-mode selector: `Pomodoro 25/5`, `Short Break (5m)`, `Long Break (15m)`.
- Confetti celebration and automatic logging to daily coding hours upon completion.

### 5. 📋 Today's Agenda
- Interactive checklist with custom audio feedback on completion.
- Time-blocked schedule tags (`9:00 AM – 11:00 AM`, `11:30 AM – 1:00 PM`, `3:00 PM – 4:00 PM`).
- One-click navigation to full calendar view.

### 6. 📁 Projects Overview
- Project workspace rows with custom brand badges (`DevStreak`, `Portfolio Website`, `AI Chat App`, `Blog Platform`).
- Dynamic progress bars (`75%`, `40%`, `60%`, `20%`).
- Colored status badges: `● On Track` (Emerald) and `● In Progress` (Amber).

### 7. 🎯 7-Day Habit Tracker
- Interactive dot matrix across Sunday to Saturday (`S M T W T F S`).
- Instant state toggling (`Completed`, `Half-Completed`, `Pending`) with audio chimes.
- Habits: `Code Daily` (32d streak), `Read Books` (15d), `DSA Practice` (18d), `Workout` (12d).

### 8. 📰 Recent Activity Stream
- Chronological timeline featuring Git commits, completed Pomodoro sessions, DSA problem logs, project updates, and streak trophy unlocks.

### 9. ⚡ Global Command Palette (`⌘ K` / `Ctrl + K`)
- Instant spotlight search across dashboard pages, actions, and utilities with keyboard navigation (`↑`, `↓`, `Enter`, `Esc`).

### 10. 🗺️ 100 Engineering Capabilities Roadmap (`/roadmap`)
- Curated index of 100 developer competencies across 10 domains (Full-Stack, Cloud Native, System Design, DevOps, AI Engineering, etc.).

### 11. 🚫 Custom 404 Page (`/not-found`)
- Gradient 404 error badge, terminal route breadcrumb, and quick destination navigation.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components & Client Hooks) |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) (Strict Mode) |
| **UI & Styling** | Pure Modular CSS with Swiss Design Tokens & Unified Border Radius System |
| **Typography** | `next/font/google` ([Inter](https://fonts.google.com/specimen/Inter) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)) |
| **Icons** | [Lucide React](https://lucide.dev/) & [Phosphor Icons](https://phosphoricons.com/) |
| **Audio** | Custom Web Audio API Sine Wave Synthesizer |
| **Animation** | Canvas Confetti & Smooth CSS Bezier Transitions |

---

## 🚀 Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/sagarmurkute/devdash.git
cd devdash

# 2. Install dependencies
npm install

# 3. Start the Next.js development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build

```bash
# Build optimized static and server pages
npm run build

# Start production server
npm start
```

---

## 📂 Clean Architecture

```text
├── app/
│   ├── layout.tsx                # Root layout with fonts & ThemeProvider
│   ├── page.tsx                  # Main DevStreak Dashboard
│   ├── not-found.tsx             # Custom branded 404 Not Found page
│   ├── roadmap/
│   │   └── page.tsx              # 100 Engineering Capabilities Roadmap
│   └── globals.css               # Design tokens, variables & roundness rules
├── components/
│   ├── Sidebar.tsx               # Left navigation & XP level card
│   ├── DevStreakHeader.tsx       # Top bar (Search, Bell, Profile, Date)
│   ├── TopStatsRow.tsx           # 5 Top metric cards
│   ├── GitHubContributionCard.tsx# 90-day GitHub heatmap
│   ├── FocusSessionCard.tsx      # SVG Pomodoro timer with audio
│   ├── TodaysAgendaCard.tsx      # Daily agenda checklist
│   ├── ProjectsOverviewCard.tsx  # Projects completion overview
│   ├── HabitTrackerCard.tsx      # 7-day dot matrix habit tracker
│   ├── RecentActivityCard.tsx    # Activity feed with timestamps
│   ├── CommandPalette.tsx        # ⌘K Command Palette modal
│   ├── ScratchpadModal.tsx       # Developer scratchpad modal
│   └── icons/
│       └── GithubIcon.tsx        # Custom SVG GitHub icon
├── lib/
│   ├── audio.ts                  # Web Audio synthesizer chimes
│   ├── storage.ts                # SSR-safe localStorage persistence
│   ├── theme-context.tsx         # Theme Provider (Light/Dark mode)
│   ├── types.ts                  # TypeScript interfaces
│   └── roadmap-data.ts           # 100 capabilities dataset
├── LICENSE                       # MIT License
├── package.json                  # v2.2.0 dependencies & scripts
└── tsconfig.json                 # TypeScript configuration
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>⌘ K</kbd> / <kbd>Ctrl + K</kbd> | Open Global Command Palette |
| <kbd>Esc</kbd> | Close Modals & Command Palette |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate Command Palette items |
| <kbd>Enter</kbd> | Select active item |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/sagarmurkute/devdash/issues).

1. Fork the Project (`gh repo fork sagarmurkute/devdash`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

---

<div align="center">
  <sub>Architected with ❤️ by <a href="https://github.com/sagarmurkute">Sagar Murkute</a> &bull; DevStreak v2.2.0</sub>
</div>
