import { Link } from 'react-router-dom'

// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING WIDGETS CONFIG — change anything here, no need to touch JSX below
// ═══════════════════════════════════════════════════════════════════════════════

// ── Links ─────────────────────────────────────────────────────────────────────
const LINKS = {
  // Order Here → goes to Our Stores page so customers find their nearest branch
  // Each branch will have its own GrabFood/FoodPanda link on that page
  orderHere: '/our-stores',   // internal route — change to any path or external URL
  messenger: 'https://m.me/avocadoria.ph',
}

// ── Button size ───────────────────────────────────────────────────────────────
const SIZE = {
  buttonWidth:   160,   // px total button width        try: 140–200
  buttonHeight:  52,    // px button height             try: 44–60
  borderRadius:  999,   // px — 999 = full pill shape   try: 12–999
  iconSize:      36,    // px icon circle diameter      try: 28–44
  gap:           10,    // px gap between buttons       try: 8–16
}

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FONTS = {
  // Any font loaded in your project — must match @font-face name exactly
  label:    "'Poppins',sans-serif",         // sub-label ("Order via", "Message us")
  main:     "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif", // main button text
  labelSize: 10,   // px sub-label font size            try: 9–12
  mainSize:  14,   // px main text font size            try: 12–16
}

// ── Colors ────────────────────────────────────────────────────────────────────
const COLORS = {
  // Order Here button
  orderBg:        'linear-gradient(145deg, #ffffff 0%, #f2f5e8 100%)',
  orderTextTop:   '#6b8a2a',   // sub-label color
  orderTextMain:  '#3a6b00',   // main label color

  // Live Chat button
  chatBg:         'linear-gradient(145deg, #eaf5d0 0%, #d8eda8 100%)',
  chatTextTop:    '#6b8a2a',
  chatTextMain:   '#3a6b00',

  // Cart icon circle — brand olive green
  cartBg:         '#b6c548',   // matches slope/headline color

  // Messenger icon circle — brand color instead of Facebook blue
  messengerBg:    '#8aaa1a',   // darker olive — try '#b6c548' | '#7a9900' | '#3a6b00'
}

// ── Logo images (optional) ────────────────────────────────────────────────────
// If you have real logo PNGs/WebPs in /public/, set the src here.
// Set to null to use the built-in SVG icons instead.
const LOGOS = {
  grabfood:  null,   // e.g. '/logos/grabfood.png'  — null = use SVG icon
  foodpanda: null,   // e.g. '/logos/foodpanda.png' — null = use SVG icon
  messenger: null,   // e.g. '/logos/messenger.png' — null = use SVG icon
}

// ── Position ──────────────────────────────────────────────────────────────────
const POSITION = {
  right:  '16px',   // from right edge of screen    try: '12px'–'32px'
  bottom: '24px',   // from bottom of screen        try: '16px'–'40px'
}

// ── Emboss shadow ─────────────────────────────────────────────────────────────
const SHADOW = {
  normal: `inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.14), 0 1px 3px rgba(0,0,0,0.10)`,
  hover:  `0 8px 24px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.6)`,
  active: `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.10)`,
}

// ═══════════════════════════════════════════════════════════════════════════════
// INTERNALS — no need to edit below
// ═══════════════════════════════════════════════════════════════════════════════

// Built-in SVG icons (used when LOGOS.x is null)
const CartIcon = () => (
  <div style={{
    width: SIZE.iconSize, height: SIZE.iconSize, borderRadius: '50%',
    background: COLORS.cartBg, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)',
  }}>
    <svg width={SIZE.iconSize * 0.58} height={SIZE.iconSize * 0.58} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  </div>
)

const MessengerIcon = () => (
  <div style={{
    width: SIZE.iconSize, height: SIZE.iconSize, borderRadius: '50%',
    background: COLORS.messengerBg, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.3)',
  }}>
    <svg width={SIZE.iconSize * 0.58} height={SIZE.iconSize * 0.58} viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.906 1.419 5.502 3.64 7.22V22l3.338-1.83c.892.246 1.836.378 2.812.378 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2z" fill="white"/>
      <path d="M7.5 13.8l2.7-3.6 2.1 1.7 2.6-1.7 2.6 3.6-2.6-1.7-2.1 1.8-2.2-1.8-3.1 1.7z" fill={COLORS.messengerBg}/>
    </svg>
  </div>
)

// Logo image (if provided) or fallback to SVG icon
const LogoOrIcon = ({ logoSrc, FallbackIcon, alt, size }) => {
  if (logoSrc) {
    return (
      <img src={logoSrc} alt={alt} style={{
        width: size, height: size,
        objectFit: 'contain', flexShrink: 0,
        borderRadius: '50%',
      }}/>
    )
  }
  return <FallbackIcon />
}

export default function FloatingWidgets() {
  const btnStyle = (bg) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: `${(SIZE.buttonHeight - SIZE.iconSize) / 2}px 16px ${(SIZE.buttonHeight - SIZE.iconSize) / 2}px 10px`,
    borderRadius: SIZE.borderRadius,
    background: bg,
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    width: SIZE.buttonWidth,
    boxShadow: SHADOW.normal,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease',
  })

  const labelTop = {
    fontFamily: FONTS.label,
    fontSize: FONTS.labelSize,
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    lineHeight: 1.3,
    display: 'block',
  }

  const labelMain = {
    fontFamily: FONTS.main,
    fontSize: FONTS.mainSize,
    fontWeight: 800,
    lineHeight: 1.3,
    whiteSpace: 'nowrap',
    display: 'block',
  }

  const handleEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'
    e.currentTarget.style.boxShadow = SHADOW.hover
    e.currentTarget.style.filter = 'brightness(1.05)'
  }
  const handleLeave = (e) => {
    e.currentTarget.style.transform = 'none'
    e.currentTarget.style.boxShadow = SHADOW.normal
    e.currentTarget.style.filter = 'none'
  }
  const handleDown = (e) => {
    e.currentTarget.style.transform = 'translateY(1px) scale(0.98)'
    e.currentTarget.style.boxShadow = SHADOW.active
  }

  return (
    <div style={{
      position: 'fixed',
      right: POSITION.right,
      bottom: POSITION.bottom,
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      gap: SIZE.gap,
      alignItems: 'flex-end',
    }}>

      {/* ── Order Here — goes to Our Stores page to find nearest branch ── */}
      <Link
        to={LINKS.orderHere}
        style={btnStyle(COLORS.orderBg)}
        aria-label="Find your nearest store and order"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseDown={handleDown}
        onMouseUp={handleLeave}
      >
        <LogoOrIcon logoSrc={LOGOS.grabfood} FallbackIcon={CartIcon}
          alt="Order Here" size={SIZE.iconSize} />
        <div>
          <span style={{ ...labelTop, color: COLORS.orderTextTop }}>Find a store</span>
          <span style={{ ...labelMain, color: COLORS.orderTextMain }}>Order Here</span>
        </div>
      </Link>

      {/* ── Live Chat ── */}
      <a
        href={LINKS.messenger}
        target="_blank"
        rel="noopener noreferrer"
        style={btnStyle(COLORS.chatBg)}
        aria-label="Chat with us on Messenger"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onMouseDown={handleDown}
        onMouseUp={handleLeave}
      >
        <LogoOrIcon logoSrc={LOGOS.messenger} FallbackIcon={MessengerIcon}
          alt="Facebook Messenger" size={SIZE.iconSize} />
        <div>
          <span style={{ ...labelTop, color: COLORS.chatTextTop }}>Message us</span>
          <span style={{ ...labelMain, color: COLORS.chatTextMain }}>Live Chat</span>
        </div>
      </a>

    </div>
  )
}
