import { useState, useEffect, useRef } from 'react'
import SEO from '@/components/ui/SEO'

// ─── Cart slideshow config — edit here ───────────────────────────────────────
const CART_INTERVAL = 5000 // ms between auto-advance (5000 = 5 seconds)

const CARTS = [
  {
    id:          'food-truck',
    image:       '/franchise-food-truck.png',
    name:        'Food Truck',
    size:        '10 sqm',
    color:       '#b6c548',
    tag:         'Most Mobile',
    tagColor:    '#EF7ECB',
    highlights:  [
      'Perfect for events, bazaars & festivals',
      'Pick-up + Order window layout',
      'Fully branded with illuminated signage',
      'Easy to relocate — maximum reach',
    ],
    investment:  'Contact us for pricing',
  },
  {
    id:          'island',
    image:       '/franchise-island.png',
    name:        'Island',
    size:        '20 sqm',
    color:       '#3a6b35',
    tag:         'Best Value',
    tagColor:    '#DFD438',
    highlights:  [
      'Integrated seating area for dwell time',
      'Largest format — premium mall presence',
      'Dedicated prep + service zones',
      'Scalable layout for high foot traffic',
    ],
    investment:  'Contact us for pricing',
  },
  {
    id:          'popup',
    image:       '/franchise-popup.png',
    name:        'Pop Up',
    size:        '6 sqm',
    color:       '#EF7ECB',
    tag:         'Entry Level',
    tagColor:    '#b6c548',
    highlights:  [
      'Most affordable entry point',
      'Illuminated Avocadoria branding wall',
      'Built-in digital display screen',
      'Compact & efficient — fits any space',
    ],
    investment:  'Contact us for pricing',
  },
  {
    id:          'kiosk',
    image:       '/franchise-kiosk.png',
    name:        'Kiosk',
    size:        '6.25 sqm',
    color:       '#8A5F3C',
    tag:         'Most Popular',
    tagColor:    '#b6c548',
    highlights:  [
      'Iconic avocado drip counter design',
      'Signature curved architecture',
      'Open layout — fast Order → Pick-Up flow',
      'Premium finish, strong brand visibility',
    ],
    investment:  'Contact us for pricing',
  },
]

const STEPS = [
  {
    num:   '01',
    icon:  '📋',
    title: 'Submit Inquiry',
    desc:  'Fill out the franchise inquiry form below or reach out via email. Tell us about yourself and your preferred location.',
  },
  {
    num:   '02',
    icon:  '📞',
    title: 'Initial Call',
    desc:  "Our franchise team will contact you within 3–5 business days to discuss requirements, investment details, and answer your questions.",
  },
  {
    num:   '03',
    icon:  '📄',
    title: 'Review & Sign',
    desc:  'Receive the full franchise disclosure documents, review the agreement, and sign once you\'re ready to move forward.',
  },
  {
    num:   '04',
    icon:  '🏗️',
    title: 'Build & Train',
    desc:  'We handle store build-out and provide full training on operations, recipes, and customer service — you\'re never alone.',
  },
  {
    num:   '05',
    icon:  '🥑',
    title: 'Grand Opening',
    desc:  "Launch your Avocadoria store with our team's full support. Start spreading happiness in avocado!",
  },
]

// ─── Cart Slideshow ───────────────────────────────────────────────────────────
function CartSlideshow() {
  const [current, setCurrent]   = useState(0)
  const [prev,    setPrev]      = useState(null)
  const [fading,  setFading]    = useState(false)
  const timerRef                = useRef(null)

  const goTo = (idx) => {
    if (idx === current) return
    setPrev(current)
    setFading(true)
    setCurrent(idx)
    setTimeout(() => { setPrev(null); setFading(false) }, 600)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      goTo((current + 1) % CARTS.length)
    }, CART_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [current])

  const cart = CARTS[current]

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        @keyframes slide-in-right { from { opacity:0; transform:translateX(40px) } to { opacity:1; transform:translateX(0) } }
        @keyframes slide-in-left  { from { opacity:0; transform:translateX(-40px) } to { opacity:1; transform:translateX(0) } }
        .cart-enter { animation: slide-in-right 0.6s cubic-bezier(.22,1,.36,1) forwards }
        .cart-info-enter { animation: slide-in-left 0.5s cubic-bezier(.22,1,.36,1) forwards }
      `}</style>

      {/* ── Main showcase ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '7fr 3fr',
        gap: '48px',
        alignItems: 'center',
        minHeight: '560px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
      }}
      >
        {/* Left — image */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            key={`img-${current}`}
            src={cart.image}
            alt={cart.name}
            className="cart-enter"
            style={{
              width: '100%',
              height: '520px',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 24px 48px rgba(58,107,53,0.18))',
            }}
          />
        </div>

        {/* Right — info */}
        <div key={`info-${current}`} className="cart-info-enter">
          {/* Tag */}
          <span style={{
            display: 'inline-block',
            background: cart.tagColor,
            color: '#fff',
            fontSize: '11px', fontWeight: '700',
            padding: '4px 12px', borderRadius: '999px',
            fontFamily: 'Poppins,sans-serif',
            letterSpacing: '0.05em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            {cart.tag}
          </span>

          {/* Name + size */}
          <h2 style={{
            fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
            fontWeight: 'normal',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: cart.color,
            lineHeight: '1.1',
            margin: '0 0 6px',
          }}>
            {cart.name}
          </h2>
          <p style={{
            fontFamily: 'Poppins,sans-serif',
            fontSize: '16px', color: '#8A5F3C',
            opacity: 0.7, margin: '0 0 24px',
          }}>
            Store Size: <strong>{cart.size}</strong>
          </p>

          {/* Highlights */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {cart.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: cart.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>✓</span>
                {h}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#franchise-inquiry"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: cart.color, color: '#fff',
              padding: '12px 28px', borderRadius: '999px',
              fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '700',
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Inquire About This Format →
          </a>
        </div>
      </div>

      {/* ── Dot + thumbnail selector ── */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
        {CARTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { clearInterval(timerRef.current); goTo(i) }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              background: i === current ? '#F4FAEC' : 'transparent',
              border: `2px solid ${i === current ? c.color : 'rgba(182,197,72,0.25)'}`,
              borderRadius: '12px', padding: '8px 16px',
              cursor: 'pointer', transition: 'all 0.2s',
              fontFamily: 'Poppins,sans-serif',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: '700', color: i === current ? c.color : '#8A5F3C' }}>
              {c.name}
            </span>
            <span style={{ fontSize: '11px', color: 'rgba(138,95,60,0.6)' }}>{c.size}</span>
            {/* Progress bar on active */}
            {i === current && (
              <div style={{ width: '100%', height: '3px', background: 'rgba(182,197,72,0.2)', borderRadius: '99px', overflow: 'hidden' }}>
                <div
                  key={`prog-${current}`}
                  style={{
                    height: '100%', background: c.color, borderRadius: '99px',
                    animation: `prog-fill ${CART_INTERVAL}ms linear forwards`,
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </div>
      <style>{`@keyframes prog-fill { from { width:0% } to { width:100% } }`}</style>
    </div>
  )
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────
function InquiryForm() {
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', location: '', format: '', message: '' })

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Replace with your Formspree endpoint: https://formspree.io/f/YOUR_ID
    try {
      await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch { setSent(true) }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1.5px solid rgba(182,197,72,0.35)',
    borderRadius: '12px', background: 'rgba(255,255,255,0.7)',
    fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  if (sent) return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>🥑</div>
      <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '26px', color: '#b6c548', marginBottom: '8px' }}>
        Thank you for your interest!
      </h3>
      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', maxWidth: '400px', margin: '0 auto' }}>
        Our franchise team will reach out to you within 3–5 business days. Let's spread happiness in avocado together!
      </p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '16px' }}>
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Juan dela Cruz" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="juan@email.com" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '16px' }}>
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number *</label>
          <input required value={form.phone} onChange={set('phone')} placeholder="+63 9XX XXX XXXX" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Location</label>
          <input value={form.location} onChange={set('location')} placeholder="City, Province" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
      </div>
      <div>
        <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Cart Format</label>
        <select value={form.format} onChange={set('format')} style={{ ...inputStyle, cursor: 'pointer' }}
          onFocus={e => e.target.style.borderColor = '#b6c548'}
          onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
        >
          <option value="">Select a format...</option>
          {CARTS.map(c => <option key={c.id} value={c.name}>{c.name} — {c.size}</option>)}
          <option value="undecided">Not sure yet</option>
        </select>
      </div>
      <div>
        <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tell us about yourself</label>
        <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Share your business experience, why you want to franchise Avocadoria, and any questions you have..." style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={e => e.target.style.borderColor = '#b6c548'}
          onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          background: loading ? 'rgba(182,197,72,0.5)' : '#b6c548',
          color: '#fff', border: 'none', borderRadius: '999px',
          padding: '14px 32px', fontFamily: 'Poppins,sans-serif',
          fontSize: '16px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s', letterSpacing: '0.02em',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3a6b35' }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#b6c548' }}
      >
        {loading ? 'Sending...' : 'Submit Franchise Inquiry 🥑'}
      </button>
    </form>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FranchisePage() {
  return (
    <>
      <SEO
        title="Franchise"
        description="Own your Avocadoria franchise. Choose from Food Truck, Island, Pop Up, or Kiosk formats. Spread happiness in avocado!"
        path="/franchise"
      />
      <div className="page-enter">

        {/* ── HERO ── */}
        <section style={{
          position:'relative', overflow:'hidden',
          backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE',
          padding: '100px 32px 80px',
          textAlign: 'center',
        }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth: '700px', margin: '0 auto' }}>
            <span style={{
              display: 'inline-block', background: '#EF7ECB', color: '#fff',
              fontSize: '12px', fontWeight: '700', padding: '5px 16px',
              borderRadius: '999px', fontFamily: 'Poppins,sans-serif',
              letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px',
            }}>Now Open for Franchising</span>
            <h1 style={{
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              color: '#3a6b35', lineHeight: '1.1', margin: '0 0 20px',
            }}>
              Dreaming of your own<br />
              <span style={{ color: '#b6c548' }}>Avocadoria</span> store?
            </h1>
            <p style={{
              fontFamily: 'Poppins,sans-serif', fontSize: '17px',
              color: '#8A5F3C', lineHeight: '1.7', margin: '0 0 32px', opacity: 0.85,
            }}>
              Be part of our growing family. We offer four flexible store formats designed for every location and investment level — all powered by the Philippines' No. 1 avocado dessert brand.
            </p>
            <a href="#franchise-inquiry" style={{
              display: 'inline-block', background: '#b6c548', color: '#fff',
              padding: '14px 36px', borderRadius: '999px',
              fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: '800',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
              onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
            >
              Start Your Journey →
            </a>
          </div>
        </section>

        {/* ── CART SLIDESHOW ── */}
        <section style={{ position:'relative', overflow:'hidden', padding:'72px 0', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#3a6b35', margin: '0 0 8px' }}>
              Choose Your Format
            </h2>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: 'rgba(138,95,60,0.7)', margin: 0 }}>
              Four store types. One brand. Endless happiness.
            </p>
          </div>
          <div style={{ position:'relative', zIndex:1 }}><CartSlideshow /></div>
        </section>

        {/* ── WHY AVOCADORIA ── */}
        <section style={{ position:'relative', overflow:'hidden', padding:'72px 32px', textAlign:'center', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#3a6b35', margin: '0 0 48px' }}>
              Why Franchise Avocadoria?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {[
                { icon: '🏆', title: 'No. 1 Brand',    desc: 'Philippines\' leading avocado-based dessert brand' },
                { icon: '🥑', title: '7+ Years',       desc: 'Proven track record and loyal customer base' },
                { icon: '🤝', title: 'Full Support',   desc: 'Training, operations, and marketing support' },
                { icon: '📈', title: 'Growing Market', desc: 'Health-conscious food market is booming in PH' },
                { icon: '🌱', title: 'Local Roots',    desc: 'Proudly supports local avocado farmers' },
              ].map((w, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.82)', borderRadius: '16px',
                  padding: '28px 20px', backdropFilter: 'blur(6px)',
                  border: '1.5px solid rgba(182,197,72,0.3)',
                  boxShadow: '0 4px 20px rgba(58,107,53,0.08)',
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{w.icon}</div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '17px', color: '#3a6b35', marginBottom: '6px' }}>{w.title}</div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', lineHeight: '1.6' }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ position:'relative', overflow:'hidden', padding:'72px 32px', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#3a6b35', margin: '0 0 8px' }}>
                How to Get Started
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: 'rgba(138,95,60,0.7)' }}>
                From inquiry to grand opening — here's the journey.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {STEPS.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', position: 'relative', paddingBottom: i < STEPS.length - 1 ? '36px' : '0' }}>
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div style={{ position: 'absolute', left: '28px', top: '56px', width: '2px', height: 'calc(100% - 20px)', background: 'rgba(182,197,72,0.45)', zIndex: 0 }} />
                  )}
                  {/* Step number circle */}
                  <div style={{ flexShrink: 0, width: '56px', height: '56px', borderRadius: '50%', background: '#b6c548', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', position: 'relative', zIndex: 1, boxShadow: '0 4px 14px rgba(182,197,72,0.35)' }}>
                    {step.icon}
                  </div>
                  {/* Content */}
                  <div style={{ paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.08em' }}>STEP {step.num}</span>
                      <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '19px', color: '#3a6b35', margin: 0 }}>{step.title}</h3>
                    </div>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: 'rgba(138,95,60,0.8)', lineHeight: '1.65', margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INQUIRY FORM ── */}
        <section id="franchise-inquiry" style={{ position:'relative', overflow:'hidden', padding:'72px 32px', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#3a6b35', margin: '0 0 8px' }}>
                Ready to Join the Family?
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', opacity: 0.85 }}>
                Fill out the form below and our franchise team will get back to you within 3–5 business days.
              </p>
            </div>

            {/* Contact options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '36px' }}>
              {[
                { icon: '📧', label: 'Email',    value: 'official@avocadoria.com.ph', href: 'mailto:official@avocadoria.com.ph' },
                { icon: '📞', label: 'Call / SMS', value: '+63 945 971 6599',        href: 'tel:+639459716599' },
                { icon: '💬', label: 'Messenger', value: 'Message us on FB',         href: 'https://m.me/avocadoria.ph' },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  background: 'rgba(255,255,255,0.7)', borderRadius: '14px', padding: '16px 12px',
                  textDecoration: 'none', border: '1.5px solid rgba(182,197,72,0.3)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#b6c548' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(182,197,72,0.3)' }}
                >
                  <span style={{ fontSize: '22px' }}>{c.icon}</span>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</span>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#8A5F3C', textAlign: 'center' }}>{c.value}</span>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(182,197,72,0.3)' }}/>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: 'rgba(138,95,60,0.6)', whiteSpace: 'nowrap' }}>or fill out the form</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(182,197,72,0.3)' }}/>
            </div>

            {/* Form */}
            <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '20px', padding: '36px', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.9)' }}>
              <InquiryForm />
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
