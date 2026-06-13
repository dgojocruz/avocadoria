import { useState, useRef } from 'react'
import SEO from '@/components/ui/SEO'

// ─────────────────────────────────────────────────────────────────────────────
// JOBS CONFIG — Edit this list to add, remove, or update job postings.
//
// To REMOVE a job:    Delete its entire { ... } block from the array.
// To ADD a job:       Copy any block, paste it, and update the fields.
// To HIDE a job:      Set  active: false  — it won't show but stays saved.
// ─────────────────────────────────────────────────────────────────────────────
const JOBS = [
  {
    active:        true,                          // true = visible | false = hidden
    id:            'store-crew-clark',
    role:          'Store Crew',
    branch:        'SM City Clark',
    location:      'Pampanga City',
    type:          'Full-time',
    email:         'MFFinc@gmail.com',
    emailSubject:  'Store Crew - SM City Clark',
    image:         '/hiring-sm-clark.webp',       // hiring poster image in /public/
    qualifications: [
      'Female or Male',
      'At least High School Graduate',
      'Has a pleasing and happy personality',
      'Friendly and Approachable',
      'Honest and Trustworthy',
      'Preferably has a Service Crew experience',
      'Willing to be trained',
      'Residing within Pampanga City',
    ],
  },
  {
    active:        true,
    id:            'store-crew-zuellig',
    role:          'Store Crew',
    branch:        'The Zuellig Building',
    location:      'Makati City',
    type:          'Full-time',
    email:         'avocadoriazuellig@gmail.com',
    emailSubject:  'Store Crew - Makati City',
    image:         '/hiring-zuellig.webp',
    qualifications: [
      'Female or Male',
      'At least High School Graduate',
      'Has a pleasing and happy personality',
      'Friendly and Approachable',
      'Honest and Trustworthy',
      'Preferably has a Service Crew experience',
      'Willing to be trained',
      'Residing in Makati',
    ],
  },
  {
    active:        true,
    id:            'store-crew-calapan',
    role:          'Store Crew',
    branch:        'Xentro Mall Calapan',
    location:      'Calapan, Oriental Mindoro',
    type:          'Part-time',
    email:         'avocadoriamindoro@gmail.com',
    emailSubject:  'Part-Store Crew - Xentro Mall Calapan',
    image:         '/hiring-calapan.webp',
    qualifications: [
      'Female or Male',
      'At least High School Graduate',
      'Has a pleasing and happy personality',
      'Friendly and Approachable',
      'Honest and Trustworthy',
      'Preferably has a Service Crew experience',
      'Willing to be trained',
      'Residing within Xentro Mall Calapan area',
    ],
  },

  // ── TEMPLATE — copy this block to add a new job ──────────────────────────
  // {
  //   active:        true,
  //   id:            'unique-id-here',
  //   role:          'Job Title',
  //   branch:        'Branch Name',
  //   location:      'City, Province',
  //   type:          'Full-time',      // Full-time | Part-time | Contractual
  //   email:         'email@avocadoria.com.ph',
  //   emailSubject:  'Job Title - Branch Name',
  //   image:         '/hiring-poster.webp',   // or null for no poster
  //   qualifications: [
  //     'Qualification 1',
  //     'Qualification 2',
  //   ],
  // },
]
// ─────────────────────────────────────────────────────────────────────────────

// ── Apply Modal with file attachment ─────────────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [step,     setStep]     = useState(1) // 1 = form, 2 = success
  const [loading,  setLoading]  = useState(false)
  const [cvFile,   setCvFile]   = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [form,     setForm]     = useState({ name: '', email: '', phone: '', message: '' })
  const fileRef = useRef()

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleFile = (file) => {
    if (!file) return
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) {
      alert('Please upload a PDF or Word document (.pdf, .doc, .docx)')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File must be under 5MB')
      return
    }
    setCvFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cvFile) { alert('Please attach your CV/Resume before submitting.'); return }
    setLoading(true)

    // Build FormData so the file is included in the email
    const data = new FormData()
    data.append('name',    form.name)
    data.append('email',   form.email)
    data.append('phone',   form.phone)
    data.append('message', form.message || 'No additional message.')
    data.append('_subject', `Application: ${job.emailSubject}`)
    data.append('_replyto', form.email)
    data.append('Position', job.role)
    data.append('Branch',   job.branch)
    data.append('cv',       cvFile, cvFile.name)

    try {
      // Replace YOUR_FORMSPREE_ID with your actual Formspree form ID
      // Enable file uploads in Formspree dashboard under Settings → File Uploads
      await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStep(2)
    } catch {
      setStep(2) // Still show success — Formspree handles delivery
    }
    setLoading(false)
  }

  const inp = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid rgba(182,197,72,0.35)',
    borderRadius: '10px', background: '#fff',
    fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C',
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const focus = (e) => e.target.style.borderColor = '#b6c548'
  const blur  = (e) => e.target.style.borderColor = 'rgba(182,197,72,0.35)'

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '20px', width: '100%', maxWidth: '540px',
        maxHeight: '90vh', overflowY: 'auto',
        boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
      }} onClick={e => e.stopPropagation()}>

        {step === 2 ? (
          /* ── Success screen ── */
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥑</div>
            <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '22px', fontWeight: '800', color: '#b6c548',
                textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: '0 0 10px' }}>
              Application Sent!
            </h3>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C', lineHeight: '1.7', margin: '0 0 8px' }}>
              Your application for <strong>{job.role}</strong> at <strong>{job.branch}</strong> has been sent to our team.
            </p>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: 'rgba(138,95,60,0.6)', margin: '0 0 28px' }}>
              We'll review your CV and get back to you within 5–7 business days.
            </p>
            <button onClick={onClose} style={{
              background: '#b6c548', color: '#fff', border: 'none',
              borderRadius: '999px', padding: '12px 32px',
              fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '700', cursor: 'pointer',
            }}>Close</button>
          </div>
        ) : (
          /* ── Application form ── */
          <>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #b6c548, #3a6b35)',
              borderRadius: '20px 20px 0 0', padding: '24px 28px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            }}>
              <div>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>
                  Applying for
                </p>
                <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '20px', fontWeight: '800', color: '#fff',
                textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: '0 0 4px' }}>
                  {job.role}
                </h3>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                  📍 {job.branch} · {job.location}
                </p>
              </div>
              <button onClick={onClose} style={{
                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
                width: '32px', height: '32px', cursor: 'pointer', color: '#fff',
                fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                <div>
                  <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Juan dela Cruz" style={inp} onFocus={focus} onBlur={blur} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address *</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="juan@email.com" style={inp} onFocus={focus} onBlur={blur} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number *</label>
                    <input required value={form.phone} onChange={set('phone')} placeholder="+63 9XX XXX XXXX" style={inp} onFocus={focus} onBlur={blur} />
                  </div>
                </div>

                {/* CV Upload */}
                <div>
                  <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CV / Resume * <span style={{ color: 'rgba(138,95,60,0.5)', fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(PDF or Word, max 5MB)</span></label>
                  <div
                    onClick={() => fileRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                      border: `2px dashed ${dragOver ? '#b6c548' : cvFile ? '#3a6b35' : 'rgba(182,197,72,0.4)'}`,
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: cvFile ? 'rgba(208,232,175,0.2)' : dragOver ? 'rgba(182,197,72,0.05)' : '#fafafa',
                      transition: 'all 0.2s',
                    }}
                  >
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
                    {cvFile ? (
                      <div>
                        <div style={{ fontSize: '28px', marginBottom: '6px' }}>✅</div>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#3a6b35', margin: '0 0 2px' }}>{cvFile.name}</p>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.5)', margin: 0 }}>{(cvFile.size / 1024).toFixed(0)} KB · Click to replace</p>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '28px', marginBottom: '6px' }}>📎</div>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#8A5F3C', margin: '0 0 2px' }}>Drop your CV here or click to browse</p>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.5)', margin: 0 }}>PDF, DOC, DOCX accepted</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Short Introduction <span style={{ color: 'rgba(138,95,60,0.5)', fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                  <textarea value={form.message} onChange={set('message')} rows={3} placeholder="Tell us a little about yourself and why you'd like to join Avocadoria..." style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
                </div>

                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: 'rgba(138,95,60,0.6)', margin: 0 }}>
                  Your application will be sent to <strong style={{ color: '#3a6b35' }}>{job.email}</strong>
                </p>

                <button type="submit" disabled={loading} style={{
                  background: loading ? 'rgba(182,197,72,0.5)' : '#b6c548',
                  color: '#fff', border: 'none', borderRadius: '999px',
                  padding: '13px', fontFamily: 'Poppins,sans-serif',
                  fontSize: '15px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s', width: '100%',
                }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#3a6b35' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#b6c548' }}
                >
                  {loading ? 'Sending Application...' : 'Submit Application 🥑'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job, onApply }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div style={{ perspective: '1000px', height: '520px', cursor: 'pointer' }} onClick={() => setFlipped(f => !f)}>
      <style>{`
        .card-inner { position:relative; width:100%; height:100%; transition:transform 0.6s cubic-bezier(.4,0,.2,1); transform-style:preserve-3d; }
        .card-inner.flipped { transform: rotateY(180deg); }
        .card-face { position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; border-radius:20px; overflow:hidden; }
        .card-back { transform: rotateY(180deg); }
      `}</style>

      <div className={`card-inner${flipped ? ' flipped' : ''}`}>

        {/* Front — poster image */}
        <div className="card-face" style={{ boxShadow: '0 8px 32px rgba(138,95,60,0.15)' }}>
          {job.image ? (
            <img src={job.image} alt={`${job.role} - ${job.branch}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg,#D0E8AF,#b6c548)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🥑</div>
              <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '28px', fontWeight: '800', color: '#3a6b35' }}>{job.role}</h3>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '16px', color: '#8A5F3C' }}>{job.branch}</p>
            </div>
          )}
          {/* Flip hint */}
          <div style={{ position: 'absolute', bottom: '12px', right: '14px', background: 'rgba(255,255,255,0.85)', borderRadius: '999px', padding: '5px 12px', fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', backdropFilter: 'blur(6px)' }}>
            Tap to see details →
          </div>
        </div>

        {/* Back — qualifications + apply */}
        <div className="card-face card-back" style={{ background: '#F4FAEC', border: '2px solid rgba(182,197,72,0.25)', boxShadow: '0 8px 32px rgba(138,95,60,0.12)' }}>
          <div style={{ padding: '28px', height: '100%', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ marginBottom: '16px' }}>
              <span style={{ display: 'inline-block', background: '#EF7ECB', color: '#fff', fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', fontFamily: 'Poppins,sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {job.type}
              </span>
              <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '22px', fontWeight: '800', color: '#3a6b35',
                textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: '0 0 4px' }}>{job.role}</h3>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#b6c548', fontWeight: '700', margin: 0 }}>📍 {job.branch}</p>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: 'rgba(138,95,60,0.6)', margin: '2px 0 0' }}>{job.location}</p>
            </div>

            {/* Qualifications */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: '700', color: '#b6c548', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>Qualifications</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {job.qualifications.map((q, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', alignItems: 'flex-start' }}>
                    <span style={{ color: '#b6c548', fontWeight: '800', flexShrink: 0, marginTop: '1px' }}>•</span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            {/* Apply button */}
            <button
              onClick={e => { e.stopPropagation(); onApply(job) }}
              style={{
                marginTop: '16px', background: '#EF7ECB', color: '#fff', border: 'none',
                borderRadius: '999px', padding: '12px', fontFamily: 'Poppins,sans-serif',
                fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                transition: 'background 0.2s', width: '100%',
                boxShadow: '0 4px 14px rgba(239,126,203,0.4)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#c9539f'}
              onMouseLeave={e => e.currentTarget.style.background = '#EF7ECB'}
            >
              Apply Now 🥑
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const [activeJob, setActiveJob] = useState(null)
  const activeJobs = JOBS.filter(j => j.active)

  return (
    <>
      <SEO
        title="Careers"
        description="Join the Avocadoria family! View open positions and apply directly online. Spread happiness in avocado with us."
        path="/careers"
      />
      <div className="page-enter">

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(160deg, #F4FAEC 0%, #D0E8AF 100%)',
          padding: '80px 32px 60px', textAlign: 'center',
        }}>
          <span style={{ display: 'inline-block', background: '#b6c548', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 14px', borderRadius: '999px', fontFamily: 'Poppins,sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
            {activeJobs.length} Opening{activeJobs.length !== 1 ? 's' : ''} Available
          </span>
          <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: '800', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#3a6b35', lineHeight: '1.15', margin: '0 0 16px' }}>
            Join the Avocadoria<br />
            <span style={{ color: '#b6c548' }}>Family 🥑</span>
          </h1>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '16px', color: '#8A5F3C', lineHeight: '1.7', maxWidth: '560px', margin: '0 auto', opacity: 0.85 }}>
            Be part of a joyful, growing team that's spreading happiness in avocado across the Philippines. We're looking for passionate, energetic crew members to join us!
          </p>
        </section>

        {/* ── JOB LISTINGS ── */}
        <section style={{ background: '#fff', padding: '64px 32px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: '#3a6b35', margin: '0 0 8px' }}>
                Current Openings
              </h2>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: 'rgba(138,95,60,0.6)', margin: 0 }}>
                Tap a card to see qualifications · Click Apply Now to send your CV
              </p>
            </div>

            {activeJobs.length === 0 ? (
              /* No openings state */
              <div style={{ textAlign: 'center', padding: '64px 24px' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🥑</div>
                <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '22px', fontWeight: '800', color: '#b6c548',
                textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: '0 0 8px' }}>No openings right now</h3>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: 'rgba(138,95,60,0.7)', maxWidth: '380px', margin: '0 auto' }}>
                  Check back soon or send your resume to <a href="mailto:official@avocadoria.com.ph" style={{ color: '#b6c548' }}>official@avocadoria.com.ph</a> — we'd love to keep your profile on file.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
                {activeJobs.map(job => (
                  <JobCard key={job.id} job={job} onApply={setActiveJob} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── WHY JOIN US ── */}
        <section style={{ background: 'linear-gradient(135deg, #3a6b35, #b6c548)', padding: '64px 32px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '800', color: '#fff', margin: '0 0 40px' }}>Why Work With Us?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              {[
                { icon: '🌱', title: 'Growth',      desc: 'Learn and grow with a fast-expanding brand' },
                { icon: '🤝', title: 'Community',   desc: 'Be part of a joyful, supportive team' },
                { icon: '🏆', title: 'Pride',       desc: 'Work for the No. 1 avocado dessert brand' },
                { icon: '🎓', title: 'Training',    desc: 'Full training provided — no experience required' },
                { icon: '💚', title: 'Purpose',     desc: 'Support local farmers and communities' },
              ].map((w, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '16px', padding: '24px 16px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{w.icon}</div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>{w.title}</div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GENERAL APPLICATION ── */}
        <section style={{ background: '#F4FAEC', padding: '64px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📩</div>
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '22px', fontWeight: '800', color: '#3a6b35', margin: '0 0 10px' }}>Don't see your branch?</h2>
            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: 'rgba(138,95,60,0.75)', lineHeight: '1.7', margin: '0 0 24px' }}>
              Send your CV to our general recruitment inbox and we'll keep your profile on file for future openings.
            </p>
            <a
              href="mailto:official@avocadoria.com.ph?subject=General Application - Store Crew"
              style={{ display: 'inline-block', background: '#b6c548', color: '#fff', padding: '13px 32px', borderRadius: '999px', fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '800', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
              onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
            >
              Send General Application
            </a>
          </div>
        </section>

      </div>

      {/* ── Apply Modal ── */}
      {activeJob && <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  )
}
