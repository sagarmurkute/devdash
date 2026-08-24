'use client';

import React from 'react';
import { Newspaper, ArrowUpRight } from 'lucide-react';
import { TechFeedItem } from '@/lib/types';

const FEEDS: TechFeedItem[] = [
  {
    title: 'Designing High-Performance React & Next.js Architecture',
    source: 'HackerNews',
    points: '248 pts',
    time: '2h ago',
    tag: 'Architecture',
  },
  {
    title: 'The Modern State of Web Workers & Offline Web Apps',
    source: 'Dev.to',
    points: '182 pts',
    time: '4h ago',
    tag: 'Web',
  },
  {
    title: 'Building resilient CLI pipelines with Git hooks',
    source: 'GitHub Blog',
    points: '315 pts',
    time: '6h ago',
    tag: 'DevOps',
  },
  {
    title: 'Why Micro-interactions make or break Developer Tooling',
    source: 'UI Trends',
    points: '194 pts',
    time: '8h ago',
    tag: 'Design',
  },
];

export default function TechFeed() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <div
            className="card-icon"
            style={{ background: 'rgba(245, 158, 11, 0.12)', color: 'var(--accent-amber)' }}
          >
            <Newspaper size={15} />
          </div>
          <div>
            <h2 className="card-title">Tech Radar & Feed</h2>
            <p className="card-subtitle">Curated Developer Intelligence</p>
          </div>
        </div>
        <span className="badge badge-amber">Live</span>
      </div>

      <div className="card-body">
        <div className="tech-feed-list">
          {FEEDS.map((f, idx) => (
            <div
              key={idx}
              className="tech-feed-item"
              style={{ cursor: 'pointer' }}
              onClick={() => alert(`Opening: "${f.title}"`)}
            >
              <div>
                <div className="tech-feed-title">{f.title}</div>
                <div className="tech-feed-meta">
                  <span className="badge badge-indigo">{f.tag}</span>
                  <span>{f.source}</span> &bull;
                  <span>{f.points}</span> &bull;
                  <span>{f.time}</span>
                </div>
              </div>
              <ArrowUpRight size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
