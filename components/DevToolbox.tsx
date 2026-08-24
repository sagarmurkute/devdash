'use client';

import React, { useState } from 'react';
import { Wrench, Code2, ArrowLeftRight, Bookmark, Brackets, Minimize2, Check, Copy, Trash2 } from 'lucide-react';
import { CodeSnippet } from '@/lib/types';

const INITIAL_SNIPPETS: CodeSnippet[] = [
  { 
    id: 's1', 
    title: 'Debounce Function', 
    lang: 'JavaScript', 
    code: 'function debounce(fn, ms=300) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}' 
  },
  { 
    id: 's2', 
    title: 'Fetch with Timeout', 
    lang: 'JavaScript', 
    code: 'async function fetchWithTimeout(url, opts={}, ms=5000) {\n  const ctrl = new AbortController();\n  const id = setTimeout(() => ctrl.abort(), ms);\n  const res = await fetch(url, { ...opts, signal: ctrl.signal });\n  clearTimeout(id);\n  return res;\n}' 
  },
  { 
    id: 's3', 
    title: 'Git Undo Last Commit', 
    lang: 'Git', 
    code: 'git reset --soft HEAD~1' 
  },
  { 
    id: 's4', 
    title: 'Modern CSS Glassmorphism', 
    lang: 'CSS', 
    code: 'background: rgba(255, 255, 255, 0.05);\nbackdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.1);' 
  }
];

export default function DevToolbox() {
  const [activeTab, setActiveTab] = useState<'json' | 'base64' | 'snippets'>('json');

  // JSON Tab State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonStatus, setJsonStatus] = useState<{ msg: string; isError: boolean } | null>(null);

  // Base64 Tab State
  const [b64Input, setB64Input] = useState('');

  // Snippets
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const handlePrettifyJson = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, 2));
      setJsonStatus({ msg: '✓ Valid JSON (Formatted with 2 spaces)', isError: false });
    } catch (e: unknown) {
      const err = e as Error;
      setJsonStatus({ msg: '✗ Invalid JSON: ' + err.message, isError: true });
    }
  };

  const handleMinifyJson = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setJsonStatus({ msg: '✓ Valid JSON (Minified)', isError: false });
    } catch (e: unknown) {
      const err = e as Error;
      setJsonStatus({ msg: '✗ Invalid JSON: ' + err.message, isError: true });
    }
  };

  const handleValidateJson = () => {
    try {
      if (!jsonInput.trim()) return;
      JSON.parse(jsonInput);
      setJsonStatus({ msg: '✓ JSON is completely valid!', isError: false });
    } catch (e: unknown) {
      const err = e as Error;
      setJsonStatus({ msg: '✗ JSON Syntax Error: ' + err.message, isError: true });
    }
  };

  const copyJson = () => {
    if (jsonInput) {
      navigator.clipboard.writeText(jsonInput);
      setJsonStatus({ msg: '✓ Copied to clipboard!', isError: false });
    }
  };

  // Base64 Actions
  const handleB64Encode = () => {
    try {
      setB64Input(btoa(unescape(encodeURIComponent(b64Input))));
    } catch {
      alert('Encoding error');
    }
  };

  const handleB64Decode = () => {
    try {
      setB64Input(decodeURIComponent(escape(atob(b64Input))));
    } catch {
      alert('Invalid Base64 string');
    }
  };

  const handleUrlEncode = () => {
    setB64Input(encodeURIComponent(b64Input));
  };

  const handleUrlDecode = () => {
    try {
      setB64Input(decodeURIComponent(b64Input));
    } catch {
      alert('URL decoding error');
    }
  };

  const copyB64 = () => {
    if (b64Input) {
      navigator.clipboard.writeText(b64Input);
    }
  };

  const copySnippet = (s: CodeSnippet) => {
    navigator.clipboard.writeText(s.code);
    setCopiedSnippetId(s.id);
    setTimeout(() => setCopiedSnippetId(null), 1500);
  };

  return (
    <div className="card toolbox-card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(168, 85, 247, 0.12)', color: 'var(--accent-purple)' }}>
            <Wrench size={15} />
          </div>
          <div>
            <h2 className="card-title">Developer Utilities</h2>
            <p className="card-subtitle">Formatters, Encoders & Snippet Vault</p>
          </div>
        </div>

        <span className="badge badge-indigo">Offline Ready</span>
      </div>

      <div className="toolbox-tabs">
        <button 
          className={`toolbox-tab-btn ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
          type="button"
        >
          <Code2 size={13} /> JSON Formatter
        </button>
        <button 
          className={`toolbox-tab-btn ${activeTab === 'base64' ? 'active' : ''}`}
          onClick={() => setActiveTab('base64')}
          type="button"
        >
          <ArrowLeftRight size={13} /> Base64 & URL
        </button>
        <button 
          className={`toolbox-tab-btn ${activeTab === 'snippets' ? 'active' : ''}`}
          onClick={() => setActiveTab('snippets')}
          type="button"
        >
          <Bookmark size={13} /> Snippet Vault
        </button>
      </div>

      {/* JSON Tab */}
      {activeTab === 'json' && (
        <div className="toolbox-tab-content">
          <textarea 
            className="textarea textarea-mono" 
            rows={6} 
            placeholder='Paste raw JSON here: {"dev": "dash", "streak": 8}'
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
          />
          <div className="tool-actions-bar">
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={handlePrettifyJson} type="button">
                <Brackets size={12} /> Prettify
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleMinifyJson} type="button">
                <Minimize2 size={12} /> Minify
              </button>
              <button className="btn btn-secondary btn-sm" onClick={handleValidateJson} type="button">
                <Check size={12} /> Validate
              </button>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={copyJson} type="button">
                <Copy size={12} /> Copy
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setJsonInput(''); setJsonStatus(null); }} type="button">
                <Trash2 size={12} /> Clear
              </button>
            </div>
          </div>
          {jsonStatus && (
            <div style={{ fontSize: '0.75rem', color: jsonStatus.isError ? 'var(--accent-rose)' : 'var(--accent-emerald)', minHeight: '18px' }}>
              {jsonStatus.msg}
            </div>
          )}
        </div>
      )}

      {/* Base64 Tab */}
      {activeTab === 'base64' && (
        <div className="toolbox-tab-content">
          <textarea 
            className="textarea textarea-mono" 
            rows={6} 
            placeholder="Enter plain text or Base64 string..."
            value={b64Input}
            onChange={e => setB64Input(e.target.value)}
          />
          <div className="tool-actions-bar">
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={handleB64Encode} type="button">Base64 Encode</button>
              <button className="btn btn-primary btn-sm" onClick={handleB64Decode} type="button">Base64 Decode</button>
              <button className="btn btn-secondary btn-sm" onClick={handleUrlEncode} type="button">URL Encode</button>
              <button className="btn btn-secondary btn-sm" onClick={handleUrlDecode} type="button">URL Decode</button>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={copyB64} type="button">
              <Copy size={12} /> Copy
            </button>
          </div>
        </div>
      )}

      {/* Snippets Tab */}
      {activeTab === 'snippets' && (
        <div className="toolbox-tab-content">
          <div className="snippet-grid">
            {INITIAL_SNIPPETS.map(s => (
              <div key={s.id} className="snippet-card">
                <div className="snippet-header">
                  <span className="snippet-title">{s.title}</span>
                  <span className="badge badge-cyan">{s.lang}</span>
                </div>
                <div className="snippet-code-preview">{s.code}</div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => copySnippet(s)}
                    type="button"
                  >
                    {copiedSnippetId === s.id ? <Check size={11} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={11} />}
                    {copiedSnippetId === s.id ? 'Copied!' : 'Copy Snippet'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
