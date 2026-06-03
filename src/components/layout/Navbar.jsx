import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Our Stores', to: '/our-stores' },
  { label: 'About',      to: '/about' },
  { label: 'Menu',       to: '/menu' },
  { label: 'Franchise',  to: '/franchise' },
  { label: 'Party Cart', to: '/party-cart' },
  { label: 'Careers',    to: '/careers' },
]

// ─── Nav link style config ─────────────────────────────────────────────────
const NAV_STYLE = {
  colorDefault:     '#8A5F3C',
  colorActive:      '#b6c548',
  fontSize:         'clamp(24px, 1.4vw, 25px)',
  fontWeight:       '700',
  letterSpacing:    '0.02em',
  emboss:           '0px 1px 0px rgba(255,255,255,0.7), 0px -1px 0px rgba(0,0,0,0.08), 0px 2px 4px rgba(138,95,60,0.15)',
  glowColor:        'rgba(182,197,72,0.55)',
  glowBlur:         '10px',
  glowOpacity:      0.45,
  glowHoverOpacity: 1.0,
  underlineColor:   '#b6c548',
}

function buildGlow(opacity) {
  return `0px 1px 0px rgba(255,255,255,0.7), 0px -1px 0px rgba(0,0,0,0.08), 0px 2px 4px rgba(138,95,60,0.15), 0px 0px ${NAV_STYLE.glowBlur} rgba(182,197,72,${opacity})`
}

export default function Navbar() {
  const [isOpen,  setIsOpen]  = useState(false)
  const [hovered, setHovered] = useState(null)
  const close = () => setIsOpen(false)

  return (
    <header className="navbar" role="banner">

      {/* ── Logo ── */}
      <Link to="/" onClick={close} aria-label="Avocadoria homepage"
        style={{ display:'flex', alignItems:'center', textDecoration:'none', flexShrink:0 }}>
        <img src="/logo.svg" alt="Avocadoria" className="navbar-logo"
          style={{
            filter: [
              'drop-shadow(0px 1px 0px rgba(255,255,255,0.9))',
              'drop-shadow(0px 2px 0px rgba(255,255,255,0.5))',
              'drop-shadow(0px 3px 6px rgba(58,107,53,0.25))',
              'drop-shadow(0px -1px 0px rgba(0,0,0,0.08))',
            ].join(' '),
          }}
        />
      </Link>

      {/* ── Desktop nav ── */}
      <nav className="hidden lg:flex" aria-label="Main navigation"
        style={{ alignItems:'center', gap:'clamp(16px, 2.5vw, 32px)' }}>
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink key={to} to={to} end={to === '/'}
            onMouseEnter={() => setHovered(to)}
            onMouseLeave={() => setHovered(null)}
            style={({ isActive }) => ({
              fontFamily:    'Nunito, sans-serif',
              fontSize:      NAV_STYLE.fontSize,
              fontWeight:    NAV_STYLE.fontWeight,
              letterSpacing: NAV_STYLE.letterSpacing,
              color:         (isActive || hovered === to) ? NAV_STYLE.colorActive : NAV_STYLE.colorDefault,
              textDecoration:'none',
              position:      'relative',
              paddingBottom: '2px',
              transition:    'color 0.2s, text-shadow 0.25s',
              textShadow:    buildGlow((isActive || hovered === to) ? NAV_STYLE.glowHoverOpacity : NAV_STYLE.glowOpacity),
            })}>
            {({ isActive }) => (
              <span style={{ position:'relative' }}>
                {label}
                {isActive && (
                  <span style={{
                    position:'absolute', bottom:'-4px', left:0, right:0,
                    height:'2px', background: NAV_STYLE.underlineColor,
                    borderRadius:'99px', boxShadow:`0 0 6px ${NAV_STYLE.glowColor}`,
                  }}/>
                )}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Mobile hamburger — 44×44 tap target ── */}
      <button className="lg:hidden"
        onClick={() => setIsOpen(v => !v)}
        aria-expanded={isOpen} aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        style={{
          display:'flex', flexDirection:'column', justifyContent:'center',
          alignItems:'center', width:'44px', height:'44px', gap:'5px',
          background:'rgba(255,255,255,0.75)', border:'none',
          borderRadius:'10px', cursor:'pointer', backdropFilter:'blur(8px)',
          padding: 0,
        }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            display:'block', width:'22px', height:'2px',
            background:'#8A5F3C', borderRadius:'2px', transition:'all 0.3s',
            transform: i===0 && isOpen ? 'rotate(45deg) translate(5px,5px)'
                     : i===2 && isOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
            opacity: i===1 && isOpen ? 0 : 1,
            transformOrigin: 'center',
          }}/>
        ))}
      </button>

      {/* ── Mobile menu ── */}
      <div id="mobile-menu" className="lg:hidden"
        style={{
          position:'absolute', top:'100%', left:0, right:0,
          overflow:'hidden', maxHeight: isOpen ? '500px' : '0',
          transition:'max-height 0.3s ease',
          background:'rgba(244,250,236,0.97)', backdropFilter:'blur(10px)',
          borderTop:'1px solid rgba(182,197,72,0.2)',
        }}>
        <ul style={{ listStyle:'none', padding:'12px 16px', margin:0,
          display:'flex', flexDirection:'column', gap:'4px' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink to={to} end={to==='/'} onClick={close}
                style={({ isActive }) => ({
                  display:'flex', alignItems:'center',
                  minHeight:'48px', padding:'8px 16px',
                  borderRadius:'12px',
                  fontFamily:'Nunito, sans-serif',
                  fontSize:'16px', fontWeight:'700',
                  color: isActive ? '#fff' : '#8A5F3C',
                  background: isActive ? '#b6c548' : 'transparent',
                  textDecoration:'none', transition:'all 0.15s',
                })}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </header>
  )
}
