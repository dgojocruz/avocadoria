import config from './loaderConfig'

// ─── Icon renderers ───────────────────────────────────────────────────────────

function AvoSVG() {
  return (
    <svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="45" cy="58" rx="34" ry="44" fill="#3a6b35"/>
      <ellipse cx="35" cy="38" rx="10" ry="16" fill="#4e8f47" opacity=".5"/>
      <ellipse cx="45" cy="62" rx="26" ry="35" fill="#c8e86a"/>
      <ellipse cx="37" cy="46" rx="8" ry="12" fill="#ddf08a" opacity=".6"/>
      <ellipse cx="45" cy="68" rx="13" ry="16" fill="#8A5F3C"/>
      <ellipse cx="40" cy="62" rx="4" ry="5" fill="#a8784f" opacity=".6"/>
      <ellipse cx="38" cy="60" rx="2" ry="2.5" fill="#c49a6a" opacity=".5"/>
      <rect x="42" y="12" width="6" height="14" rx="3" fill="#3a6b35"/>
      <ellipse cx="53" cy="13" rx="10" ry="5" fill="#4e8f47" transform="rotate(-30 53 13)"/>
      <line x1="45" y1="14" x2="53" y2="12" stroke="#3a6b35" strokeWidth="1.5"/>
      <ellipse cx="45" cy="18" rx="14" ry="8" fill="#D0E8AF"/>
      <path d="M33 18 Q36 10 39 16 Q42 8 45 15 Q48 8 51 16 Q54 10 57 18" stroke="#b6c548" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <rect x="38" y="20" width="5" height="2" rx="1" fill="#EF7ECB" transform="rotate(-20 38 20)"/>
      <rect x="47" y="19" width="5" height="2" rx="1" fill="#DFD438" transform="rotate(15 47 19)"/>
      <rect x="42" y="23" width="4" height="2" rx="1" fill="#8A5F3C" transform="rotate(-10 42 23)"/>
      <circle cx="37" cy="72" r="3.5" fill="white"/>
      <circle cx="53" cy="72" r="3.5" fill="white"/>
      <circle cx="38" cy="72.5" r="2" fill="#3a2010"/>
      <circle cx="54" cy="72.5" r="2" fill="#3a2010"/>
      <circle cx="38.8" cy="71.8" r=".7" fill="white"/>
      <circle cx="54.8" cy="71.8" r=".7" fill="white"/>
      <path d="M38 80 Q45 87 52 80" stroke="#3a2010" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="32" cy="78" r="4" fill="#EF7ECB" opacity=".35"/>
      <circle cx="58" cy="78" r="4" fill="#EF7ECB" opacity=".35"/>
    </svg>
  )
}

function IconImage() {
  return (
    <img
      src={config.imageSource}
      alt={config.brandName}
      style={{ width: config.imageWidth, height: config.imageHeight, objectFit: 'contain' }}
    />
  )
}

function IconEmoji() {
  return (
    <span style={{ fontSize: config.emojiSize, lineHeight: 1 }} aria-hidden="true">
      {config.emoji}
    </span>
  )
}

// ─── PageLoader ───────────────────────────────────────────────────────────────

export default function PageLoader() {
  const floatAnim  = `avo-float ${config.floatDuration} ease-in-out infinite`
  const shadowAnim = `avo-shadow ${config.floatDuration} ease-in-out infinite`
  const dripAnim   = `avo-drip ${config.floatDuration} ease-in-out infinite`

  return (
    <div
      role="status"
      aria-label={`Loading ${config.brandName}`}
      style={{
        minHeight:       '100vh',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: config.backgroundColor,
        gap:             '16px',
      }}
    >
      <style>{`
        @keyframes avo-float {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%       { transform: translateY(-${config.floatHeight}) rotate(3deg); }
        }
        @keyframes avo-shadow {
          0%, 100% { transform: scaleX(1);    opacity: 0.25; }
          50%       { transform: scaleX(0.55); opacity: 0.1;  }
        }
        @keyframes avo-drip {
          0%   { transform: scaleY(0) translateY(0);  opacity: 0; transform-origin: top; }
          40%  { transform: scaleY(1) translateY(0);  opacity: 1; transform-origin: top; }
          70%  { transform: scaleY(1) translateY(0);  opacity: 1; }
          100% { transform: scaleY(1) translateY(8px); opacity: 0; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-8px); opacity: 1;   }
        }
      `}</style>

      {/* ── Icon + shadow ── */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Floating icon wrapper */}
        <div style={{ animation: floatAnim, position: 'relative' }}>
          {config.iconMode === 'svg'   && <AvoSVG />}
          {config.iconMode === 'image' && <IconImage />}
          {config.iconMode === 'emoji' && <IconEmoji />}

          {/* Drip — only shown for SVG mode */}
          {config.iconMode === 'svg' && (
            <div style={{
              animation:    dripAnim,
              position:     'absolute',
              top:          '30px',
              left:         '43px',
              width:        '6px',
              height:       '12px',
              background:   '#D0E8AF',
              borderRadius: '0 0 4px 4px',
            }} />
          )}
        </div>

        {/* Shadow */}
        {config.showShadow && (
          <div style={{
            animation:    shadowAnim,
            width:        '54px',
            height:       '10px',
            borderRadius: '50%',
            background:   config.shadowColor,
            marginTop:    '4px',
          }} />
        )}
      </div>

      {/* ── Brand name ── */}
      {config.brandName && (
        <div style={{
          fontFamily:   'Poppins,sans-serif',
          fontSize:     config.brandNameSize,
          fontWeight:   '700',
          color:        config.brandNameColor,
          letterSpacing:'0.02em',
        }}>
          {config.brandName}
        </div>
      )}

      {/* ── Loading text ── */}
      {config.loadingText && (
        <div style={{
          fontFamily: 'Poppins,sans-serif',
          fontSize:   '13px',
          color:      config.brandNameColor,
          opacity:    0.6,
        }}>
          {config.loadingText}
        </div>
      )}

      {/* ── Bouncing dots ── */}
      {config.dotColors.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {config.dotColors.map((color, i) => (
            <div
              key={i}
              style={{
                width:        '8px',
                height:       '8px',
                borderRadius: '50%',
                background:   color,
                animation:    `dot-bounce ${config.dotDuration} ease-in-out infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

    </div>
  )
}
