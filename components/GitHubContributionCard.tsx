'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { HeatmapCell } from '@/lib/types';

interface GitHubContributionCardProps {
  streak?: number;
  totalContributions?: number;
}

export default function GitHubContributionCard({
  streak = 32,
  totalContributions = 523,
}: GitHubContributionCardProps) {
  const [heatmapCells, setHeatmapCells] = useState<HeatmapCell[]>([]);
  const [period, setPeriod] = useState('Last 90 days');

  useEffect(() => {
    // Generate 91 days (13 weeks x 7 days) of sample data patterned after the reference
    const days = 91;
    const data: HeatmapCell[] = [];
    const today = new Date();

    // Pattern matching the image (higher density towards recent weeks in April/May)
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const weekIndex = Math.floor((days - 1 - i) / 7);

      let level = 0;
      let count = 0;

      if (weekIndex >= 8) {
        // High density in last 5 weeks
        const r = Math.random();
        if (r > 0.15) {
          level = Math.floor(Math.random() * 3) + 2; // levels 2, 3, 4
          count = level * 3 + Math.floor(Math.random() * 4);
        } else if (r > 0.05) {
          level = 1;
          count = 2;
        }
      } else if (weekIndex >= 4) {
        // Medium density in middle weeks
        const r = Math.random();
        if (r > 0.4) {
          level = Math.floor(Math.random() * 3) + 1;
          count = level * 2 + 1;
        }
      } else {
        // Light density in earlier weeks
        const r = Math.random();
        if (r > 0.6) {
          level = Math.random() > 0.5 ? 1 : 2;
          count = level * 2;
        }
      }

      data.push({
        date: date.toISOString().split('T')[0],
        formattedDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        level,
        count,
      });
    }

    setHeatmapCells(data);
  }, []);

  return (
    <div className="devstreak-card">
      <div className="devstreak-card-header">
        <h3 className="card-heading">GitHub Contribution</h3>
        <button
          className="focus-mode-dropdown"
          style={{
            padding: '0.2rem 0.65rem',
            fontSize: '0.72rem',
            borderRadius: 'var(--radius-control)',
          }}
          type="button"
        >
          <span>{period}</span>
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="github-heatmap-container">
        {/* 90-day Cells Grid */}
        <div className="github-grid-cells">
          {heatmapCells.map((cell, idx) => (
            <div
              key={idx}
              className="gh-cell"
              data-level={cell.level}
              title={`${cell.count} contributions on ${cell.formattedDate}`}
            />
          ))}
        </div>

        {/* Months Row */}
        <div className="github-months-row">
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
        </div>

        {/* Summary Footer */}
        <div className="github-footer-row">
          <span>{totalContributions} contributions in the last 90 days</span>
          <span>
            Longest streak: <strong style={{ color: 'var(--accent-green)' }}>{streak} days</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
