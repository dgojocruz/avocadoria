import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '@/components/ui/SEO'
import { NEWS_POSTS } from '@/data/posts'

// ═══════════════════════════════════════════════════════════════════════════════
// DATA — fill in your real content here
// ═══════════════════════════════════════════════════════════════════════════════

const BRAND = {
  founded:    '2019',
  tagline:    '"Happiness in Avocado"',
  headline:   'The Story of Avocadoria',
  sub:        'From a single kitchen to the Philippines\' No. 1 avocado dessert brand — this is how it all began.',
  stats: [
    { num: '2019',  label: 'Year Founded',         icon: '🌱' },
    { num: '7+',    label: 'Years of Happiness',    icon: '🥑' },
    { num: '50+',   label: 'Branches Nationwide',   icon: '📍' },
    { num: '100K+', label: 'Happy Cups Served',     icon: '☕' },
  ],
}

const STORY_SECTIONS = [
  {
    id:      'beginning',
    badge:   'How It All Began',
    title:   'A Simple Love for Avocado',
    body:    'Founded in 2019, Avocadoria was built on a simple belief — desserts can be both indulgent and nourishing. Led by Chef Czarina Sevilla, the brand pioneered an avocado-based dessert concept designed for modern, health-conscious consumers worldwide.',
    color:   'var(--c-olive)',
  },
  {
    id:      'mission',
    badge:   'Our Mission',
    title:   'Happiness in Every Cup',
    body:    'We are on a mission to bring happiness through avocado — one cup at a time. Every product we serve is crafted with real avocado, no artificial flavors, and a whole lot of love. We believe indulgence and health can coexist, and that every Filipino deserves a treat that is both delicious and nourishing.',
    color:   'var(--c-dark)',
  },
  {
    id:      'vision',
    badge:   'Our Vision',
    title:   'The No. 1 Avocado Brand in Asia',
    body:    'We dream big — to become the most recognized avocado dessert brand not just in the Philippines, but across Asia. We are building a brand rooted in authenticity, community, and the joy of sharing something truly delicious with the people you love.',
    color:   'var(--c-pink)',
  },
  {
    id:      'farmers',
    badge:   'Locally Sourced',
    title:   'Supporting Filipino Farmers',
    body:    'We proudly partner with local avocado farmers across the Philippines. Every cup you enjoy directly supports Filipino farming communities and helps grow a sustainable, local supply chain. From Benguet to Davao, real farmers grow the real avocados behind every Avocadoria product.',
    color:   '#DFD438',
  },
]

const RECOGNITIONS = [
  {
    id: 'award-ey',
    image: '/awards/award-p3-0.png',
    year: '2024', category: 'Entrepreneurship',
    title: 'EY Young Entrepreneur of the Year Award',
    issuer: 'Ernst & Young Philippines',
    featured: true,
  },
  {
    id: 'award-asia-marketeer',
    image: '/awards/award-p2-0.png',
    year: '2025', category: 'Marketing',
    title: "Asia's Top Outstanding Woman Marketeer of the Year",
    issuer: 'Asia Marketing Federation',
    featured: false,
  },
  {
    id: 'award-agora',
    image: '/awards/award-p2-1.png',
    year: '2025', category: 'Entrepreneurship',
    title: 'Outstanding Achievement in Entrepreneurship — Small Scale',
    issuer: 'Agora Awards · Philippine Marketing Association',
    featured: false,
  },
  {
    id: 'award-gawad',
    image: '/awards/award-p2-2.jpeg',
    year: '2026', category: 'Innovation',
    title: 'Gawad Yamang Isip Awards — Top Madrid Protocol Filer',
    issuer: 'Intellectual Property Office of the Philippines',
    featured: false,
  },
  {
    id: 'award-sterling',
    image: '/awards/award-p1-2.png',
    year: '2023', category: 'Brand',
    title: 'Asian Sterling Awards — Hall of Fame, Most Outstanding Avocado Dessert Brand',
    issuer: 'Asian Sterling Awards',
    featured: false,
  },
  {
    id: 'award-francorp100',
    image: '/awards/award-p1-0.png',
    year: '2022', category: 'Franchise',
    title: 'Francorp 100 Club',
    issuer: 'Francorp Philippines',
    featured: false,
  },
  {
    id: 'award-premier',
    image: '/awards/award-p1-1.png',
    year: '2022', category: 'Franchise',
    title: 'Premier Avocado Dessert Specialty Franchise',
    issuer: 'Francorp Philippines — 25th Anniversary',
    featured: false,
  },
  {
    id: 'award-ymma',
    image: '/awards/award-p1-3.png',
    year: '2024', category: 'Marketing',
    title: 'YMMA 2024 — Entrepreneurial Marketing Award',
    issuer: 'Young Market Masters Awards · Mansmith',
    featured: false,
  },
  {
    id: 'award-gonegosyo',
    image: '/awards/award-p1-5.jpeg',
    year: '2023', category: 'Leadership',
    title: "GoNegosyo Women's Month — Inspiring Filipina Entrepreneur",
    issuer: 'Go Negosyo',
    featured: false,
  },
  {
    id: 'award-elite',
    image: '/awards/award-p1-4.png',
    year: '2021', category: 'Business',
    title: 'Elite Business & Leadership Awards',
    issuer: 'Elite Business & Leadership Awards',
    featured: false,
  },
]

// NEWS_POSTS imported from @/data/posts

const AVO_CARES = [
  {
    id: 'cares-001',  featured: true,
    title:    'Rooted in Growth — Planting 1,000 Avocado Trees',
    date:     '2025-03-15', category: 'Environment',
    excerpt:  'Avocadoria partnered with local farmers to plant 1,000 avocado trees across Benguet — investing in the future of Filipino agriculture and the planet.',
    image:    '/avo-cares-planting.webp',
  },
  {
    id: 'cares-002', featured: false,
    title:    'Every Cup Grows a Tree',
    date:     '2025-03-15', category: 'Environment',
    excerpt:  '"Rooted in Growth" — our commitment to sustainability. Every tree planted is a promise to our farmers, our community, and the next generation of avocado lovers.',
    image:    '/avo-cares-rooted.webp',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

const STROKE = [
  '-3px -3px 0 #fff', ' 3px -3px 0 #fff',
  '-3px  3px 0 #fff', ' 3px  3px 0 #fff',
  '-3px  0   0 #fff', ' 3px  0   0 #fff',
  ' 0   -3px 0 #fff', ' 0    3px 0 #fff',
  '-2px -2px 0 #fff', ' 2px -2px 0 #fff',
  '-2px  2px 0 #fff', ' 2px  2px 0 #fff',
].join(', ')

function fmt(d) {
  return new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
}

function Wave({ fromColor, toColor, height = 56, flip = false }) {
  const path = flip
    ? `M0,${height} C360,0 1080,${height} 1440,${Math.round(height * 0.4)} L1440,0 L0,0 Z`
    : `M0,0 C360,${height} 1080,0 1440,${Math.round(height * 0.6)} L1440,${height} L0,${height} Z`
  return (
    <div style={{ background: fromColor, lineHeight: 0, marginBottom: '-2px' }}>
      <svg viewBox={`0 0 1440 ${height}`} xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: `${height}px` }}>
        <path d={path} fill={toColor} />
      </svg>
    </div>
  )
}

// Animated counter hook
function useCountUp(target, duration = 1800, trigger = true) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    const num = parseInt(target.replace(/\D/g, '')) || 0
    if (!num) { setVal(target); return }
    const suffix = target.replace(/[\d]/g, '')
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(ease * num) + suffix)
      if (p < 1) requestAnimationFrame(step)
      else setVal(target)
    }
    requestAnimationFrame(step)
  }, [trigger, target])
  return val
}

function StatCard({ stat, trigger }) {
  const val = useCountUp(stat.num, 1600, trigger)
  return (
    <div className="about-stat-card">
      <div style={{
        fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: 'var(--c-olive)', lineHeight: 1,
        textShadow: STROKE,
      }}>{val || stat.num}</div>
      <div style={{
        fontFamily: 'Poppins,sans-serif',
        fontSize: '11px', color: 'var(--c-dark)',
        marginTop: '6px', letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>{stat.label}</div>
    </div>
  )
}

function SectionLabel({ text, color = 'var(--c-pink)' }) {
  return (
    <span style={{
      display: 'inline-block', marginBottom: '12px',
      background: color, color: '#fff',
      fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '800',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '5px 18px', borderRadius: '999px',
    }}>{text}</span>
  )
}


// ─── Recognitions Carousel ────────────────────────────────────────────────────
function RecognitionsCarousel({ items }) {
  const [cur, setCur] = useState(0)
  const trackRef = useRef(null)
  const timerRef = useRef(null)
  const perView = typeof window !== 'undefined' && window.innerWidth < 640 ? 1 : 2
  const maxIdx = Math.max(0, items.length - perView)

  const goTo = (i) => {
    const idx = Math.max(0, Math.min(i, maxIdx))
    setCur(idx)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCur(p => p >= maxIdx ? 0 : p + 1), 4000)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => setCur(p => p >= maxIdx ? 0 : p + 1), 4000)
    return () => clearInterval(timerRef.current)
  }, [maxIdx])

  useEffect(() => {
    if (!trackRef.current) return
    const slide = trackRef.current.children[0]
    if (!slide) return
    const w = slide.offsetWidth + 12
    trackRef.current.style.transform = `translateX(-${cur * w}px)`
  }, [cur])

  const catColor = (cat) => {
    const map = {
      'Entrepreneurship': 'var(--c-dark)',
      'Marketing':        'var(--c-pink)',
      'Franchise':        'var(--c-olive)',
      'Brand':            '#DFD438',
      'Leadership':       '#8A5F3C',
      'Innovation':       'var(--c-dark)',
      'Business':         'var(--c-olive)',
    }
    return map[cat] || 'var(--c-olive)'
  }

  return (
    <div>
      <style>{`
        .rec-track-outer { overflow: hidden; }
        .rec-track {
          display: flex; gap: 12px;
          transition: transform 0.5s cubic-bezier(.4,0,.2,1);
        }
        .rec-slide {
          flex-shrink: 0;
          width: calc(50% - 6px);
          background: #fff;
          border: 1.5px solid rgba(58,107,53,0.12);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          box-shadow: 0 4px 16px rgba(58,107,53,0.10);
        }
        .rec-slide:hover {
          border-color: var(--c-olive);
          box-shadow: 0 12px 36px rgba(58,107,53,0.18);
          transform: translateY(-5px);
        }
        .rec-slide-img {
          width: 100%; height: clamp(220px,32vw,320px);
          object-fit: contain;
          object-position: center center;
          display: block;
          background: #1a3a12;
          padding: 8px;
          box-sizing: border-box;
        }
        .rec-slide-body {
          padding: clamp(12px,2vw,18px);
          display: flex; flex-direction: column; gap: 6px;
        }
        .rec-slide-badge {
          display: inline-block; width: fit-content;
          font-family: 'Poppins',sans-serif;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 2px 9px; border-radius: 999px;
          color: #fff;
        }
        .rec-slide-title {
          font-family: 'BubbleboddyNeue-ExtraBold','Poppins',sans-serif;
          font-size: clamp(12px,1.4vw,15px);
          font-weight: normal; color: var(--c-dark);
          margin: 0; line-height: 1.25;
        }
        .rec-slide-org {
          font-family: 'Poppins',sans-serif;
          font-size: clamp(10px,1vw,12px);
          color: var(--c-brown); margin: 0;
        }
        .rec-nav {
          display: flex; align-items: center;
          justify-content: center; gap: 12px;
          margin-top: 16px;
        }
        .rec-arrow {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.85);
          border: 1.5px solid rgba(58,107,53,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--c-dark); font-size: 18px;
          transition: all 0.2s; flex-shrink: 0;
          min-height: unset; min-width: unset;
        }
        .rec-arrow:hover { background: var(--c-olive); border-color: var(--c-olive); color: #fff; }
        .rec-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(58,107,53,0.2);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.2s;
        }
        .rec-dot.active { background: var(--c-olive); width: 18px; border-radius: 3px; }
        @media (max-width: 600px) {
          .rec-slide { width: calc(100% - 0px); }
        }
      `}</style>

      <div className="rec-track-outer">
        <div className="rec-track" ref={trackRef}>
          {items.map((rec) => (
            <div key={rec.id} className="rec-slide">
              <img
                src={rec.image} alt={rec.title}
                className="rec-slide-img"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div style={{
                display: 'none', width: '100%',
                height: 'clamp(130px,22vw,190px)',
                background: 'rgba(58,107,53,0.3)',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '36px',
              }}>🏆</div>
              <div className="rec-slide-body">
                <span
                  className="rec-slide-badge"
                  style={{ background: catColor(rec.category) }}
                >{rec.category} · {rec.year}</span>
                <h3 className="rec-slide-title">{rec.title}</h3>
                <p className="rec-slide-org">{rec.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rec-nav">
        <button className="rec-arrow" onClick={() => goTo(cur - 1)} aria-label="Previous award">‹</button>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {Array.from({ length: maxIdx + 1 }, (_, i) => (
            <button
              key={i}
              className={`rec-dot${i === cur ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to award ${i + 1}`}
            />
          ))}
        </div>
        <button className="rec-arrow" onClick={() => goTo(cur + 1)} aria-label="Next award">›</button>
      </div>
    </div>
  )
}

function NewsCard({ post }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'rgba(255,255,255,0.92)',
        border: `1.5px solid ${hov ? 'var(--c-olive)' : 'rgba(182,197,72,0.2)'}`,
        borderRadius: '20px', overflow: 'hidden',
        transition: 'all 0.25s ease',
        boxShadow: hov ? '0 12px 32px rgba(58,107,53,0.14)' : '0 2px 12px rgba(58,107,53,0.06)',
        transform: hov ? 'translateY(-4px)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image / placeholder */}
      <div style={{
        width: '100%', height: '160px', overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(182,197,72,0.15), rgba(58,107,53,0.08))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {post.image
          ? <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" decoding="async"/>
          : <span style={{ fontSize: '48px' }}>🥑</span>
        }
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{
            background: post.featured ? 'var(--c-olive)' : 'rgba(182,197,72,0.15)',
            color: post.featured ? '#fff' : 'var(--c-dark)',
            fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: '800',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: '999px',
          }}>{post.featured ? 'Featured' : post.category}</span>
          <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.7)' }}>
            {fmt(post.date)}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
          fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 'normal',
          color: 'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: 0, lineHeight: 1.3,
        }}>{post.title}</h3>
        <p style={{
          fontFamily: 'Poppins,sans-serif', fontSize: '13px',
          color: 'var(--c-brown)', lineHeight: 1.65, margin: 0, flex: 1,
        }}>{post.excerpt}</p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const location = useLocation()
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  // Intersection observer for stat counter trigger
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Scroll to hash section
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
        title="Our Story"
        description="From a bazaar stall to the Philippines' No. 1 avocado dessert brand. Discover the story, mission, and vision of Avocadoria."
        path="/about"
      />

      <style>{`
        @font-face {
          font-family: 'BubbleboddyNeue-ExtraBold';
          src: url('/fonts/bubbleboddy-neue-extrabold.ttf') format('truetype');
          font-weight: normal; font-style: normal; font-display: swap;
        }

        @keyframes about-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes about-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .about-hero-text  { opacity: 0; animation: about-fade-up 0.8s ease 0.1s forwards; }
        .about-hero-sub   { opacity: 0; animation: about-fade-up 0.8s ease 0.3s forwards; }
        .about-hero-stats { opacity: 0; animation: about-fade-up 0.8s ease 0.5s forwards; }

        .about-stat-card {
          text-align: center;
          padding: 24px 16px;
          background: rgba(255,255,255,0.55);
          border: 1.5px solid rgba(58,107,53,0.18);
          border-radius: 20px;
          backdrop-filter: blur(8px);
          flex: 1;
          min-width: 130px;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .about-stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.7);
        }

        .about-story-card {
          opacity: 0;
          animation: about-fade-up 0.65s ease forwards;
          background: rgba(255,255,255,0.88);
          border-radius: 24px;
          overflow: hidden;
          border: 1.5px solid rgba(182,197,72,0.2);
          box-shadow: 0 4px 20px rgba(58,107,53,0.07);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .about-story-card:hover {
          box-shadow: 0 12px 40px rgba(58,107,53,0.14);
          transform: translateY(-4px);
        }

        .about-recognition-row {
          background: rgba(255,255,255,0.88);
          border: 1.5px solid rgba(182,197,72,0.18);
          border-radius: 18px;
          padding: 20px 24px;
          display: flex; gap: 18px; align-items: flex-start;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .about-recognition-row:hover {
          box-shadow: 0 8px 28px rgba(58,107,53,0.10);
          border-color: rgba(182,197,72,0.45);
        }

        .about-news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .about-cares-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .about-section {
          scroll-margin-top: 90px;
        }

        /* ── Founder layout — photo left, text right ── */
        .about-founder-layout {
          display: grid;
          grid-template-columns: minmax(280px, 420px) 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }

        .about-founder-photo-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-founder-photo-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
        }

        .about-founder-ring {
          position: absolute;
          inset: -8px;
          border-radius: 32px;
          border: 3px solid var(--c-olive);
          opacity: 0.3;
          pointer-events: none;
        }

        .about-founder-img-frame {
          width: 100%;
          border-radius: 28px;
          overflow: hidden;
          border: 5px solid #fff;
          box-shadow: 0 16px 48px rgba(58,107,53,0.22);
          aspect-ratio: 3/4;
        }

        .about-founder-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          display: block;
          transition: transform 0.5s ease;
        }
        .about-founder-img-frame:hover .about-founder-photo {
          transform: scale(1.03);
        }

        .about-founder-badge {
          position: absolute;
          bottom: 16px;
          right: -12px;
          background: var(--c-olive);
          border: 3px solid #fff;
          border-radius: 999px;
          padding: 8px 18px;
          box-shadow: 0 4px 16px rgba(58,107,53,0.3);
        }

        .about-founder-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-bottom: 8px;
        }

        .about-founder-para {
          font-family: 'Poppins',sans-serif;
          font-size: clamp(15px, 1.6vw, 19px);
          color: var(--c-dark);
          line-height: 1.75;
          margin: 0 0 clamp(16px, 2.5vw, 24px);
          opacity: 0.88;
        }

        @media (max-width: 768px) {
          .about-founder-layout {
            grid-template-columns: 1fr;
            align-items: center;
          }
          .about-founder-photo-col {
            order: 2;
            margin-top: 24px;
          }
          .about-founder-photo-wrap {
            max-width: 280px;
          }
          .about-founder-text-col {
            order: 1;
          }
        }

        @media (max-width: 640px) {
          .about-news-grid  { grid-template-columns: 1fr; }
          .about-cares-grid { grid-template-columns: 1fr; }
          .about-stat-card  { min-width: 110px; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════
          HERO — franchisebg.svg as background
      ══════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        minHeight: 'clamp(560px, 80vh, 800px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(100px, 14vw, 140px) 32px clamp(60px, 8vw, 100px)',
        textAlign: 'center',
      }}>
        {/* Paper texture background — matches all other sections */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: "url('/website_layer_1.png')",
          backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundColor: '#F3F2EE',
        }} />
        {/* Same green overlay as all sections — #b6c548 at 0.25 */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundColor: '#b6c548', opacity: 0.25, pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>

          {/* Est. badge */}
          <div className="about-hero-text">
            <span style={{
              display: 'inline-block', marginBottom: '20px',
              background: 'var(--c-pink)', color: '#fff',
              fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '800',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '5px 20px', borderRadius: '999px',
            }}>
              Est. 2019 · Philippines No. 1 🥑
            </span>

            {/* Tagline quote */}
            <p style={{
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontSize: 'clamp(13px, 1.4vw, 16px)',
              color: 'var(--c-dark)',
              margin: '0 0 10px', letterSpacing: '0.03em',
              textShadow: 'none',
            }}>{BRAND.tagline}</p>

            {/* Main headline */}
            <h1 style={{
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 7vw, 4.8rem)',
              color: 'var(--c-olive)',
              textShadow: 'none',
              margin: '0 0 18px', lineHeight: 1.05,
              background: 'none',
              WebkitTextFillColor: 'var(--c-olive)',
            }}>
              {BRAND.headline}
            </h1>
          </div>

          <div className="about-hero-sub">
            <p style={{
              fontFamily: 'Poppins,sans-serif',
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              color: 'var(--c-dark)',
              maxWidth: '560px', margin: '0 auto 40px',
              lineHeight: 1.7,
              textShadow: 'none',
            }}>{BRAND.sub}</p>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="about-hero-stats">
            <div style={{
              display: 'flex', gap: '14px', flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {BRAND.stats.map((s, i) => (
                <StatCard key={i} stat={s} trigger={statsVisible} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave out of hero */}
      <Wave fromColor="#3a6b35" toColor="#d9e29e" height={60} />

      {/* ══════════════════════════════════════════════════════════════
          OUR STORY — founder photo left, story text right (mirrors slide)
      ══════════════════════════════════════════════════════════════ */}
      <div id="our-story" className="about-section" style={{ position:'relative', overflow:'hidden', padding: 'clamp(52px,7vw,88px) clamp(20px,5vw,72px)', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
        <div style={{ position:'relative', zIndex:1, maxWidth: '1160px', margin: '0 auto' }}>

          {/* ── "Our Story" heading — top-left, bold, dark green, matches slide ── */}
          <h2 style={{
            fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            color: 'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff',
            margin: '0 0 clamp(32px, 5vw, 52px)',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
          }}>Our Story</h2>

          {/* ── Two-column layout: photo left, text right ── */}
          <div className="about-founder-layout">

            {/* LEFT — Chef Czarina portrait with circular frame */}
            <div className="about-founder-photo-col">
              <div className="about-founder-photo-wrap">
                <div className="about-founder-ring" />
                <div className="about-founder-img-frame">
                  <img
                    src="/chef-czarina.webp"
                    alt="Chef Czarina Sevilla — Founder of Avocadoria"
                    className="about-founder-photo"
                   loading="lazy" decoding="async"/>
                </div>
                <div className="about-founder-badge">
                  <span style={{
                    fontFamily: 'Poppins,sans-serif',
                    fontSize: '11px', fontWeight: '800',
                    color: '#fff', letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>Est. 2019 🥑</span>
                </div>
              </div>
            </div>

            {/* RIGHT — Story paragraphs, exactly matching slide content */}
            <div className="about-founder-text-col">
              <p className="about-founder-para">
                Founded in 2019, Avocadoria was built on a simple belief: desserts can be both indulgent and nourishing.
              </p>
              <p className="about-founder-para">
                Led by Chef Czarina Sevilla, the brand pioneered an avocado-based dessert concept designed for modern, health-conscious consumers worldwide.
              </p>
              <p className="about-founder-para">
                Today, Avocadoria brings this vision to life through playful, real-avocado creations that customers instantly recognize and return for — curious, health-conscious, and joy-seeking diners.
              </p>

              {/* Founder signature / name block */}
              <div style={{
                marginTop: 'clamp(24px, 3vw, 36px)',
                paddingTop: '20px',
                borderTop: '2px solid rgba(58,107,53,0.15)',
                display: 'flex', alignItems: 'center', gap: '14px',
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'var(--c-olive)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', flexShrink: 0,
                  minHeight: 'unset', minWidth: 'unset',
                }}>👩‍🍳</div>
                <div>
                  <p style={{
                    fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                    fontSize: 'clamp(15px, 1.6vw, 19px)',
                    fontWeight: 'normal', color: 'var(--c-dark)',
                    margin: 0, lineHeight: 1.2,
                  }}>Chef Czarina Sevilla</p>
                  <p style={{
                    fontFamily: 'Poppins,sans-serif',
                    fontSize: '12px', color: 'rgba(58,107,53,0.6)',
                    margin: '3px 0 0', letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>Founder & Chief Avocado Officer</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Mission / Vision / Values cards below — compact 3-col ── */}
          <div style={{ marginTop: 'clamp(48px, 7vw, 72px)' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}>
              {STORY_SECTIONS.filter(s => s.id !== 'beginning').map((sec, i) => (
                <div
                  key={sec.id}
                  className="about-story-card"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div style={{ height: '5px', background: sec.color, width: '100%' }} />
                  <div style={{ padding: '22px 24px 26px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                        background: `${sec.color}18`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                        minHeight: 'unset', minWidth: 'unset',
                      }}>{sec.icon}</div>
                      <span style={{
                        background: `${sec.color}18`, color: sec.color,
                        fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: '800',
                        letterSpacing: '0.07em', textTransform: 'uppercase',
                        padding: '3px 12px', borderRadius: '999px',
                      }}>{sec.badge}</span>
                    </div>
                    <h3 style={{
                      fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                      fontWeight: 'normal', color: 'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff',
                      margin: '0 0 10px', lineHeight: 1.2,
                    }}>{sec.title}</h3>
                    <p style={{
                      fontFamily: 'Poppins,sans-serif',
                      fontSize: '14px', lineHeight: 1.8,
                      color: 'var(--c-brown)', margin: 0,
                    }}>{sec.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Wave into dark section */}
      <Wave fromColor="#d9e29e" toColor="#3a6b35" height={56} />

      {/* ══════════════════════════════════════════════════════════════
          RECOGNITIONS — floating image carousel
      ══════════════════════════════════════════════════════════════ */}
      <div id="recognitions" className="about-section" style={{ position:'relative', overflow:'hidden', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
        <div style={{ display: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(16px,4vw,48px)' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(28px,4vw,44px)' }}>
            <SectionLabel text="Awards & Recognitions 🏆" color="var(--c-olive)" />
            <h2 style={{
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
              fontWeight: 'normal', color: 'var(--c-olive)',
              textShadow: STROKE,
              margin: '0 0 10px', lineHeight: 1.1,
            }}>A Legacy of Excellence</h2>
            <p style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: 'clamp(13px, 1.4vw, 15px)',
              color: 'var(--c-dark)', opacity: 0.75,
              margin: '0 auto', lineHeight: 1.65,
              maxWidth: '480px',
            }}>
              Chef Czarina Sevilla · 9 awards across 5 years of entrepreneurial excellence.
            </p>
          </div>

          {/* Featured award */}
          <div style={{
            background: 'rgba(255,255,255,0.88)',
            border: '1.5px solid rgba(58,107,53,0.2)',
            borderRadius: '20px', overflow: 'hidden',
            marginBottom: 'clamp(20px,3vw,32px)',
            boxShadow: '0 4px 24px rgba(58,107,53,0.10)',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(180px,38%,280px) 1fr',
              minHeight: '260px',
            }}>
              {/* Featured image */}
              <div style={{
                overflow: 'hidden', flexShrink: 0,
                background: '#1a3a12',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={RECOGNITIONS[0].image}
                  alt={RECOGNITIONS[0].title}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'contain', objectPosition: 'center',
                    display: 'block',
                  }}
                  onError={e => e.target.style.display='none'}
                />
              </div>
              {/* Featured text */}
              <div style={{ padding: 'clamp(16px,3vw,28px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                <span style={{
                  display: 'inline-block', width: 'fit-content',
                  background: 'var(--c-olive)', color: '#fff',
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: '10px', fontWeight: '600',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  padding: '3px 12px', borderRadius: '999px',
                }}>EY · {RECOGNITIONS[0].year} · Featured</span>
                <h3 style={{
                  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                  fontSize: 'clamp(1rem,2.2vw,1.4rem)',
                  fontWeight: 'normal', color: 'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff',
                  margin: 0, lineHeight: 1.25,
                }}>{RECOGNITIONS[0].title}</h3>
                <p style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: 'clamp(11px,1.2vw,13px)',
                  color: 'var(--c-brown)', opacity: 0.8, margin: 0,
                }}>{RECOGNITIONS[0].issuer}</p>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <RecognitionsCarousel items={RECOGNITIONS.slice(1)} />

        </div>
      </div>

      {/* Wave out */}
      <Wave fromColor="#3a6b35" toColor="#d9e29e" height={56} />

      {/* ══════════════════════════════════════════════════════════════
          WHAT'S NEW
      ══════════════════════════════════════════════════════════════ */}
      <div id="whats-new" className="about-section" style={{
        position:'relative', overflow:'hidden',
        padding: 'clamp(52px,8vw,88px) clamp(20px,5vw,72px)',
        backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE',
      }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
        <div style={{ position:'relative', zIndex:1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
            <div>
              <SectionLabel text="What's New" color="var(--c-pink)" />
              <h2 style={{
                fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 'normal', color: 'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff',
                margin: '0 0 6px', lineHeight: 1.1,
              }}>Latest from Avocadoria</h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: 'var(--c-brown)', margin: 0 }}>
                New branches, products, and announcements.
              </p>
            </div>
          </div>
          <div className="about-news-grid">
            {NEWS_POSTS.slice(0, 6).map(post => <NewsCard key={post.id} post={post} />)}
          </div>
        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════
          AVO CARES
      ══════════════════════════════════════════════════════════════ */}
      <div id="avo-cares" className="about-section" style={{ position:'relative', overflow:'hidden', padding: 'clamp(52px,8vw,88px) clamp(20px,5vw,72px)', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
        <div style={{ position:'relative', zIndex:1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <SectionLabel text="Avo Cares 🌱" color="var(--c-dark)" />
            <h2 style={{
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 'normal', color: 'var(--c-olive)',
              textShadow: STROKE, margin: '0 0 12px', lineHeight: 1.1,
            }}>Spreading Happiness Beyond Our Cups</h2>
            <p style={{
              fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(14px, 1.5vw, 17px)',
              color: 'rgba(58,107,53,0.75)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65,
            }}>
              Community, environment, and supporting local farmers.
            </p>
          </div>
          <div className="about-cares-grid">
            {AVO_CARES.map((item) => (
              <div key={item.id} style={{
                background: 'rgba(255,255,255,0.90)',
                border: '1.5px solid rgba(182,197,72,0.2)',
                borderRadius: '20px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 2px 14px rgba(58,107,53,0.07)',
                transition: 'box-shadow 0.25s ease, transform 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 14px 40px rgba(58,107,53,0.16)'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 14px rgba(58,107,53,0.07)'; e.currentTarget.style.transform = 'none' }}
              >
                {/* Photo */}
                {item.image && (
                  <div style={{
                    width: '100%', height: '220px', overflow: 'hidden', flexShrink: 0,
                  }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.45s ease',
                      }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                )}
                {/* Content */}
                <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span style={{
                      background: item.featured ? 'var(--c-olive)' : 'rgba(182,197,72,0.15)',
                      color: item.featured ? '#fff' : 'var(--c-dark)',
                      fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: '800',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      padding: '3px 10px', borderRadius: '999px',
                    }}>{item.category}</span>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.7)' }}>
                      {fmt(item.date)}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                    fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 'normal',
                    color: 'var(--c-dark)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: 0, lineHeight: 1.3,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: 'Poppins,sans-serif', fontSize: '13px',
                    color: 'var(--c-brown)', lineHeight: 1.7, margin: 0,
                  }}>{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave + tagline strip */}
      <Wave fromColor="#d9e29e" toColor="#b6c548" height={50} />
      <div style={{ position:'relative', overflow:'hidden', padding: '28px 32px', textAlign: 'center', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.55 }} />
        <p style={{
          fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
          fontSize: 'clamp(13px, 1.5vw, 16px)',
          color: 'rgba(255,255,255,0.9)', margin: 0,
          textShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }}>
          Happiness in Avocado — since 2019 🥑
        </p>
      </div>

    </>
  )
}
