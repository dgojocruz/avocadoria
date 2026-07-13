import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@/components/ui/SEO'
import { JOBS, buildApplyUrl } from '@/data/careersJobs'
// ─────────────────────────────────────────────────────────────────────────────
// Job data lives in src/data/careersJobs.js — edit that file to add, remove,
// or update job postings. This page only handles filtering/display.
// ─────────────────────────────────────────────────────────────────────────────

// ── Filter Pill — styled <select> dropdown ──────────────────────────────────
function FilterPill({ value, onChange, options, allLabel, highlighted }) {
  return (
    <div style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center',
      background: highlighted ? '#b6c548' : '#fff',
      border: `1.5px solid ${highlighted ? '#b6c548' : 'rgba(182,197,72,0.4)'}`,
      borderRadius: '999px',
      padding: '10px 40px 10px 20px',
      minWidth: '160px',
    }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
          background: 'transparent', border: 'none', outline: 'none', cursor: 'pointer',
          fontFamily: "'Poppins',sans-serif", fontSize: '15px', fontWeight: '600',
          color: highlighted ? '#fff' : '#3a6b35',
          width: '100%',
        }}
      >
        <option value="">{allLabel}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={highlighted ? '#fff' : '#b6c548'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </div>
  )
}

// ── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={`/careers/${job.id}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', textDecoration: 'none', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))',
        backdropFilter: 'blur(2px)',
        border: `1.5px solid ${hov ? 'var(--c-olive)' : 'rgba(182,197,72,0.28)'}`,
        borderRadius: '18px',
        padding: '24px',
        transition: 'all 0.25s ease',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov
          ? '0 1px 0 rgba(255,255,255,0.55) inset, 0 -10px 22px -14px rgba(58,107,53,0.14) inset, 0 18px 34px rgba(58,107,53,0.18)'
          : '0 1px 0 rgba(255,255,255,0.45) inset, 0 -8px 16px -12px rgba(58,107,53,0.08) inset, 0 4px 12px rgba(58,107,53,0.07)',
      }}
    >
      {/* subtle top sheen — reinforces the raised/embossed feel */}
      <span style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
      }} />

      <h3 style={{
        fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight: 'normal',
        fontSize: 'clamp(18px,1.9vw,22px)', color: 'var(--c-olive)',
        textShadow: '-1.5px -1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px 1.5px 0 #fff',
        margin: '0 0 4px', lineHeight: 1.2,
      }}>
        {job.role}
      </h3>
      <p style={{
        fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(15px,1.3vw,18px)', fontWeight: '700',
        color: '#8A5F3C', opacity: 0.75, margin: '0 0 12px',
      }}>
        {job.branch}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(138,95,60,0.08)', borderRadius: '8px', padding: '6px 12px',
          fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: '600', color: '#8A5F3C',
          boxShadow: 'inset 0 1px 2px rgba(58,107,53,0.12), inset 0 -1px 0 rgba(255,255,255,0.6)',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b6c548" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {job.location}
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(182,197,72,0.15)', borderRadius: '8px', padding: '6px 12px',
          fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: '600', color: '#3a6b35',
          boxShadow: 'inset 0 1px 2px rgba(58,107,53,0.10), inset 0 -1px 0 rgba(255,255,255,0.5)',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3a6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
          {job.type}
        </span>
      </div>
    </Link>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CareersPage() {
  const activeJobs = JOBS.filter(j => j.active)
  const [region, setRegion]         = useState('')
  const [city, setCity]             = useState('')
  const [jobType, setJobType]       = useState('')

  const regions     = useMemo(() => [...new Set(activeJobs.map(j => j.region))].sort(), [activeJobs])
  const cities       = useMemo(() => [...new Set(activeJobs.filter(j => !region || j.region === region).map(j => j.city))].sort(), [activeJobs, region])
  const jobTypes     = useMemo(() => [...new Set(activeJobs.map(j => j.type))].sort(), [activeJobs])

  const filteredJobs = useMemo(() => activeJobs.filter(j =>
    (!region || j.region === region) &&
    (!city || j.city === city) &&
    (!jobType || j.type === jobType)
  ), [activeJobs, region, city, jobType])

  const hasActiveFilters = region || city || jobType
  const clearFilters = () => { setRegion(''); setCity(''); setJobType('') }

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
          <div style={{ position:'relative', zIndex:1, padding:'clamp(64px,10vw,120px) clamp(16px,4vw,32px) clamp(32px,5vw,60px)', textAlign:'center' }}>
            <span style={{ display:'inline-block', background:'#b6c548', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'4px 14px', borderRadius:'999px', fontFamily:'Poppins,sans-serif', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'20px' }}>
              {activeJobs.length} Opening{activeJobs.length !== 1 ? 's' : ''} Available
            </span>
            <h1 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', lineHeight:1.1, margin:'0 0 16px' }}>
              Join the <span style={{ color:'#b6c548' }}>Avocadoria</span> Family
            </h1>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:'clamp(15px,2vw,20px)', color:'var(--c-dark)', opacity:0.7, maxWidth:'560px', margin:'0 auto' }}>
              Be part of a joyful, growing team that's spreading happiness in avocado across the Philippines. We're looking for passionate, energetic crew members to join us!
            </p>
          </div>

          {/* JOB LISTINGS */}
          <div style={{ position:'relative', zIndex:1, padding:'clamp(32px,5vw,64px) clamp(16px,4vw,32px)' }}>
            <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
              <div style={{ textAlign:'center', marginBottom:'32px' }}>
                <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin:'0 0 8px', lineHeight:1.1 }}>
                  Current Openings
                </h2>
                <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:'clamp(15px,2vw,20px)', color:'var(--c-dark)', opacity:0.7, margin:0 }}>
                  Filter by location, then click a position to view details and apply
                </p>
              </div>

              {activeJobs.length === 0 ? (
                <div style={{ textAlign:'center', padding:'64px 24px' }}>
                  <h3 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize:'22px', fontWeight:'normal', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff', margin:'0 0 8px' }}>No openings right now</h3>
                  <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'18px', color:'rgba(138,95,60,0.7)', maxWidth:'380px', margin:'0 auto' }}>
                    Check back soon or <a href={buildApplyUrl({ role: 'General Application', branch: 'Head Office' })} target="_blank" rel="noopener noreferrer" style={{ color:'#b6c548' }}>send a general application</a> — we'd love to keep your profile on file.
                  </p>
                </div>
              ) : (
                <>
                  {/* Filter pills */}
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center', marginBottom:'36px' }}>
                    <FilterPill
                      allLabel="All Locations"
                      value={region}
                      onChange={v => { setRegion(v); setCity('') }}
                      options={regions}
                      highlighted={!!region}
                    />
                    <FilterPill
                      allLabel="All Cities"
                      value={city}
                      onChange={setCity}
                      options={cities}
                      highlighted={!!city}
                    />
                    <FilterPill
                      allLabel="All Job Types"
                      value={jobType}
                      onChange={setJobType}
                      options={jobTypes}
                      highlighted={!!jobType}
                    />
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        style={{
                          background:'transparent', border:'none', cursor:'pointer',
                          fontFamily:"'Poppins',sans-serif", fontSize:'15px', fontWeight:'700',
                          color:'#8A5F3C', textDecoration:'underline', padding:'10px 8px',
                        }}
                      >
                        Clear filters
                      </button>
                    )}
                  </div>

                  {/* Results grid */}
                  {filteredJobs.length === 0 ? (
                    <div style={{ textAlign:'center', padding:'48px 24px' }}>
                      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'18px', color:'rgba(138,95,60,0.7)', margin:0 }}>
                        No positions match those filters. <button onClick={clearFilters} style={{ background:'none', border:'none', color:'#b6c548', fontWeight:'700', cursor:'pointer', fontFamily:'inherit', fontSize:'inherit', padding:0, textDecoration:'underline' }}>Clear filters</button>
                      </p>
                    </div>
                  ) : (
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'20px' }}>
                      {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* WHY JOIN US */}
          <div style={{ position:'relative', zIndex:1, padding:'clamp(32px,6vw,72px) clamp(16px,4vw,32px)', textAlign:'center' }}>
            <div style={{ maxWidth:'1400px', margin:'0 auto' }}>
              <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin:'0 0 48px', lineHeight:1.1 }}>Why Work With Us?</h2>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'20px' }}>
                {[
                  { title:'Growth',    desc:'Learn and grow with a fast-expanding brand' },
                  { title:'Community', desc:'Be part of a joyful, supportive team' },
                  { title:'Pride',     desc:'Work for the No. 1 avocado dessert brand' },
                  { title:'Training',  desc:'Full training provided — no experience required' },
                  { title:'Purpose',   desc:'Support local farmers and communities' },
                ].map((w, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    padding: '32px 20px',
                    backdropFilter: 'blur(2px)',
                  }}>
                    <div style={{
                      fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize: 'clamp(18px,1.9vw,22px)', fontWeight: 'normal',
                      color: '#b6c548', letterSpacing: '0.04em',
                      marginBottom: '14px',
                      textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff',
                    }}>{w.title}</div>
                    <div style={{
                      fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(15px,1.3vw,18px)', fontWeight: '500',
                      color: '#8A5F3C', lineHeight: '1.6',
                      textShadow: '0 1px 0 rgba(255,255,255,0.9)',
                    }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GENERAL APPLICATION */}
          <div style={{ position:'relative', zIndex:1, padding:'clamp(32px,5vw,64px) clamp(16px,4vw,32px)', textAlign:'center' }}>
            <div style={{ maxWidth:'560px', margin:'0 auto' }}>
              <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.8rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff', margin:'0 0 10px', lineHeight:1.1 }}>Don't see your branch?</h2>
              <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:'clamp(15px,2vw,20px)', color:'var(--c-dark)', opacity:0.7, lineHeight:'1.7', margin:'0 0 24px' }}>
                Send your CV to our general recruitment inbox and we'll keep your profile on file for future openings.
              </p>
              <a
                href={buildApplyUrl({ role: 'General Application', branch: 'Head Office' })}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display:'inline-block', background:'#b6c548', color:'#fff', padding:'14px 32px', borderRadius:'999px', fontFamily:'Poppins,sans-serif', fontSize:'17px', fontWeight:'800', textDecoration:'none', transition:'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
                onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
              >
                Send General Application
              </a>
            </div>
          </div>

        </div>{/* end background wrapper */}

      </div>

    </>
  )
}
