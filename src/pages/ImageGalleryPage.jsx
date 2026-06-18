import { useState } from 'react'
import SEO from '@/components/ui/SEO'

const PHOTOS = [
  { id:  1, src: '/gallery/tb-group-1.webp',      title: 'Team Building 2025 — Group Photo',     event: 'Team Building', date: '2025' },
  { id:  2, src: '/gallery/tb-group-2.webp',      title: 'Team Building 2025 — Full Team',       event: 'Team Building', date: '2025' },
  { id: 10, src: '/gallery/tb-group-3.webp',      title: 'Team Building 2025 — Night Photo',     event: 'Team Building', date: '2025' },
  { id:  3, src: '/gallery/tb-activities-1.webp', title: 'Building Bridges — Activity 1',        event: 'Team Building', date: '2025' },
  { id:  5, src: '/gallery/tb-activities-2.webp', title: 'Building Bridges — Human Pyramid',     event: 'Team Building', date: '2025' },
  { id:  6, src: '/gallery/tb-activities-3.webp', title: 'Building Bridges — Purple Team',       event: 'Team Building', date: '2025' },
  { id:  7, src: '/gallery/tb-activities-4.webp', title: 'Building Bridges — Green Team Race',   event: 'Team Building', date: '2025' },
  { id:  8, src: '/gallery/tb-activities-5.webp', title: 'Building Bridges — Blue Team',         event: 'Team Building', date: '2025' },
  { id:  9, src: '/gallery/tb-activities-6.webp', title: 'Building Bridges — Group Games',       event: 'Team Building', date: '2025' },
  { id:  4, src: '/gallery/grand-opening-1.webp', title: 'Grand Opening — Avocadoria.ph Kiosk', event: 'Grand Opening', date: '2025' },
  { id: 11, src: '/gallery/avo-buddy-expo.webp',  title: 'Avo-Buddy at the Franchise Expo',      event: 'Expo',          date: '2025' },
  { id: 12, src: '/gallery/franchise-expo.webp',  title: 'Franchise Asia Philippines 2025',      event: 'Expo',          date: '2025' },
]

const EVENT_TAGS = ['All', ...Array.from(new Set(PHOTOS.map(p => p.event)))]

const HEADING_STYLE = {
  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
  fontWeight: 'normal',
  fontSize:   'clamp(1.6rem,4vw,2.8rem)',
  color:      'var(--c-olive)',
  textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff',
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
        boxShadow: 'none',
        cursor: photo.src ? 'pointer' : 'default',
        transition: 'transform 0.25s ease',
        aspectRatio: '4/3',
      }}
      onMouseEnter={e => { if (photo.src) e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)' }}
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
    </div>
  )
}

export default function ImageGalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const filtered = filter === 'All' ? PHOTOS : PHOTOS.filter(p => p.event === filter)

  return (
    <>
      <SEO title="Image Gallery" description="Browse photos from Avocadoria franchise events, grand openings, and community moments." path="/gallery/photos" />
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
            <h1 style={HEADING_STYLE}>Image Gallery</h1>
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

        {/* PHOTO GRID */}
        <section style={{ position:'relative', overflow:'hidden', padding:'16px 16px 64px', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'cover', backgroundColor:'#F3F2EE' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'1400px', margin:'0 auto' }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))', gap:'12px' }}>
              {filtered.map(p => <PhotoCard key={p.id} photo={p} onClick={setLightbox} />)}
            </div>
            <p style={{ textAlign:'center', fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'rgba(138,95,60,0.5)', marginTop:'40px' }}>
              More photos being added regularly. Follow us on <a href="https://www.facebook.com/avocadoria.ph" target="_blank" rel="noopener noreferrer" style={{ color:'#b6c548', fontWeight:'600' }}>Facebook</a> for the latest!
            </p>
          </div>
        </section>

      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.88)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth:'900px', width:'100%' }}>
            <img src={lightbox.src} alt={lightbox.title} style={{ width:'100%', display:'block', maxHeight:'80vh', objectFit:'contain', borderRadius:'16px' }} />
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
