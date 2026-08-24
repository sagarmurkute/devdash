'use client';

import React from 'react';

export type BadgeVariant =
  'primary' | 'success' | 'warning' | 'danger' | 'indigo' | 'cyan' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  return (
    <span className={`ui-badge ui-badge-${variant} ui-badge-${size} ${className}`} {...props}>
      {dot && <span className="ui-badge-dot" />}
      {children}
    </span>
  );
};
