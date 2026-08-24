'use client';

import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Calendar, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface HeaderProps {
  onOpenCmd: () => void;
  onOpenNotifications?: () => void;
}

export default function DevStreakHeader({ onOpenCmd, onOpenNotifications }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [greeting, setGreeting] = useState('Good morning');
  const [currentDateFormatted, setCurrentDateFormatted] = useState('May 18, 2025');
  const [currentDayName, setCurrentDayName] = useState('Sunday');
  const [userName, setUserName] = useState('Sagar Kumar');

  useEffect(() => {
    const savedUser = localStorage.getItem('devdash_github_user') || 'Sagar';
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDateFormatted(now.toLocaleDateString('en-US', options));
    setCurrentDayName(now.toLocaleDateString('en-US', { weekday: 'long' }));
    if (savedUser && savedUser !== 'sagarmurkute') {
      setUserName(savedUser);
    }
  }, []);

  return (
    <header className="devstreak-header">
      {/* Left: Greeting & Subtitle */}
      <div className="header-left-greeting">
        <h1>{greeting}, {userName.split(' ')[0]} 👋</h1>
        <p>Let&apos;s build something amazing today.</p>
      </div>

      {/* Right: Controls (Search, Bell, User Pill, Date Badge) */}
      <div className="header-right-controls">
        {/* Search Bar with ⌘ K shortcut */}
        <div className="header-search-bar" onClick={onOpenCmd}>
          <Search size={14} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
          <input 
            type="text" 
            className="header-search-input" 
            placeholder="Search anything..." 
            readOnly 
          />
          <kbd className="header-search-kbd">⌘ K</kbd>
        </div>

        {/* Theme Toggle Button */}
        <button 
          className="header-notification-btn" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          type="button"
        >
          {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
        </button>

        {/* Notification Bell with Red Dot */}
        <button 
          className="header-notification-btn" 
          onClick={onOpenNotifications}
          title="Notifications"
          type="button"
        >
          <Bell size={15} />
          <span className="notification-dot" />
        </button>

        {/* User Profile Pill */}
        <div className="header-user-pill" title="User Profile">
          <div className="user-avatar">
            SK
          </div>
          <div className="user-info-text">
            <span className="user-name">{userName}</span>
            <span className="user-role">Full Stack Developer</span>
          </div>
          <ChevronDown size={14} style={{ color: 'var(--text-light)' }} />
        </div>

        {/* Current Date Badge */}
        <div className="header-date-badge">
          <Calendar size={18} style={{ color: 'var(--text-muted)' }} />
          <div>
            <div className="date-text-primary">{currentDateFormatted}</div>
            <div className="date-text-sub">{currentDayName}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
