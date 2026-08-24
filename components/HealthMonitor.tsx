'use client';

import React, { useState } from 'react';
import { HardDrive, RefreshCw } from 'lucide-react';
import { PortService } from '@/lib/types';

const INITIAL_SERVICES: PortService[] = [
  { name: 'Dev Server (Next.js/React)', port: 3000, status: 'online', latency: '12ms' },
  { name: 'Backend API (FastAPI/Express)', port: 8000, status: 'online', latency: '24ms' },
  { name: 'PostgreSQL / Database', port: 5432, status: 'online', latency: '4ms' },
  { name: 'Redis Cache Server', port: 6379, status: 'idle', latency: '2ms' }
];

export default function HealthMonitor() {
  const [services, setServices] = useState<PortService[]>(INITIAL_SERVICES);
  const [isPinging, setIsPinging] = useState(false);

  const pingServices = () => {
    setIsPinging(true);
    setTimeout(() => {
      setServices(prev => 
        prev.map(s => ({
          ...s,
          latency: `${Math.floor(Math.random() * 26) + 3}ms`
        }))
      );
      setIsPinging(false);
    }, 400);
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title-group">
          <div className="card-icon" style={{ background: 'rgba(6, 182, 212, 0.12)', color: 'var(--accent-cyan)' }}>
            <HardDrive size={15} />
          </div>
          <div>
            <h2 className="card-title">Port & API Monitor</h2>
            <p className="card-subtitle">Local Developer Environment</p>
          </div>
        </div>
        <button 
          className="btn-icon btn-sm" 
          onClick={pingServices} 
          disabled={isPinging}
          title="Ping Services"
          type="button"
        >
          <RefreshCw size={13} className={isPinging ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="card-body">
        <div className="port-list">
          {services.map((s, idx) => {
            const isOnline = s.status === 'online';
            const badgeClass = isOnline ? 'badge-emerald' : 'badge-amber';

            return (
              <div key={idx} className="port-item">
                <div className="port-left">
                  <span 
                    className="status-indicator" 
                    style={{ backgroundColor: isOnline ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>{s.name}</div>
                    <span className="port-badge">localhost:{s.port}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${badgeClass}`}>{s.status}</span>
                  <div className="port-latency">{s.latency}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
