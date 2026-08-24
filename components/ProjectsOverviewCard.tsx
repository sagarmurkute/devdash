'use client';

import React from 'react';
import { Zap, Globe, MessageSquare, FileText, ArrowRight } from 'lucide-react';

interface ProjectOverviewItem {
  id: string;
  name: string;
  sub: string;
  progress: number;
  status: 'On Track' | 'In Progress';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const PROJECTS_DATA: ProjectOverviewItem[] = [
  {
    id: '1',
    name: 'DevSlash',
    sub: 'Developer Dashboard',
    progress: 75,
    status: 'On Track',
    icon: <Zap size={15} fill="currentColor" />,
    iconBg: '#0F172A',
    iconColor: '#38BDF8',
  },
  {
    id: '2',
    name: 'Portfolio Website',
    sub: 'Personal Portfolio',
    progress: 40,
    status: 'In Progress',
    icon: <Globe size={15} />,
    iconBg: 'var(--brand-blue-light)',
    iconColor: 'var(--brand-blue)',
  },
  {
    id: '3',
    name: 'AI Chat App',
    sub: 'OpenAI + Next.js',
    progress: 60,
    status: 'On Track',
    icon: <MessageSquare size={15} />,
    iconBg: 'var(--accent-purple-light)',
    iconColor: 'var(--accent-purple)',
  },
  {
    id: '4',
    name: 'Blog Platform',
    sub: 'Minimal Blog',
    progress: 20,
    status: 'In Progress',
    icon: <FileText size={15} />,
    iconBg: 'var(--accent-cyan-light)',
    iconColor: 'var(--accent-cyan)',
  },
];

export default function ProjectsOverviewCard() {
  return (
    <div className="devstreak-card">
      <div className="devstreak-card-header">
        <h3 className="card-heading">Projects Overview</h3>
        <button className="card-link-btn" type="button">
          View all <ArrowRight size={12} />
        </button>
      </div>

      <div className="project-rows-list">
        {PROJECTS_DATA.map((p) => (
          <div key={p.id} className="project-overview-item">
            <div className="project-meta-left">
              <div
                className="project-app-icon"
                style={{ backgroundColor: p.iconBg, color: p.iconColor }}
              >
                {p.icon}
              </div>
              <div>
                <div className="project-name-text">{p.name}</div>
                <div className="project-sub-text">{p.sub}</div>
              </div>
            </div>

            <div className="project-bar-middle">
              <span className="project-percent-text">{p.progress}%</span>
              <div className="project-mini-track">
                <div className="project-mini-fill" style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <span className={`status-pill ${p.status === 'On Track' ? 'on-track' : 'in-progress'}`}>
              ● {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
