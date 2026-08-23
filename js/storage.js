/**
 * Unified Storage Manager Module
 * Handles local storage persistence with schema validation, defaults,
 * and JSON Export/Import capabilities for future database migration.
 */

class StorageManager {
  constructor() {
    this.prefix = 'devdash_';
    this.init();
  }

  init() {
    // Ensure default structures exist
    if (!this.get('coding_hours')) {
      this.set('coding_hours', {
        todayTotal: 4.5,
        target: 6.0,
        languages: [
          { name: 'JavaScript', hours: 2.5, color: '#f7df1e' },
          { name: 'TypeScript', hours: 1.2, color: '#3178c6' },
          { name: 'CSS/HTML', hours: 0.8, color: '#6366f1' }
        ],
        weeklyLog: [
          { day: 'Mon', hours: 5.2 },
          { day: 'Tue', hours: 6.1 },
          { day: 'Wed', hours: 4.8 },
          { day: 'Thu', hours: 7.0 },
          { day: 'Fri', hours: 5.5 },
          { day: 'Sat', hours: 3.5 },
          { day: 'Sun', hours: 4.5 }
        ]
      });
    }

    if (!this.get('projects')) {
      this.set('projects', [
        {
          id: 'p-1',
          name: 'DevDash Command Center',
          desc: 'High-performance vanilla developer dashboard with streak analytics.',
          status: 'In Progress',
          progress: 85,
          repo: 'https://github.com/sagarmurkute/devdash',
          tags: ['Vanilla JS', 'CSS3', 'HTML5'],
          updated: 'Just now'
        },
        {
          id: 'p-2',
          name: 'AI Code Reviewer CLI',
          desc: 'Automated static analysis & LLM PR reviewer bot.',
          status: 'Planning',
          progress: 30,
          repo: 'https://github.com/sagarmurkute/ai-reviewer',
          tags: ['Python', 'OpenAI', 'Git'],
          updated: '2d ago'
        },
        {
          id: 'p-3',
          name: 'Micro-SaaS Boilerplate',
          desc: 'Lightweight auth, payments & multi-tenant template.',
          status: 'Active',
          progress: 60,
          repo: 'https://github.com/sagarmurkute/saas-starter',
          tags: ['Next.js', 'PostgreSQL', 'Stripe'],
          updated: '4d ago'
        }
      ]);
    }

    if (!this.get('habits')) {
      this.set('habits', [
        { id: 'h-1', title: 'Commit to GitHub Streak', icon: 'ph-git-commit', days: [true, true, true, true, true, true, true], streak: 42 },
        { id: 'h-2', title: 'Solve 1 LeetCode Problem', icon: 'ph-code', days: [true, true, true, false, true, true, true], streak: 12 },
        { id: 'h-3', title: 'Read 1 Engineering Article', icon: 'ph-book-open', days: [true, false, true, true, true, false, true], streak: 5 },
        { id: 'h-4', title: 'Deep Focus 2h (No Distractions)', icon: 'ph-crosshair', days: [true, true, true, true, false, true, true], streak: 8 },
        { id: 'h-5', title: 'Review 1 Pull Request', icon: 'ph-git-pull-request', days: [false, true, true, true, true, true, false], streak: 6 }
      ]);
    }

    if (!this.get('notes')) {
      this.set('notes', [
        {
          id: 'n-1',
          title: 'DevDash Roadmap & Database Migration',
          category: 'Architecture',
          tag: 'High Priority',
          content: 'Plan SQLite / PostgreSQL schema for user profiles, streak history, and sync across multiple dev machines.',
          updated: 'Today'
        },
        {
          id: 'n-2',
          title: 'CSS Custom Properties Design Tokens',
          category: 'UI/UX',
          tag: 'Tokens',
          content: 'Maintain dark glassmorphism system using HSL alpha transparency and smooth cubic-bezier transitions.',
          updated: 'Yesterday'
        },
        {
          id: 'n-3',
          title: 'Web Audio Synthesizer Idea',
          category: 'Ideas',
          tag: 'Audio',
          content: 'Use Web Audio API oscillator nodes for custom ambient noise generator (White noise, Pink noise, Rain sound).',
          updated: '3d ago'
        }
      ]);
    }
  }

  get(key) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return null;
    }
  }

  set(key, val) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(val));
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
    }
  }

  exportJson() {
    const backup = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith(this.prefix)) {
        backup[k] = JSON.parse(localStorage.getItem(k));
      }
    }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devdash-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importJson(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      Object.keys(data).forEach(k => {
        if (k.startsWith(this.prefix)) {
          localStorage.setItem(k, JSON.stringify(data[k]));
        }
      });
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }
}

window.DevDashStorage = new StorageManager();
