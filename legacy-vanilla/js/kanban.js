/**
 * Kanban Sprint Planner Module
 * Complete task management with Todo, In Progress, Done columns and LocalStorage
 */

class KanbanBoard {
  constructor(containerId = 'kanban-widget-container') {
    this.container = document.getElementById(containerId);
    this.storageKey = 'devdash_kanban_tasks';
    this.tasks = this.loadTasks();
    this.init();
  }

  getDefaultTasks() {
    return [
      { id: 't-1', title: 'Implement Vanilla DevDash first draft', status: 'done', priority: 'high', tag: 'Core', est: '2h' },
      { id: 't-2', title: 'Maintain 8 commits for GitHub streak', status: 'in-progress', priority: 'high', tag: 'Git', est: '1h' },
      { id: 't-3', title: 'Add dark glassmorphic styling & shortcuts', status: 'in-progress', priority: 'med', tag: 'UI/UX', est: '1.5h' },
      { id: 't-4', title: 'Integrate JSON validator & snippet vault', status: 'todo', priority: 'med', tag: 'Tools', est: '3h' },
      { id: 't-5', title: 'Setup port pinger & tech news aggregator', status: 'todo', priority: 'low', tag: 'API', est: '1h' }
    ];
  }

  loadTasks() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : this.getDefaultTasks();
    } catch (e) {
      return this.getDefaultTasks();
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  }

  render() {
    if (!this.container) return;

    const todoTasks = this.tasks.filter(t => t.status === 'todo');
    const inProgressTasks = this.tasks.filter(t => t.status === 'in-progress');
    const doneTasks = this.tasks.filter(t => t.status === 'done');

    this.container.innerHTML = `
      <div class="card kanban-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(99, 102, 241, 0.12); color: var(--accent-primary);">
              <i class="ph ph-kanban"></i>
            </div>
            <div>
              <h2 class="card-title">Sprint Tasks & Backlog</h2>
              <p class="card-subtitle">${this.tasks.length} total tasks &bull; ${doneTasks.length} completed</p>
            </div>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-add-task-modal">
            <i class="ph ph-plus"></i> New Task
          </button>
        </div>

        <div class="card-body">
          <div class="kanban-board">
            <!-- Todo Column -->
            <div class="kanban-column" data-status="todo">
              <div class="kanban-column-header">
                <span class="column-title"><i class="ph ph-circle-dashed" style="color: var(--accent-amber);"></i> To Do</span>
                <span class="column-count">${todoTasks.length}</span>
              </div>
              <div class="kanban-task-list" id="col-todo">
                ${this.renderTaskList(todoTasks)}
              </div>
            </div>

            <!-- In Progress Column -->
            <div class="kanban-column" data-status="in-progress">
              <div class="kanban-column-header">
                <span class="column-title"><i class="ph ph-arrows-clockwise" style="color: var(--accent-cyan);"></i> In Progress</span>
                <span class="column-count">${inProgressTasks.length}</span>
              </div>
              <div class="kanban-task-list" id="col-in-progress">
                ${this.renderTaskList(inProgressTasks)}
              </div>
            </div>

            <!-- Done Column -->
            <div class="kanban-column" data-status="done">
              <div class="kanban-column-header">
                <span class="column-title"><i class="ph ph-check-circle" style="color: var(--accent-emerald);"></i> Completed</span>
                <span class="column-count">${doneTasks.length}</span>
              </div>
              <div class="kanban-task-list" id="col-done">
                ${this.renderTaskList(doneTasks)}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderTaskList(tasks) {
    if (tasks.length === 0) {
      return `<div style="text-align: center; color: var(--text-muted); padding: 1rem; font-size: 0.75rem;">No tasks here</div>`;
    }

    return tasks.map(task => {
      let priorityBadge = '';
      if (task.priority === 'high') priorityBadge = '<span class="badge badge-rose">High</span>';
      else if (task.priority === 'med') priorityBadge = '<span class="badge badge-amber">Med</span>';
      else priorityBadge = '<span class="badge badge-cyan">Low</span>';

      return `
        <div class="task-item" data-id="${task.id}">
          <div class="task-top">
            <span class="badge badge-indigo">${task.tag || 'Dev'}</span>
            ${priorityBadge}
          </div>
          <div class="task-title">${task.title}</div>
          <div class="task-footer">
            <span><i class="ph ph-clock"></i> ${task.est || '1h'}</span>
            <div class="task-actions">
              ${task.status !== 'todo' ? `<button class="task-btn-action" data-action="move-left" data-id="${task.id}" title="Move left"><i class="ph ph-caret-left"></i></button>` : ''}
              ${task.status !== 'done' ? `<button class="task-btn-action" data-action="move-right" data-id="${task.id}" title="Move right"><i class="ph ph-caret-right"></i></button>` : ''}
              <button class="task-btn-action task-btn-delete" data-action="delete" data-id="${task.id}" title="Delete task"><i class="ph ph-trash"></i></button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  bindEvents() {
    const addBtn = document.getElementById('btn-add-task-modal');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.openCreateModal());
    }

    // Delegate actions on task lists
    this.container.querySelectorAll('.task-btn-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');

        if (action === 'delete') {
          this.deleteTask(id);
        } else if (action === 'move-right') {
          this.moveTask(id, 1);
        } else if (action === 'move-left') {
          this.moveTask(id, -1);
        }
      });
    });
  }

  moveTask(id, dir) {
    const statuses = ['todo', 'in-progress', 'done'];
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    const currentIdx = statuses.indexOf(task.status);
    const newIdx = currentIdx + dir;
    if (newIdx >= 0 && newIdx < statuses.length) {
      task.status = statuses[newIdx];
      this.saveTasks();
      this.render();
    }
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
    this.render();
  }

  addTask(title, priority = 'med', tag = 'Feature', est = '1h') {
    const newTask = {
      id: 't-' + Date.now(),
      title,
      status: 'todo',
      priority,
      tag,
      est
    };
    this.tasks.push(newTask);
    this.saveTasks();
    this.render();
  }

  openCreateModal() {
    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 460px; padding: 1.5rem;">
        <div class="card-header" style="margin-bottom: 1.25rem;">
          <h3 class="card-title"><i class="ph ph-plus-circle" style="color: var(--accent-primary);"></i> Create Sprint Task</h3>
          <button class="btn-icon" id="btn-close-task-modal"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-new-task" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Task Description</label>
            <input type="text" id="task-input-title" class="input" placeholder="e.g. Refactor API endpoints" required autofocus />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Priority</label>
              <select id="task-input-priority" class="select">
                <option value="high">High</option>
                <option value="med" selected>Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Tag / Category</label>
              <input type="text" id="task-input-tag" class="input" value="Feature" placeholder="UI, Bug, Core" />
            </div>
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Estimated Time</label>
            <input type="text" id="task-input-est" class="input" value="2h" placeholder="e.g. 30m, 2h" />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-task-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Task</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');

    const closeBtn = document.getElementById('btn-close-task-modal');
    const cancelBtn = document.getElementById('btn-cancel-task-modal');
    const closeModal = () => modal.classList.remove('active');

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;

    const form = document.getElementById('form-new-task');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('task-input-title').value.trim();
        const priority = document.getElementById('task-input-priority').value;
        const tag = document.getElementById('task-input-tag').value.trim();
        const est = document.getElementById('task-input-est').value.trim();

        if (title) {
          this.addTask(title, priority, tag, est);
          closeModal();
        }
      };
    }
  }

  init() {
    this.render();
  }
}

window.KanbanInstance = new KanbanBoard();
