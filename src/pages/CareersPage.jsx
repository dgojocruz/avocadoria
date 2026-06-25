import { useState } from 'react'
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
    active:        true,
    id:            'store-crew-robinsons-malabon',
    role:          'Store Crew',
    branch:        'Robinsons Malabon',
    location:      'Malabon, Metro Manila',
    type:          'Full-time',
    email:         'avocadoriarobmalabon@gmail.com',
    emailSubject:  'Store Crew - Robinsons Malabon',
    image:         '/careers/hiring-robinsons-malabon.webp',
    qualifications: [
      'Female or Male',
      'At least High School Graduate',
      'Has a pleasing and happy personality',
      'Friendly and Approachable',
      'Honest and Trustworthy',
      'Preferably has a Service Crew experience',
      'Willing to be trained',
      'Residing within Malabon, Metro Manila',
    ],
  },
  {
    active:        true,
    id:            'store-crew-times-plaza-manila',
    role:          'Store Crew',
    branch:        'Times Plaza Manila',
    location:      'Ermita, Metro Manila',
    type:          'Full-time',
    email:         'avocadoria.timesplaza@gmail.com',
    emailSubject:  'Store Crew - Times Plaza Manila',
    image:         '/careers/hiring-times-plaza-manila.webp',
    qualifications: [
      'Female or Male',
      'At least High School Graduate',
      'Has a pleasing and happy personality',
      'Friendly and Approachable',
      'Honest and Trustworthy',
      'Preferably has a Service Crew experience',
      'Willing to be trained',
      'Residing within Ermita, Metro Manila',
    ],
  },
  {
    active:        true,
    id:            'store-crew-waltermart-sta-maria',
    role:          'Store Crew',
    branch:        'WalterMart Sta. Maria',
    location:      'Sta. Maria, Bulacan',
    type:          'Full-time',
    email:         'Mmffinc@gmail.com',
    emailSubject:  'Store Crew - Waltermart Sta Maria',
    image:         '/careers/hiring-waltermart-sta-maria.webp',
    qualifications: [
      'Female or Male',
      'At least High School Graduate',
      'Has a pleasing and happy personality',
      'Friendly and Approachable',
      'Honest and Trustworthy',
      'Preferably has a Service Crew experience',
      'Willing to be trained',
      'Residing within Sta Maria, Bulacan',
    ],
  },
  {
    active:        true,
    id:            'store-crew-bayombong',
    role:          'Store Crew',
    branch:        'Bayombong',
    location:      'Bayombong, Nueva Vizcaya',
    type:          'Full-time',
    email:         'avocadoriabayombongnv@gmail.com',
    emailSubject:  'Store Crew - Bayombong',
    image:         '/careers/hiring-bayombong.webp',
    qualifications: [
      'Female or Male',
      'At least High School Graduate',
      'Has a pleasing and happy personality',
      'Friendly and Approachable',
      'Honest and Trustworthy',
      'Preferably has a Service Crew experience',
      'Willing to be trained',
      'Residing within Bayombong, Nueva Vizcaya',
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
  //   image:         '/careers/hiring-poster.webp',   // or null for no poster
  //   qualifications: [
  //     'Qualification 1',
  //     'Qualification 2',
  //   ],
  // },
]
// ─────────────────────────────────────────────────────────────────────────────

// ── Job Card ──────────────────────────────────────────────────────────────────
function JobCard({ job, onApply }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{
      background: 'rgba(255,255,255,0.7)', borderRadius: '20px',
      overflow: 'hidden', boxShadow: '0 4px 20px rgba(58,107,53,0.08)',
      border: '1.5px solid rgba(182,197,72,0.25)',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(58,107,53,0.14)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(58,107,53,0.08)' }}
    >
      {/* Hiring poster image */}
      {job.image && (
        <div style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
          <img src={job.image} alt={`${job.role} - ${job.branch}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            loading="lazy" decoding="async"
          />
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <span style={{ display: 'inline-block', background: 'rgba(182,197,72,0.15)', color: '#3a6b35', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', fontFamily: 'Poppins,sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
            {job.type}
          </span>
          <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '20px', fontWeight: 'normal', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin: '0 0 4px', lineHeight: 1.2 }}>
            {job.role}
          </h3>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#8A5F3C', margin: 0, fontWeight: '600' }}>
            {job.branch} · {job.location}
          </p>
        </div>

        {/* Qualifications toggle */}
        <button onClick={() => setExpanded(!expanded)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: '6px',
          fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: '700', color: '#b6c548',
          textAlign: 'left',
        }}>
          <span>{expanded ? '▲' : '▼'}</span>
          {expanded ? 'Hide' : 'View'} Qualifications
        </button>

        {expanded && (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {job.qualifications.map((q, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', lineHeight: 1.5 }}>
                <span style={{ color: '#b6c548', fontWeight: '900', flexShrink: 0 }}>—</span>
                {q}
              </li>
            ))}
          </ul>
        )}

        {/* Apply button */}
        <button onClick={() => onApply(job)} style={{
          marginTop: 'auto', width: '100%', padding: '12px',
          background: '#b6c548', color: '#fff', border: 'none',
          borderRadius: '12px', cursor: 'pointer',
          fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '800',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
          onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
        >
          Apply Now
        </button>
      </div>
    </div>
  )
}

// ── Apply Modal — mailto + copy email ────────────────────────────────────────
function ApplyModal({ job, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleApply = () => {
    const subject = encodeURIComponent(job.emailSubject)
    const body = encodeURIComponent(
`Hi Avocadoria Team,

I am interested in applying for the ${job.role} position at ${job.branch}.

Please find my CV/Resume attached.

Name:
Contact Number:
Current Address:

Thank you and I look forward to hearing from you!`
    )
    // Try mailto first, fall back to Gmail web compose
    const mailtoLink = `mailto:${job.email}?subject=${subject}&body=${body}`
    const gmailLink = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(job.email)}&su=${subject}&body=${body}`

    // Open mailto — if nothing happens after 500ms, open Gmail
    window.location.href = mailtoLink
    setTimeout(() => {
      window.open(gmailLink, '_blank')
    }, 500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(job.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: '24px', width: '100%', maxWidth: '480px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background: '#b6c548', padding: '28px 28px 24px', position: 'relative' }}>
          <button onClick={onClose} aria-label="Close" style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', cursor: 'pointer', color: '#fff', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Apply Now
          </p>
          <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '22px', fontWeight: 'normal', color: '#fff', margin: '0 0 4px',
            textShadow: '-1px -1px 0 rgba(58,107,53,0.3), 1px 1px 0 rgba(58,107,53,0.3)' }}>
            {job.role}
          </h2>
          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            {job.branch} · {job.location}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '28px' }}>

          {/* Step 1 — Open email app */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#b6c548', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins,sans-serif', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>1</div>
            <div>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#3a6b35', margin: '0 0 4px' }}>Click "Send Application" below</p>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', margin: 0, lineHeight: 1.6 }}>
                Opens your email app — or Gmail in your browser if no email app is set up.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#b6c548', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins,sans-serif', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>2</div>
            <div>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#3a6b35', margin: '0 0 4px' }}>Attach your CV/Resume and send</p>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#8A5F3C', margin: 0, lineHeight: 1.6 }}>
                Add your CV as a PDF or Word file, fill in your details, then hit send!
              </p>
            </div>
          </div>

          {/* Main CTA */}
          <button onClick={handleApply} style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            background: '#b6c548', border: 'none', cursor: 'pointer',
            fontFamily: 'Poppins,sans-serif', fontSize: '16px', fontWeight: '700', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: '0 4px 14px rgba(182,197,72,0.4)', transition: 'all 0.2s',
            marginBottom: '16px',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
            onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Send Application
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(182,197,72,0.25)' }} />
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: 'rgba(138,95,60,0.5)', fontWeight: '600' }}>or send manually</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(182,197,72,0.25)' }} />
          </div>

          {/* Email + copy */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(182,197,72,0.08)', border: '1.5px solid rgba(182,197,72,0.3)', borderRadius: '12px', padding: '12px 14px' }}>
            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: '700', color: '#3a6b35', flex: 1, wordBreak: 'break-all' }}>
              {job.email}
            </span>
            <button onClick={handleCopy} style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: '8px',
              background: copied ? '#3a6b35' : '#b6c548', border: 'none', cursor: 'pointer',
              fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: '700', color: '#fff',
              transition: 'background 0.2s',
            }}>
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: 'rgba(138,95,60,0.6)', textAlign: 'center', margin: '12px 0 0', lineHeight: 1.5 }}>
            Subject: <strong>{job.emailSubject}</strong>
          </p>

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
          position: 'relative', overflow: 'hidden',
          backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundColor: '#F3F2EE',
          padding: '80px 32px 60px', textAlign: 'center',
        }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundColor: '#b6c548', opacity: 0.25 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', background: '#b6c548', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '4px 14px', borderRadius: '999px', fontFamily: 'Poppins,sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>
            {activeJobs.length} Opening{activeJobs.length !== 1 ? 's' : ''} Available
          </span>
          <h1 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', lineHeight: 1.1, margin: '0 0 16px' }}>
            Join the <span style={{ color: '#b6c548' }}>Avocadoria</span> Family
          </h1>
          <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(13px,1.3vw,15px)', color: 'var(--c-dark)', opacity: 0.7, maxWidth: '560px', margin: '0 auto' }}>
            Be part of a joyful, growing team that's spreading happiness in avocado across the Philippines. We're looking for passionate, energetic crew members to join us!
          </p>
          </div>
        </section>

        {/* ── JOB LISTINGS ── */}
        <section style={{ position: 'relative', overflow: 'hidden', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE', padding: '64px 32px' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundColor: '#b6c548', opacity: 0.25 }} />
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin: '0 0 8px', lineHeight: 1.1 }}>
                Current Openings
              </h2>
              <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(13px,1.3vw,15px)', color: 'var(--c-dark)', opacity: 0.7, margin: 0 }}>
                Tap a card to see qualifications · Click Apply Now to send your CV
              </p>
            </div>

            {activeJobs.length === 0 ? (
              /* No openings state */
              <div style={{ textAlign: 'center', padding: '64px 24px' }}>
                <h3 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: '22px', fontWeight: 'normal', color: 'var(--c-olive)',
              textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
                textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', margin: '0 0 8px' }}>No openings right now</h3>
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
        <section style={{ position: 'relative', overflow: 'hidden', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE', padding: '64px 32px' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundColor: '#b6c548', opacity: 0.25 }} />
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin: '0 0 40px', lineHeight: 1.1 }}>Why Work With Us?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Growth',    desc: 'Learn and grow with a fast-expanding brand' },
                { title: 'Community', desc: 'Be part of a joyful, supportive team' },
                { title: 'Pride',     desc: 'Work for the No. 1 avocado dessert brand' },
                { title: 'Training',  desc: 'Full training provided — no experience required' },
                { title: 'Purpose',   desc: 'Support local farmers and communities' },
              ].map((w, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px 16px' }}>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '800', color: '#3a6b35', marginBottom: '8px', textShadow: '-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{w.title}</div>
                  <div style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '600', color: '#8A5F3C', lineHeight: '1.55', textShadow: '0 1px 0 rgba(255,255,255,0.9)' }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GENERAL APPLICATION ── */}
        <section style={{ position: 'relative', overflow: 'hidden', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE', padding: '64px 32px', textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundColor: '#b6c548', opacity: 0.25 }} />
          <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal', fontSize: 'clamp(1.6rem,4vw,2.8rem)', color: 'var(--c-olive)', textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin: '0 0 10px', lineHeight: 1.1 }}>Don't see your branch?</h2>
            <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(13px,1.3vw,15px)', color: 'var(--c-dark)', opacity: 0.7, lineHeight: '1.7', margin: '0 0 24px' }}>
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
