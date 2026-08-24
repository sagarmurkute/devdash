import { CodingHoursData, ProjectItem, HabitItem, NoteItem, KanbanTask } from './types';

const PREFIX = 'devdash_';

export const DEFAULT_CODING_HOURS: CodingHoursData = {
  todayTotal: 4.5,
  target: 6.0,
  languages: [
    { name: 'JavaScript', hours: 2.5, color: '#f7df1e' },
    { name: 'TypeScript', hours: 1.2, color: '#3178c6' },
    { name: 'CSS/HTML', hours: 0.8, color: '#6366f1' },
  ],
  weeklyLog: [
    { day: 'Mon', hours: 5.2 },
    { day: 'Tue', hours: 6.1 },
    { day: 'Wed', hours: 4.8 },
    { day: 'Thu', hours: 7.0 },
    { day: 'Fri', hours: 5.5 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 4.5 },
  ],
};

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'p-1',
    name: 'DevDash Command Center',
    desc: 'High-performance developer dashboard and engineering productivity suite.',
    status: 'In Progress',
    progress: 85,
    repo: 'https://github.com/sagarmurkute/devdash',
    tags: ['Next.js', 'React', 'TypeScript'],
    updated: 'Just now',
  },
  {
    id: 'p-2',
    name: 'AI Code Reviewer CLI',
    desc: 'Automated static analysis & LLM PR reviewer bot.',
    status: 'Planning',
    progress: 30,
    repo: 'https://github.com/sagarmurkute/ai-reviewer',
    tags: ['Python', 'OpenAI', 'Git'],
    updated: '2d ago',
  },
  {
    id: 'p-3',
    name: 'Micro-SaaS Boilerplate',
    desc: 'Lightweight auth, payments & multi-tenant template.',
    status: 'Active',
    progress: 60,
    repo: 'https://github.com/sagarmurkute/saas-starter',
    tags: ['Next.js', 'PostgreSQL', 'Stripe'],
    updated: '4d ago',
  },
];

export const DEFAULT_HABITS: HabitItem[] = [
  {
    id: 'h-1',
    title: 'Commit to GitHub Streak',
    icon: 'GitCommit',
    days: [true, true, true, true, true, true, true],
    streak: 42,
  },
  {
    id: 'h-2',
    title: 'Solve 1 LeetCode Problem',
    icon: 'Code',
    days: [true, true, true, false, true, true, true],
    streak: 12,
  },
  {
    id: 'h-3',
    title: 'Read 1 Engineering Article',
    icon: 'BookOpen',
    days: [true, false, true, true, true, false, true],
    streak: 5,
  },
  {
    id: 'h-4',
    title: 'Deep Focus 2h (No Distractions)',
    icon: 'Crosshair',
    days: [true, true, true, true, false, true, true],
    streak: 8,
  },
  {
    id: 'h-5',
    title: 'Review 1 Pull Request',
    icon: 'GitPullRequest',
    days: [false, true, true, true, true, true, false],
    streak: 6,
  },
];

export const DEFAULT_NOTES: NoteItem[] = [
  {
    id: 'n-1',
    title: 'DevDash Roadmap & Database Migration',
    category: 'Architecture',
    tag: 'High Priority',
    content:
      'Plan SQLite / PostgreSQL schema for user profiles, streak history, and sync across multiple dev machines.',
    updated: 'Today',
  },
  {
    id: 'n-2',
    title: 'CSS Custom Properties Design Tokens',
    category: 'UI/UX',
    tag: 'Tokens',
    content:
      'Maintain dark glassmorphism system using HSL alpha transparency and smooth cubic-bezier transitions.',
    updated: 'Yesterday',
  },
  {
    id: 'n-3',
    title: 'Web Audio Synthesizer Idea',
    category: 'Ideas',
    tag: 'Audio',
    content:
      'Use Web Audio API oscillator nodes for custom ambient noise generator (White noise, Pink noise, Rain sound).',
    updated: '3d ago',
  },
];

export const DEFAULT_TASKS: KanbanTask[] = [
  {
    id: 't-1',
    title: 'Implement React Next.js DevDash',
    status: 'done',
    priority: 'high',
    tag: 'Core',
    est: '2h',
  },
  {
    id: 't-2',
    title: 'Maintain 8 commits for GitHub streak',
    status: 'in-progress',
    priority: 'high',
    tag: 'Git',
    est: '1h',
  },
  {
    id: 't-3',
    title: 'Add dark glassmorphic styling & shortcuts',
    status: 'in-progress',
    priority: 'med',
    tag: 'UI/UX',
    est: '1.5h',
  },
  {
    id: 't-4',
    title: 'Integrate JSON validator & snippet vault',
    status: 'todo',
    priority: 'med',
    tag: 'Tools',
    est: '3h',
  },
  {
    id: 't-5',
    title: 'Setup port pinger & tech news aggregator',
    status: 'todo',
    priority: 'low',
    tag: 'API',
    est: '1h',
  },
];

export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

export function exportBackupJson(): void {
  if (typeof window === 'undefined') return;
  const backup: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(PREFIX)) {
      try {
        backup[key] = JSON.parse(localStorage.getItem(key) || 'null');
      } catch {
        backup[key] = localStorage.getItem(key);
      }
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

export function importBackupJson(jsonString: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const data = JSON.parse(jsonString);
    Object.keys(data).forEach((k) => {
      if (k.startsWith(PREFIX)) {
        localStorage.setItem(k, typeof data[k] === 'string' ? data[k] : JSON.stringify(data[k]));
      }
    });
    return true;
  } catch (e) {
    console.error('Import failed', e);
    return false;
  }
}
