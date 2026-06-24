import { useState, useEffect, useRef } from 'react'
import SEO from '@/components/ui/SEO'
import { CATEGORIES, TAG_COLORS } from '@/data/menu'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const FALLBACKS = [
  'linear-gradient(135deg,#b6c548 0%,#8aaa1a 100%)',
  'linear-gradient(135deg,#3a6b35 0%,#5a9b55 100%)',
  'linear-gradient(135deg,#8aaa1a 0%,#b6c548 100%)',
  'linear-gradient(135deg,#5a8a1a 0%,#3a6b35 100%)',
  'linear-gradient(135deg,#b6c548 0%,#d4e882 100%)',
  'linear-gradient(135deg,#3a6b35 0%,#b6c548 100%)',
]

const STROKE = [
  '-3px -3px 0 #fff',' 3px -3px 0 #fff',
  '-3px  3px 0 #fff',' 3px  3px 0 #fff',
  ' 0   -3px 0 #fff',' 0    3px 0 #fff',
].join(',')

// ─── Tag badge ────────────────────────────────────────────────────────────────
function TagBadge({ tag }) {
  const s = TAG_COLORS[tag] || TAG_COLORS['Default']
  return (
    <span style={{
      display:'inline-block',
      background:s.bg, color:s.text,
      fontFamily:'Poppins,sans-serif',
      fontSize:'12px', fontWeight:'800',
      letterSpacing:'0.05em', textTransform:'uppercase',
      padding:'3px 10px', borderRadius:'999px',
      whiteSpace:'nowrap', lineHeight:1.4,
    }}>{tag}</span>
  )
}

// ─── Product card ─────────────────────────────────────────────────────────────
function ProductCard({ item }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'transparent',
        backdropFilter: 'none',
        borderRadius:'20px',
        border:`1.5px solid ${hov ? 'var(--c-olive)' : 'rgba(255,255,255,0.5)'}`,
        boxShadow: hov
          ? '0 12px 32px rgba(58,107,53,0.18)'
          : '0 2px 12px rgba(58,107,53,0.08)',
        overflow:'hidden',
        transition:'all 0.25s ease',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        display:'flex', flexDirection:'column',
      }}
    >
      {/* Image */}
      <div style={{
        width:'100%', aspectRatio:'1/1',
        background:'transparent',
        position:'relative', overflow:'hidden',
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'8px',
      }}>
        {item.image
          ? <img src={item.image} alt={item.name} style={{
              width:'100%', height:'100%', objectFit:'contain',
              transition:'transform 0.4s ease',
              transform: hov ? 'scale(1.07)' : 'scale(1)',
            }} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}/>
          : null
        }
        <div style={{
          display: item.image ? 'none' : 'flex',
          position:'absolute', inset:0,
          alignItems:'center', justifyContent:'center',
          fontSize:'56px', background:'rgba(182,197,72,0.06)',
        }}>🥑</div>


      </div>

      {/* Content */}
      <div style={{
        padding:'16px 18px 20px',
        flex:1, display:'flex', flexDirection:'column', gap:'8px',
        background:'transparent',
      }}>

        <h3 style={{
          fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
          fontSize:'clamp(17px,1.8vw,20px)', fontWeight:'normal',
          color:'var(--c-olive)',
          textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
          margin:0, lineHeight:1.2,
        }}>{item.name}</h3>
        <p style={{
          fontFamily:'Poppins,sans-serif',
          fontSize:'15px', lineHeight:1.65,
          color:'#5a3a1a', opacity:1,
          margin:0, flex:1,
        }}>{item.desc}</p>
      </div>
    </div>
  )
}

// ─── Category cover card ──────────────────────────────────────────────────────
function CategoryCard({ cat, index, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius:'20px', overflow:'hidden',
        cursor:'pointer', position:'relative', aspectRatio:'16/9',
        background: '#e8edcc',
        boxShadow: hov
          ? '0 16px 48px rgba(58,107,53,0.22)'
          : '0 4px 20px rgba(58,107,53,0.10)',
        transition:'box-shadow 0.25s ease',
      }}
    >
      {/* Cover image — objectFit cover, position tuned per category */}
      {cat.cover
        ? <img src={cat.cover} alt={cat.name} style={{
            position:'absolute', inset:0,
            width:'100%', height:'100%',
            objectFit:'cover',
            objectPosition: cat.coverPos || 'center center',
            transition:'transform 0.5s ease',
            transform: hov ? 'scale(1.06)' : 'scale(1)',
          }} onError={e => e.target.style.display='none'}/>
        : <div style={{
            position:'absolute', inset:0,
            background: FALLBACKS[index % FALLBACKS.length],
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'64px',
          }}>{cat.emoji}</div>
      }

      {/* Subtle bottom scrim — just enough for label legibility */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 32%)',
      }}/>

      {/* Label */}
      <div style={{
        position:'absolute', bottom:'16px', left:'16px', right:'16px',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:'10px',
      }}>
        <div>
          <p style={{
            fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
            fontSize:'clamp(17px,2vw,22px)', fontWeight:'normal',
            color:'var(--c-olive)',
            textShadow:'-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
            margin:'0 0 3px', lineHeight:1.15,
          }}>{cat.name}</p>
          <p style={{
            fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:'600',
            color:'#fff',
            textShadow:'0 1px 4px rgba(0,0,0,0.5)',
            margin:0,
          }}>{cat.items.length} item{cat.items.length !== 1 ? 's' : ''}</p>
        </div>
        <div style={{
          width:'36px', height:'36px', borderRadius:'50%', flexShrink:0,
          background: hov ? 'var(--c-olive)' : 'rgba(255,255,255,0.22)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontSize:'17px',
          transition:'background 0.2s',
          minHeight:'unset', minWidth:'unset',
        }}>→</div>
      </div>
    </div>
  )
}

// ─── Category product page ────────────────────────────────────────────────────
function CategoryView({ cat, onBack }) {
  useEffect(() => { window.scrollTo({ top:0, behavior:'smooth' }) }, [cat.id])

  return (
    <div className="page-enter" style={{ position:'relative', minHeight:'100vh', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
              <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />

      {/* Hero banner — paper texture matching rest of site */}
      <div style={{
        position:'relative', width:'100%',
        padding:'clamp(110px,12vw,140px) clamp(20px,5vw,60px) clamp(40px,4vw,56px)',
        backgroundImage: "url('/website_layer_1.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundColor: '#F3F2EE',
      }}>
        {/* Same green overlay as all sections */}
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />

        {/* Text */}
        <div style={{
          position:'absolute', zIndex:2,
          bottom:'clamp(20px,4vw,36px)',
          left:'clamp(20px,5vw,60px)',
        }}>
          <h1 style={{
            fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
            fontSize:'clamp(1.6rem,4vw,2.8rem)', fontWeight:'normal',
            color:'var(--c-olive)', margin:'0 0 6px', lineHeight:1.1,
            textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
          }}>
            {cat.name}
          </h1>
          <p style={{
            fontFamily:'Poppins,sans-serif',
            fontSize:'15px',
            color:'rgba(58,107,53,0.8)', margin:0,
          }}>{cat.tagline}</p>
        </div>
      </div>

      {/* Breadcrumb + back */}
      <div style={{
        position:'relative', zIndex:2,
        background:'rgba(255,255,255,0.55)', backdropFilter:'blur(6px)',
        borderBottom:'1.5px solid rgba(182,197,72,0.25)',
        padding:'12px clamp(20px,4vw,48px)',
        display:'flex', alignItems:'center', gap:'10px',
      }}>
        <button
          onClick={onBack}
          className="btn btn-outline"
          style={{ fontSize:'14px', minHeight:'36px', padding:'6px 16px' }}
        >
          ← Back to Menu
        </button>
        <span style={{
          fontFamily:'Poppins,sans-serif', fontSize:'14px',
          color:'#3a6b35', opacity:1, fontWeight:'600',
        }}>
          / {cat.name}
        </span>
      </div>

      {/* Products */}
      <div style={{
        maxWidth:'1200px', margin:'0 auto',
        padding:'28px clamp(20px,4vw,48px) 80px',
      }}>
        {cat.items.length > 0
          ? (
            <div style={{
              display:'grid',
              gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',
              gap:'20px',
            }}>
              {cat.items.map(item => <ProductCard key={item.id} item={item}/>)}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'64px 0' }}>
              <p className="section-sub" style={{ color:'var(--c-brown)' }}>
                Products coming soon — check back!
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MenuPage() {
  const [activeCat, setActiveCat] = useState(null)

  const featured = CATEGORIES.find(c => c.featured) || CATEGORIES[0]
  const rest      = CATEGORIES.filter(c => c.id !== featured.id)

  if (activeCat) return (
    <>
      <SEO
        title={`${activeCat.name} — Menu`}
        description={activeCat.tagline}
        path="/menu"
      />
      <CategoryView cat={activeCat} onBack={() => setActiveCat(null)}/>
    </>
  )

  return (
    <>
      <SEO
        title="Menu"
        description="Avocado Lover, Biscoff Lover, Naked Light Ice Cream, Avocado Shakes and more. Explore the full Avocadoria menu."
        path="/menu"
      />

      <style>{`
        @font-face {
          font-family: 'BubbleboddyNeue-ExtraBold';
          src: url('/fonts/bubbleboddy-neue-extrabold.ttf') format('truetype'),
               url('/fonts/bubbleboddy-neue-extrabold.otf') format('opentype');
          font-weight: normal; font-style: normal; font-display: swap;
        }
      `}</style>

      <div className="page-enter" style={{ position:'relative', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />

        {/* ── Hero — full video background ── */}
        <div style={{
          position:'relative', overflow:'hidden',
          height:'clamp(420px,70vh,700px)',
        }}>
          {/* Poster fallback — behind video */}
          <img
            src="/videos/naked-ice-cream-poster.jpg"
            alt="" aria-hidden="true"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}
          />

          {/* Video — full bleed, no effects */}
          <video
            autoPlay muted loop playsInline
            ref={el => { if (el) el.play().catch(() => {}) }}
            style={{
              position:'absolute', inset:0,
              width:'100%', height:'100%',
              objectFit:'cover', display:'block',
              zIndex:1,
            }}
          >
            <source src="/videos/naked-ice-cream.webm" type="video/webm"/>
            <source src="/videos/naked-ice-cream.mp4"  type="video/mp4"/>
          </video>
        </div>
        {/* Wave pulled up to overlap video */}
        <div style={{ marginTop:'-60px', position:'relative', zIndex:5, lineHeight:0 }}>
          <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display:'block', width:'100%', height:'clamp(60px,8vw,100px)' }}>
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#b6c548"/>
                <stop offset="60%"  stopColor="#c8d860"/>
                <stop offset="100%" stopColor="#d9e29e"/>
              </linearGradient>
              <linearGradient id="waveShadow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#2a5a20"/>
                <stop offset="100%" stopColor="#3a6b35"/>
              </linearGradient>
            </defs>
            {/* Fill entire bottom so no gap shows */}
            <rect x="0" y="50" width="1440" height="50" fill="url(#waveGrad)"/>
            {/* Shadow layer */}
            <path d="M0,100 L0,0 C360,100 1080,0 1440,40 L1440,100 Z"
              fill="url(#waveShadow)" opacity="0.18"/>
            {/* Mid olive layer */}
            <path d="M0,100 L0,18 C360,100 1080,18 1440,58 L1440,100 Z"
              fill="#3a6b35" opacity="0.28"/>
            {/* Top wave — lime gradient */}
            <path d="M0,100 L0,36 C360,100 1080,36 1440,72 L1440,100 Z"
              fill="url(#waveGrad)"/>
            {/* White shimmer edge */}
            <path d="M0,36 C360,100 1080,36 1440,72"
              fill="none" stroke="#fff" strokeWidth="2" opacity="0.4"/>
          </svg>
        </div>

        {/* ── Section header — standard brand style ── */}
        <div style={{
          position:'relative', overflow:'hidden',
          backgroundImage:"url('/website_layer_1.png')", backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F3F2EE',
          padding:'clamp(32px,5vw,56px) 32px clamp(16px,3vw,32px)',
          textAlign:'center',
        }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }}/>
          <div style={{ position:'relative', zIndex:1 }}>
            <h1 style={{
              fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontWeight:'normal',
              fontSize:'clamp(2.4rem,5vw,4.2rem)',
              color:'var(--c-olive)',
              textShadow:'-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
              marginBottom:'10px', lineHeight:1.1,
            }}>
              Our Menu
            </h1>
            <p className="section-sub" style={{ color:'var(--c-dark)', opacity:0.75, maxWidth:'400px', margin:'0 auto' }}>
              Real avocado. Real happiness. Made fresh daily.
            </p>
          </div>
        </div>

        {/* ── Category grid ── */}
        <div style={{
          position:'relative', overflow:'hidden',
          backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE',
        }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
        <div style={{
          position:'relative', zIndex:1,
          maxWidth:'1280px', margin:'0 auto',
          padding:'clamp(24px,4vw,48px) clamp(20px,4vw,48px) 80px',
        }}>

          {/* Featured — full width like Mesa */}
          <div
            onClick={() => setActiveCat(featured)}
            style={{
              position:'relative', width:'100%',
              height:'clamp(220px,36vw,480px)',
              borderRadius:'24px', overflow:'hidden',
              cursor:'pointer', marginBottom:'20px',
              boxShadow:'0 4px 24px rgba(58,107,53,0.12)',
            }}
            onMouseEnter={e => {
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1.04)'
            }}
            onMouseLeave={e => {
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1)'
            }}
          >
            {featured.cover
              ? <img src={featured.cover} alt={featured.name} style={{
                  width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 18%',
                  transition:'transform 0.5s ease',
                }} onError={e => {
                  e.target.style.display='none'
                  e.target.nextSibling && (e.target.nextSibling.style.display='flex')
                }}/>
              : null
            }
            <div style={{
              position:'absolute', inset:0,
              background: FALLBACKS[0],
              display: featured.cover ? 'none' : 'flex',
              alignItems:'center', justifyContent:'center',
              fontSize:'100px',
            }}>{featured.emoji}</div>
            {/* Gradient */}
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(to right, rgba(20, 50, 10, 0) 0%, rgba(20,50,10,0.15) 55%, transparent 80%)',
            }}/>
            {/* Label pill */}
            <div style={{ position:'absolute', bottom:'28px', left:'28px' }}>
              <div style={{
                background:'rgba(255,255,255,0.06)',
                backdropFilter:'blur(10px)',
                border:'1px solid rgba(255,255,255,0.18)',
                borderRadius:'999px',
                padding:'12px 20px',
                display:'inline-flex', alignItems:'center', gap:'14px',
              }}>
                <div>
                  <p style={{
                    fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                    fontSize:'clamp(1.4rem,2.8vw,2.2rem)',
                    fontWeight:'normal', color:'var(--c-olive)',
                    textShadow:'-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
                    margin:'0 0 2px', lineHeight:1.1,
                  }}>{featured.name}</p>
                  <p style={{
                    fontFamily:'Poppins,sans-serif', fontSize:'15px',
                    color:'rgba(255,255,255,0.9)', margin:0,
                    textShadow:'0 1px 4px rgba(0,0,0,0.4)',
                  }}>{featured.tagline}</p>
                </div>
                <div style={{
                  width:'40px', height:'40px', borderRadius:'50%',
                  background:'var(--c-olive)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontSize:'20px', flexShrink:0,
                  minHeight:'unset', minWidth:'unset',
                }}>→</div>
              </div>
            </div>
          </div>

          {/* 3-col grid */}
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
            gap:'20px',
          }}>
            {rest.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                index={i + 1}
                onClick={() => setActiveCat(cat)}
              />
            ))}
          </div>

        </div>{/* inner maxWidth */}
        </div>{/* category texture wrapper */}
      </div>{/* page-enter */}
    </>
  )
}
