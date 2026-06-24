export default function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Loading Avocadoria"
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        backgroundColor: '#b6c548',
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      <style>{`
        @keyframes avo-jump {
          0%   { transform: translateY(0px) rotate(-4deg) scale(1); }
          30%  { transform: translateY(-60px) rotate(4deg) scale(1.08); }
          50%  { transform: translateY(-72px) rotate(-2deg) scale(1.1); }
          70%  { transform: translateY(-50px) rotate(3deg) scale(1.06); }
          85%  { transform: translateY(-8px) rotate(-1deg) scale(1.02); }
          92%  { transform: translateY(4px) rotate(1deg) scale(0.98); }
          100% { transform: translateY(0px) rotate(-4deg) scale(1); }
        }
        @keyframes avo-shadow {
          0%, 100% { transform: scaleX(1);    opacity: 0.25; }
          50%       { transform: scaleX(0.45); opacity: 0.08; }
        }
        @keyframes logo-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.92; transform: scale(1.02); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.5; }
          40%            { transform: translateY(-8px); opacity: 1;   }
        }
      `}</style>

      {/* Stacked: avocado mascot on top of logo */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Jumping avocado mascot */}
        <img
          src="/avocadoria_icon_nobg.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '180px',
            height: 'auto',
            objectFit: 'contain',
            animation: 'avo-jump 3s cubic-bezier(0.36,0.07,0.19,0.97) infinite',
            position: 'relative',
            zIndex: 2,
            marginBottom: '-36px',
            filter: 'drop-shadow(0 8px 16px rgba(58,107,53,0.3))',
          }}
        />

        {/* Avocadoria wordmark logo */}
        <img
          src="/logo.svg"
          alt="Avocadoria"
          style={{
            width: '520px',
            height: 'auto',
            objectFit: 'contain',
            animation: 'logo-pulse 3s ease-in-out infinite',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 2px 8px rgba(58,107,53,0.2))',
          }}
        />

        {/* Shadow under logo */}
        <div style={{
          animation:    'avo-shadow 3s ease-in-out infinite',
          width:        '120px',
          height:       '12px',
          borderRadius: '50%',
          background:   'rgba(58,107,53,0.3)',
          marginTop:    '6px',
        }} />
      </div>

      {/* Bouncing dots */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '32px' }}>
        {['#fff', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.5)'].map((color, i) => (
          <div key={i} style={{
            width: '10px', height: '10px',
            borderRadius: '50%',
            background: color,
            animation: `dot-bounce 1.2s ease-in-out infinite ${i * 0.2}s`,
          }} />
        ))}
      </div>

    </div>
  )
}
