import SEO from '@/components/ui/SEO'
import { OUR_STORY } from '@/data/posts'

export default function OurStoryPage() {
  return (
    <>
      <SEO title="Our Story" description={OUR_STORY.subheading} path="/about/our-story"/>

      {/* Headline */}
      <div style={{ textAlign:'center', marginBottom:'48px' }}>
        <h2 style={{
          fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
          fontSize:'clamp(1.8rem,3.5vw,2.8rem)',
          fontWeight:'normal', color:'#3a6b35', margin:'0 0 10px',
        }}>
          {OUR_STORY.headline}
        </h2>
        <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'16px', color:'rgba(138,95,60,0.75)', maxWidth:'540px', margin:'0 auto', lineHeight:1.65 }}>
          {OUR_STORY.subheading}
        </p>
        {/* Founded badge */}
        <span style={{
          display:'inline-block', marginTop:'16px',
          background:'#b6c548', color:'#fff',
          fontFamily:'Nunito,sans-serif', fontSize:'12px', fontWeight:'800',
          padding:'5px 18px', borderRadius:'999px', letterSpacing:'0.06em',
        }}>
          Founded {OUR_STORY.founded}
        </span>
      </div>

      {/* Story sections */}
      <div style={{ display:'flex', flexDirection:'column', gap:'40px' }}>
        {OUR_STORY.sections.map((sec, i) => (
          <div key={sec.id} style={{
            display:'grid',
            gridTemplateColumns: sec.image ? '1fr 1fr' : '1fr',
            gap:'32px', alignItems:'center',
          }}>
            {sec.image && i % 2 === 0 && (
              <img src={sec.image} alt={sec.title}
                style={{ width:'100%', borderRadius:'16px', objectFit:'cover', maxHeight:'280px' }}/>
            )}
            <div>
              <div style={{
                width:'36px', height:'4px', borderRadius:'2px',
                background:'#b6c548', marginBottom:'14px',
              }}/>
              <h3 style={{
                fontFamily:'Nunito,sans-serif', fontSize:'clamp(1.2rem,2vw,1.6rem)',
                fontWeight:'800', color:'#3a6b35', margin:'0 0 12px',
              }}>
                {sec.title}
              </h3>
              <p style={{
                fontFamily:'Nunito,sans-serif', fontSize:'15px',
                color:'rgba(138,95,60,0.85)', lineHeight:1.75, margin:0,
              }}>
                {sec.content}
              </p>
            </div>
            {sec.image && i % 2 === 1 && (
              <img src={sec.image} alt={sec.title}
                style={{ width:'100%', borderRadius:'16px', objectFit:'cover', maxHeight:'280px' }}/>
            )}
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(3,1fr)',
        gap:'16px', marginTop:'56px',
        background:'rgba(255,255,255,0.7)',
        borderRadius:'20px', padding:'32px',
        border:'1.5px solid rgba(182,197,72,0.2)',
      }}>
        {[
          { num:'7+',    label:'Years of happiness' },
          { num:'100K+', label:'Cups served'        },
          { num:'50+',   label:'Branches nationwide'},
        ].map((s,i) => (
          <div key={i} style={{ textAlign:'center' }}>
            <div style={{
              fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",
              fontSize:'clamp(2rem,4vw,3rem)', color:'#b6c548', fontWeight:'normal',
            }}>
              {s.num}
            </div>
            <div style={{ fontFamily:'Nunito,sans-serif', fontSize:'13px', color:'rgba(138,95,60,0.7)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
