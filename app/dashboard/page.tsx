'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import DevStreakHeader from '@/components/DevStreakHeader';
import TopStatsRow from '@/components/TopStatsRow';
import GitHubContributionCard from '@/components/GitHubContributionCard';
import FocusSessionCard from '@/components/FocusSessionCard';
import TodaysAgendaCard from '@/components/TodaysAgendaCard';
import ProjectsOverviewCard from '@/components/ProjectsOverviewCard';
import HabitTrackerCard from '@/components/HabitTrackerCard';
import RecentActivityCard from '@/components/RecentActivityCard';
import CommandPalette from '@/components/CommandPalette';
import ScratchpadModal from '@/components/ScratchpadModal';

export default function DevSlashDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);

  // Core metrics state
  const [streakCount, setStreakCount] = useState(32);
  const [codingHoursTotal, setCodingHoursTotal] = useState(4.6);
  const [tasksCompletedTotal, setTasksCompletedTotal] = useState(12);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCommandAction = (actionId: string) => {
    if (actionId === 'open-cmd') {
      setIsCmdOpen(true);
    } else if (actionId === 'start-pomodoro') {
      alert('Focus session started!');
    } else if (actionId === 'new-task') {
      alert('New sprint task modal');
    }
  };

  const handleSessionComplete = (minutes: number) => {
    const additionalHours = Math.round((minutes / 60) * 10) / 10;
    setCodingHoursTotal((prev) => Math.round((prev + additionalHours) * 10) / 10);
  };

  if (!mounted) {
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)' }} />;
  }

  return (
    <div className="devstreak-layout">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 2. Main Dashboard Content */}
      <main className="devstreak-main">
        {/* Top Header Bar */}
        <DevStreakHeader
          onOpenCmd={() => setIsCmdOpen(true)}
          onOpenNotifications={() =>
            alert(
              'You have 3 new notifications: PR review requested, streak milestone reached, and 2 project tasks due!'
            )
          }
        />

        {/* Top 5 Metrics Row */}
        <TopStatsRow
          streak={streakCount}
          codingHours={codingHoursTotal}
          tasksCompleted={tasksCompletedTotal}
          activeProjectsCount={8}
          productivityScore={86}
        />

        {/* Middle Row (GitHub Contribution, Focus Session, Today's Agenda) */}
        <div className="middle-grid-row">
          <GitHubContributionCard streak={streakCount} totalContributions={523} />
          <FocusSessionCard onSessionComplete={handleSessionComplete} />
          <TodaysAgendaCard />
        </div>

        {/* Bottom Row (Projects Overview, Habit Tracker, Recent Activity) */}
        <div className="bottom-grid-row">
          <ProjectsOverviewCard />
          <HabitTrackerCard />
          <RecentActivityCard />
        </div>
      </main>

      {/* Global Command Palette (⌘ K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onActionTrigger={handleCommandAction}
      />

      {/* Developer Scratchpad Modal */}
      <ScratchpadModal isOpen={isScratchpadOpen} onClose={() => setIsScratchpadOpen(false)} />
    </div>
  );
}
