/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ─── Official Avocadoria Brand Palette ───────────────────────────
      colors: {
        avo: {
          cream:  '#F4FAEC', // Page backgrounds, hero bg
          brown:  '#8A5F3C', // Logo text, footer, primary body text
          olive:  '#b6c548', // Primary CTA, nav active, headings
          yellow: '#DFD438', // Accent, highlights, tags
          pale:   '#D0E8AF', // Section backgrounds, card fills
          pink:   '#EF7ECB', // Secondary CTA, playful accents
        },
        // Semantic aliases for easier use in components
        brand: {
          primary:   '#b6c548', // avo-olive
          secondary: '#EF7ECB', // avo-pink
          text:      '#8A5F3C', // avo-brown
          bg:        '#F4FAEC', // avo-cream
          surface:   '#D0E8AF', // avo-pale
          accent:    '#DFD438', // avo-yellow
        },
      },

      // ─── Typography ──────────────────────────────────────────────────
      // NOTE: Bubblebody Neue Inline, Zing Rust Script, and Neue Einstellung
      // require commercial licenses. Place WOFF2 files in /src/assets/fonts/
      // and update the @font-face declarations in index.css.
      fontFamily: {
        bubblebody: ['"Bubblebody Neue Inline"', 'cursive'],   // Logo only
        zing:       ['"Zing Rust Script"', 'cursive'],          // Subheadings
        neue:       ['"Neue Einstellung"', 'Nunito', 'sans-serif'], // Body / UI
        // 'sans' drives the Tailwind default — falls back to Nunito during dev
        sans:       ['"Neue Einstellung"', 'Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      // ─── Type Scale ──────────────────────────────────────────────────
      fontSize: {
        'hero':  ['clamp(2.5rem, 6vw, 4rem)',    { lineHeight: '1.1', fontWeight: '700' }],
        'h1':    ['clamp(2rem, 4vw, 3rem)',       { lineHeight: '1.15' }],
        'h2':    ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
        'h3':    ['clamp(1.25rem, 2vw, 1.75rem)',{ lineHeight: '1.3' }],
        'body':  ['1rem',    { lineHeight: '1.7' }],
        'small': ['0.875rem',{ lineHeight: '1.6' }],
        'xs':    ['0.75rem', { lineHeight: '1.5' }],
      },

      // ─── Spacing & Layout ────────────────────────────────────────────
      spacing: {
        'section':    '5rem',    // Vertical section padding
        'section-sm': '3rem',
        'container':  '1.25rem', // Horizontal page padding (mobile)
      },

      maxWidth: {
        'site': '1440px',
        'content': '1200px',
      },

      // ─── Border Radius ───────────────────────────────────────────────
      borderRadius: {
        'btn':  '9999px', // Pills — brand uses rounded pill buttons
        'card': '1.5rem',
        'xl':   '1rem',
      },

      // ─── Shadows ─────────────────────────────────────────────────────
      boxShadow: {
        'card':   '0 4px 24px rgba(138, 95, 60, 0.10)',
        'card-lg':'0 8px 40px rgba(138, 95, 60, 0.14)',
        'btn':    '0 4px 16px rgba(182, 197, 72, 0.40)',
        'btn-pk': '0 4px 16px rgba(239, 126, 203, 0.40)',
      },

      // ─── Animations ──────────────────────────────────────────────────
      keyframes: {
        'wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'wave':     'wave 3s ease-in-out infinite',
        'fade-up':  'fade-up 0.5s ease forwards',
        'fade-in':  'fade-in 0.4s ease forwards',
      },
    },
  },
  plugins: [],
}
