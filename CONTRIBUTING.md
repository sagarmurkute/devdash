# Contributing to DevSlash ⚡

First off, thank you for taking the time to contribute! 🎉

We love your input! We want to make contributing to **DevSlash** as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

---

## 🛠️ Development Workflow

### 1. Fork and Clone the Repository

```bash
# Fork the repo via GitHub CLI or web UI
git clone https://github.com/YOUR-USERNAME/devdash.git
cd devdash
```

### 2. Install Dependencies

Ensure you have **Node.js (v18+)** installed:

```bash
npm install
```

### 3. Create a Feature Branch

Create a descriptive branch for your work:

```bash
git checkout -b feature/amazing-new-widget
# or
git checkout -b fix/pomodoro-timer-chime
```

### 4. Run Locally

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Coding & Design Standards

To ensure DevSlash maintains its clean, high-performance aesthetic, please follow these guidelines:

### 1. Design System & Border Radius
- Use predefined CSS variables in [`app/globals.css`](./app/globals.css):
  - `--radius-card`: `14px` for main cards and widgets.
  - `--radius-control`: `10px` for buttons, inputs, dropdowns, and interactive items.
  - `--radius-badge`: `8px` for icon containers and tags.
  - `--radius-checkbox`: `5px` for checkboxes.
- Avoid arbitrary inline hardcoded radius values unless specific to a custom SVG graphic.

### 2. TypeScript & Next.js App Router
- Write clean, strongly typed TypeScript (`.tsx` / `.ts`).
- Mark interactive components with `'use client';` at the top.
- Maintain client-side persistence safety (check `typeof window !== 'undefined'` before accessing `localStorage`).

### 3. Icons
- Use **Lucide React** (`lucide-react`) for UI icons.
- For GitHub icons, use the custom [`components/icons/GithubIcon.tsx`](./components/icons/GithubIcon.tsx).

---

## 🧪 Testing Your Changes

Before submitting your pull request, verify that the project builds cleanly without TypeScript or bundler errors:

```bash
# Run production build check
npm run build
```

---

## 📝 Commit Convention

We follow conventional commit guidelines:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (formatting, CSS tweaks)
- `refactor:` Code changes that neither fix a bug nor add a feature
- `perf:` A code change that improves performance
- `chore:` Changes to the build process or auxiliary tools

---

## 🚀 Submitting a Pull Request

1. Push your branch to GitHub:
   ```bash
   git push origin feature/amazing-new-widget
   ```
2. Open a Pull Request from your fork to `sagarmurkute/devdash` (`main` branch).
3. Fill out the PR description with:
   - What changed
   - Screenshots/GIFs of visual modifications
   - Any related issues (`Closes #123`)

---

## 📜 Code of Conduct

- Be welcoming, inclusive, and respectful of all contributors.
- Provide constructive feedback.
- Focus on what is best for the community.

Thank you for helping build **DevStreak**! ⚡
