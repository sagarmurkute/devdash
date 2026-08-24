'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GitCommit, Flame, Trophy, CheckCircle, RefreshCw, Plus, Edit2, X } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import { GitCommitItem, HeatmapCell } from '@/lib/types';
import { playSuccessChime } from '@/lib/audio';

interface GithubWidgetProps {
  onStreakUpdate?: (streak: number) => void;
}

export default function GithubWidget({ onStreakUpdate }: GithubWidgetProps) {
  const [username, setUsername] = useState('sagarmurkute');
  const [totalCommits, setTotalCommits] = useState(1428);
  const [currentStreak, setCurrentStreak] = useState(42);
  const [longestStreak] = useState(78);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [userDraft, setUserDraft] = useState('');
  const [commitMsg, setCommitMsg] = useState('');
  const [commitHash, setCommitHash] = useState('');

  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>([]);
  const [recentCommits, setRecentCommits] = useState<GitCommitItem[]>([
    { hash: 'a412cf5', msg: 'feat: api port health monitor, tech feed aggregator, and final polish', time: 'Just now' },
    { hash: '808bab0', msg: 'feat: developer utility toolbox and code snippet manager', time: '10m ago' },
    { hash: '387b8aa', msg: 'feat: pomodoro focus station with audio cues and circular timer', time: '20m ago' },
    { hash: 'e0de39c', msg: 'feat: kanban sprint board and developer task manager with storage', time: '30m ago' },
    { hash: 'ab5246d', msg: 'feat: github streak matrix, stats widget, and activity timeline', time: '40m ago' }
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('devdash_github_user') || 'sagarmurkute';
    setUsername(savedUser);
    setUserDraft(savedUser);

    // Generate 364 days heatmap
    const days = 364;
    const data: HeatmapCell[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const rand = Math.random();
      let level = 0;
      let count = 0;

      if (i < 50) {
        if (rand > 0.15) {
          level = Math.floor(Math.random() * 4) + 1;
          count = level * 3 + Math.floor(Math.random() * 4);
        }
      } else {
        if (rand > 0.45) {
          level = Math.floor(Math.random() * 4) + 1;
          count = level * 2 + Math.floor(Math.random() * 3);
        }
      }

      data.push({
        date: date.toISOString().split('T')[0],
        formattedDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        level,
        count
      });
    }
    setHeatmapData(data);
  }, []);

  const handleSaveUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userDraft.trim()) return;
    setUsername(userDraft.trim());
    localStorage.setItem('devdash_github_user', userDraft.trim());
    setIsUserModalOpen(false);
  };

  const handleManualCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMsg.trim()) return;

    const hash = commitHash.trim() || Math.random().toString(16).substring(2, 9);
    const newCommit: GitCommitItem = {
      hash,
      msg: commitMsg.trim(),
      time: 'Just now'
    };

    setRecentCommits(prev => [newCommit, ...prev.slice(0, 4)]);
    setTotalCommits(prev => prev + 1);
    
    // Update last cell in heatmap
    setHeatmapData(prev => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const lastIdx = next.length - 1;
      next[lastIdx] = {
        ...next[lastIdx],
        count: next[lastIdx].count + 1,
        level: Math.min(4, Math.max(1, next[lastIdx].level + 1))
      };
      return next;
    });

    playSuccessChime();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch {
      // Confetti fallback
    }

    setCommitMsg('');
    setCommitHash('');
    setIsCommitModalOpen(false);
  };

  const fetchGithubApi = async () => {
    setIsSyncing(true);
    setSyncStatus('syncing');

    try {
      const res = await fetch(`https://api.github.com/users/${username}/events/public`);
      if (res.ok) {
        const events = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pushEvents = events.filter((e: any) => e.type === 'PushEvent');
        if (pushEvents.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mappedCommits = pushEvents.slice(0, 5).map((e: any) => {
            const commit = e.payload?.commits?.[0];
            return {
              hash: (commit?.sha || Math.random().toString(16)).substring(0, 7),
              msg: commit?.message || `Pushed to ${e.repo?.name}`,
              time: new Date(e.created_at).toLocaleTimeString()
            };
          });
          setRecentCommits(mappedCommits);
          setTotalCommits(prev => prev + pushEvents.length);
        }
      }
    } catch {
      // Fallback gracefully
    } finally {
      setIsSyncing(false);
      setSyncStatus('synced');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }
  };

  return (
    <div className="card github-card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)' }}>
            <GitCommit size={15} />
          </div>
          <div>
            <h2 className="card-title">GitHub Activity & Contribution Matrix</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="card-subtitle">{username} / devdash</span>
              <button 
                className="task-btn-action" 
                onClick={() => { setUserDraft(username); setIsUserModalOpen(true); }}
                title="Change GitHub Username"
                style={{ fontSize: '0.75rem', width: '20px', height: '20px' }}
                type="button"
              >
                <Edit2 size={11} />
              </button>
            </div>
          </div>
        </div>

        <div className="github-header-stats">
          <div className="streak-stat-box">
            <Flame className="streak-icon" size={22} />
            <div>
              <div className="streak-val">{currentStreak} Days</div>
              <div className="streak-sub">Current Streak</div>
            </div>
          </div>

          <div className="streak-stat-box">
            <Trophy size={20} style={{ color: 'var(--accent-cyan)' }} />
            <div>
              <div className="streak-val">{longestStreak} Days</div>
              <div className="streak-sub">Longest Streak</div>
            </div>
          </div>

          <div className="streak-stat-box">
            <CheckCircle size={20} style={{ color: 'var(--accent-emerald)' }} />
            <div>
              <div className="streak-val">{totalCommits}</div>
              <div className="streak-sub">Total Commits</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={fetchGithubApi}
              disabled={isSyncing}
              title="Sync with public GitHub API events"
              type="button"
            >
              <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
              {syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'synced' ? 'Synced!' : 'Sync API'}
            </button>

            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => setIsCommitModalOpen(true)}
              title="Log Commit Manually"
              type="button"
            >
              <Plus size={12} /> Log Commit
            </button>
          </div>
        </div>
      </div>

      <div className="card-body">
        {/* 52-week Heatmap Grid */}
        <div className="heatmap-wrapper">
          <div className="heatmap-grid">
            {heatmapData.map((cell, idx) => (
              <div 
                key={idx}
                className="heatmap-cell"
                data-level={cell.level}
                title={`${cell.count} commits on ${cell.formattedDate}`}
              />
            ))}
          </div>
        </div>

        <div className="heatmap-legend">
          <span>Less</span>
          <div className="heatmap-legend-cells">
            <div className="legend-cell" style={{ background: 'var(--heatmap-0)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--heatmap-1)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--heatmap-2)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--heatmap-3)' }}></div>
            <div className="legend-cell" style={{ background: 'var(--heatmap-4)' }}></div>
          </div>
          <span>More</span>
        </div>

        {/* Git Timeline */}
        <div className="git-timeline">
          <div className="git-timeline-title">
            <span>Recent Commit History</span>
            <span className="badge badge-indigo">Branch: main</span>
          </div>

          <div>
            {recentCommits.map((c, i) => (
              <div key={i} className="git-commit-item">
                <div className="git-commit-left">
                  <span className="git-hash">{c.hash}</span>
                  <span className="git-msg">{c.msg}</span>
                </div>
                <span className="git-time">{c.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Change Username Modal */}
      {isUserModalOpen && (
        <div className="modal-overlay" onClick={() => setIsUserModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '400px', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GithubIcon size={16} /> Set GitHub Username
              </h3>
              <button className="btn-icon" onClick={() => setIsUserModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form onSubmit={handleSaveUsername} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  GitHub Username
                </label>
                <input 
                  type="text" 
                  className="input" 
                  value={userDraft} 
                  onChange={e => setUserDraft(e.target.value)} 
                  required 
                  autoFocus 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsUserModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Username
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Commit Modal */}
      {isCommitModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCommitModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '440px', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GitCommit size={16} style={{ color: 'var(--accent-emerald)' }} /> Log Git Commit
              </h3>
              <button className="btn-icon" onClick={() => setIsCommitModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form onSubmit={handleManualCommit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Commit Message
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g. feat: add habit tracker matrix"
                  value={commitMsg}
                  onChange={e => setCommitMsg(e.target.value)}
                  required 
                  autoFocus 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Commit Hash (Optional)
                </label>
                <input 
                  type="text" 
                  className="input input-mono" 
                  placeholder="Auto-generated if blank"
                  value={commitHash}
                  onChange={e => setCommitHash(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsCommitModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Log to Streak
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
