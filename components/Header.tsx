'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/lib/theme-context';
import { CodingHoursData } from '@/lib/types';
import { getStorageItem, DEFAULT_CODING_HOURS } from '@/lib/storage';
import { Sun, Moon, Command, FileEdit, Newspaper, Flame, Hourglass } from 'lucide-react';

interface HeaderProps {
  onOpenCmd: () => void;
  onOpenScratchpad: () => void;
  streakCount: number;
  codingHoursData: CodingHoursData;
}

const QUOTES = [
  { quote: 'Simplicity is prerequisite for reliability.', author: 'Dijkstra' },
  { quote: 'Form follows function — eliminate the superfluous.', author: 'Max Bill' },
  { quote: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { quote: 'Consistency is the catalyst of engineering mastery.', author: 'DevDash' },
  { quote: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { quote: 'Clarity precedes architectural elegance.', author: 'Design Maxim' },
];

export default function Header({
  onOpenCmd,
  onOpenScratchpad,
  streakCount,
  codingHoursData,
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState('sagarmurkute');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [greeting, setGreeting] = useState('Good Day');

  useEffect(() => {
    const savedUser = localStorage.getItem('devdash_github_user') || 'sagarmurkute';
    setUsername(savedUser);
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));

    const hour = new Date().getHours();
    if (hour < 5) setGreeting('Late Night Session');
    else if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else if (hour < 22) setGreeting('Good Evening');
    else setGreeting('Night Owl Mode');
  }, []);

  const currentQuote = QUOTES[quoteIndex] || QUOTES[0];
  const percentHours = Math.min(
    100,
    Math.round((codingHoursData.todayTotal / (codingHoursData.target || 1)) * 100)
  );

  return (
    <header className="header-container">
      <div className="header-top-banner">
        <div className="header-greeting-wrap">
          <span className="swiss-tag">SYS // DEVDASH</span>
          <h1 className="greeting-text">
            {greeting}, {username}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div className="motivation-line">
            <span>“{currentQuote.quote}”</span>
            <span className="quote-author">{`// ${currentQuote.author}`}</span>
          </div>

          <Link
            href="/roadmap"
            className="btn btn-primary btn-sm"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.04em' }}
          >
            <Newspaper size={13} style={{ marginRight: '0.3rem' }} /> DISPATCH // 100 ROADMAP
          </Link>
        </div>
      </div>

      <div className="header-metrics-grid">
        {/* Box 1: Developer Status */}
        <div className="header-metric-box">
          <div className="metric-box-header">
            <span className="metric-box-label">WORKSPACE // USER</span>
            <span className="status-indicator"></span>
          </div>
          <div className="metric-box-val">{username}</div>
          <div className="metric-box-sub">Active Sprint &bull; Production Mode</div>
        </div>

        {/* Box 2: GitHub Streak */}
        <div className="header-metric-box">
          <div className="metric-box-header">
            <span className="metric-box-label">STREAK // CONSISTENCY</span>
            <Flame size={14} style={{ color: 'var(--accent-swiss-red)' }} />
          </div>
          <div className="metric-box-val">{streakCount} DAYS</div>
          <div className="metric-box-sub">Rank: Top 5% &bull; Target: 60 Days</div>
        </div>

        {/* Box 3: Daily Coding Hours */}
        <div className="header-metric-box">
          <div className="metric-box-header">
            <span className="metric-box-label">DAILY FOCUS LOG</span>
            <Hourglass size={14} style={{ color: 'var(--text-muted)' }} />
          </div>
          <div className="metric-box-val">
            {codingHoursData.todayTotal}h / {codingHoursData.target}h
          </div>
          <div className="metric-box-sub">{percentHours}% of Daily Goal Completed</div>
        </div>

        {/* Box 4: Command & Utilities Quick Bar */}
        <div className="header-metric-box" style={{ padding: '0.5rem' }}>
          <div className="metric-box-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={onOpenCmd}
              title="Command Palette (Ctrl+K)"
              type="button"
            >
              <Command size={13} /> ^K
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={onOpenScratchpad}
              title="Quick Scratchpad Note"
              type="button"
            >
              <FileEdit size={13} /> Note
            </button>
            <button
              className="btn-icon"
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              type="button"
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
