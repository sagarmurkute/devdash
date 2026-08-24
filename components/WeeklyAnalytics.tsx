'use client';

import React, { useState } from 'react';
import { TrendingUp, Download, Upload, X } from 'lucide-react';
import { WeeklyDayLog } from '@/lib/types';
import { exportBackupJson, importBackupJson } from '@/lib/storage';

interface WeeklyAnalyticsProps {
  weeklyLog: WeeklyDayLog[];
  onDataImported?: () => void;
}

export default function WeeklyAnalytics({ weeklyLog, onDataImported }: WeeklyAnalyticsProps) {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState('');

  const totalWeekHours = Math.round(weeklyLog.reduce((acc, curr) => acc + curr.hours, 0) * 10) / 10;
  const maxHour = Math.max(...weeklyLog.map(w => w.hours), 8);

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;

    const ok = importBackupJson(importText);
    if (ok) {
      setImportStatus('✓ Data restored successfully! Reloading...');
      setTimeout(() => {
        setIsImportModalOpen(false);
        if (onDataImported) onDataImported();
        else window.location.reload();
      }, 1000);
    } else {
      setImportStatus('✗ Invalid backup JSON format.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setImportText(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="card analytics-card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
            <TrendingUp size={15} />
          </div>
          <div>
            <h2 className="card-title">Weekly Engineering Analytics</h2>
            <p className="card-subtitle">{totalWeekHours}h Total Focus Time This Week</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={() => setIsImportModalOpen(true)}
            title="Import Data Backup"
            type="button"
          >
            <Upload size={12} /> Import
          </button>
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={exportBackupJson}
            title="Export Local Data as JSON"
            type="button"
          >
            <Download size={12} /> Export Backup
          </button>
        </div>
      </div>

      <div className="card-body">
        <div className="analytics-stats-grid">
          <div className="stat-metric-card">
            <div className="stat-metric-val">{totalWeekHours}h</div>
            <div className="stat-metric-lbl">Total Time Logged</div>
          </div>
          <div className="stat-metric-card">
            <div className="stat-metric-val" style={{ color: 'var(--accent-emerald)' }}>94%</div>
            <div className="stat-metric-lbl">Consistency Score</div>
          </div>
          <div className="stat-metric-card">
            <div className="stat-metric-val" style={{ color: 'var(--accent-cyan)' }}>18</div>
            <div className="stat-metric-lbl">Tasks Closed</div>
          </div>
        </div>

        {/* Weekly Coding Volume Chart */}
        <div className="chart-container">
          {weeklyLog.map((item, idx) => {
            const heightPercent = Math.min(100, Math.round((item.hours / maxHour) * 100));
            return (
              <div key={idx} className="chart-bar-group" title={`${item.day}: ${item.hours} hours`}>
                <div className="chart-bar-wrapper">
                  <div className="chart-bar-fill" style={{ height: `${heightPercent}%` }} />
                </div>
                <span className="chart-day-label">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Import Backup Modal */}
      {isImportModalOpen && (
        <div className="modal-overlay" onClick={() => setIsImportModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '480px', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Upload size={16} style={{ color: 'var(--accent-cyan)' }} /> Restore Backup JSON
              </h3>
              <button className="btn-icon" onClick={() => setIsImportModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form onSubmit={handleImport} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Upload JSON File or Paste JSON
                </label>
                <input 
                  type="file" 
                  accept=".json" 
                  onChange={handleFileUpload} 
                  style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}
                />
                <textarea 
                  className="textarea textarea-mono" 
                  rows={6} 
                  placeholder='Paste JSON payload here...'
                  value={importText}
                  onChange={e => setImportText(e.target.value)}
                  required 
                />
              </div>

              {importStatus && (
                <div style={{ fontSize: '0.75rem', color: importStatus.startsWith('✓') ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                  {importStatus}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsImportModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Restore Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
