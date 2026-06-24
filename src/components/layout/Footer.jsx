import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Our Stores', to: '/our-stores' },
  { label: 'About',      to: '/about' },
  { label: 'Menu',       to: '/menu' },
  { label: 'Franchise',  to: '/franchise' },
  { label: 'Events',     to: '/events' },
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

const COL_LABEL = {
  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
  fontSize: '16px', fontWeight: 'normal',
  color: '#b6c548',
  textShadow: '-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff',
  letterSpacing: '0.08em', textTransform: 'uppercase',
  margin: '0 0 14px',
}

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
        .footer-ql-link {
          display: block;
          font-family: Poppins,sans-serif;
          font-size: 15px; font-weight: 600;
          color: #8A5F3C;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.18s;
        }
        .footer-ql-link:hover { color: #b6c548; }

        /* Multi-col grid */
        .footer-grid {
          display: grid;
          grid-template-columns: auto 1fr 1fr 1fr auto;
          gap: 40px;
          align-items: start;
          width: 100%;
          padding: 48px 60px 40px;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            padding: 40px 24px;
          }
          .footer-col-logo { grid-column: 1 / -1; text-align: center; }
          .footer-col-dpo  { grid-column: 1 / -1; display: flex; justify-content: center; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-col-logo { text-align: center; }
          .footer-col-dpo  { justify-content: center; }
        }
      `}</style>

      {/* ── Multi-column grid ── */}
      <div className="footer-grid">

        {/* Col 1 — Logo */}
        <div className="footer-col-logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
          <Link to="/" aria-label="Avocadoria homepage">
            <img
              src="/logo.svg"
              alt="Avocadoria"
              style={{
                height: '70px', width: 'auto',
                filter: 'drop-shadow(0px 1px 0px rgba(255,255,255,0.9)) drop-shadow(0px 2px 4px rgba(58,107,53,0.15))',
              }}
            />
          </Link>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C', lineHeight: 1.7, margin: 0, maxWidth: '180px' }}>
            Happiness in Avocado — since 2019.
          </p>
        </div>

        {/* Col 2 — About + Social */}
        <div>
          <p style={COL_LABEL}>About</p>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C', lineHeight: 1.75, margin: '0 0 18px' }}>
            Avocadoria is the Philippines' No. 1 avocado dessert brand — bringing happiness in every cup since 2019.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={`Avocadoria on ${label}`} className="footer-social-btn">
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 3 — Headquarters */}
        <div>
          <p style={COL_LABEL}>Headquarters</p>
          <address style={{ fontStyle: 'normal', fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C', lineHeight: 1.8 }}>
            4th Floor, RC Buenviaje Bldg.<br />
            Gil Fernando, Marikina City<br />
            <a href="mailto:official@avocadoria.com.ph"
              style={{ color: '#3a6b35', textDecoration: 'none', fontWeight: '700' }}>
              official@avocadoria.com.ph
            </a>
          </address>
        </div>

        {/* Col 4 — Quick Links */}
        <div>
          <p style={COL_LABEL}>Quick Links</p>
          <nav aria-label="Footer navigation">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink key={to} to={to} end={to === '/'} className="footer-ql-link"
                style={({ isActive }) => ({ color: isActive ? '#b6c548' : undefined, fontWeight: isActive ? '700' : '600' })}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Col 5 — DPO/DPS */}
        <div className="footer-col-dpo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={COL_LABEL}>Privacy</p>
          <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer"
            aria-label="NPC DPO/DPS Registered" title="NPC DPO/DPS Registered · Valid until Sep 09, 2026"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', transition: 'transform 0.2s', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src="/dpo-registered-transparent.png" alt="NPC DPO/DPS Registered"
              style={{ height: '120px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.7)', fontWeight: '600', textAlign: 'center', maxWidth: '130px' }}>
              Registered Data Processing System &amp; DPO
            </span>
          </a>
        </div>

      </div>

      {/* ── Copyright bar ── */}
      <div style={{ borderTop: '1px solid rgba(182,197,72,0.2)', padding: '14px 40px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: 'rgba(138,95,60,0.5)', margin: 0 }}>
          Copyright © {year} Avocadoria. All Rights Reserved.
        </p>
      </div>

    </footer>
  )
}
