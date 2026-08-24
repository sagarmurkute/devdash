'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sun,
  Moon,
  Star,
  Sparkles,
  Lock,
  Check,
  ThumbsUp,
  ArrowUpRight,
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import { useTheme } from '@/lib/theme-context';
import { ROADMAP_DATA } from '@/lib/roadmap-data';
import { playSuccessChime } from '@/lib/audio';

export default function RoadmapPage() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [unlockedSections, setUnlockedSections] = useState<Record<number, boolean>>({});
  const [upvotes, setUpvotes] = useState<Record<string, boolean>>({});
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedVotes = localStorage.getItem('devdash_roadmap_upvotes');
      if (savedVotes) setUpvotes(JSON.parse(savedVotes));

      const savedUnlocked = localStorage.getItem('devdash_unlocked_sections');
      if (savedUnlocked) setUnlockedSections(JSON.parse(savedUnlocked));
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;

    const subs = JSON.parse(localStorage.getItem('devdash_subscribers') || '[]');
    subs.push({ email: subscriberEmail.trim(), date: new Date().toISOString() });
    localStorage.setItem('devdash_subscribers', JSON.stringify(subs));

    setSubscribeStatus(`✓ Successfully subscribed ${subscriberEmail} to DevSlash Dispatch!`);
    setSubscriberEmail('');
    playSuccessChime();
    setTimeout(() => setSubscribeStatus(''), 4000);
  };

  const unlockSection = (catIdx: number) => {
    const next = { ...unlockedSections, [catIdx]: true };
    setUnlockedSections(next);
    localStorage.setItem('devdash_unlocked_sections', JSON.stringify(next));
    playSuccessChime();
  };

  const toggleUpvote = (featureId: string) => {
    const next = { ...upvotes, [featureId]: !upvotes[featureId] };
    setUpvotes(next);
    localStorage.setItem('devdash_roadmap_upvotes', JSON.stringify(next));
  };

  const toggleSectionOpen = (catIdx: number) => {
    setOpenSections((prev) => ({ ...prev, [catIdx]: !prev[catIdx] }));
  };

  // Calculate matching specs
  const query = searchQuery.toLowerCase().trim();
  let totalVisible = 0;

  return (
    <div className="newsletter-wrapper">
      {/* Editorial Masthead */}
      <header className="masthead">
        <div className="masthead-top">
          <div>DEVDASH DISPATCH &bull; ISSUE #01 &bull; ROADMAP SPECIAL</div>
          <nav className="masthead-nav">
            <Link href="/">
              <ArrowLeft size={13} /> BACK TO DASHBOARD
            </Link>
            <button
              className="btn-icon"
              onClick={toggleTheme}
              title="Toggle Theme"
              style={{ height: '26px', width: '26px' }}
              type="button"
            >
              {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
            </button>
          </nav>
        </div>

        <h1 className="masthead-title">The Next 100 Capabilities</h1>
        <p className="masthead-subtitle">
          An engineering manifesto and comprehensive 100-feature roadmap for the ultimate minimalist
          developer command center.
        </p>
      </header>

      {/* Creator & Architecture Credits */}
      <section className="author-credits-card">
        <div className="author-left">
          <div className="author-avatar">SM</div>
          <div className="author-info">
            <h4>Architected & Designed by Sagar Murkute</h4>
            <p>Lead Engineer &bull; Software Craftsman &bull; Creator of DevSlash</p>
          </div>
        </div>
        <div className="author-links">
          <a
            href="https://github.com/sagarmurkute"
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary btn-sm"
          >
            <GithubIcon size={13} style={{ marginRight: '0.25rem' }} /> @sagarmurkute
          </a>
          <a
            href="https://github.com/sagarmurkute/devdash"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
          >
            <Star size={13} /> Star on GitHub
          </a>
        </div>
      </section>

      {/* Newsletter Subscription Box */}
      <section className="newsletter-subscribe-box">
        <div className="newsletter-subscribe-header">
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Subscribe to DevSlash Release Notes
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Receive changelogs, architecture deep dives, and early feature access directly in your
              inbox.
            </p>
          </div>
          <span className="badge badge-emerald">Weekly Dispatch</span>
        </div>
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your developer email (e.g. sagar@engineer.dev)"
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
        {subscribeStatus && (
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', minHeight: '16px' }}>
            {subscribeStatus}
          </div>
        )}
      </section>

      {/* 100 Features Roadmap Matrix */}
      <main>
        <div className="roadmap-controls">
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
              The 100-Feature Matrix
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              All 10 category dropdowns are closed by default. Open any section and star the repo to
              unlock feature specs.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              className="roadmap-search-input"
              placeholder="Search 100 features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="badge badge-indigo">
              {ROADMAP_DATA.reduce((acc, cat) => {
                const matches = cat.features.filter(
                  (f) =>
                    !query ||
                    f.name.toLowerCase().includes(query) ||
                    f.desc.toLowerCase().includes(query) ||
                    f.id.includes(query)
                );
                return acc + matches.length;
              }, 0)}{' '}
              / 100
            </span>
          </div>
        </div>

        <div>
          {ROADMAP_DATA.map((cat, catIdx) => {
            const filteredFeatures = cat.features.filter(
              (f) =>
                !query ||
                f.name.toLowerCase().includes(query) ||
                f.desc.toLowerCase().includes(query) ||
                f.id.includes(query)
            );

            if (filteredFeatures.length === 0) return null;
            totalVisible += filteredFeatures.length;

            const isUnlocked = !!unlockedSections[catIdx];
            const isSectionOpen = query.length > 0 ? true : !!openSections[catIdx];

            return (
              <div key={cat.num} className="roadmap-accordion-item">
                <div className="roadmap-accordion-header" onClick={() => toggleSectionOpen(catIdx)}>
                  <div className="category-title-group">
                    <span className="category-num">{`// SECTION ${cat.num}`}</span>
                    <span className="category-title">{cat.category}</span>
                    <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                      {filteredFeatures.length} Specs
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {isSectionOpen ? '▲' : '▼'}
                  </span>
                </div>

                {isSectionOpen && (
                  <div className="accordion-content-inner">
                    {/* Star Repository Gate Banner */}
                    <div className="star-repo-gate-banner">
                      <div className="gate-left">
                        <Sparkles size={18} style={{ color: 'var(--accent-amber)' }} />
                        <div>
                          <div className="gate-title">
                            Star Repository on GitHub to Unlock Full Feature Specs & Vote
                          </div>
                          <div className="gate-sub">
                            Support DevDash open-source development by Sagar Murkute on GitHub.
                          </div>
                        </div>
                      </div>
                      <div className="gate-actions">
                        <a
                          href="https://github.com/sagarmurkute/devdash"
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary btn-sm"
                          onClick={() => setTimeout(() => unlockSection(catIdx), 600)}
                        >
                          <Star size={12} /> Star on GitHub
                        </a>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => unlockSection(catIdx)}
                        >
                          {isUnlocked ? (
                            <>
                              <Check size={12} /> Unlocked
                            </>
                          ) : (
                            <>
                              <Lock size={12} /> Reveal 10 Features
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Features Grid */}
                    {!isUnlocked ? (
                      <div
                        style={{
                          textAlign: 'center',
                          padding: '2rem',
                          border: '1px dashed var(--border-glass)',
                        }}
                      >
                        <Lock
                          size={28}
                          style={{ margin: '0 auto 0.5rem', color: 'var(--text-muted)' }}
                        />
                        <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                          10 Detailed Engineering Specifications Hidden
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Please star the repository on GitHub or click &quot;Reveal 10
                          Features&quot; above to view full technical breakdowns and vote.
                        </p>
                      </div>
                    ) : (
                      <div className="feature-list">
                        {filteredFeatures.map((f) => {
                          const isVoted = !!upvotes[f.id];
                          const voteCount = (parseInt(f.id, 10) % 7) + (isVoted ? 1 : 0) + 14;

                          return (
                            <div key={f.id} className="feature-card">
                              <div>
                                <div className="feature-top">
                                  <span className="feature-id">SPEC #{f.id}</span>
                                  <span className="badge badge-emerald">Planned</span>
                                </div>
                                <div className="feature-name">{f.name}</div>
                                <div className="feature-desc">{f.desc}</div>
                              </div>

                              <div className="feature-footer">
                                <span
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-muted)',
                                  }}
                                >
                                  Priority: High
                                </span>
                                <button
                                  type="button"
                                  className={`btn-upvote ${isVoted ? 'voted' : ''}`}
                                  onClick={() => toggleUpvote(f.id)}
                                >
                                  {isVoted ? <Check size={12} /> : <ThumbsUp size={12} />}
                                  <span>{voteCount}</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Newsletter Footer */}
      <footer className="dispatch-footer">
        <div>
          <strong>DevDash</strong> — Conceived, designed, and engineered with precision by{' '}
          <strong>Sagar Murkute</strong>.
        </div>
        <div>
          <a
            href="https://github.com/sagarmurkute/devdash"
            target="_blank"
            rel="noreferrer"
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            GitHub Repository <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}
