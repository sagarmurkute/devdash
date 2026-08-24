'use client';

import React, { useState } from 'react';
import { FolderGit2, Plus, Edit2, Trash2, X } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import { ProjectItem } from '@/lib/types';

interface ProjectsTrackerProps {
  projects: ProjectItem[];
  onUpdate: (projects: ProjectItem[]) => void;
}

export default function ProjectsTracker({ projects, onUpdate }: ProjectsTrackerProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProj, setEditingProj] = useState<ProjectItem | null>(null);

  // New Project Form State
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState<'In Progress' | 'Active' | 'Planning'>('In Progress');
  const [newProgress, setNewProgress] = useState(25);
  const [newTags, setNewTags] = useState('');
  const [newRepo, setNewRepo] = useState('');

  // Edit Form State
  const [editName, setEditName] = useState('');
  const [editProgress, setEditProgress] = useState(0);
  const [editStatus, setEditStatus] = useState<'In Progress' | 'Active' | 'Planning'>('In Progress');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const tags = newTags.trim() ? newTags.split(',').map(t => t.trim()) : ['Code'];
    const newProj: ProjectItem = {
      id: 'p-' + Date.now(),
      name: newName.trim(),
      desc: newDesc.trim(),
      status: newStatus,
      progress: newProgress,
      tags,
      repo: newRepo.trim() || undefined,
      updated: 'Just now'
    };

    onUpdate([newProj, ...projects]);
    setNewName('');
    setNewDesc('');
    setNewTags('');
    setNewRepo('');
    setNewProgress(25);
    setIsAddModalOpen(false);
  };

  const openEdit = (p: ProjectItem) => {
    setEditingProj(p);
    setEditName(p.name);
    setEditProgress(p.progress);
    setEditStatus(p.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProj || !editName.trim()) return;

    const updated = projects.map(p => {
      if (p.id === editingProj.id) {
        return {
          ...p,
          name: editName.trim(),
          progress: editProgress,
          status: editStatus,
          updated: 'Just now'
        };
      }
      return p;
    });

    onUpdate(updated);
    setIsEditModalOpen(false);
    setEditingProj(null);
  };

  const handleDelete = (id: string) => {
    onUpdate(projects.filter(p => p.id !== id));
  };

  return (
    <div className="card projects-card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)' }}>
            <FolderGit2 size={15} />
          </div>
          <div>
            <h2 className="card-title">Projects In Progress</h2>
            <p className="card-subtitle">{projects.length} Active Workspaces</p>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => setIsAddModalOpen(true)}
          type="button"
        >
          <Plus size={12} /> New Project
        </button>
      </div>

      <div className="card-body">
        <div className="projects-grid">
          {projects.map(p => {
            let statusBadge = 'badge-cyan';
            if (p.status === 'In Progress') statusBadge = 'badge-indigo';
            else if (p.status === 'Active') statusBadge = 'badge-emerald';
            else if (p.status === 'Planning') statusBadge = 'badge-amber';

            return (
              <div key={p.id} className="project-item-card">
                <div>
                  <div className="project-top-row">
                    <div className="project-title">{p.name}</div>
                    <span className={`badge ${statusBadge}`}>{p.status}</span>
                  </div>
                  <div className="project-desc">{p.desc}</div>

                  <div className="project-tags">
                    {p.tags.map((t, idx) => (
                      <span key={idx} className="badge badge-indigo">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="project-progress-wrap">
                  <div className="project-progress-header">
                    <span>Sprint Completion</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {p.progress}%
                    </span>
                  </div>
                  <div className="project-progress-bar">
                    <div className="project-progress-fill" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>

                <div className="project-footer">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                    Updated {p.updated || 'recently'}
                  </span>
                  <div className="project-links">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="project-link-btn" title="View Repository">
                        <GithubIcon size={12} />
                      </a>
                    )}
                    <button className="task-btn-action" onClick={() => openEdit(p)} title="Edit Progress" type="button">
                      <Edit2 size={12} />
                    </button>
                    <button className="task-btn-action" onClick={() => handleDelete(p.id)} title="Delete Project" type="button">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '480px', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FolderGit2 size={16} style={{ color: 'var(--accent-cyan)' }} /> Create New Project
              </h3>
              <button className="btn-icon" onClick={() => setIsAddModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Project Name
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g. AI Code Assistant" 
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  required 
                  autoFocus 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Description
                </label>
                <textarea 
                  className="textarea" 
                  rows={2} 
                  placeholder="Brief project summary..."
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Status
                  </label>
                  <select 
                    className="select"
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as 'In Progress' | 'Active' | 'Planning')}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Active">Active</option>
                    <option value="Planning">Planning</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Progress (%)
                  </label>
                  <input 
                    type="number" 
                    className="input" 
                    min={0} 
                    max={100} 
                    value={newProgress}
                    onChange={e => setNewProgress(parseInt(e.target.value, 10) || 0)}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Tech Tags (Comma separated)
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="React, Next.js, Tailwind"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  GitHub Repo URL
                </label>
                <input 
                  type="url" 
                  className="input" 
                  placeholder="https://github.com/..."
                  value={newRepo}
                  onChange={e => setNewRepo(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditModalOpen && editingProj && (
        <div className="modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '440px', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Edit2 size={16} style={{ color: 'var(--accent-primary)' }} /> Update Project
              </h3>
              <button className="btn-icon" onClick={() => setIsEditModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Project Name
                </label>
                <input 
                  type="text" 
                  className="input" 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Progress: {editProgress}%
                </label>
                <input 
                  type="range" 
                  min={0} 
                  max={100} 
                  value={editProgress}
                  onChange={e => setEditProgress(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Status
                </label>
                <select 
                  className="select"
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as 'In Progress' | 'Active' | 'Planning')}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Active">Active</option>
                  <option value="Planning">Planning</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
