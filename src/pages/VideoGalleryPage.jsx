import { useState } from 'react'
import SEO from '@/components/ui/SEO'

// ─── Add your YouTube video IDs and titles here ───────────────────────────────
const VIDEOS = [
  {
    id:       'placeholder1',
    title:    'Grand Opening — Avocadoria BGC',
    event:    'Grand Opening',
    date:     '2024',
    thumb:    'https://img.youtube.com/vi/placeholder1/hqdefault.jpg',
    youtubeId: '', // paste YouTube video ID here e.g. 'dQw4w9WgXcQ'
  },
  {
    id:       'placeholder2',
    title:    'Franchise Summit 2024',
    event:    'Franchise Event',
    date:     '2024',
    thumb:    '',
    youtubeId: '',
  },
  {
    id:       'placeholder3',
    title:    'Franchisee Spotlight — SM Fairview',
    event:    'Franchisee Story',
    date:     '2024',
    thumb:    '',
    youtubeId: '',
  },
]

const HEADING_STYLE = {
  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
  fontWeight: 'normal',
  fontSize:   'clamp(1.6rem,4vw,2.8rem)',
  color:      'var(--c-olive)',
  textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff',
  margin:     '0 0 8px',
  lineHeight: 1.1,
}

function VideoCard({ video, onClick }) {
  const hasVideo = !!video.youtubeId
  const thumb    = hasVideo
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : null

  return (
    <div
      onClick={() => hasVideo && onClick(video)}
      style={{
        background:    'rgba(255,255,255,0.85)',
        borderRadius:  '20px',
        overflow:      'hidden',
        border:        '2px solid rgba(182,197,72,0.3)',
        boxShadow:     '0 4px 20px rgba(0,0,0,0.07)',
        cursor:         hasVideo ? 'pointer' : 'default',
        transition:    'transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={e => { if (hasVideo) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(58,107,53,0.18)' }}}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)' }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#d9e29e', overflow: 'hidden' }}>
        {thumb
          ? <img src={thumb} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" decoding="async" />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #d9e29e, #b6c548)' }}>
              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#3a6b35', fontWeight: '600', opacity: 0.7 }}>Video Coming Soon</span>
            </div>
        }
        {/* Play overlay */}
        {hasVideo && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.25)', transition: 'background 0.2s' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polygon points="6,3 21,12 6,21" fill="#3a6b35" />
              </svg>
            </div>
          </div>
        )}
        {/* Event tag */}
        <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#b6c548', color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: '9px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {video.event}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 18px' }}>
        <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#b6c548', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px' }}>{video.date}</p>
        <h3 style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', fontWeight: '700', color: '#3a6b35', margin: 0, lineHeight: 1.4 }}>{video.title}</h3>
      </div>
    </div>
  )
}

export default function VideoGalleryPage() {
  const [active, setActive] = useState(null)

  return (
    <>
      <SEO
        title="Video Gallery"
        description="Watch Avocadoria franchise events, grand openings, and franchisee stories."
        path="/gallery/videos"
      />
      <div className="page-enter">

        {/* ── HERO ── */}
        <section style={{ position:'relative', overflow:'hidden', backgroundImage: "url('/website_layer_1.png')", backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F3F2EE', padding:'100px 32px 72px', textAlign:'center' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'680px', margin:'0 auto' }}>
            {/* Icon */}
            <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'linear-gradient(135deg,#b6c548,#3a6b35)', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(182,197,72,0.4)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <polygon points="6,3 21,12 6,21" fill="#fff" />
              </svg>
            </div>
            <h1 style={HEADING_STYLE}>Video Gallery</h1>
            <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', color:'rgba(138,95,60,0.8)', marginBottom:'24px' }}>
              Grand openings, franchise events, and stories from our growing Avocadoria family.
            </p>
            <a href="/franchise#franchise-gallery" style={{ fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'#3a6b35', fontWeight:'600', textDecoration:'none' }}>
              ← Back to Franchise
            </a>
          </div>
        </section>

        {/* ── VIDEO GRID ── */}
        <section style={{ position:'relative', overflow:'hidden', padding:'64px 32px', backgroundImage:"url('/website_layer_1.png')", backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F3F2EE' }}>
          <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.15 }} />
          <div style={{ position:'relative', zIndex:1, maxWidth:'1100px', margin:'0 auto' }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'24px' }}>
              {VIDEOS.map(v => <VideoCard key={v.id} video={v} onClick={setActive} />)}
            </div>
            {/* Empty state hint */}
            <p style={{ textAlign:'center', fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'rgba(138,95,60,0.55)', marginTop:'40px' }}>
              More videos coming soon. Follow us on <a href="https://www.facebook.com/avocadoria.ph" target="_blank" rel="noopener noreferrer" style={{ color:'#b6c548', fontWeight:'600' }}>Facebook</a> for live updates!
            </p>
          </div>
        </section>

      </div>

      {/* ── LIGHTBOX ── */}
      {active && (
        <div
          onClick={() => setActive(null)}
          style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:'800px', borderRadius:'16px', overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.5)' }}>
            <div style={{ position:'relative', paddingTop:'56.25%', background:'#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title={active.title}
              />
            </div>
            <div style={{ background:'#fff', padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <h3 style={{ fontFamily:'Poppins,sans-serif', fontSize:'14px', fontWeight:'700', color:'#3a6b35', margin:0 }}>{active.title}</h3>
              <button onClick={() => setActive(null)} style={{ background:'#b6c548', color:'#fff', border:'none', borderRadius:'999px', padding:'6px 16px', fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:'700', cursor:'pointer' }}>Close ✕</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
