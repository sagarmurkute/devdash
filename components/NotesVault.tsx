'use client';

import React, { useState } from 'react';
import { Lightbulb, Plus, Search, Copy, Check, Trash2, X } from 'lucide-react';
import { NoteItem } from '@/lib/types';

interface NotesVaultProps {
  notes: NoteItem[];
  onUpdate: (notes: NoteItem[]) => void;
}

export default function NotesVault({ notes, onUpdate }: NotesVaultProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Architecture' | 'Ideas' | 'UI/UX' | 'Bug Fix' | 'Snippet'>('Architecture');
  const [newTag, setNewTag] = useState('High Priority');
  const [newContent, setNewContent] = useState('');

  const filteredNotes = notes.filter(n => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q) ||
      (n.tag && n.tag.toLowerCase().includes(q))
    );
  });

  const handleCopy = (note: NoteItem) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`${note.title}\n\n${note.content}`);
      setCopiedId(note.id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const handleDelete = (id: string) => {
    onUpdate(notes.filter(n => n.id !== id));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNote: NoteItem = {
      id: 'n-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      tag: newTag.trim() || 'General',
      content: newContent.trim(),
      updated: 'Just now'
    };

    onUpdate([newNote, ...notes]);
    setNewTitle('');
    setNewTag('General');
    setNewContent('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="card notes-card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(168, 85, 247, 0.12)', color: 'var(--accent-purple)' }}>
            <Lightbulb size={15} />
          </div>
          <div>
            <h2 className="card-title">Notes & Ideas Vault</h2>
            <p className="card-subtitle">{notes.length} Brain Dumps & Architectures</p>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => setIsAddModalOpen(true)}
          type="button"
        >
          <Plus size={12} /> New Note
        </button>
      </div>

      <div className="card-body">
        <div className="notes-controls">
          <div className="notes-search-wrap">
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="notes-search-input" 
              placeholder="Search notes, ideas, tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="notes-grid">
          {filteredNotes.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
              No notes found matching your search.
            </div>
          ) : (
            filteredNotes.map(n => (
              <div key={n.id} className="note-item-card">
                <div>
                  <div className="note-card-header">
                    <span className="note-title">{n.title}</span>
                    <span className="badge badge-indigo">{n.category}</span>
                  </div>
                  <p className="note-content" style={{ marginTop: '0.4rem' }}>
                    {n.content}
                  </p>
                </div>

                <div className="note-footer">
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                    {n.tag || 'General'}
                  </span>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <button 
                      className="task-btn-action" 
                      onClick={() => handleCopy(n)} 
                      title="Copy note text"
                      type="button"
                    >
                      {copiedId === n.id ? <Check size={11} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={11} />}
                    </button>
                    <button 
                      className="task-btn-action" 
                      onClick={() => handleDelete(n.id)} 
                      title="Delete note"
                      type="button"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" style={{ maxWidth: '480px', padding: '1.5rem' }} onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lightbulb size={16} style={{ color: 'var(--accent-purple)' }} /> New Brain Note & Idea
              </h3>
              <button className="btn-icon" onClick={() => setIsAddModalOpen(false)} type="button">
                <X size={14} />
              </button>
            </div>
            <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Note Title
                </label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="e.g. WebSocket Sync Strategy" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  required 
                  autoFocus 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Category
                  </label>
                  <select 
                    className="select"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as 'Architecture' | 'Ideas' | 'UI/UX' | 'Bug Fix' | 'Snippet')}
                  >
                    <option value="Architecture">Architecture</option>
                    <option value="Ideas">Ideas</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Bug Fix">Bug Fix</option>
                    <option value="Snippet">Snippet</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                    Tag
                  </label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="e.g. High Priority" 
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                  Content / Markdown Details
                </label>
                <textarea 
                  className="textarea" 
                  rows={4} 
                  placeholder="Write thoughts, pseudo-code, requirements..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  required 
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
