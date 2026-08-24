'use client';

import React from 'react';
import { Search } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="ui-input-group">
        {label && (
          <label htmlFor={inputId} className="ui-input-label">
            {label}
          </label>
        )}
        <div className={`ui-input-wrapper ${error ? 'ui-input-error' : ''}`}>
          {leftIcon && <span className="ui-input-icon-left">{leftIcon}</span>}
          <input
            id={inputId}
            ref={ref}
            className={`ui-input-field ${leftIcon ? 'has-left-icon' : ''} ${rightIcon ? 'has-right-icon' : ''} ${className}`}
            {...props}
          />
          {rightIcon && <span className="ui-input-icon-right">{rightIcon}</span>}
        </div>
        {error && <span className="ui-input-error-msg">{error}</span>}
        {!error && helperText && <span className="ui-input-helper-msg">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  shortcut?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ shortcut = '⌘ K', className = '', ...props }, ref) => {
    return (
      <Input
        ref={ref}
        leftIcon={<Search size={14} style={{ color: 'var(--text-light)' }} />}
        rightIcon={shortcut ? <kbd className="header-search-kbd">{shortcut}</kbd> : undefined}
        className={`ui-search-field ${className}`}
        placeholder="Search anything..."
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="ui-input-group">
        {label && (
          <label htmlFor={textareaId} className="ui-input-label">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={`ui-textarea-field ${error ? 'ui-input-error' : ''} ${className}`}
          {...props}
        />
        {error && <span className="ui-input-error-msg">{error}</span>}
        {!error && helperText && <span className="ui-input-helper-msg">{helperText}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="ui-input-group">
        {label && (
          <label htmlFor={selectId} className="ui-input-label">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`ui-select-field ${error ? 'ui-input-error' : ''} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="ui-input-error-msg">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
