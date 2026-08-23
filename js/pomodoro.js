/**
 * Pomodoro Focus Station Module
 * Full circular SVG countdown, Web Audio chime synthesis, and session stats
 */

class PomodoroTimer {
  constructor(containerId = 'pomodoro-widget-container') {
    this.container = document.getElementById(containerId);
    this.modes = {
      pomodoro: { label: 'Focus', minutes: 25 },
      short: { label: 'Short Break', minutes: 5 },
      long: { label: 'Long Break', minutes: 15 }
    };
    this.currentMode = 'pomodoro';
    this.totalSeconds = 25 * 60;
    this.remainingSeconds = this.totalSeconds;
    this.isRunning = false;
    this.intervalId = null;
    this.completedSessions = 3;
    this.totalFocusMinutes = 75;
    this.circumference = 2 * Math.PI * 85; // 534.07

    this.init();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="card pomodoro-card">
        <div class="card-header" style="width: 100%;">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(6, 182, 212, 0.12); color: var(--accent-cyan);">
              <i class="ph ph-timer"></i>
            </div>
            <div>
              <h2 class="card-title">Focus Station</h2>
              <p class="card-subtitle">Deep Work & Productivity Intervals</p>
            </div>
          </div>

          <button class="btn-icon" id="btn-pomo-sound-test" title="Test Focus Chime">
            <i class="ph ph-speaker-high"></i>
          </button>
        </div>

        <div class="pomo-mode-tabs">
          <button class="pomo-mode-btn ${this.currentMode === 'pomodoro' ? 'active' : ''}" data-mode="pomodoro">Pomodoro (25m)</button>
          <button class="pomo-mode-btn ${this.currentMode === 'short' ? 'active' : ''}" data-mode="short">Short Break (5m)</button>
          <button class="pomo-mode-btn ${this.currentMode === 'long' ? 'active' : ''}" data-mode="long">Long Break (15m)</button>
        </div>

        <div class="pomo-timer-display">
          <svg class="pomo-svg" viewBox="0 0 200 200">
            <circle class="pomo-circle-bg" cx="100" cy="100" r="85"></circle>
            <circle class="pomo-circle-progress" id="pomo-progress-ring" cx="100" cy="100" r="85"></circle>
          </svg>
          <div class="pomo-time-center">
            <div class="pomo-digits" id="pomo-timer-text">${this.formatTime(this.remainingSeconds)}</div>
            <div class="pomo-label" id="pomo-mode-label">${this.modes[this.currentMode].label}</div>
          </div>
        </div>

        <div class="pomo-controls">
          <button class="btn btn-secondary btn-icon" id="btn-pomo-reset" title="Reset Timer">
            <i class="ph ph-arrow-counter-clockwise"></i>
          </button>
          <button class="pomo-btn-main" id="btn-pomo-toggle" title="Start/Pause">
            <i class="ph ${this.isRunning ? 'ph-pause' : 'ph-play'}" id="pomo-play-icon"></i>
          </button>
          <button class="btn btn-secondary btn-icon" id="btn-pomo-skip" title="Skip Interval">
            <i class="ph ph-fast-forward"></i>
          </button>
        </div>

        <div class="pomo-stats-row">
          <div class="pomo-stat-item">
            <div class="pomo-stat-val" id="pomo-sessions-val">${this.completedSessions}</div>
            <div class="pomo-stat-lbl">Completed</div>
          </div>
          <div class="pomo-stat-item">
            <div class="pomo-stat-val" id="pomo-focus-mins">${this.totalFocusMinutes}m</div>
            <div class="pomo-stat-lbl">Focus Time</div>
          </div>
          <div class="pomo-stat-item">
            <div class="pomo-stat-val" style="color: var(--accent-emerald);">Active</div>
            <div class="pomo-stat-lbl">Status</div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateProgressRing();
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  updateProgressRing() {
    const ring = document.getElementById('pomo-progress-ring');
    if (!ring) return;

    const fraction = this.remainingSeconds / this.totalSeconds;
    const offset = this.circumference * (1 - fraction);
    ring.style.strokeDashoffset = offset;
  }

  bindEvents() {
    // Mode Buttons
    this.container.querySelectorAll('.pomo-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        this.setMode(mode);
      });
    });

    // Toggle Button
    const toggleBtn = document.getElementById('btn-pomo-toggle');
    if (toggleBtn) toggleBtn.onclick = () => this.toggle();

    // Reset Button
    const resetBtn = document.getElementById('btn-pomo-reset');
    if (resetBtn) resetBtn.onclick = () => this.reset();

    // Skip Button
    const skipBtn = document.getElementById('btn-pomo-skip');
    if (skipBtn) skipBtn.onclick = () => this.completeInterval();

    // Sound Test Button
    const soundBtn = document.getElementById('btn-pomo-sound-test');
    if (soundBtn) soundBtn.onclick = () => this.playChime();
  }

  setMode(modeKey) {
    this.pause();
    this.currentMode = modeKey;
    this.totalSeconds = this.modes[modeKey].minutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.render();
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.updatePlayIcon();

    this.intervalId = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateDisplay();
      } else {
        this.completeInterval();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.updatePlayIcon();
  }

  reset() {
    this.pause();
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
  }

  completeInterval() {
    this.pause();
    this.playChime();

    if (this.currentMode === 'pomodoro') {
      this.completedSessions++;
      this.totalFocusMinutes += this.modes.pomodoro.minutes;
      this.setMode('short');
    } else {
      this.setMode('pomodoro');
    }
  }

  updateDisplay() {
    const textEl = document.getElementById('pomo-timer-text');
    if (textEl) textEl.textContent = this.formatTime(this.remainingSeconds);
    this.updateProgressRing();
  }

  updatePlayIcon() {
    const icon = document.getElementById('pomo-play-icon');
    if (icon) {
      icon.className = `ph ${this.isRunning ? 'ph-pause' : 'ph-play'}`;
    }
  }

  playChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio chime simulated');
    }
  }

  init() {
    this.render();
  }
}

window.PomodoroInstance = new PomodoroTimer();
