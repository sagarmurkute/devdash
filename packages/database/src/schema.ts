// Database models & contracts for DevStreak
export interface UserProfileSchema {
  id: string;
  name: string;
  role: string;
  githubUsername: string;
  streakCount: number;
  longestStreak: number;
  level: number;
  xpCurrent: number;
  xpMax: number;
  updatedAt: string;
}

export interface ActivityLogSchema {
  id: string;
  userId: string;
  type: 'commit' | 'pomodoro' | 'task' | 'streak';
  title: string;
  timestamp: string;
}
