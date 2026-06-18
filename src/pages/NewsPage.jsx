import { useState } from 'react'
import SEO from '@/components/ui/SEO'
import { NEWS_POSTS } from '@/data/posts'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' })
}

export default function NewsPage() {
  const [selected, setSelected] = useState(null)
  const featured = NEWS_POSTS.find(p => p.featured)
  const rest     = NEWS_POSTS.filter(p => !p.featured || p.id !== featured?.id)

  if (selected) return (
    <PostDetail post={selected} onBack={() => setSelected(null)} />
  )

  return (
    <>
      <SEO title="News & Updates" description="Latest news and updates from Avocadoria." path="/about/news"/>

      <SectionHeader
        title="News & Updates"
        sub="Stay in the loop — new branches, products, and announcements."
      />

      {/* Featured */}
      {featured && (
        <div className="post-card" style={{ marginBottom:'28px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'28px', alignItems:'center' }}
          onClick={() => setSelected(featured)}>
          <div style={{
            background:'rgba(182,197,72,0.10)', borderRadius:'12px',
            minHeight:'200px', display:'flex', alignItems:'center', justifyContent:'center',
            overflow:'hidden', position:'relative',
          }}>
            {featured.videoEmbed ? (
              <div style={{ width:'100%', position:'relative', paddingTop:'56.25%', pointerEvents:'none' }}>
                <iframe
                  src={featured.videoEmbed}
                  style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none', borderRadius:'12px' }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                  title={featured.title}
                />
              </div>
            ) : featured.image ? (
              <img src={featured.image} alt={featured.title} style={{ width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'220px' }}
                    loading="lazy" decoding="async"
                  />
            ) : (
              <div style={{ width:'100%', minHeight:'200px', background:'rgba(182,197,72,0.10)', borderRadius:'12px' }} />
            )}
          </div>
          <div>
            <span className="post-badge featured">Featured</span>
            <p className="post-date">{formatDate(featured.date)}</p>
            <h3 className="post-title">{featured.title}</h3>
            <p className="post-excerpt">{featured.excerpt}</p>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'12px', flexWrap:'wrap' }}>
              <span style={{ fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:'700', color:'#b6c548' }}>
                Read more →
              </span>
              {featured.facebookLink && (
                <a href={featured.facebookLink} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 14px', background:'#1877F2', color:'#fff', borderRadius:'999px', textDecoration:'none', fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:'700' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                  Watch on Facebook
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="post-card-grid">
        {rest.map(post => (
          <div key={post.id} className="post-card" onClick={() => setSelected(post)} style={{ position:'relative' }}>
            {/* Facebook badge */}
            {post.facebookLink && (
              <a href={post.facebookLink} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ position:'absolute', top:'12px', right:'12px', width:'28px', height:'28px', borderRadius:'50%', background:'#1877F2', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', boxShadow:'0 2px 8px rgba(24,119,242,0.4)', zIndex:2 }}
                title="Watch on Facebook"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </a>
            )}
            <span className="post-badge">{post.category}</span>
            <p className="post-date">{formatDate(post.date)}</p>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-excerpt">{post.excerpt}</p>
          </div>
        ))}
      </div>

      {NEWS_POSTS.length === 0 && <EmptyState label="news posts" />}
    </>
  )
}

function PostDetail({ post, onBack }) {
  return (
    <div>
      <button onClick={onBack} style={{
        fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:'700',
        color:'#b6c548', background:'none', border:'none', cursor:'pointer',
        padding:'0 0 24px', display:'flex', alignItems:'center', gap:'6px',
      }}>
        ← Back
      </button>
      <span className="post-badge">{post.category}</span>
      <p className="post-date">{new Date(post.date).toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'})}</p>
      <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize:'clamp(1.6rem,4vw,2.8rem)', fontWeight:'normal', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin:'0 0 20px', lineHeight:1.1 }}>
        {post.title}
      </h2>

      {/* Video embed */}
      {post.videoEmbed && (
        <div style={{ marginBottom:'28px' }}>
          <div style={{ position:'relative', paddingTop:'56.25%', borderRadius:'16px', overflow:'hidden', background:'#000', boxShadow:'0 8px 28px rgba(0,0,0,0.12)' }}>
            <iframe
              src={post.videoEmbed}
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              scrolling="no"
              title={post.title}
            />
          </div>
          {post.videoLink && (
            <a href={post.videoLink} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'6px', marginTop:'10px', fontFamily:'Poppins,sans-serif', fontSize:'12px', fontWeight:'700', color:'#1877F2', textDecoration:'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              Watch on Facebook
            </a>
          )}
        </div>
      )}

      {/* Image (only if no video) */}
      {!post.videoEmbed && post.image && (
        <img src={post.image} alt={post.title} style={{ width:'100%', borderRadius:'16px', marginBottom:'24px', objectFit:'cover', maxHeight:'360px' }}
                    loading="lazy" decoding="async"
                  />
      )}

      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'16px', color:'rgba(138,95,60,0.9)', lineHeight:1.8 }}>
        {post.content}
      </p>

      {/* Facebook link */}
      {post.facebookLink && (
        <a href={post.facebookLink} target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginTop:'24px', padding:'12px 24px', background:'#1877F2', color:'#fff', borderRadius:'999px', textDecoration:'none', fontFamily:'Poppins,sans-serif', fontSize:'13px', fontWeight:'700', boxShadow:'0 4px 16px rgba(24,119,242,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
          Watch on Facebook
        </a>
      )}
  )
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom:'32px' }}>
      <h2 style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize:'clamp(1.6rem,4vw,2.8rem)', fontWeight:'normal', color:'var(--c-olive)', textShadow:'-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff', margin:'0 0 8px', lineHeight:1.1 }}>
        {title}
      </h2>
      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'14px', color:'rgba(138,95,60,0.65)', margin:0 }}>{sub}</p>
      <div style={{ width:'48px', height:'4px', borderRadius:'2px', background:'#b6c548', marginTop:'12px' }}/>
    </div>
  )
}

function EmptyState({ label }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 0' }}>
      <p style={{ fontFamily:'Poppins,sans-serif', color:'rgba(138,95,60,0.5)', marginTop:'12px' }}>
        No {label} yet — check back soon!
      </p>
    </div>
  )
}
