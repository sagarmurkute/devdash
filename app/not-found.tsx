'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass, ArrowLeft, Zap, Terminal, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found-container">
      {/* Brand Header */}
      <div className="not-found-brand">
        <div className="sidebar-logo-icon" style={{ width: '38px', height: '38px' }}>
          <Zap size={22} fill="currentColor" />
        </div>
        <span
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}
        >
          DevSlash
        </span>
      </div>

      {/* Main 404 Card */}
      <div className="not-found-card">
        {/* Animated Error Code Badge */}
        <div className="not-found-badge">
          <Terminal size={14} style={{ color: 'var(--brand-blue)' }} />
          <span>HTTP 404 &bull; ROUTE_NOT_FOUND</span>
        </div>

        <h1 className="not-found-glitch-title">404</h1>

        <h2 className="not-found-subtitle">Lost in the Code Matrix</h2>

        <p className="not-found-description">
          The page or endpoint you are looking for does not exist, has been moved, or encountered a
          git conflict in hyperspace.
        </p>

        {/* Action Buttons */}
        <div className="not-found-actions">
          <Link href="/" className="btn btn-primary">
            <Home size={15} /> Back to Dashboard
          </Link>
          <Link href="/roadmap" className="btn btn-secondary">
            <Compass size={15} /> 100 Engineering Roadmap
          </Link>
        </div>

        {/* Quick Links Footer */}
        <div className="not-found-quick-links">
          <span>Quick Destinations:</span>
          <div className="quick-links-row">
            <Link href="/" className="card-link-btn">
              ⚡ Streak Matrix
            </Link>
            <span style={{ color: 'var(--border-hover)' }}>&bull;</span>
            <Link href="/roadmap" className="card-link-btn">
              🗺️ Capabilities Matrix
            </Link>
            <span style={{ color: 'var(--border-hover)' }}>&bull;</span>
            <button className="card-link-btn" onClick={() => window.history.back()} type="button">
              <ArrowLeft size={12} /> Previous Page
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Credits */}
      <div className="not-found-credits">
        <span>DevSlash &bull; Designed & Built by Sagar Murkute</span>
      </div>
    </div>
  );
}
