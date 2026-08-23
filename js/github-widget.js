/**
 * GitHub Streak & Activity Matrix Module
 * Generates 52-week activity heatmap, streak tracker, and live commit feed
 */

class GithubWidget {
  constructor(containerId = 'github-widget-container') {
    this.container = document.getElementById(containerId);
    this.totalCommits = 1428;
    this.currentStreak = 42; // Days
    this.longestStreak = 78; // Days
    this.recentCommits = [
      { hash: '00facd3', msg: 'feat: keyboard-driven command palette and shortcut engine', time: 'Just now' },
      { hash: '636128d', msg: 'feat: header bar with live multi-timezone clock and quick status', time: '10m ago' },
      { hash: 'fbc914d', msg: 'feat: initial scaffolding and design system foundation', time: '25m ago' },
      { hash: 'eae0605', msg: 'first commit', time: '1h ago' }
    ];
    this.heatmapData = [];
    this.init();
  }

  generateHeatmapData() {
    // Generate 52 weeks x 7 days = 364 cells
    const days = 364;
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Higher probability of commits for recent days to show strong streak
      const rand = Math.random();
      let level = 0;
      let count = 0;

      if (i < 50) { // Active streak zone
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
        level: level,
        count: count
      });
    }
    this.heatmapData = data;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="card github-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(16, 185, 129, 0.12); color: var(--accent-emerald);">
              <i class="ph ph-git-commit"></i>
            </div>
            <div>
              <h2 class="card-title">GitHub Activity & Contribution Matrix</h2>
              <p class="card-subtitle">sagarmurkute / devdash &bull; Public Repository</p>
            </div>
          </div>

          <div class="github-header-stats">
            <div class="streak-stat-box">
              <i class="ph ph-fire streak-icon"></i>
              <div>
                <div class="streak-val" id="current-streak-val">${this.currentStreak} Days</div>
                <div class="streak-sub">Current Streak</div>
              </div>
            </div>

            <div class="streak-stat-box">
              <i class="ph ph-trophy" style="color: var(--accent-cyan); font-size: 1.4rem;"></i>
              <div>
                <div class="streak-val">${this.longestStreak} Days</div>
                <div class="streak-sub">Longest Streak</div>
              </div>
            </div>

            <div class="streak-stat-box">
              <i class="ph ph-check-circle" style="color: var(--accent-emerald); font-size: 1.4rem;"></i>
              <div>
                <div class="streak-val" id="total-commits-val">${this.totalCommits}</div>
                <div class="streak-sub">Total Commits</div>
              </div>
            </div>

            <button class="btn btn-primary btn-sm" id="btn-simulate-commit" title="Simulate a git commit">
              <i class="ph ph-plus"></i> Simulate Commit
            </button>
          </div>
        </div>

        <div class="card-body">
          <div class="heatmap-wrapper">
            <div class="heatmap-grid" id="heatmap-grid-cells">
              ${this.heatmapData.map((cell, idx) => `
                <div class="heatmap-cell" 
                     data-level="${cell.level}" 
                     data-idx="${idx}"
                     title="${cell.count} commits on ${cell.formattedDate}">
                </div>
              `).join('')}
            </div>
          </div>

          <div class="heatmap-legend">
            <span>Less</span>
            <div class="heatmap-legend-cells">
              <div class="legend-cell" style="background: rgba(255, 255, 255, 0.05)"></div>
              <div class="legend-cell" style="background: #0e4429"></div>
              <div class="legend-cell" style="background: #006d32"></div>
              <div class="legend-cell" style="background: #26a641"></div>
              <div class="legend-cell" style="background: #39d353"></div>
            </div>
            <span>More</span>
          </div>

          <div class="git-timeline">
            <div class="git-timeline-title">
              <span>Recent Commit History</span>
              <span class="badge badge-indigo">Branch: main</span>
            </div>
            <div id="git-commit-list">
              ${this.renderCommitList()}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderCommitList() {
    return this.recentCommits.map(c => `
      <div class="git-commit-item">
        <div class="git-commit-left">
          <span class="git-hash">${c.hash}</span>
          <span class="git-msg">${c.msg}</span>
        </div>
        <span class="git-time">${c.time}</span>
      </div>
    `).join('');
  }

  bindEvents() {
    const simBtn = document.getElementById('btn-simulate-commit');
    if (simBtn) {
      simBtn.addEventListener('click', () => this.simulateCommit());
    }
  }

  simulateCommit(customMsg = null) {
    this.totalCommits += 1;
    const hash = Math.random().toString(16).substring(2, 9);
    const msgs = [
      'fix: refine responsive glassmorphism styles',
      'perf: optimize local storage caching layer',
      'feat: add developer audio chimes to timer',
      'docs: update developer dashboard cheatsheet',
      'refactor: streamline command palette dispatcher'
    ];
    const msg = customMsg || msgs[Math.floor(Math.random() * msgs.length)];

    this.recentCommits.unshift({
      hash: hash,
      msg: msg,
      time: 'Just now'
    });
    if (this.recentCommits.length > 5) this.recentCommits.pop();

    // Update last heatmap cell
    const lastCell = this.heatmapData[this.heatmapData.length - 1];
    if (lastCell) {
      lastCell.count += 1;
      lastCell.level = Math.min(4, Math.max(1, lastCell.level + 1));
    }

    // Refresh UI
    const totalEl = document.getElementById('total-commits-val');
    if (totalEl) totalEl.textContent = this.totalCommits;

    const listEl = document.getElementById('git-commit-list');
    if (listEl) listEl.innerHTML = this.renderCommitList();

    const cells = document.querySelectorAll('.heatmap-cell');
    if (cells.length > 0) {
      const last = cells[cells.length - 1];
      last.setAttribute('data-level', lastCell.level);
      last.setAttribute('title', `${lastCell.count} commits on ${lastCell.formattedDate}`);
      last.style.transform = 'scale(1.5)';
      setTimeout(() => { last.style.transform = ''; }, 300);
    }
  }

  init() {
    this.generateHeatmapData();
    this.render();
  }
}

window.GithubWidgetInstance = new GithubWidget();
