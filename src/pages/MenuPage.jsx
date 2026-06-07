import { useState, useEffect } from 'react'
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
      fontFamily:'Nunito,sans-serif',
      fontSize:'10px', fontWeight:'800',
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
        background:'#ffffff',
        borderRadius:'20px',
        border:`1.5px solid ${hov ? 'var(--c-olive)' : 'rgba(182,197,72,0.18)'}`,
        boxShadow: hov
          ? '0 12px 32px rgba(58,107,53,0.13)'
          : '0 2px 10px rgba(58,107,53,0.05)',
        overflow:'hidden',
        transition:'all 0.25s ease',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        display:'flex', flexDirection:'column',
      }}
    >
      {/* Image */}
      <div style={{
        width:'100%', aspectRatio:'1/1',
        background:'linear-gradient(135deg,rgba(182,197,72,0.10),rgba(182,197,72,0.04))',
        position:'relative', overflow:'hidden',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {item.image
          ? <img src={item.image} alt={item.name} style={{
              width:'100%', height:'100%', objectFit:'cover',
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

        {/* NEW badge */}
        {item.new && (
          <span style={{
            position:'absolute', top:'10px', right:'10px',
            background:'var(--c-pink)', color:'#fff',
            fontFamily:'Nunito,sans-serif', fontSize:'10px',
            fontWeight:'800', letterSpacing:'0.06em',
            textTransform:'uppercase', padding:'4px 12px',
            borderRadius:'999px', lineHeight:1.4,
          }}>NEW</span>
        )}
      </div>

      {/* Content */}
      <div style={{
        padding:'16px 18px 20px',
        flex:1, display:'flex', flexDirection:'column', gap:'8px',
      }}>
        {item.tags?.length > 0 && (
          <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
            {item.tags.map(t => <TagBadge key={t} tag={t}/>)}
          </div>
        )}
        <h3 style={{
          fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
          fontSize:'var(--fs-md)', fontWeight:'normal',
          color:'var(--c-dark)', margin:0, lineHeight:1.2,
        }}>{item.name}</h3>
        <p style={{
          fontFamily:'Nunito,sans-serif',
          fontSize:'var(--fs-sm)', lineHeight:1.65,
          color:'var(--c-brown)', opacity:0.85,
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
        cursor:'pointer', position:'relative', aspectRatio:'4/3',
        boxShadow: hov
          ? '0 16px 48px rgba(58,107,53,0.22)'
          : '0 4px 20px rgba(58,107,53,0.10)',
        transition:'box-shadow 0.25s ease',
      }}
    >
      {/* BG image or gradient */}
      {cat.cover
        ? <img src={cat.cover} alt={cat.name} style={{
            position:'absolute', inset:0,
            width:'100%', height:'100%', objectFit:'cover',
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

      {/* Overlay */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(20,50,10,0.72) 0%, transparent 55%)',
        opacity: hov ? 1 : 0.82, transition:'opacity 0.25s',
      }}/>

      {/* Label bottom-left — Mesa style */}
      <div style={{
        position:'absolute', bottom:'16px', left:'16px', right:'16px',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:'10px',
      }}>
        <div>
          <p style={{
            fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
            fontSize:'clamp(15px,2vw,20px)', fontWeight:'normal',
            color:'#fff', margin:'0 0 2px', lineHeight:1.15,
            textShadow:'0 2px 8px rgba(0,0,0,0.3)',
          }}>{cat.name}</p>
          <p style={{
            fontFamily:'Nunito,sans-serif', fontSize:'11px',
            color:'rgba(255,255,255,0.78)', margin:0,
          }}>{cat.items.length} item{cat.items.length !== 1 ? 's' : ''}</p>
        </div>
        {/* Arrow circle */}
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
    <div className="page-enter">

      {/* Hero banner */}
      <div style={{
        position:'relative', width:'100%',
        height:'clamp(180px,28vw,340px)', overflow:'hidden',
        background: FALLBACKS[0],
      }}>
        {cat.cover
          ? <img src={cat.cover} alt={cat.name} style={{
              width:'100%', height:'100%', objectFit:'cover',
            }} onError={e => e.target.style.display='none'}/>
          : <div style={{
              width:'100%', height:'100%',
              background: FALLBACKS[0],
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'80px',
            }}>{cat.emoji}</div>
        }
        {/* Gradient overlay */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to right, rgba(20,50,10,0.68) 0%, rgba(20,50,10,0.18) 55%, transparent 80%)',
        }}/>
        {/* Text */}
        <div style={{
          position:'absolute',
          bottom:'clamp(20px,4vw,36px)',
          left:'clamp(20px,5vw,60px)',
        }}>
          <h1 style={{
            fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
            fontSize:'var(--fs-4xl)', fontWeight:'normal',
            color:'#fff', margin:'0 0 6px', lineHeight:1.1,
            textShadow:'0 2px 14px rgba(0,0,0,0.35)',
          }}>
            {cat.emoji} {cat.name}
          </h1>
          <p style={{
            fontFamily:'Nunito,sans-serif',
            fontSize:'var(--fs-sm)',
            color:'rgba(255,255,255,0.85)', margin:0,
          }}>{cat.tagline}</p>
        </div>
      </div>

      {/* Breadcrumb + back */}
      <div style={{
        maxWidth:'1200px', margin:'0 auto',
        padding:'18px clamp(20px,4vw,48px) 0',
        display:'flex', alignItems:'center', gap:'10px',
      }}>
        <button
          onClick={onBack}
          className="btn btn-outline"
          style={{ fontSize:'13px', minHeight:'36px', padding:'6px 16px' }}
        >
          ← Back to Menu
        </button>
        <span style={{
          fontFamily:'Nunito,sans-serif', fontSize:'13px',
          color:'var(--c-brown)', opacity:0.5,
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
              <div style={{ fontSize:'52px', marginBottom:'14px' }}>{cat.emoji}</div>
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
          font-family: 'BubbleboddyNeue';
          src: url('/fonts/bubbleboddyneueinline-extrabold.ttf') format('truetype');
          font-weight: normal; font-style: normal; font-display: swap;
        }
      `}</style>

      <div className="page-enter">

        {/* ── Header — matches About / Home hero style ── */}
        <div style={{
          background:'linear-gradient(160deg, var(--c-cream) 0%, var(--c-pale) 100%)',
          padding:'clamp(90px,10vw,110px) 32px clamp(28px,4vw,44px)',
          textAlign:'center',
        }}>
          {/* Pink badge */}
          <span style={{
            display:'inline-block', marginBottom:'14px',
            background:'var(--c-pink)', color:'#fff',
            fontFamily:'Nunito,sans-serif', fontSize:'11px',
            fontWeight:'800', letterSpacing:'0.08em',
            textTransform:'uppercase',
            padding:'5px 18px', borderRadius:'999px',
          }}>
            Made Fresh Daily 🥑
          </span>

          {/* Headline — brand font + olive + white stroke */}
          <h1 className="hero-headline" style={{
            color:'var(--c-olive)',
            background:'none',
            WebkitTextFillColor:'var(--c-olive)',
            animation:'none',
            textShadow: STROKE,
            marginBottom:'10px',
          }}>
            Our Menu
          </h1>

          <p className="section-sub" style={{
            color:'var(--c-dark)', opacity:0.75,
            maxWidth:'400px', margin:'0 auto',
          }}>
            Real avocado. Real happiness. Made fresh daily.
          </p>
        </div>

        {/* ── Category grid ── */}
        <div style={{
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
                  width:'100%', height:'100%', objectFit:'cover',
                  transition:'transform 0.5s ease',
                }} onError={e => e.target.style.display='none'}/>
              : <div style={{
                  width:'100%', height:'100%',
                  background: FALLBACKS[0],
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'100px',
                }}>{featured.emoji}</div>
            }
            {/* Gradient */}
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(to right, rgba(20, 50, 10, 0) 0%, rgba(20,50,10,0.15) 55%, transparent 80%)',
            }}/>
            {/* Label pill */}
            <div style={{ position:'absolute', bottom:'28px', left:'28px' }}>
              <div style={{
                background:'rgba(255,255,255,0.93)',
                backdropFilter:'blur(8px)',
                borderRadius:'999px',
                padding:'12px 20px',
                display:'inline-flex', alignItems:'center', gap:'14px',
                boxShadow:'1px 0px rgba(0,0,0,0.12)',
              }}>
                <div>
                  <p style={{
                    fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
                    fontSize:'clamp(1.2rem,2.8vw,2rem)',
                    fontWeight:'normal', color:'var(--c-olive)',
                    margin:'0 0 2px', lineHeight:1.1,
                  }}>{featured.name}</p>
                  <p style={{
                    fontFamily:'Nunito,sans-serif', fontSize:'12px',
                    color:'var(--c-brown)', opacity:0.75, margin:0,
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

        </div>
      </div>
    </>
  )
}
