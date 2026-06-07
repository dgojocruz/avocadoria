import { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

// ─── Nav links — add dropdown: [] for sub-items ───────────────────────────────
const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Our Stores', to: '/our-stores' },
  {
    label: 'About',
    to:    '/about',
    dropdown: [
      { label: 'Our Story',      to: '/about#our-story'     },
      { label: "What's New", to: '/about#whats-new'          },
      { label: 'Recognitions',   to: '/about#recognitions'  },
      { label: 'Avo Cares',      to: '/about#avo-cares'     },
    ],
  },
  { label: 'Menu',       to: '/menu'       },
  { label: 'Franchise',  to: '/franchise'  },
  { label: 'Party Cart', to: '/party-cart' },
  { label: 'Careers',    to: '/careers'    },
]

// ─── Style config ─────────────────────────────────────────────────────────────
const NAV_STYLE = {
  colorDefault:     '#8A5F3C',
  colorActive:      '#b6c548',
  fontSize:         'clamp(13px, 1.4vw, 15px)',
  fontWeight:       '700',
  letterSpacing:    '0.02em',
  glowColor:        'rgba(182,197,72,0.55)',
  glowBlur:         '10px',
  glowOpacity:      0.45,
  glowHoverOpacity: 1.0,
  underlineColor:   '#b6c548',
}

function buildGlow(opacity) {
  return `0px 1px 0px rgba(255,255,255,0.7), 0px -1px 0px rgba(0,0,0,0.08), 0px 2px 4px rgba(138,95,60,0.15), 0px 0px ${NAV_STYLE.glowBlur} rgba(182,197,72,${opacity})`
}

// ── Dropdown component ────────────────────────────────────────────────────────
function DropdownLink({ item, hovered, setHovered }) {
  const [open, setOpen] = useState(false)
  const ref             = useRef(null)
  const location        = useLocation()
  const isActive        = location.pathname.startsWith(item.to)
  const isHov           = hovered === item.to

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const scrollToSection = (hash) => {
    setOpen(false)
    setHovered(null)
    // If already on /about, just scroll; otherwise navigate then scroll
    if (location.pathname === '/about') {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div ref={ref} style={{
      position:    'relative',
      display:     'inline-flex',
      alignItems:  'center',
      alignSelf:   'center',
    }}
      onMouseEnter={() => { setHovered(item.to); setOpen(true) }}
      onMouseLeave={() => {
        // Small delay so mouse can travel into the dropdown
        setTimeout(() => {
          setHovered(null)
          setOpen(false)
        }, 80)
      }}
    >
      {/* Main link */}
      <NavLink
        to={item.to}
        end
        style={{
          fontFamily:    'Nunito, sans-serif',
          fontSize:      NAV_STYLE.fontSize,
          fontWeight:    NAV_STYLE.fontWeight,
          letterSpacing: NAV_STYLE.letterSpacing,
          color:         (isActive || isHov) ? NAV_STYLE.colorActive : NAV_STYLE.colorDefault,
          textDecoration:'none',
          position:      'relative',
          paddingBottom: '2px',
          display:       'inline-flex',
          alignItems:    'center',
          verticalAlign: 'middle',
          gap:           '3px',
          lineHeight:    1,
          transition:    'color 0.2s, text-shadow 0.25s',
          textShadow:    buildGlow((isActive || isHov) ? NAV_STYLE.glowHoverOpacity : NAV_STYLE.glowOpacity),
        }}
      >
        <span style={{ position: 'relative' }}>
          {item.label}
          {isActive && (
            <span style={{
              position: 'absolute', bottom: '-4px', left: 0, right: 0,
              height: '2px', background: NAV_STYLE.underlineColor,
              borderRadius: '99px', boxShadow: `0 0 6px ${NAV_STYLE.glowColor}`,
            }}/>
          )}
        </span>
        {/* Chevron */}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none',
            marginTop: '1px', opacity: 0.7 }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </NavLink>

      {/* Dropdown panel */}
      <div style={{
        position:      'absolute',
        top:           'calc(100% + 4px)',
        left:          '50%',
        transform:     'translateX(-50%)',
        minWidth:      '180px',
        background:    'rgba(244,250,236,0.97)',
        backdropFilter:'blur(12px)',
        borderRadius:  '14px',
        border:        '1px solid rgba(182,197,72,0.25)',
        boxShadow:     '0 8px 28px rgba(58,107,53,0.15)',
        padding:       '8px',
        zIndex:        100,
        pointerEvents: open ? 'all' : 'none',
        opacity:       open ? 1 : 0,
        transform:     open
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(-8px)',
        transition:    open
          ? 'opacity 0.15s ease, transform 0.15s ease'
          : 'opacity 0.25s ease 0.08s, transform 0.25s ease 0.08s',
      }}>
        {/* Invisible bridge — fills the gap between trigger and panel so mouse doesn't leave */}
        <div style={{
          position: 'absolute', top: '-12px', left: 0, right: 0,
          height: '12px', background: 'transparent',
        }}/>

        {/* Arrow pointer */}
        <div style={{
          position: 'absolute', top: '-6px', left: '50%',
          transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: '6px solid rgba(244,250,236,0.97)',
          filter: 'drop-shadow(0 -1px 1px rgba(182,197,72,0.2))',
        }}/>

        {item.dropdown.map((sub) => (
          <Link
            key={sub.to}
            to={sub.to}
            onClick={() => scrollToSection('#' + sub.to.split('#')[1])}
            style={{
              display:        'block',
              padding:        '9px 14px',
              borderRadius:   '8px',
              fontFamily:     'Nunito, sans-serif',
              fontSize:       '13px',
              fontWeight:     '700',
              color:          '#8A5F3C',
              textDecoration: 'none',
              transition:     'background 0.15s, color 0.15s',
              whiteSpace:     'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(182,197,72,0.15)'
              e.currentTarget.style.color      = '#3a6b35'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color      = '#8A5F3C'
            }}
          >
            {sub.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isOpen,  setIsOpen]  = useState(false)
  const [hovered, setHovered] = useState(null)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const close = () => { setIsOpen(false); setMobileAboutOpen(false) }

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
        {NAV_LINKS.map((item) =>
          item.dropdown ? (
            <DropdownLink
              key={item.to}
              item={item}
              hovered={hovered}
              setHovered={setHovered}
            />
          ) : (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              onMouseEnter={() => setHovered(item.to)}
              onMouseLeave={() => setHovered(null)}
              style={({ isActive }) => ({
                fontFamily:    'Nunito, sans-serif',
                fontSize:      NAV_STYLE.fontSize,
                fontWeight:    NAV_STYLE.fontWeight,
                letterSpacing: NAV_STYLE.letterSpacing,
                color:         (isActive || hovered === item.to) ? NAV_STYLE.colorActive : NAV_STYLE.colorDefault,
                textDecoration:'none',
                position:      'relative',
                paddingBottom: '2px',
                transition:    'color 0.2s, text-shadow 0.25s',
                textShadow:    buildGlow((isActive || hovered === item.to) ? NAV_STYLE.glowHoverOpacity : NAV_STYLE.glowOpacity),
              })}>
              {({ isActive }) => (
                <span style={{ position:'relative' }}>
                  {item.label}
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
          )
        )}
      </nav>

      {/* ── Mobile hamburger ── */}
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
          overflow:'hidden', maxHeight: isOpen ? '600px' : '0',
          transition:'max-height 0.3s ease',
          background:'rgba(244,250,236,0.97)', backdropFilter:'blur(10px)',
          borderTop:'1px solid rgba(182,197,72,0.2)',
        }}>
        <ul style={{ listStyle:'none', padding:'12px 16px', margin:0,
          display:'flex', flexDirection:'column', gap:'4px' }}>
          {NAV_LINKS.map((item) => (
            <li key={item.to}>
              {item.dropdown ? (
                <>
                  {/* About — expandable on mobile */}
                  <button
                    onClick={() => setMobileAboutOpen(v => !v)}
                    style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      width:'100%', minHeight:'48px', padding:'8px 16px',
                      borderRadius:'12px', border:'none', cursor:'pointer',
                      fontFamily:'Nunito, sans-serif', fontSize:'16px', fontWeight:'700',
                      color:'#8A5F3C', background:'transparent', textAlign:'left',
                      transition:'all 0.15s',
                    }}
                  >
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none"
                      style={{ transition:'transform 0.2s', transform: mobileAboutOpen ? 'rotate(180deg)' : 'none' }}>
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {/* Sub-items */}
                  <div style={{
                    overflow:'hidden',
                    maxHeight: mobileAboutOpen ? '300px' : '0',
                    transition:'max-height 0.25s ease',
                  }}>
                    {item.dropdown.map(sub => (
                      <NavLink key={sub.to} to={sub.to} onClick={close}
                        style={{
                          display:'flex', alignItems:'center',
                          minHeight:'44px', padding:'6px 16px 6px 32px',
                          borderRadius:'10px',
                          fontFamily:'Nunito, sans-serif',
                          fontSize:'14px', fontWeight:'700',
                          color:'#8A5F3C', textDecoration:'none',
                          transition:'all 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background='rgba(182,197,72,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      >
                        — {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink to={item.to} end={item.to==='/'} onClick={close}
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
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>

    </header>
  )
}
