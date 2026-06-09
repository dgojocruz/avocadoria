import { useEffect, useState, useRef } from 'react'
import SEO from '@/components/ui/SEO'
import { Link } from 'react-router-dom'
import { NEWS_POSTS } from '@/data/posts'

// ═══════════════════════════════════════════════════════════════════════════════
// HERO CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

// ── Products (swap in sync, layers 2 + 4) ────────────────────────────────────
// Add more objects here — files go in /public/
const PRODUCTS = [
  { src: '/lover.webp',                 alt: 'Avo Lover dessert cup'     },
  { src: '/biscoff_lover.webp',         alt: 'Biscoff Lover dessert cup' },
  { src: '/naked_light_ice_cream.webp', alt: 'Naked Light Ice Cream'     },
]

// ── Layer 1: Background image ─────────────────────────────────────────────────
const BG = {
  src:            '/avocadoria_bg.webp',
  // Adjust objectPosition to reframe the image:
  // 'center center' = default centered
  // 'center bottom' = pull image down, show bottom portion
  // '50% 70%'       = custom vertical shift (higher % = lower in image)
  objectPosition: 'center bottom',  // ← pulls image down to fill hero
}

// ── Layer 2: Ambient ghost (large, dimmed, same product as layer 4) ───────────
const AMBIENT = {
  opacity:    0.22,   // 0.0–1.0          try: 0.15–0.35
  saturate:   1.0,    // 0.0=grey 1.0=full
  brightness: 1.2,
  blur:       '0px',
  heightVh:   100,    // try: 90–115
  right:      '-2%',
}

// ── Layer 3: White wash (left side only) ──────────────────────────────────────
const WASH = {
  opacityLeft:    0.88,
  opacityMidLeft: 0.62,
  opacityMid:     0.18,
  opacityRight:   0.0,
  clearAt:        '60%',
}

// ── Layer 4: Sharp hero product ───────────────────────────────────────────────
const PRODUCT = {
  right:       '2%',    // from right edge          try: '0%'–'8%'
  bottom:      '0%',    // sits on the slope        try: '0%'–'5%'
  height:      '52vh',  // matching preview size    try: '48vh'–'60vh'
  mobileWidth: '62vw',
  mobileMaxW:  '240px',
}

// ── Layer 5: Slope image ──────────────────────────────────────────────────────
const SLOPE = {
  src:    '/slope_background.svg',
  height: '20%',
}

// ── Text ──────────────────────────────────────────────────────────────────────
const TEXT = {
  left:   'clamp(48px, 6vw, 110px)',
  bottom: '20vh',
}

// ── Timing ────────────────────────────────────────────────────────────────────
const TIMING = {
  duration:   5500,
  transition:  800,
}

// ── Dots ──────────────────────────────────────────────────────────────────────
const DOTS = {
  size: 8, sizeActive: 12,
  color: 'rgba(255,255,255,0.45)',
  colorActive: '#fff',
  glow: '0 0 10px rgba(182,197,72,0.9)',
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTERNALS
// ═══════════════════════════════════════════════════════════════════════════════

function Wave({ fromColor, toColor, height = 70, flip = false }) {
  const path = flip
    ? `M0,${height} C360,0 1080,${height} 1440,${Math.round(height*0.4)} L1440,0 L0,0 Z`
    : `M0,0 C360,${height} 1080,0 1440,${Math.round(height*0.6)} L1440,${height} L0,${height} Z`
  return (
    <div style={{ background: fromColor, lineHeight: 0 }}>
      <svg viewBox={`0 0 1440 ${height}`} xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" style={{ display:'block', width:'100%', height:`${height}px` }}>
        <path d={path} fill={toColor} />
      </svg>
    </div>
  )
}

const AVO_BTN = {
  label:'Discover Avo Faves', fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
  paddingX:'40px', paddingY:'14px',
  background:'rgba(255,255,255,0.92)', color:'#3a6b35',
  borderColor:'rgba(255,255,255,0.9)', borderWidth:'2.5px', borderRadius:'999px',
  shadow:'0 6px 24px rgba(58,107,53,0.22)', blur:'blur(4px)',
  hoverBg:'#b6c548', hoverColor:'#fff', hoverBorder:'#b6c548',
  posBottom:'18%', posLeft:'37%',
}

// ── Product layers (2 + 4) — only these swap ──────────────────────────────────
function ProductLayers() {
  const [cur,     setCur]     = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)

  const goTo = (next) => {
    if (next === cur) return
    setVisible(false)
    setTimeout(() => { setCur(next); setTimeout(() => setVisible(true), 40) }, TIMING.transition)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCur(p => {
          const next = (p + 1) % PRODUCTS.length
          setTimeout(() => setVisible(true), 40)
          return next
        })
      }, TIMING.transition)
    }, TIMING.duration)
    return () => clearInterval(timerRef.current)
  }, [])

  const product = PRODUCTS[cur]
  const fadeStyle = (opacity = 1) => ({
    opacity:    visible ? opacity : 0,
    transition: `opacity ${TIMING.transition}ms ease`,
  })

  return (
    <>
      {/* LAYER 2 — Ambient ghost removed for cleaner transitions */}

      {/* LAYER 4 — Sharp product: on TOP of slope, uses responsive classes */}
      <div className="avo-hero__product-wrap" style={{ zIndex:8, ...fadeStyle() }}>
        <img
          src={product.src}
          alt={product.alt}
          className="avo-hero__product-img"
          style={{ pointerEvents:'none' }}
        />
      </div>

      {/* Dots */}
      {PRODUCTS.length > 1 && (
        <div className="avo-hero__dots">
          {PRODUCTS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              aria-label={`Show product ${i + 1}`}
              style={{
                width:`${i===cur ? DOTS.sizeActive : DOTS.size}px`,
                height:`${i===cur ? DOTS.sizeActive : DOTS.size}px`,
                borderRadius:'50%',
                background: i===cur ? DOTS.colorActive : DOTS.color,
                boxShadow:  i===cur ? DOTS.glow : 'none',
                border:'none', cursor:'pointer', padding:0,
                minHeight:'unset', minWidth:'unset',
                transition:'all 0.35s ease',
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}


// ═══════════════════════════════════════════════════════════════════════════════
// FRANCHISE TEASER CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

const FRANCHISE_CARTS = [
  {
    id:       'food-truck',
    image:    '/ft-food-truck.png',
    name:     'Food Truck',
    tag:      'Most Mobile',
    tagColor: '#EF7ECB',
    color:    '#b6c548',
  },
  {
    id:       'kiosk',
    image:    '/ft-kiosk.png',
    name:     'Kiosk',
    tag:      'Most Popular',
    tagColor: '#b6c548',
    color:    '#3a6b35',
  },
  {
    id:       'kiosk-1',
    image:    '/ft-kiosk-1.png',
    name:     'Kiosk Premium',
    tag:      'Fan Favourite',
    tagColor: '#DFD438',
    color:    '#8A5F3C',
  },
  {
    id:       'kiosk-2',
    image:    '/ft-kiosk-2.png',
    name:     'Kiosk Classic',
    tag:      'Best Value',
    tagColor: '#3a6b35',
    color:    '#EF7ECB',
  },
  {
    id:       'island',
    image:    '/ft-island.png',
    name:     'Island',
    tag:      'Largest Format',
    tagColor: '#b6c548',
    color:    '#3a6b35',
  },
  {
    id:       'island-1',
    image:    '/ft-island-1.png',
    name:     'Island Plus',
    tag:      'With Seating',
    tagColor: '#EF7ECB',
    color:    '#b6c548',
  },
]

const FRANCHISE_TIMING = {
  intervalMs:   10000,  // 10s auto-advance     try: 8000–15000
  transitionMs:   600,  // crossfade speed
}

// ── Franchise section background ──────────────────────────────────────────────
// Copies the hero section feel — light green gradient matching homepage top
// Change any value here to retheme the section
const FRANCHISE_BG = {
  // Type: 'image' | 'gradient' | 'solid' | 'transparent'
  type: 'image',

  // Background image path — drop file in /public/
  image: '/franchise-bg.webp',

  // Overlay — white wash on top of the image
  // 0.0 = no overlay, 1.0 = full white  ← try: 0.30–0.55
  overlayOpacity: 0.45,

  // Padding top/bottom
  paddingTop:    '32px',
  paddingBottom: '48px',
}

// White stroke text-shadow (same as hero headline)
const FT_STROKE = [
  '-3px -3px 0 #fff', ' 3px -3px 0 #fff',
  '-3px  3px 0 #fff', ' 3px  3px 0 #fff',
  '-3px  0   0 #fff', ' 3px  0   0 #fff',
  ' 0   -3px 0 #fff', ' 0    3px 0 #fff',
  '-2px -2px 0 #fff', ' 2px -2px 0 #fff',
  '-2px  2px 0 #fff', ' 2px  2px 0 #fff',
].join(', ')

function FranchiseTeaser() {
  const [cur,     setCur]     = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef(null)

  const goTo = (next) => {
    if (next === cur) return
    setVisible(false)
    setTimeout(() => {
      setCur(next)
      setTimeout(() => setVisible(true), 40)
    }, FRANCHISE_TIMING.transitionMs)
  }

  const prev = () => goTo((cur - 1 + FRANCHISE_CARTS.length) % FRANCHISE_CARTS.length)
  const next = () => goTo((cur + 1) % FRANCHISE_CARTS.length)

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => next(), FRANCHISE_TIMING.intervalMs)
    return () => clearInterval(timerRef.current)
  }, [cur])

  const resetTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => next(), FRANCHISE_TIMING.intervalMs)
  }

  const cart = FRANCHISE_CARTS[cur]

  const arrowBtn = (onClick, label, children) => (
    <button
      onClick={() => { onClick(); resetTimer() }}
      aria-label={label}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.85)',
        border: `2px solid ${cart.color}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: '22px', color: cart.color,
        flexShrink: 0,
        boxShadow: '0 2px 10px rgba(0,0,0,0.10)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = cart.color; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.color = cart.color }}
    >
      {children}
    </button>
  )

  return (
    <section style={{
      padding: `${FRANCHISE_BG.paddingTop} 24px ${FRANCHISE_BG.paddingBottom}`,
      position: 'relative',
      background: 'linear-gradient(135deg, #c8d96a 0%, #d9e29e 40%, #c0d458 100%)',
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
      <style>{`
        @keyframes ft-fade-in {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .ft-card-enter { animation: ft-fade-in ${FRANCHISE_TIMING.transitionMs}ms ease forwards; }

        /* Progress bar */
        @keyframes ft-progress {
          from { width: 0% }
          to   { width: 100% }
        }

        .ft-btn-white {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 13px 36px; border-radius: 999px;
          background: rgba(255,255,255,0.92);
          border: 2px solid rgba(182,197,72,0.5);
          font-family: 'BubbleboddyNeue', 'Nunito', sans-serif;
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 800; color: #3a6b35;
          text-decoration: none; cursor: pointer;
          box-shadow: 0 4px 18px rgba(58,107,53,0.15),
                      inset 0 1px 0 rgba(255,255,255,0.8);
          transition: all 0.2s;
          text-shadow: ${FT_STROKE};
        }
        .ft-btn-white:hover {
          background: #b6c548; color: #fff;
          border-color: #b6c548;
          text-shadow: none;
        }

        @media (max-width: 767px) {
          .ft-card-grid { flex-direction: column !important; }
          .ft-card-img  { width: 100% !important; max-height: 220px !important; }
          .ft-card-info { padding: 20px !important; }
        }
      `}</style>

      {/* ── Headline ── */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Badge */}
        <span style={{
          display: 'inline-block', marginBottom: '10px',
          background: '#EF7ECB', color: '#fff',
          fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
          fontSize: '11px', fontWeight: '800',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          padding: '4px 16px', borderRadius: '999px',
        }}>
          Now Open for Franchising 🥑
        </span>

        {/* Headline — both lines same brand color + stroke */}
        <h2 style={{
          fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
          lineHeight: 1.1,
          margin: '0 0 12px',
          color: '#b5c448',
          textShadow: FT_STROKE,
        }}>
          Dreaming of your own<br />Avocadoria store?
        </h2>

        <p style={{
          fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
          fontSize: 'clamp(13px, 1.3vw, 16px)',
          color: '#5a8a1a',
          margin: 0,
          textShadow: '0 1px 0 rgba(255,255,255,0.8)',
        }}>
          Six flexible formats. One iconic brand.
        </p>
      </div>

      {/* ── Carousel wrapper — 3 visible, sliding track ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* Left arrow */}
        {arrowBtn(prev, 'Previous cart format', '‹')}

        {/* Sliding track */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{
            display: 'flex', gap: '16px',
            transform: `translateX(calc(-${cur} * (100% / 3 + 16px / 3)))`,
            transition: `transform ${FRANCHISE_TIMING.transitionMs}ms cubic-bezier(.4,0,.2,1)`,
          }}>
            {FRANCHISE_CARTS.map((c) => (
              <div
                key={c.id}
                style={{
                  flexShrink: 0,
                  width: 'calc((100% - 32px) / 3)',
                  position: 'relative',
                  aspectRatio: '4/3',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '140%', height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center center',
                    filter: 'drop-shadow(0 12px 28px rgba(40,70,20,0.22))',
                    left: '-20%',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        {arrowBtn(next, 'Next cart format', '›')}
      </div>

      {/* ── Dots hidden ── */}
      <div style={{ display: 'none' }}>
        {FRANCHISE_CARTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { goTo(i); resetTimer() }}
            aria-label={`Show ${c.name}`}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
            }}
          >
            {/* Label */}
            <span style={{
              fontFamily: 'Nunito, sans-serif',
              fontSize: '11px', fontWeight: i===cur ? '800' : '600',
              color: i===cur ? FRANCHISE_CARTS[i].color : 'rgba(90,120,30,0.5)',
              transition: 'all 0.3s',
            }}>
              {c.name}
            </span>
            {/* Dot + progress track */}
            <div style={{ position: 'relative', width: '40px', height: '4px', borderRadius: '2px', background: 'rgba(182,197,72,0.2)' }}>
              {i === cur && (
                <div key={`prog-${cur}`} style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  borderRadius: '2px', background: cart.color,
                  animation: `ft-progress ${FRANCHISE_TIMING.intervalMs}ms linear forwards`,
                }}/>
              )}
              {i !== cur && (
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: 'rgba(182,197,72,0.4)',
                }}/>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Explore Now button ── */}
      <div style={{ textAlign: 'center', marginTop: '28px' }}>
        <Link to="/franchise" className="ft-btn-white">
          Explore Franchise Opportunities →
        </Link>
      </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  const C = { hero:'#b6c548', franchise:'#3a6b35', news:'#F4FAEC' }

  // Slope color #b5c448 — white stroke (6px spread via text-shadow)
  const STROKE_WHITE = [
    '-3px -3px 0 #fff', ' 3px -3px 0 #fff',
    '-3px  3px 0 #fff', ' 3px  3px 0 #fff',
    '-3px  0   0 #fff', ' 3px  0   0 #fff',
    ' 0   -3px 0 #fff', ' 0    3px 0 #fff',
    '-2px -2px 0 #fff', ' 2px -2px 0 #fff',
    '-2px  2px 0 #fff', ' 2px  2px 0 #fff',
  ].join(', ')

  const STROKE_WHITE_SM = [
    '-2px -2px 0 #fff', ' 2px -2px 0 #fff',
    '-2px  2px 0 #fff', ' 2px  2px 0 #fff',
    '-2px  0   0 #fff', ' 2px  0   0 #fff',
    ' 0   -2px 0 #fff', ' 0    2px 0 #fff',
  ].join(', ')

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
        @keyframes hero-breathe {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-8px) scale(1.015); }
        }

        /* ── MOBILE FIRST ── */
        .avo-hero {
          position: relative;
          width: 100%;
          height: 100svh;
          max-height: 700px;
          overflow: hidden;
          background: #d9eaa0;
          display: block;
        }

        /* Mobile: text — bottom-left, above slope */
        .avo-hero__text {
          position: absolute;
          z-index: 7;
          bottom: clamp(80px, 14%, 120px);
          left: 0;
          padding: 0 20px 0 20px;
          max-width: 70%;
          width: auto;
        }

        /* Mobile: product — small, right side, just above tagline */
        .avo-hero__product-wrap {
          position: absolute;
          bottom: clamp(72px, 12%, 110px);
          right: 8px;
          z-index: 8;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding-bottom: 0;
          flex: unset;
        }

        /* Mobile headline */
        .avo-hero__headline {
          font-size: clamp(1.5rem, 6vw, 2rem) !important;
          margin-bottom: 10px !important;
        }

        /* Mobile buttons: stack */
        .avo-hero__buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 200px;
        }
        .avo-hero__buttons .btn {
          width: 100%;
          text-align: center;
          justify-content: center;
          font-size: 13px !important;
          padding: 8px 16px !important;
          min-height: 38px !important;
        }

        /* Mobile product image — small thumbnail */
        .avo-hero__product-img {
          width: 28vw;
          max-width: 120px;
          height: auto;
          object-fit: contain;
          animation: hero-breathe 4.5s ease-in-out infinite;
        }

        /* Mobile dots — hidden on mobile to save space */
        .avo-hero__dots {
          display: none;
        }

        /* ── DESKTOP (768px+) ── */
        @media (min-width: 768px) {
          .avo-hero {
            display: block;          /* back to absolute positioning */
            height: 100vh;
            min-height: 100vh;
          }

          .avo-hero__text {
            position: absolute;
            left:   ${TEXT.left};
            bottom: ${TEXT.bottom};
            padding: 0;
            max-width: 520px;
            width: auto;
          }

          .avo-hero__headline {
            font-size: clamp(2.4rem, 5vw, 4.2rem) !important;
            margin-bottom: 28px !important;
          }

          .avo-hero__buttons {
            flex-direction: row;
            width: auto;
            max-width: none;
          }
          .avo-hero__buttons .btn {
            width: auto;
          }

          .avo-hero__product-wrap {
            position: absolute;
            right:  ${PRODUCT.right};
            bottom: ${PRODUCT.bottom};
            height: ${PRODUCT.height};
            width: auto;
            flex: unset;
            align-items: unset;
            justify-content: unset;
            padding-bottom: 0;
          }

          .avo-hero__product-img {
            width: auto;
            height: 100%;
            max-width: none;
            animation: hero-breathe 4.5s ease-in-out infinite;
          }

          .avo-hero__dots {
            right: 20px;
            bottom: calc(${SLOPE.height} + 16px);
            flex-direction: column;
          }
        }
      `}</style>

      <div className="page-enter">

        {/* ════════════ HERO ════════════ */}
        <section className="avo-hero" style={{ marginBottom: 0, paddingBottom: 0 }}>

          {/* LAYER 1 — Static background: covers full hero including slope area */}
          <img src={BG.src} alt="" aria-hidden="true" style={{
            position:'absolute',
            top:0, left:0,
            width:'100%',
            height:'100%',
            objectFit:'cover',
            objectPosition: BG.objectPosition,
            zIndex:1,
            pointerEvents:'none',
            display:'block',
          }}/>

          {/* LAYERS 2 + 4 — Products */}
          <ProductLayers />

          {/* LAYER 3 — White wash left only */}
          <div style={{
            position:'absolute', inset:0, zIndex:3, pointerEvents:'none',
            background:`linear-gradient(to right,
              rgba(255,255,255,${WASH.opacityLeft})    0%,
              rgba(255,255,255,${WASH.opacityMidLeft}) 28%,
              rgba(255,255,255,${WASH.opacityMid})     44%,
              rgba(255,255,255,${WASH.opacityRight})   ${WASH.clearAt},
              rgba(255,255,255,0) 100%)`,
          }}/>

          {/* LAYER 5 — Slope: seamless inline SVG bleeding into Avo-Faves */}
          <div style={{
            position:'absolute', bottom:-2, left:0, right:0,
            width:'100%', height:SLOPE.height,
            zIndex:6, pointerEvents:'none', lineHeight:0,
            overflow:'hidden',
            background:'transparent',
          }}>
            <svg
              viewBox="0 0 1440 222"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              style={{ display:'block', width:'100%', height:'calc(100% + 4px)' }}
            >
              {/* Transparent background — Avo-Faves shows through underneath */}
              {/* Only the wave shape itself is colored */}
              <path
                d="M0,222 L0,140 C120,90 240,60 400,80 C560,100 680,160 840,155 C1000,150 1120,95 1280,75 C1360,65 1400,68 1440,72 L1440,222 Z"
                fill="#b6c548"
              />
            </svg>
          </div>

          {/* LAYER 6 — Static text + buttons — NEVER changes */}
          <div className="avo-hero__text" style={{
            opacity:   loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(22px)',
            transition:'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>
            {/* Brand quote */}
            <p style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
              fontSize: 'clamp(11px, 1.1vw, 14px)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#b5c448',
              margin: '0 0 6px 2px',
              textShadow: STROKE_WHITE_SM,
            }}>
              &ldquo;Happiness in Avocado&rdquo;
            </p>

            {/* Headline */}
            <h1 className="avo-hero__headline" style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '0.01em',
              color: '#b5c448',
              background: 'none',
              WebkitTextFillColor: '#b5c448',
              animation: 'none',
              textShadow: STROKE_WHITE,
            }}>
              Home of No. 1<br />
              Avocado-Based<br />
              Desserts
            </h1>

            {/* Buttons */}
            <div className="avo-hero__buttons">
              <Link to="/menu"       className="btn btn-white">Our Menu</Link>
              <Link to="/our-stores" className="btn btn-olive">Our Stores</Link>
            </div>
          </div>

        </section>

        {/* Hero slope transitions directly into Avo-Faves — no Wave needed */}
        {/* ════════════ AVO-FAVES ════════════ */}
        <section style={{ background:'#e8f0c8', padding:0, margin:0, lineHeight:0 }}>
          <div style={{ position:'relative', width:'100%', lineHeight:0 }}>
            <img src="/avofaves.png"
              alt="Avo-Faves — Avocado Lover, Naked Light Ice Cream, Avocado Shake"
              style={{ width:'100%', display:'block', objectFit:'cover' }}
            />
            <div style={{
              position:'absolute', bottom:AVO_BTN.posBottom, left:AVO_BTN.posLeft,
              transform:'translateX(-50%)', zIndex:5,
            }}>
              <Link to="/menu" style={{
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                padding:`${AVO_BTN.paddingY} ${AVO_BTN.paddingX}`,
                borderRadius:AVO_BTN.borderRadius, background:AVO_BTN.background,
                color:AVO_BTN.color, fontFamily:AVO_BTN.fontFamily,
                fontSize:'clamp(1rem,1.6vw,1.3rem)', fontWeight:'bold',
                textDecoration:'none',
                border:`${AVO_BTN.borderWidth} solid ${AVO_BTN.borderColor}`,
                boxShadow:AVO_BTN.shadow, backdropFilter:AVO_BTN.blur,
                letterSpacing:'0.01em', whiteSpace:'nowrap', transition:'all 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background=AVO_BTN.hoverBg;e.currentTarget.style.color=AVO_BTN.hoverColor;e.currentTarget.style.borderColor=AVO_BTN.hoverBorder}}
                onMouseLeave={e=>{e.currentTarget.style.background=AVO_BTN.background;e.currentTarget.style.color=AVO_BTN.color;e.currentTarget.style.borderColor=AVO_BTN.borderColor}}
              >{AVO_BTN.label}</Link>
            </div>
          </div>
        </section>

        {/* Wave: Avo Faves #e8f0c8 → franchise green — matches the slope gradient */}
        <Wave fromColor="#e8f0c8" toColor="#c8d96a" height={60} />

        {/* ════════════ FRANCHISE TEASER ════════════ */}
        <FranchiseTeaser />

        <Wave fromColor="#e8f0c8" toColor="#d9e29e" height={56} />

        {/* ════════════ WHAT'S NEW ════════════ */}
        <section style={{ position:'relative', overflow:'hidden', padding:'64px 32px 80px' }}>
          <img src="/avobg.svg" aria-hidden="true" style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover', zIndex:0,
          }} />
          <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

            {/* Header row */}
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'12px', marginBottom:'32px' }}>
              <div>
                <h2 className="section-title" style={{ color:'#b6c548', margin:'0 0 6px' }}>
                  {"What's New"}
                </h2>
                <p className="section-sub" style={{ color:'rgba(138,95,60,.65)', margin:0 }}>
                  Latest news and updates from Avocadoria
                </p>
              </div>
              <Link to="/about#whats-new" style={{
                fontFamily:'Nunito, sans-serif', fontSize:'13px', fontWeight:'700',
                color:'#b6c548', textDecoration:'none', whiteSpace:'nowrap',
                display:'flex', alignItems:'center', gap:'4px',
                paddingBottom:'2px', borderBottom:'2px solid rgba(182,197,72,0.3)',
                transition:'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor='#b6c548'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(182,197,72,0.3)'}
              >
                View all posts →
              </Link>
            </div>

            {/* Live post cards — pulls from posts.js, shows latest 3 */}
            {NEWS_POSTS.length > 0 ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'20px' }}>
                {NEWS_POSTS.slice(0, 3).map(post => (
                  <Link
                    key={post.id}
                    to="/about#whats-new"
                    style={{ textDecoration:'none' }}
                  >
                    <div style={{
                      background:'rgba(255,255,255,0.85)',
                      border:'1.5px solid rgba(182,197,72,0.2)',
                      borderRadius:'16px', padding:'24px',
                      display:'flex', flexDirection:'column', gap:'10px',
                      height:'100%', boxSizing:'border-box',
                      transition:'box-shadow 0.2s, border-color 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 6px 24px rgba(58,107,53,0.10)'; e.currentTarget.style.borderColor='rgba(182,197,72,0.5)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(182,197,72,0.2)' }}
                    >
                      {/* Image or placeholder */}
                      <div style={{
                        width:'100%', height:'140px', borderRadius:'10px',
                        background:'rgba(182,197,72,0.10)',
                        overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center',
                      }}>
                        {post.image
                          ? <img src={post.image} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                          : <span style={{ fontSize:'36px' }}>🥑</span>
                        }
                      </div>

                      {/* Category + date */}
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                        <span style={{
                          background: post.featured ? '#b6c548' : 'rgba(182,197,72,0.15)',
                          color: post.featured ? '#fff' : '#3a6b35',
                          fontFamily:'Nunito,sans-serif', fontSize:'10px', fontWeight:'800',
                          letterSpacing:'0.06em', textTransform:'uppercase',
                          padding:'3px 10px', borderRadius:'999px',
                        }}>
                          {post.featured ? 'Featured' : post.category}
                        </span>
                        <span style={{ fontFamily:'Nunito,sans-serif', fontSize:'11px', color:'rgba(138,95,60,0.5)' }}>
                          {new Date(post.date).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontFamily:'Nunito,sans-serif', fontWeight:'800',
                        fontSize:'clamp(14px,1.4vw,16px)', color:'#3a6b35',
                        margin:0, lineHeight:1.35,
                      }}>
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p style={{
                        fontFamily:'Nunito,sans-serif', fontSize:'13px',
                        color:'rgba(138,95,60,0.8)', lineHeight:1.6, margin:0,
                        display:'-webkit-box', WebkitLineClamp:2,
                        WebkitBoxOrient:'vertical', overflow:'hidden',
                      }}>
                        {post.excerpt}
                      </p>

                      {/* Read more */}
                      <span style={{
                        fontFamily:'Nunito,sans-serif', fontSize:'12px',
                        fontWeight:'700', color:'#b6c548', marginTop:'auto',
                      }}>
                        Read more →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div style={{ textAlign:'center', padding:'48px 0' }}>
                <span style={{ fontSize:'40px' }}>🥑</span>
                <p style={{ fontFamily:'Nunito,sans-serif', color:'rgba(138,95,60,0.5)', marginTop:'12px' }}>
                  No posts yet — check back soon!
                </p>
              </div>
            )}

          </div>
          </div>
        </section>

      </div>
    </>
  )
}
