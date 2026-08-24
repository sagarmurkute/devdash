/**
 * API & Port Health Monitor Module
 * Monitors localhost ports, simulating ping latency & status
 */

class HealthMonitor {
  constructor(containerId = 'port-monitor-card') {
    this.containerId = containerId;
    this.services = [
      { name: 'Dev Server (Vite/React)', port: 5173, status: 'online', latency: '12ms' },
      { name: 'Backend API (Express/FastAPI)', port: 3000, status: 'online', latency: '24ms' },
      { name: 'PostgreSQL / Database', port: 5432, status: 'online', latency: '4ms' },
      { name: 'Redis Cache Server', port: 6379, status: 'idle', latency: '2ms' }
    ];
  }

  renderHtml() {
    return `
      <div class="card" id="port-monitor-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(6, 182, 212, 0.12); color: var(--accent-cyan);">
              <i class="ph ph-hard-drives"></i>
            </div>
            <div>
              <h2 class="card-title">Port & API Monitor</h2>
              <p class="card-subtitle">Local Developer Environment</p>
            </div>
          </div>
          <button class="btn-icon btn-sm" id="btn-refresh-ports" title="Ping Services">
            <i class="ph ph-arrows-clockwise"></i>
          </button>
        </div>

        <div class="card-body">
          <div class="port-list" id="port-items-list">
            ${this.renderList()}
          </div>
        </div>
      </div>
    `;
  }

  renderList() {
    return this.services.map(s => {
      const isOnline = s.status === 'online';
      const badgeClass = isOnline ? 'badge-emerald' : 'badge-amber';
      return `
        <div class="port-item">
          <div class="port-left">
            <span class="status-indicator" style="background-color: ${isOnline ? 'var(--accent-emerald)' : 'var(--accent-amber)'}"></span>
            <div>
              <div style="font-weight: 500;">${s.name}</div>
              <span class="port-badge">localhost:${s.port}</span>
            </div>
          </div>
          <div style="text-align: right;">
            <span class="badge ${badgeClass}">${s.status}</span>
            <div class="port-latency">${s.latency}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  pingServices() {
    this.services.forEach(s => {
      const lat = Math.floor(Math.random() * 28) + 3;
      s.latency = `${lat}ms`;
    });
    const listEl = document.getElementById('port-items-list');
    if (listEl) listEl.innerHTML = this.renderList();
  }

  bindEvents() {
    const btn = document.getElementById('btn-refresh-ports');
    if (btn) {
      btn.onclick = () => this.pingServices();
    }
  }
}

window.HealthMonitorInstance = new HealthMonitor();
