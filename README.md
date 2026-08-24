# ⚡ DevStreak — Modern Developer Command Center (v2.2)

> **Architected, Designed & Built with Precision by [Sagar Murkute](https://github.com/sagarmurkute)**.

A state-of-the-art, high-performance developer command center and habit tracking system built with **Next.js 14/15 (App Router), React 18/19, TypeScript, and unified Swiss UI tokens**.

---

## 🌟 Version 2.2 Highlights

- **🎯 Exact Reference UI**: Seamless left sidebar navigation, Level 12 XP progression, top header bar with live greeting and date card.
- **📊 5 Real-Time Metric Cards**: Current streak, daily coding hours, tasks completed, active projects, and productivity score.
- **🔥 GitHub 90-Day Contribution Heatmap**: 13-week contribution matrix with activity levels, month markers, and streak preservation.
- **⏱️ Focus Session Station**: Circular SVG timer with Web Audio synthesizers, Pomodoro intervals, and focus time auto-logging.
- **📋 Today's Agenda**: Interactive schedule with instant status checkboxes and timeslot tags.
- **📁 Projects Overview**: Workspaces with sprint completion bars and live status pills.
- **✅ 7-Day Habit Tracker**: Interactive dot matrix (`S M T W T F S`) with instant streak calculation.
- **📰 Recent Activity Feed**: Real-time event log with color-coded badges.
- **⚡ Global Command Palette (`⌘ K` / `Ctrl + K`)**: Keyboard-driven navigation and shortcut dispatcher.

---

## 📁 Clean Next.js Architecture

```text
├── app/
│   ├── layout.tsx         # Root layout with next/font/google and ThemeProvider
│   ├── page.tsx           # DevStreak Command Center Dashboard
│   ├── roadmap/page.tsx   # 100 Engineering Capabilities Matrix
│   └── globals.css        # Unified design tokens & harmonious roundness system
├── components/
│   ├── Sidebar.tsx        # Left navigation & XP level card
│   ├── DevStreakHeader.tsx# Header bar with search, notifications, profile, date
│   ├── TopStatsRow.tsx    # 5 Top metric cards
│   ├── GitHubContributionCard.tsx # 90-day GitHub heatmap
│   ├── FocusSessionCard.tsx       # Circular SVG Pomodoro timer
│   ├── TodaysAgendaCard.tsx       # Daily task agenda with checkboxes
│   ├── ProjectsOverviewCard.tsx   # Projects overview with progress bars
│   ├── HabitTrackerCard.tsx       # 7-day dot matrix habit tracker
│   ├── RecentActivityCard.tsx     # Activity stream with timestamps
│   ├── CommandPalette.tsx         # Ctrl+K spotlight modal
│   └── ScratchpadModal.tsx        # Auto-saving developer scratchpad
├── lib/
│   ├── audio.ts           # Web Audio synthesizer chimes
│   ├── storage.ts         # SSR-safe localStorage persistence & backups
│   ├── theme-context.tsx  # React Theme Context (Light/Dark)
│   ├── types.ts           # TypeScript interfaces & data models
│   └── roadmap-data.ts    # 100 capabilities dataset
├── package.json           # v2.2.0 dependencies & scripts
└── tsconfig.json          # TypeScript config with @/* aliases
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start Next.js Development Server
npm run dev

# Build for Production
npm run build
```

---

## 📝 License
MIT &bull; Sagar Murkute
