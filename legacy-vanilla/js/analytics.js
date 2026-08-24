/**
 * Weekly Analytics Module
 * Renders weekly coding volume charts, sprint velocity, and streak metrics
 */

class WeeklyAnalytics {
  constructor(containerId = 'analytics-widget-container') {
    this.container = document.getElementById(containerId);
    this.init();
  }

  getWeeklyData() {
    const hoursData = window.DevDashStorage?.get('coding_hours');
    return hoursData?.weeklyLog || [
      { day: 'Mon', hours: 5.2 },
      { day: 'Tue', hours: 6.1 },
      { day: 'Wed', hours: 4.8 },
      { day: 'Thu', hours: 7.0 },
      { day: 'Fri', hours: 5.5 },
      { day: 'Sat', hours: 3.5 },
      { day: 'Sun', hours: 4.5 }
    ];
  }

  render() {
    if (!this.container) return;

    const weeklyLog = this.getWeeklyData();
    const totalWeekHours = Math.round(weeklyLog.reduce((acc, curr) => acc + curr.hours, 0) * 10) / 10;
    const maxHour = Math.max(...weeklyLog.map(w => w.hours), 8);

    this.container.innerHTML = `
      <div class="card analytics-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(99, 102, 241, 0.12); color: var(--accent-primary);">
              <i class="ph ph-chart-line-up"></i>
            </div>
            <div>
              <h2 class="card-title">Weekly Engineering Analytics</h2>
              <p class="card-subtitle">${totalWeekHours}h Total Focus Time This Week</p>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" id="btn-export-backup" title="Export Local Data as JSON">
            <i class="ph ph-download-simple"></i> Export Backup
          </button>
        </div>

        <div class="card-body">
          <div class="analytics-stats-grid">
            <div class="stat-metric-card">
              <div class="stat-metric-val">${totalWeekHours}h</div>
              <div class="stat-metric-lbl">Total Time Logged</div>
            </div>
            <div class="stat-metric-card">
              <div class="stat-metric-val" style="color: var(--accent-emerald);">94%</div>
              <div class="stat-metric-lbl">Consistency Score</div>
            </div>
            <div class="stat-metric-card">
              <div class="stat-metric-val" style="color: var(--accent-cyan);">18</div>
              <div class="stat-metric-lbl">Tasks Closed</div>
            </div>
          </div>

          <!-- Weekly Coding Volume Chart -->
          <div class="chart-container">
            ${weeklyLog.map(item => {
              const heightPercent = Math.min(100, Math.round((item.hours / maxHour) * 100));
              return `
                <div class="chart-bar-group" title="${item.day}: ${item.hours} hours">
                  <div class="chart-bar-wrapper">
                    <div class="chart-bar-fill" style="height: ${heightPercent}%;"></div>
                  </div>
                  <span class="chart-day-label">${item.day}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const exportBtn = document.getElementById('btn-export-backup');
    if (exportBtn) {
      exportBtn.onclick = () => {
        if (window.DevDashStorage) {
          window.DevDashStorage.exportJson();
        }
      };
    }
  }

  init() {
    this.render();
  }
}

window.WeeklyAnalyticsInstance = new WeeklyAnalytics();
