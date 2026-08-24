'use client';

import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantClass = `ui-skeleton-${variant}`;

  return (
    <div
      className={`ui-skeleton ${variantClass} ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`ui-skeleton-text-group ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" width={i === lines - 1 ? '70%' : '100%'} height={14} />
      ))}
    </div>
  );
};

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => {
  return <Skeleton variant="circular" width={size} height={size} className={className} />;
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`ui-skeleton-card ${className}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <Skeleton variant="circular" width={32} height={32} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={12} style={{ marginBottom: '4px' }} />
          <Skeleton variant="text" width="40%" height={10} />
        </div>
      </div>
      <Skeleton
        variant="rectangular"
        height={60}
        style={{ borderRadius: 'var(--radius-control)', marginBottom: '0.75rem' }}
      />
      <SkeletonText lines={2} />
    </div>
  );
};
