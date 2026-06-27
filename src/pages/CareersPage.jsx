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

  // ── IN-HOUSE / CORPORATE OPENINGS ────────────────────────────────────────
  // These go to recruitment@avocadoria.com.ph (HQ Marikina City)
  {
    active:        true,
    id:            'hq-accounting-assistant',
    role:          'Accounting Assistant',
    branch:        'Head Office',
    location:      'Marikina City',
    type:          'Full-time',
    email:         'avocadoriatccc.recruitment@gmail.com',
    emailSubject:  'Accounting Assistant | Last Name',
    image:         '/careers/hiring-hq-accounting-assistant.webp',
    qualifications: [
      "Bachelor's Degree in Accountancy, Accounting Technology, Financial Management, or any related field",
      'At least 1–2 years of experience in accounting, preferably handling payroll, compensation and benefits, and accounts payable',
      'Proficient in payroll and accounting software applications',
      'Strong analytical, communication, and interpersonal skills',
      'Fast learner with the ability to multitask and stay organized',
      'Capable of working efficiently in a fast-paced environment while meeting deadlines',
    ],
  },
  {
    active:        true,
    id:            'hq-audit-staff',
    role:          'Audit Staff',
    branch:        'Head Office',
    location:      'Marikina City',
    type:          'Full-time',
    email:         'avocadoriatccc.recruitment@gmail.com',
    emailSubject:  'Audit Staff | Last Name',
    image:         '/careers/hiring-hq-audit-staff.webp',
    qualifications: [
      'Male or Female',
      "Bachelor's Degree in Auditing, Business Administration, or any related field",
      'At least 2–3 years of experience in auditing, accounting, regulatory compliance within the food manufacturing, processing, or distribution industry',
      'Knowledgeable of IIA Standards, GAAP, GAAS, COSO Framework, or industry-specific regulations',
      'Familiarity with auditing principles and techniques',
      'Proficiency in MS Office (Word, Excel, Outlook)',
      'Ability to clearly document findings and write concise audit reports',
      'Willing to do field work',
      'Can start ASAP',
    ],
  },
  {
    active:        true,
    id:            'hq-driver',
    role:          'Driver',
    branch:        'Head Office',
    location:      'Marikina City',
    type:          'Full-time',
    email:         'avocadoriatccc.recruitment@gmail.com',
    emailSubject:  'Driver | Last Name',
    image:         '/careers/hiring-hq-driver.webp',
    qualifications: [
      'At least a High School graduate or Vocational graduate',
      'With 2–3 years of relevant work experience as a driver or in a similar role',
      "Must have a valid driver's license with restrictions Code A–D",
      'Knowledgeable in safe and efficient vehicle operation, including basic vehicle maintenance',
      'Familiar with local traffic laws and road safety regulations',
      'Skilled in route planning, navigation, and use of navigation technologies',
      'Knowledgeable in safe cargo handling procedures',
      'With good customer service skills and professional driving attitude',
    ],
  },
  {
    active:        true,
    id:            'hq-franchise-ops-specialist',
    role:          'Franchise Operations Specialist',
    branch:        'Head Office',
    location:      'Marikina City',
    type:          'Full-time',
    email:         'avocadoriatccc.recruitment@gmail.com',
    emailSubject:  'Franchise Operations Specialist | Last Name',
    image:         '/careers/hiring-hq-franchise-ops-specialist.webp',
    qualifications: [
      "Bachelor's degree in Business Administration, Entrepreneurship, Hospitality Management, or Food Service Management",
      '2–5 years of experience in franchise operations',
      'Willing to conduct fieldwork',
      'Audit and compliance management',
      'Hands-on experience with standard operations (SO), audits, and franchise-related concerns',
      'Strong communication skills',
      'Conflict resolution and negotiation abilities',
      'Training and coaching experience',
      'Effective time and territory management',
    ],
  },
  {
    active:        true,
    id:            'hq-line-cook',
    role:          'Line Cook',
    branch:        'Head Office',
    location:      'Marikina City',
    type:          'Full-time',
    email:         'avocadoriatccc.recruitment@gmail.com',
    emailSubject:  'Line Cook | Last Name',
    image:         '/careers/hiring-hq-line-cook.webp',
    qualifications: [
      'At least High School graduate',
      'Culinary or Hospitality training is an advantage',
      "1–2 years' experience as line cook, cook, or kitchen staff in restaurant, cafe, or hotel",
      'With knowledge in basic cooking methods',
      'Ability to prepare ingredients quickly and accurately',
    ],
  },
  {
    active:        true,
    id:            'hq-multimedia-artist',
    role:          'Multimedia Artist',
    branch:        'Head Office',
    location:      'Marikina City',
    type:          'Full-time',
    email:         'avocadoriatccc.recruitment@gmail.com',
    emailSubject:  'Multimedia Artist | Last Name',
    image:         '/careers/hiring-hq-multimedia-artist.webp',
    qualifications: [
      "Bachelor's degree in Multimedia Arts, Graphic Design, Digital Arts, Animation, or related field",
      "2 years' experience in multimedia design, photography, and video production",
      'Proficiency in Adobe Creative Suite',
      'Strong understanding of camera settings, lighting techniques, and composition',
      'Experience with motion graphics and animation is a plus',
      'Ability to take direction and work collaboratively with team',
      'Excellent time management and organizational skills',
      'Willing to do field work',
      'Can start ASAP',
    ],
  },
  {
    active:        true,
    id:            'hq-treasury-assistant',
    role:          'Treasury Assistant',
    branch:        'Head Office',
    location:      'Marikina City',
    type:          'Full-time',
    email:         'avocadoriatccc.recruitment@gmail.com',
    emailSubject:  'Treasury Assistant | Last Name',
    image:         '/careers/hiring-hq-treasury-assistant.webp',
    qualifications: [
      "Bachelor's degree in Finance, Accounting, Business Administration, or related field",
      "1–2 years' experience in billing, collections, or accounts receivable",
      'Excellent verbal and written communication skills for client interaction',
      'Strong analytical, numerical, and organizational skills with high attention to detail',
      'Proficient in MS Office',
    ],
  },
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
      background:    'transparent',
      border:        'none',
      borderRadius:  '20px',
      overflow:      'hidden',
      boxShadow:     'none',
      display:       'flex',
      flexDirection: 'column',
      transition:    'transform 0.25s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
    >
      {/* Hiring poster image */}
      {job.image && (
        <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer' }}
          onClick={() => setExpanded(!expanded)}>
          <img src={job.image} alt={`${job.role} - ${job.branch}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            loading="lazy" decoding="async"
          />
        </div>
      )}

      {/* Card body */}
      <div style={{ padding: '14px 4px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Branch · location — fs-meta */}
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'var(--fs-meta)', color: 'rgba(138,95,60,0.55)' }}>
          {job.branch} · {job.location}
        </span>

        {/* Role — h3 card title standard */}
        <h3 style={{
          fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
          fontWeight: 'normal',
          fontSize:   'var(--fs-h3)',
          color:      'var(--c-olive)',
          textShadow: '-1.5px -1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px 1.5px 0 #fff',
          margin:     0,
          lineHeight: 1.2,
        }}>
          {job.role}
        </h3>

        {/* Qualifications toggle */}
        <button onClick={() => setExpanded(!expanded)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: '6px',
          fontFamily: "'Poppins',sans-serif", fontSize: 'var(--fs-meta)', fontWeight: '700', color: '#b6c548',
          textAlign: 'left',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b6c548" strokeWidth="3" strokeLinecap="round"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s', flexShrink: 0 }}>
            <path d="M6 9l6 6 6-6"/>
          </svg>
          {expanded ? 'Hide' : 'View'} Qualifications
        </button>

        {expanded && (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {job.qualifications.map((q, i) => (
              <li key={i} style={{ display: 'flex', gap: '8px', fontFamily: "'Poppins',sans-serif", fontSize: 'var(--fs-body)', color: '#8A5F3C', lineHeight: 1.55 }}>
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
          borderRadius: '999px', cursor: 'pointer',
          fontFamily: "'Poppins',sans-serif", fontSize: 'var(--fs-body)', fontWeight: '800',
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

        {/* ── SINGLE BACKGROUND WRAPPER — one texture, one overlay, no seams ── */}
        <div style={{ position:'relative', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'1920px auto', backgroundRepeat:'repeat-y', backgroundPosition:'center top', backgroundColor:'#F3F2EE' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          {/* HERO */}
          <div style={{ position:'relative', zIndex:1, padding:'clamp(40px,7vw,80px) clamp(16px,4vw,32px) clamp(32px,5vw,60px)', textAlign:'center' }}>
            <span style={{ display:'inline-block', background:'#b6c548', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'4px 14px', borderRadius:'999px', fontFamily:'Poppins,sans-serif', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'20px' }}>
              {activeJobs.length} Opening{activeJobs.length !== 1 ? 's' : ''} Available
            </span>
            <h1 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', lineHeight:1.1, margin:'0 0 16px' }}>
              Join the <span style={{ color:'#b6c548' }}>Avocadoria</span> Family
            </h1>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:'var(--c-dark)', opacity:0.7, maxWidth:'560px', margin:'0 auto' }}>
              Be part of a joyful, growing team that's spreading happiness in avocado across the Philippines. We're looking for passionate, energetic crew members to join us!
            </p>
          </div>

          {/* JOB LISTINGS */}
          <div style={{ position:'relative', zIndex:1, padding:'clamp(32px,5vw,64px) clamp(16px,4vw,32px)' }}>
            <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
              <div style={{ textAlign:'center', marginBottom:'48px' }}>
                <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin:'0 0 8px', lineHeight:1.1 }}>
                  Current Openings
                </h2>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:'var(--c-dark)', opacity:0.7, margin:0 }}>
                  Tap a card to see qualifications · Click Apply Now to send your CV
                </p>
              </div>

              {activeJobs.length === 0 ? (
                <div style={{ textAlign:'center', padding:'64px 24px' }}>
                  <h3 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize:'22px', fontWeight:'normal', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', margin:'0 0 8px' }}>No openings right now</h3>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'14px', color:'rgba(138,95,60,0.7)', maxWidth:'380px', margin:'0 auto' }}>
                    Check back soon or send your resume to <a href="mailto:official@avocadoria.com.ph" style={{ color:'#b6c548' }}>official@avocadoria.com.ph</a> — we'd love to keep your profile on file.
                  </p>
                </div>
              ) : (() => {
                const hqJobs    = activeJobs.filter(j => j.branch === 'Head Office')
                const storeJobs = activeJobs.filter(j => j.branch !== 'Head Office')
                const GroupHeading = ({ title, sub }) => (
                  <div style={{ marginBottom:'28px' }}>
                    <h3 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(2.4rem,6vw,4rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin:'0 0 4px', lineHeight:1.1 }}>
                      {title}
                    </h3>
                    <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', color:'rgba(138,95,60,0.7)', margin:0 }}>{sub}</p>
                  </div>
                )
                return (
                  <div style={{ display:'flex', flexDirection:'column', gap:'64px' }}>
                    {hqJobs.length > 0 && (
                      <div>
                        <GroupHeading title="Corporate / In-House" sub="Based at Head Office · Marikina City · Send CV to avocadoriatccc.recruitment@gmail.com" />
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'28px' }}>
                          {hqJobs.map(job => <JobCard key={job.id} job={job} onApply={setActiveJob} />)}
                        </div>
                      </div>
                    )}
                    {storeJobs.length > 0 && (
                      <div>
                        <GroupHeading title="In-Store Openings" sub="Branch-based positions · Apply directly to the branch email" />
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'28px' }}>
                          {storeJobs.map(job => <JobCard key={job.id} job={job} onApply={setActiveJob} />)}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* WHY JOIN US */}
          <div style={{ position:'relative', zIndex:1, padding:'clamp(32px,5vw,64px) clamp(16px,4vw,32px)' }}>
            <div style={{ maxWidth:'1000px', margin:'0 auto', textAlign:'center' }}>
              <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin:'0 0 40px', lineHeight:1.1 }}>Why Work With Us?</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'20px' }}>
                {[
                  { title:'Growth',    desc:'Learn and grow with a fast-expanding brand' },
                  { title:'Community', desc:'Be part of a joyful, supportive team' },
                  { title:'Pride',     desc:'Work for the No. 1 avocado dessert brand' },
                  { title:'Training',  desc:'Full training provided — no experience required' },
                  { title:'Purpose',   desc:'Support local farmers and communities' },
                ].map((w, i) => (
                  <div key={i} style={{ background:'rgba(255,255,255,0.08)', borderRadius:'16px', padding:'24px 16px' }}>
                    <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'15px', fontWeight:'800', color:'#3a6b35', marginBottom:'8px', textShadow:'-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff', letterSpacing:'0.04em', textTransform:'uppercase' }}>{w.title}</div>
                    <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'15px', fontWeight:'600', color:'#8A5F3C', lineHeight:'1.55', textShadow:'0 1px 0 rgba(255,255,255,0.9)' }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GENERAL APPLICATION */}
          <div style={{ position:'relative', zIndex:1, padding:'clamp(32px,5vw,64px) clamp(16px,4vw,32px)', textAlign:'center' }}>
            <div style={{ maxWidth:'560px', margin:'0 auto' }}>
              <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin:'0 0 10px', lineHeight:1.1 }}>Don't see your branch?</h2>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:'var(--c-dark)', opacity:0.7, lineHeight:'1.7', margin:'0 0 24px' }}>
                Send your CV to our general recruitment inbox and we'll keep your profile on file for future openings.
              </p>
              <a
                href="mailto:official@avocadoria.com.ph?subject=General Application - Store Crew"
                style={{ display:'inline-block', background:'#b6c548', color:'#fff', padding:'13px 32px', borderRadius:'999px', fontFamily:'Poppins,sans-serif', fontSize:'15px', fontWeight:'800', textDecoration:'none', transition:'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
                onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
              >
                Send General Application
              </a>
            </div>
          </div>

        </div>{/* end background wrapper */}

      </div>

      {/* ── Apply Modal ── */}
      {activeJob && <ApplyModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </>
  )
}
