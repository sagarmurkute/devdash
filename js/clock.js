/**
 * Header Module - Equal Sized Swiss Metrics Grid & Minimal Motivation
 */

class HeaderClock {
  constructor(containerId = 'main-header') {
    this.container = document.getElementById(containerId);
    this.currentTheme = localStorage.getItem('devdash_theme') || 'light';
    this.applyTheme(this.currentTheme);

    this.quotes = [
      { quote: 'Simplicity is prerequisite for reliability.', author: 'Dijkstra' },
      { quote: 'Form follows function — eliminate the superfluous.', author: 'Max Bill' },
      { quote: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
      { quote: 'Consistency is the catalyst of engineering mastery.', author: 'DevDash' },
      { quote: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
      { quote: 'Clarity precedes architectural elegance.', author: 'Design Maxim' }
    ];

    this.quoteIndex = Math.floor(Math.random() * this.quotes.length);
    this.init();
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('devdash_theme', theme);
    const icon = document.getElementById('theme-toggle-icon');
    if (icon) {
      icon.className = `ph ${theme === 'light' ? 'ph-moon' : 'ph-sun'}`;
    }
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme);
  }

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 5) return 'Late Night Session';
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 22) return 'Good Evening';
    return 'Night Owl Mode';
  }

  render() {
    if (!this.container) return;
    const currentQuote = this.quotes[this.quoteIndex];
    const hoursData = window.DevDashStorage?.get('coding_hours') || { todayTotal: 4.5, target: 6.0 };
    const username = localStorage.getItem('devdash_github_user') || 'sagarmurkute';

    this.container.innerHTML = `
      <div class="header-top-banner">
        <div class="header-greeting-wrap">
          <span class="swiss-tag">SYS // DEVDASH</span>
          <h1 class="greeting-text">${this.getGreeting()}, ${username}</h1>
        </div>
        <div class="motivation-line">
          <span>“${currentQuote.quote}”</span>
          <span class="quote-author">// ${currentQuote.author}</span>
        </div>
      </div>

      <div class="header-metrics-grid">
        <!-- Box 1: Developer Status -->
        <div class="header-metric-box">
          <div class="metric-box-header">
            <span class="metric-box-label">WORKSPACE // USER</span>
            <span class="status-indicator"></span>
          </div>
          <div class="metric-box-val">${username}</div>
          <div class="metric-box-sub">Active Sprint &bull; Production Mode</div>
        </div>

        <!-- Box 2: GitHub Streak -->
        <div class="header-metric-box">
          <div class="metric-box-header">
            <span class="metric-box-label">STREAK // CONSISTENCY</span>
            <i class="ph ph-fire" style="color: var(--accent-swiss-red); font-size: 0.85rem;"></i>
          </div>
          <div class="metric-box-val" id="top-streak-val">42 DAYS</div>
          <div class="metric-box-sub">Rank: Top 5% &bull; Target: 60 Days</div>
        </div>

        <!-- Box 3: Daily Coding Hours -->
        <div class="header-metric-box">
          <div class="metric-box-header">
            <span class="metric-box-label">DAILY FOCUS LOG</span>
            <i class="ph ph-hourglass" style="color: var(--text-muted); font-size: 0.85rem;"></i>
          </div>
          <div class="metric-box-val" id="top-focus-val">${hoursData.todayTotal}h / ${hoursData.target}h</div>
          <div class="metric-box-sub">${Math.round((hoursData.todayTotal / hoursData.target) * 100)}% of Daily Goal Completed</div>
        </div>

        <!-- Box 4: Command & Utilities Quick Bar (Identical Size) -->
        <div class="header-metric-box" style="padding: 0.5rem;">
          <div class="metric-box-actions">
            <button class="btn btn-secondary btn-sm" id="btn-open-cmd" title="Command Palette (^K)">
              <i class="ph ph-command"></i> ^K
            </button>
            <button class="btn btn-secondary btn-sm" id="btn-quick-scratchpad" title="Quick Scratchpad Note">
              <i class="ph ph-note-pencil"></i> Note
            </button>
            <button class="btn-icon" id="btn-toggle-theme" title="Toggle Theme">
              <i class="ph ${this.currentTheme === 'light' ? 'ph-moon' : 'ph-sun'}" id="theme-toggle-icon"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Hook buttons
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    const cmdBtn = document.getElementById('btn-open-cmd');
    if (cmdBtn) {
      cmdBtn.addEventListener('click', () => {
        if (window.CommandPaletteInstance) {
          window.CommandPaletteInstance.toggle();
        }
      });
    }

    const noteBtn = document.getElementById('btn-quick-scratchpad');
    if (noteBtn) {
      noteBtn.addEventListener('click', () => {
        if (typeof openScratchpadModal === 'function') {
          openScratchpadModal();
        }
      });
    }
  }

  init() {
    this.render();
  }
}

// Instantiate on script load
window.headerClockInstance = new HeaderClock();
