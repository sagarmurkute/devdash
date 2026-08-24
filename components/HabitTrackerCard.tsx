'use client';

import React, { useState } from 'react';
import { Code, BookOpen, Brain, Dumbbell, ArrowRight } from 'lucide-react';
import { playSuccessChime } from '@/lib/audio';

interface HabitItemCard {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  dots: ('completed' | 'half' | 'none')[];
  streak: number;
}

const INITIAL_HABITS: HabitItemCard[] = [
  {
    id: '1',
    name: 'Code Daily',
    icon: <Code size={13} />,
    iconBg: 'var(--accent-green-light)',
    iconColor: 'var(--accent-green)',
    dots: ['completed', 'completed', 'completed', 'completed', 'completed', 'completed', 'completed'],
    streak: 32
  },
  {
    id: '2',
    name: 'Read Books',
    icon: <BookOpen size={13} />,
    iconBg: 'var(--accent-amber-light)',
    iconColor: 'var(--accent-amber)',
    dots: ['completed', 'completed', 'completed', 'completed', 'half', 'none', 'none'],
    streak: 15
  },
  {
    id: '3',
    name: 'DSA Practice',
    icon: <Brain size={13} />,
    iconBg: 'var(--accent-rose-light)',
    iconColor: 'var(--accent-rose)',
    dots: ['completed', 'completed', 'completed', 'half', 'none', 'none', 'none'],
    streak: 18
  },
  {
    id: '4',
    name: 'Workout',
    icon: <Dumbbell size={13} />,
    iconBg: 'var(--accent-cyan-light)',
    iconColor: 'var(--accent-cyan)',
    dots: ['completed', 'completed', 'completed', 'completed', 'completed', 'half', 'none'],
    streak: 12
  }
];

const DAYS_HEADER = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function HabitTrackerCard() {
  const [habits, setHabits] = useState<HabitItemCard[]>(INITIAL_HABITS);

  const toggleDot = (habitId: string, dotIdx: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const nextDots = [...h.dots];
          const current = nextDots[dotIdx];
          const nextState: 'completed' | 'half' | 'none' = current === 'completed' ? 'none' : 'completed';
          nextDots[dotIdx] = nextState;

          if (nextState === 'completed') {
            playSuccessChime();
          }

          return {
            ...h,
            dots: nextDots,
            streak: nextState === 'completed' ? h.streak + 1 : Math.max(0, h.streak - 1)
          };
        }
        return h;
      })
    );
  };

  return (
    <div className="devstreak-card">
      <div className="devstreak-card-header">
        <h3 className="card-heading">Habit Tracker</h3>
        <button className="card-link-btn" type="button">
          View all <ArrowRight size={12} />
        </button>
      </div>

      <div className="habit-rows-list">
        {habits.map((h) => (
          <div key={h.id} className="habit-row-item">
            <div className="habit-left-info">
              <div
                className="habit-icon-sq"
                style={{ backgroundColor: h.iconBg, color: h.iconColor }}
              >
                {h.icon}
              </div>
              <span className="habit-name">{h.name}</span>
            </div>

            <div className="habit-dots-center">
              <div className="habit-dots-row">
                {h.dots.map((dot, idx) => (
                  <div
                    key={idx}
                    className={`habit-dot ${dot}`}
                    onClick={() => toggleDot(h.id, idx)}
                    title={`Day ${DAYS_HEADER[idx]}: ${dot}`}
                  />
                ))}
              </div>
              <div className="habit-days-header">
                {DAYS_HEADER.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
            </div>

            <div className="habit-streak-count">{h.streak} days</div>
          </div>
        ))}
      </div>
    </div>
  );
}
