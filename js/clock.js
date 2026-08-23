/**
 * Clock & Header Module
 * Renders developer greeting, live status, and multi-timezone clock bar
 */

class HeaderClock {
  constructor(containerId = 'main-header') {
    this.container = document.getElementById(containerId);
    this.timezones = [
      { label: 'Local', tz: Intl.DateTimeFormat().resolvedOptions().timeZone },
      { label: 'UTC', tz: 'UTC' },
      { label: 'SF (PT)', tz: 'America/Los_Angeles' },
      { label: 'LDN (GMT)', tz: 'Europe/London' },
      { label: 'TKY (JST)', tz: 'Asia/Tokyo' }
    ];
    this.init();
  }

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 5) return 'Late Night Coding';
    if (hour < 12) return 'Good Morning, Developer';
    if (hour < 17) return 'Good Afternoon, Developer';
    if (hour < 22) return 'Good Evening, Developer';
    return 'Night Owl Mode';
  }

  getGreetingIcon() {
    const hour = new Date().getHours();
    if (hour < 6 || hour >= 20) return '<i class="ph ph-moon-stars"></i>';
    if (hour < 12) return '<i class="ph ph-sun"></i>';
    if (hour < 17) return '<i class="ph ph-sun-horizon"></i>';
    return '<i class="ph ph-sparkle"></i>';
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="header-left">
        <div class="dev-avatar">
          <i class="ph ph-terminal-window"></i>
        </div>
        <div>
          <h1 class="greeting-text">
            <span id="greeting-msg">${this.getGreeting()}</span>
            <span id="greeting-icon">${this.getGreetingIcon()}</span>
          </h1>
          <p class="greeting-subtext">
            <span class="status-indicator"></span>
            <span>Focus Mode Active</span> &bull; 
            <span id="current-date-str">${this.getFormattedDate()}</span>
          </p>
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
        <button class="cmd-shortcut-badge" id="btn-open-cmd" title="Open Command Palette (Ctrl+K)">
          <i class="ph ph-command"></i>
          <span>Command</span>
          <span class="cmd-key">Ctrl+K</span>
        </button>
        <button class="btn btn-secondary btn-sm" id="btn-quick-scratchpad" title="Open Scratchpad">
          <i class="ph ph-note-pencil"></i> Note
        </button>
      </div>
    `;

    // Hook up buttons
    const cmdBtn = document.getElementById('btn-open-cmd');
    if (cmdBtn) {
      cmdBtn.addEventListener('click', () => {
        if (window.CommandPaletteInstance) {
          window.CommandPaletteInstance.toggle();
        }
      });
    }
  }

  getFormattedDate() {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
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

    const greetingMsg = document.getElementById('greeting-msg');
    const greetingIcon = document.getElementById('greeting-icon');
    if (greetingMsg) greetingMsg.textContent = this.getGreeting();
    if (greetingIcon) greetingIcon.innerHTML = this.getGreetingIcon();
  }

  init() {
    this.render();
    this.updateTimes();
    setInterval(() => this.updateTimes(), 1000);
  }
}

// Instantiate on script load
window.headerClockInstance = new HeaderClock();
