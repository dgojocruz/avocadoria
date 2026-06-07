import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '@/components/ui/SEO'

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE DATA — Client fills these in
// ═══════════════════════════════════════════════════════════════════════════════

const OUR_STORY = {
  headline:   'Happiness in Avocado',
  subheading: 'How a simple love for avocado became the Philippines\' No. 1 avocado dessert brand.',
  founded:    '2017',
  stats: [
    { num: '7+',    label: 'Years of happiness'  },
    { num: '100K+', label: 'Cups served'          },
    { num: '50+',   label: 'Branches nationwide'  },
  ],
  sections: [
    {
      id:      'beginning',
      title:   'How it all began',
      content: 'Avocadoria started in 2017 with one simple belief — that avocado deserved its own spotlight. What started as a small stall in a local bazaar quickly grew into a movement, as Filipinos fell in love with rich, creamy, guilt-free avocado desserts made from real fruit.',
      image:   null,
    },
    {
      id:      'mission',
      title:   'Our mission',
      content: 'We are on a mission to bring happiness through avocado — one cup at a time. Every product we serve is crafted with real avocado, no artificial flavors, and a whole lot of love. We believe indulgence and health can coexist.',
      image:   null,
    },
    {
      id:      'farmers',
      title:   'Supporting local farmers',
      content: 'We proudly partner with local avocado farmers across the Philippines. Every cup you enjoy directly supports Filipino farming communities and helps grow a sustainable, local supply chain.',
      image:   null,
    },
  ],
}

// Add news posts here — newest first
const NEWS_POSTS = [
  {
    id:       'news-001',
    title:    'Avocadoria Opens in SM Mall of Asia!',
    date:     '2025-05-20',
    category: 'Store Opening',
    excerpt:  'We are thrilled to announce our newest branch at SM Mall of Asia!',
    content:  'We are thrilled to announce our newest branch at SM Mall of Asia — bringing happiness in avocado to the Bay Area! Open daily 10AM–9PM.',
    featured: true,
  },
  {
    id:       'news-002',
    title:    'New Product Alert: Biscoff Lover is here!',
    date:     '2025-04-10',
    category: 'New Product',
    excerpt:  'Meet our newest creation — the Biscoff Lover.',
    content:  'Meet our newest creation — the Biscoff Lover. Layers of creamy avocado, Biscoff drizzle, and our signature crumble base.',
    featured: false,
  },
]

// Add recognitions here — newest first
const RECOGNITIONS = [
  {
    id:       'award-001',
    title:    'Best Dessert Brand — Food & Beverage PH Awards 2024',
    date:     '2024-11-15',
    category: 'Award',
    issuer:   'Food & Beverage Philippines',
    excerpt:  'Recognized as the Best Dessert Brand at the 2024 F&B PH Awards.',
    icon:     '🏆',
    featured: true,
  },
  {
    id:       'award-002',
    title:    'Top 10 Filipino Food Brands to Watch — 2024',
    date:     '2024-08-01',
    category: 'Feature',
    issuer:   'BusinessWorld Philippines',
    excerpt:  'Named one of the Top 10 Filipino Food Brands to Watch in 2024.',
    icon:     '📰',
    featured: false,
  },
]

// Add Avo Cares posts here — newest first
const AVO_CARES = [
  {
    id:       'cares-001',
    title:    'Planting 1,000 Avocado Trees with Local Farmers',
    date:     '2025-03-15',
    category: 'Environment',
    excerpt:  'Avocadoria partnered with local farmers to plant 1,000 avocado trees across Benguet.',
    icon:     '🌱',
    featured: true,
  },
  {
    id:       'cares-002',
    title:    'Feeding Program — Avocadoria Gives Back',
    date:     '2025-01-20',
    category: 'Community',
    excerpt:  'Avocadoria organized a feeding program for 200 children in Quezon City.',
    icon:     '🤝',
    featured: false,
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' })
}

function SectionHeading({ label, title, sub }) {
  return (
    <div style={{ marginBottom:'40px' }}>
      {label && (
        <span style={{
          display:'inline-block', marginBottom:'10px',
          background:'rgba(182,197,72,0.15)', color:'#3a6b35',
          fontFamily:'Nunito,sans-serif', fontSize:'11px', fontWeight:'800',
          letterSpacing:'0.08em', textTransform:'uppercase',
          padding:'4px 14px', borderRadius:'999px',
        }}>{label}</span>
      )}
      <h2 style={{
        fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
        fontSize:'clamp(1.8rem,3.5vw,2.8rem)',
        fontWeight:'normal', color:'#3a6b35', margin:'0 0 10px', lineHeight:1.15,
      }}>{title}</h2>
      {sub && <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'15px', color:'rgba(138,95,60,0.7)', margin:0, lineHeight:1.65 }}>{sub}</p>}
      <div style={{ width:'48px', height:'4px', borderRadius:'2px', background:'#b6c548', marginTop:'14px' }}/>
    </div>
  )
}

function PostCard({ post, onClick }) {
  return (
    <div onClick={onClick} style={{
      background:'rgba(255,255,255,0.85)',
      border:'1.5px solid rgba(182,197,72,0.2)',
      borderRadius:'16px', padding:'24px',
      cursor: onClick ? 'pointer' : 'default',
      transition:'box-shadow 0.2s, border-color 0.2s',
    }}
      onMouseEnter={e => { if(onClick){ e.currentTarget.style.boxShadow='0 6px 24px rgba(58,107,53,0.10)'; e.currentTarget.style.borderColor='rgba(182,197,72,0.5)' }}}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(182,197,72,0.2)' }}
    >
      {post.icon && <div style={{ fontSize:'32px', marginBottom:'10px' }}>{post.icon}</div>}
      <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap', marginBottom:'8px' }}>
        <span style={{
          display:'inline-block', background: post.featured ? '#b6c548' : 'rgba(182,197,72,0.15)',
          color: post.featured ? '#fff' : '#3a6b35',
          fontFamily:'Nunito,sans-serif', fontSize:'10px', fontWeight:'800',
          letterSpacing:'0.06em', textTransform:'uppercase',
          padding:'3px 10px', borderRadius:'999px',
        }}>{post.featured ? 'Featured' : post.category}</span>
        {post.issuer && (
          <span style={{ fontFamily:'Nunito,sans-serif', fontSize:'11px', color:'rgba(138,95,60,0.55)' }}>
            by {post.issuer}
          </span>
        )}
      </div>
      <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'11px', color:'rgba(138,95,60,0.5)', margin:'0 0 8px' }}>
        {formatDate(post.date)}
      </p>
      <h3 style={{
        fontFamily:'Nunito,sans-serif', fontSize:'clamp(14px,1.4vw,17px)',
        fontWeight:'800', color:'#3a6b35', margin:'0 0 8px', lineHeight:1.3,
      }}>{post.title}</h3>
      <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'13px', color:'rgba(138,95,60,0.8)', lineHeight:1.6, margin:0 }}>
        {post.excerpt}
      </p>
    </div>
  )
}

// Section divider wave
function Divider({ flip = false }) {
  const path = flip
    ? 'M0,40 C360,0 1080,40 1440,16 L1440,0 L0,0 Z'
    : 'M0,0 C360,40 1080,0 1440,24 L1440,40 L0,40 Z'
  return (
    <div style={{ lineHeight:0, background:'transparent' }}>
      <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" style={{ display:'block', width:'100%', height:'40px' }}>
        <path d={path} fill="rgba(182,197,72,0.12)"/>
      </svg>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const location = useLocation()

  // Scroll to section when navigating via dropdown hash links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [location.hash])

  return (
    <>
      <SEO
        title="About"
        description="Seven years of avocado happiness — our story, news, recognitions and community initiatives."
        path="/about"
      />

      <style>{`
        @font-face {
          font-family: 'BubbleboddyNeue';
          src: url('/fonts/bubbleboddyneueinline-extrabold.ttf') format('truetype');
          font-weight: normal; font-style: normal; font-display: swap;
        }
        .about-section {
          padding: clamp(52px,8vw,88px) clamp(20px,5vw,80px);
          scroll-margin-top: 90px;
        }
        .about-section-alt {
          background: rgba(182,197,72,0.06);
        }
        .about-grid-2 {
          display: grid;
          gap: 24px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .about-grid-2 { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .about-grid-2 { grid-template-columns: 1fr 1fr 1fr; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #F4FAEC 0%, #D0E8AF 100%)',
        padding: 'clamp(90px,12vw,120px) 32px clamp(48px,6vw,72px)',
        textAlign: 'center',
      }}>
        <span style={{
          display:'inline-block', marginBottom:'16px',
          background:'#EF7ECB', color:'#fff',
          fontFamily:'Nunito,sans-serif', fontSize:'11px', fontWeight:'800',
          letterSpacing:'0.08em', textTransform:'uppercase',
          padding:'5px 18px', borderRadius:'999px',
        }}>
          Est. {OUR_STORY.founded} · Philippines No. 1 🥑
        </span>
        <h1 style={{
          fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
          fontSize:'clamp(2rem,5vw,3.6rem)',
          fontWeight:'normal', color:'#3a6b35', margin:'0 0 14px', lineHeight:1.1,
        }}>
          About Avocadoria
        </h1>
        <p style={{
          fontFamily:'Nunito,sans-serif', fontSize:'clamp(14px,1.5vw,17px)',
          color:'rgba(138,95,60,0.8)', maxWidth:'520px', margin:'0 auto 36px', lineHeight:1.7,
        }}>
          Seven years of happiness in avocado — our story, milestones, and love for community.
        </p>

        {/* Stats row */}
        <div style={{ display:'flex', justifyContent:'center', gap:'clamp(24px,4vw,56px)', flexWrap:'wrap' }}>
          {OUR_STORY.stats.map((s,i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{
                fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
                fontSize:'clamp(2rem,4vw,3rem)', color:'#b6c548', lineHeight:1,
              }}>{s.num}</div>
              <div style={{ fontFamily:'Nunito,sans-serif', fontSize:'12px', color:'rgba(138,95,60,0.65)', marginTop:'4px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>

        {/* ══════════ OUR STORY ══════════ */}
        <section id="our-story" className="about-section">
          <SectionHeading label="Our Story" title={OUR_STORY.headline} sub={OUR_STORY.subheading}/>

          <div style={{ display:'flex', flexDirection:'column', gap:'48px' }}>
            {OUR_STORY.sections.map((sec, i) => (
              <div key={sec.id} style={{
                display:'grid',
                gridTemplateColumns: sec.image ? 'repeat(auto-fit,minmax(280px,1fr))' : '1fr',
                gap:'32px', alignItems:'center',
              }}>
                {sec.image && i % 2 === 0 && (
                  <img src={sec.image} alt={sec.title}
                    style={{ width:'100%', borderRadius:'16px', objectFit:'cover', maxHeight:'280px' }}/>
                )}
                <div>
                  <div style={{ width:'36px', height:'3px', borderRadius:'2px', background:'#b6c548', marginBottom:'12px' }}/>
                  <h3 style={{
                    fontFamily:'Nunito,sans-serif', fontSize:'clamp(1.1rem,2vw,1.5rem)',
                    fontWeight:'800', color:'#3a6b35', margin:'0 0 10px',
                  }}>{sec.title}</h3>
                  <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'15px', color:'rgba(138,95,60,0.85)', lineHeight:1.8, margin:0 }}>
                    {sec.content}
                  </p>
                </div>
                {sec.image && i % 2 !== 0 && (
                  <img src={sec.image} alt={sec.title}
                    style={{ width:'100%', borderRadius:'16px', objectFit:'cover', maxHeight:'280px' }}/>
                )}
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══════════ NEWS & UPDATES ══════════ */}
        <section id="whats-new" className="about-section about-section-alt">
          <SectionHeading
            label="What's New"
            title="What's New at Avocadoria"
            sub="New branches, products, and announcements — stay in the loop."
          />
          <div className="about-grid-2">
            {NEWS_POSTS.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {NEWS_POSTS.length === 0 && (
            <p style={{ fontFamily:'Nunito,sans-serif', color:'rgba(138,95,60,0.5)', textAlign:'center', padding:'32px 0' }}>
              No posts yet — check back soon!
            </p>
          )}
        </section>

        <Divider flip />

        {/* ══════════ RECOGNITIONS ══════════ */}
        <section id="recognitions" className="about-section">
          <SectionHeading
            label="Recognitions"
            title="Awards & Milestones"
            sub="The moments that mark our journey."
          />
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {RECOGNITIONS.map(rec => (
              <div key={rec.id} style={{
                background:'rgba(255,255,255,0.85)',
                border:'1.5px solid rgba(182,197,72,0.2)',
                borderRadius:'16px', padding:'22px 24px',
                display:'flex', gap:'18px', alignItems:'flex-start',
              }}>
                <div style={{
                  width:'52px', height:'52px', borderRadius:'14px', flexShrink:0,
                  background: rec.featured ? '#b6c548' : 'rgba(182,197,72,0.12)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'24px',
                }}>{rec.icon}</div>
                <div>
                  <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'6px' }}>
                    <span style={{
                      background: rec.featured ? '#b6c548' : 'rgba(182,197,72,0.15)',
                      color: rec.featured ? '#fff' : '#3a6b35',
                      fontFamily:'Nunito,sans-serif', fontSize:'10px', fontWeight:'800',
                      letterSpacing:'0.06em', textTransform:'uppercase',
                      padding:'3px 10px', borderRadius:'999px',
                    }}>{rec.category}</span>
                    <span style={{ fontFamily:'Nunito,sans-serif', fontSize:'11px', color:'rgba(138,95,60,0.5)' }}>
                      {formatDate(rec.date)} · {rec.issuer}
                    </span>
                  </div>
                  <h3 style={{ fontFamily:'Nunito,sans-serif', fontSize:'clamp(14px,1.4vw,17px)', fontWeight:'800', color:'#3a6b35', margin:'0 0 6px', lineHeight:1.3 }}>
                    {rec.title}
                  </h3>
                  <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'13px', color:'rgba(138,95,60,0.8)', lineHeight:1.6, margin:0 }}>
                    {rec.excerpt}
                  </p>
                </div>
              </div>
            ))}
            {RECOGNITIONS.length === 0 && (
              <p style={{ fontFamily:'Nunito,sans-serif', color:'rgba(138,95,60,0.5)', textAlign:'center', padding:'32px 0' }}>
                No recognitions listed yet.
              </p>
            )}
          </div>
        </section>

        <Divider />

        {/* ══════════ AVO CARES ══════════ */}
        <section id="avo-cares" className="about-section about-section-alt">
          <SectionHeading
            label="Avo Cares"
            title="Spreading Happiness Beyond Our Cups"
            sub="Community, environment, and supporting local farmers."
          />
          <div className="about-grid-2">
            {AVO_CARES.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {AVO_CARES.length === 0 && (
            <p style={{ fontFamily:'Nunito,sans-serif', color:'rgba(138,95,60,0.5)', textAlign:'center', padding:'32px 0' }}>
              No initiatives listed yet.
            </p>
          )}
        </section>

      </div>
    </>
  )
}
