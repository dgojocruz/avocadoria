import { useEffect, useState, useRef } from 'react'
import SEO from '@/components/ui/SEO'
import { Link } from 'react-router-dom'

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
  objectPosition: 'center center',
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
  right:       '0%',
  bottom:      '0%',
  height:      '90vh',
  mobileWidth: '75vw',
  mobileMaxW:  '280px',
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

  return (
    <>
      {/* LAYER 2 — Ambient ghost */}
      <img src={product.src} alt="" aria-hidden="true" style={{
        position:'absolute', right:AMBIENT.right, bottom:0,
        height:`${AMBIENT.heightVh}vh`, width:'auto', maxWidth:'none',
        zIndex:2, objectFit:'contain', pointerEvents:'none', userSelect:'none',
        filter:`blur(${AMBIENT.blur}) saturate(${AMBIENT.saturate}) brightness(${AMBIENT.brightness})`,
        opacity: visible ? AMBIENT.opacity : 0,
        transition:`opacity ${TIMING.transition}ms ease`,
      }}/>

      {/* LAYER 4 — Sharp hero product */}
      {/* <ProductLayers /> temporarily hidden — uncomment to restore */}

      {/* Dots */}
      {PRODUCTS.length > 1 && (
        <div style={{
          position:'absolute', right:'18px',
          bottom:`calc(${SLOPE.height} + 14px)`,
          zIndex:8, display:'flex', flexDirection:'column',
          gap:'10px', alignItems:'center',
        }}>
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
          src: url('/fonts/bubbleboddy-neue-trial-extrabold.ttf') format('truetype');
          font-weight: 800; font-style: normal; font-display: swap;
        }
        @keyframes hero-breathe {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-10px) scale(1.018); }
        }
        .avo-hero {
          position: relative; width: 100%; min-height: 100vh;
          overflow: hidden; background: #d4eca0;
        }
        .avo-hero__text {
          position: absolute;
          left:   ${TEXT.left};
          bottom: ${TEXT.bottom};
          z-index: 7; max-width: 560px;
        }
        @media (max-width: 767px) {
          .avo-hero { min-height: 100svh; }
          .avo-hero__text {
            left: 20px; right: 20px; bottom: 22vh; max-width: 100%;
          }
        }
      `}</style>

      <div className="page-enter">

        {/* ════════════ HERO ════════════ */}
        <section className="avo-hero">

          {/* LAYER 1 — Static background */}
          <img src={BG.src} alt="" aria-hidden="true" style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            objectFit:'cover', objectPosition:BG.objectPosition,
            zIndex:1, pointerEvents:'none',
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

          {/* LAYER 5 — Slope image */}
          <img src={SLOPE.src} alt="" aria-hidden="true" style={{
            position:'absolute', bottom:0, left:0, right:0,
            width:'100%', height:SLOPE.height,
            objectFit:'cover', objectPosition:'bottom',
            zIndex:6, pointerEvents:'none',
          }}/>

          {/* LAYER 6 — Static text + buttons — NEVER changes */}
          <div className="avo-hero__text" style={{
            opacity:   loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(22px)',
            transition:'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}>

            {/* Brand quote — slope color + white stroke */}
            <p style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
              fontSize: 'clamp(12px, 1.2vw, 15px)',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: '#b5c448',
              margin: '0 0 8px 2px',
              textShadow: STROKE_WHITE_SM,
            }}>
              &ldquo;Happiness in Avocado&rdquo;
            </p>

            {/* Headline — slope color #b5c448 + white stroke */}
            <h1 style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.08,
              margin: '0 0 28px',
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

            <div style={{ display:'flex', flexDirection:'row', gap:'14px', flexWrap:'wrap' }}>
              <Link to="/menu"       className="btn btn-white">Our Menu</Link>
              <Link to="/our-stores" className="btn btn-olive">Our Stores</Link>
            </div>
          </div>

        </section>

        <Wave fromColor={C.hero} toColor="#e8f0c8" height={60} />

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

        <Wave fromColor="#b6c548" toColor={C.franchise} height={64} flip />

        {/* ════════════ FRANCHISE ════════════ */}
        <section style={{ background:C.franchise, padding:'72px 32px', textAlign:'center' }}>
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

        <Wave fromColor={C.franchise} toColor={C.news} height={72} />

        {/* ════════════ NEWS ════════════ */}
        <section style={{ background:C.news, padding:'64px 32px 80px' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <h2 className="section-title" style={{ color:'#b6c548' }}>News and Updates</h2>
            <p className="section-sub" style={{ color:'rgba(138,95,60,.65)' }}>
              Like and Follow for more updates!
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'20px' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  background:'rgba(182,197,72,.08)', border:'1.5px solid rgba(182,197,72,.2)',
                  borderRadius:'16px', padding:'32px', display:'flex', flexDirection:'column', gap:'10px',
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
