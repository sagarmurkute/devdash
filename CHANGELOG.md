# Changelog 📜

All notable changes to **DevStreak** (formerly DevDash) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.2.0] - 2026-08-24

### Added
- **Exact Reference UI Layout**:
  - Full-height sticky left sidebar with 12 navigation items and Level 12 XP progression card (`XP 2,450 / 3,500`).
  - Top header with dynamic time greeting (`Good morning, Sagar 👋`), subtitle, search bar with `⌘ K` indicator, notification bell with unread dot, user profile pill, and live formatted date card.
  - 5 Top Metric Stat Cards: Current Streak (32d, Best: 47d), Coding Hours (4.6h, +12%), Tasks Completed (12 tasks, +20%), Active Projects (8 projects, 2 due this week), Productivity Score (86/100, +8%).
  - 90-Day GitHub Contribution Heatmap with 13-week x 7-row grid, green gradient scale, month labels (`Feb`, `Mar`, `Apr`, `May`), and longest streak tracker.
  - Circular SVG Focus Session timer (Pomodoro 25/5) with Web Audio sine synthesizer chimes, confetti celebrations, and focus hours auto-logging.
  - Today's Agenda checklist with interactive checkboxes and timeslot tags.
  - Projects Overview card with app badges, progress indicators, and status tags (`● On Track`, `● In Progress`).
  - 7-Day Habit Tracker with interactive Sunday–Saturday (`S M T W T F S`) dot matrix.
  - Recent Activity Feed timeline with relative timestamps.
- **Custom 404 Page (`app/not-found.tsx`)**:
  - Gradient 404 glitch title, terminal route badge, and quick return links.
- **Unified Design Tokens**:
  - Harmonious border radius rules: `--radius-card` (14px), `--radius-control` (10px), `--radius-badge` (8px), `--radius-checkbox` (5px).
- **Documentation**:
  - Added comprehensive `README.md`, `LICENSE` (MIT), `CONTRIBUTING.md`, and `CHANGELOG.md`.

### Changed
- Migrated fonts to `next/font/google` (`Inter` and `JetBrains Mono`) for zero network latency and layout shift.
- Standardized all button, input, card, dropdown, and badge corner radii for visual balance.

### Removed
- Deprecated legacy vanilla JavaScript and CSS files in favor of modular React components in App Router.

---

## [2.0.0] - 2026-08-24

### Added
- Complete conversion from Vanilla HTML/CSS/JS to **React Next.js 14 App Router + TypeScript**.
- Modular component structure across dashboard, widgets, and modals.
- Dedicated `100 Engineering Capabilities Roadmap` page (`/roadmap`) with live search and newsletter signup.
- Global Command Palette (`⌘ K` / `Ctrl + K`) with keyboard arrow navigation.
- Web Audio API synthesizer for chimes and sounds.
- LocalStorage state manager with JSON backup export and import.

---

## [1.0.0] - 2026-08-24

### Initial Release
- Multi-file static developer dashboard with Swiss minimal styling.
- Basic GitHub commit logging, coding hours tracker, and task management.
