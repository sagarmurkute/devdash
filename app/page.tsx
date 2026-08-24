'use client';

import React from 'react';
import Link from 'next/link';
import {
  Zap,
  ArrowRight,
  Flame,
  Clock,
  CheckCircle2,
  TrendingUp,
  Compass,
  Star,
  Sparkles,
  ShieldCheck,
  Terminal,
  Code2,
  Calendar,
  Layers,
  Cpu,
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';

export default function DevSlashLandingPage() {
  return (
    <div className="landing-page-wrapper">
      {/* 1. Header Navigation Bar */}
      <header className="landing-nav">
        <div className="landing-nav-container">
          <Link href="/" className="landing-brand">
            <div className="sidebar-logo-icon" style={{ width: '32px', height: '32px' }}>
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="landing-brand-title">DevSlash</span>
          </Link>

          <nav className="landing-nav-links">
            <a href="#features">Features</a>
            <Link href="/roadmap">100 Roadmap</Link>
            <a href="#architecture">Architecture</a>
            <a href="https://github.com/sagarmurkute/devslash" target="_blank" rel="noreferrer">
              Documentation
            </a>
          </nav>

          <div className="landing-nav-actions">
            <a
              href="https://github.com/sagarmurkute/devslash"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary btn-sm"
              title="Star on GitHub"
            >
              <GithubIcon size={14} /> Star
            </a>
            <Link href="/dashboard" className="btn btn-primary btn-sm">
              Launch Dashboard <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="landing-hero">
        <div className="hero-badge">
          <Sparkles size={13} style={{ color: 'var(--brand-blue)' }} />
          <span>DevSlash v2.2 &bull; The Modern Developer Command Center</span>
        </div>

        <h1 className="hero-title">
          Master Your Coding Streak.
          <br />
          <span className="hero-gradient-text">Level Up Your Engineering.</span>
        </h1>

        <p className="hero-subtitle">
          A unified, high-performance workspace engineered for high-output developers. Track GitHub
          contributions, manage sprint sprints, automate focus sessions, and master 100 engineering
          capabilities.
        </p>

        <div className="hero-cta-group">
          <Link href="/dashboard" className="btn btn-primary hero-btn-main">
            <Zap size={16} fill="currentColor" /> Launch Live Dashboard
          </Link>
          <Link href="/roadmap" className="btn btn-secondary hero-btn-sub">
            <Compass size={16} /> 100 Engineering Roadmap
          </Link>
        </div>

        {/* 3. Hero Visual Dashboard Preview */}
        <div className="hero-preview-wrapper">
          <div className="hero-preview-card">
            {/* Top Bar inside preview */}
            <div className="preview-top-bar">
              <div className="preview-dots">
                <span className="p-dot red" />
                <span className="p-dot yellow" />
                <span className="p-dot green" />
              </div>
              <div className="preview-url">devstreak.local/dashboard</div>
              <div className="preview-status">● Live</div>
            </div>

            {/* Content inside preview mockup */}
            <div className="preview-content-grid">
              {/* Stat Card 1 */}
              <div className="preview-mini-card">
                <div className="preview-mini-header">
                  <div
                    className="stat-card-icon"
                    style={{
                      backgroundColor: 'var(--accent-orange-light)',
                      color: 'var(--accent-orange)',
                      width: '28px',
                      height: '28px',
                    }}
                  >
                    <Flame size={14} />
                  </div>
                  <span>Current Streak</span>
                </div>
                <div className="preview-mini-val">
                  32 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>days</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)' }}>
                  Best: 47 days
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="preview-mini-card">
                <div className="preview-mini-header">
                  <div
                    className="stat-card-icon"
                    style={{
                      backgroundColor: 'var(--brand-blue-light)',
                      color: 'var(--brand-blue)',
                      width: '28px',
                      height: '28px',
                    }}
                  >
                    <Clock size={14} />
                  </div>
                  <span>Coding Hours</span>
                </div>
                <div className="preview-mini-val">
                  4.6 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>hrs</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)' }}>↑ 12% today</div>
              </div>

              {/* Stat Card 3 */}
              <div className="preview-mini-card">
                <div className="preview-mini-header">
                  <div
                    className="stat-card-icon"
                    style={{
                      backgroundColor: 'var(--brand-blue-light)',
                      color: 'var(--brand-blue)',
                      width: '28px',
                      height: '28px',
                    }}
                  >
                    <CheckCircle2 size={14} />
                  </div>
                  <span>Tasks Completed</span>
                </div>
                <div className="preview-mini-val">
                  12 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>tasks</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)' }}>↑ 20% today</div>
              </div>

              {/* Stat Card 4 */}
              <div className="preview-mini-card">
                <div className="preview-mini-header">
                  <div
                    className="stat-card-icon"
                    style={{
                      backgroundColor: 'var(--accent-green-light)',
                      color: 'var(--accent-green)',
                      width: '28px',
                      height: '28px',
                    }}
                  >
                    <TrendingUp size={14} />
                  </div>
                  <span>Productivity Score</span>
                </div>
                <div className="preview-mini-val">
                  86 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/100</span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)' }}>↑ 8% today</div>
              </div>
            </div>

            {/* Click to open overlay */}
            <Link href="/dashboard" className="preview-cta-overlay">
              <span>Click to Enter Full Interactive Dashboard &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Feature Grid Section */}
      <section className="landing-features" id="features">
        <div className="section-header">
          <h2 className="section-title">Engineered For Peak Developer Productivity</h2>
          <p className="section-subtitle">
            Every feature is designed to keep you in flow state, eliminate distractions, and
            quantify your coding journey.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div
              className="feature-icon-box"
              style={{ backgroundColor: 'var(--accent-green-light)', color: 'var(--accent-green)' }}
            >
              <Code2 size={20} />
            </div>
            <h3 className="feature-title">90-Day GitHub Heatmap</h3>
            <p className="feature-desc">
              Visual contribution matrix with 13-week history, live streak trackers, and multi-tier
              density color scales.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div
              className="feature-icon-box"
              style={{ backgroundColor: 'var(--brand-blue-light)', color: 'var(--brand-blue)' }}
            >
              <Clock size={20} />
            </div>
            <h3 className="feature-title">Pomodoro Focus Station</h3>
            <p className="feature-desc">
              Circular SVG countdown timer with synthesized Web Audio chimes, focus presets, and
              automatic coding hours logging.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div
              className="feature-icon-box"
              style={{
                backgroundColor: 'var(--accent-orange-light)',
                color: 'var(--accent-orange)',
              }}
            >
              <Flame size={20} />
            </div>
            <h3 className="feature-title">7-Day Habit Matrix</h3>
            <p className="feature-desc">
              Track daily habits with interactive Sunday–Saturday dots, dynamic streaks, and
              celebration audio triggers.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div
              className="feature-icon-box"
              style={{
                backgroundColor: 'var(--accent-purple-light)',
                color: 'var(--accent-purple)',
              }}
            >
              <Layers size={20} />
            </div>
            <h3 className="feature-title">Projects & Sprint Tracking</h3>
            <p className="feature-desc">
              Monitor active workspaces with completion progress bars, priority badges, and quick
              repository shortcuts.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div
              className="feature-icon-box"
              style={{ backgroundColor: 'var(--accent-cyan-light)', color: 'var(--accent-cyan)' }}
            >
              <Terminal size={20} />
            </div>
            <h3 className="feature-title">Spotlight Command Palette</h3>
            <p className="feature-desc">
              Press <kbd>⌘ K</kbd> or <kbd>Ctrl + K</kbd> to search tools, trigger focus sessions,
              and navigate at lightning speed.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div
              className="feature-icon-box"
              style={{ backgroundColor: 'var(--accent-amber-light)', color: 'var(--accent-amber)' }}
            >
              <Compass size={20} />
            </div>
            <h3 className="feature-title">100 Engineering Roadmap</h3>
            <p className="feature-desc">
              Explore 100 capabilities across Full-Stack, Cloud Native, System Design, DevOps, and
              AI Engineering.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Metrics Banner */}
      <section className="landing-metrics-banner">
        <div className="metrics-banner-grid">
          <div className="metric-stat-item">
            <div className="metric-stat-number">523+</div>
            <div className="metric-stat-label">Contributions Visualized</div>
          </div>
          <div className="metric-stat-item">
            <div className="metric-stat-number">100</div>
            <div className="metric-stat-label">Engineering Capabilities</div>
          </div>
          <div className="metric-stat-item">
            <div className="metric-stat-number">32 Days</div>
            <div className="metric-stat-label">Avg Streak Retention</div>
          </div>
          <div className="metric-stat-item">
            <div className="metric-stat-number">0ms</div>
            <div className="metric-stat-label">Offline-First Latency</div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="landing-cta-section">
        <div className="landing-cta-card">
          <h2 className="cta-heading">Ready to Level Up Your Daily Workflow?</h2>
          <p className="cta-sub">
            Join developers building their daily streaks and mastering full-stack architecture with
            DevSlash.
          </p>
          <div className="cta-buttons">
            <Link href="/dashboard" className="btn btn-primary hero-btn-main">
              <Zap size={16} fill="currentColor" /> Open Dashboard Now
            </Link>
            <Link href="/roadmap" className="btn btn-secondary hero-btn-sub">
              View Capabilities Matrix
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="footer-left">
            <div className="landing-brand">
              <div className="sidebar-logo-icon" style={{ width: '26px', height: '26px' }}>
                <Zap size={15} fill="currentColor" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                DevStreak
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              The modern developer command center & capability matrix.
            </p>
          </div>

          <div className="footer-right">
            <Link href="/dashboard" className="card-link-btn">
              Dashboard
            </Link>
            <Link href="/roadmap" className="card-link-btn">
              100 Roadmap
            </Link>
            <a
              href="https://github.com/sagarmurkute/devdash"
              target="_blank"
              rel="noreferrer"
              className="card-link-btn"
            >
              GitHub Repo
            </a>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span>
            &copy; {new Date().getFullYear()} DevStreak &bull; Architected by Sagar Murkute &bull;
            MIT License
          </span>
        </div>
      </footer>
    </div>
  );
}
