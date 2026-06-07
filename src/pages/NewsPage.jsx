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
          }}>
            {featured.image
              ? <img src={featured.image} alt={featured.title} style={{ width:'100%', borderRadius:'12px', objectFit:'cover', maxHeight:'220px' }}/>
              : <span style={{ fontSize:'48px' }}>🥑</span>
            }
          </div>
          <div>
            <span className="post-badge featured">Featured</span>
            <p className="post-date">{formatDate(featured.date)}</p>
            <h3 className="post-title">{featured.title}</h3>
            <p className="post-excerpt">{featured.excerpt}</p>
            <span style={{ fontFamily:'Nunito,sans-serif', fontSize:'13px', fontWeight:'700', color:'#b6c548', marginTop:'12px', display:'inline-block' }}>
              Read more →
            </span>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="post-card-grid">
        {rest.map(post => (
          <div key={post.id} className="post-card" onClick={() => setSelected(post)}>
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
        fontFamily:'Nunito,sans-serif', fontSize:'13px', fontWeight:'700',
        color:'#b6c548', background:'none', border:'none', cursor:'pointer',
        padding:'0 0 24px', display:'flex', alignItems:'center', gap:'6px',
      }}>
        ← Back
      </button>
      <span className="post-badge">{post.category}</span>
      <p className="post-date">{new Date(post.date).toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'})}</p>
      <h2 style={{ fontFamily:"'BubbleboddyNeue','Nunito',sans-serif", fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:'normal', color:'#3a6b35', margin:'0 0 20px', lineHeight:1.2 }}>
        {post.title}
      </h2>
      {post.image && <img src={post.image} alt={post.title} style={{ width:'100%', borderRadius:'16px', marginBottom:'24px', objectFit:'cover', maxHeight:'360px' }}/>}
      <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'16px', color:'rgba(138,95,60,0.9)', lineHeight:1.8 }}>
        {post.content}
      </p>
    </div>
  )
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom:'32px' }}>
      <h2 style={{ fontFamily:"'BubbleboddyNeue','Nunito',sans-serif", fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:'normal', color:'#3a6b35', margin:'0 0 6px' }}>
        {title}
      </h2>
      <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'14px', color:'rgba(138,95,60,0.65)', margin:0 }}>{sub}</p>
      <div style={{ width:'48px', height:'4px', borderRadius:'2px', background:'#b6c548', marginTop:'12px' }}/>
    </div>
  )
}

function EmptyState({ label }) {
  return (
    <div style={{ textAlign:'center', padding:'48px 0' }}>
      <span style={{ fontSize:'40px' }}>🥑</span>
      <p style={{ fontFamily:'Nunito,sans-serif', color:'rgba(138,95,60,0.5)', marginTop:'12px' }}>
        No {label} yet — check back soon!
      </p>
    </div>
  )
}
