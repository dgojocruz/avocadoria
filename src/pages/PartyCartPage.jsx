import { useState } from 'react'
import SEO from '@/components/ui/SEO'

// ─── Package data (real client packages) ─────────────────────────────────────
const PACKAGES = [
  {
    id:        'avo-lover',
    name:      'Avocado Lover',
    size:      '8oz',
    image:     '/menu/Soft Serve Menu/lover.webp',
    color:     '#b6c548',
    tag:       'Classic',
    price:     '₱23,000',
    priceNote: 'starts at',
    cups:      '100 cups',
    inclusions: [
      'Booth setup cart',
      'Serving — 5 hours',
      '2 staff with complete uniform',
      'Transportation',
    ],
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    note: 'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
  },
  {
    id:        'avo-biscoff',
    name:      'Avocado Biscoff',
    size:      '12oz',
    image:     '/menu/Soft Serve Menu/biscoff-lover.webp',
    color:     '#C49A3C',
    tag:       'Fan Favourite',
    price:     '₱35,000',
    priceNote: 'starts at',
    cups:      '100 cups',
    inclusions: [
      'Booth setup cart',
      'Serving — 5 hours',
      '2 staff with complete uniform',
      'Transportation',
    ],
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    note: 'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
  },
  {
    id:        'avo-pistachio',
    name:      'Avocado Pistachio Knafe Lover',
    size:      '12oz',
    image:     '/menu/Soft Serve Menu/pistachio-lover.webp',
    color:     '#6B8E3E',
    tag:       'Premium',
    price:     '₱40,000',
    priceNote: 'starts at',
    cups:      '100 cups',
    inclusions: [
      'Booth setup cart',
      'Serving — 5 hours',
      '2 staff with complete uniform',
      'Transportation',
    ],
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    note: 'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
  },
]

// ─── How It Works ─────────────────────────────────────────────────────────────
const STEPS = [
  { num: '01', title: 'Pick Your Package',   desc: 'Browse our packages below and choose the one that fits your celebration. Each card shows exactly what is included.' },
  { num: '02', title: 'Submit Your Inquiry', desc: 'Fill out the booking form with your event details. Takes less than 2 minutes — no commitment required.' },
  { num: '03', title: 'We Reach Out',        desc: 'Our party team will contact you within 24–48 hours to confirm availability, finalize details, and answer questions.' },
  { num: '04', title: 'Party Time!',         desc: 'We show up, set up, and serve your guests. You just enjoy the celebration — we handle the rest.' },
]

// ─── Booking Modal ────────────────────────────────────────────────────────────
function BookingModal({ pkg, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '', venue: '', notes: '' })
  const [sent, setSent]   = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid rgba(182,197,72,0.35)',
    borderRadius: '12px', background: 'rgba(255,255,255,0.8)',
    fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
  }
  const labelStyle = {
    fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700',
    color: '#8A5F3C', display: 'block', marginBottom: '5px',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Party Cart Booking — ${pkg.name} ${pkg.size} — ${form.name}`)
    const body = encodeURIComponent(
`New Party Cart Booking Inquiry

Package: ${pkg.name} ${pkg.size} — ${pkg.cups} — ${pkg.price}
——————————————————————
Name:    ${form.name}
Email:   ${form.email}
Phone:   ${form.phone}

Event Date:  ${form.date}
Time:        ${form.time}
Guests:      ${form.guests || 'Not specified'}
Venue:       ${form.venue || 'TBD'}

Notes / Special Requests:
${form.notes || 'None'}
——————————————————————
Please follow up within 24–48 hours.`
    )
    window.location.href = `mailto:official@avocadoria.com.ph?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(58,107,53,0.6)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div style={{ background: '#fff', borderRadius: '24px', border: `3px solid ${pkg.color}`, boxShadow: `8px 8px 0 ${pkg.color}40`, width: '100%', maxWidth: '520px', maxHeight: '92vh', overflowY: 'auto', padding: 'clamp(20px,4vw,32px)' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#b6c548', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '28px', color: '#fff', fontWeight: '800' }}>✓</span>
            </div>
            <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '24px', color: '#b6c548', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', marginBottom: '10px' }}>
              Booking inquiry sent!
            </h3>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto 24px' }}>
              Your email app should have opened with the inquiry for <strong>{pkg.name}</strong>. Our party team will get back to you within 24–48 hours!
            </p>
            <button onClick={onClose} style={{ background: '#b6c548', color: '#fff', border: 'none', borderRadius: '999px', padding: '13px 28px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '800', cursor: 'pointer', minHeight: '44px' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(17px,3.5vw,21px)', color: pkg.color, margin: '0 0 4px', textShadow: '-1px -1px 0 #fff, 1px 1px 0 #fff' }}>
                  {pkg.name}
                </h2>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', margin: 0 }}>
                  {pkg.size} &nbsp;·&nbsp; {pkg.cups} &nbsp;·&nbsp; {pkg.priceNote} {pkg.price}
                </p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#8A5F3C', padding: '4px', lineHeight: 1, minHeight: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ borderTop: '1.5px solid rgba(182,197,72,0.3)', paddingTop: '20px' }}>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#3a6b35', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Tell us about your party
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div><label style={labelStyle}>Your name *</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Maria Santos" style={inputStyle}
                      onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                  <div><label style={labelStyle}>Mobile number *</label>
                    <input required value={form.phone} onChange={set('phone')} placeholder="09XX XXX XXXX" style={inputStyle}
                      onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                </div>
                <div><label style={labelStyle}>Email address *</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="maria@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div><label style={labelStyle}>Event date *</label>
                    <input required type="date" value={form.date} onChange={set('date')} style={inputStyle}
                      onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                  <div><label style={labelStyle}>Preferred time *</label>
                    <input required type="time" value={form.time} onChange={set('time')} style={inputStyle}
                      onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div><label style={labelStyle}>Expected guests</label>
                    <input type="number" min="1" value={form.guests} onChange={set('guests')} placeholder="e.g. 80" style={inputStyle}
                      onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                  <div><label style={labelStyle}>Venue / location</label>
                    <input value={form.venue} onChange={set('venue')} placeholder="City or venue name" style={inputStyle}
                      onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                </div>
                <div><label style={labelStyle}>Special requests or notes</label>
                  <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Toppings, add-ons, theme notes..." style={{ ...inputStyle, resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor='#b6c548'} onBlur={e => e.target.style.borderColor='rgba(182,197,72,0.35)'} /></div>
                <button type="submit"
                  style={{ background: '#b6c548', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 24px', fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'background 0.2s', minHeight: '48px' }}
                  onMouseEnter={e => e.currentTarget.style.background='#3a6b35'}
                  onMouseLeave={e => e.currentTarget.style.background='#b6c548'}
                >
                  Send Booking Inquiry
                </button>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#8A5F3C', opacity: 0.6, textAlign: 'center', margin: 0 }}>
                  This opens your email app with your details pre-filled. Our team responds within 24–48 hours.
                </p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg, onBook }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{
      background: '#fff',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1.5px solid rgba(182,197,72,0.25)',
      boxShadow: '0 8px 40px rgba(58,107,53,0.10)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(58,107,53,0.16)' }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 40px rgba(58,107,53,0.10)' }}
    >
      {/* Product image */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: `${pkg.color}18` }}>
        <img
          src={pkg.image}
          alt={pkg.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
        {/* Tag badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', background: pkg.color, color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '999px' }}>
          {pkg.tag}
        </div>
        {/* Size badge */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.92)', color: '#3a6b35', fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '999px', border: '1.5px solid rgba(182,197,72,0.4)' }}>
          {pkg.size}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '24px 24px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Name + price */}
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(17px,2vw,20px)', color: '#3a6b35', margin: '0 0 6px', lineHeight: 1.2, textShadow: '-1px -1px 0 rgba(255,255,255,0.9), 1px 1px 0 rgba(255,255,255,0.9)' }}>
            {pkg.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '22px', fontWeight: '800', color: pkg.color }}>{pkg.price}</span>
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#8A5F3C', opacity: 0.7 }}>{pkg.priceNote} · {pkg.cups}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(182,197,72,0.2)', marginBottom: '16px' }} />

        {/* Inclusions always visible */}
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
            Inclusions
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {pkg.inclusions.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', lineHeight: 1.4 }}>
                <span style={{ color: pkg.color, fontWeight: '900', flexShrink: 0, fontSize: '12px', marginTop: '2px' }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Add-ons toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0', fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#8A5F3C', opacity: 0.7, letterSpacing: '0.04em', minHeight: '36px' }}
        >
          <span style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block', fontSize: '10px' }}>▶</span>
          ADD-ONS
        </button>

        {open && (
          <ul style={{ margin: '4px 0 8px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {pkg.addons.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#8A5F3C', lineHeight: 1.45, opacity: 0.85 }}>
                <span style={{ color: '#b6c548', flexShrink: 0 }}>+</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Note */}
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '10px', color: '#8A5F3C', opacity: 0.5, lineHeight: 1.5, margin: '8px 0 0', fontStyle: 'italic' }}>
          {pkg.note}
        </p>
      </div>

      {/* Book button */}
      <div style={{ padding: '20px 24px 24px' }}>
        <button
          onClick={() => onBook(pkg)}
          style={{ width: '100%', background: pkg.color, color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 20px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '800', cursor: 'pointer', transition: 'background 0.15s, transform 0.15s', minHeight: '48px', letterSpacing: '0.02em' }}
          onMouseEnter={e => { e.currentTarget.style.background='#3a6b35'; e.currentTarget.style.transform='scale(0.98)' }}
          onMouseLeave={e => { e.currentTarget.style.background=pkg.color; e.currentTarget.style.transform='scale(1)' }}
        >
          Book This Package
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartyCartPage() {
  const [selectedPkg, setSelectedPkg] = useState(null)

  const TEXTURE = {
    backgroundImage: "url('/website_layer_1.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#F3F2EE',
    position: 'relative',
    overflow: 'hidden',
  }
  const OVERLAY = { position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundColor: '#b6c548', opacity: 0.25 }
  const INNER   = { position: 'relative', zIndex: 1 }

  return (
    <>
      <SEO
        title="Party Cart Packages"
        description="Bring Avocadoria to your celebration. Book a party cart package for birthdays, corporate events, and any occasion worth celebrating."
        path="/party-cart"
      />

      {/* ── Hero ── */}
      <section style={{ ...TEXTURE, paddingTop: 'clamp(80px,12vw,120px)', paddingBottom: 0, textAlign: 'center' }}>
        <div style={OVERLAY} />
        <div style={{ ...INNER, padding: '0 var(--sp-md)' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.85)', color: '#3a6b35', borderRadius: '999px', padding: '5px 18px', fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px', border: '1.5px solid rgba(182,197,72,0.4)' }}>
            Party Cart
          </div>
          <h1 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(2rem,8vw,3.5rem)', color: '#3a6b35', margin: '0 0 14px', textShadow: '-2px -2px 0 rgba(255,255,255,0.95), 2px -2px 0 rgba(255,255,255,0.95), -2px 2px 0 rgba(255,255,255,0.95), 2px 2px 0 rgba(255,255,255,0.95), -3px -3px 0 rgba(220,255,80,0.7), 3px 3px 0 rgba(220,255,80,0.7)', lineHeight: 1.1 }}>
            Bring the Party<br />
            <em style={{ color: '#b6c548', fontStyle: 'normal' }}>to You!</em>
          </h1>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(13px,3vw,15px)', color: '#8A5F3C', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.7 }}>
            Make your next celebration unforgettable with an Avocadoria Party Cart. We set up, serve, and bring the good vibes — you just enjoy the moment.
          </p>
          <button
            onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: '#b6c548', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 32px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 18px rgba(182,197,72,0.4)', transition: 'all 0.15s', minHeight: '48px', marginBottom: '48px', letterSpacing: '0.02em' }}
            onMouseEnter={e => e.currentTarget.style.background='#3a6b35'}
            onMouseLeave={e => e.currentTarget.style.background='#b6c548'}
          >
            See Our Packages
          </button>
        </div>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto', marginBottom: '-2px', position: 'relative', zIndex: 1 }}>
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#F3F2EE" />
        </svg>
      </section>

      {/* ── How It Works ── */}
      <section style={{ ...TEXTURE, padding: 'clamp(48px,7vw,80px) var(--sp-md)' }}>
        <div style={OVERLAY} />
        <div style={{ ...INNER, maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>How It Works</p>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.4rem,5vw,2rem)', color: '#3a6b35', margin: 0, textShadow: '-1px -1px 0 rgba(255,255,255,0.9), 1px 1px 0 rgba(255,255,255,0.9)' }}>
              Four easy steps to your perfect party
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px' }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ background: 'rgba(255,255,255,0.82)', borderRadius: '16px', border: '1.5px solid rgba(182,197,72,0.3)', padding: '24px 20px', backdropFilter: 'blur(6px)' }}>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.08em', marginBottom: '8px' }}>{s.num}</div>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: '700', fontSize: '14px', color: '#3a6b35', margin: '0 0 8px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#8A5F3C', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="packages" style={{ ...TEXTURE, padding: 'clamp(48px,7vw,80px) var(--sp-md)' }}>
        <div style={OVERLAY} />
        <div style={{ ...INNER, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px' }}>Our Packages</p>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.4rem,5vw,2rem)', color: '#3a6b35', margin: '0 0 10px', textShadow: '-1px -1px 0 rgba(255,255,255,0.9), 1px 1px 0 rgba(255,255,255,0.9)' }}>
              Pick your celebration flavour
            </h2>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', margin: 0, opacity: 0.8 }}>
              All packages include 100 cups, 5-hour serving, 2 uniformed staff, and transportation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '28px' }}>
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onBook={setSelectedPkg} />
            ))}
          </div>

          {/* Custom quote CTA */}
          <div style={{ marginTop: '48px', background: 'rgba(255,255,255,0.75)', borderRadius: '20px', border: '1.5px solid rgba(182,197,72,0.3)', padding: '28px 32px', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#3a6b35', margin: '0 0 6px' }}>
              Need something custom?
            </p>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', margin: '0 0 16px', lineHeight: 1.6, opacity: 0.85 }}>
              Different flavour, cup count, or event setup? Reach out and we will build a package just for you.
            </p>
            <a href="mailto:official@avocadoria.com.ph" style={{ display: 'inline-flex', alignItems: 'center', background: '#3a6b35', color: '#fff', borderRadius: '999px', padding: '12px 28px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', textDecoration: 'none', minHeight: '44px', letterSpacing: '0.02em' }}>
              Contact Us for a Custom Quote
            </a>
          </div>
        </div>
      </section>

      {/* ── Bottom strip ── */}
      <section style={{ ...TEXTURE, padding: '32px var(--sp-md)', textAlign: 'center' }}>
        <div style={OVERLAY} />
        <p style={{ ...INNER, fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(14px,3vw,18px)', color: '#3a6b35', margin: '0 0 4px', textShadow: '-1px -1px 0 rgba(255,255,255,0.9), 1px 1px 0 rgba(255,255,255,0.9)', display: 'block' }}>
          Happiness in avocado — delivered to your party.
        </p>
        <p style={{ ...INNER, fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#8A5F3C', margin: 0, opacity: 0.6, display: 'block' }}>
          official@avocadoria.com.ph &nbsp;·&nbsp; Prices are subject to change without prior notice.
        </p>
      </section>

      {/* ── Booking Modal ── */}
      {selectedPkg && <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
    </>
  )
}
