'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'danger' | 'accent';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'ui-btn';
    const variantClass = `ui-btn-${variant}`;
    const sizeClass = `ui-btn-${size}`;
    const widthClass = fullWidth ? 'ui-btn-full' : '';
    const loadingClass = isLoading ? 'ui-btn-loading' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${loadingClass} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 size={size === 'sm' ? 12 : 16} className="ui-btn-spinner" />
        ) : (
          leftIcon && <span className="ui-btn-icon-left">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="ui-btn-icon-right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
