import { RoadmapCategory } from './types';

export const ROADMAP_DATA: RoadmapCategory[] = [
  {
    category: "AI & LLM Developer Copilots",
    num: "01",
    features: [
      { id: "001", name: "Local Ollama / LM Studio Model Bridge", desc: "Connect local LLM servers directly to prompt or refactor snippets within DevSlash." },
      { id: "002", name: "Automated PR Description & Summary Generator", desc: "Generate semantic release notes and PR summaries from staged git diffs." },
      { id: "003", name: "Interactive Regex & SQL Query Synthesizer", desc: "Natural language to optimal SQL queries and regex patterns." },
      { id: "004", name: "AI Code Explainer & Big-O Complexity Analyzer", desc: "Instant time & space complexity breakdown for pasted functions." },
      { id: "005", name: "Context-Aware Test Case Generator (Jest / Pytest)", desc: "Generate edge-case unit test suites for highlighted functions." },
      { id: "006", name: "Multi-Model Playground (Claude, GPT-4o, DeepSeek)", desc: "Side-by-side prompt evaluator with latency and token metrics." },
      { id: "007", name: "Semantic Code Search Across Local Workspaces", desc: "Vector embedding search across all local Git repositories." },
      { id: "008", name: "Voice-to-Code Scratchpad Dictation", desc: "Developer voice transcription for rapid architecture brain dumps." },
      { id: "009", name: "AI Shell Command Assistant & Explainer", desc: "Safe terminal command generator with parameter breakdowns." },
      { id: "010", name: "Architecture Diagram Synthesizer (Mermaid.js)", desc: "Convert text descriptions into interactive architectural sequence diagrams." }
    ]
  },
  {
    category: "Git, CI/CD & DevOps Automation",
    num: "02",
    features: [
      { id: "011", name: "Interactive Multi-Branch Visual Graph", desc: "Visual commit tree showing merges, rebases, and branch divergences." },
      { id: "012", name: "GitHub Actions & GitLab Pipeline Status Monitor", desc: "Real-time CI/CD build matrix and test pipeline tracker." },
      { id: "013", name: "Automated Semantic Git Tagging & Release Drafter", desc: "Generate automated v1.x tags based on Conventional Commits." },
      { id: "014", name: "Git Stash & Cherry-Pick Visual Manager", desc: "Inspect and apply stashed diffs with 1-click controls." },
      { id: "015", name: "Multi-Remote Pull Request Review Dashboard", desc: "Centralized review queue for PRs across all work & personal repos." },
      { id: "016", name: "Commit Streak Freeze & Holiday Buffer Log", desc: "Smart streak safeguard calendar for travels and rest days." },
      { id: "017", name: "Git Hook Script Generator (Pre-commit / Pre-push)", desc: "One-click generation of linting and security pre-commit hooks." },
      { id: "018", name: "Large File Storage (Git LFS) Auditor", desc: "Identify binary bloat and large assets slowing down repository clones." },
      { id: "019", name: "Docker Container & Compose Manager", desc: "Start, stop, and inspect local container logs and port mappings." },
      { id: "020", name: "Kubernetes Pod & Ingress Health Inspector", desc: "Lightweight k8s cluster health overview and crash-loop pinger." }
    ]
  },
  {
    category: "Database, Cache & API Command Centers",
    num: "03",
    features: [
      { id: "021", name: "Embedded SQLite & DuckDB Query Studio", desc: "Run SQL directly inside the browser using WebAssembly." },
      { id: "022", name: "PostgreSQL & MySQL Remote Connection Studio", desc: "Inspect tables, schema migrations, and active query locks." },
      { id: "023", name: "Redis Key-Value & TTL Inspector", desc: "Monitor cached keys, memory consumption, and publish/subscribe events." },
      { id: "024", name: "REST API Client with Collections (Postman Alternative)", desc: "Lightweight request builder with header presets and environment vars." },
      { id: "025", name: "GraphQL Schema Explorer & Query Builder", desc: "Introspect GraphQL endpoints and test mutations in real time." },
      { id: "026", name: "WebSocket & Server-Sent Events (SSE) Tester", desc: "Inspect live duplex message streams and latency roundtrips." },
      { id: "027", name: "JSON to TypeScript / Go Struct / Rust Struct Transpiler", desc: "Instant generation of typed models from raw JSON responses." },
      { id: "028", name: "API Mock Server & Synthetic Latency Emulator", desc: "Create local mock endpoints with custom HTTP status codes." },
      { id: "029", name: "Database Schema Visualizer & ERD Generator", desc: "Auto-generate Entity-Relationship Diagrams from SQL DDL scripts." },
      { id: "030", name: "Prisma & Drizzle ORM Schema Diff Inspector", desc: "Compare schema files with production database structures." }
    ]
  },
  {
    category: "Developer Health, Habits & Biomarkers",
    num: "04",
    features: [
      { id: "031", name: "20-20-20 Eye Strain & Ergonomics Reminder", desc: "Periodic visual break reminders to prevent eye fatigue." },
      { id: "032", name: "Hydration & Caffeine Consumption Tracker", desc: "Monitor daily water intake and coffee intake vs. sleep score." },
      { id: "033", name: "Deep Work Flow State & Focus Shield", desc: "Block distracting websites and mute OS notifications during sprints." },
      { id: "034", name: "Binaural Beats & Procedural Lo-Fi Soundscapes", desc: "Synthesized 40Hz gamma focus waves and ambient rain acoustics." },
      { id: "035", name: "Keyboard Heatmap & Typing Speed (WPM) Benchmarker", desc: "Live keystroke metrics and finger strain heat distribution." },
      { id: "036", name: "Burnout Risk & Work-Life Balance Calculator", desc: "Calculate rest ratios and overtime hours across weekly logs." },
      { id: "037", name: "Stand-up Meeting Timer & Agile Agenda Builder", desc: "Strict 15-minute team standup timer with turn indicators." },
      { id: "038", name: "Daily Engineering Gratitude & Wins Journal", desc: "Record daily small milestones and breakthrough code solutions." },
      { id: "039", name: "Posture Check Chime with Webcam Sensor Option", desc: "Gentle sound alert for slouching during extended coding marathons." },
      { id: "040", name: "Sleep & Circadian Rhythm Alignment Suggestion", desc: "Optimal bedtime calculator based on daily deep focus hours." }
    ]
  },
  {
    category: "Code Intelligence & AST Diagnostics",
    num: "05",
    features: [
      { id: "041", name: "Multi-Language AST (Abstract Syntax Tree) Viewer", desc: "Inspect JS/TS/Python code trees and syntax tokens." },
      { id: "042", name: "Code Duplication & Dead Code Detector", desc: "Scan project folders to locate copy-pasted blocks and unused exports." },
      { id: "043", name: "Cyclomatic Complexity & Maintainability Index", desc: "Highlight overly complex functions needing refactoring." },
      { id: "044", name: "CSS Bundle Size & Unused Selectors Scanner", desc: "Inspect stylesheet footprint and prune unused CSS rules." },
      { id: "045", name: "JavaScript Event Loop & Microtask Queue Simulator", desc: "Interactive visualization of promise execution order." },
      { id: "046", name: "Memory Leak & Retained Objects Diagnostics", desc: "Profile memory allocation patterns and unclosed event listeners." },
      { id: "047", name: "WebAssembly Module (Wasm) Disassembler & Wat Viewer", desc: "Inspect Wasm bytecode and disassembler text in the browser." },
      { id: "048", name: "Cron Expression Syntax Explainer & Schedule Planner", desc: "Visual timeline calculator for recurring cron expressions." },
      { id: "049", name: "Color Palette & Contrast Ratio Accessibility (WCAG) Checker", desc: "Test foreground/background contrast compliance with WCAG AAA." },
      { id: "050", name: "JWT (JSON Web Token) Decoder & Expiry Validator", desc: "Decode JWT payloads, headers, and verify signature validity." }
    ]
  },
  {
    category: "Cloud Infrastructure & Serverless Monitoring",
    num: "06",
    features: [
      { id: "051", name: "AWS S3 / Cloudflare R2 Bucket Explorer", desc: "Upload, browse, and generate presigned URLs for assets." },
      { id: "052", name: "Serverless Function Execution Logs (AWS Lambda / Vercel)", desc: "Live streaming of cloud function cold starts and execution latencies." },
      { id: "053", name: "Cloudflare Workers & Edge Route Manager", desc: "Manage KV namespaces and deploy edge worker scripts." },
      { id: "054", name: "DNS Record & Propagation Checker (A, CNAME, MX, TXT)", desc: "Check global DNS resolution speed across 20 global nodes." },
      { id: "055", name: "SSL/TLS Certificate Expiration Watchdog", desc: "Alert 14 days before domain HTTPS certificates expire." },
      { id: "056", name: "Cloud Cost & Monthly Burn Rate Estimator", desc: "Track infrastructure spending across AWS, GCP, and DigitalOcean." },
      { id: "057", name: "CDN Cache Purge & Invalidation Trigger", desc: "1-click cache purge for Cloudflare, Fastly, and CloudFront." },
      { id: "058", name: "Pingdom / Uptime Robot Webhook Collector", desc: "Display real-time uptime percentages for public APIs." },
      { id: "059", name: "Terraform & Pulumi State Drift Notifier", desc: "Alert when cloud infrastructure deviates from IaC declarations." },
      { id: "060", name: "Tailscale & WireGuard VPN Tunnel Status", desc: "Inspect active peer nodes and mesh network connectivity." }
    ]
  },
  {
    category: "Security, Secrets & Vulnerability Scanners",
    num: "07",
    features: [
      { id: "061", name: "NPM / Pip / Cargo Dependency Vulnerability (CVE) Auditor", desc: "Scan package lockfiles for high and critical CVE alerts." },
      { id: "062", name: "Hardcoded API Keys & Secrets Detector", desc: "Prevent accidental commits of AWS keys, Stripe tokens, and passwords." },
      { id: "063", name: "Password & Passphrase Entropy Strength Calculator", desc: "Evaluate cryptographic strength using zxcvbn entropy algorithms." },
      { id: "064", name: "CORS (Cross-Origin Resource Sharing) Header Tester", desc: "Verify access-control headers against multiple preflight origins." },
      { id: "065", name: "CSP (Content Security Policy) Rule Generator", desc: "Build hardened headers restricting script and image sources." },
      { id: "066", name: "GPG & SSH Key Expiration Manager", desc: "Audit and rotate developer cryptographic commit signing keys." },
      { id: "067", name: "OWASP Top 10 Security Checklist & Audit Tracker", desc: "Interactive security verification matrix for web applications." },
      { id: "068", name: "Subdomain Takeover & CNAME Vulnerability Checker", desc: "Identify orphaned DNS records pointing to decommissioned services." },
      { id: "069", name: "HMAC Signature Generator & Verification Tool", desc: "Compute SHA-256 and SHA-512 signatures for Webhook payloads." },
      { id: "070", name: "Local .env Secret Vault with AES-256 Encryption", desc: "Securely store encrypted environment variables across projects." }
    ]
  },
  {
    category: "Engineering Metrics, DORA & Team Analytics",
    num: "08",
    features: [
      { id: "071", name: "DORA Metrics Suite (Deployment Frequency, Lead Time)", desc: "Track industry-standard DevOps Research and Assessment metrics." },
      { id: "072", name: "MTTR (Mean Time to Resolution) Incident Log", desc: "Analyze bug fix cycles and outage post-mortem timelines." },
      { id: "073", name: "Code Review Turnaround Time & PR Velocity", desc: "Measure review response speeds to avoid engineering bottlenecks." },
      { id: "074", name: "Code Churn & Refactor vs. Net-New Lines Ratio", desc: "Quantify architectural rewrites vs. feature additions." },
      { id: "075", name: "Sprint Burndown & Velocity Forecasting Chart", desc: "Predict sprint completion dates with Monte Carlo simulations." },
      { id: "076", name: "Developer Skill Radar & Tech Stack Distribution", desc: "Visualize language balance (Backend, Frontend, DevOps, Data)." },
      { id: "077", name: "Documentation Coverage & JSDoc / TypeDoc Auditor", desc: "Measure percentage of exported APIs with valid docstrings." },
      { id: "078", name: "Issue Lifecycle & Bug Escape Rate Tracker", desc: "Monitor bugs discovered in production vs. staging environments." },
      { id: "079", name: "Pair Programming & Co-Author Credits Log", desc: "Track collaborative pairing sessions and shared Git commits." },
      { id: "080", name: "Automated Weekly Engineering Digest (Markdown / PDF Export)", desc: "Generate professional weekly accomplishment reports." }
    ]
  },
  {
    category: "Developer Utilities, Sandbox & Playgrounds",
    num: "09",
    features: [
      { id: "081", name: "HTML / CSS / JS Real-Time Live Sandbox (CodePen Alternative)", desc: "Instant browser playground with live DOM rendering." },
      { id: "082", name: "Diff Checker & Semantic Text Comparison Tool", desc: "Side-by-side word and character-level unified diff viewer." },
      { id: "083", name: "Image Compression & WebP / AVIF Converter", desc: "Client-side image optimizer with zero server uploads." },
      { id: "084", name: "Markdown & LaTeX Equation Live Previewer", desc: "Render complex mathematical formulas and technical documentation." },
      { id: "085", name: "SVG Path Editor & Icon Optimizer (SVGO Engine)", desc: "Clean up messy SVG vectors and strip redundant metadata." },
      { id: "086", name: "Favicon & App Icon Generator (All Dimensions)", desc: "Export crisp favicons for iOS, Android, and Web manifests." },
      { id: "087", name: "Unix Timestamp & Timezone Offset Calculator", desc: "Convert milliseconds, seconds, and ISO-8601 timestamps instantly." },
      { id: "088", name: "UUID (v4, v7) & NanoID Batch Generator", desc: "Generate batches of cryptographically secure identifiers." },
      { id: "089", name: "Lorem Ipsum & Realistic Mock Data Synthesizer", desc: "Generate fake developer names, emails, addresses, and IP blocks." },
      { id: "090", name: "cURL to Fetch / Axios / Python Requests Code Converter", desc: "Transpile raw curl commands into executable language code." }
    ]
  },
  {
    category: "Platform Integrations, DB Sync & Offline Native",
    num: "10",
    features: [
      { id: "091", name: "PostgreSQL / Supabase Cloud Database Sync Engine", desc: "Sync DevDash tasks and hours across all your developer devices." },
      { id: "092", name: "Linear & Jira Issue Tracker Bi-Directional Bridge", desc: "Pull assigned tickets directly onto the DevDash sprint board." },
      { id: "093", name: "Notion & Obsidian Markdown Notes Synchronization", desc: "Two-way note sync for architecture designs and snippets." },
      { id: "094", name: "Discord & Slack Webhook Standup Notifier", desc: "Broadcast your daily coding hours and streak to team channels." },
      { id: "095", name: "PWA (Progressive Web App) Desktop Installation", desc: "Install DevDash as a native standalone window on Windows/Mac/Linux." },
      { id: "096", name: "Full Offline First Service Worker & IndexedDB Vault", desc: "Zero downtime operations when coding on flights or offline." },
      { id: "097", name: "VS Code & JetBrains IDE Activity Sync Plugin", desc: "Automatically track coding hours directly from your IDE editor." },
      { id: "098", name: "Raycast & Alfred Global Command Extension", desc: "Launch DevDash focus timers and log habits straight from your OS." },
      { id: "099", name: "Multi-User Team Leaderboard & Streak Competitions", desc: "Friendly engineering streak challenges with teammates." },
      { id: "100", name: "Plugin SDK & Open Developer Extension Marketplace", desc: "Build custom widgets with simple HTML/JS micro-plugins." }
    ]
  }
];
