import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '@/components/ui/SEO'

// ─── Cart slideshow config — edit here ───────────────────────────────────────
const CART_INTERVAL = 5000 // ms between auto-advance (5000 = 5 seconds)

const CARTS = [
  {
    id:          'food-truck',
    image:       '/franchise-food-truck.webp',
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
    image:       '/franchise-island.webp',
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
    id:          'kiosk',
    image:       '/franchise-kiosk.webp',
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
    title: 'Inquiry / Initial Contact',
    desc:  'Fill out the franchise inquiry form below or reach out via email. Tell us about yourself and your preferred location.',
  },
  {
    num:   '02',
    title: 'Evaluation / Qualification',
    desc:  'Our franchise team reviews your application and evaluates your qualifications, financial capacity, and business background.',
  },
  {
    num:   '03',
    title: 'Invitation for Meeting',
    desc:  'Qualified applicants are invited for a meeting at our Head Office or via Zoom to discuss the opportunity in detail.',
  },
  {
    num:   '04',
    title: 'Review and Contract Signing',
    desc:  'Receive the full franchise disclosure documents, review the agreement, and sign once you\'re ready to move forward.',
  },
  {
    num:   '05',
    title: 'Build and Training',
    desc:  'We handle store build-out and provide full training on operations, recipes, and customer service — you\'re never alone.',
  },
  {
    num:   '06',
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
        .cart-showcase { display: grid; grid-template-columns: 6fr 4fr; gap: 48px; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 16px; }
        .cart-form-row { display: grid; grid-template-columns: 7fr 3fr; gap: 16px; }
        .cart-contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 36px; }
        @media (max-width: 767px) {
          .cart-showcase { grid-template-columns: 1fr; gap: 24px; }
          .cart-form-row { grid-template-columns: 1fr; }
          .cart-contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Main showcase ── */}
      <div className="cart-showcase">
        {/* Left — image */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '32px' }}>
          <img
            key={`img-${current}`}
            src={cart.image}
            alt={cart.name}
            className="cart-enter"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: 'unset',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 24px 48px rgba(58,107,53,0.18))',
            }}
                    loading="lazy" decoding="async"
                  />
        </div>

        {/* Right — info */}
        <div key={`info-${current}`} className="cart-info-enter">
          {/* Name + size */}
          <h2 style={{
            fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
            fontWeight: 'normal',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
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
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'Poppins,sans-serif', fontSize: '17px', color: '#8A5F3C' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: cart.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '2px' }}>✓</span>
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
              padding: '14px 32px', borderRadius: '999px',
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

      {/* ── Dot + thumbnail selector — hidden ── */}
      <div style={{ display: 'none' }}>
        {CARTS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { clearInterval(timerRef.current); goTo(i) }}
          >
            {c.name}
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Franchise Inquiry — ${form.name} (${form.format || 'General'})`)
    const body = encodeURIComponent(
`Franchise Inquiry
——————————————————————————
Name:     ${form.name}
Email:    ${form.email}
Phone:    ${form.phone}
——————————————————————————
Preferred Format:   ${form.format || 'Not specified'}
Preferred Location: ${form.location || 'Not specified'}
——————————————————————————
Message:
${form.message || 'None'}
——————————————————————————
Sent via avocadoria.com.ph franchise inquiry form.`
    )
    window.location.href = `mailto:ka.jagto@avocadoria.com.ph?subject=${subject}&body=${body}`
    setSent(true)
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
      <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '26px', color: '#b6c548', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', marginBottom: '8px' }}>
        Thank you for your interest!
      </h3>
      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', maxWidth: '400px', margin: '0 auto' }}>
        Our franchise team will reach out to you within 3–5 business days. Let's spread happiness in avocado together!
      </p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="cart-form-row">
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
          <input required value={form.name} onChange={set('name')} placeholder="Juan dela Cruz" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
          <input required type="email" value={form.email} onChange={set('email')} placeholder="juan@email.com" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
      </div>
      <div className="cart-form-row">
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number *</label>
          <input required value={form.phone} onChange={set('phone')} placeholder="+63 9XX XXX XXXX" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
        <div>
          <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Location</label>
          <input value={form.location} onChange={set('location')} placeholder="City, Province" style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#b6c548'}
            onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,0.35)'}
          />
        </div>
      </div>
      <div>
        <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Cart Format</label>
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
        <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#8A5F3C', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tell us about yourself</label>
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
          fontSize: '14px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s', letterSpacing: '0.02em',
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3a6b35' }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#b6c548' }}
      >
        {loading ? 'Sending...' : 'Submit Franchise Inquiry'}
      </button>
    </form>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FranchisePage() {
  const [hoveredIcon, setHoveredIcon] = useState(null)
  return (
    <>
      {/* Flash keyframe */}
      <style>{`
        @keyframes iconFlash {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.7), 0 6px 20px rgba(58,107,53,0.4); }
          40%  { box-shadow: 0 0 0 18px rgba(255,255,255,0), 0 10px 32px rgba(58,107,53,0.5); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0), 0 6px 20px rgba(58,107,53,0.4); }
        }
        @keyframes iconFlashPhoto {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.7), 0 6px 20px rgba(182,197,72,0.45); }
          40%  { box-shadow: 0 0 0 18px rgba(255,255,255,0), 0 10px 32px rgba(182,197,72,0.55); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0), 0 6px 20px rgba(182,197,72,0.45); }
        }
        .gallery-icon-video:hover  { animation: iconFlash 0.5s ease-out; transform: scale(1.15) translateY(-4px) !important; }
        .gallery-icon-photo:hover  { animation: iconFlashPhoto 0.5s ease-out; transform: scale(1.15) translateY(-4px) !important; }
      `}</style>
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
          padding: '80px 32px 48px', textAlign: 'center',
        }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'700px', margin:'0 auto' }}>
            <h1 style={{
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontWeight: 'normal',
              fontSize: 'clamp(2.2rem,5vw,3.8rem)',
              color: 'var(--c-olive)',
              textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff',
              margin: '0 0 8px', lineHeight: 1.1,
            }}>
              Join the <span style={{ color: '#b6c548' }}>Avocadoria</span> Family
            </h1>
            <a href="#franchise-inquiry" style={{
              display: 'inline-block', background: 'var(--c-pink)', color: '#fff',
              padding: '14px 36px', borderRadius: '999px',
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '1.1rem', fontWeight: 'normal',
              textDecoration: 'none', transition: 'background 0.2s',
              boxShadow: '0 4px 16px rgba(239,126,203,0.4)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#d94faa'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--c-pink)'}
            >
              Start Your Journey →
            </a>
          </div>
        </section>

        {/* ── CART SLIDESHOW ── */}
        <section style={{ position:'relative', overflow:'visible', padding:'clamp(32px,6vw,72px) 0', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin: '0 0 8px', lineHeight: 1.1 }}>
              Choose Your Format
            </h2>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: 'rgba(138,95,60,0.7)', margin: 0 }}>
              Four store types. One brand. Endless happiness.
            </p>
          </div>
          <div style={{ position:'relative', zIndex:1 }}><CartSlideshow /></div>
        </section>

        {/* ── WHY AVOCADORIA ── */}
        <section style={{ position:'relative', overflow:'hidden', padding:'clamp(32px,6vw,72px) clamp(16px,4vw,32px)', textAlign:'center', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin: '0 0 48px', lineHeight: 1.1 }}>
              Why Franchise Avocadoria?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              {[
                { title: 'No. 1 Brand',    desc: 'Philippines\' leading avocado-based dessert brand' },
                { title: '7+ Years',       desc: 'Proven track record and loyal customer base' },
                { title: 'Full Support',   desc: 'Training, operations, and marketing support' },
                { title: 'Growing Market', desc: 'Health-conscious food market is booming in PH' },
                { title: 'Local Roots',    desc: 'Proudly supports local avocado farmers' },
              ].map((w, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '28px 20px',
                  backdropFilter: 'blur(2px)',
                }}>
                  <div style={{
                    fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: 'clamp(17px,1.8vw,20px)', fontWeight: 'normal',
                    color: '#b6c548', letterSpacing: '0.04em',
                    marginBottom: '12px',
                    textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
                  }}>{w.title}</div>
                  <div style={{
                    fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: '500',
                    color: '#8A5F3C', lineHeight: '1.6',
                    textShadow: '0 1px 0 rgba(255,255,255,0.9)',
                  }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ position:'relative', overflow:'hidden', padding:'clamp(32px,6vw,72px) clamp(16px,4vw,32px)', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '52px' }}>
              <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin: '0 0 8px', lineHeight: 1.1 }}>
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
                    <div style={{ position: 'absolute', left: '24px', top: '52px', width: '2px', height: 'calc(100% - 20px)', background: 'rgba(182,197,72,0.45)', zIndex: 0 }} />
                  )}
                  {/* Step number circle */}
                  <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', background: '#b6c548', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, boxShadow: '0 4px 14px rgba(182,197,72,0.35)' }}>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '800', color: '#fff', letterSpacing: '0.02em' }}>{step.num}</span>
                  </div>
                  {/* Content */}
                  <div style={{ paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.08em' }}>STEP {step.num}</span>
                      <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#b6c548', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', margin: 0, lineHeight: 1.2 }}>{step.title}</h3>
                    </div>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '16px', color: 'rgba(138,95,60,0.8)', lineHeight: '1.65', margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INQUIRY FORM ── */}
        <section id="franchise-inquiry" style={{ position:'relative', overflow:'hidden', padding:'clamp(32px,6vw,72px) clamp(16px,4vw,32px)', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin: '0 0 8px', lineHeight: 1.1 }}>
                Ready to Join the Family?
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', opacity: 0.85 }}>
                Fill out the form below and our franchise team will get back to you within 3–5 business days.
              </p>
            </div>

            {/* Contact options */}
            <div className="cart-contact-grid">
              {[
                { label: 'Email',      value: 'ka.jagto@avocadoria.com.ph', href: 'mailto:ka.jagto@avocadoria.com.ph' },
                { label: 'Call / SMS', value: '+63 945 971 6599',           href: 'tel:+639459716599' },
                { label: 'Messenger',  value: 'Message us on FB',           href: 'https://m.me/avocadoria.ph' },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  background: 'transparent', borderRadius: '14px', padding: '18px 12px',
                  textDecoration: 'none', border: '1.5px solid rgba(182,197,72,0.4)',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#b6c548' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(182,197,72,0.3)' }}
                >
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#b6c548', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.label}</span>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', textAlign: 'center', lineHeight: 1.4 }}>{c.value}</span>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(182,197,72,0.3)' }}/>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: 'rgba(138,95,60,0.6)', whiteSpace: 'nowrap' }}>or fill out the form</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(182,197,72,0.3)' }}/>
            </div>

            {/* Form */}
            <div style={{ background: 'transparent', borderRadius: '20px', padding: '36px', border: 'none' }}>
              <InquiryForm />
            </div>
          </div>
        </section>

      </div>

    </>
  )
}