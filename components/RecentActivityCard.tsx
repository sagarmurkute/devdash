'use client';

import React from 'react';
import { GitCommit, Timer, Code, Folder, Trophy, ArrowRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    title: 'Pushed 3 commits to DevStreak',
    time: '2 minutes ago',
    icon: <GitCommit size={13} />,
    iconBg: 'var(--accent-orange-light)',
    iconColor: 'var(--accent-orange)'
  },
  {
    id: '2',
    title: 'Completed 2 Pomodoro sessions',
    time: '1 hour ago',
    icon: <Timer size={13} />,
    iconBg: 'var(--accent-orange-light)',
    iconColor: 'var(--accent-orange)'
  },
  {
    id: '3',
    title: 'Solved 5 DSA problems',
    time: '3 hours ago',
    icon: <Code size={13} />,
    iconBg: 'var(--accent-green-light)',
    iconColor: 'var(--accent-green)'
  },
  {
    id: '4',
    title: 'Updated project: Portfolio Website',
    time: '5 hours ago',
    icon: <Folder size={13} />,
    iconBg: 'var(--brand-blue-light)',
    iconColor: 'var(--brand-blue)'
  },
  {
    id: '5',
    title: 'Achieved 32 day coding streak 🏆',
    time: '1 day ago',
    icon: <Trophy size={13} />,
    iconBg: 'var(--accent-amber-light)',
    iconColor: 'var(--accent-amber)'
  }
];

export default function RecentActivityCard() {
  return (
    <div className="devstreak-card">
      <div className="devstreak-card-header">
        <h3 className="card-heading">Recent Activity</h3>
        <button className="card-link-btn" type="button">
          View all <ArrowRight size={12} />
        </button>
      </div>

      <div className="activity-feed-list">
        {ACTIVITIES.map((act) => (
          <div key={act.id} className="activity-feed-item">
            <div className="activity-left">
              <div
                className="activity-icon-wrap"
                style={{ backgroundColor: act.iconBg, color: act.iconColor }}
              >
                {act.icon}
              </div>
              <span className="activity-title-text">{act.title}</span>
            </div>
            <span className="activity-time-text">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
