import { useState } from 'react'
import SEO from '@/components/ui/SEO'
import { RECOGNITIONS } from '@/data/posts'

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' })
}

const CATEGORY_ICONS = {
  'Award':   '🏆',
  'Feature': '📰',
  'Media':   '📺',
  'Default': '⭐',
}

export default function RecognitionsPage() {
  const [selected, setSelected] = useState(null)

  if (selected) return <PostDetail post={selected} onBack={() => setSelected(null)} />

  return (
    <>
      <SEO title="Recognitions" description="Awards and recognitions received by Avocadoria." path="/about/recognitions"/>

      <div style={{ marginBottom:'36px' }}>
        <h2 style={{ fontFamily:"'BubbleboddyNeue','Nunito',sans-serif", fontSize:'clamp(1.6rem,3vw,2.2rem)', fontWeight:'normal', color:'#3a6b35', margin:'0 0 6px' }}>
          Recognitions
        </h2>
        <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'14px', color:'rgba(138,95,60,0.65)', margin:0 }}>
          Awards, features, and milestones that mark our journey.
        </p>
        <div style={{ width:'48px', height:'4px', borderRadius:'2px', background:'#b6c548', marginTop:'12px' }}/>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
        {RECOGNITIONS.map(rec => (
          <div key={rec.id} className="post-card"
            onClick={() => setSelected(rec)}
            style={{ display:'flex', gap:'20px', alignItems:'flex-start' }}>
            {/* Icon */}
            <div style={{
              width:'52px', height:'52px', borderRadius:'14px',
              background: rec.featured ? '#b6c548' : 'rgba(182,197,72,0.12)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'24px', flexShrink:0,
            }}>
              {CATEGORY_ICONS[rec.category] || CATEGORY_ICONS.Default}
            </div>
            {/* Info */}
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px', flexWrap:'wrap' }}>
                <span className={`post-badge${rec.featured ? ' featured' : ''}`}>{rec.category}</span>
                <span className="post-date" style={{ margin:0 }}>{formatDate(rec.date)}</span>
              </div>
              <h3 className="post-title" style={{ marginBottom:'4px' }}>{rec.title}</h3>
              <p style={{ fontFamily:'Nunito,sans-serif', fontSize:'12px', color:'rgba(138,95,60,0.55)', margin:'0 0 6px' }}>
                Issued by: <strong>{rec.issuer}</strong>
              </p>
              <p className="post-excerpt">{rec.excerpt}</p>
            </div>
          </div>
        ))}
        {RECOGNITIONS.length === 0 && (
          <div style={{ textAlign:'center', padding:'48px 0' }}>
            <span style={{ fontSize:'40px' }}>🏆</span>
            <p style={{ fontFamily:'Nunito,sans-serif', color:'rgba(138,95,60,0.5)', marginTop:'12px' }}>
              No recognitions listed yet — check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  )
}

function PostDetail({ post, onBack }) {
  const icon = CATEGORY_ICONS[post.category] || CATEGORY_ICONS.Default
  return (
    <div>
      <button onClick={onBack} style={{ fontFamily:'Nunito,sans-serif', fontSize:'13px', fontWeight:'700', color:'#b6c548', background:'none', border:'none', cursor:'pointer', padding:'0 0 24px', display:'flex', alignItems:'center', gap:'6px' }}>
        ← Back
      </button>
      <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px' }}>
        <div style={{ width:'56px', height:'56px', borderRadius:'16px', background:'#b6c548', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', flexShrink:0 }}>
          {icon}
        </div>
        <div>
          <span className="post-badge featured">{post.category}</span>
          <p className="post-date" style={{ margin:'4px 0 0' }}>
            {new Date(post.date).toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'})} · Issued by {post.issuer}
          </p>
        </div>
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
