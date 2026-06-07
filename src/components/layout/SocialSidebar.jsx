import { useState, useEffect, useRef } from 'react'

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════════

// ── Jingle ────────────────────────────────────────────────────────────────────
const JINGLE = {
  src:    '/audio/avo-jingle.mp3',  // ← drop your mp3 in /public/audio/
  volume: 0.6,                      // 0.0–1.0        try: 0.4–0.8
  loop:   true,                     // loop the jingle
  // Auto-play on page load? false = user must click play first (recommended)
  autoPlay: false,
}

// ── Style ─────────────────────────────────────────────────────────────────────
const STYLE = {
  pillBackground:   'rgba(255, 255, 255, 0.72)',
  pillBorderRadius: '999px',
  pillPaddingX:     '10px',
  pillPaddingY:     '14px',
  pillBorder:       '1px solid rgba(255,255,255,0.9)',
  pillShadow: [
    '4px 4px 10px rgba(182, 197, 72, 0.18)',
    '-2px -2px 6px rgba(255, 255, 255, 0.85)',
    'inset 2px 2px 4px rgba(255,255,255,0.75)',
    'inset -2px -2px 5px rgba(138, 95, 60, 0.12)',
  ].join(', '),
  backdropBlur: 'blur(10px)',
  iconSize:                  '50px',
  iconButtonSize:            '50px',
  iconColor:                 'rgba(168, 211, 9, 0.93)',
  iconColorHover:            '#b6c548',
  iconGap:                   '10px',
  iconButtonBackground:      'rgba(255,255,255,0.5)',
  iconButtonBackgroundHover: 'rgba(208, 232, 175, 0.6)',
  iconButtonBorderRadius:    '50%',
  iconButtonShadow: [
    '2px 2px 5px rgba(138, 95, 60, 0.15)',
    '-1px -1px 3px rgba(255,255,255,0.9)',
    'inset 1px 1px 2px rgba(255,255,255,0.8)',
    'inset -1px -1px 3px rgba(138, 95, 60, 0.10)',
  ].join(', '),
  iconButtonShadowActive: [
    'inset 2px 2px 4px rgba(138, 95, 60, 0.2)',
    'inset -1px -1px 2px rgba(255,255,255,0.6)',
  ].join(', '),
  dividerColor: 'rgba(182, 197, 72, 0.35)',
  dividerSize:  '4px',
  leftOffset:   '16px',
}

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIAL = [
  {
    label: 'Facebook',
    href:  'https://facebook.com/avocadoria.ph',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://instagram.com/avocadoria.ph',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href:  'https://tiktok.com/@avocadoria.ph',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={props}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.22 8.22 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
      </svg>
    ),
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// INTERNALS
// ═══════════════════════════════════════════════════════════════════════════════

function IconBtn({ children, onClick, href, ariaLabel }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const style = {
    width:          STYLE.iconButtonSize,
    height:         STYLE.iconButtonSize,
    borderRadius:   STYLE.iconButtonBorderRadius,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    color:          hovered ? STYLE.iconColorHover : STYLE.iconColor,
    background:     hovered ? STYLE.iconButtonBackgroundHover : STYLE.iconButtonBackground,
    boxShadow:      pressed ? STYLE.iconButtonShadowActive : STYLE.iconButtonShadow,
    border:         'none',
    cursor:         'pointer',
    transition:     'color 0.2s, background 0.2s, box-shadow 0.1s',
    textDecoration: 'none',
    transform:      pressed ? 'scale(0.93)' : 'scale(1)',
  }

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false) },
    onMouseDown:  () => setPressed(true),
    onMouseUp:    () => setPressed(false),
    'aria-label': ariaLabel,
    style,
  }

  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" {...handlers}>{children}</a>
    : <button onClick={onClick} {...handlers}>{children}</button>
}

// ── Sound wave bars animation (playing indicator) ─────────────────────────────
function SoundBars({ playing }) {
  return (
    <div aria-hidden="true" style={{
      display: 'flex', alignItems: 'flex-end',
      gap: '2px', height: '18px', marginTop: '2px',
    }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{
          width: '3px',
          borderRadius: '2px',
          background: STYLE.iconColor,
          height: playing ? `${[10, 18, 14, 8][i-1]}px` : '4px',
          transition: 'height 0.15s ease',
          animation: playing ? `soundbar-${i} ${0.5 + i * 0.1}s ease-in-out infinite alternate` : 'none',
        }}/>
      ))}
      <style>{`
        @keyframes soundbar-1 { from{height:4px} to{height:14px} }
        @keyframes soundbar-2 { from{height:8px} to{height:20px} }
        @keyframes soundbar-3 { from{height:6px} to{height:16px} }
        @keyframes soundbar-4 { from{height:4px} to{height:10px} }
      `}</style>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function SocialSidebar() {
  const [soundOn, setSoundOn] = useState(JINGLE.autoPlay)
  const audioRef = useRef(null)
  const iconSz = { width: STYLE.iconSize, height: STYLE.iconSize }

  // Create audio element once
  useEffect(() => {
    const audio = new Audio(JINGLE.src)
    audio.loop   = JINGLE.loop
    audio.volume = JINGLE.volume
    audioRef.current = audio

    // Auto-play if configured (browsers may block without user gesture)
    if (JINGLE.autoPlay) {
      audio.play().catch(() => setSoundOn(false))
    }

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Toggle play/pause when soundOn changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (soundOn) {
      audio.play().catch(() => setSoundOn(false))
    } else {
      audio.pause()
    }
  }, [soundOn])

  const handleToggle = () => setSoundOn(v => !v)

  return (
    <aside
      aria-label="Social media links and music"
      className="hidden md:flex"
      style={{
        position:  'fixed',
        left:      STYLE.leftOffset,
        top:       '50%',
        transform: 'translateY(-50%)',
        zIndex:    40,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{
        background:           STYLE.pillBackground,
        backdropFilter:       STYLE.backdropBlur,
        WebkitBackdropFilter: STYLE.backdropBlur,
        borderRadius:         STYLE.pillBorderRadius,
        padding:              `${STYLE.pillPaddingY} ${STYLE.pillPaddingX}`,
        border:               STYLE.pillBorder,
        boxShadow:            STYLE.pillShadow,
        display:              'flex',
        flexDirection:        'column',
        alignItems:           'center',
        gap:                  STYLE.iconGap,
      }}>

        {/* ── Sound toggle ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <IconBtn onClick={handleToggle} ariaLabel={soundOn ? 'Pause jingle' : 'Play jingle'}>
            {soundOn ? (
              // Playing — speaker on icon
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={iconSz}>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            ) : (
              // Muted — speaker off icon
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={iconSz}>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            )}
          </IconBtn>
          {/* Animated sound bars — only show when playing */}
          <SoundBars playing={soundOn} />
        </div>

        {/* Divider dot */}
        <div aria-hidden="true" style={{
          width: STYLE.dividerSize, height: STYLE.dividerSize,
          borderRadius: '50%', background: STYLE.dividerColor,
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)',
        }}/>

        {/* Social links */}
        {SOCIAL.map(({ label, href, icon: Icon }) => (
          <IconBtn key={label} href={href} ariaLabel={`Avocadoria on ${label}`}>
            <Icon {...iconSz} />
          </IconBtn>
        ))}

      </div>
    </aside>
  )
}
