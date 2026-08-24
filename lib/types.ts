export interface LanguageHour {
  name: string;
  hours: number;
  color: string;
}

export interface WeeklyDayLog {
  day: string;
  hours: number;
}

export interface CodingHoursData {
  todayTotal: number;
  target: number;
  languages: LanguageHour[];
  weeklyLog: WeeklyDayLog[];
}

export interface ProjectItem {
  id: string;
  name: string;
  desc: string;
  status: 'In Progress' | 'Active' | 'Planning';
  progress: number;
  repo?: string;
  tags: string[];
  updated: string;
}

export interface HabitItem {
  id: string;
  title: string;
  icon: string;
  days: boolean[]; // 7 days: Mon-Sun
  streak: number;
}

export interface NoteItem {
  id: string;
  title: string;
  category: 'Architecture' | 'Ideas' | 'UI/UX' | 'Bug Fix' | 'Snippet';
  tag: string;
  content: string;
  updated: string;
}

export interface KanbanTask {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'med' | 'low';
  tag: string;
  est: string;
}

export interface GitCommitItem {
  hash: string;
  msg: string;
  time: string;
}

export interface HeatmapCell {
  date: string;
  formattedDate: string;
  level: number;
  count: number;
}

export interface FeatureSpec {
  id: string;
  name: string;
  desc: string;
}

export interface RoadmapCategory {
  category: string;
  num: string;
  features: FeatureSpec[];
}

export interface PortService {
  name: string;
  port: number;
  status: 'online' | 'idle' | 'offline';
  latency: string;
}

export interface TechFeedItem {
  title: string;
  source: string;
  points: string;
  time: string;
  tag: string;
}

export interface CodeSnippet {
  id: string;
  title: string;
  lang: string;
  code: string;
}
