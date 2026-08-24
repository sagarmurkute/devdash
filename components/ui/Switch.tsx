'use client';

import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
}) => {
  return (
    <label className={`ui-switch-wrapper ${disabled ? 'disabled' : ''}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`ui-switch ui-switch-${size} ${checked ? 'checked' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="ui-switch-thumb" />
      </button>
      {label && <span className="ui-switch-label">{label}</span>}
    </label>
  );
};
