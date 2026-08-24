'use client';

import React, { useState } from 'react';
import { Kanban, Plus, CircleDashed, RefreshCw, CheckCircle2, Clock, ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react';
import { KanbanTask } from '@/lib/types';

interface KanbanBoardProps {
  tasks: KanbanTask[];
  onUpdate: (tasks: KanbanTask[]) => void;
}

export default function KanbanBoard({ tasks, onUpdate }: KanbanBoardProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'med' | 'low'>('med');
  const [newTag, setNewTag] = useState('Feature');
  const [newEst, setNewEst] = useState('2h');

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const moveTask = (id: string, dir: -1 | 1) => {
    const statuses: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done'];
    const updated = tasks.map(t => {
      if (t.id === id) {
        const curIdx = statuses.indexOf(t.status);
        const nextIdx = curIdx + dir;
        if (nextIdx >= 0 && nextIdx < statuses.length) {
          return { ...t, status: statuses[nextIdx] };
        }
      }
      return t;
    });
    onUpdate(updated);
  };

  const deleteTask = (id: string) => {
    onUpdate(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: KanbanTask = {
      id: 't-' + Date.now(),
      title: newTitle.trim(),
      status: 'todo',
      priority: newPriority,
      tag: newTag.trim() || 'Dev',
      est: newEst.trim() || '1h'
    };

    onUpdate([...tasks, newTask]);
    setNewTitle('');
    setIsAddModalOpen(false);
  };

  const renderColumn = (
    title: string, 
    statusKey: 'todo' | 'in-progress' | 'done', 
    columnTasks: KanbanTask[], 
    icon: React.ReactNode
  ) => {
    return (
      <div className="kanban-column">
        <div className="kanban-column-header">
          <span className="column-title">
            {icon} {title}
          </span>
          <span className="column-count">{columnTasks.length}</span>
        </div>

        <div className="kanban-task-list">
          {columnTasks.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem', fontSize: '0.75rem' }}>
              No tasks here
            </div>
          ) : (
            columnTasks.map(task => {
              let priorityBadge = <span className="badge badge-cyan">Low</span>;
              if (task.priority === 'high') priorityBadge = <span className="badge badge-rose">High</span>;
              else if (task.priority === 'med') priorityBadge = <span className="badge badge-amber">Med</span>;

              return (
                <div key={task.id} className="task-item">
                  <div className="task-top">
                    <span className="badge badge-indigo">{task.tag}</span>
                    {priorityBadge}
                  </div>
                  <div className="task-title">{task.title}</div>
                  <div className="task-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={11} /> {task.est}
                    </span>
                    <div className="task-actions">
                      {task.status !== 'todo' && (
                        <button 
                          className="task-btn-action" 
                          onClick={() => moveTask(task.id, -1)} 
                          title="Move left"
                          type="button"
                        >
                          <ChevronLeft size={12} />
                        </button>
                      )}
                      {task.status !== 'done' && (
                        <button 
                          className="task-btn-action" 
                          onClick={() => moveTask(task.id, 1)} 
                          title="Move right"
                          type="button"
                        >
                          <ChevronRight size={12} />
                        </button>
                      )}
                      <button 
                        className="task-btn-action" 
                        onClick={() => deleteTask(task.id)} 
                        title="Delete task"
                        type="button"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="card kanban-card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
            <Kanban size={15} />
          </div>
          <div>
            <h2 className="card-title">Sprint Tasks & Backlog</h2>
            <p className="card-subtitle">{tasks.length} total tasks &bull; {doneTasks.length} completed</p>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => setIsAddModalOpen(true)}
          type="button"
        >
          <Plus size={12} /> New Task
        </button>
      </div>

      <div className="card-body">
        <div className="kanban-board">
          {renderColumn('To Do', 'todo', todoTasks, <CircleDashed size={13} style={{ color: 'var(--accent-amber)' }} />)}
          {renderColumn('In Progress', 'in-progress', inProgressTasks, <RefreshCw size={13} style={{ color: 'var(--accent-cyan)' }} />)}
          {renderColumn('Completed', 'done', doneTasks, <CheckCircle2 size={13} style={{ color: 'var(--accent-emerald)' }} />)}
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '460px', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div className="card-header" style={{ marginBottom: '1.25rem' }}>
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Plus size={16} style={{ color: 'var(--accent-primary)' }} /> Create Sprint Task
              </h3>
              <button className="btn-icon" onClick={() => setIsAddModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Task Description
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g. Refactor API endpoints" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  required 
                  autoFocus 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Priority
                  </label>
                  <select 
                    className="select"
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as 'high' | 'med' | 'low')}
                  >
                    <option value="high">High</option>
                    <option value="med">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Tag / Category
                  </label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="UI, Bug, Core" 
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Estimated Time
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g. 30m, 2h" 
                  value={newEst}
                  onChange={e => setNewEst(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
