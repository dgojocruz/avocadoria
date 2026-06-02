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

// ─── NAV LINK STYLE CONFIG ────────────────────────────────────────────────────
// Tweak these values to adjust the nav link effect at any time.
//
// colorDefault:    resting text color
// colorActive:     active/hover text color
// fontFamily:      font stack
// fontSize:        link font size
// fontWeight:      link font weight
// letterSpacing:   spacing between letters
//
// emboss:          text-shadow that creates the raised/embossed depth effect
//                  format: 'x y blur color' — light above + shadow below
//
// glowColor:       color of the soft glow on hover (rgba recommended)
// glowBlur:        how wide the glow spreads (px)
// glowOpacity:     0.0–1.0 — resting glow opacity (keep low, e.g. 0.45)
// glowHoverOpacity:glow brightness on hover
//
// underlineH:      height of the active underline in px
// underlineColor:  color of the active underline
// underlineRadius: border radius of the underline bar
// ─────────────────────────────────────────────────────────────────────────────
const NAV_STYLE = {
  colorDefault:     '#8A5F3C',
  colorActive:      '#b6c548',
  fontFamily:       'Nunito, sans-serif',
  fontSize:         '17px',
  fontWeight:       '700',
  letterSpacing:    '0.02em',

  // Emboss — light highlight above, shadow below = raised look
  emboss:           '0px 1px 0px rgba(255,255,255,0.7), 0px -1px 0px rgba(0,0,0,0.08), 0px 2px 4px rgba(138,95,60,0.15)',

  // Glow on active/hover
  glowColor:        'rgba(182,197,72,0.55)',
  glowBlur:         '10px',
  glowOpacity:      0.45,
  glowHoverOpacity: 1.0,

  // Active underline
  underlineH:       '2px',
  underlineColor:   '#b6c548',
  underlineRadius:  '99px',
}

// Build text-shadow string for the resting emboss state
const embossShadow = NAV_STYLE.emboss

// Build text-shadow string for hover/active (emboss + glow combined)
function buildGlowShadow(opacity) {
  return `${NAV_STYLE.emboss}, 0px 0px ${NAV_STYLE.glowBlur} ${NAV_STYLE.glowColor.replace(/[\d.]+\)$/, `${opacity})`)}` 
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const closeMobile = () => setIsOpen(false)

  return (
    <header style={{
      position:   'fixed',
      top:        0, left: 0, right: 0,
      zIndex:     50,
      background: 'transparent',
    }}>
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        width:          '100%',
        paddingRight:   '40px',
      }}>

        {/* ── Logo — flush left, large like design ── */}
        <Link
          to="/"
          onClick={closeMobile}
          aria-label="Avocadoria — go to homepage"
          style={{ display: 'flex', alignItems: 'flex-end', textDecoration: 'none', flexShrink: 0 }}
        >
          <img
            src="/logo.png"
            alt="Avocadoria"
            style={{
              height: '88px',
              width: 'auto',
              display: 'block',
              filter: [
                'drop-shadow(0px 1px 0px rgba(255,255,255,0.9))',
                'drop-shadow(0px 2px 0px rgba(255,255,255,0.5))',
                'drop-shadow(0px 3px 6px rgba(58,107,53,0.25))',
                'drop-shadow(0px -1px 0px rgba(0,0,0,0.08))',
              ].join(' '),
              transition: 'filter 0.3s ease',
            }}
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden lg:flex nav-gap">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onMouseEnter={() => setHovered(to)}
              onMouseLeave={() => setHovered(null)}
              style={({ isActive }) => {
                const lit = isActive || hovered === to
                return {
                  fontFamily:     NAV_STYLE.fontFamily,
                  fontSize:       NAV_STYLE.fontSize,
                  fontWeight:     NAV_STYLE.fontWeight,
                  letterSpacing:  NAV_STYLE.letterSpacing,
                  color:          lit ? NAV_STYLE.colorActive : NAV_STYLE.colorDefault,
                  textDecoration: 'none',
                  position:       'relative',
                  paddingBottom:  '2px',
                  transition:     'color 0.2s, text-shadow 0.25s',
                  // Emboss always on; glow kicks in on hover/active
                  textShadow: lit
                    ? buildGlowShadow(NAV_STYLE.glowHoverOpacity)
                    : buildGlowShadow(NAV_STYLE.glowOpacity),
                }
              }}
            >
              {({ isActive }) => (
                <span style={{ position: 'relative' }}>
                  {label}
                  {/* Active underline */}
                  {isActive && (
                    <span style={{
                      position:     'absolute',
                      bottom:       '-4px',
                      left:         0,
                      right:        0,
                      height:       NAV_STYLE.underlineH,
                      background:   NAV_STYLE.underlineColor,
                      borderRadius: NAV_STYLE.underlineRadius,
                      boxShadow:    `0 0 6px ${NAV_STYLE.glowColor}`,
                    }}/>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(v => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          style={{
            display:        'flex',
            flexDirection:  'column',
            justifyContent: 'center',
            alignItems:     'center',
            width:          '40px',
            height:         '40px',
            gap:            '5px',
            background:     'rgba(255,255,255,0.7)',
            border:         'none',
            borderRadius:   '10px',
            cursor:         'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display:    'block', width: '22px', height: '2px',
              background: '#8A5F3C', borderRadius: '2px',
              transition: 'all 0.3s',
              transform:  i === 0 && isOpen ? 'rotate(45deg) translate(5px,5px)'
                        : i === 1 && isOpen ? 'scaleX(0)'
                        : i === 2 && isOpen ? 'rotate(-45deg) translate(5px,-5px)'
                        : 'none',
              opacity:    i === 1 && isOpen ? 0 : 1,
            }}/>
          ))}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        style={{
          overflow:   'hidden',
          maxHeight:  isOpen ? '500px' : '0',
          transition: 'max-height 0.3s ease',
          background: 'rgba(244,250,236,0.97)',
          backdropFilter: 'blur(10px)',
          borderTop:  '1px solid rgba(182,197,72,0.2)',
        }}
        className="lg:hidden"
      >
        <ul style={{ listStyle: 'none', padding: '12px 24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={closeMobile}
                style={({ isActive }) => ({
                  display:        'block',
                  padding:        '11px 16px',
                  borderRadius:   '12px',
                  fontFamily:     NAV_STYLE.fontFamily,
                  fontSize:       '15px',
                  fontWeight:     NAV_STYLE.fontWeight,
                  color:          isActive ? '#fff' : NAV_STYLE.colorDefault,
                  background:     isActive ? NAV_STYLE.colorActive : 'transparent',
                  textDecoration: 'none',
                  transition:     'all 0.15s',
                  textShadow:     isActive ? embossShadow : 'none',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
