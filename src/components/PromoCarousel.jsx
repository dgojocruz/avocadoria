import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLivePromos } from '@/data/promos'
import './PromoCarousel.css'

const ROTATE_MS = 5000

/**
 * Rotating promo cards for the homepage.
 *
 * Renders nothing when no promo is live, so the section disappears on its own
 * once campaigns end — no code change needed to take it down.
 *
 * Autoplay pauses on hover, on keyboard focus, and while the tab is hidden,
 * and stops permanently once the visitor uses the controls: taking manual
 * control and then having it move under you is worse than no autoplay.
 */
export default function PromoCarousel() {
  const [promos, setPromos] = useState([])
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [userTook, setUserTook] = useState(false)
  const touchX = useRef(null)

  useEffect(() => {
    setPromos(getLivePromos())
  }, [])

  const count = promos.length

  const go = useCallback(
    (next, manual = false) => {
      if (manual) setUserTook(true)
      setIndex(((next % count) + count) % count)
    },
    [count]
  )

  // Autoplay
  useEffect(() => {
    if (count < 2 || paused || userTook) return undefined
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS)
    return () => window.clearInterval(t)
  }, [count, paused, userTook])

  // Don't rotate in a background tab — the visitor isn't watching, and it
  // burns battery on mobile.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const track = (event, promo) => {
    if (typeof window.gtag !== 'function') return
    window.gtag('event', event, { promo_id: promo.id, promo_title: promo.title })
  }

  if (count === 0) return null

  const promo = promos[index]
  const isExternal = /^https?:\/\//i.test(promo.ctaHref || '')

  return (
    <section
      className="promo-carousel"
      style={{
        position: 'relative', overflow: 'hidden', padding: '48px 16px 64px',
        backgroundImage: "url('/website_layer_1.png')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundColor: '#F3F2EE',
      }}
      aria-roledescription="carousel"
      aria-label="Current promos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1), true)
        touchX.current = null
      }}
    >
      {/* Same olive tint overlay as the What's New section */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundColor: '#b6c548', opacity: 0.25,
      }} />

      <div className="promo-carousel__inner">
        {/* Header styled to match What's New exactly */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2
            className="section-title"
            style={{
              color: '#b6c548', margin: '0 0 6px',
              textShadow: '-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, '
                        + '3px 3px 0 #fff, 0 -3px 0 #fff, 0 3px 0 #fff, '
                        + '-3px 0 0 #fff, 3px 0 0 #fff',
            }}
          >
            Current Promos
          </h2>
          <p className="section-sub" style={{ color: 'rgba(138,95,60,.65)', margin: 0 }}>
            Ongoing and upcoming deals across our branches
          </p>
        </div>

        <div className="promo-carousel__stage">
          {count > 1 && (
            <button
              type="button"
              className="promo-carousel__arrow promo-carousel__arrow--prev"
              onClick={() => go(index - 1, true)}
              aria-label="Previous promo"
            >
              &#8249;
            </button>
          )}

          <div
            className="promo-carousel__card"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
          >
            {promo.media?.type === 'image' && (
              <img
                className="promo-carousel__img"
                src={promo.media.src}
                alt={promo.media.alt || promo.title || ''}
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="promo-carousel__body">
              {promo.title && <h3 className="promo-carousel__title">{promo.title}</h3>}
              {promo.body && <p className="promo-carousel__text">{promo.body}</p>}

              {promo.branches?.length > 0 && (
                <p className="promo-carousel__meta">
                  Available at {promo.branches.length} branches
                </p>
              )}

              {promo.coverage?.map((line) => (
                <p className="promo-carousel__meta" key={line}>{line}</p>
              ))}

              {promo.period ? (
                <p className="promo-carousel__meta">{promo.period}</p>
              ) : promo.endDate ? (
                <p className="promo-carousel__meta">
                  Until{' '}
                  {new Date(`${promo.endDate}T00:00:00`).toLocaleDateString('en-PH', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </p>
              ) : null}

              <div className="promo-carousel__actions">
                {promo.ctaLabel && promo.ctaHref && (
                  isExternal ? (
                    <a
                      className="promo-carousel__cta"
                      href={promo.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('promo_card_cta_click', promo)}
                    >
                      {promo.ctaLabel} <span aria-hidden="true">&rarr;</span>
                    </a>
                  ) : (
                    <Link
                      className="promo-carousel__cta"
                      to={promo.ctaHref}
                      onClick={() => track('promo_card_cta_click', promo)}
                    >
                      {promo.ctaLabel} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )
                )}

                <Link className="promo-carousel__all" to="/about/promos">
                  See all promos
                </Link>
              </div>
            </div>
          </div>

          {count > 1 && (
            <button
              type="button"
              className="promo-carousel__arrow promo-carousel__arrow--next"
              onClick={() => go(index + 1, true)}
              aria-label="Next promo"
            >
              &#8250;
            </button>
          )}
        </div>

        {count > 1 && (
          <div className="promo-carousel__dots" role="tablist" aria-label="Choose a promo">
            {promos.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={p.title || `Promo ${i + 1}`}
                className={`promo-carousel__dot${i === index ? ' is-active' : ''}`}
                onClick={() => go(i, true)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
