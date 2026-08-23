/**
 * Developer Utilities & Code Snippet Vault Module
 */

class DevToolbox {
  constructor(containerId = 'toolbox-widget-container') {
    this.container = document.getElementById(containerId);
    this.activeTab = 'json';
    this.snippets = [
      { id: 's1', title: 'Debounce Function', lang: 'JavaScript', code: 'function debounce(fn, ms=300) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}' },
      { id: 's2', title: 'Fetch with Timeout', lang: 'JavaScript', code: 'async function fetchWithTimeout(url, opts={}, ms=5000) {\n  const ctrl = new AbortController();\n  const id = setTimeout(() => ctrl.abort(), ms);\n  const res = await fetch(url, { ...opts, signal: ctrl.signal });\n  clearTimeout(id);\n  return res;\n}' },
      { id: 's3', title: 'Git Undo Last Commit', lang: 'Git', code: 'git reset --soft HEAD~1' },
      { id: 's4', title: 'Modern CSS Glassmorphism', lang: 'CSS', code: 'background: rgba(255, 255, 255, 0.05);\nbackdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.1);' }
    ];
    this.init();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="card toolbox-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(168, 85, 247, 0.12); color: var(--accent-purple);">
              <i class="ph ph-wrench"></i>
            </div>
            <div>
              <h2 class="card-title">Developer Utilities</h2>
              <p class="card-subtitle">Formatters, Encoders & Snippet Vault</p>
            </div>
          </div>

          <span class="badge badge-indigo">Offline Ready</span>
        </div>

        <div class="toolbox-tabs">
          <button class="toolbox-tab-btn ${this.activeTab === 'json' ? 'active' : ''}" data-tab="json">
            <i class="ph ph-code"></i> JSON Formatter
          </button>
          <button class="toolbox-tab-btn ${this.activeTab === 'base64' ? 'active' : ''}" data-tab="base64">
            <i class="ph ph-arrows-left-right"></i> Base64 & URL
          </button>
          <button class="toolbox-tab-btn ${this.activeTab === 'snippets' ? 'active' : ''}" data-tab="snippets">
            <i class="ph ph-bookmarks"></i> Snippet Vault
          </button>
        </div>

        <!-- JSON Tab -->
        <div class="toolbox-tab-content ${this.activeTab === 'json' ? 'active' : ''}" id="tab-json">
          <textarea id="json-input" class="textarea textarea-mono" rows="6" placeholder='Paste raw JSON here: {"dev": "dash", "streak": 8}'></textarea>
          <div class="tool-actions-bar">
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-primary btn-sm" id="btn-json-format"><i class="ph ph-brackets-curly"></i> Prettify</button>
              <button class="btn btn-secondary btn-sm" id="btn-json-minify"><i class="ph ph-arrows-in"></i> Minify</button>
              <button class="btn btn-secondary btn-sm" id="btn-json-validate"><i class="ph ph-check"></i> Validate</button>
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-secondary btn-sm" id="btn-json-copy"><i class="ph ph-copy"></i> Copy</button>
              <button class="btn btn-secondary btn-sm" id="btn-json-clear"><i class="ph ph-trash"></i> Clear</button>
            </div>
          </div>
          <div id="json-status-msg" style="font-size: 0.75rem; color: var(--text-muted); min-height: 18px;"></div>
        </div>

        <!-- Base64 Tab -->
        <div class="toolbox-tab-content ${this.activeTab === 'base64' ? 'active' : ''}" id="tab-base64">
          <textarea id="base64-input" class="textarea textarea-mono" rows="6" placeholder="Enter plain text or Base64 string..."></textarea>
          <div class="tool-actions-bar">
            <div style="display: flex; gap: 0.4rem;">
              <button class="btn btn-primary btn-sm" id="btn-b64-encode">Base64 Encode</button>
              <button class="btn btn-primary btn-sm" id="btn-b64-decode">Base64 Decode</button>
              <button class="btn btn-secondary btn-sm" id="btn-url-encode">URL Encode</button>
              <button class="btn btn-secondary btn-sm" id="btn-url-decode">URL Decode</button>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-b64-copy"><i class="ph ph-copy"></i> Copy</button>
          </div>
        </div>

        <!-- Snippets Tab -->
        <div class="toolbox-tab-content ${this.activeTab === 'snippets' ? 'active' : ''}" id="tab-snippets">
          <div class="snippet-grid">
            ${this.snippets.map(s => `
              <div class="snippet-card">
                <div class="snippet-header">
                  <span class="snippet-title">${s.title}</span>
                  <span class="badge badge-cyan">${s.lang}</span>
                </div>
                <div class="snippet-code-preview">${s.code}</div>
                <div style="display: flex; justify-content: flex-end;">
                  <button class="btn btn-secondary btn-sm btn-copy-snippet" data-code="${encodeURIComponent(s.code)}">
                    <i class="ph ph-copy"></i> Copy Snippet
                  </button>
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
    // Tabs
    this.container.querySelectorAll('.toolbox-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openTab(btn.getAttribute('data-tab'));
      });
    });

    // JSON Actions
    const jsonInput = document.getElementById('json-input');
    const jsonStatus = document.getElementById('json-status-msg');

    const setJsonMsg = (msg, isErr = false) => {
      if (jsonStatus) {
        jsonStatus.textContent = msg;
        jsonStatus.style.color = isErr ? 'var(--accent-rose)' : 'var(--accent-emerald)';
      }
    };

    const fmtBtn = document.getElementById('btn-json-format');
    if (fmtBtn) {
      fmtBtn.onclick = () => {
        try {
          if (!jsonInput.value.trim()) return;
          const parsed = JSON.parse(jsonInput.value);
          jsonInput.value = JSON.stringify(parsed, null, 2);
          setJsonMsg('✓ Valid JSON (Formatted with 2 spaces)');
        } catch (e) {
          setJsonMsg('✗ Invalid JSON: ' + e.message, true);
        }
      };
    }

    const minBtn = document.getElementById('btn-json-minify');
    if (minBtn) {
      minBtn.onclick = () => {
        try {
          if (!jsonInput.value.trim()) return;
          const parsed = JSON.parse(jsonInput.value);
          jsonInput.value = JSON.stringify(parsed);
          setJsonMsg('✓ Valid JSON (Minified)');
        } catch (e) {
          setJsonMsg('✗ Invalid JSON: ' + e.message, true);
        }
      };
    }

    const valBtn = document.getElementById('btn-json-validate');
    if (valBtn) {
      valBtn.onclick = () => {
        try {
          if (!jsonInput.value.trim()) return;
          JSON.parse(jsonInput.value);
          setJsonMsg('✓ JSON is completely valid!');
        } catch (e) {
          setJsonMsg('✗ JSON Syntax Error: ' + e.message, true);
        }
      };
    }

    const copyJsonBtn = document.getElementById('btn-json-copy');
    if (copyJsonBtn) {
      copyJsonBtn.onclick = () => {
        if (jsonInput.value) {
          navigator.clipboard.writeText(jsonInput.value);
          setJsonMsg('✓ Copied to clipboard!');
        }
      };
    }

    const clearJsonBtn = document.getElementById('btn-json-clear');
    if (clearJsonBtn) {
      clearJsonBtn.onclick = () => {
        jsonInput.value = '';
        if (jsonStatus) jsonStatus.textContent = '';
      };
    }

    // Base64 Actions
    const b64Input = document.getElementById('base64-input');
    const b64EncodeBtn = document.getElementById('btn-b64-encode');
    if (b64EncodeBtn) {
      b64EncodeBtn.onclick = () => {
        try {
          b64Input.value = btoa(unescape(encodeURIComponent(b64Input.value)));
        } catch (e) { alert('Encoding error'); }
      };
    }

    const b64DecodeBtn = document.getElementById('btn-b64-decode');
    if (b64DecodeBtn) {
      b64DecodeBtn.onclick = () => {
        try {
          b64Input.value = decodeURIComponent(escape(atob(b64Input.value)));
        } catch (e) { alert('Invalid Base64 string'); }
      };
    }

    const urlEncodeBtn = document.getElementById('btn-url-encode');
    if (urlEncodeBtn) {
      urlEncodeBtn.onclick = () => {
        b64Input.value = encodeURIComponent(b64Input.value);
      };
    }

    const urlDecodeBtn = document.getElementById('btn-url-decode');
    if (urlDecodeBtn) {
      urlDecodeBtn.onclick = () => {
        try {
          b64Input.value = decodeURIComponent(b64Input.value);
        } catch (e) { alert('URL decoding error'); }
      };
    }

    const b64CopyBtn = document.getElementById('btn-b64-copy');
    if (b64CopyBtn) {
      b64CopyBtn.onclick = () => {
        if (b64Input.value) {
          navigator.clipboard.writeText(b64Input.value);
        }
      };
    }

    // Snippet Copies
    this.container.querySelectorAll('.btn-copy-snippet').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = decodeURIComponent(btn.getAttribute('data-code'));
        navigator.clipboard.writeText(code);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-check"></i> Copied!';
        setTimeout(() => { btn.innerHTML = originalHtml; }, 1500);
      });
    });
  }

  openTab(tabKey) {
    this.activeTab = tabKey;
    this.render();
  }

  init() {
    this.render();
  }
}

window.ToolboxInstance = new DevToolbox();
