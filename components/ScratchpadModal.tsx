'use client';

import React, { useState, useEffect } from 'react';
import { FileEdit, Trash2, X } from 'lucide-react';

interface ScratchpadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScratchpadModal({ isOpen, onClose }: ScratchpadModalProps) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('Saved automatically');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devdash_scratchpad_note') || '';
      setText(saved);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    setStatus('Saving...');
    localStorage.setItem('devdash_scratchpad_note', val);
    setTimeout(() => {
      setStatus('Saved automatically');
    }, 400);
  };

  const handleClear = () => {
    setText('');
    localStorage.removeItem('devdash_scratchpad_note');
    setStatus('Scratchpad cleared');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '550px', padding: '1.25rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-header">
          <div className="card-title-group">
            <div
              className="card-icon"
              style={{ background: 'rgba(245, 158, 11, 0.12)', color: 'var(--accent-amber)' }}
            >
              <FileEdit size={15} />
            </div>
            <div>
              <h3 className="card-title">Developer Scratchpad</h3>
              <p className="card-subtitle">Auto-saves to browser storage</p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose} type="button">
            <X size={14} />
          </button>
        </div>

        <div className="card-body">
          <textarea
            className="textarea textarea-mono"
            rows={10}
            placeholder="Type quick notes, SQL snippets, terminal commands, or mental thoughts..."
            value={text}
            onChange={handleChange}
            autoFocus
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.75rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>{status}</span>
            <button className="btn btn-secondary btn-sm" onClick={handleClear} type="button">
              <Trash2 size={12} /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
