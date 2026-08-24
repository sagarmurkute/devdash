/**
 * Projects in Progress Module
 * Displays active development projects with progress tracking, tags, and repo shortcuts
 */

class ProjectsManager {
  constructor(containerId = 'projects-widget-container') {
    this.container = document.getElementById(containerId);
    this.projects = window.DevDashStorage?.get('projects') || [];
    this.init();
  }

  save() {
    window.DevDashStorage?.set('projects', this.projects);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="card projects-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(6, 182, 212, 0.12); color: var(--accent-cyan);">
              <i class="ph ph-folder-open"></i>
            </div>
            <div>
              <h2 class="card-title">Projects In Progress</h2>
              <p class="card-subtitle">${this.projects.length} Active Workspaces</p>
            </div>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-add-new-project">
            <i class="ph ph-plus"></i> New Project
          </button>
        </div>

        <div class="card-body">
          <div class="projects-grid">
            ${this.projects.map(p => {
              let statusBadge = 'badge-cyan';
              if (p.status === 'In Progress') statusBadge = 'badge-indigo';
              else if (p.status === 'Active') statusBadge = 'badge-emerald';
              else if (p.status === 'Planning') statusBadge = 'badge-amber';

              return `
                <div class="project-item-card" data-id="${p.id}">
                  <div>
                    <div class="project-top-row">
                      <div class="project-title">${p.name}</div>
                      <span class="badge ${statusBadge}">${p.status}</span>
                    </div>
                    <div class="project-desc">${p.desc}</div>
                    
                    <div class="project-tags">
                      ${p.tags.map(t => `<span class="badge badge-indigo">${t}</span>`).join('')}
                    </div>
                  </div>

                  <div class="project-progress-wrap">
                    <div class="project-progress-header">
                      <span>Sprint Completion</span>
                      <span style="font-family: var(--font-mono); font-weight: 600; color: var(--text-primary);">${p.progress}%</span>
                    </div>
                    <div class="project-progress-bar">
                      <div class="project-progress-fill" style="width: ${p.progress}%;"></div>
                    </div>
                  </div>

                  <div class="project-footer">
                    <span style="color: var(--text-muted); font-size: 0.7rem;">Updated ${p.updated || 'recently'}</span>
                    <div class="project-links">
                      ${p.repo ? `<a href="${p.repo}" target="_blank" class="project-link-btn" title="View Repository"><i class="ph ph-github-logo"></i></a>` : ''}
                      <button class="task-btn-action btn-edit-proj" data-id="${p.id}" title="Edit Progress"><i class="ph ph-pencil-simple"></i></button>
                      <button class="task-btn-action btn-delete-proj" data-id="${p.id}" title="Delete Project"><i class="ph ph-trash"></i></button>
                    </div>
                  </div>
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
    const addBtn = document.getElementById('btn-add-new-project');
    if (addBtn) addBtn.onclick = () => this.openAddModal();

    this.container.querySelectorAll('.btn-delete-proj').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.deleteProject(id);
      };
    });

    this.container.querySelectorAll('.btn-edit-proj').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.openEditModal(id);
      };
    });
  }

  deleteProject(id) {
    this.projects = this.projects.filter(p => p.id !== id);
    this.save();
    this.render();
  }

  openAddModal() {
    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 480px; padding: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i class="ph ph-folder-plus" style="color: var(--accent-cyan);"></i> Create New Project</h3>
          <button class="btn-icon" id="btn-close-add-proj"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-add-project" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Project Name</label>
            <input type="text" id="proj-input-name" class="input" placeholder="e.g. AI Code Assistant" required autofocus />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Description</label>
            <textarea id="proj-input-desc" class="textarea" rows="2" placeholder="Brief project summary..."></textarea>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Status</label>
              <select id="proj-input-status" class="select">
                <option value="In Progress">In Progress</option>
                <option value="Active">Active</option>
                <option value="Planning">Planning</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Progress (%)</label>
              <input type="number" id="proj-input-progress" class="input" min="0" max="100" value="25" />
            </div>
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Tech Tags (Comma separated)</label>
            <input type="text" id="proj-input-tags" class="input" placeholder="React, Node.js, Tailwind" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">GitHub Repo URL</label>
            <input type="url" id="proj-input-repo" class="input" placeholder="https://github.com/..." />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-add-proj">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Project</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    document.getElementById('btn-close-add-proj').onclick = close;
    document.getElementById('btn-cancel-add-proj').onclick = close;

    document.getElementById('form-add-project').onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('proj-input-name').value.trim();
      const desc = document.getElementById('proj-input-desc').value.trim();
      const status = document.getElementById('proj-input-status').value;
      const progress = parseInt(document.getElementById('proj-input-progress').value, 10) || 0;
      const tagsStr = document.getElementById('proj-input-tags').value.trim();
      const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()) : ['Code'];
      const repo = document.getElementById('proj-input-repo').value.trim();

      if (name) {
        this.projects.push({
          id: 'p-' + Date.now(),
          name,
          desc,
          status,
          progress,
          tags,
          repo,
          updated: 'Just now'
        });
        this.save();
        this.render();
        close();
      }
    };
  }

  openEditModal(id) {
    const proj = this.projects.find(p => p.id === id);
    if (!proj) return;

    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 440px; padding: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i class="ph ph-pencil-simple" style="color: var(--accent-primary);"></i> Update Project</h3>
          <button class="btn-icon" id="btn-close-edit-proj"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-edit-project" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Project Name</label>
            <input type="text" id="edit-proj-name" class="input" value="${proj.name}" required />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Progress: <span id="progress-val-text">${proj.progress}%</span></label>
            <input type="range" id="edit-proj-progress" min="0" max="100" value="${proj.progress}" style="width: 100%; accent-color: var(--accent-cyan);" />
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Status</label>
            <select id="edit-proj-status" class="select">
              <option value="In Progress" ${proj.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Active" ${proj.status === 'Active' ? 'selected' : ''}>Active</option>
              <option value="Planning" ${proj.status === 'Planning' ? 'selected' : ''}>Planning</option>
            </select>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-edit-proj">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    document.getElementById('btn-close-edit-proj').onclick = close;
    document.getElementById('btn-cancel-edit-proj').onclick = close;

    const rangeInput = document.getElementById('edit-proj-progress');
    const rangeText = document.getElementById('progress-val-text');
    if (rangeInput && rangeText) {
      rangeInput.oninput = () => { rangeText.textContent = `${rangeInput.value}%`; };
    }

    document.getElementById('form-edit-project').onsubmit = (e) => {
      e.preventDefault();
      proj.name = document.getElementById('edit-proj-name').value.trim();
      proj.progress = parseInt(rangeInput.value, 10);
      proj.status = document.getElementById('edit-proj-status').value;
      proj.updated = 'Just now';
      this.save();
      this.render();
      close();
    };
  }

  init() {
    this.render();
  }
}

window.ProjectsInstance = new ProjectsManager();
