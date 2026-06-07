import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '@/components/ui/SEO'

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
    icon:    '🌱',
    color:   'var(--c-olive)',
  },
  {
    id:      'mission',
    badge:   'Our Mission',
    title:   'Happiness in Every Cup',
    body:    'We are on a mission to bring happiness through avocado — one cup at a time. Every product we serve is crafted with real avocado, no artificial flavors, and a whole lot of love. We believe indulgence and health can coexist, and that every Filipino deserves a treat that is both delicious and nourishing.',
    icon:    '💚',
    color:   'var(--c-dark)',
  },
  {
    id:      'vision',
    badge:   'Our Vision',
    title:   'The No. 1 Avocado Brand in Asia',
    body:    'We dream big — to become the most recognized avocado dessert brand not just in the Philippines, but across Asia. We are building a brand rooted in authenticity, community, and the joy of sharing something truly delicious with the people you love.',
    icon:    '🌏',
    color:   'var(--c-pink)',
  },
  {
    id:      'farmers',
    badge:   'Locally Sourced',
    title:   'Supporting Filipino Farmers',
    body:    'We proudly partner with local avocado farmers across the Philippines. Every cup you enjoy directly supports Filipino farming communities and helps grow a sustainable, local supply chain. From Benguet to Davao, real farmers grow the real avocados behind every Avocadoria product.',
    icon:    '🤝',
    color:   '#DFD438',
  },
]

const RECOGNITIONS = [
  {
    id: 'award-001', icon: '🏆', featured: true,
    title:    'Best Dessert Brand — Food & Beverage PH Awards 2024',
    issuer:   'Food & Beverage Philippines',
    date:     '2024-11-15', category: 'Award',
    excerpt:  'Recognized as the Best Dessert Brand at the 2024 F&B PH Awards.',
  },
  {
    id: 'award-002', icon: '📰', featured: false,
    title:    'Top 10 Filipino Food Brands to Watch — 2024',
    issuer:   'BusinessWorld Philippines',
    date:     '2024-08-01', category: 'Feature',
    excerpt:  'Named one of the Top 10 Filipino Food Brands to Watch in 2024.',
  },
  {
    id: 'award-003', icon: '⭐', featured: false,
    title:    'Franchise Excellence Award — Franchise Asia Philippines 2023',
    issuer:   'Franchise Asia Philippines',
    date:     '2023-09-10', category: 'Award',
    excerpt:  'Honored for outstanding franchise growth and support systems.',
  },
]

const NEWS_POSTS = [
  {
    id: 'news-001', featured: true,
    title:    'Avocadoria Opens in SM Mall of Asia!',
    date:     '2025-05-20', category: 'Store Opening',
    excerpt:  'We are thrilled to announce our newest branch at SM Mall of Asia — bringing happiness to the Bay Area!',
    image:    null,
  },
  {
    id: 'news-002', featured: false,
    title:    'New Product Alert: Biscoff Lover is here!',
    date:     '2025-04-10', category: 'New Product',
    excerpt:  'Meet our newest creation — layers of creamy avocado, Biscoff drizzle, and our signature crumble base.',
    image:    null,
  },
  {
    id: 'news-003', featured: false,
    title:    'Avocadoria Hits 50 Branches!',
    date:     '2025-02-01', category: 'Milestone',
    excerpt:  'We just opened our 50th branch! Thank you to every customer, franchisee, and avocado farmer who made this possible.',
    image:    null,
  },
]

const AVO_CARES = [
  {
    id: 'cares-001', icon: '🌱', featured: true,
    title:    'Rooted in Growth — Planting 1,000 Avocado Trees',
    date:     '2025-03-15', category: 'Environment',
    excerpt:  'Avocadoria partnered with local farmers to plant 1,000 avocado trees across Benguet — investing in the future of Filipino agriculture and the planet.',
    image:    '/avo-cares-planting.webp',
  },
  {
    id: 'cares-002', icon: '🌿', featured: false,
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
    <div style={{ background: fromColor, lineHeight: 0 }}>
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
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
      <div style={{
        fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        color: 'var(--c-olive)', lineHeight: 1,
        textShadow: STROKE,
      }}>{val || stat.num}</div>
      <div style={{
        fontFamily: 'Nunito, sans-serif',
        fontSize: '12px', color: 'rgba(255,255,255,0.8)',
        marginTop: '6px', letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>{stat.label}</div>
    </div>
  )
}

function SectionLabel({ text, color = 'var(--c-pink)' }) {
  return (
    <span style={{
      display: 'inline-block', marginBottom: '12px',
      background: color, color: '#fff',
      fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: '800',
      letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '5px 18px', borderRadius: '999px',
    }}>{text}</span>
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
          ? <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ fontSize: '48px' }}>🥑</span>
        }
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{
            background: post.featured ? 'var(--c-olive)' : 'rgba(182,197,72,0.15)',
            color: post.featured ? '#fff' : 'var(--c-dark)',
            fontFamily: 'Nunito, sans-serif', fontSize: '10px', fontWeight: '800',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: '999px',
          }}>{post.featured ? 'Featured' : post.category}</span>
          <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.5)' }}>
            {fmt(post.date)}
          </span>
        </div>
        <h3 style={{
          fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
          fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 'normal',
          color: 'var(--c-dark)', margin: 0, lineHeight: 1.3,
        }}>{post.title}</h3>
        <p style={{
          fontFamily: 'Nunito, sans-serif', fontSize: '13px',
          color: 'rgba(138,95,60,0.8)', lineHeight: 1.65, margin: 0, flex: 1,
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
          font-family: 'BubbleboddyNeue';
          src: url('/fonts/bubbleboddyneueinline-extrabold.ttf') format('truetype');
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
          font-family: 'Nunito', sans-serif;
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
        {/* franchisebg.svg as full background */}
        <img
          src="/franchisebg.svg"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Light overlay — keeps text readable on bright bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(217,226,158,0.45)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>

          {/* Est. badge */}
          <div className="about-hero-text">
            <span style={{
              display: 'inline-block', marginBottom: '20px',
              background: 'var(--c-pink)', color: '#fff',
              fontFamily: 'Nunito, sans-serif', fontSize: '11px', fontWeight: '800',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '5px 20px', borderRadius: '999px',
            }}>
              Est. 2019 · Philippines No. 1 🥑
            </span>

            {/* Tagline quote */}
            <p style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
              fontSize: 'clamp(13px, 1.4vw, 16px)',
              color: 'var(--c-dark)',
              margin: '0 0 10px', letterSpacing: '0.03em',
              textShadow: 'none',
            }}>{BRAND.tagline}</p>

            {/* Main headline */}
            <h1 style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
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
              fontFamily: 'Nunito, sans-serif',
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
      <div id="our-story" className="about-section" style={{ background: '#d9e29e', padding: 'clamp(52px,7vw,88px) clamp(20px,5vw,72px)' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

          {/* ── "Our Story" heading — top-left, bold, dark green, matches slide ── */}
          <h2 style={{
            fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            color: 'var(--c-dark)',
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
                  />
                </div>
                <div className="about-founder-badge">
                  <span style={{
                    fontFamily: 'Nunito, sans-serif',
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
                    fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
                    fontSize: 'clamp(15px, 1.6vw, 19px)',
                    fontWeight: 'normal', color: 'var(--c-dark)',
                    margin: 0, lineHeight: 1.2,
                  }}>Chef Czarina Sevilla</p>
                  <p style={{
                    fontFamily: 'Nunito, sans-serif',
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
                        fontFamily: 'Nunito, sans-serif', fontSize: '10px', fontWeight: '800',
                        letterSpacing: '0.07em', textTransform: 'uppercase',
                        padding: '3px 12px', borderRadius: '999px',
                      }}>{sec.badge}</span>
                    </div>
                    <h3 style={{
                      fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
                      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                      fontWeight: 'normal', color: 'var(--c-dark)',
                      margin: '0 0 10px', lineHeight: 1.2,
                    }}>{sec.title}</h3>
                    <p style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontSize: '13px', lineHeight: 1.8,
                      color: 'rgba(138,95,60,0.85)', margin: 0,
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
          RECOGNITIONS — dark olive bg with franchisebg overlay
      ══════════════════════════════════════════════════════════════ */}
      <div id="recognitions" className="about-section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* franchisebg as section bg */}
        <img src="/franchisebg.svg" aria-hidden="true" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0, opacity: 0.35,
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'rgba(28,56,20,0.60)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto', padding: 'clamp(52px,8vw,88px) clamp(20px,5vw,72px)' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <SectionLabel text="Recognitions 🏆" color="var(--c-olive)" />
            <h2 style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 'normal', color: '#fff',
              textShadow: '0 3px 16px rgba(0,0,0,0.4)',
              margin: '0 0 12px', lineHeight: 1.1,
            }}>Awards & Milestones</h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 'clamp(14px, 1.5vw, 16px)',
              color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.65,
            }}>The moments that mark our journey.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {RECOGNITIONS.map((rec) => (
              <div key={rec.id} className="about-recognition-row">
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', flexShrink: 0,
                  background: rec.featured ? 'var(--c-olive)' : 'rgba(182,197,72,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px',
                }}>{rec.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '6px', alignItems: 'center' }}>
                    <span style={{
                      background: rec.featured ? 'var(--c-olive)' : 'rgba(182,197,72,0.15)',
                      color: rec.featured ? '#fff' : 'var(--c-dark)',
                      fontFamily: 'Nunito, sans-serif', fontSize: '10px', fontWeight: '800',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      padding: '3px 10px', borderRadius: '999px',
                    }}>{rec.category}</span>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.55)' }}>
                      {fmt(rec.date)} · {rec.issuer}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: 'Nunito, sans-serif', fontWeight: '800',
                    fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'var(--c-dark)',
                    margin: '0 0 6px', lineHeight: 1.3,
                  }}>{rec.title}</h3>
                  <p style={{
                    fontFamily: 'Nunito, sans-serif', fontSize: '13px',
                    color: 'rgba(138,95,60,0.8)', lineHeight: 1.6, margin: 0,
                  }}>{rec.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave out */}
      <Wave fromColor="#3a6b35" toColor="#F4FAEC" height={56} />

      {/* ══════════════════════════════════════════════════════════════
          WHAT'S NEW
      ══════════════════════════════════════════════════════════════ */}
      <div id="whats-new" className="about-section" style={{ background: '#F4FAEC', padding: 'clamp(52px,8vw,88px) clamp(20px,5vw,72px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
            <div>
              <SectionLabel text="What's New" color="var(--c-pink)" />
              <h2 style={{
                fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 'normal', color: 'var(--c-dark)',
                margin: '0 0 6px', lineHeight: 1.1,
              }}>Latest from Avocadoria</h2>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '14px', color: 'rgba(138,95,60,0.65)', margin: 0 }}>
                New branches, products, and announcements.
              </p>
            </div>
          </div>
          <div className="about-news-grid">
            {NEWS_POSTS.map(post => <NewsCard key={post.id} post={post} />)}
          </div>
        </div>
      </div>

      {/* Wave into avo cares */}
      <Wave fromColor="#F4FAEC" toColor="#d9e29e" height={48} />

      {/* ══════════════════════════════════════════════════════════════
          AVO CARES
      ══════════════════════════════════════════════════════════════ */}
      <div id="avo-cares" className="about-section" style={{ background: '#d9e29e', padding: 'clamp(52px,8vw,88px) clamp(20px,5vw,72px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <SectionLabel text="Avo Cares 🌱" color="var(--c-dark)" />
            <h2 style={{
              fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 'normal', color: 'var(--c-olive)',
              textShadow: STROKE, margin: '0 0 12px', lineHeight: 1.1,
            }}>Spreading Happiness Beyond Our Cups</h2>
            <p style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 'clamp(14px, 1.5vw, 17px)',
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
                      fontFamily: 'Nunito, sans-serif', fontSize: '10px', fontWeight: '800',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      padding: '3px 10px', borderRadius: '999px',
                    }}>{item.category}</span>
                    <span style={{ fontFamily: 'Nunito, sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.5)' }}>
                      {fmt(item.date)}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
                    fontSize: 'clamp(14px, 1.5vw, 18px)', fontWeight: 'normal',
                    color: 'var(--c-dark)', margin: 0, lineHeight: 1.3,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: 'Nunito, sans-serif', fontSize: '13px',
                    color: 'rgba(138,95,60,0.8)', lineHeight: 1.7, margin: 0,
                  }}>{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave + tagline strip */}
      <Wave fromColor="#d9e29e" toColor="#b6c548" height={50} />
      <div style={{ background: '#b6c548', padding: '28px 32px', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'BubbleboddyNeue', 'Nunito', sans-serif",
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
