/**
 * Tech Feed & News Aggregator Module
 * Curates developer headlines and trending engineering articles
 */

class TechFeed {
  constructor() {
    this.feeds = [
      { title: 'Designing High-Performance Vanilla JS Architecture', source: 'HackerNews', points: '248 pts', time: '2h ago', tag: 'Architecture' },
      { title: 'The Modern State of Web Workers & Offline Web Apps', source: 'Dev.to', points: '182 pts', time: '4h ago', tag: 'Web' },
      { title: 'Building resilient CLI pipelines with Git hooks', source: 'GitHub Blog', points: '315 pts', time: '6h ago', tag: 'DevOps' },
      { title: 'Why Micro-interactions make or break Developer Tooling', source: 'UI Trends', points: '194 pts', time: '8h ago', tag: 'Design' }
    ];
  }

  renderHtml() {
    return `
      <div class="card" id="tech-feed-card">
        <div class="card-header">
          <div class="card-title-group">
            <div class="card-icon" style="background: rgba(245, 158, 11, 0.12); color: var(--accent-amber);">
              <i class="ph ph-newspaper"></i>
            </div>
            <div>
              <h2 class="card-title">Tech Radar & Feed</h2>
              <p class="card-subtitle">Curated Developer Intelligence</p>
            </div>
          </div>
          <span class="badge badge-amber">Live</span>
        </div>

        <div class="card-body">
          <div class="tech-feed-list">
            ${this.feeds.map(f => `
              <a href="#" class="tech-feed-item" onclick="event.preventDefault()">
                <div>
                  <div class="tech-feed-title">${f.title}</div>
                  <div class="tech-feed-meta">
                    <span class="badge badge-indigo">${f.tag}</span>
                    <span>${f.source}</span> &bull; 
                    <span>${f.points}</span> &bull; 
                    <span>${f.time}</span>
                  </div>
                </div>
                <i class="ph ph-arrow-up-right" style="color: var(--text-muted); font-size: 0.9rem;"></i>
              </a>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

window.TechFeedInstance = new TechFeed();
