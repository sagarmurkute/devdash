# DevStreak Monorepo Architecture 🏛️

DevStreak is organized as a modular, high-performance monorepo designed for web, desktop, and shared packages.

## Structure

```text
devstreak/
├── apps/
│   ├── web/                 # Next.js 14 App Router application
│   └── desktop/             # Electron desktop application wrapper
│
├── packages/
│   ├── ui/                  # Shared design tokens & UI components
│   ├── database/            # Database schema & data layer contracts
│   ├── lib/                 # Shared utilities, audio synthesizers & state
│   └── config/              # Shared TypeScript & ESLint configurations
│
├── docs/                    # Architecture, APIs & Guides
├── public/                  # Static assets & icons
└── .github/
    └── workflows/           # CI/CD pipelines
```

## Route Separation
- **`/`**: DevStreak Marketing & Conversion Landing Page.
- **`/dashboard`**: Complete, interactive DevStreak Command Center Dashboard (untouched & isolated).
- **`/roadmap`**: 100 Engineering Capabilities Matrix with newsletter signup.
- **`/not-found`**: Custom 404 error page.
