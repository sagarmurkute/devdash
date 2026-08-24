'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive' | 'bordered';
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hoverEffect = false, className = '', ...props }, ref) => {
    const variantClass = `ui-card-${variant}`;
    const hoverClass = hoverEffect ? 'ui-card-hover' : '';

    return (
      <div ref={ref} className={`ui-card ${variantClass} ${hoverClass} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`ui-card-header ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h3 className={`ui-card-title ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={`ui-card-description ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`ui-card-content ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`ui-card-footer ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBg = 'var(--brand-blue-light)',
  iconColor = 'var(--brand-blue)',
  title,
  value,
  unit,
  trend,
  trendType = 'positive',
  className = '',
  ...props
}) => {
  const trendColor =
    trendType === 'positive'
      ? 'var(--accent-green)'
      : trendType === 'negative'
        ? 'var(--accent-rose)'
        : 'var(--accent-amber)';

  return (
    <Card className={`stat-card ${className}`} {...props}>
      <div className="stat-card-header">
        <div className="stat-card-icon" style={{ backgroundColor: iconBg, color: iconColor }}>
          {icon}
        </div>
        <span className="stat-card-title">{title}</span>
      </div>
      <div className="stat-card-val">
        {value} {unit && <span className="stat-card-unit">{unit}</span>}
      </div>
      {trend && (
        <div className="stat-card-sub" style={{ color: trendColor }}>
          {trend}
        </div>
      )}
    </Card>
  );
};
