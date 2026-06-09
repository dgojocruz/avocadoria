import { useState } from 'react'
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
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://instagram.com/avocadoria.ph',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const [open, setOpen] = useState(false)

  return (
    <footer style={{
      backgroundImage: "url('/footer-bg.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderTop: '1px solid rgba(182,197,72,0.25)',
    }}>
      <style>{`
        .footer-dropdown {
          position: relative;
          display: inline-block;
        }
        .footer-dropdown-menu {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.96);
          backdropFilter: blur(12px);
          border: 1.5px solid rgba(182,197,72,0.25);
          border-radius: 16px;
          padding: 8px 0;
          min-width: 180px;
          box-shadow: 0 -8px 32px rgba(58,107,53,0.12);
          z-index: 100;
        }
        .footer-dropdown-item {
          display: block;
          padding: 9px 20px;
          font-family: Nunito, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #8A5F3C;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          text-align: left;
        }
        .footer-dropdown-item:hover {
          background: rgba(182,197,72,0.12);
          color: #b6c548;
        }
        .footer-social-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #b6c548;
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .footer-social-btn:hover {
          background: #3a6b35;
          transform: scale(1.1);
        }
      `}</style>

      {/* ── Main footer ── */}
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '32px 24px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        textAlign: 'center',
      }}>

        {/* Logo — links to homepage */}
        <Link to="/" aria-label="Avocadoria homepage">
          <img
            src="/logo.svg"
            alt="Avocadoria"
            style={{
              height: '60px', width: 'auto',
              filter: 'drop-shadow(0px 1px 0px rgba(255,255,255,0.9)) drop-shadow(0px 2px 4px rgba(58,107,53,0.15))',
            }}
          />
        </Link>

        {/* Quick Links dropdown */}
        <div className="footer-dropdown">
          <button
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-haspopup="true"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '9px 20px',
              background: 'rgba(255,255,255,0.85)',
              border: '1.5px solid rgba(182,197,72,0.3)',
              borderRadius: '999px',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '13px', fontWeight: '700',
              color: '#8A5F3C', cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#b6c548'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(182,197,72,0.3)'}
          >
            Quick Links
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {open && (
            <div className="footer-dropdown-menu" role="menu">
              {NAV_LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className="footer-dropdown-item"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? '#b6c548' : '#8A5F3C',
                    fontWeight: isActive ? '700' : '600',
                  })}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Address */}
        <address style={{
          fontStyle: 'normal',
          fontFamily: 'Nunito, sans-serif',
          fontSize: '12px',
          color: 'rgba(138,95,60,0.7)',
          lineHeight: 1.7,
        }}>
          4th Floor, RC Buenviaje Bldg., Gil Fernando, Marikina City
          <br />
          <a href="tel:+639459716599" style={{ color: 'rgba(138,95,60,0.7)', textDecoration: 'none' }}>
            +63 945 971 6599
          </a>
          {' · '}
          <a href="mailto:official@avocadoria.com.ph" style={{ color: 'rgba(138,95,60,0.7)', textDecoration: 'none' }}>
            official@avocadoria.com.ph
          </a>
        </address>

        {/* Social links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            fontFamily: 'Nunito, sans-serif', fontSize: '11px',
            fontWeight: '700', color: '#8A5F3C',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>Follow us</span>
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={`Avocadoria on ${label}`} className="footer-social-btn">
              {icon}
            </a>
          ))}
        </div>

        {/* DPO Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(30,60,160,0.15)',
          borderRadius: '14px',
          padding: '8px 14px 8px 10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <img src="/dpo-registered.png" alt="NPC DPO/DPS Registered"
            style={{ height: '48px', width: 'auto', objectFit: 'contain', borderRadius: '6px' }} />
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '10px', fontWeight: '800',
              color: '#1a3aa0', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 2px' }}>
              NPC Registered
            </p>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '12px', fontWeight: '700',
              color: '#1a3aa0', margin: '0 0 1px', lineHeight: 1.2 }}>DPO / DPS</p>
            <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '10px',
              color: 'rgba(30,60,160,0.6)', margin: 0, lineHeight: 1.3 }}>
              Valid until Sep 09, 2026
            </p>
          </div>
        </div>

      </div>

      {/* ── Copyright ── */}
      <div style={{
        maxWidth: '680px', margin: '0 auto',
        padding: '16px 24px 20px',
        textAlign: 'center',
      }}>
        <div style={{ height: '1px', background: 'rgba(182,197,72,0.2)', marginBottom: '12px' }} />
        <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px',
          color: 'rgba(138,95,60,0.5)', margin: 0 }}>
          Copyright © {year} Avocadoria. All Rights Reserved.
        </p>
      </div>

    </footer>
  )
}
