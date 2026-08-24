'use client';

import React, { useState } from 'react';
import { Hourglass, Plus, X, Clock } from 'lucide-react';
import { CodingHoursData } from '@/lib/types';

interface CodingHoursProps {
  data: CodingHoursData;
  onUpdate: (data: CodingHoursData) => void;
}

export default function CodingHours({ data, onUpdate }: CodingHoursProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionHours, setSessionHours] = useState('1.0');
  const [sessionLang, setSessionLang] = useState('JavaScript');

  const percent = Math.min(100, Math.round((data.todayTotal / (data.target || 1)) * 100));

  const logTime = (hours: number, langName = 'JavaScript') => {
    const newTotal = Math.round((data.todayTotal + hours) * 10) / 10;

    // Update languages
    const languages = [...data.languages];
    const langIndex = languages.findIndex((l) => l.name.toLowerCase() === langName.toLowerCase());
    if (langIndex >= 0) {
      languages[langIndex] = {
        ...languages[langIndex],
        hours: Math.round((languages[langIndex].hours + hours) * 10) / 10,
      };
    } else {
      const colors = ['#06b6d4', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'];
      const color = colors[languages.length % colors.length];
      languages.push({ name: langName, hours, color });
    }

    // Update weeklyLog (Sun or last entry)
    const weeklyLog = [...data.weeklyLog];
    if (weeklyLog.length > 0) {
      weeklyLog[weeklyLog.length - 1] = {
        ...weeklyLog[weeklyLog.length - 1],
        hours: newTotal,
      };
    }

    const updatedData: CodingHoursData = {
      ...data,
      todayTotal: newTotal,
      languages,
      weeklyLog,
    };

    onUpdate(updatedData);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hrs = parseFloat(sessionHours);
    if (hrs > 0) {
      logTime(hrs, sessionLang);
      setIsModalOpen(false);
      setSessionHours('1.0');
    }
  };

  return (
    <div className="card coding-hours-card">
      <div className="card-header">
        <div className="card-title-group">
          <div
            className="card-icon"
            style={{ background: 'rgba(245, 158, 11, 0.12)', color: 'var(--accent-amber)' }}
          >
            <Hourglass size={15} />
          </div>
          <div>
            <h2 className="card-title">Daily Coding Hours</h2>
            <p className="card-subtitle">
              Goal: {data.target}h/day &bull; {percent}% completed
            </p>
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          <Plus size={12} /> Log Time
        </button>
      </div>

      <div className="card-body">
        <div className="hours-main-display">
          <div className="hours-metric">
            <div className="hours-number">
              <span>{data.todayTotal}h</span>
              <span className="hours-target">/ {data.target}h</span>
            </div>
            <span className="hours-subtext">
              {data.todayTotal >= data.target
                ? '🎯 Daily Goal Achieved!'
                : `${Math.round((data.target - data.todayTotal) * 10) / 10}h remaining today`}
            </span>
          </div>

          <div className="hours-quick-log">
            <button className="btn btn-secondary btn-sm" onClick={() => logTime(0.5)} type="button">
              +30m
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => logTime(1.0)} type="button">
              +1h
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => logTime(2.0)} type="button">
              +2h
            </button>
          </div>
        </div>

        {/* Multi-color Language Progress Bar */}
        <div className="hours-progress-track">
          {data.languages.map((l, i) => {
            const segWidth = data.todayTotal > 0 ? (l.hours / (data.target || 1)) * 100 : 0;
            return (
              <div
                key={i}
                className="hours-progress-fill"
                style={{ width: `${segWidth}%`, backgroundColor: l.color }}
                title={`${l.name}: ${l.hours}h`}
              />
            );
          })}
        </div>

        {/* Languages Breakdown */}
        <div className="lang-breakdown-list">
          {data.languages.map((l, i) => (
            <div key={i} className="lang-item">
              <div className="lang-left">
                <span className="lang-color-dot" style={{ backgroundColor: l.color }}></span>
                <span>{l.name}</span>
              </div>
              <span className="lang-hours">{l.hours} hrs</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Log Session Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-container"
            style={{ maxWidth: '420px', padding: '1.5rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-header">
              <h3
                className="card-title"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Clock size={16} style={{ color: 'var(--accent-amber)' }} /> Log Coding Session
              </h3>
              <button className="btn-icon" onClick={() => setIsModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form
              onSubmit={handleCustomSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    marginBottom: '0.4rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Hours Spent
                </label>
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="24"
                  className="input"
                  value={sessionHours}
                  onChange={(e) => setSessionHours(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    marginBottom: '0.4rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Language / Technology
                </label>
                <select
                  className="select"
                  value={sessionLang}
                  onChange={(e) => setSessionLang(e.target.value)}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="CSS/HTML">CSS/HTML</option>
                  <option value="Python">Python</option>
                  <option value="Rust">Rust</option>
                  <option value="SQL">SQL</option>
                </select>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.6rem',
                  marginTop: '0.5rem',
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
