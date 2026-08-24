'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, Check, Terminal, Search } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';

export default function OpenAILandingPage() {
  const [activeTasks, setActiveTasks] = useState([
    { id: '1', title: 'Compile monorepo capabilities matrix', done: true },
    { id: '2', title: 'Initialize local LLM offline bridge', done: false },
    { id: '3', title: 'Synchronize 90-day git contribution state', done: false },
  ]);

  const toggleTask = (id: string) => {
    setActiveTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  // Exactly 37 Categorized Links
  const navSections = {
    research: [
      { title: 'Overview', desc: 'Core engineering and systems architecture', href: '/roadmap' },
      { title: 'Index', desc: 'Complete registry of all system capabilities', href: '/roadmap' },
      {
        title: 'GPT-4o Copilot',
        desc: 'Integrated model bridge for instant code synthesis',
        href: '/roadmap',
      },
      { title: 'o1 Reasoning', desc: 'Deep algorithmic and complexity analysis', href: '/roadmap' },
      { title: 'o3-mini Matrix', desc: 'Low-latency code generation benchmarks', href: '/roadmap' },
      { title: 'Sora Telemetry', desc: 'Real-time rendering & visual pipeline', href: '/roadmap' },
      {
        title: 'DALL·E 3 Assets',
        desc: 'Programmatic generative UI asset pipeline',
        href: '/roadmap',
      },
      {
        title: 'Whisper Audio',
        desc: 'Synthesized voice & acoustic feedback engine',
        href: '/roadmap',
      },
      { title: 'Alignment', desc: 'Deterministic developer state verification', href: '/roadmap' },
      {
        title: 'Safety & Trust',
        desc: '100% offline, local-first data isolation',
        href: '/roadmap',
      },
      {
        title: 'Research Papers',
        desc: 'Technical specifications and whitepapers',
        href: '/docs/architecture.md',
      },
      {
        title: 'Release Logs',
        desc: 'Detailed version milestones and tags',
        href: '/CHANGELOG.md',
      },
      { title: 'Supercomputing', desc: 'Zero-latency edge distribution network', href: '/roadmap' },
    ], // 13 links
    products: [
      {
        title: 'Command Center',
        desc: 'Single-pane developer cockpit and widgets',
        href: '/dashboard',
      },
      {
        title: 'API Platform',
        desc: 'Direct WebSocket and REST bridge contracts',
        href: '/dashboard',
      },
      {
        title: 'DevSlash CLI',
        desc: 'Terminal companion for daily streak tracking',
        href: '/dashboard',
      },
      {
        title: 'Enterprise Cockpit',
        desc: 'Multi-workspace and team management',
        href: '/dashboard',
      },
      {
        title: 'Team Workspaces',
        desc: 'Collaborative sprint and board synchronization',
        href: '/dashboard',
      },
      {
        title: 'Education & Edu',
        desc: 'Interactive DSA, algorithms, and roadmaps',
        href: '/roadmap',
      },
      {
        title: 'Search & Intelligence',
        desc: '⌘K instant workspace indexing and discovery',
        href: '/dashboard',
      },
      {
        title: 'Voice & Audio Engine',
        desc: 'Web Audio API synthesized focus chimes',
        href: '/dashboard',
      },
      { title: 'Pricing Matrix', desc: 'Open-source MIT core and capabilities', href: '/LICENSE' },
    ], // 9 links
    developers: [
      { title: 'Documentation', desc: 'Comprehensive guides and tutorials', href: '/README.md' },
      {
        title: 'API Reference',
        desc: 'TypeScript types and contract definitions',
        href: '/docs/architecture.md',
      },
      {
        title: 'Interactive Playground',
        desc: 'Live widget sandbox and experimentation',
        href: '/dashboard',
      },
      {
        title: 'SDKs & Libraries',
        desc: 'Official client wrappers and bindings',
        href: '/packages/lib',
      },
      {
        title: '100 Capabilities Matrix',
        desc: 'Full engineering roadmap and dispatch',
        href: '/roadmap',
      },
      {
        title: 'Community Forum',
        desc: 'GitHub discussions and issue tracking',
        href: 'https://github.com/sagarmurkute/devdash',
      },
      { title: 'System Status', desc: 'Real-time uptime and client heartbeat', href: '/dashboard' },
      {
        title: 'Changelog',
        desc: 'Version 2.2.0 features and improvements',
        href: '/CHANGELOG.md',
      },
    ], // 8 links
    company: [
      { title: 'About DevSlash', desc: 'Vision and open-source craftsmanship', href: '/README.md' },
      { title: 'Engineering News', desc: 'Weekly release notes and dispatches', href: '/roadmap' },
      {
        title: 'Careers',
        desc: 'Join engineers building next-gen developer tools',
        href: '/CONTRIBUTING.md',
      },
      {
        title: 'Security & Privacy',
        desc: 'Local storage isolation and zero telemetry',
        href: '/README.md',
      },
      {
        title: 'Open Source Charter',
        desc: 'MIT permissive licensing principles',
        href: '/LICENSE',
      },
      {
        title: 'Customer Stories',
        desc: 'How high-output developers maintain streaks',
        href: '/roadmap',
      },
      {
        title: 'Press & Brand Kit',
        desc: 'Official logos, badges, and guidelines',
        href: '/README.md',
      },
    ], // 7 links
  };

  return (
    <div className="openai-landing">
      {/* 1. OpenAI Minimalist Navigation Bar (37 Categorized Links) */}
      <header className="openai-nav">
        <div className="openai-nav-inner">
          <Link href="/" className="openai-brand">
            <div className="openai-logo-mark">
              <span style={{ fontSize: '11px', fontWeight: 900 }}>/</span>
            </div>
            <span>DevSlash</span>
          </Link>

          {/* Categorized Mega-Menu Navigation (13 + 9 + 8 + 7 = 37 Links) */}
          <nav className="openai-nav-categories">
            {/* 1. Research (13 Links) */}
            <div className="openai-nav-item">
              <button type="button" className="openai-nav-btn">
                <span>Research</span>
                <ChevronDown size={12} />
              </button>
              <div className="openai-dropdown wide">
                {navSections.research.map((item) => (
                  <Link key={item.title} href={item.href} className="openai-dropdown-link">
                    <span className="openai-dropdown-title">{item.title}</span>
                    <span className="openai-dropdown-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Products (9 Links) */}
            <div className="openai-nav-item">
              <button type="button" className="openai-nav-btn">
                <span>Products</span>
                <ChevronDown size={12} />
              </button>
              <div className="openai-dropdown">
                {navSections.products.map((item) => (
                  <Link key={item.title} href={item.href} className="openai-dropdown-link">
                    <span className="openai-dropdown-title">{item.title}</span>
                    <span className="openai-dropdown-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Developers (8 Links) */}
            <div className="openai-nav-item">
              <button type="button" className="openai-nav-btn">
                <span>Developers</span>
                <ChevronDown size={12} />
              </button>
              <div className="openai-dropdown">
                {navSections.developers.map((item) => (
                  <Link key={item.title} href={item.href} className="openai-dropdown-link">
                    <span className="openai-dropdown-title">{item.title}</span>
                    <span className="openai-dropdown-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Company (7 Links) */}
            <div className="openai-nav-item">
              <button type="button" className="openai-nav-btn">
                <span>Company</span>
                <ChevronDown size={12} />
              </button>
              <div className="openai-dropdown">
                {navSections.company.map((item) => (
                  <Link key={item.title} href={item.href} className="openai-dropdown-link">
                    <span className="openai-dropdown-title">{item.title}</span>
                    <span className="openai-dropdown-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Header Actions */}
          <div className="openai-nav-actions">
            <a
              href="https://github.com/sagarmurkute/devdash"
              target="_blank"
              rel="noreferrer"
              className="openai-btn-outline"
            >
              <GithubIcon size={13} />
              <span>GitHub</span>
            </a>
            <Link href="/dashboard" className="openai-btn-white">
              <span>Launch App</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. OpenAI Editorial Hero Section */}
      <main className="openai-hero">
        <div className="openai-badge">
          <span>{`// DevSlash Architecture 2.2.0`}</span>
        </div>

        <h1 className="openai-hero-headline">
          The developer command center for high-velocity engineering.
        </h1>

        <p className="openai-hero-sub">
          DevSlash unifies contribution telemetry, focus sessions, sprint pipelines, and 100 system
          capabilities into a single, local-first cockpit. Built for engineers who demand pure speed
          and precision.
        </p>

        <div className="openai-hero-cta-row">
          <Link href="/dashboard" className="openai-hero-cta-main">
            <span>Launch Command Center</span>
            <ArrowRight size={15} />
          </Link>
          <Link href="/roadmap" className="openai-hero-cta-sec">
            <span>Read 100 Roadmap</span>
          </Link>
        </div>

        {/* 3. Pure Monochromatic Command Canvas */}
        <div className="openai-canvas-wrapper">
          <div className="openai-canvas-topbar">
            <div className="openai-canvas-dots">
              <span className="openai-canvas-dot" />
              <span className="openai-canvas-dot" />
              <span className="openai-canvas-dot" />
            </div>
            <div className="openai-canvas-tag">devslash://system.telemetry.local</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ECECEC' }}>
              STATUS: ONLINE
            </div>
          </div>

          <div className="openai-canvas-grid">
            {/* Column 1: Daily Streak & Output */}
            <div className="openai-canvas-pane">
              <span className="openai-pane-label">01 // Contribution Momentum</span>
              <h3 className="openai-pane-title">32 Days Active</h3>
              <p className="openai-pane-desc">
                Continuous daily code streak across all tracked git repositories with local snapshot
                integrity.
              </p>
            </div>

            {/* Column 2: Focus & Clock */}
            <div className="openai-canvas-pane">
              <span className="openai-pane-label">02 // Focus Architecture</span>
              <h3 className="openai-pane-title">25:00 Interval</h3>
              <p className="openai-pane-desc">
                Synthesized Web Audio acoustic feedback for deep focus states and automated rest
                cycles.
              </p>
            </div>

            {/* Column 3: Interactive Pipeline Tasks */}
            <div className="openai-canvas-pane">
              <span className="openai-pane-label">03 // Sprint Verification</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {activeTasks.map((t) => (
                  <div key={t.id} className="openai-task-row" onClick={() => toggleTask(t.id)}>
                    <div className={`openai-task-box ${t.done ? 'checked' : ''}`}>
                      {t.done && <Check size={10} />}
                    </div>
                    <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
                      {t.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Monochromatic System Specifications */}
        <div className="openai-specs-bar">
          <div className="openai-spec-item">
            <span className="openai-spec-num">37</span>
            <span className="openai-spec-txt">Navigation & capability directories</span>
          </div>
          <div className="openai-spec-item">
            <span className="openai-spec-num">100%</span>
            <span className="openai-spec-txt">Local-first client storage isolation</span>
          </div>
          <div className="openai-spec-item">
            <span className="openai-spec-num">0ms</span>
            <span className="openai-spec-txt">Cloud roundtrip latency</span>
          </div>
          <div className="openai-spec-item">
            <span className="openai-spec-num">100</span>
            <span className="openai-spec-txt">Engineering matrix specifications</span>
          </div>
        </div>
      </main>

      {/* 5. Minimalist Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '3rem 1.5rem',
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#71717A',
          fontSize: '0.8rem',
        }}
      >
        <span>DevSlash &bull; Designed & Built by Sagar Murkute</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a
            href="https://github.com/sagarmurkute/devdash"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#A1A1AA', textDecoration: 'none' }}
          >
            GitHub
          </a>
          <Link href="/roadmap" style={{ color: '#A1A1AA', textDecoration: 'none' }}>
            Roadmap
          </Link>
          <Link href="/dashboard" style={{ color: '#A1A1AA', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </div>
      </footer>
    </div>
  );
}
