import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '@/components/ui/SEO'
import { getLivePromos } from '@/data/promos'

const HEADING = {
  fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
  fontWeight: 'normal',
  color: 'var(--c-olive)',
  textShadow:
    '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff,0 -2px 0 #fff,0 2px 0 #fff',
  lineHeight: 1.1,
}

function formatDate(d) {
  return new Date(`${d}T00:00:00`).toLocaleDateString('en-PH', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function PromoCard({ promo }) {
  const [open, setOpen] = useState(false)
  const isExternal = /^https?:\/\//i.test(promo.ctaHref || '')
  const detail = promo.branches?.length ? promo.branches : null

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#e8f0c8',
        boxShadow: '0 8px 28px rgba(58,107,53,0.14)',
        height: '100%',
      }}
    >
      {/* Artwork — 1414x2000 source, so a 707/1000 box shows it whole with
          no cropping. object-fit: contain guards the odd-sized promo. */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '707 / 1000' }}>
        {promo.media?.type === 'image' && (
          <img
            src={promo.media.src}
            alt={promo.media.alt || promo.title || ''}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'contain', display: 'block',
            }}
          />
        )}

        {/* Title strip over the foot of the artwork, as on the menu tiles */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '28px 16px 14px',
          background: 'linear-gradient(to top, rgba(58,107,53,0.82) 0%, rgba(58,107,53,0.55) 55%, transparent 100%)',
        }}>
          <h2 style={{
            fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
            fontWeight: 'normal', fontSize: 'clamp(16px,1.8vw,20px)',
            color: '#fff', margin: 0, lineHeight: 1.25,
            textShadow: '0 2px 10px rgba(0,0,0,0.35)',
          }}>
            {promo.title}
          </h2>
          {promo.period && (
            <p style={{
              fontFamily: "'Poppins',sans-serif", fontSize: '12px',
              color: 'rgba(255,255,255,0.92)', margin: '4px 0 0', lineHeight: 1.4,
            }}>
              {promo.period}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: '16px 18px 20px',
        display: 'flex', flexDirection: 'column', gap: '10px', flex: 1,
        background: 'rgba(255,255,255,0.72)',
      }}>
        {promo.body && (
          <p style={{
            fontFamily: "'Poppins',sans-serif", fontSize: '15px',
            color: 'var(--c-brown)', lineHeight: 1.6, margin: 0,
          }}>
            {promo.body}
          </p>
        )}

        {promo.coverage?.map((line) => (
          <p key={line} style={{
            fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: '700',
            color: '#3a6b35', margin: 0,
          }}>
            {line}
          </p>
        ))}

        {detail && (
          <div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', minHeight: '44px', padding: '10px 14px',
                background: 'rgba(182,197,72,0.12)',
                border: '1.5px solid rgba(182,197,72,0.35)', borderRadius: '12px',
                fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: '700',
                color: '#3a6b35', cursor: 'pointer', textAlign: 'left',
              }}
            >
              Available at {detail.length} branches
              <span aria-hidden="true" style={{
                color: '#b6c548',
                transform: open ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }}>▾</span>
            </button>

            {open && (
              <ul style={{
                listStyle: 'none', margin: '10px 0 0', padding: '0 0 0 4px',
                maxHeight: 'min(220px, 40vh)', overflowY: 'auto',
                WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain',
              }}>
                {detail.map((b) => (
                  <li key={b} style={{
                    fontFamily: "'Poppins',sans-serif", fontSize: '13px',
                    color: 'rgba(138,95,60,0.9)', padding: '4px 0 4px 16px',
                    position: 'relative', lineHeight: 1.45,
                  }}>
                    <span style={{
                      position: 'absolute', left: 0, top: '11px', width: '5px', height: '5px',
                      borderRadius: '50%', background: '#b6c548',
                    }} />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {promo.ctaLabel && promo.ctaHref && (
          <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
            {isExternal ? (
              <a href={promo.ctaHref} target="_blank" rel="noopener noreferrer" style={ctaStyle}>
                {promo.ctaLabel} <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Link to={promo.ctaHref} style={ctaStyle}>
                {promo.ctaLabel} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

const ctaStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  width: '100%', boxSizing: 'border-box',
  minHeight: '48px', padding: '13px 24px',
  background: '#b6c548', color: '#fff', textDecoration: 'none',
  borderRadius: '999px', fontFamily: 'Poppins,sans-serif',
  fontSize: '16px', fontWeight: '800',
}

export default function PromosPage() {
  const promos = getLivePromos()

  return (
    <>
      <SEO
        title="Promos & Offers"
        description="Current Avocadoria promos, discounts, and delivery offers across our branches nationwide."
        path="/about/promos"
      />
      <div className="page-enter">
        <div style={{
          position: 'relative', minHeight: '70vh',
          backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover',
          backgroundPosition: 'center', backgroundColor: '#F3F2EE',
        }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            backgroundColor: '#b6c548', opacity: 0.25,
          }} />

          <div style={{
            position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto',
            padding: 'clamp(72px,10vw,120px) clamp(20px,5vw,60px) clamp(48px,7vw,88px)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,52px)' }}>
              <h1 style={{ ...HEADING, fontSize: 'clamp(1.8rem,5vw,3rem)', margin: '0 0 10px' }}>
                Promos &amp; Offers
              </h1>
              <p style={{
                fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(14px,2.5vw,17px)',
                color: 'rgba(138,95,60,0.8)', margin: 0,
              }}>
                Everything happening at Avocadoria right now.
              </p>
            </div>

            {promos.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))',
                gap: 'clamp(20px,3vw,32px)',
                // stretch (the default) makes every card in a row the same
                // height; 'start' let them size independently and look ragged
                alignItems: 'stretch',
              }}>
                {promos.map((p) => <PromoCard key={p.id} promo={p} />)}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '56px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }} aria-hidden="true">🥑</div>
                <p style={{
                  fontFamily: 'Poppins,sans-serif', fontSize: '16px',
                  color: 'rgba(138,95,60,0.7)', margin: '0 0 20px',
                }}>
                  No promos running at the moment — check back soon!
                </p>
                <Link to="/menu" style={ctaStyle}>
                  Browse the menu <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
