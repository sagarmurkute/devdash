/**
 * Main Application Orchestrator
 * Bootstraps DevDash, binds side widgets, quick scratchpad, and global shortcuts
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DevDash Initialized');

  // Render Side Widgets Container (Port Monitor + Tech Feed)
  const sideContainer = document.getElementById('side-widgets-container');
  if (sideContainer) {
    sideContainer.innerHTML = `
      <div class="side-widgets-wrapper">
        ${window.HealthMonitorInstance ? window.HealthMonitorInstance.renderHtml() : ''}
        ${window.TechFeedInstance ? window.TechFeedInstance.renderHtml() : ''}
      </div>
    `;

    if (window.HealthMonitorInstance) {
      window.HealthMonitorInstance.bindEvents();
    }
  }

  // Hook Quick Note / Scratchpad in Header
  const noteBtn = document.getElementById('btn-quick-scratchpad');
  if (noteBtn) {
    noteBtn.addEventListener('click', () => {
      openScratchpadModal();
    });
  }
});

function openScratchpadModal() {
  const modal = document.getElementById('toolbox-modal');
  if (!modal) return;

  const savedNote = localStorage.getItem('devdash_scratchpad_note') || '';

  modal.innerHTML = `
    <div class="modal-container" style="max-width: 550px; padding: 1.25rem;">
      <div class="card-header">
        <div class="card-title-group">
          <div class="card-icon" style="background: rgba(245, 158, 11, 0.12); color: var(--accent-amber);">
            <i class="ph ph-note-pencil"></i>
          </div>
          <div>
            <h3 class="card-title">Developer Scratchpad</h3>
            <p class="card-subtitle">Auto-saves to browser storage</p>
          </div>
        </div>
        <button class="btn-icon" id="btn-close-scratchpad"><i class="ph ph-x"></i></button>
      </div>

      <div class="card-body">
        <textarea id="scratchpad-text" class="textarea textarea-mono" rows="10" placeholder="Type quick notes, SQL snippets, terminal commands, or mental thoughts...">${savedNote}</textarea>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
          <span id="scratchpad-status" style="font-size: 0.75rem; color: var(--accent-emerald);">Saved automatically</span>
          <button class="btn btn-secondary btn-sm" id="btn-clear-scratchpad"><i class="ph ph-trash"></i> Clear</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const closeBtn = document.getElementById('btn-close-scratchpad');
  if (closeBtn) closeBtn.onclick = () => modal.classList.remove('active');

  const textEl = document.getElementById('scratchpad-text');
  const statusEl = document.getElementById('scratchpad-status');
  const clearBtn = document.getElementById('btn-clear-scratchpad');

  if (textEl) {
    textEl.addEventListener('input', () => {
      localStorage.setItem('devdash_scratchpad_note', textEl.value);
      if (statusEl) {
        statusEl.textContent = 'Saving...';
        setTimeout(() => { statusEl.textContent = 'Saved automatically'; }, 400);
      }
    });
  }

  if (clearBtn) {
    clearBtn.onclick = () => {
      if (textEl) textEl.value = '';
      localStorage.removeItem('devdash_scratchpad_note');
      if (statusEl) statusEl.textContent = 'Scratchpad cleared';
    };
  }
}
