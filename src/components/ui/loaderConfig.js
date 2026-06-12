// ─────────────────────────────────────────────────────────────────────────────
// AVOCADORIA LOADER CONFIG
// Edit this file to customize the loading screen — no other files need changing.
// ─────────────────────────────────────────────────────────────────────────────

const loaderConfig = {

  // ── Background color of the full loading screen ──────────────────────────
  backgroundColor: 'transparent',

  // ── Brand name shown below the icon ──────────────────────────────────────
  brandName: 'Avocadoria',
  brandNameColor: '#8A5F3C',
  brandNameSize: '18px',

  // ── Loading text shown below the brand name (set to '' to hide) ──────────
  loadingText: '',

  // ── Bouncing dots — set up to 3 colors, or [] to hide dots ───────────────
  dotColors: ['#b6c548', '#EF7ECB', '#DFD438'],

  // ── Icon mode ─────────────────────────────────────────────────────────────
  // 'svg'   → uses the built-in cute avocado SVG below (default)
  // 'image' → uses a custom image file from /public/ (e.g. your own logo)
  // 'emoji' → uses a plain emoji character
  iconMode: 'image',

  // ── Image mode settings (only used when iconMode = 'image') ──────────────
  // Drop your image into /public/ and set the filename here.
  // Example: '/logo.png', '/loading-icon.gif', '/avo-spinner.webp'
  imageSource: '/avocadoria_icon_nobg.png',
  imageWidth:  '220px',
  imageHeight: 'auto',

  // ── Emoji mode settings (only used when iconMode = 'emoji') ──────────────
  emoji:     '🥑',
  emojiSize: '72px',

  // ── Animation settings ───────────────────────────────────────────────────
  // floatHeight: how many px the icon rises on each bounce
  // floatDuration: seconds for one full float cycle
  // dotDuration: seconds for one full dot bounce cycle
  floatHeight:   '22px',
  floatDuration: '2.4s',
  dotDuration:   '1.2s',

  // ── Shadow (shown under icon, shrinks as icon floats up) ─────────────────
  showShadow:   true,
  shadowColor:  '#8A5F3C',

}

export default loaderConfig
