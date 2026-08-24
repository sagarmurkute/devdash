/**
 * Developer Habit Tracker Module
 * 7-day interactive weekly habit matrix with streak counting & completion score
 */

class HabitTracker {
  constructor(containerId = 'habits-widget-container') {
    this.container = document.getElementById(containerId);
    this.daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.habits = window.DevDashStorage?.get('habits') || [];
    this.init();
  }

  save() {
    window.DevDashStorage?.set('habits', this.habits);
  }

  getWeeklyCompletionRate() {
    let totalChecks = 0;
    let completedChecks = 0;
    this.habits.forEach(h => {
      h.days.forEach(d => {
        totalChecks++;
        if (d) completedChecks++;
      });
    });
    return totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;
  }

  toggleDay(habitId, dayIndex) {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return;

    habit.days[dayIndex] = !habit.days[dayIndex];
    if (habit.days[dayIndex]) {
      habit.streak += 1;
    } else {
      habit.streak = Math.max(0, habit.streak - 1);
    }

    this.save();
    this.render();
  }

  render() {
    if (!this.container) return;

    const rate = this.getWeeklyCompletionRate();

    this.container.innerHTML = `
      <div class="card habits-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(16, 185, 129, 0.12); color: var(--accent-emerald);">
              <i class="ph ph-check-square-offset"></i>
            </div>
            <div>
              <h2 class="card-title">Developer Habit Matrix</h2>
              <p class="card-subtitle">Weekly Consistency: ${rate}% Target Met</p>
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" id="btn-add-habit">
            <i class="ph ph-plus"></i> New Habit
          </button>
        </div>

        <div class="card-body" style="overflow-x: auto;">
          <table class="habits-table">
            <thead>
              <tr>
                <th style="width: 40%;">Habit Routine</th>
                ${this.daysOfWeek.map(d => `<th>${d}</th>`).join('')}
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              ${this.habits.map(h => `
                <tr data-id="${h.id}">
                  <td>
                    <div class="habit-name-cell">
                      <i class="ph ${h.icon || 'ph-check'} habit-icon"></i>
                      <span>${h.title}</span>
                    </div>
                  </td>
                  ${h.days.map((checked, idx) => `
                    <td>
                      <button class="habit-check-btn ${checked ? 'checked' : ''}" 
                              data-id="${h.id}" 
                              data-day="${idx}" 
                              title="Toggle ${this.daysOfWeek[idx]}">
                        <i class="ph ph-check"></i>
                      </button>
                    </td>
                  `).join('')}
                  <td>
                    <div class="habit-streak-pill">
                      <i class="ph ph-fire"></i> ${h.streak}d
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('.habit-check-btn').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const day = parseInt(btn.getAttribute('data-day'), 10);
        this.toggleDay(id, day);
      };
    });

    const addBtn = document.getElementById('btn-add-habit');
    if (addBtn) addBtn.onclick = () => this.openAddModal();
  }

  openAddModal() {
    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 420px; padding: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i class="ph ph-plus-circle" style="color: var(--accent-emerald);"></i> Add Daily Dev Habit</h3>
          <button class="btn-icon" id="btn-close-add-habit"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-add-habit" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Habit Routine</label>
            <input type="text" id="habit-input-title" class="input" placeholder="e.g. Read RFC or Docs 15m" required autofocus />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Icon Symbol</label>
            <select id="habit-input-icon" class="select">
              <option value="ph-code">Code (&lt;/&gt;)</option>
              <option value="ph-book-open">Reading (Book)</option>
              <option value="ph-git-commit">Git (Commit)</option>
              <option value="ph-crosshair">Focus (Target)</option>
              <option value="ph-lightning">Speed (Lightning)</option>
            </select>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-add-habit">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Routine</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    document.getElementById('btn-close-add-habit').onclick = close;
    document.getElementById('btn-cancel-add-habit').onclick = close;

    document.getElementById('form-add-habit').onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('habit-input-title').value.trim();
      const icon = document.getElementById('habit-input-icon').value;

      if (title) {
        this.habits.push({
          id: 'h-' + Date.now(),
          title,
          icon,
          days: [false, false, false, false, false, false, false],
          streak: 0
        });
        this.save();
        this.render();
        close();
      }
    };
  }

  init() {
    this.render();
  }
}

window.HabitTrackerInstance = new HabitTracker();
