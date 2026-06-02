import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Our Stores', to: '/our-stores' },
  { label: 'About',      to: '/about' },
  { label: 'Menu',       to: '/menu' },
  { label: 'Franchise',  to: '/franchise' },
  { label: 'Party Cart', to: '/party-cart' },
  { label: 'Careers',    to: '/careers' },
]

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href:  'https://facebook.com/avocadoria.ph',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://instagram.com/avocadoria.ph',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href:  'https://tiktok.com/@avocadoria.ph',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#F4FAEC', borderTop: '1px solid rgba(182,197,72,0.25)' }}>

      {/* ── Main footer row ── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '28px 32px 0 32px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
      }}>

        {/* Left — logo + nav + address */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1', minWidth: '260px' }}>

          {/* Logo */}
          <Link to="/" aria-label="Avocadoria homepage">
            <img src="/logo.png" alt="Avocadoria" style={{ height: '56px', width: 'auto' }} />
          </Link>

          {/* Nav links — horizontal row */}
          <nav aria-label="Footer navigation" style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
            {NAV_LINKS.map(({ label, to }, i) => (
              <span key={to} style={{ display: 'flex', alignItems: 'center' }}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  style={({ isActive }) => ({
                    fontFamily: 'Nunito, sans-serif',
                    fontSize:   '13px',
                    fontWeight: isActive ? '700' : '600',
                    color:      isActive ? '#b6c548' : '#8A5F3C',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    padding: '2px 0',
                  })}
                  onMouseEnter={e => e.target.style.color = '#b6c548'}
                  onMouseLeave={e => { if (!e.target.classList.contains('active')) e.target.style.color = '#8A5F3C' }}
                >
                  {label}
                </NavLink>
                {i < NAV_LINKS.length - 1 && (
                  <span style={{ color: 'rgba(182,197,72,0.5)', margin: '0 10px', fontSize: '12px' }}>|</span>
                )}
              </span>
            ))}
          </nav>

          {/* Address + contact */}
          <address style={{ fontStyle: 'normal', fontFamily: 'Nunito, sans-serif', fontSize: '12px', color: 'rgba(138,95,60,0.7)', lineHeight: '1.7' }}>
            4th Floor, RC Buenviaje Bldg., Gil Fernando, Marikina City &nbsp;·&nbsp;
            <a href="tel:+639459716599" style={{ color: 'rgba(138,95,60,0.7)', textDecoration: 'none' }}>
              +63 945 971 6599
            </a>
            &nbsp;·&nbsp;
            <a href="mailto:official@avocadoria.com.ph" style={{ color: 'rgba(138,95,60,0.7)', textDecoration: 'none' }}>
              official@avocadoria.com.ph
            </a>
          </address>

        </div>

        {/* Right — social circles + order/chat buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', flexShrink: 0 }}>

          {/* Top row: label + social circles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: '700', color: '#8A5F3C', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Follow us
            </span>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Avocadoria on ${label}`}
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  background: '#b6c548',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, transform 0.15s',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#3a6b35'; e.currentTarget.style.transform = 'scale(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#b6c548'; e.currentTarget.style.transform = 'scale(1)' }}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Bottom row: Order Here + Live Chat */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {/* Order Here — GrabFood */}
            <a
              href="https://food.grab.com/ph/en/restaurant/avocadoria"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#b6c548',
                color: '#fff',
                borderRadius: '999px',
                padding: '6px 14px 6px 8px',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '12px', fontWeight: '700',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
              onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
            >
              {/* Cart icon */}
              <span style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }} aria-hidden="true">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </span>
              Order Here
            </a>

            {/* Live Chat — Messenger */}
            <a
              href="https://m.me/avocadoria.ph"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#EF7ECB',
                color: '#fff',
                borderRadius: '999px',
                padding: '6px 14px 6px 8px',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '12px', fontWeight: '700',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#c9539f'}
              onMouseLeave={e => e.currentTarget.style.background = '#EF7ECB'}
            >
              <span style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg viewBox="0 0 24 24" fill="white" style={{ width: '14px', height: '14px' }} aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.78 1.28 5.266 3.3 6.968V21l3.013-1.66c.805.222 1.656.341 2.537.341 5.523 0 10-4.145 10-9.259C22 6.145 17.523 2 12 2zm.994 12.466L10.62 11.87l-4.72 2.596 5.198-5.517 2.433 2.596 4.666-2.596-5.203 5.517z"/>
                </svg>
              </span>
              Live Chat
            </a>

          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '10px 32px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <div style={{ height: '1px', background: 'rgba(182,197,72,0.2)', width: '100%', marginBottom: '10px' }} />
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.5)', margin: 0 }}>
          Copyright © {year} Avocadoria. All Rights Reserved.
        </p>
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.5)', margin: 0 }}>
          "Happiness in avocado"
        </p>
      </div>

    </footer>
  )
}
