import SEO from '@/components/ui/SEO'
import { OUR_STORY } from '@/data/posts'

export default function OurStoryPage() {
  return (
    <>
      <SEO title="Our Story" description={OUR_STORY.subheading} path="/about/our-story"/>
      <div style={{
        position:'relative', minHeight:'100vh',
        backgroundImage:"url('/website_layer_1.png')", backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F3F2EE',
      }}>
        <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:'900px', margin:'0 auto', padding:'clamp(52px,7vw,88px) clamp(20px,5vw,72px)' }}>

      {/* Headline */}
      <div style={{ textAlign:'center', marginBottom:'48px' }}>
        <h2 style={{
          fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
          fontSize:'clamp(1.6rem,4vw,2.8rem)',
          fontWeight:'normal', color:'var(--c-olive)',
          textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff',
          margin:'0 0 8px', lineHeight:1.1,
        }}>
          {OUR_STORY.headline}
        </h2>
        <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'16px', color:'rgba(138,95,60,0.75)', maxWidth:'540px', margin:'0 auto', lineHeight:1.65 }}>
          {OUR_STORY.subheading}
        </p>
        {/* Founded badge */}
        <span style={{
          display:'inline-block', marginTop:'16px',
          background:'#b6c548', color:'#fff',
          fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:'800',
          padding:'5px 18px', borderRadius:'999px', letterSpacing:'0.06em',
        }}>
          Founded {OUR_STORY.founded}
        </span>
      </div>

      {/* Story sections */}
      <div style={{ display:'flex', flexDirection:'column', gap:'40px' }}>
        {OUR_STORY.sections.map((sec, i) => (
          <div key={sec.id} className={sec.image ? 'story-section story-section--split' : 'story-section'} style={{
            display:'grid',
            gap:'32px', alignItems:'center',
          }}>
            {sec.image && i % 2 === 0 && (
              <img src={sec.image} alt={sec.title}
                style={{ width:'100%', borderRadius:'16px', objectFit:'cover', maxHeight:'280px' }}
                    loading="lazy" decoding="async"
                  />
            )}
            <div>
              <div style={{
                width:'36px', height:'4px', borderRadius:'2px',
                background:'#b6c548', marginBottom:'14px',
              }}/>
              <h3 style={{
                fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                fontSize:'clamp(1.6rem,4vw,2.8rem)',
                fontWeight:'normal', color:'var(--c-olive)',
                textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff',
                margin:'0 0 8px', lineHeight:1.1,
              }}>
                {sec.title}
              </h3>
              <p style={{
                fontFamily:'Poppins,sans-serif', fontSize:'15px',
                color:'rgba(138,95,60,0.85)', lineHeight:1.75, margin:0,
              }}>
                {sec.content}
              </p>
            </div>
            {sec.image && i % 2 === 1 && (
              <img src={sec.image} alt={sec.title}
                style={{ width:'100%', borderRadius:'16px', objectFit:'cover', maxHeight:'280px' }}
                    loading="lazy" decoding="async"
                  />
            )}
          </div>
        ))}
      </div>

      {/* Stats strip */}
      <style>{`.story-section { grid-template-columns:1fr; } .story-section--split { grid-template-columns:1fr 1fr; } @media(max-width:767px){ .story-section--split{ grid-template-columns:1fr; gap:20px; } } .story-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:56px; background:rgba(255,255,255,0.7); border-radius:20px; padding:32px; border:1.5px solid rgba(182,197,72,0.2); } @media(max-width:767px){ .story-stats{ grid-template-columns:1fr; text-align:center; } }`}</style>
      <div className="story-stats">
        {[
          { num:'7+',    label:'Years of happiness' },
          { num:'100K+', label:'Cups served'        },
          { num:'50+',   label:'Branches nationwide'},
        ].map((s,i) => (
          <div key={i} style={{ textAlign:'center' }}>
            <div style={{
              fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontSize:'clamp(2rem,4vw,3rem)', color:'#b6c548', fontWeight:'normal',
            }}>
              {s.num}
            </div>
            <div style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', color:'rgba(138,95,60,0.7)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
        </div>
      </div>
    </>
  )
}
