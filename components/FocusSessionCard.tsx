'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { playChimeSound, playSuccessChime } from '@/lib/audio';
import confetti from 'canvas-confetti';

interface FocusSessionCardProps {
  onSessionComplete?: (mins: number) => void;
}

export default function FocusSessionCard({ onSessionComplete }: FocusSessionCardProps) {
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [modeLabel, setModeLabel] = useState('Focus');
  const [selectedDropdown, setSelectedDropdown] = useState('Pomodoro 25/5');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const circumference = 2 * Math.PI * 60; // 376.99 (radius 60)

  const handleComplete = React.useCallback(() => {
    setIsRunning(false);
    playChimeSound();
    playSuccessChime();
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {}

    if (onSessionComplete) {
      onSessionComplete(25);
    }

    setRemainingSeconds(5 * 60);
    setTotalSeconds(5 * 60);
    setModeLabel('Short Break');
  }, [onSessionComplete]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            handleComplete();
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
  }, [isRunning, handleComplete]);

  const toggleSession = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const fraction = remainingSeconds / (totalSeconds || 1);
  const strokeOffset = circumference * (1 - fraction);

  return (
    <div className="devstreak-card">
      <div className="devstreak-card-header">
        <h3 className="card-heading">Focus Session</h3>
        <button
          className="btn btn-primary btn-sm"
          style={{
            borderRadius: 'var(--radius-control)',
            backgroundColor: 'var(--brand-blue)',
            borderColor: 'var(--brand-blue)',
          }}
          onClick={toggleSession}
          type="button"
        >
          {isRunning ? (
            <>
              <Pause size={12} style={{ marginRight: '0.2rem' }} /> Pause Session
            </>
          ) : (
            'Start Session'
          )}
        </button>
      </div>

      <div className="focus-card-body">
        {/* SVG Circular Progress Ring */}
        <div className="focus-svg-wrapper">
          <svg className="focus-svg" viewBox="0 0 140 140">
            <circle className="focus-circle-bg" cx="70" cy="70" r="60" />
            <circle
              className="focus-circle-progress"
              cx="70"
              cy="70"
              r="60"
              style={{ strokeDashoffset: strokeOffset }}
            />
          </svg>
          <div className="focus-time-center">
            <div className="focus-digits">{formatTime(remainingSeconds)}</div>
            <div className="focus-label">{modeLabel}</div>
          </div>
        </div>

        {/* Dropdown Mode Selector */}
        <button className="focus-mode-dropdown" type="button">
          <span>{selectedDropdown}</span>
          <ChevronDown size={13} />
        </button>
      </div>
    </div>
  );
}
