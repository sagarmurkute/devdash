'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Timer, Volume2, RotateCcw, Play, Pause, FastForward } from 'lucide-react';
import { playChimeSound, playSuccessChime } from '@/lib/audio';

interface PomodoroStationProps {
  onLogFocusTime?: (hours: number) => void;
}

type PomoMode = 'pomodoro' | 'short' | 'long';

const MODE_CONFIG: Record<PomoMode, { label: string; minutes: number }> = {
  pomodoro: { label: 'Focus', minutes: 25 },
  short: { label: 'Short Break', minutes: 5 },
  long: { label: 'Long Break', minutes: 15 }
};

export default function PomodoroStation({ onLogFocusTime }: PomodoroStationProps) {
  const [currentMode, setCurrentMode] = useState<PomoMode>('pomodoro');
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(3);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(75);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const circumference = 2 * Math.PI * 85; // 534.07

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            handleCompleteInterval();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentMode]);

  const handleCompleteInterval = () => {
    setIsRunning(false);
    playChimeSound();

    if (currentMode === 'pomodoro') {
      setCompletedSessions(prev => prev + 1);
      setTotalFocusMinutes(prev => prev + MODE_CONFIG.pomodoro.minutes);
      
      if (onLogFocusTime) {
        onLogFocusTime(0.4); // 25m = ~0.4h
      }

      playSuccessChime();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }

      switchMode('short');
    } else {
      switchMode('pomodoro');
    }
  };

  const switchMode = (mode: PomoMode) => {
    setIsRunning(false);
    setCurrentMode(mode);
    const secs = MODE_CONFIG[mode].minutes * 60;
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
  };

  const togglePlay = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setRemainingSeconds(totalSeconds);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const fraction = remainingSeconds / (totalSeconds || 1);
  const strokeOffset = circumference * (1 - fraction);

  return (
    <div className="card pomodoro-card">
      <div className="card-header" style={{ width: '100%' }}>
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)' }}>
            <Timer size={15} />
          </div>
          <div>
            <h2 className="card-title">Focus Station</h2>
            <p className="card-subtitle">Deep Work & Productivity Intervals</p>
          </div>
        </div>

        <button 
          className="btn-icon" 
          onClick={playChimeSound}
          title="Test Focus Chime"
          type="button"
        >
          <Volume2 size={14} />
        </button>
      </div>

      <div className="pomo-mode-tabs">
        <button 
          className={`pomo-mode-btn ${currentMode === 'pomodoro' ? 'active' : ''}`}
          onClick={() => switchMode('pomodoro')}
          type="button"
        >
          Pomodoro (25m)
        </button>
        <button 
          className={`pomo-mode-btn ${currentMode === 'short' ? 'active' : ''}`}
          onClick={() => switchMode('short')}
          type="button"
        >
          Short Break (5m)
        </button>
        <button 
          className={`pomo-mode-btn ${currentMode === 'long' ? 'active' : ''}`}
          onClick={() => switchMode('long')}
          type="button"
        >
          Long Break (15m)
        </button>
      </div>

      <div className="pomo-timer-display">
        <svg className="pomo-svg" viewBox="0 0 200 200">
          <circle className="pomo-circle-bg" cx="100" cy="100" r="85" />
          <circle 
            className="pomo-circle-progress" 
            cx="100" 
            cy="100" 
            r="85"
            style={{ strokeDashoffset: strokeOffset }}
          />
        </svg>
        <div className="pomo-time-center">
          <div className="pomo-digits">{formatTime(remainingSeconds)}</div>
          <div className="pomo-label">{MODE_CONFIG[currentMode].label}</div>
        </div>
      </div>

      <div className="pomo-controls">
        <button className="btn btn-secondary btn-icon" onClick={resetTimer} title="Reset Timer" type="button">
          <RotateCcw size={14} />
        </button>
        <button className="pomo-btn-main" onClick={togglePlay} title={isRunning ? 'Pause' : 'Start'} type="button">
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button className="btn btn-secondary btn-icon" onClick={handleCompleteInterval} title="Skip Interval" type="button">
          <FastForward size={14} />
        </button>
      </div>

      <div className="pomo-stats-row">
        <div className="pomo-stat-item">
          <div className="pomo-stat-val">{completedSessions}</div>
          <div className="pomo-stat-lbl">Completed</div>
        </div>
        <div className="pomo-stat-item">
          <div className="pomo-stat-val">{totalFocusMinutes}m</div>
          <div className="pomo-stat-lbl">Focus Time</div>
        </div>
        <div className="pomo-stat-item">
          <div className="pomo-stat-val" style={{ color: 'var(--accent-emerald)' }}>
            {isRunning ? 'Active' : 'Paused'}
          </div>
          <div className="pomo-stat-lbl">Status</div>
        </div>
      </div>
    </div>
  );
}
