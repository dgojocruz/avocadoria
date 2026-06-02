import { useState, useEffect } from 'react'

// ─── Slideshow images ─────────────────────────────────────────────────
// To add/remove images: edit this array only.
// Each slide has its own overlay opacity and pan direction.
const SLIDES = [
  {
    src:      '/avo-cover-photo-2.jpg',
    alt:      'Avocadoria fruit dessert lineup',
    overlay:  0.35,   // 0.0 = no cover · 1.0 = fully white
    pan:      'left', // pan direction: 'left' | 'right' | 'up' | 'down'
  },
  {
    src:      '/avo-lover-multiple.jpg',
    alt:      'Avocado Lover dessert cups',
    overlay:  0.30,
    pan:      'right',
  },
  {
    src:      '/avo-naked-light-icecream.jpg',
    alt:      'Avocado Naked Light Ice Cream',
    overlay:  0.25,
    pan:      'up',
  },
  {
    src:      '/avo-keto.jpg',
    alt:      'Avocadoria keto dessert',
    overlay:  0.30,
    pan:      'left',
  },
]

// ─── Pan keyframe directions ──────────────────────────────────────────
// Each direction defines start → end transform for the 7s pan animation
const PAN_KEYFRAMES = {
  left:  { from: 'scale(1.12) translateX(3%)',  to: 'scale(1.12) translateX(-3%)' },
  right: { from: 'scale(1.12) translateX(-3%)', to: 'scale(1.12) translateX(3%)' },
  up:    { from: 'scale(1.12) translateY(3%)',  to: 'scale(1.12) translateY(-3%)' },
  down:  { from: 'scale(1.12) translateY(-3%)', to: 'scale(1.12) translateY(3%)' },
}

const SLIDE_DURATION = 5000  // ms between transitions
const FADE_DURATION  = 1000  // ms for crossfade

export default function HeroSlideshow({ children }) {
  const [current, setCurrent]   = useState(0)
  const [previous, setPrevious] = useState(null)
  const [fading, setFading]     = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevious(current)
      setFading(true)

      // After fade completes, clean up previous slide
      const cleanup = setTimeout(() => {
        setPrevious(null)
        setFading(false)
      }, FADE_DURATION)

      setCurrent(prev => (prev + 1) % SLIDES.length)
      return () => clearTimeout(cleanup)
    }, SLIDE_DURATION)

    return () => clearInterval(timer)
  }, [current])

  return (
    <div className="relative min-h-[calc(100vh-0px)] flex items-center justify-center overflow-hidden">

      {/* ── CSS for pan animation injected inline ── */}
      <style>{`
        @keyframes pan-left  { from { transform: scale(1.12) translateX(3%);  } to { transform: scale(1.12) translateX(-3%); } }
        @keyframes pan-right { from { transform: scale(1.12) translateX(-3%); } to { transform: scale(1.12) translateX(3%);  } }
        @keyframes pan-up    { from { transform: scale(1.12) translateY(3%);  } to { transform: scale(1.12) translateY(-3%); } }
        @keyframes pan-down  { from { transform: scale(1.12) translateY(-3%); } to { transform: scale(1.12) translateY(3%);  } }
        .slide-pan-left  { animation: pan-left  7s ease-in-out forwards; }
        .slide-pan-right { animation: pan-right 7s ease-in-out forwards; }
        .slide-pan-up    { animation: pan-up    7s ease-in-out forwards; }
        .slide-pan-down  { animation: pan-down  7s ease-in-out forwards; }
      `}</style>

      {/* ── Previous slide (fades out) ── */}
      {previous !== null && (
        <div
          className="absolute inset-0"
          style={{
            opacity:    fading ? 0 : 1,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            zIndex:     1,
          }}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center slide-pan-${SLIDES[previous].pan}`}
            style={{ backgroundImage: `url(${SLIDES[previous].src})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(255,255,255,${SLIDES[previous].overlay})` }}
          />
        </div>
      )}

      {/* ── Current slide (always visible, panning) ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity:    fading ? 1 : 1,
          transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          zIndex:     2,
        }}
      >
        <div
          key={current}
          className={`absolute inset-0 bg-cover bg-center slide-pan-${SLIDES[current].pan}`}
          style={{ backgroundImage: `url(${SLIDES[current].src})` }}
          role="img"
          aria-label={SLIDES[current].alt}
        />
        {/* Per-slide white overlay — adjust 'overlay' value per slide above */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ backgroundColor: `rgba(255,255,255,${SLIDES[current].overlay})` }}
        />
      </div>

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"
        style={{ zIndex: 10 }}
        role="tablist"
        aria-label="Slideshow navigation"
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              setPrevious(current)
              setFading(true)
              setCurrent(i)
              setTimeout(() => { setPrevious(null); setFading(false) }, FADE_DURATION)
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width:           i === current ? '24px' : '8px',
              height:          '8px',
              backgroundColor: i === current ? '#b6c548' : 'rgba(255,255,255,0.7)',
              border:          'none',
              cursor:          'pointer',
              padding:         0,
            }}
          />
        ))}
      </div>

      {/* ── Page content sits above everything ── */}
      <div className="relative w-full" style={{ zIndex: 10 }}>
        {children}
      </div>

    </div>
  )
}
