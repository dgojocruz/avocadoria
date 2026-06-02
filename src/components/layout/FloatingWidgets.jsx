/**
 * FloatingWidgets — fixed bottom-right panel
 * Matches the design: "Order Here" (GrabFood) + "Live Chat" (Messenger)
 */

// Replace with actual GrabFood deeplink for Avocadoria
const GRABFOOD_URL = 'https://food.grab.com/ph/en/restaurant/avocadoria'

// Replace with actual Facebook Page username
const FB_PAGE_URL  = 'https://m.me/avocadoria.ph'

export default function FloatingWidgets() {
  return (
    <div
      className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3"
      aria-label="Quick action buttons"
    >

      {/* Order Here — GrabFood */}
      <a
        href={GRABFOOD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center gap-2 pl-3 pr-1 py-1
          bg-white rounded-full shadow-card-lg border border-avo-pale
          hover:shadow-card transition-shadow
          font-neue text-xs font-bold text-avo-brown
          group
        "
        aria-label="Order on GrabFood"
      >
        <span>Order Here</span>
        {/* GrabFood brand logo placeholder — replace with actual SVG/img */}
        <div className="w-10 h-10 rounded-full bg-[#00B14F] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          GF
        </div>
      </a>

      {/* Live Chat — Facebook Messenger */}
      <a
        href={FB_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center gap-2 pl-3 pr-1 py-1
          bg-white rounded-full shadow-card-lg border border-avo-pale
          hover:shadow-card transition-shadow
          font-neue text-xs font-bold text-avo-brown
          group
        "
        aria-label="Chat with us on Messenger"
      >
        <span>Live Chat</span>
        {/* Messenger icon */}
        <div className="w-10 h-10 rounded-full bg-[#0084FF] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.78 1.28 5.266 3.3 6.968V21l3.013-1.66c.805.222 1.656.341 2.537.341 5.523 0 10-4.145 10-9.259C22 6.145 17.523 2 12 2zm.994 12.466L10.62 11.87l-4.72 2.596 5.198-5.517 2.433 2.596 4.666-2.596-5.203 5.517z"/>
          </svg>
        </div>
      </a>

    </div>
  )
}
