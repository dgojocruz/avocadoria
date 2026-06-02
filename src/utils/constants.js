// ─── Site-wide constants ─────────────────────────────────────────────
export const SITE = {
  name:     'Avocadoria',
  tagline:  'Happiness in avocado',
  url:      'https://avocadoria.com.ph',
  email:    'official@avocadoria.com.ph',
  phone:    '+63 945 971 6599',
  address:  '4th Floor, RC Buenviaje Bldg., Gil Fernando, Marikina City',
  grabfood: 'https://food.grab.com/ph/en/restaurant/avocadoria',
  facebook: 'https://facebook.com/avocadoria.ph',
  instagram:'https://instagram.com/avocadoria.ph',
  tiktok:   'https://tiktok.com/@avocadoria.ph',
  messenger:'https://m.me/avocadoria.ph',
}

// ─── Navigation ──────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Our Stores', to: '/our-stores' },
  { label: 'About',      to: '/about' },
  { label: 'Menu',       to: '/menu' },
  { label: 'Franchise',  to: '/franchise' },
  { label: 'Party Cart', to: '/party-cart' },
  { label: 'Careers',    to: '/careers' },
]

// ─── Brand colors (mirroring tailwind.config.js for use in JS) ───────
export const COLORS = {
  cream:  '#F4FAEC',
  brown:  '#8A5F3C',
  olive:  '#b6c548',
  yellow: '#DFD438',
  pale:   '#D0E8AF',
  pink:   '#EF7ECB',
}
