import { useEffect, useState } from 'react'
import SEO from '@/components/ui/SEO'
import { Link } from 'react-router-dom'

// ─── Hero overlay config ──────────────────────────────────────────────────────
// direction: 'to-left' | 'to-right' | 'to-top' | 'to-bottom'
// fadeStart: % where transparency begins  |  fadeEnd: % where it's fully solid
// color: what the image fades into (match hero bg)  |  opacity: 0.0–1.0
const OVERLAY = {
  direction: 'to-left',
  fadeStart: 30,
  fadeEnd:   75,
  color:     '#d4eca0',
  opacity:   1.0,
}

function buildOverlay({ direction, fadeStart, fadeEnd, color, opacity }) {
  const h = color.replace('#','')
  const r = parseInt(h.slice(0,2),16)
  const g = parseInt(h.slice(2,4),16)
  const b = parseInt(h.slice(4,6),16)
  return `linear-gradient(${direction},rgba(${r},${g},${b},0) ${fadeStart}%,rgba(${r},${g},${b},${opacity}) ${fadeEnd}%)`
}

// ─── Hero image config ────────────────────────────────────────────────────────
// All animation and positioning settings for the hero product image.
// Change any value here — no need to touch the CSS or JSX below.
//
// ── Position ─────────────────────────────────────────────────────────────────
// right:         distance from the right edge of the screen   e.g. '-2%' | '5%'
// bottom:        distance from the bottom of the hero section e.g. '8%'  | '0%'
// height:        size of the image                            e.g. '88vh'| '70vh'
//
// ── Slide-in (Phase 1 — plays once on page load) ─────────────────────────────
// slideFrom:     starting X offset (px) — positive = slides from right
//                larger number = more dramatic entrance         e.g. 120
// slideRotateStart: starting tilt angle in degrees             e.g. 2
// slideDuration: how long the entry animation takes (seconds)  e.g. 1.1
//
// ── Float (Phase 2 — loops forever after slide-in) ───────────────────────────
// floatHeight:   how many px the image bobs up and down        e.g. 22
// floatRotate:   how many degrees it tilts while floating       e.g. 1.5
// floatDuration: one full bob cycle in seconds                  e.g. 3.8
//                slower = lazier / more relaxed feel
//                faster = more energetic / playful feel
// floatDelay:    seconds after slide-in before float starts     e.g. 1.1
//                (set equal to slideDuration for seamless chain)
// ─────────────────────────────────────────────────────────────────────────────
const HERO_IMAGE = {
  // ── Source
  src:              '/hero-bg.png',

  // ── Position & size
  right:            '-2%',
  bottom:           '8%',
  height:           '88vh',

  // ── Slide-in
  slideFrom:        120,       // px from right — bigger = more dramatic
  slideRotateStart: 2,         // degrees tilt at start
  slideDuration:    1.1,       // seconds

  // ── Float loop
  floatHeight:      22,        // px up/down
  floatRotate:      1.5,       // degrees tilt while floating
  floatDuration:    3.8,       // seconds per cycle — try 2.5 (fast) or 5.0 (slow)
  floatDelay:       1.1,       // seconds — match slideDuration for seamless chain
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── Discover Avo Faves button config ────────────────────────────────────────
// label:         button text
// fontSize:      any CSS font-size value e.g. '16px', '1.2rem', 'clamp(1rem,2vw,1.4rem)'
// fontFamily:    font stack — 'BubbleboddyNeue' | 'Nunito' | any loaded font
// paddingX:      left/right padding e.g. '40px'
// paddingY:      top/bottom padding e.g. '14px'
// background:    button fill color e.g. 'rgba(255,255,255,0.92)' or '#b6c548'
// color:         text color
// borderColor:   border color
// borderWidth:   border thickness e.g. '2.5px'
// borderRadius:  '999px' = full pill | '12px' = rounded rect
// shadow:        box shadow e.g. '0 6px 24px rgba(58,107,53,0.22)'
// blur:          backdrop blur e.g. 'blur(4px)' or 'none'
// hoverBg:       background on hover
// hoverColor:    text color on hover
// hoverBorder:   border color on hover
// posBottom:     % from bottom of image
// posLeft:       % from left of image (center of button)
// ─────────────────────────────────────────────────────────────────────────────
const AVO_BTN = {
  label:        'Discover Avo Faves',
  fontSize:     'clamp(1rem, 1.6vw, 1.3rem)',
  fontFamily:   "'BubbleboddyNeue', 'Nunito', sans-serif",
  paddingX:     '40px',
  paddingY:     '14px',
  background:   'rgba(255,255,255,0.92)',
  color:        '#3a6b35',
  borderColor:  'rgba(255,255,255,0.9)',
  borderWidth:  '2.5px',
  borderRadius: '999px',
  shadow:       '0 6px 24px rgba(58,107,53,0.22)',
  blur:         'blur(4px)',
  hoverBg:      '#b6c548',
  hoverColor:   '#fff',
  hoverBorder:  '#b6c548',
  posBottom:    '18%',
  posLeft:      '37%',
}
// ─────────────────────────────────────────────────────────────────────────────
// fromColor: section above  |  toColor: section below
// height: wave height in px (40–120)  |  flip: mirror the wave shape
function Wave({ fromColor, toColor, height = 70, flip = false }) {
  const path = flip
    ? `M0,${height} C360,0 1080,${height} 1440,${Math.round(height*0.4)} L1440,0 L0,0 Z`
    : `M0,0 C360,${height} 1080,0 1440,${Math.round(height*0.6)} L1440,${height} L0,${height} Z`
  return (
    <div style={{ background: fromColor, lineHeight: 0, display: 'block' }}>
      <svg viewBox={`0 0 1440 ${height}`} xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: `${height}px` }}>
        <path d={path} fill={toColor} />
      </svg>
    </div>
  )
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  // Section colors — change here to retheme the whole page flow
  const C = {
    hero:      '#d4eca0',   // hero background
    avofaves:  '#eaf5c8',   // avo-faves section
    franchise: '#3a6b35',   // franchise teaser
    news:      '#F4FAEC',   // news section
  }

  return (
    <>
      <SEO
        title={null}
        description="Avocadoria is the home of the No. 1 avocado-based desserts in the Philippines. Real avocado treats — indulgent yet guilt-free."
        path="/"
      />

      <style>{`
        @font-face {
          font-family: 'BubbleboddyNeue';
          src: url('/fonts/bubbleboddyneueinline-extrabold.ttf') format('truetype');
          font-weight: normal; font-style: normal; font-display: swap;
        }
        /* Config-driven hero image animation */
        @keyframes hero-slide-in {
          0%   { opacity:0; transform: translateX(${HERO_IMAGE.slideFrom}px) rotate(${HERO_IMAGE.slideRotateStart}deg); }
          60%  { opacity:1; transform: translateX(${-HERO_IMAGE.slideFrom * 0.1}px) rotate(${-HERO_IMAGE.slideRotateStart * 0.25}deg); }
          80%  { transform: translateX(${HERO_IMAGE.slideFrom * 0.05}px) rotate(${HERO_IMAGE.slideRotateStart * 0.25}deg); }
          100% { opacity:1; transform: translateX(0px) rotate(0deg); }
        }
        @keyframes hero-float {
          0%,100% { transform: translateY(0px) rotate(-${HERO_IMAGE.floatRotate}deg); }
          50%     { transform: translateY(-${HERO_IMAGE.floatHeight}px) rotate(${HERO_IMAGE.floatRotate}deg); }
        }
        /* Desktop slide+float, mobile just float */
        @media (min-width: 768px) {
          .hero-product-img {
            animation:
              hero-slide-in ${HERO_IMAGE.slideDuration}s cubic-bezier(.22,1,.36,1) forwards,
              hero-float ${HERO_IMAGE.floatDuration}s ease-in-out ${HERO_IMAGE.floatDelay}s infinite !important;
          }
        }
      `}</style>

      <div className="page-enter">

        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <section className="hero-wrap" style={{
          background: `linear-gradient(180deg,#e8f5c0 0%,${C.hero} 60%,#cce890 100%)`,
        }}>
          {/* Radial glow */}
          <div style={{
            position:'absolute',inset:0,zIndex:1,pointerEvents:'none',
            background:'radial-gradient(ellipse 60% 80% at 18% 50%,rgba(210,240,110,.55) 0%,transparent 68%)',
          }}/>

          {/* Product image — CSS class handles mobile vs desktop positioning */}
          <img
            src={HERO_IMAGE.src}
            alt="Avocadoria dessert cups"
            className="hero-product-img"
            style={{ zIndex: 2 }}
          />

          {/* Gradient overlay */}
          <div style={{
            position:'absolute',inset:0,zIndex:3,pointerEvents:'none',
            background: buildOverlay(OVERLAY),
          }}/>

          {/* Hero text */}
          <div className="hero-inner" style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(24px)',
            transition:'opacity .7s ease .2s, transform .7s ease .2s',
          }}>
            <h1 className="hero-headline">
              Home of No. 1<br />
              Avocado-Based<br />
              Desserts
            </h1>
            <div className="hero-buttons">
              <Link to="/menu"       className="btn btn-white">Our Menu</Link>
              <Link to="/our-stores" className="btn btn-olive">Our Stores</Link>
            </div>
          </div>
        </section>

        {/* Hero → Avo-Faves: hero bottom color blends into image top color */}
        <Wave fromColor={C.hero} toColor="#e8f0c8" height={60} />

        {/* ══════════════════════════════════════════
            2. AVO-FAVES
        ══════════════════════════════════════════ */}
        <section style={{ background: '#e8f0c8', padding: 0, margin: 0, lineHeight: 0 }}>
          {/* Full-width image + Discover button overlaid */}
          <div style={{ position:'relative', width:'100%', lineHeight:0 }}>
            <img
              src="/avofaves.png"
              alt="Avo-Faves — Avocado Lover, Avocado Naked Light Ice Cream, Avocado Shake"
              style={{ width:'100%', display:'block', objectFit:'cover' }}
            />
            {/* Discover Avo Faves — edit AVO_BTN config at top of file */}
            <div style={{
              position:  'absolute',
              bottom:    AVO_BTN.posBottom,
              left:      AVO_BTN.posLeft,
              transform: 'translateX(-50%)',
              zIndex:    5,
            }}>
              <Link
                to="/menu"
                style={{
                  display:        'inline-flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  padding:        `${AVO_BTN.paddingY} ${AVO_BTN.paddingX}`,
                  borderRadius:   AVO_BTN.borderRadius,
                  background:     AVO_BTN.background,
                  color:          AVO_BTN.color,
                  fontFamily:     AVO_BTN.fontFamily,
                  fontSize:       AVO_BTN.fontSize,
                  fontWeight:     'bold',
                  textDecoration: 'none',
                  border:         `${AVO_BTN.borderWidth} solid ${AVO_BTN.borderColor}`,
                  boxShadow:      AVO_BTN.shadow,
                  backdropFilter: AVO_BTN.blur,
                  letterSpacing:  '0.01em',
                  whiteSpace:     'nowrap',
                  transition:     'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background   = AVO_BTN.hoverBg
                  e.currentTarget.style.color        = AVO_BTN.hoverColor
                  e.currentTarget.style.borderColor  = AVO_BTN.hoverBorder
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background   = AVO_BTN.background
                  e.currentTarget.style.color        = AVO_BTN.color
                  e.currentTarget.style.borderColor  = AVO_BTN.borderColor
                }}
              >
                {AVO_BTN.label}
              </Link>
            </div>
          </div>
        </section>

        {/* Avo-Faves → Franchise: image bottom wave is olive #b6c548 → dark green */}
        <Wave fromColor="#b6c548" toColor={C.franchise} height={64} flip />

        {/* ══════════════════════════════════════════
            3. FRANCHISE TEASER
        ══════════════════════════════════════════ */}
        <section style={{
          background: C.franchise,
          padding:'72px 32px', textAlign:'center',
        }}>
          <div style={{ maxWidth:'680px', margin:'0 auto' }}>
            <h2 className="section-title" style={{ color:'#c8e690', marginBottom:'14px' }}>
              Dreaming of your own<br />Avocadoria store?
            </h2>
            <p className="section-sub" style={{ color:'rgba(255,255,255,.85)' }}>
              Be part of our growing family.<br />Let's spread happiness in avocado!
            </p>
            <Link to="/franchise" className="btn-white">Explore Now</Link>
          </div>
        </section>

        {/* Franchise → News smooth blend */}
        <Wave fromColor={C.franchise} toColor={C.news} height={72} />

        {/* ══════════════════════════════════════════
            4. NEWS & UPDATES
        ══════════════════════════════════════════ */}
        <section style={{ background: C.news, padding:'64px 32px 80px' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <h2 className="section-title" style={{ color:'#b6c548' }}>
              News and Updates
            </h2>
            <p className="section-sub" style={{ color:'rgba(138,95,60,.65)' }}>
              Like and Follow for more updates!
            </p>
            {/* News cards placeholder — Phase 3 */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
              gap:'20px',
            }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  background:'rgba(182,197,72,.08)',
                  border:'1.5px solid rgba(182,197,72,.2)',
                  borderRadius:'16px', padding:'32px',
                  display:'flex',flexDirection:'column',gap:'10px',
                }}>
                  <div style={{ width:'100%',height:'140px',borderRadius:'10px',background:'rgba(182,197,72,.12)' }}/>
                  <div style={{ width:'60%',height:'14px',borderRadius:'6px',background:'rgba(182,197,72,.18)' }}/>
                  <div style={{ width:'90%',height:'10px',borderRadius:'6px',background:'rgba(182,197,72,.12)' }}/>
                  <div style={{ width:'75%',height:'10px',borderRadius:'6px',background:'rgba(182,197,72,.10)' }}/>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
