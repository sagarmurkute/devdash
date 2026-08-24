'use client';

import React, { useState, useEffect } from 'react';
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
  GitCommit,
  Laptop,
  Check,
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';

export default function DevSlashLandingPage() {
  const [activeTasks, setActiveTasks] = useState([
    { id: '1', title: 'Implement Hero Moving Gradient', done: true },
    { id: '2', title: 'Connect Local LLM Copilot Bridge', done: false },
    { id: '3', title: 'Review System Architecture Specs', done: false },
  ]);

  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPomoRunning && pomoSeconds > 0) {
      interval = setInterval(() => {
        setPomoSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoSeconds]);

  const toggleTask = (id: string) => {
    setActiveTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const formatPomoTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="landing-dark-wrapper">
      {/* Background Animated Gradient Mesh & Orbs */}
      <div className="landing-bg-mesh">
        <div className="landing-grid-pattern" />
        <div className="gradient-orb orb-blue" />
        <div className="gradient-orb orb-purple" />
        <div className="gradient-orb orb-cyan" />
      </div>

      {/* 1. Header Navigation Bar */}
      <header className="dark-nav">
        <div className="dark-nav-container">
          <Link href="/" className="dark-brand">
            <div className="dark-logo-icon">
              <Zap size={19} fill="currentColor" />
            </div>
            <span className="dark-brand-title">DevSlash</span>
          </Link>

          <nav className="dark-nav-links">
            <a href="#hero">Overview</a>
            <a href="#features">Features</a>
            <Link href="/roadmap">100 Roadmap</Link>
            <a href="#architecture">Architecture</a>
            <a href="https://github.com/sagarmurkute/devdash" target="_blank" rel="noreferrer">
              Docs
            </a>
          </nav>

          <div className="dark-nav-actions">
            <a
              href="https://github.com/sagarmurkute/devdash"
              target="_blank"
              rel="noreferrer"
              className="btn-github-star"
              title="Star on GitHub"
            >
              <GithubIcon size={14} />
              <span>Star</span>
              <span className="github-star-count">1.4k</span>
            </a>
            <Link href="/dashboard" className="btn-launch-glow">
              <span>Launch App</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="dark-hero">
        {/* Shimmering Badge */}
        <div className="dark-hero-badge">
          <Sparkles size={14} style={{ color: '#60A5FA' }} />
          <span>DevSlash v2.2 &bull; The Ultra-Fast Developer Command Center</span>
        </div>

        {/* H1 Main Headline with Moving Gradient */}
        <h1 className="dark-hero-title">
          Master Your Daily Streak.
          <br />
          <span className="moving-gradient-text">Command Your Engineering.</span>
        </h1>

        {/* Subtitle */}
        <p className="dark-hero-subtitle">
          A high-velocity, single-pane developer cockpit designed for engineers who build daily.
          Track your GitHub matrix, automate Pomodoro focus sessions, manage sprint agendas, and
          execute across 100 engineering capabilities.
        </p>

        {/* Action Button Cluster */}
        <div className="dark-hero-cta-group">
          <Link href="/dashboard" className="hero-cta-primary">
            <Zap size={18} fill="currentColor" />
            <span>Open Command Center</span>
          </Link>
          <Link href="/roadmap" className="hero-cta-secondary">
            <Compass size={17} style={{ color: '#60A5FA' }} />
            <span>Explore 100 Capabilities</span>
          </Link>
          <a
            href="https://github.com/sagarmurkute/devdash"
            target="_blank"
            rel="noreferrer"
            className="hero-cta-secondary"
          >
            <GithubIcon size={16} />
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* 3. Hero Interactive Visual Live Preview Frame */}
        <div className="dark-preview-wrapper">
          <div className="dark-preview-glow" />
          <div className="dark-preview-card">
            {/* Window Chrome Topbar */}
            <div className="dark-preview-topbar">
              <div className="dark-preview-dots">
                <span className="dark-pdot red" />
                <span className="dark-pdot yellow" />
                <span className="dark-pdot green" />
              </div>
              <div className="dark-preview-urlbar">
                <Terminal size={12} style={{ color: '#60A5FA' }} />
                <span>devslash.dev/command-center</span>
              </div>
              <div className="dark-preview-status">
                <span className="pulse-green-dot" />
                <span>LIVE SYNC ACTIVE</span>
              </div>
            </div>

            {/* Live Interactive Widget Showcase */}
            <div className="dark-preview-grid">
              {/* Widget 1: Streak & Git Metric */}
              <div className="dark-widget-card">
                <div className="dark-widget-header">
                  <span>GITHUB STREAK</span>
                  <Flame size={16} style={{ color: '#F97316' }} />
                </div>
                <div className="dark-widget-val" style={{ color: '#F97316' }}>
                  32 <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Days</span>
                </div>
                <div className="dark-widget-sub" style={{ color: '#34D399' }}>
                  ▲ 100% Target Met This Month
                </div>
              </div>

              {/* Widget 2: Interactive Focus Session */}
              <div className="dark-widget-card">
                <div className="dark-widget-header">
                  <span>POMODORO FOCUS</span>
                  <Clock size={16} style={{ color: '#60A5FA' }} />
                </div>
                <div className="dark-widget-val" style={{ color: '#60A5FA' }}>
                  {formatPomoTime(pomoSeconds)}
                </div>
                <button
                  type="button"
                  onClick={() => setIsPomoRunning(!isPomoRunning)}
                  style={{
                    background: isPomoRunning
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(59, 130, 246, 0.2)',
                    border: `1px solid ${isPomoRunning ? '#EF4444' : '#3B82F6'}`,
                    color: isPomoRunning ? '#FCA5A5' : '#93C5FD',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: '2px',
                    width: 'fit-content',
                  }}
                >
                  {isPomoRunning ? 'Pause Session' : '▶ Start Timer'}
                </button>
              </div>

              {/* Widget 3: Interactive Today's Agenda */}
              <div className="dark-widget-card" style={{ gridColumn: 'span 2' }}>
                <div className="dark-widget-header">
                  <span>TODAY&apos;S SPRINT AGENDA</span>
                  <CheckCircle2 size={16} style={{ color: '#34D399' }} />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                    marginTop: '2px',
                  }}
                >
                  {activeTasks.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => toggleTask(t.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        color: t.done ? '#64748B' : '#E2E8F0',
                        textDecoration: t.done ? 'line-through' : 'none',
                      }}
                    >
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '4px',
                          border: `1px solid ${t.done ? '#10B981' : '#475569'}`,
                          backgroundColor: t.done ? '#10B981' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {t.done && <Check size={10} color="#FFFFFF" />}
                      </div>
                      <span>{t.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom preview banner */}
            <Link
              href="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: 'rgba(37, 99, 235, 0.08)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.75rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#60A5FA',
                textDecoration: 'none',
              }}
            >
              <span>Click to Enter Fullscreen Interactive Command Center</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 4. Trust & Capability Metrics Bar */}
        <div className="dark-trust-bar">
          <div>
            <div className="trust-metric-val">50+</div>
            <div className="trust-metric-label">Built-in Engineering Widgets</div>
          </div>
          <div>
            <div className="trust-metric-val">100%</div>
            <div className="trust-metric-label">Local-First & Private Data</div>
          </div>
          <div>
            <div className="trust-metric-val">&lt; 1ms</div>
            <div className="trust-metric-label">Zero-Latency State Sync</div>
          </div>
          <div>
            <div className="trust-metric-val">100</div>
            <div className="trust-metric-label">Full-Stack Architecture Matrix</div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          color: '#64748B',
          fontSize: '0.8rem',
        }}
      >
        <p>
          Architected & Crafted with ⚡ by{' '}
          <a
            href="https://github.com/sagarmurkute"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#93C5FD', textDecoration: 'none', fontWeight: 600 }}
          >
            Sagar Murkute
          </a>{' '}
          &bull; DevSlash v2.2.0
        </p>
      </footer>
    </div>
  );
}
