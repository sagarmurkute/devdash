/**
 * Daily Coding Hours Module
 * Tracks today's logged hours, language breakdown, and quick logging buttons
 */

class CodingHoursTracker {
  constructor(containerId = 'coding-hours-container') {
    this.container = document.getElementById(containerId);
    this.data = window.DevDashStorage?.get('coding_hours') || {
      todayTotal: 4.5,
      target: 6.0,
      languages: [
        { name: 'JavaScript', hours: 2.5, color: '#f7df1e' },
        { name: 'TypeScript', hours: 1.2, color: '#3178c6' },
        { name: 'CSS/HTML', hours: 0.8, color: '#6366f1' }
      ],
      weeklyLog: [
        { day: 'Mon', hours: 5.2 },
        { day: 'Tue', hours: 6.1 },
        { day: 'Wed', hours: 4.8 },
        { day: 'Thu', hours: 7.0 },
        { day: 'Fri', hours: 5.5 },
        { day: 'Sat', hours: 3.5 },
        { day: 'Sun', hours: 4.5 }
      ]
    };
    this.init();
  }

  save() {
    window.DevDashStorage?.set('coding_hours', this.data);
    if (window.WeeklyAnalyticsInstance) {
      window.WeeklyAnalyticsInstance.render();
    }
  }

  logTime(hours, langName = 'JavaScript') {
    this.data.todayTotal = Math.round((this.data.todayTotal + hours) * 10) / 10;
    
    // Update language breakdown
    const lang = this.data.languages.find(l => l.name.toLowerCase() === langName.toLowerCase());
    if (lang) {
      lang.hours = Math.round((lang.hours + hours) * 10) / 10;
    } else {
      this.data.languages.push({ name: langName, hours: hours, color: '#06b6d4' });
    }

    // Update today's entry in weekly log (Sun)
    if (this.data.weeklyLog.length > 0) {
      this.data.weeklyLog[this.data.weeklyLog.length - 1].hours = this.data.todayTotal;
    }

    this.save();
    this.render();
  }

  render() {
    if (!this.container) return;

    const percent = Math.min(100, Math.round((this.data.todayTotal / this.data.target) * 100));

    this.container.innerHTML = `
      <div class="card coding-hours-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(245, 158, 11, 0.12); color: var(--accent-amber);">
              <i class="ph ph-hourglass-high"></i>
            </div>
            <div>
              <h2 class="card-title">Daily Coding Hours</h2>
              <p class="card-subtitle">Goal: ${this.data.target}h/day &bull; ${percent}% completed</p>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" id="btn-custom-log-hours">
            <i class="ph ph-plus"></i> Log Time
          </button>
        </div>

        <div class="card-body">
          <div class="hours-main-display">
            <div class="hours-metric">
              <div class="hours-number">
                <span>${this.data.todayTotal}h</span>
                <span class="hours-target">/ ${this.data.target}h</span>
              </div>
              <span class="hours-subtext">${this.data.todayTotal >= this.data.target ? '🎯 Daily Goal Achieved!' : `${Math.round((this.data.target - this.data.todayTotal) * 10) / 10}h remaining today`}</span>
            </div>

            <div class="hours-quick-log">
              <button class="btn btn-secondary btn-sm btn-quick-hour" data-val="0.5">+30m</button>
              <button class="btn btn-secondary btn-sm btn-quick-hour" data-val="1.0">+1h</button>
              <button class="btn btn-secondary btn-sm btn-quick-hour" data-val="2.0">+2h</button>
            </div>
          </div>

          <!-- Multi-color Language Progress Bar -->
          <div class="hours-progress-track">
            ${this.data.languages.map(l => {
              const segWidth = this.data.todayTotal > 0 ? (l.hours / this.data.target) * 100 : 0;
              return `<div class="hours-progress-fill" style="width: ${segWidth}%; background-color: ${l.color};" title="${l.name}: ${l.hours}h"></div>`;
            }).join('')}
          </div>

          <!-- Languages Breakdown -->
          <div class="lang-breakdown-list">
            ${this.data.languages.map(l => `
              <div class="lang-item">
                <div class="lang-left">
                  <span class="lang-color-dot" style="background-color: ${l.color};"></span>
                  <span>${l.name}</span>
                </div>
                <span class="lang-hours">${l.hours} hrs</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.btn-quick-hour').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseFloat(btn.getAttribute('data-val'));
        this.logTime(val);
      });
    });

    const customLogBtn = document.getElementById('btn-custom-log-hours');
    if (customLogBtn) {
      customLogBtn.onclick = () => this.openCustomLogModal();
    }
  }

  openCustomLogModal() {
    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 420px; padding: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i class="ph ph-clock-clockwise" style="color: var(--accent-amber);"></i> Log Coding Session</h3>
          <button class="btn-icon" id="btn-close-log-hours"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-log-hours" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Hours Spent</label>
            <input type="number" step="0.25" min="0.25" max="24" id="log-hours-input" class="input" value="1.0" required autofocus />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Language / Technology</label>
            <select id="log-lang-select" class="select">
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="CSS/HTML">CSS/HTML</option>
              <option value="Python">Python</option>
              <option value="Rust">Rust</option>
              <option value="SQL">SQL</option>
            </select>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-log-hours">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Session</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    document.getElementById('btn-close-log-hours').onclick = close;
    document.getElementById('btn-cancel-log-hours').onclick = close;

    document.getElementById('form-log-hours').onsubmit = (e) => {
      e.preventDefault();
      const hrs = parseFloat(document.getElementById('log-hours-input').value);
      const lang = document.getElementById('log-lang-select').value;
      if (hrs > 0) {
        this.logTime(hrs, lang);
        close();
      }
    };
  }

  init() {
    this.render();
  }
}

window.CodingHoursInstance = new CodingHoursTracker();
