'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  PlusCircle,
  Timer,
  Code,
  ArrowLeftRight,
  FileCode,
  GitCommit,
  Sun,
  Maximize2,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface CommandAction {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  category: string;
  badge: string;
  run: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onActionTrigger?: (actionId: string) => void;
}

export default function CommandPalette({ isOpen, onClose, onActionTrigger }: CommandPaletteProps) {
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions: CommandAction[] = [
    {
      id: 'new-task',
      title: 'Create New Sprint Task',
      desc: 'Add a new issue or task to the Kanban board',
      icon: <PlusCircle size={15} />,
      category: 'Kanban Sprint',
      badge: 'N',
      run: () => {
        if (onActionTrigger) onActionTrigger('new-task');
      },
    },
    {
      id: 'start-pomodoro',
      title: 'Start Pomodoro Focus',
      desc: 'Begin a 25-minute deep focus session',
      icon: <Timer size={15} />,
      category: 'Focus Station',
      badge: 'P',
      run: () => {
        if (onActionTrigger) onActionTrigger('start-pomodoro');
      },
    },
    {
      id: 'json-tool',
      title: 'JSON Formatter & Validator',
      desc: 'Open the built-in JSON formatting utility',
      icon: <Code size={15} />,
      category: 'Dev Toolbox',
      badge: 'J',
      run: () => {
        if (onActionTrigger) onActionTrigger('json-tool');
      },
    },
    {
      id: 'base64-tool',
      title: 'Base64 & URL Converter',
      desc: 'Encode or decode Base64 and URL strings',
      icon: <ArrowLeftRight size={15} />,
      category: 'Dev Toolbox',
      badge: 'B',
      run: () => {
        if (onActionTrigger) onActionTrigger('base64-tool');
      },
    },
    {
      id: 'snippet-tool',
      title: 'Code Snippets Vault',
      desc: 'Access or save reusable developer snippets',
      icon: <FileCode size={15} />,
      category: 'Dev Toolbox',
      badge: 'S',
      run: () => {
        if (onActionTrigger) onActionTrigger('snippet-tool');
      },
    },
    {
      id: 'simulate-commit',
      title: 'Log Git Commit to Streak',
      desc: 'Trigger a new commit on the GitHub activity matrix',
      icon: <GitCommit size={15} />,
      category: 'GitHub Streak',
      badge: 'G',
      run: () => {
        if (onActionTrigger) onActionTrigger('simulate-commit');
      },
    },
    {
      id: 'toggle-theme',
      title: 'Toggle Minimal Light / Dark Theme',
      desc: 'Switch between minimal light mode and dark mode',
      icon: <Sun size={15} />,
      category: 'Theme',
      badge: 'T',
      run: () => toggleTheme(),
    },
    {
      id: 'toggle-fullscreen',
      title: 'Toggle Fullscreen Mode',
      desc: 'Expand DevDash to distraction-free fullscreen',
      icon: <Maximize2 size={15} />,
      category: 'System',
      badge: 'F11',
      run: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      },
    },
  ];

  const filtered = actions.filter((a) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.desc.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else if (onActionTrigger) onActionTrigger('open-cmd');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      } else if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) =>
            filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0
          );
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filtered[selectedIndex]) {
            filtered[selectedIndex].run();
            onClose();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, onActionTrigger]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: '600px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmd-palette-wrapper">
          <div className="cmd-palette-input-wrap">
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              ref={inputRef}
              type="text"
              className="cmd-palette-input"
              placeholder="Type a command or search tools..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
            />
            <kbd className="cmd-item-badge">ESC</kbd>
          </div>

          <div className="cmd-palette-results">
            {filtered.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <AlertCircle size={24} style={{ margin: '0 auto 0.5rem', display: 'block' }} />
                No commands found matching your query
              </div>
            ) : (
              filtered.map((action, idx) => (
                <div
                  key={action.id}
                  className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => {
                    action.run();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-item-left">
                    <div className="cmd-item-icon">{action.icon}</div>
                    <div>
                      <div className="cmd-item-title">{action.title}</div>
                      <div className="cmd-item-desc">{action.desc}</div>
                    </div>
                  </div>
                  <kbd className="cmd-item-badge">{action.badge}</kbd>
                </div>
              ))
            )}
          </div>

          <div className="cmd-palette-footer">
            <div className="cmd-shortcuts-hint">
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> Navigate
              </span>
              <span>
                <kbd>↵</kbd> Select
              </span>
              <span>
                <kbd>ESC</kbd> Close
              </span>
            </div>
            <span>DevDash React 2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
