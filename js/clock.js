/**
 * Clock & Header Module - Swiss International Typography
 * Renders developer greeting, rotating motivation quote, and multi-timezone clock bar
 */

class HeaderClock {
  constructor(containerId = 'main-header') {
    this.container = document.getElementById(containerId);
    this.currentTheme = localStorage.getItem('devdash_theme') || 'light';
    this.applyTheme(this.currentTheme);
    this.timezones = [
      { label: 'LOCAL', tz: Intl.DateTimeFormat().resolvedOptions().timeZone },
      { label: 'UTC', tz: 'UTC' },
      { label: 'SF (PT)', tz: 'America/Los_Angeles' },
      { label: 'LDN (GMT)', tz: 'Europe/London' },
      { label: 'TKY (JST)', tz: 'Asia/Tokyo' }
    ];

    this.quotes = [
      { quote: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
      { quote: 'Form follows function — eliminate the unnecessary.', author: 'Swiss Design Principle' },
      { quote: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
      { quote: 'Consistency is the DNA of engineering mastery.', author: 'DevDash' },
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

    this.container.innerHTML = `
      <div class="header-top-row">
        <div class="header-left">
          <span class="swiss-tag">SYS // DEVDASH</span>
          <div>
            <h1 class="greeting-text">
              <span>${this.getGreeting()}, Developer</span>
            </h1>
          </div>
        </div>

        <div class="timezone-bar" id="tz-bar-container">
          ${this.timezones.map(item => `
            <div class="tz-item">
              <span class="tz-label">${item.label}</span>
              <span class="tz-time" data-tz="${item.tz}">--:--:--</span>
            </div>
          `).join('')}
        </div>

        <div class="header-actions">
          <button class="btn-icon" id="btn-toggle-theme" title="Toggle Light/Dark Theme">
            <i class="ph ${this.currentTheme === 'light' ? 'ph-moon' : 'ph-sun'}" id="theme-toggle-icon"></i>
          </button>
          <button class="cmd-shortcut-badge" id="btn-open-cmd" title="Open Command Palette (Ctrl+K)">
            <span>COMMAND</span>
            <span class="cmd-key">^K</span>
          </button>
          <button class="btn btn-secondary btn-sm" id="btn-quick-scratchpad" title="Open Scratchpad">
            NOTE
          </button>
        </div>
      </div>

      <div class="header-motivation-bar">
        <div class="motivation-quote" id="header-quote-text">
          ${currentQuote.quote}
        </div>
        <div class="motivation-author" id="header-quote-author">
          // ${currentQuote.author}
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
  }

  updateTimes() {
    const timeElements = document.querySelectorAll('.tz-time[data-tz]');
    const now = new Date();

    timeElements.forEach(el => {
      const tz = el.getAttribute('data-tz');
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        el.textContent = timeStr;
      } catch (e) {
        el.textContent = now.toLocaleTimeString();
      }
    });
  }

  init() {
    this.render();
    this.updateTimes();
    setInterval(() => this.updateTimes(), 1000);
  }
}

// Instantiate on script load
window.headerClockInstance = new HeaderClock();
