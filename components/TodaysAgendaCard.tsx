'use client';

import React, { useState } from 'react';
import { Check, MoreVertical, ArrowRight } from 'lucide-react';
import { playSuccessChime } from '@/lib/audio';

interface AgendaItem {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

const INITIAL_AGENDA: AgendaItem[] = [
  { id: '1', title: 'Code for DevSlash', time: '9:00 AM – 11:00 AM', completed: false },
  { id: '2', title: 'DSA Practice', time: '11:30 AM – 1:00 PM', completed: false },
  { id: '3', title: 'Project Meeting', time: '3:00 PM – 4:00 PM', completed: false },
];

export default function TodaysAgendaCard() {
  const [agendaList, setAgendaList] = useState<AgendaItem[]>(INITIAL_AGENDA);

  const toggleItem = (id: string) => {
    setAgendaList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const willComplete = !item.completed;
          if (willComplete) playSuccessChime();
          return { ...item, completed: willComplete };
        }
        return item;
      })
    );
  };

  return (
    <div className="devstreak-card">
      <div className="devstreak-card-header">
        <h3 className="card-heading">Today&apos;s Agenda</h3>
      </div>

      <div className="agenda-list">
        {agendaList.map((item) => (
          <div key={item.id} className="agenda-item">
            <div className="agenda-left">
              <button
                className={`agenda-checkbox ${item.completed ? 'checked' : ''}`}
                onClick={() => toggleItem(item.id)}
                type="button"
                aria-label={`Toggle ${item.title}`}
              >
                <Check size={11} strokeWidth={3} />
              </button>
              <div>
                <div
                  className="agenda-title"
                  style={{
                    textDecoration: item.completed ? 'line-through' : 'none',
                    color: item.completed ? 'var(--text-light)' : 'var(--text-primary)',
                  }}
                >
                  {item.title}
                </div>
                <div className="agenda-time">{item.time}</div>
              </div>
            </div>

            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-light)',
                cursor: 'pointer',
                padding: '0.2rem',
              }}
              type="button"
              aria-label="Item options"
            >
              <MoreVertical size={14} />
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '0.85rem', textAlign: 'center' }}>
        <button
          className="card-link-btn"
          onClick={() => alert('Opening Full Calendar view...')}
          type="button"
        >
          View full calendar <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
