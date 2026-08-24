'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Home, 
  FolderGit2, 
  CheckSquare, 
  Target, 
  Timer, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Calendar, 
  Crosshair, 
  Trophy, 
  Settings,
  Gem
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'habits', label: 'Habits', icon: Target },
  { id: 'focus', label: 'Focus', icon: Timer },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'goals', label: 'Goals', icon: Crosshair },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="devstreak-sidebar">
      <div>
        {/* Logo & Brand Name */}
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="sidebar-brand-name">DevStreak</span>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
                type="button"
              >
                <Icon size={16} />
                <span className="sidebar-text">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Gamification Level 12 XP Card */}
      <div className="sidebar-xp-card">
        <div className="xp-card-top">
          <span style={{ color: 'var(--text-primary)' }}>Level 12</span>
          <Gem size={15} style={{ color: 'var(--brand-blue)' }} />
        </div>
        <div className="xp-progress-bar">
          <div className="xp-progress-fill" style={{ width: '70%' }} />
        </div>
        <div className="xp-card-sub">
          XP 2,450 / 3,500
        </div>
      </div>
    </aside>
  );
}
