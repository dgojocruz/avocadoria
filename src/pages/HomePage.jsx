import { useEffect, useState, useRef } from 'react'
import SEO from '@/components/ui/SEO'
import { Link } from 'react-router-dom'
import { NEWS_POSTS } from '@/data/posts'

// ═══════════════════════════════════════════════════════════════════════════════
// HERO CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

// ── Products (swap in sync — BG + product panel use same index) ──────────────
// Add more objects here — files go in /public/
const PRODUCTS = [
  {
    bg:     '/Avo_Lover.png',      // BG Layer 1 — full scene photo with Ken Burns zoom
    src:    '/lover_nobg.png',     // Product carousel Layer 4 — transparent cutout floating
    alt:    'Avo Lover dessert cup',
    origin: '30% 60%',             // zoom anchor point on BG photo
  },
  {
    bg:     '/Naked___Inipit.png',
    src:    '/naked_nobg.png',
    alt:    'Naked Ice Cream & Inipit',
    origin: '30% 60%',
  },
  {
    bg:     '/Shakes.png',
    src:    '/shake_nobg.png',
    alt:    'Avocadoria Shakes',
    origin: '30% 60%',
  },
]

// ── Layer 1: Background image ─────────────────────────────────────────────────
// BG now cycles through PRODUCTS — same index as the product panel (Layer 4)
const BG = {
  objectPosition: 'center 45%',   // push image down — increase % to go lower
  bgColor:        '#d9e29e',        // static bg shown behind — matches hero brand green
  bgScale:        1.0,              // resting scale — keep at 1.0+ so edges never show
  zoomScale:      1.5,              // zoom START scale — stays above 1.0 so always cropped
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
  opacityLeft:    0.75,
  opacityMidLeft: 0.75,
  opacityMid:     0.75,
  opacityRight:   0.60,
  clearAt:        '65%',
}

// ── Layer 4: Sharp hero product ───────────────────────────────────────────────
const PRODUCT = {
  right:       '5%',    // from right edge          try: '0%'–'8%'
  bottom:      '0%',    // sits on the slope        try: '0%'–'5%'
  height:      '44vh',  // matching preview size    try: '48vh'–'60vh'
  mobileWidth: '62vw',
  mobileMaxW:  '240px',
}

// ── Layer 5: Slope image ──────────────────────────────────────────────────────
const SLOPE = {
  src:    '/slope_background.svg',
  height: '30%',
}

// ── Text ──────────────────────────────────────────────────────────────────────
const TEXT = {
  left:   'clamp(48px, 6vw, 110px)',
  bottom: '20vh',
}

// ── Timing ────────────────────────────────────────────────────────────────────
const TIMING = {
  duration:   8000,   // ms each slide stays on screen (also controls zoom speed)
  transition:  500,   // ms crossfade between slides
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
  label:'Discover Avo Faves', fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
  paddingX:'40px', paddingY:'14px',
  background:'rgba(255,255,255,0.92)', color:'#3a6b35',
  borderColor:'rgba(255,255,255,0.9)', borderWidth:'2.5px', borderRadius:'999px',
  shadow:'0 6px 24px rgba(58,107,53,0.22)', blur:'blur(4px)',
  hoverBg:'#b6c548', hoverColor:'#fff', hoverBorder:'#b6c548',
  posBottom:'18%', posLeft:'37%',
}

// ── Shared hero state — BG + product panel stay in sync ──────────────────────
// usHeroSlide returns { cur, visible, goTo } consumed by both BgLayer + ProductLayers
function useHeroSlide() {
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

  return { cur, visible, goTo }
}

// ── Layer 1: BG slideshow with slow Ken Burns zoom ────────────────────────────
function BgLayer({ cur, visible }) {
  return (
    <div style={{ position:'absolute', inset:0, zIndex:1, overflow:'hidden', pointerEvents:'none', background: BG.bgColor }}>
      {PRODUCTS.map((p, i) => (
        <img
          key={p.bg}
          src={p.bg}
          alt=""
          aria-hidden="true"
          style={{
            position:       'absolute',
            inset:          0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: BG.objectPosition,
            display:        'block',
            // fade in/out
            opacity:        (i === cur && visible) ? 1 : 0,
            transition:     `opacity ${TIMING.transition}ms ease`,
            // slow Ken Burns zoom — only the active slide animates
            transform:      (i === cur && visible) ? `scale(${BG.bgScale})` : `scale(${BG.bgScale * BG.zoomScale})`,
            transformOrigin: p.origin || 'center center',
            transitionProperty: 'opacity, transform',
            transitionDuration: `${TIMING.transition}ms, ${TIMING.duration + TIMING.transition}ms`,
            transitionTimingFunction: 'ease, ease-out',
          }}
        />
      ))}
    </div>
  )
}

// ── Layers 4 + dots — product panel (same image as BG, right side) ────────────
function ProductLayers({ cur, visible, goTo }) {
  const product = PRODUCTS[cur]
  const fadeStyle = {
    opacity:    visible ? 1 : 0,
    transition: `opacity ${TIMING.transition}ms ease`,
  }

  return (
    <>
      {/* LAYER 4 — Product panel: same image as BG, right side */}
      <div className="avo-hero__product-wrap" style={{ zIndex:8, ...fadeStyle }}>
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

// ── Franchise overlay tint ─────────────────────────────────────────────────
// Change OVERLAY_COLOR to any green shade, adjust OVERLAY_OPACITY (0 = none, 1 = solid)
// ── Matched exactly to avofaves.png top strip (#e3e4c3) ──────────────────
// paper base #f3f1ed + this overlay = avofaves green tone
// ── Pixel-matched to avofaves.png top strip (#e1e2c1) ────────────────────
const FRANCHISE_OVERLAY = {
  color:   '#e1f169',
  opacity: 0.2,   // 0.25 = lighter · 0.30 = avofaves match · 0.35 = darker
}

function FranchiseTeaser() {
  const N = FRANCHISE_CARTS.length
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % N)
    }, FRANCHISE_TIMING.intervalMs)
  }

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [])

  const goTo = (i) => { setActive(i); startTimer() }

  // Each cart gets a position on the circle
  // active cart = bottom-center (angle 90deg), others spread around
  const getStyle = (i) => {
    const total   = N
    const offset  = i - active
    // normalise offset to [-N/2, N/2]
    const norm    = ((offset % total) + total) % total
    const wrapped = norm > total / 2 ? norm - total : norm
    // angle: active = 270deg (bottom), spread evenly
    const angleStep = 360 / total
    const angle   = 270 + wrapped * angleStep  // degrees
    const rad     = angle * Math.PI / 180

    // Ellipse radii — wide, shallow so all carts stay visible
    const rx = 38   // % of container width
    const ry = 26   // % of container height

    const cx = 50 + rx * Math.cos(rad)   // %
    const cy = 58 + ry * Math.sin(rad)   // % — increase to move orbit lower

    const isActive = i === active
    // cards behind the center line appear smaller
    const depth = Math.sin(rad)  // -1 (top) to +1 (bottom)
    const scale = isActive ? 1.3  : 0.44 + 0.18 * ((depth + 1) / 2)
    const zIdx  = isActive ? 10 : Math.round(5 + 4 * ((depth + 1) / 2))
    const opacity = isActive ? 1 : 0.72 + 0.28 * ((depth + 1) / 2)

    return { cx, cy, scale, zIdx, opacity, isActive }
  }

  return (
    <section style={{
      padding: `${FRANCHISE_BG.paddingTop} 24px ${FRANCHISE_BG.paddingBottom}`,
      position: 'relative',
      backgroundImage: "url('/website_layer_1.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#F3F2EE',
      overflow: 'hidden',
    }}>
      {/* ── Green tint overlay — adjust FRANCHISE_OVERLAY at top of component ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundColor: FRANCHISE_OVERLAY.color,
        opacity: FRANCHISE_OVERLAY.opacity,
      }} />
      <style>{`
        .ft-btn-white {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 13px 36px; border-radius: 999px;
          background: rgba(255,255,255,0.92);
          border: 2px solid rgba(182,197,72,0.5);
          font-family: 'BubbleboddyNeue-ExtraBold','Poppins',sans-serif;
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 800; color: #3a6b35;
          text-decoration: none; cursor: pointer;
          box-shadow: 0 4px 18px rgba(58,107,53,0.15);
          transition: all 0.25s;
        }
        .ft-btn-white:hover {
          background: #b6c548; color: #fff;
          border-color: #b6c548;
        }
        .ft-ring-cart {
          position: absolute;
          transform-origin: center center;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .ft-ring-cart img {
          width: 100%; height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(40,70,20,0.28));
          transition: filter 0.4s ease, transform 0.7s cubic-bezier(0.4,0,0.2,1);
          pointer-events: none;
          transform: scale(1);
        }
        .ft-ring-cart.is-active img {
          filter: drop-shadow(0 20px 40px rgba(40,70,20,0.40));
          transform: scale(1.18);
        }
        @media (max-width: 767px) {
          .ft-orbit {
            height: 300px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .ft-ring-cart { display: none !important; }
          .ft-ring-cart.is-active {
            display: block !important;
            position: relative !important;
            left: auto !important; top: auto !important;
            transform: scale(1) !important;
            width: 260px !important; height: 260px !important;
            margin: 0 auto !important; opacity: 1 !important;
          }
          .ft-ring-cart.is-active img { transform: scale(1) !important; }
        }
      `}</style>

      {/* ── Explore button — top ── */}
      <div style={{ textAlign: 'center', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
        <Link to="/franchise" className="ft-btn-white">
          Explore Franchise Opportunities →
        </Link>
      </div>

      {/* ── Orbit stage ── */}
      <div
        className="ft-orbit"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          height: '700px',
          margin: '0 auto',
          zIndex: 1,
        }}
      >
        {FRANCHISE_CARTS.map((c, i) => {
          const { cx, cy, scale, zIdx, opacity, isActive } = getStyle(i)
          // card size relative to container
          const cardW = 380   // px base width
          const cardH = 380   // px base height
          return (
            <div
              key={c.id}
              className={`ft-ring-cart${isActive ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              style={{
                left:      `calc(${cx}% - ${cardW / 2}px)`,
                top:       `calc(${cy}% - ${cardH / 2}px)`,
                width:     `${cardW}px`,
                height:    `${cardH}px`,
                transform: `scale(${scale})`,
                zIndex:    zIdx,
                opacity,
              }}
            >
              <img src={c.image} alt={c.name} />
            </div>
          )
        })}
      </div>


    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ─── Recognitions Teaser ─────────────────────────────────────────────────────
const REC_AWARDS = [
  { img: '/awards/award-p3-0.png',  orient: 'portrait',  fit: 'cover',   pos: 'center 20%', bg: '#1a2a10', year: '2024', label: 'EY Young Entrepreneur of the Year',             issuer: 'Ernst & Young Philippines' },
  { img: '/awards/award-p2-0.png',  orient: 'portrait',  fit: 'cover',   pos: 'center top', bg: '#1a3a20', year: '2025', label: "Asia's Top Outstanding Woman Marketeer",        issuer: 'Asia Marketing Federation' },
  { img: '/awards/award-p2-2.jpeg', orient: 'portrait',  fit: 'cover',   pos: 'center 30%', bg: '#0a1a40', year: '2026', label: 'Gawad Yamang Isip — Top Madrid Protocol Filer', issuer: 'IP Office of the Philippines' },
  { img: '/awards/award-p1-2.png',  orient: 'landscape', fit: 'contain', pos: 'center',     bg: '#1a1205', year: '2023', label: 'Asian Sterling Awards Hall of Fame',            issuer: 'Most Outstanding Avocado Dessert Brand' },
  { img: '/awards/award-p1-0.png',  orient: 'portrait',  fit: 'cover',   pos: 'center top', bg: '#1a1a2a', year: '2022', label: 'Francorp 100 Club',                             issuer: 'Francorp Philippines' },
  { img: '/awards/award-p2-1.png',  orient: 'landscape', fit: 'cover',   pos: 'center 30%', bg: '#0a1a10', year: '2025', label: 'Outstanding Achievement in Entrepreneurship',   issuer: 'Agora Awards · PMA' },
  { img: '/awards/award-p1-3.png',  orient: 'landscape', fit: 'cover',   pos: 'center 40%', bg: '#1a0a2a', year: '2024', label: 'YMMA Entrepreneurial Marketing Award',          issuer: 'Young Market Masters Awards' },
  { img: '/awards/award-p1-5.jpeg', orient: 'landscape', fit: 'cover',   pos: 'center 35%', bg: '#0a1a30', year: '2023', label: "GoNegosyo Women's Month — Inspiring Filipina",  issuer: 'Go Negosyo' },
  { img: '/awards/award-p1-4.png',  orient: 'landscape', fit: 'cover',   pos: 'center 30%', bg: '#0a0a1a', year: '2021', label: 'Elite Business & Leadership Awards',            issuer: 'Elite Business Awards' },
]

function RecognitionsTeaser() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState(null)
  const [fading, setFading] = useState(false)
  const timerRef = useRef(null)

  const go = (i) => {
    const next = (i + REC_AWARDS.length) % REC_AWARDS.length
    if (next === cur) return
    setPrev(cur)
    setFading(true)
    setTimeout(() => {
      setCur(next)
      setPrev(null)
      setFading(false)
    }, 600)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => go(cur + 1), 3000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCur(p => {
        setPrev(p)
        setFading(true)
        setTimeout(() => { setPrev(null); setFading(false) }, 600)
        return (p + 1) % REC_AWARDS.length
      })
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [])

  const a = REC_AWARDS[cur]
  const p = prev !== null ? REC_AWARDS[prev] : null

  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(48px,7vw,72px) clamp(16px,4vw,48px)',
      backgroundImage: "url('/website_layer_1.png')",
      backgroundSize: 'cover', backgroundPosition: 'center',
      backgroundColor: '#F3F2EE',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundColor: '#b6c548', opacity: 0.25,
      }} />
      <style>{`
        @keyframes rt-fade-in {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes rt-fade-out {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.97); }
        }
        .rt-slide-in  { animation: rt-fade-in  0.6s ease forwards; }
        .rt-slide-out { animation: rt-fade-out 0.6s ease forwards; }
        .rt-progress {
          height: 2px;
          background: var(--c-olive);
          border-radius: 999px;
          animation: rt-bar 3s linear infinite;
        }
        @keyframes rt-bar { from { width: 0% } to { width: 100% } }
        .rt-dot-btn {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(58,107,53,0.25);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.25s;
        }
        .rt-dot-btn.active { background: var(--c-olive); width: 22px; border-radius: 3px; }
        .rt-nav-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(58,107,53,0.18);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--c-dark); font-size: 20px;
          transition: all 0.2s;
          min-height: unset; min-width: unset;
        }
        .rt-nav-btn:hover { background: var(--c-olive); color: #fff; border-color: var(--c-olive); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vw,36px)' }}>
        <span style={{
          display: 'inline-block', marginBottom: '12px',
          background: 'var(--c-olive)', color: '#fff',
          fontFamily: "'Poppins',sans-serif",
          fontSize: '11px', fontWeight: '600',
          letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '5px 18px', borderRadius: '999px',
        }}>Awards & Recognitions 🏆</span>
        <h2 style={{
          fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
          fontSize: 'clamp(1.6rem,4vw,2.8rem)',
          fontWeight: 'normal', color: 'var(--c-olive)',
          textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff',
          margin: '0 0 8px', lineHeight: 1.1,
        }}>A Legacy of Excellence</h2>
        <p style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: 'clamp(13px,1.3vw,15px)',
          color: 'var(--c-dark)', opacity: 0.7, margin: 0,
        }}>Chef Czarina Sevilla · 9 awards · 5 years of entrepreneurial excellence</p>
      </div>

      {/* Slideshow */}
      <div style={{
        maxWidth: '880px', margin: '0 auto',
        display: a.orient === 'portrait' ? 'grid' : 'flex',
        gridTemplateColumns: a.orient === 'portrait' ? '3fr 2fr' : undefined,
        flexDirection: a.orient === 'landscape' ? 'column' : undefined,
        gap: 'clamp(16px,2vw,24px)',
        alignItems: a.orient === 'portrait' ? 'center' : undefined,
      }}>

        {/* Left — photo */}
        <div style={{
          position: 'relative', width: '100%',
          aspectRatio: a.orient === 'portrait' ? '3/4' : '16/9', borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(58,107,53,0.22)',
          background: a.bg,
        }}>
          {/* Prev photo fading out */}
          {p && (
            <img key={`prev-${prev}`} src={p.img} alt={p.label}
              className="rt-slide-out"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: p.fit, objectPosition: p.pos,
              }}
            />
          )}
          {/* Current photo fading in */}
          <img key={`cur-${cur}`} src={a.img} alt={a.label}
            className="rt-slide-in"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: a.fit, objectPosition: a.pos,
            }}
            onError={e => e.target.style.display='none'}
          />
          {/* Counter badge */}
          <div style={{
            position: 'absolute', top: '14px', left: '14px',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(6px)',
            borderRadius: '999px', padding: '4px 12px',
            fontFamily: "'Poppins',sans-serif",
            fontSize: '11px', color: '#fff', fontWeight: '500',
          }}>{cur + 1} / {REC_AWARDS.length}</div>
        </div>

        {/* Right — text info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,2vw,22px)' }}>
          {/* Year + category */}
          <span style={{
            display: 'inline-block', width: 'fit-content',
            background: 'var(--c-olive)', color: '#fff',
            fontFamily: "'Poppins',sans-serif",
            fontSize: '11px', fontWeight: '600',
            letterSpacing: '0.07em', textTransform: 'uppercase',
            padding: '4px 14px', borderRadius: '999px',
          }}>{a.year}</span>

          {/* Award title */}
          <h3 style={{
            fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
            fontSize: 'clamp(1.2rem,2.8vw,2rem)',
            fontWeight: 'normal', color: 'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff',
            margin: 0, lineHeight: 1.2,
          }}>{a.label}</h3>

          {/* Issuer */}
          <p style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: 'clamp(12px,1.2vw,14px)',
            color: 'var(--c-brown)', margin: 0, lineHeight: 1.5,
          }}>{a.issuer}</p>

          {/* Progress bar */}
          <div style={{
            height: '2px', background: 'rgba(58,107,53,0.15)',
            borderRadius: '999px', overflow: 'hidden',
          }}>
            <div key={cur} className="rt-progress" />
          </div>



          {/* CTA */}
          <Link to="/about#recognitions" className="btn btn-olive"
            style={{ fontSize: '14px', padding: '11px 28px', width: 'fit-content' }}>
            View All Recognitions →
          </Link>
        </div>
      </div>

    </section>
  )
}

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])
  const { cur, visible, goTo } = useHeroSlide()

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
          font-family: 'BubbleboddyNeue-ExtraBold';
          src: url('/fonts/bubbleboddy-neue-extrabold.ttf') format('truetype');
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
          filter: drop-shadow(0px 20px 30px rgba(0,0,0,0.35)) drop-shadow(0px 6px 12px rgba(0,0,0,0.2));
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
            filter: drop-shadow(0px 30px 40px rgba(0,0,0,0.4)) drop-shadow(0px 8px 16px rgba(0,0,0,0.25));
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

          {/* LAYER 1 — BG slideshow with slow Ken Burns zoom, synced to product panel */}
          <BgLayer cur={cur} visible={visible} />

          {/* LAYERS 4 + dots — product panel, same index as BG */}
          <ProductLayers cur={cur} visible={visible} goTo={goTo} />

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


            {/* Headline */}
            <h1 className="avo-hero__headline" style={{
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
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
        <section style={{
            position:'relative', overflow:'hidden', padding:'64px 32px 80px',
            backgroundImage: "url('/website_layer_1.png')",
            backgroundSize: 'cover', backgroundPosition: 'center',
            backgroundColor: '#F3F2EE',
          }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            backgroundColor: '#b6c548', opacity: 0.25,
          }} />
          <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

            {/* Header row */}
            <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'12px', marginBottom:'32px' }}>
              <div>
                <h2 className="section-title" style={{ color:'#b6c548', margin:'0 0 6px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff' }}>
                  {"What's New"}
                </h2>
                <p className="section-sub" style={{ color:'rgba(138,95,60,.65)', margin:0 }}>
                  Latest news and updates from Avocadoria
                </p>
              </div>
              <Link to="/about#whats-new" style={{
                fontFamily:'Poppins, sans-serif', fontSize:'13px', fontWeight:'700',
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
                {NEWS_POSTS.slice(0, 4).map(post => (
                  <Link
                    key={post.id}
                    to="/about#whats-new"
                    style={{ textDecoration:'none' }}
                  >
                    <div style={{
                      background:'#fff',
                      border:'1.5px solid rgba(182,197,72,0.18)',
                      borderRadius:'20px',
                      display:'flex', flexDirection:'column',
                      height:'100%', boxSizing:'border-box',
                      overflow:'hidden',
                      boxShadow:'0 2px 12px rgba(58,107,53,0.07)',
                      transition:'box-shadow 0.25s, border-color 0.25s, transform 0.25s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 12px 36px rgba(58,107,53,0.15)'; e.currentTarget.style.borderColor='var(--c-olive)'; e.currentTarget.style.transform='translateY(-4px)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 12px rgba(58,107,53,0.07)'; e.currentTarget.style.borderColor='rgba(182,197,72,0.18)'; e.currentTarget.style.transform='none' }}
                    >
                      {/* Image — tall and prominent */}
                      <div style={{
                        width:'100%', height:'clamp(180px,22vw,240px)',
                        background:'#f4f9e8',
                        overflow:'hidden', flexShrink:0, position:'relative',
                      }}>
                        {post.image
                          ? <img src={post.image} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', transition:'transform 0.4s ease' }}
                              onMouseEnter={e => e.target.style.transform='scale(1.05)'}
                              onMouseLeave={e => e.target.style.transform='scale(1)'}
                            />
                          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'48px' }}>🥑</div>
                        }
                        {/* Tag badge overlay */}
                        {post.tag && (
                          <span style={{
                            position:'absolute', top:'10px', right:'10px',
                            background: post.featured ? 'var(--c-pink)' : 'var(--c-olive)',
                            color:'#fff',
                            fontFamily:"'Poppins',sans-serif",
                            fontSize:'10px', fontWeight:'600',
                            letterSpacing:'0.06em', textTransform:'uppercase',
                            padding:'3px 10px', borderRadius:'999px',
                          }}>{post.tag}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding:'16px 18px 20px', display:'flex', flexDirection:'column', gap:'8px', flex:1 }}>
                        {/* Category + date */}
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                          <span style={{
                            background: post.featured ? 'var(--c-olive)' : 'rgba(182,197,72,0.15)',
                            color: post.featured ? '#fff' : 'var(--c-dark)',
                            fontFamily:"'Poppins',sans-serif",
                            fontSize:'10px', fontWeight:'600',
                            letterSpacing:'0.06em', textTransform:'uppercase',
                            padding:'3px 10px', borderRadius:'999px',
                          }}>
                            {post.featured ? 'Featured' : post.category}
                          </span>
                          <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:'11px', color:'rgba(138,95,60,0.55)' }}>
                            {new Date(post.date).toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'})}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal',
                          fontSize:'clamp(14px,1.4vw,16px)', color:'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff',
                          margin:0, lineHeight:1.3,
                        }}>
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p style={{
                          fontFamily:"'Poppins',sans-serif", fontSize:'12px',
                          color:'var(--c-brown)', lineHeight:1.6, margin:0, flex:1,
                          display:'-webkit-box', WebkitLineClamp:2,
                          WebkitBoxOrient:'vertical', overflow:'hidden',
                        }}>
                          {post.excerpt}
                        </p>

                        <span style={{
                          fontFamily:"'Poppins',sans-serif", fontSize:'12px',
                          fontWeight:'600', color:'var(--c-olive)', marginTop:'4px',
                        }}>
                          See more →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div style={{ textAlign:'center', padding:'48px 0' }}>
                <span style={{ fontSize:'40px' }}>🥑</span>
                <p style={{ fontFamily:'Poppins,sans-serif', color:'rgba(138,95,60,0.5)', marginTop:'12px' }}>
                  No posts yet — check back soon!
                </p>
              </div>
            )}

          </div>
          </div>
        </section>

      {/* ════════════ RECOGNITIONS TEASER ════════════ */}
        <RecognitionsTeaser />
        <Wave fromColor="#d9e29e" toColor="#b6c548" height={48} />

      </div>
    </>
  )
}
