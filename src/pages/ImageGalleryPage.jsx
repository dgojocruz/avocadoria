import { useState } from 'react'
import SEO from '@/components/ui/SEO'

const PHOTOS = [
  { id: 1, src: '/gallery/grand-opening-zamboanga.webp',           title: 'SM City Zamboanga',           event: 'Grand Openings' },
  { id: 2, src: '/gallery/grand-opening-robinsons-galleria.webp',  title: 'Robinsons Galleria',          event: 'Grand Openings' },
  { id: 3, src: '/gallery/grand-opening-sm-masinag.webp',          title: 'SM Masinag',                  event: 'Grand Openings' },
  { id: 4, src: '/gallery/grand-opening-thailand.webp',            title: 'Thailand',                    event: 'Grand Openings' },
  { id: 5, src: '/gallery/grand-opening-upad-hotel.webp',          title: 'UPAD Hotel',                  event: 'Grand Openings' },
]

const EVENT_TAGS = ['All', ...Array.from(new Set(PHOTOS.map(p => p.event)))]

const HEADING_STYLE = {
  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
  fontWeight: 'normal',
  fontSize:   'clamp(1.6rem,4vw,2.8rem)',
  color:      'var(--c-olive)',
  textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff',
  margin:     '0 0 8px',
  lineHeight: 1.1,
}

function PhotoCard({ photo, onClick }) {
  return (
    <div
      onClick={() => photo.src && onClick(photo)}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'transparent',
        border: 'none',
        boxShadow: '0 4px 18px rgba(58,107,53,0.13)',
        cursor: photo.src ? 'pointer' : 'default',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        aspectRatio: '4/3',
        position: 'relative',
      }}
      onMouseEnter={e => { if (photo.src) { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(58,107,53,0.22)' } }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 18px rgba(58,107,53,0.13)' }}
    >
      {photo.src
        ? <img src={photo.src} alt={photo.title}
            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', borderRadius:'16px' }}
            loading="lazy" decoding="async"
          />
        : <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#d9e29e,#b6c548)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2.5" fill="rgba(255,255,255,0.6)"/>
              <circle cx="12" cy="12" r="3.2" fill="rgba(255,255,255,0.8)"/>
            </svg>
          </div>
      }
      {/* Title overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(30,61,27,0.75) 0%, transparent 100%)',
        borderRadius: '0 0 16px 16px',
        padding: '28px 14px 12px',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
          fontSize: 'clamp(13px,2vw,17px)',
          fontWeight: 'normal',
          color: '#b6c548',
          textShadow: '-1.5px -1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px 1.5px 0 #fff',
          margin: 0,
          lineHeight: 1.2,
          letterSpacing: '0.03em',
        }}>
          🥑 Grand Opening — {photo.title}
        </p>
      </div>
    </div>
  )
}

export default function ImageGalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const filtered = filter === 'All' ? PHOTOS : PHOTOS.filter(p => p.event === filter)

  return (
    <>
      <SEO title="Snapshots" description="Browse photos from Avocadoria franchise events, grand openings, and community moments." path="/gallery/photos" />
      <div className="page-enter">

        {/* HERO */}
        <section style={{ position:'relative', overflow:'hidden', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F3F2EE', padding:'100px 32px 72px', textAlign:'center' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'680px', margin:'0 auto' }}>
            <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'linear-gradient(135deg,#d9e29e,#b6c548)', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(182,197,72,0.4)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2.5" fill="#fff" opacity="0.9"/>
                <circle cx="12" cy="12" r="3.5" fill="#3a6b35"/>
                <circle cx="18" cy="7" r="1.2" fill="#3a6b35"/>
              </svg>
            </div>
            <h1 style={HEADING_STYLE}>Snapshots</h1>
            <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', color:'rgba(138,95,60,0.8)', marginBottom:'24px' }}>
              Photos from our grand openings, franchise events, and behind-the-scenes moments.
            </p>
            <a href="/franchise#franchise-gallery" style={{ fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'#3a6b35', fontWeight:'600', textDecoration:'none' }}>← Back to Franchise</a>
          </div>
        </section>

        {/* FILTER TABS */}
        <section style={{ position:'relative', padding:'32px 32px 16px', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'cover', backgroundColor:'#F3F2EE' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'1400px', margin:'0 auto', display:'flex', flexWrap:'wrap', gap:'10px', justifyContent:'center' }}>
            {EVENT_TAGS.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{
                fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:'700',
                padding:'8px 20px', borderRadius:'999px', border:'2px solid', cursor:'pointer', transition:'all 0.2s',
                background: filter === tag ? '#b6c548' : 'rgba(255,255,255,0.8)',
                borderColor: filter === tag ? '#b6c548' : 'rgba(182,197,72,0.4)',
                color: filter === tag ? '#fff' : '#3a6b35',
              }}>{tag}</button>
            ))}
          </div>
        </section>

        {/* GROUPED PHOTO GRID */}
        <section style={{ position:'relative', overflow:'hidden', padding:'16px 16px 64px', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'cover', backgroundColor:'#F3F2EE' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'1400px', margin:'0 auto' }}>
            {Array.from(new Set(filtered.map(p => p.event))).map(group => (
              <div key={group} style={{ marginBottom:'48px' }}>
                {/* Group heading */}
                <h2 style={{
                  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                  fontWeight: 'normal',
                  fontSize: 'clamp(1.4rem,3.5vw,2.2rem)',
                  color: '#b6c548',
                  textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff',
                  margin: '0 0 18px',
                  lineHeight: 1.1,
                  letterSpacing: '0.04em',
                }}>
                  {group}
                </h2>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'14px' }}>
                  {filtered.filter(p => p.event === group).map(p => (
                    <PhotoCard key={p.id} photo={p} onClick={setLightbox} />
                  ))}
                </div>
              </div>
            ))}
            <p style={{ textAlign:'center', fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'rgba(138,95,60,0.5)', marginTop:'8px' }}>
              More photos being added regularly. Follow us on <a href="https://www.facebook.com/avocadoria.official" target="_blank" rel="noopener noreferrer" style={{ color:'#b6c548', fontWeight:'600' }}>Facebook</a> for the latest!
            </p>
          </div>
        </section>

      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.88)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:'900px', width:'100%' }}>
            <img src={lightbox.src} alt={lightbox.title} style={{ width:'100%', display:'block', maxHeight:'80vh', objectFit:'contain', borderRadius:'16px' }}  loading="lazy" decoding="async"/>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 4px 0' }}>
              <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:'700', color:'#fff' }}>{lightbox.title}</span>
              <button onClick={() => setLightbox(null)} style={{ background:'#b6c548', color:'#fff', border:'none', borderRadius:'999px', padding:'8px 20px', fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:'700', cursor:'pointer' }}>Close ✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
