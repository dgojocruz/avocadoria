import { useState } from 'react'
import SEO from '@/components/ui/SEO'

// ─── Package data (real client packages) ─────────────────────────────────────
const PACKAGES = [
  {
    id:    'avo-lover',
    name:  'Avocado Lover',
    size:  '8oz',
    image: '/menu/Soft Serve Menu/lover.webp',
    color: '#b6c548',
    tag:   'Classic',
    note:  'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'TBA', serving: '3 hours' },
      100: { price: '₱23,000', serving: '5 hours' },
    },
  },
  {
    id:    'avo-biscoff',
    name:  'Avocado Biscoff',
    size:  '12oz',
    image: '/menu/Soft Serve Menu/biscoff-lover.webp',
    color: '#F06EBB',
    tag:   'Fan Favourite',
    note:  'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'TBA', serving: '3 hours' },
      100: { price: '₱35,000', serving: '5 hours' },
    },
  },
  {
    id:    'avo-pistachio',
    name:  'Avocado Pistachio Knafe Lover',
    size:  '12oz',
    image: '/menu/Soft Serve Menu/pistachio-lover.webp',
    color: '#3a6b35',
    tag:   'Premium',
    note:  'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'TBA', serving: '3 hours' },
      100: { price: '₱40,000', serving: '5 hours' },
    },
  },
  {
    id:    'dark-choco-shake',
    name:  'Dark Chocolate Avocado Shake',
    size:  '16oz',
    image: '/menu/Avocado Shakes/dark-choco-shake.webp',
    color: '#F06EBB',
    tag:   'Shake',
    note:  'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'TBA', serving: '3 hours' },
      100: { price: '₱30,000', serving: '5 hours' },
    },
  },
  {
    id:    'barley-shake-classic',
    name:  'Avocado Shake Barley Classic',
    size:  '16oz',
    image: '/menu/Avocado Shakes/barley-shake.webp',
    color: '#b6c548',
    tag:   'Classic',
    note:  'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'TBA', serving: '3 hours' },
      100: { price: '₱39,000', serving: '5 hours' },
    },
  },
  {
    id:    'barley-shake-lowcarb',
    name:  'Avocado Shake Barley Low Carb',
    size:  '16oz',
    image: '/menu/Avocado Shakes/keto-shake.webp',
    color: '#3a6b35',
    tag:   'Low Carb',
    note:  'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'TBA', serving: '3 hours' },
      100: { price: '₱36,500', serving: '5 hours' },
    },
  },
  {
    id:    'avo-shake-16oz',
    name:  'Avocado Shake',
    size:  '16oz',
    image: '/menu/Avocado Shakes/avo-shake.webp',
    color: '#F06EBB',
    tag:   'Classic',
    note:  'For out-of-town bookings, additional charges may apply including a minimum order requirement, out-of-town fee, and applicable toll fees.',
    addons: [
      'Toppings available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'TBA', serving: '3 hours' },
      100: { price: '₱27,500', serving: '5 hours' },
    },
  },
  {
    id:    'popsicle-freezer',
    name:  'Popsicle Freezer Package',
    size:  'Assorted',
    image: '/menu/Popsicles/popsicle-cover.webp',
    color: '#b6c548',
    tag:   'New',
    note:  'Pricing and full package details coming soon. Contact us for a custom quote.',
    addons: [
      'Flavour assortment available upon request',
      'Extended service hours',
    ],
    tiers: {
      50:  { price: 'Get a Quote', serving: 'TBA' },
      100: { price: 'Get a Quote', serving: 'TBA' },
    },
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
    border: '1.5px solid rgba(58,107,53,0.25)',
    borderRadius: '12px', background: 'rgba(255,255,255,0.92)',
    fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#3a6b35',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(58,107,53,0.06)',
  }
  const labelStyle = {
    fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700',
    color: '#3a6b35', display: 'block', marginBottom: '5px',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Party Cart Booking — ${pkg.name} ${pkg.size} — ${form.name}`)
    const body = encodeURIComponent(
`New Party Cart Booking Inquiry

Package: ${pkg.name} ${pkg.size} — ${pkg.selectedCups} ${pkg.selectedUnit || 'cups'} — ${pkg.selectedPrice}
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
      style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '24px', border: `2px solid ${pkg.color}`, boxShadow: `0 24px 64px rgba(58,107,53,0.22), 0 0 0 1px rgba(255,255,255,0.4) inset`, width: '100%', maxWidth: '520px', maxHeight: '92vh', overflowY: 'auto', padding: 'clamp(20px,4vw,32px)' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#b6c548', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '28px', color: '#fff', fontWeight: '800' }}>✓</span>
            </div>
            <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '24px', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', marginBottom: '10px' }}>
              Booking inquiry sent!
            </h3>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto 24px' }}>
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
                <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(17px,3.5vw,21px)', color: 'var(--c-olive)', margin: '0 0 4px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>
                  {pkg.name}
                </h2>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#3a6b35', fontWeight: '600', margin: 0 }}>
                  {pkg.size} &nbsp;·&nbsp; {pkg.selectedCups} {pkg.selectedUnit || 'cups'} &nbsp;·&nbsp; {pkg.selectedPrice}
                </p>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(58,107,53,0.08)', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#3a6b35', padding: '4px', lineHeight: 1, minHeight: '36px', minWidth: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>✕</button>
            </div>
            <div style={{ borderTop: '1.5px solid rgba(58,107,53,0.2)', paddingTop: '20px' }}>
              <p style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '14px', color: 'var(--c-olive)', marginBottom: '16px', textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>
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
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#3a6b35', opacity: 0.75, textAlign: 'center', margin: 0 }}>
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

// ─── Custom Quote Modal ───────────────────────────────────────────────────────
function CustomQuoteModal({ onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: '', guests: '', venue: '',
    flavour: '', cups: '', hours: '',
    notes: '',
  })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid rgba(58,107,53,0.25)',
    borderRadius: '12px', background: 'rgba(255,255,255,0.92)',
    fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#3a6b35',
    outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(58,107,53,0.06)',
  }
  const labelStyle = {
    fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700',
    color: '#3a6b35', display: 'block', marginBottom: '5px',
    textTransform: 'uppercase', letterSpacing: '0.06em',
  }
  const focus = e => e.target.style.borderColor = '#b6c548'
  const blur  = e => e.target.style.borderColor = 'rgba(58,107,53,0.25)'

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Custom Quote Inquiry — ${form.name}`)
    const body = encodeURIComponent(
`Custom Party Cart Quote Inquiry
——————————————————————————
Name:   ${form.name}
Email:  ${form.email}
Phone:  ${form.phone}
——————————————————————————
Event Date:     ${form.date || 'TBD'}
Estimated Guests: ${form.guests || 'Not specified'}
Venue / Location: ${form.venue || 'TBD'}
——————————————————————————
Custom Requirements:
Preferred Flavour:  ${form.flavour || 'Open to suggestions'}
Cup Count Needed:   ${form.cups || 'TBD'}
Service Hours:      ${form.hours || 'TBD'}
——————————————————————————
Additional Notes / Special Requests:
${form.notes || 'None'}
——————————————————————————
Please follow up within 24–48 hours.`
    )
    window.location.href = `mailto:official@avocadoria.com.ph?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: '24px', border: '2px solid #b6c548', boxShadow: '0 24px 64px rgba(58,107,53,0.22), 0 0 0 1px rgba(255,255,255,0.4) inset', width: '100%', maxWidth: '560px', maxHeight: '92vh', overflowY: 'auto', padding: 'clamp(20px,4vw,32px)' }}>
        {sent ? (
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#b6c548', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span style={{ fontSize: '28px', color: '#fff', fontWeight: '800' }}>✓</span>
            </div>
            <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '22px', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', marginBottom: '10px' }}>
              Quote request sent!
            </h3>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#3a6b35', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto 24px' }}>
              Your email app has opened with your custom inquiry. Our party team will get back to you within 24–48 hours!
            </p>
            <button onClick={onClose} style={{ background: '#b6c548', color: '#fff', border: 'none', borderRadius: '999px', padding: '13px 28px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '800', cursor: 'pointer', minHeight: '44px' }}>
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(18px,3.5vw,22px)', color: 'var(--c-olive)', margin: '0 0 4px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>
                  Custom Quote
                </h2>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#3a6b35', fontWeight: '600', margin: 0 }}>
                  Tell us what you have in mind — we will build it for you.
                </p>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(58,107,53,0.08)', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#3a6b35', padding: '4px', lineHeight: 1, minHeight: '36px', minWidth: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>✕</button>
            </div>

            <div style={{ borderTop: '1.5px solid rgba(58,107,53,0.2)', paddingTop: '20px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                {/* Section — Contact */}
                <p style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '14px', color: 'var(--c-olive)', margin: '0 0 4px', textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>
                  Your details
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input required value={form.name} onChange={set('name')} placeholder="Maria Santos" style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label style={labelStyle}>Mobile *</label>
                    <input required value={form.phone} onChange={set('phone')} placeholder="09XX XXX XXXX" style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email address *</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="maria@email.com" style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(58,107,53,0.12)' }} />

                {/* Section — Event */}
                <p style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '14px', color: 'var(--c-olive)', margin: '0 0 4px', textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>
                  Event details
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Event date</label>
                    <input type="date" value={form.date} onChange={set('date')} style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label style={labelStyle}>Expected guests</label>
                    <input type="number" min="1" value={form.guests} onChange={set('guests')} placeholder="e.g. 60" style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Venue / location</label>
                  <input value={form.venue} onChange={set('venue')} placeholder="City or venue name" style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'rgba(58,107,53,0.12)' }} />

                {/* Section — Custom requirements */}
                <p style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: '14px', color: 'var(--c-olive)', margin: '0 0 4px', textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff' }}>
                  Custom requirements
                </p>
                <div>
                  <label style={labelStyle}>Preferred flavour / product</label>
                  <select value={form.flavour} onChange={set('flavour')} style={{ ...inputStyle, appearance: 'none' }} onFocus={focus} onBlur={blur}>
                    <option value="">Select or leave open</option>
                    <option>Avocado Lover</option>
                    <option>Avocado Biscoff</option>
                    <option>Avocado Pistachio Knafe Lover</option>
                    <option>Mix / Open to suggestions</option>
                  </select>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Cup count needed</label>
                    <input value={form.cups} onChange={set('cups')} placeholder="e.g. 150 cups" style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label style={labelStyle}>Service hours needed</label>
                    <input value={form.hours} onChange={set('hours')} placeholder="e.g. 4 hours" style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Additional notes / special requests</label>
                  <textarea value={form.notes} onChange={set('notes')} rows={3} placeholder="Theme, setup requirements, out-of-town details, add-ons..." style={{ ...inputStyle, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
                </div>

                <button
                  type="submit"
                  style={{ background: '#3a6b35', color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 24px', fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: 'background 0.2s', minHeight: '48px' }}
                  onMouseEnter={e => e.currentTarget.style.background='#b6c548'}
                  onMouseLeave={e => e.currentTarget.style.background='#3a6b35'}
                >
                  Send Custom Quote Request
                </button>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#3a6b35', opacity: 0.75, textAlign: 'center', margin: 0 }}>
                  This opens your email app with your details pre-filled. We respond within 24–48 hours.
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
  const [cups, setCups]   = useState(100)
  const [open, setOpen]   = useState(false)
  const tier              = pkg.tiers[cups]
  const unit              = pkg.id === 'popsicle-freezer' ? 'pieces' : 'cups'
  const isTBA             = tier.price === 'TBA' || tier.price === 'Get a Quote'

  const inclusions = [
    'Booth setup cart',
    `Serving — ${tier.serving}`,
    '2 staff with complete uniform',
    'Transportation',
  ]

  const toggleStyle = (active, color) => ({
    flex: 1,
    padding: '8px 0',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Poppins,sans-serif',
    fontSize: '13px',
    fontWeight: '700',
    transition: 'all 0.18s',
    background: active ? color : 'transparent',
    color: active ? '#fff' : '#8A5F3C',
    minHeight: '36px',
  })

  return (
    <div style={{
      background: 'transparent',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1.5px solid rgba(182,197,72,0.35)',
      boxShadow: '0 8px 40px rgba(58,107,53,0.10)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(58,107,53,0.16)' }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 40px rgba(58,107,53,0.10)' }}
    >
      {/* Card body */}
      <div style={{ padding: '24px 24px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Name */}
        <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(20px,2.2vw,26px)', color: 'var(--c-olive)', margin: '0 0 14px', lineHeight: 1.2, textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>
          {pkg.name}
        </h3>

        {/* ── Cup toggle ── */}
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
            {`Choose your ${unit}`}
          </p>
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(182,197,72,0.1)', borderRadius: '999px', padding: '4px' }}>
            {[50, 100].map(n => (
              <button
                key={n}
                onClick={() => setCups(n)}
                style={toggleStyle(cups === n, pkg.color)}
              >
                {`${n} ${unit}`}
              </button>
            ))}
          </div>
        </div>

        {/* Price — updates with tier */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '30px', fontWeight: '800', color: isTBA ? '#b6c548' : pkg.color, transition: 'color 0.2s' }}>
            {tier.price === 'Get a Quote' ? 'Get a Quote' : isTBA ? 'Price TBA' : tier.price}
          </span>
          {!isTBA && (
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', opacity: 0.7 }}>
              {`starts at · ${cups} ${unit}`}
            </span>
          )}
          {isTBA && (
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', opacity: 0.7 }}>
              {`· ${cups} ${unit} — contact us`}
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(182,197,72,0.2)', marginBottom: '16px' }} />

        {/* Inclusions + product image side by side */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'stretch', marginBottom: '12px' }}>
          {/* Left — inclusions (serving updates dynamically) */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
              Inclusions
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {inclusions.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--c-olive)', fontWeight: '900', flexShrink: 0, fontSize: '12px', marginTop: '2px' }}>—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — product image */}
          <div style={{ position: 'relative', flexShrink: 0, width: 'clamp(150px,42%,200px)', minHeight: '240px' }}>
            <img
              src={pkg.image}
              alt={pkg.name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
              loading="lazy" decoding="async"
            />
            <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.92)', color: '#3a6b35', fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '999px', border: '1.5px solid rgba(182,197,72,0.4)' }}>
              {pkg.size}
            </div>
          </div>
        </div>

        {/* Add-ons toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#8A5F3C', opacity: 0.7, letterSpacing: '0.04em', minHeight: '36px' }}
        >
          <span style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block', fontSize: '10px' }}>▶</span>
          ADD-ONS
        </button>
        {open && (
          <ul style={{ margin: '4px 0 8px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {pkg.addons.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', lineHeight: 1.45, opacity: 0.85 }}>
                <span style={{ color: '#b6c548', flexShrink: 0 }}>+</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Note */}
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C', opacity: 0.5, lineHeight: 1.5, margin: '8px 0 0', fontStyle: 'italic' }}>
          {pkg.note}
        </p>
      </div>

      {/* Book button — passes selected cup tier to modal */}
      <div style={{ padding: '20px 24px 24px' }}>
        <button
          onClick={() => onBook({ ...pkg, selectedCups: cups, selectedUnit: unit, selectedPrice: tier.price, selectedServing: tier.serving })}
          style={{ width: '100%', background: pkg.color, color: '#fff', border: 'none', borderRadius: '999px', padding: '14px 20px', fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: '800', cursor: 'pointer', transition: 'background 0.15s, transform 0.15s', minHeight: '52px', letterSpacing: '0.02em' }}
          onMouseEnter={e => { e.currentTarget.style.background='#3a6b35'; e.currentTarget.style.transform='scale(0.98)' }}
          onMouseLeave={e => { e.currentTarget.style.background=pkg.color; e.currentTarget.style.transform='scale(1)' }}
        >
          {`Book ${cups} ${unit.charAt(0).toUpperCase() + unit.slice(1)}`}
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PartyCartPage() {
  const [selectedPkg, setSelectedPkg] = useState(null)
  const [showQuote,   setShowQuote]   = useState(false)

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

      <style>{`
        .pc-pkg-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; align-items: stretch; }
        .pc-steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        @media (max-width: 1100px) {
          .pc-pkg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 820px) {
          .pc-pkg-grid { grid-template-columns: repeat(2, 1fr); }
          .pc-steps-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .pc-pkg-grid { grid-template-columns: 1fr; }
          .pc-steps-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ ...TEXTURE, paddingTop: 'clamp(80px,12vw,120px)', paddingBottom: 0, textAlign: 'center' }}>
        <div style={OVERLAY} />
        <div style={{ ...INNER, padding: '0 var(--sp-md)' }}>
          <style>{`
            .pc-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; max-width: 1100px; margin: 0 auto; text-align: left; }
            @media (max-width: 767px) {
              .pc-hero-grid { grid-template-columns: 1fr; text-align: center; }
              .pc-hero-grid .pc-img { order: -1; }
              .pc-hero-grid p { margin-left: auto; margin-right: auto; }
            }
          `}</style>
          <div className="pc-hero-grid">
            {/* Left — text */}
            <div>
              <h1 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(2rem,8vw,3.5rem)', color: 'var(--c-olive)', margin: '0 0 14px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', lineHeight: 1.1 }}>
                Bring the Party<br />
                <em style={{ color: '#b6c548', fontStyle: 'normal' }}>to You!</em>
              </h1>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(13px,3vw,15px)', color: '#8A5F3C', maxWidth: '500px', margin: '0 0 32px', lineHeight: 1.7 }}>
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
            {/* Right — Party Cart image */}
            <div className="pc-img" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <img
                src="/party-cart-hero.png"
                alt="Avocadoria Party Cart"
                style={{
                  width: '120%',
                  maxWidth: '620px',
                  height: 'auto',
                  objectFit: 'contain',
                  filter: 'none',
                  transform: 'scale(1.12)',
                  transformOrigin: 'bottom center',
                }}
                loading="lazy" decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ ...TEXTURE, padding: 'clamp(48px,7vw,80px) var(--sp-md)' }}>
        <div style={OVERLAY} />
        <div style={{ ...INNER, maxWidth: '100%', margin: '0 auto', padding: '0 clamp(20px,4vw,60px)' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'var(--c-olive)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>How It Works</p>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,5vw,2.8rem)', color: 'var(--c-olive)', margin: 0, textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>
              Four easy steps to your perfect party
            </h2>
          </div>
          <div className="pc-steps-grid">
            {STEPS.map((s) => (
              <div key={s.num} style={{ background: 'transparent', borderRadius: '16px', border: '1.5px solid rgba(182,197,72,0.35)', padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#b6c548', letterSpacing: '0.08em', marginBottom: '10px' }}>{s.num}</div>
                <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(17px,1.8vw,20px)', color: 'var(--c-olive)', margin: '0 0 10px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="packages" style={{ ...TEXTURE, padding: 'clamp(48px,7vw,80px) var(--sp-md)' }}>
        <div style={OVERLAY} />
        <div style={{ ...INNER, maxWidth: '100%', margin: '0 auto', padding: '0 clamp(20px,4vw,60px)' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(2.5rem,6vw,4.8rem)', color: 'var(--c-olive)', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 10px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>Our Packages</p>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.4rem,5vw,2rem)', color: 'var(--c-olive)', margin: '0 0 10px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff' }}>
              Pick your celebration flavour
            </h2>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', margin: 0, opacity: 0.8 }}>
              All packages include 100 cups, 5-hour serving, 2 uniformed staff, and transportation. Select 50 cups for a smaller celebration.
            </p>
          </div>

          <div className="pc-pkg-grid">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onBook={setSelectedPkg} />
            ))}
          </div>

          {/* Custom quote CTA */}
          <div style={{ marginTop: '48px', background: 'transparent', borderRadius: '20px', border: '1.5px solid rgba(182,197,72,0.35)', padding: '28px 32px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#3a6b35', margin: '0 0 6px' }}>
              Need something custom?
            </p>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#8A5F3C', margin: '0 0 16px', lineHeight: 1.6, opacity: 0.85 }}>
              Different flavour, cup count, or event setup? Reach out and we will build a package just for you.
            </p>
            <button onClick={() => setShowQuote(true)} style={{ display: 'inline-flex', alignItems: 'center', background: '#3a6b35', color: '#fff', border: 'none', borderRadius: '999px', padding: '12px 28px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', cursor: 'pointer', minHeight: '44px', letterSpacing: '0.02em', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='#b6c548'}
              onMouseLeave={e => e.currentTarget.style.background='#3a6b35'}
            >
              Get a Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* ── Bottom strip ── */}
      <section style={{ ...TEXTURE, padding: '32px var(--sp-md)', textAlign: 'center' }}>
        <div style={OVERLAY} />
        <p style={{ ...INNER, fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(14px,3vw,18px)', color: 'var(--c-olive)', margin: '0 0 4px', textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', display: 'block' }}>
          Happiness in avocado — delivered to your party.
        </p>
        <p style={{ ...INNER, fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#8A5F3C', margin: 0, opacity: 0.6, display: 'block' }}>
          official@avocadoria.com.ph &nbsp;·&nbsp; Prices are subject to change without prior notice.
        </p>
      </section>

      {/* ── Booking Modal ── */}
      {selectedPkg && <BookingModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />}
      {showQuote   && <CustomQuoteModal onClose={() => setShowQuote(false)} />}
    </>
  )
}
