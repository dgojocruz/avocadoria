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
    href:  'https://www.facebook.com/avocadoria.official',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/avocadoriaph.official',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href:  'https://www.tiktok.com/@avocadoria',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
      </svg>
    ),
  },
]

// Column heading — keep existing brand style
const COL_LABEL = {
  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
  fontSize: '13px', fontWeight: 'normal',
  color: '#b6c548',
  textShadow: '-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff',
  letterSpacing: '0.08em', textTransform: 'uppercase',
  margin: '0 0 10px',
}

const PINNED_LINKS  = NAV_LINKS.slice(0, 3)   // Home, Our Stores, About
const HIDDEN_LINKS  = NAV_LINKS.slice(3)        // Menu, Franchise, Events, Party Cart, Careers

function QuickLinks() {
  const [open, setOpen] = useState(false)
  return (
    <nav aria-label="Footer navigation">
      {PINNED_LINKS.map(({ label, to }) => (
        <NavLink key={to} to={to} end={to === '/'} className="footer-ql-link"
          style={({ isActive }) => ({ color: isActive ? '#fff' : undefined, fontWeight: isActive ? '700' : '500' })}>
          {label}
        </NavLink>
      ))}

      {/* +N chip */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Show more links"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            marginTop: '6px',
            background: 'rgba(255,255,255,0.22)',
            border: '1.5px solid rgba(255,255,255,0.5)',
            borderRadius: '99px',
            padding: '2px 10px',
            fontSize: '10px', fontWeight: '700',
            color: '#1e3d1b',
            cursor: 'pointer',
            fontFamily: 'Poppins,sans-serif',
            transition: 'background .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
        >
          +{HIDDEN_LINKS.length} more
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e3d1b" strokeWidth="3" strokeLinecap="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      )}

      {/* Expanded links */}
      {open && (
        <>
          {HIDDEN_LINKS.map(({ label, to }) => (
            <NavLink key={to} to={to} className="footer-ql-link"
              style={({ isActive }) => ({ color: isActive ? '#fff' : undefined, fontWeight: isActive ? '700' : '500' })}>
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => setOpen(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              marginTop: '6px',
              background: 'rgba(255,255,255,0.22)',
              border: '1.5px solid rgba(255,255,255,0.5)',
              borderRadius: '99px',
              padding: '2px 10px',
              fontSize: '10px', fontWeight: '700',
              color: '#1e3d1b',
              cursor: 'pointer',
              fontFamily: 'Poppins,sans-serif',
            }}
          >
            Show less
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e3d1b" strokeWidth="3" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </>
      )}
    </nav>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      backgroundImage: "linear-gradient(rgba(182,197,72,0.90), rgba(182,197,72,0.90)), url('/footer-bg.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderTop: '2px solid rgba(255,255,255,0.3)',
    }}>
      <style>{`
        /* Social buttons — compact */
        .footer-social-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #fff;
          color: #b6c548;
          border: 2px solid #b6c548;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s, transform 0.15s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .footer-social-btn:hover {
          background: #3a6b35;
          color: #fff;
          border-color: #3a6b35;
          transform: scale(1.1);
        }

        /* Nav links — compact */
        .footer-ql-link {
          display: block;
          font-family: Poppins, sans-serif;
          font-size: 12px; font-weight: 500;
          color: #1e3d1b;
          text-decoration: none;
          padding: 3px 0;
          transition: color 0.15s;
          line-height: 1.6;
        }
        .footer-ql-link:hover { color: #fff; }

        /* Grid — mobile first */
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 16px;
          padding: 24px 20px 20px;
          align-items: start;
        }
        .footer-col-logo   { grid-column: 1 / -1; display: flex; align-items: center; gap: 12px; }
        .footer-col-dpo    { grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: auto 1.4fr 1fr 1fr auto;
            gap: 32px;
            padding: 28px 40px 24px;
          }
          .footer-col-logo { grid-column: auto; flex-direction: column; align-items: flex-start; gap: 0; }
          .footer-col-dpo  { grid-column: auto; flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="footer-grid">

        {/* Col 1 — Logo */}
        <div className="footer-col-logo">
          <Link to="/" aria-label="Avocadoria homepage">
            <img
              src="/logo.svg"
              alt="Avocadoria"
              style={{
                height: '52px', width: 'auto',
                filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.9))',
              }}
            />
          </Link>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#1e3d1b', margin: 0, lineHeight: 1.5 }}>
            Philippines' No. 1<br />avocado dessert brand
          </p>
        </div>

        {/* Col 2 — About + Social */}
        <div>
          <p style={COL_LABEL}>About</p>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#1e3d1b', lineHeight: 1.65, margin: '0 0 12px' }}>
            Bringing happiness in every cup since 2019.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
          <address style={{ fontStyle: 'normal', fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#1e3d1b', lineHeight: 1.7 }}>
            4th Floor, RC Buenviaje Bldg.<br />
            Gil Fernando, Marikina City<br />
            <a href="mailto:official@avocadoria.com.ph"
              style={{ color: '#fff', textDecoration: 'none', fontWeight: '700' }}>
              official@avocadoria.com.ph
            </a>
          </address>
        </div>

        {/* Col 4 — Quick Links */}
        <div>
          <p style={COL_LABEL}>Quick Links</p>
          <QuickLinks />
        </div>

        {/* Col 5 — DPO */}
        <div className="footer-col-dpo">
          <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer"
            aria-label="NPC DPO/DPS Registered" title="NPC DPO/DPS Registered · Valid until Sep 09, 2026"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'transform 0.2s', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src="/dpo-registered-transparent.png" alt="NPC DPO/DPS Registered"
              style={{ height: '72px', width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '9px', color: '#1e3d1b', fontWeight: '600', textAlign: 'center', maxWidth: '90px', lineHeight: 1.4 }}>
              Registered DPO/DPS
            </span>
          </a>
        </div>

      </div>

      {/* Copyright bar */}
      <div style={{ borderTop: '1px solid rgba(30,61,27,0.15)', padding: '10px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: 'rgba(30,61,27,0.6)', margin: 0 }}>
          © {year} Avocadoria. All Rights Reserved.
        </p>
      </div>

    </footer>
  )
}
