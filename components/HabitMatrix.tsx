'use client';

import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Check,
  Flame,
  X,
  Code,
  BookOpen,
  GitCommit,
  Crosshair,
  Zap,
} from 'lucide-react';
import { HabitItem } from '@/lib/types';
import { playSuccessChime } from '@/lib/audio';

interface HabitMatrixProps {
  habits: HabitItem[];
  onUpdate: (habits: HabitItem[]) => void;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitMatrix({ habits, onUpdate }: HabitMatrixProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newIcon, setNewIcon] = useState('Code');

  const totalChecks = habits.reduce((acc, h) => acc + h.days.length, 0);
  const completedChecks = habits.reduce((acc, h) => acc + h.days.filter(Boolean).length, 0);
  const completionRate = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;

  const toggleDay = (habitId: string, dayIndex: number) => {
    const updated = habits.map((h) => {
      if (h.id === habitId) {
        const nextDays = [...h.days];
        const willCheck = !nextDays[dayIndex];
        nextDays[dayIndex] = willCheck;

        if (willCheck) {
          playSuccessChime();
        }

        return {
          ...h,
          days: nextDays,
          streak: willCheck ? h.streak + 1 : Math.max(0, h.streak - 1),
        };
      }
      return h;
    });

    onUpdate(updated);
  };

  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newHabit: HabitItem = {
      id: 'h-' + Date.now(),
      title: newTitle.trim(),
      icon: newIcon,
      days: [false, false, false, false, false, false, false],
      streak: 0,
    };

    onUpdate([...habits, newHabit]);
    setNewTitle('');
    setIsAddModalOpen(false);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen size={14} />;
      case 'GitCommit':
        return <GitCommit size={14} />;
      case 'Crosshair':
        return <Crosshair size={14} />;
      case 'Zap':
        return <Zap size={14} />;
      case 'Code':
      default:
        return <Code size={14} />;
    }
  };

  return (
    <div className="card habits-card">
      <div className="card-header">
        <div className="card-title-group">
          <div
            className="card-icon"
            style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)' }}
          >
            <CheckSquare size={15} />
          </div>
          <div>
            <h2 className="card-title">Developer Habit Matrix</h2>
            <p className="card-subtitle">Weekly Consistency: {completionRate}% Target Met</p>
          </div>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setIsAddModalOpen(true)}
          type="button"
        >
          <Plus size={12} /> New Habit
        </button>
      </div>

      <div className="card-body" style={{ overflowX: 'auto' }}>
        <table className="habits-table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Habit Routine</th>
              {DAYS_OF_WEEK.map((d) => (
                <th key={d}>{d}</th>
              ))}
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((h) => (
              <tr key={h.id}>
                <td>
                  <div className="habit-name-cell">
                    <span style={{ color: 'var(--text-secondary)' }}>{renderIcon(h.icon)}</span>
                    <span>{h.title}</span>
                  </div>
                </td>
                {h.days.map((checked, idx) => (
                  <td key={idx}>
                    <button
                      className={`habit-check-btn ${checked ? 'checked' : ''}`}
                      onClick={() => toggleDay(h.id, idx)}
                      title={`Toggle ${DAYS_OF_WEEK[idx]}`}
                      type="button"
                    >
                      <Check size={12} />
                    </button>
                  </td>
                ))}
                <td>
                  <div className="habit-streak-pill">
                    <Flame size={12} /> {h.streak}d
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Habit Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
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
                <Plus size={16} style={{ color: 'var(--accent-emerald)' }} /> Add Daily Dev Habit
              </h3>
              <button className="btn-icon" onClick={() => setIsAddModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form
              onSubmit={handleAddHabit}
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
                  Habit Routine
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Read RFC or Docs 15m"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
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
                  Icon Symbol
                </label>
                <select
                  className="select"
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                >
                  <option value="Code">Code (&lt;/&gt;)</option>
                  <option value="BookOpen">Reading (Book)</option>
                  <option value="GitCommit">Git (Commit)</option>
                  <option value="Crosshair">Focus (Target)</option>
                  <option value="Zap">Speed (Lightning)</option>
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
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Routine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
