/**
 * Command Palette Module
 * Handles Ctrl+K modal, action dispatching, and keyboard navigation
 */

class CommandPalette {
  constructor() {
    this.modal = document.getElementById('command-palette-modal');
    this.isOpen = false;
    this.selectedIndex = 0;
    this.actions = [
      {
        id: 'new-task',
        title: 'Create New Task',
        desc: 'Add a new issue or task to the Kanban board',
        icon: 'ph-plus-circle',
        category: 'Kanban Sprint',
        badge: 'N',
        run: () => window.KanbanInstance?.openCreateModal()
      },
      {
        id: 'start-pomodoro',
        title: 'Start Pomodoro Focus',
        desc: 'Begin a 25-minute deep focus session',
        icon: 'ph-timer',
        category: 'Focus Station',
        badge: 'P',
        run: () => window.PomodoroInstance?.start()
      },
      {
        id: 'pause-pomodoro',
        title: 'Pause / Resume Pomodoro',
        desc: 'Toggle current focus timer state',
        icon: 'ph-pause-circle',
        category: 'Focus Station',
        badge: 'Space',
        run: () => window.PomodoroInstance?.toggle()
      },
      {
        id: 'json-tool',
        title: 'JSON Formatter & Validator',
        desc: 'Open the built-in JSON formatting utility',
        icon: 'ph-code',
        category: 'Dev Toolbox',
        badge: 'J',
        run: () => window.ToolboxInstance?.openTab('json')
      },
      {
        id: 'base64-tool',
        title: 'Base64 & URL Converter',
        desc: 'Encode or decode Base64 and URL strings',
        icon: 'ph-arrows-left-right',
        category: 'Dev Toolbox',
        badge: 'B',
        run: () => window.ToolboxInstance?.openTab('base64')
      },
      {
        id: 'snippet-tool',
        title: 'Code Snippets Vault',
        desc: 'Access or save reusable developer snippets',
        icon: 'ph-file-code',
        category: 'Dev Toolbox',
        badge: 'S',
        run: () => window.ToolboxInstance?.openTab('snippets')
      },
      {
        id: 'simulate-commit',
        title: 'Simulate Git Commit',
        desc: 'Trigger a new commit on the GitHub activity matrix',
        icon: 'ph-git-commit',
        category: 'GitHub Streak',
        badge: 'G',
        run: () => window.GithubWidgetInstance?.simulateCommit()
      },
      {
        id: 'toggle-theme',
        title: 'Toggle Minimal Light / Dark Theme',
        desc: 'Switch between minimal light mode and cyber dark mode',
        icon: 'ph-sun',
        category: 'Theme',
        badge: 'T',
        run: () => window.headerClockInstance?.toggleTheme()
      },
      {
        id: 'toggle-fullscreen',
        title: 'Toggle Fullscreen Mode',
        desc: 'Expand DevDash to distraction-free fullscreen',
        icon: 'ph-arrows-out',
        category: 'System',
        badge: 'F11',
        run: () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      }
    ];

    this.filteredActions = [...this.actions];
    this.init();
  }

  init() {
    this.renderModal();
    this.bindEvents();
  }

  renderModal() {
    if (!this.modal) return;
    this.modal.innerHTML = `
      <div class="modal-container" style="max-width: 600px;">
        <div class="cmd-palette-wrapper">
          <div class="cmd-palette-input-wrap">
            <i class="ph ph-magnifying-glass"></i>
            <input type="text" class="cmd-palette-input" id="cmd-search-input" placeholder="Type a command or search tools..." autofocus />
            <kbd class="cmd-item-badge">ESC</kbd>
          </div>
          <div class="cmd-palette-results" id="cmd-results-list"></div>
          <div class="cmd-palette-footer">
            <div class="cmd-shortcuts-hint">
              <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Select</span>
              <span><kbd>ESC</kbd> Close</span>
            </div>
            <span>DevDash v1.0</span>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Keyboard shortcut to trigger palette: Ctrl+K or Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      } else if (this.isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.moveSelection(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.moveSelection(-1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.executeSelected();
        }
      }
    });

    // Close on overlay backdrop click
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    const input = document.getElementById('cmd-search-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.filter(e.target.value);
      });
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.modal.classList.add('active');
    const input = document.getElementById('cmd-search-input');
    if (input) {
      input.value = '';
      this.filter('');
      setTimeout(() => input.focus(), 50);
    }
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove('active');
  }

  filter(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.filteredActions = [...this.actions];
    } else {
      this.filteredActions = this.actions.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.desc.toLowerCase().includes(q) || 
        a.category.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    this.renderResults();
  }

  moveSelection(delta) {
    if (this.filteredActions.length === 0) return;
    this.selectedIndex = (this.selectedIndex + delta + this.filteredActions.length) % this.filteredActions.length;
    this.renderResults();
  }

  executeSelected() {
    const action = this.filteredActions[this.selectedIndex];
    if (action) {
      this.close();
      action.run();
    }
  }

  renderResults() {
    const list = document.getElementById('cmd-results-list');
    if (!list) return;

    if (this.filteredActions.length === 0) {
      list.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
          <i class="ph ph-warning-circle" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
          No commands found matching your query
        </div>
      `;
      return;
    }

    list.innerHTML = this.filteredActions.map((action, idx) => `
      <div class="cmd-item ${idx === this.selectedIndex ? 'selected' : ''}" data-index="${idx}">
        <div class="cmd-item-left">
          <div class="cmd-item-icon">
            <i class="ph ${action.icon}"></i>
          </div>
          <div>
            <div class="cmd-item-title">${action.title}</div>
            <div class="cmd-item-desc">${action.desc}</div>
          </div>
        </div>
        <kbd class="cmd-item-badge">${action.badge}</kbd>
      </div>
    `).join('');

    // Add click listeners to items
    list.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        this.selectedIndex = idx;
        this.executeSelected();
      });
    });

    // Scroll selected into view
    const selectedEl = list.querySelector('.cmd-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }
}

window.CommandPaletteInstance = new CommandPalette();
