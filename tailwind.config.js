/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './packages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: 'var(--brand-blue)',
          'blue-hover': 'var(--brand-blue-hover)',
          'blue-light': 'var(--brand-blue-light)',
          'blue-border': 'var(--brand-blue-border)',
        },
        surface: {
          DEFAULT: 'var(--bg-surface)',
          hover: 'var(--bg-surface-hover)',
          app: 'var(--bg-app)',
          card: 'var(--bg-card)',
          sidebar: 'var(--bg-sidebar)',
          glass: 'var(--bg-glass)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          card: 'var(--border-card)',
          hover: 'var(--border-hover)',
          active: 'var(--border-active)',
          glass: 'var(--border-glass)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          light: 'var(--text-light)',
          inverse: 'var(--text-inverse)',
        },
        accent: {
          orange: 'var(--accent-orange)',
          'orange-light': 'var(--accent-orange-light)',
          green: 'var(--accent-green)',
          'green-light': 'var(--accent-green-light)',
          amber: 'var(--accent-amber)',
          'amber-light': 'var(--accent-amber-light)',
          purple: 'var(--accent-purple)',
          'purple-light': 'var(--accent-purple-light)',
          cyan: 'var(--accent-cyan)',
          'cyan-light': 'var(--accent-cyan-light)',
          rose: 'var(--accent-rose)',
          'rose-light': 'var(--accent-rose-light)',
        },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        control: 'var(--radius-control)',
        badge: 'var(--radius-badge)',
        checkbox: 'var(--radius-checkbox)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        dropdown: 'var(--shadow-dropdown)',
        modal: 'var(--shadow-modal)',
        glow: 'var(--shadow-glow)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
