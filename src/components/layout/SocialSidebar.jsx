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
  pillPaddingX:     '6px',
  pillPaddingY:     '10px',
  pillBorder:       '1px solid rgba(255,255,255,0.9)',
  pillShadow: [
    '4px 4px 10px rgba(182, 197, 72, 0.18)',
    '-2px -2px 6px rgba(255, 255, 255, 0.85)',
    'inset 2px 2px 4px rgba(255,255,255,0.75)',
    'inset -2px -2px 5px rgba(138, 95, 60, 0.12)',
  ].join(', '),
  backdropBlur: 'blur(10px)',
  iconSize:                  '28px',
  iconButtonSize:            '36px',
  iconColor:                 'rgba(168, 211, 9, 0.93)',
  iconColorHover:            '#b6c548',
  iconGap:                   '6px',
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
  leftOffset:   '4px',
}

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIAL = [
  {
    label: 'Facebook',
    href:  'https://www.facebook.com/avocadoria.official',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/avocadoriaph.official',
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
    href:  'https://www.tiktok.com/@avocadoria',
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
    color:          hovered ? '#fff' : STYLE.iconColor,
    background:     hovered
      ? 'linear-gradient(135deg, #b6c548, #3a6b35)'
      : STYLE.iconButtonBackground,
    boxShadow:      pressed
      ? STYLE.iconButtonShadowActive
      : hovered
        ? '0 0 0 3px rgba(182,197,72,0.4), 0 6px 20px rgba(58,107,53,0.4)'
        : STYLE.iconButtonShadow,
    border:         'none',
    cursor:         'pointer',
    transition:     'color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.2s',
    textDecoration: 'none',
    transform:      pressed ? 'scale(0.93)' : hovered ? 'scale(1.15)' : 'scale(1)',
    position:       'relative',
  }

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => { setHovered(false); setPressed(false) },
    onMouseDown:  () => setPressed(true),
    onMouseUp:    () => setPressed(false),
    'aria-label': ariaLabel,
    style,
  }

  const label = ariaLabel
    ? ariaLabel.replace('Avocadoria on ', '')
    : null

  const tooltip = hovered && label ? (
    <div style={{
      position:       'absolute',
      left:           'calc(100% + 10px)',
      top:            '50%',
      transform:      'translateY(-50%)',
      background:     '#3a6b35',
      color:          '#fff',
      fontFamily:     'Poppins,sans-serif',
      fontSize:       '11px',
      fontWeight:     '700',
      padding:        '4px 10px',
      borderRadius:   '8px',
      whiteSpace:     'nowrap',
      boxShadow:      '0 4px 12px rgba(58,107,53,0.3)',
      pointerEvents:  'none',
      zIndex:         9999,
      letterSpacing:  '0.02em',
    }}>
      {label}
      {/* Arrow */}
      <div style={{
        position:     'absolute',
        right:        '100%',
        top:          '50%',
        transform:    'translateY(-50%)',
        width:        0, height: 0,
        borderTop:    '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderRight:  '5px solid #3a6b35',
      }}/>
    </div>
  ) : null

  const inner = (
    <>
      {children}
      {tooltip}
    </>
  )

  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" {...handlers}>{inner}</a>
    : <button onClick={onClick} {...handlers}>{inner}</button>
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

  const [showBrochure, setShowBrochure] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    if (!showBrochure) return
    const handle = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setShowBrochure(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [showBrochure])

  return (
    <>
    <style>{`
      @media (max-width: 767px) {
        .social-sidebar-aside {
          left: 12px !important;
          right: auto !important;
          top: auto !important;
          bottom: 12px !important;
          transform: none !important;
        }
        .social-sidebar-pill {
          flex-direction: row !important;
          padding: 5px 7px !important;
          gap: 5px !important;
        }
        .social-sidebar-pill button,
        .social-sidebar-pill a {
          width: 30px !important;
          height: 30px !important;
        }
        .social-sidebar-pill svg {
          width: 16px !important;
          height: 16px !important;
        }
        .social-sidebar-sound-bars { display: none !important; }
      }
    `}</style>
    <aside
      aria-label="Social media links and music"
      className="social-sidebar-aside"
      style={{
        position:      'fixed',
        left:          STYLE.leftOffset,
        top:           '50%',
        transform:     'translateY(-50%)',
        zIndex:        40,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
      }}
    >
      <div className="social-sidebar-pill" style={{
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
          <div className="social-sidebar-sound-bars"><SoundBars playing={soundOn} /></div>
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

        {/* Divider dot */}
        <div aria-hidden="true" style={{
          width: STYLE.dividerSize, height: STYLE.dividerSize,
          borderRadius: '50%', background: STYLE.dividerColor,
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.1)',
        }}/>

        {/* Highlights */}
        <IconBtn href="/gallery/videos" ariaLabel="Highlights">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={iconSz}>
            <polygon points="6,3 21,12 6,21"/>
          </svg>
        </IconBtn>

        {/* Snapshots */}
        <IconBtn href="/gallery/photos" ariaLabel="Snapshots">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={iconSz}>
            <rect x="3" y="5" width="18" height="14" rx="2.5"/>
            <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/>
            <circle cx="17.5" cy="7.5" r="1.1" fill="currentColor" stroke="none"/>
          </svg>
        </IconBtn>

        {/* Brochures & FAQs */}
        <div style={{ position:'relative' }}>
          <IconBtn onClick={() => setShowBrochure(v => !v)} ariaLabel="Brochures & FAQs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={iconSz}>
              <rect x="4" y="2" width="12" height="16" rx="2"/>
              <line x1="7" y1="7" x2="13" y2="7" strokeLinecap="round"/>
              <line x1="7" y1="11" x2="13" y2="11" strokeLinecap="round"/>
              <line x1="7" y1="15" x2="10" y2="15" strokeLinecap="round"/>
            </svg>
          </IconBtn>

          {/* Popover */}
          {showBrochure && (
            <div ref={popoverRef} style={{
              position:'absolute', left:'48px', top:'50%', transform:'translateY(-50%)',
              width:'240px', background:'rgba(255,255,255,0.97)',
              backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
              borderRadius:'16px', border:'1.5px solid #b6c548',
              boxShadow:'0 8px 32px rgba(58,107,53,0.18)',
              padding:'14px', zIndex:1001,
            }}>
              {/* Arrow pointing left */}
              <div style={{
                position:'absolute', left:'-8px', top:'50%', transform:'translateY(-50%)',
                width:0, height:0,
                borderTop:'8px solid transparent',
                borderBottom:'8px solid transparent',
                borderRight:'8px solid #b6c548',
              }}/>
              <p style={{ fontFamily:"'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", fontSize:'13px', color:'var(--c-olive)', margin:'0 0 10px', textShadow:'-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff' }}>
                Downloads
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {/* B2B Brochure */}
                <div style={{ padding:'10px 12px', background:'rgba(58,107,53,0.06)', borderRadius:'10px', border:'1px solid rgba(58,107,53,0.15)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'linear-gradient(135deg,#3a6b35,#b6c548)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="12" height="16" rx="2" fill="#fff"/><line x1="7" y1="7" x2="13" y2="7" stroke="#3a6b35" strokeWidth="2" strokeLinecap="round"/><line x1="7" y1="11" x2="13" y2="11" stroke="#3a6b35" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:'700', color:'#3a6b35', margin:0 }}>B2B Franchise Brochure</p>
                      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'9px', color:'#8A5F3C', margin:0, opacity:0.75 }}>PDF · 15 pages · 1MB</p>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <a href="/downloads/avocadoria-b2b-brochure.pdf" target="_blank" rel="noreferrer" style={{ flex:1, textAlign:'center', padding:'5px 0', borderRadius:'8px', background:'#3a6b35', color:'#fff', fontFamily:'Poppins,sans-serif', fontSize:'10px', fontWeight:'700', textDecoration:'none' }}>View</a>
                    <a href="/downloads/avocadoria-b2b-brochure.pdf" download="Avocadoria-B2B-Brochure.pdf" style={{ flex:1, textAlign:'center', padding:'5px 0', borderRadius:'8px', background:'transparent', color:'#3a6b35', fontFamily:'Poppins,sans-serif', fontSize:'10px', fontWeight:'700', textDecoration:'none', border:'1.5px solid #3a6b35' }}>Download</a>
                  </div>
                </div>
                {/* Expo Flyer */}
                <div style={{ padding:'10px 12px', background:'rgba(240,110,187,0.06)', borderRadius:'10px', border:'1px solid rgba(240,110,187,0.2)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'linear-gradient(135deg,#F06EBB,#d44fa0)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" fill="#fff" opacity="0.9"/><circle cx="12" cy="12" r="3" fill="#F06EBB"/></svg>
                    </div>
                    <div>
                      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'11px', fontWeight:'700', color:'#3a6b35', margin:0 }}>Expo 2026 Flyer</p>
                      <p style={{ fontFamily:'Poppins,sans-serif', fontSize:'9px', color:'#8A5F3C', margin:0, opacity:0.75 }}>Image · 882KB</p>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <a href="/downloads/avocadoria-expo-flyer-2026.webp" target="_blank" rel="noreferrer" style={{ flex:1, textAlign:'center', padding:'5px 0', borderRadius:'8px', background:'#F06EBB', color:'#fff', fontFamily:'Poppins,sans-serif', fontSize:'10px', fontWeight:'700', textDecoration:'none' }}>View</a>
                    <a href="/downloads/avocadoria-expo-flyer-2026.webp" download="Avocadoria-Expo-Flyer-2026.webp" style={{ flex:1, textAlign:'center', padding:'5px 0', borderRadius:'8px', background:'transparent', color:'#F06EBB', fontFamily:'Poppins,sans-serif', fontSize:'10px', fontWeight:'700', textDecoration:'none', border:'1.5px solid #F06EBB' }}>Download</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </aside>
    </>
  )
}
