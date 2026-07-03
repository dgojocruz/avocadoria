import { useParams, Link } from 'react-router-dom'
import SEO from '@/components/ui/SEO'
import { JOBS, buildApplyUrl } from '@/data/careersJobs'

export default function CareersJobPage() {
  const { jobId } = useParams()
  const job = JOBS.find(j => j.id === jobId && j.active)

  if (!job) {
    return (
      <div className="page-enter">
        <div style={{ position:'relative', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'1920px auto', backgroundRepeat:'repeat-y', backgroundPosition:'center top', backgroundColor:'#F3F2EE', minHeight:'60vh' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, padding:'clamp(80px,12vw,140px) clamp(16px,4vw,32px) clamp(60px,8vw,100px)', textAlign:'center' }}>
            <h1 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(1.6rem,4vw,2.4rem)', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin:'0 0 16px' }}>
              This position isn't available anymore
            </h1>
            <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'18px', color:'rgba(138,95,60,0.7)', maxWidth:'420px', margin:'0 auto 28px' }}>
              It may have been filled or the listing has changed. Check our current openings below.
            </p>
            <Link to="/careers" style={{ display:'inline-block', background:'#b6c548', color:'#fff', padding:'14px 32px', borderRadius:'999px', fontFamily:'Poppins,sans-serif', fontSize:'17px', fontWeight:'800', textDecoration:'none' }}>
              ← Back to All Openings
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={`${job.role} — Careers`}
        description={`${job.role} at ${job.branch}, ${job.location}. ${job.type}. Apply now to join the Avocadoria family.`}
        path={`/careers/${job.id}`}
      />
      <div className="page-enter">
        <div style={{ position:'relative', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'1920px auto', backgroundRepeat:'repeat-y', backgroundPosition:'center top', backgroundColor:'#F3F2EE' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />

          <div style={{ position:'relative', zIndex:1, padding:'clamp(64px,10vw,120px) clamp(16px,4vw,32px) clamp(48px,7vw,88px)' }}>
            <div style={{ maxWidth:'760px', margin:'0 auto' }}>

              <Link to="/careers" style={{
                display:'inline-flex', alignItems:'center', gap:'6px',
                fontFamily:'Poppins,sans-serif', fontSize:'15px', fontWeight:'700',
                color:'#3a6b35', textDecoration:'none', marginBottom:'24px',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3a6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to All Openings
              </Link>

              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'16px' }}>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:'6px',
                  background:'rgba(138,95,60,0.08)', borderRadius:'8px', padding:'6px 12px',
                  fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:'600', color:'#8A5F3C',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b6c548" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {job.branch}, {job.location}
                </span>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:'6px',
                  background:'rgba(182,197,72,0.15)', borderRadius:'8px', padding:'6px 12px',
                  fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:'600', color:'#3a6b35',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3a6b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                  </svg>
                  {job.type}
                </span>
              </div>

              <h1 style={{
                fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal',
                fontSize:'clamp(2rem,5vw,3.2rem)', color:'var(--c-olive)',
                textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff',
                lineHeight:1.1, margin:'0 0 32px',
              }}>
                {job.role}
              </h1>

              <div style={{
                borderRadius:'24px', border:'1.5px solid rgba(182,197,72,0.3)',
                background:'rgba(255,255,255,0.55)', backdropFilter:'blur(6px)',
                padding:'clamp(24px,4vw,40px)',
              }}>
                <p style={{
                  fontFamily:"'Poppins',sans-serif", fontSize:'15px', fontWeight:'700', color:'#b6c548',
                  letterSpacing:'0.08em', textTransform:'uppercase', margin:'0 0 16px',
                }}>
                  Qualifications
                </p>
                <ul style={{ margin:'0 0 32px', padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:'10px' }}>
                  {job.qualifications.map((q, i) => (
                    <li key={i} style={{ display:'flex', gap:'12px', fontFamily:"'Poppins',sans-serif", fontSize:'18px', color:'#8A5F3C', lineHeight:1.55 }}>
                      <span style={{ color:'#b6c548', fontWeight:'900', flexShrink:0 }}>—</span>
                      {q}
                    </li>
                  ))}
                </ul>

                <a
                  href={buildApplyUrl(job)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:'block', width:'100%', padding:'16px', textAlign:'center',
                    background:'#b6c548', color:'#fff', textDecoration:'none',
                    borderRadius:'999px', cursor:'pointer',
                    fontFamily:"'Poppins',sans-serif", fontSize:'18px', fontWeight:'800',
                    transition:'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#3a6b35'}
                  onMouseLeave={e => e.currentTarget.style.background = '#b6c548'}
                >
                  Apply Now
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
