/**
 * GitHub Streak & Activity Matrix Module
 * Generates 52-week activity heatmap, streak tracker, live GitHub REST API fetcher & manual commit logging
 */

class GithubWidget {
  constructor(containerId = 'github-widget-container') {
    this.container = document.getElementById(containerId);
    this.username = localStorage.getItem('devdash_github_user') || 'sagarmurkute';
    this.totalCommits = 1428;
    this.currentStreak = 42; // Days
    this.longestStreak = 78; // Days
    this.recentCommits = [
      { hash: 'a412cf5', msg: 'feat: api port health monitor, tech feed aggregator, and final polish', time: 'Just now' },
      { hash: '808bab0', msg: 'feat: developer utility toolbox and code snippet manager', time: '10m ago' },
      { hash: '387b8aa', msg: 'feat: pomodoro focus station with audio cues and circular timer', time: '20m ago' },
      { hash: 'e0de39c', msg: 'feat: kanban sprint board and developer task manager with storage', time: '30m ago' },
      { hash: 'ab5246d', msg: 'feat: github streak matrix, stats widget, and activity timeline', time: '40m ago' }
    ];
    this.heatmapData = [];
    this.init();
  }

  generateHeatmapData() {
    const days = 364;
    const data = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

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
              <div style="display: flex; align-items: center; gap: 0.4rem;">
                <span class="card-subtitle" id="github-user-display">${this.username} / devdash</span>
                <button class="task-btn-action" id="btn-change-gh-user" title="Change GitHub Username" style="font-size: 0.75rem;"><i class="ph ph-pencil-simple"></i></button>
              </div>
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

            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-secondary btn-sm" id="btn-fetch-gh-api" title="Sync with GitHub API">
                <i class="ph ph-arrows-clockwise"></i> Sync API
              </button>
              <button class="btn btn-primary btn-sm" id="btn-manual-log-commit" title="Log Commit Manually">
                <i class="ph ph-plus"></i> Log Commit
              </button>
            </div>
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
    const manualBtn = document.getElementById('btn-manual-log-commit');
    if (manualBtn) manualBtn.onclick = () => this.openManualCommitModal();

    const apiBtn = document.getElementById('btn-fetch-gh-api');
    if (apiBtn) apiBtn.onclick = () => this.fetchGitHubApi();

    const userBtn = document.getElementById('btn-change-gh-user');
    if (userBtn) userBtn.onclick = () => this.openChangeUserModal();
  }

  async fetchGitHubApi() {
    const btn = document.getElementById('btn-fetch-gh-api');
    if (btn) btn.innerHTML = '<i class="ph ph-arrows-clockwise ph-spin"></i> Syncing...';

    try {
      const res = await fetch(`https://api.github.com/users/${this.username}/events/public`);
      if (res.ok) {
        const events = await res.json();
        const pushEvents = events.filter(e => e.type === 'PushEvent');
        if (pushEvents.length > 0) {
          this.recentCommits = pushEvents.slice(0, 5).map(e => {
            const commit = e.payload?.commits?.[0];
            return {
              hash: (commit?.sha || Math.random().toString(16)).substring(0, 7),
              msg: commit?.message || `Pushed to ${e.repo?.name}`,
              time: new Date(e.created_at).toLocaleTimeString()
            };
          });
          this.totalCommits += pushEvents.length;
        }
      }
    } catch (e) {
      console.log('GitHub API fallback');
    }

    if (btn) btn.innerHTML = '<i class="ph ph-check"></i> Synced!';
    setTimeout(() => {
      if (btn) btn.innerHTML = '<i class="ph ph-arrows-clockwise"></i> Sync API';
      this.render();
    }, 1200);
  }

  openChangeUserModal() {
    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 400px; padding: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i class="ph ph-github-logo"></i> Set GitHub Username</h3>
          <button class="btn-icon" id="btn-close-gh-user"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-gh-user" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">GitHub Username</label>
            <input type="text" id="gh-user-input" class="input" value="${this.username}" required autofocus />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-gh-user">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Username</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    document.getElementById('btn-close-gh-user').onclick = close;
    document.getElementById('btn-cancel-gh-user').onclick = close;

    document.getElementById('form-gh-user').onsubmit = (e) => {
      e.preventDefault();
      const val = document.getElementById('gh-user-input').value.trim();
      if (val) {
        this.username = val;
        localStorage.setItem('devdash_github_user', val);
        this.render();
        close();
      }
    };
  }

  openManualCommitModal() {
    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 440px; padding: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i class="ph ph-git-commit" style="color: var(--accent-emerald);"></i> Log Git Commit</h3>
          <button class="btn-icon" id="btn-close-commit-modal"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-manual-commit" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Commit Message</label>
            <input type="text" id="commit-msg-input" class="input" placeholder="e.g. feat: add habit tracker matrix" required autofocus />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Commit Hash (Optional)</label>
            <input type="text" id="commit-hash-input" class="input input-mono" placeholder="Auto-generated if blank" />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-commit-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Log to Streak</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    document.getElementById('btn-close-commit-modal').onclick = close;
    document.getElementById('btn-cancel-commit-modal').onclick = close;

    document.getElementById('form-manual-commit').onsubmit = (e) => {
      e.preventDefault();
      const msg = document.getElementById('commit-msg-input').value.trim();
      const hash = document.getElementById('commit-hash-input').value.trim() || Math.random().toString(16).substring(2, 9);

      if (msg) {
        this.simulateCommit(msg, hash);
        close();
      }
    };
  }

  simulateCommit(customMsg = null, customHash = null) {
    this.totalCommits += 1;
    const hash = customHash || Math.random().toString(16).substring(2, 9);
    const msg = customMsg || 'feat: maintain daily streak code updates';

    this.recentCommits.unshift({
      hash: hash,
      msg: msg,
      time: 'Just now'
    });
    if (this.recentCommits.length > 5) this.recentCommits.pop();

    const lastCell = this.heatmapData[this.heatmapData.length - 1];
    if (lastCell) {
      lastCell.count += 1;
      lastCell.level = Math.min(4, Math.max(1, lastCell.level + 1));
    }

    this.render();
  }

  init() {
    this.generateHeatmapData();
    this.render();
  }
}

window.GithubWidgetInstance = new GithubWidget();
