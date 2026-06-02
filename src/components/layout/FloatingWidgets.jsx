const GRABFOOD_URL = 'https://food.grab.com/ph/en/restaurant/avocadoria'
const FB_PAGE_URL  = 'https://m.me/avocadoria.ph'

export default function FloatingWidgets() {
  return (
    <div className="floating-widgets" aria-label="Quick action buttons">

      {/* Order Here — GrabFood */}
      <a href={GRABFOOD_URL} target="_blank" rel="noopener noreferrer"
        className="floating-btn" aria-label="Order on GrabFood">
        <span>Order Here</span>
        <div className="floating-icon" style={{ background:'#00B14F' }}>
          <svg viewBox="0 0 40 40" fill="white" style={{ width:'22px', height:'22px' }} aria-hidden="true">
            <text x="4" y="28" fontSize="18" fontWeight="bold">GF</text>
          </svg>
        </div>
      </a>

      {/* Live Chat — Messenger */}
      <a href={FB_PAGE_URL} target="_blank" rel="noopener noreferrer"
        className="floating-btn" aria-label="Chat on Messenger">
        <span>Live Chat</span>
        <div className="floating-icon" style={{ background:'#0084FF' }}>
          <svg viewBox="0 0 24 24" fill="white" style={{ width:'20px', height:'20px' }} aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.78 1.28 5.266 3.3 6.968V21l3.013-1.66c.805.222 1.656.341 2.537.341 5.523 0 10-4.145 10-9.259C22 6.145 17.523 2 12 2zm.994 12.466L10.62 11.87l-4.72 2.596 5.198-5.517 2.433 2.596 4.666-2.596-5.203 5.517z"/>
          </svg>
        </div>
      </a>

    </div>
  )
}
