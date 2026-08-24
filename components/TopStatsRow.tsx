'use client';

import React from 'react';
import { Flame, Clock, CheckCircle2, Folder, TrendingUp, ArrowUp } from 'lucide-react';

interface TopStatsProps {
  streak?: number;
  codingHours?: number;
  tasksCompleted?: number;
  activeProjectsCount?: number;
  productivityScore?: number;
}

export default function TopStatsRow({
  streak = 32,
  codingHours = 4.6,
  tasksCompleted = 12,
  activeProjectsCount = 8,
  productivityScore = 86,
}: TopStatsProps) {
  return (
    <div className="top-stats-row">
      {/* 1. Current Streak */}
      <div className="stat-card">
        <div className="stat-card-header">
          <div
            className="stat-card-icon"
            style={{ backgroundColor: 'var(--accent-orange-light)', color: 'var(--accent-orange)' }}
          >
            <Flame size={17} />
          </div>
          <span className="stat-card-title">Current Streak</span>
        </div>
        <div className="stat-card-val">
          {streak} <span className="stat-card-unit">days</span>
        </div>
        <div className="stat-card-sub" style={{ color: 'var(--accent-green)' }}>
          Best: 47 days
        </div>
      </div>

      {/* 2. Coding Hours */}
      <div className="stat-card">
        <div className="stat-card-header">
          <div
            className="stat-card-icon"
            style={{ backgroundColor: 'var(--brand-blue-light)', color: 'var(--brand-blue)' }}
          >
            <Clock size={17} />
          </div>
          <span className="stat-card-title">Coding Hours</span>
        </div>
        <div className="stat-card-val">
          {codingHours} <span className="stat-card-unit">hrs</span>
        </div>
        <div className="stat-card-sub" style={{ color: 'var(--accent-green)' }}>
          <ArrowUp size={12} /> 12% from yesterday
        </div>
      </div>

      {/* 3. Tasks Completed */}
      <div className="stat-card">
        <div className="stat-card-header">
          <div
            className="stat-card-icon"
            style={{ backgroundColor: 'var(--brand-blue-light)', color: 'var(--brand-blue)' }}
          >
            <CheckCircle2 size={17} />
          </div>
          <span className="stat-card-title">Tasks Completed</span>
        </div>
        <div className="stat-card-val">
          {tasksCompleted} <span className="stat-card-unit">tasks</span>
        </div>
        <div className="stat-card-sub" style={{ color: 'var(--accent-green)' }}>
          <ArrowUp size={12} /> 20% from yesterday
        </div>
      </div>

      {/* 4. Active Projects */}
      <div className="stat-card">
        <div className="stat-card-header">
          <div
            className="stat-card-icon"
            style={{ backgroundColor: 'var(--brand-blue-light)', color: 'var(--brand-blue)' }}
          >
            <Folder size={17} />
          </div>
          <span className="stat-card-title">Active Projects</span>
        </div>
        <div className="stat-card-val">
          {activeProjectsCount} <span className="stat-card-unit">projects</span>
        </div>
        <div className="stat-card-sub" style={{ color: 'var(--accent-amber)' }}>
          2 due this week
        </div>
      </div>

      {/* 5. Productivity Score */}
      <div className="stat-card">
        <div className="stat-card-header">
          <div
            className="stat-card-icon"
            style={{ backgroundColor: 'var(--accent-green-light)', color: 'var(--accent-green)' }}
          >
            <TrendingUp size={17} />
          </div>
          <span className="stat-card-title">Productivity Score</span>
        </div>
        <div className="stat-card-val">
          {productivityScore} <span className="stat-card-unit">/100</span>
        </div>
        <div className="stat-card-sub" style={{ color: 'var(--accent-green)' }}>
          <ArrowUp size={12} /> 8% from yesterday
        </div>
      </div>
    </div>
  );
}
