# DevSlash Monorepo Architecture 🏛️

DevSlash is organized as a modular, high-performance monorepo designed for web, desktop, and shared packages.

## Structure

```text
devslash/
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

- **`/`**: DevSlash Marketing & Conversion Landing Page.
- **`/dashboard`**: Complete, interactive DevSlash Command Center Dashboard.
- **`/roadmap`**: 100 Engineering Capabilities Matrix with newsletter signup.
- **`/not-found`**: Custom 404 error page.
