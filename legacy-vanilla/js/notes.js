/**
 * Notes & Ideas Vault Module
 * Fast notes creation, live search filtering, categorization, and local storage sync
 */

class NotesManager {
  constructor(containerId = 'notes-widget-container') {
    this.container = document.getElementById(containerId);
    this.notes = window.DevDashStorage?.get('notes') || [];
    this.searchQuery = '';
    this.init();
  }

  save() {
    window.DevDashStorage?.set('notes', this.notes);
  }

  getFilteredNotes() {
    if (!this.searchQuery.trim()) return this.notes;
    const q = this.searchQuery.toLowerCase();
    return this.notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      (n.tag && n.tag.toLowerCase().includes(q))
    );
  }

  render() {
    if (!this.container) return;

    const filtered = this.getFilteredNotes();

    this.container.innerHTML = `
      <div class="card notes-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(168, 85, 247, 0.12); color: var(--accent-purple);">
              <i class="ph ph-lightbulb-filament"></i>
            </div>
            <div>
              <h2 class="card-title">Notes & Ideas Vault</h2>
              <p class="card-subtitle">${this.notes.length} Brain Dumps & Architectures</p>
            </div>
          </div>

          <button class="btn btn-primary btn-sm" id="btn-add-new-note">
            <i class="ph ph-plus"></i> New Note
          </button>
        </div>

        <div class="card-body">
          <div class="notes-controls">
            <div class="notes-search-wrap">
              <i class="ph ph-magnifying-glass" style="color: var(--text-muted);"></i>
              <input type="text" class="notes-search-input" id="notes-search-input" placeholder="Search notes, ideas, tags..." value="${this.searchQuery}" />
            </div>
          </div>

          <div class="notes-grid" id="notes-items-grid">
            ${filtered.length === 0 ? `
              <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">
                No notes found matching your search.
              </div>
            ` : filtered.map(n => `
              <div class="note-item-card" data-id="${n.id}">
                <div>
                  <div class="note-card-header">
                    <span class="note-title">${n.title}</span>
                    <span class="badge badge-indigo">${n.category}</span>
                  </div>
                  <p class="note-content" style="margin-top: 0.4rem;">${n.content}</p>
                </div>

                <div class="note-footer">
                  <span class="badge badge-cyan" style="font-size: 0.65rem;">${n.tag || 'General'}</span>
                  <div style="display: flex; gap: 0.3rem;">
                    <button class="task-btn-action btn-copy-note" data-id="${n.id}" title="Copy note text"><i class="ph ph-copy"></i></button>
                    <button class="task-btn-action btn-delete-note" data-id="${n.id}" title="Delete note"><i class="ph ph-trash"></i></button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const addBtn = document.getElementById('btn-add-new-note');
    if (addBtn) addBtn.onclick = () => this.openAddModal();

    const searchInput = document.getElementById('notes-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.render();
      };
    }

    this.container.querySelectorAll('.btn-delete-note').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        this.deleteNote(id);
      };
    });

    this.container.querySelectorAll('.btn-copy-note').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const note = this.notes.find(n => n.id === id);
        if (note) {
          navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="ph ph-check" style="color: var(--accent-emerald);"></i>';
          setTimeout(() => { btn.innerHTML = original; }, 1200);
        }
      };
    });
  }

  deleteNote(id) {
    this.notes = this.notes.filter(n => n.id !== id);
    this.save();
    this.render();
  }

  openAddModal() {
    const modal = document.getElementById('toolbox-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-container" style="max-width: 480px; padding: 1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i class="ph ph-note-pencil" style="color: var(--accent-purple);"></i> New Brain Note & Idea</h3>
          <button class="btn-icon" id="btn-close-add-note"><i class="ph ph-x"></i></button>
        </div>
        <form id="form-add-note" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Note Title</label>
            <input type="text" id="note-input-title" class="input" placeholder="e.g. WebSocket Sync Strategy" required autofocus />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div>
              <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Category</label>
              <select id="note-input-category" class="select">
                <option value="Architecture">Architecture</option>
                <option value="Ideas">Ideas</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Bug Fix">Bug Fix</option>
                <option value="Snippet">Snippet</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Tag</label>
              <input type="text" id="note-input-tag" class="input" placeholder="e.g. High Priority" />
            </div>
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; margin-bottom: 0.4rem; color: var(--text-secondary);">Content / Markdown Details</label>
            <textarea id="note-input-content" class="textarea" rows="4" placeholder="Write thoughts, pseudo-code, requirements..." required></textarea>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 0.6rem; margin-top: 0.5rem;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-add-note">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Note</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
    const close = () => modal.classList.remove('active');
    document.getElementById('btn-close-add-note').onclick = close;
    document.getElementById('btn-cancel-add-note').onclick = close;

    document.getElementById('form-add-note').onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById('note-input-title').value.trim();
      const category = document.getElementById('note-input-category').value;
      const tag = document.getElementById('note-input-tag').value.trim() || 'General';
      const content = document.getElementById('note-input-content').value.trim();

      if (title && content) {
        this.notes.unshift({
          id: 'n-' + Date.now(),
          title,
          category,
          tag,
          content,
          updated: 'Just now'
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

window.NotesInstance = new NotesManager();
