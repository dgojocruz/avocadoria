import { useState } from 'react'
import SEO from '@/components/ui/SEO'
import { AVO_CARES_POSTS } from '@/data/posts'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' })
}

const CATEGORY_COLORS = {
  'Environment': { bg:'rgba(58,107,53,0.12)',  text:'#3a6b35',  icon:'🌱' },
  'Community':   { bg:'rgba(182,197,72,0.15)',  text:'#5a8a1a',  icon:'🤝' },
  'Farming':     { bg:'rgba(182,197,72,0.15)',  text:'#5a8a1a',  icon:'🥑' },
  'Default':     { bg:'rgba(182,197,72,0.10)',  text:'#3a6b35',  icon:'💚' },
}

export default function AvoCaresPage() {
  const [selected, setSelected] = useState(null)
  const featured = AVO_CARES_POSTS.find(p => p.featured)
  const rest     = AVO_CARES_POSTS.filter(p => !p.featured || p.id !== featured?.id)

  if (selected) return <PostDetail post={selected} onBack={() => setSelected(null)} />

  return (
    <>
      <SEO title="Avo Cares" description="Avocadoria's community and environmental initiatives." path="/about/avo-cares"/>

      <div style={{ marginBottom:'36px' }}>
        <h2 style={{ fontFamily:"'BubbleboddyNeue','Nunito',sans-serif", fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:'normal', color:'#3a6b35', margin:'0 0 6px' }}>
          Avo Cares
        </h2>
        <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'14px', color:'rgba(138,95,60,0.65)', margin:0 }}>
          Spreading happiness beyond our cups — community, environment, and local farming.
        </p>
        <div style={{ width:'48px', height:'4px', borderRadius:'2px', background:'#b6c548', marginTop:'12px' }}/>
      </div>

      {/* Featured initiative */}
      {featured && (
        <div className="post-card" style={{ marginBottom:'24px', background:'linear-gradient(135deg, rgba(58,107,53,0.06) 0%, rgba(182,197,72,0.08) 100%)' }}
          onClick={() => setSelected(featured)}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:'16px' }}>
            <div style={{ fontSize:'36px', lineHeight:1 }}>
              {(CATEGORY_COLORS[featured.category] || CATEGORY_COLORS.Default).icon}
            </div>
            <div>
              <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'8px', flexWrap:'wrap' }}>
                <span className="post-badge featured">Featured Initiative</span>
                <span className="post-badge">{featured.category}</span>
              </div>
              <p className="post-date">{formatDate(featured.date)}</p>
              <h3 className="post-title">{featured.title}</h3>
              <p className="post-excerpt">{featured.excerpt}</p>
              <span style={{ fontFamily:'Nunito,sans-serif', fontSize:'13px', fontWeight:'700', color:'#b6c548', marginTop:'12px', display:'inline-block' }}>
                Read more →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="post-card-grid">
        {rest.map(post => {
          const cat = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.Default
          return (
            <div key={post.id} className="post-card" onClick={() => setSelected(post)}>
              <div style={{ fontSize:'28px', marginBottom:'10px' }}>{cat.icon}</div>
              <span className="post-badge">{post.category}</span>
              <p className="post-date">{formatDate(post.date)}</p>
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
            </div>
          )
        })}
      </div>

      {AVO_CARES_POSTS.length === 0 && (
        <div style={{ textAlign:'center', padding:'48px 0' }}>
          <span style={{ fontSize:'40px' }}>🌱</span>
          <p style={{ fontFamily:'Nunito,sans-serif', color:'rgba(138,95,60,0.5)', marginTop:'12px' }}>
            No initiatives listed yet — check back soon!
          </p>
        </div>
      )}
    </>
  )
}

function PostDetail({ post, onBack }) {
  const cat = CATEGORY_COLORS[post.category] || { icon:'💚' }
  return (
    <div>
      <button onClick={onBack} style={{ fontFamily:'Nunito,sans-serif', fontSize:'13px', fontWeight:'700', color:'#b6c548', background:'none', border:'none', cursor:'pointer', padding:'0 0 24px', display:'flex', alignItems:'center', gap:'6px' }}>
        ← Back
      </button>
      <div style={{ fontSize:'40px', marginBottom:'12px' }}>{cat.icon}</div>
      <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'8px', flexWrap:'wrap' }}>
        <span className="post-badge featured">{post.category}</span>
        <span className="post-date" style={{ margin:0 }}>{new Date(post.date).toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'})}</span>
      </div>
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

const CATEGORY_COLORS = {
  'Environment': { bg:'rgba(58,107,53,0.12)',  text:'#3a6b35',  icon:'🌱' },
  'Community':   { bg:'rgba(182,197,72,0.15)',  text:'#5a8a1a',  icon:'🤝' },
  'Farming':     { bg:'rgba(182,197,72,0.15)',  text:'#5a8a1a',  icon:'🥑' },
  'Default':     { bg:'rgba(182,197,72,0.10)',  text:'#3a6b35',  icon:'💚' },
}
