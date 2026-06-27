import { useState } from 'react'
import SEO from '@/components/ui/SEO'

// ─── Add your YouTube video IDs and titles here ───────────────────────────────
const VIDEOS = [
  {
    id:          'fb-tb-2025',
    title:       'Team Building 2025',
    event:       'Company Events',
    date:        '2025',
    thumb:       '/gallery/grand-opening-sm-masinag.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/share/v/1BG5B7P21d/',
  },
  {
    id:          'fb-expo-2025',
    title:       'Franchise Expo 2025',
    event:       'Franchise Event',
    date:        '2025',
    thumb:       '/gallery/grand-opening-robinsons-galleria.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/share/v/194Uyu3uFy/',
  },
  {
    id:          'fb-anniv-6',
    title:       '6th Year Anniversary',
    event:       'Anniversary',
    date:        '2025',
    thumb:       '/gallery/grand-opening-thailand.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/share/v/1DuMLJ9WJS/',
  },
  {
    id:          'fb-kids-retreat',
    title:       'Kids Retreat',
    event:       'Company Events',
    date:        '2025',
    thumb:       '/gallery/grand-opening-upad-hotel.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/share/v/1C4Ko5iPyh/',
  },
  {
    id:          'fb-mansmith-award',
    title:       "Chef Czarina — Mansmith Young Market Master's Award",
    event:       'Awards',
    date:        '2025',
    thumb:       '/chef-czarina.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/share/v/1GUe8HLruX/',
  },
  {
    id:          'fb-tb-2024',
    title:       'Team Building 2024',
    event:       'Company Events',
    date:        '2024',
    thumb:       '/gallery/grand-opening-sm-masinag.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/share/v/1HAx9gkwjW/',
  },
  {
    id:          'fb-lakbay',
    title:       '#LakbayAvocadoria — Piliin ang Pilipinas',
    event:       'Company Events',
    date:        '2024',
    thumb:       '/avocadoria_bg.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/share/v/1cNtxPycYj/',
  },
  {
    id:          'fb-anniv-5',
    title:       '5th Year Anniversary',
    event:       'Anniversary',
    date:        '2024',
    thumb:       '/gallery/grand-opening-robinsons-galleria.webp',
    youtubeId:   '',
    facebookUrl: 'https://www.facebook.com/reel/1164779488033039',
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

function VideoCard({ video }) {
  const hasYT = !!video.youtubeId
  const hasFB = !!video.facebookUrl

  const handleClick = () => {
    if (hasFB) window.open(video.facebookUrl, '_blank', 'noopener,noreferrer')
    else if (hasYT) window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, '_blank', 'noopener,noreferrer')
  }

  const thumb = hasYT
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : video.thumb || null

  return (
    <div
      onClick={handleClick}
      style={{
        background:   'transparent',
        border:       'none',
        borderRadius: '20px',
        overflow:     'hidden',
        boxShadow:    'none',
        cursor:       'pointer',
        transition:   'transform 0.25s',
        display:      'flex',
        flexDirection:'column',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}
    >
      {/* Thumbnail */}
      <div style={{ position:'relative', aspectRatio:'16/9', borderRadius:'16px', overflow:'hidden', background:'#d9e29e' }}>
        {thumb
          ? <img src={thumb} alt={video.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease' }}
              onMouseEnter={e => e.target.style.transform='scale(1.05)'}
              onMouseLeave={e => e.target.style.transform='scale(1)'}
              loading="lazy" decoding="async"
            />
          : <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#3a6b35,#b6c548)' }} />
        }
        {/* Play overlay */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.2)' }}>
          <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'rgba(255,255,255,0.9)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(0,0,0,0.2)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polygon points="7,4 21,12 7,20" fill={hasFB ? '#1877F2' : '#3a6b35'}/>
            </svg>
          </div>
        </div>
        {/* Facebook badge */}
        {hasFB && (
          <div style={{ position:'absolute', bottom:'10px', right:'10px', display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 10px', background:'#1877F2', color:'#fff', borderRadius:'999px', fontFamily:"'Poppins',sans-serif", fontSize:'9px', fontWeight:'700', boxShadow:'0 2px 8px rgba(24,119,242,.45)' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Watch on Facebook
          </div>
        )}
      </div>

      {/* Info — matches What's New card */}
      <div style={{ padding:'14px 4px 20px', display:'flex', flexDirection:'column', gap:'6px' }}>
        <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:'11px', color:'rgba(138,95,60,0.55)' }}>
          {video.date}
        </span>
        <h3 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontWeight:'normal', fontSize:'clamp(15px,1.8vw,18px)', color:'var(--c-olive)', textShadow:'-1.5px -1.5px 0 #fff,1.5px -1.5px 0 #fff,-1.5px 1.5px 0 #fff,1.5px 1.5px 0 #fff', margin:0, lineHeight:1.3 }}>
          {video.title}
        </h3>
      </div>
    </div>
  )
}

export default function VideoGalleryPage() {
  const [active, setActive] = useState(null)

  return (
    <>
      <SEO
        title="Highlights"
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
            <h1 style={HEADING_STYLE}>Highlights</h1>
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
              {VIDEOS.map(v => <VideoCard key={v.id} video={v} />)}
            </div>
            {/* Empty state hint */}
            <p style={{ textAlign:'center', fontFamily:'Poppins,sans-serif', fontSize:'12px', color:'rgba(138,95,60,0.55)', marginTop:'40px' }}>
              More videos coming soon. Follow us on <a href="https://www.facebook.com/avocadoria.official" target="_blank" rel="noopener noreferrer" style={{ color:'#b6c548', fontWeight:'600' }}>Facebook</a> for live updates!
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
          <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth: active.facebookUrl ? '400px' : '800px', borderRadius:'16px', overflow:'hidden', boxShadow:'0 24px 64px rgba(0,0,0,0.5)' }}>
            <div style={{ position:'relative', paddingTop: active.facebookUrl ? '177.78%' : '56.25%', background:'#000' }}>
              {active.facebookUrl ? (
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(active.facebookUrl)}&show_text=false&autoplay=1&mute=0`}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none', overflow:'hidden' }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  title={active.title}
                />
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title={active.title}
                />
              )}
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
