// ─── URLs ─────────────────────────────────────────────────────────────────────
const GRABFOOD_URL = 'https://food.grab.com/ph/en/restaurant/avocadoria'
const FB_PAGE_URL  = 'https://m.me/avocadoria.ph'

// ─── Size config ──────────────────────────────────────────────────────────────
// Increase ICON_WIDTH to make buttons bigger / smaller
const ICON_WIDTH = 110  // px — try: 90 | 110 | 130 | 150

export default function FloatingWidgets() {
  return (
    <>
      <style>{`
        .floating-widgets {
          position: fixed;
          right: 16px;
          bottom: 24px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          pointer-events: none;
        }

        .floating-icon-btn {
          display: block;
          pointer-events: all;
          cursor: pointer;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          width: ${ICON_WIDTH}px;
          /* preserve aspect ratio — icons are ~158×100px each */
          height: auto;
          line-height: 0;
          text-decoration: none;
        }

        .floating-icon-btn:hover {
          transform: scale(1.07) translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.24);
        }

        .floating-icon-btn img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 16px;
        }

        /* Mobile: slightly smaller */
        @media (max-width: 480px) {
          .floating-icon-btn {
            width: ${Math.round(ICON_WIDTH * 0.85)}px;
          }
          .floating-widgets {
            right: 10px;
            bottom: 16px;
          }
        }
      `}</style>

      <div className="floating-widgets" aria-label="Quick action buttons">

        {/* Order Here — GrabFood + FoodPanda */}
        <a
          href={GRABFOOD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-icon-btn"
          aria-label="Order on GrabFood"
        >
          <img
            src="/icon_order_here.webp"
            alt="Order Here — GrabFood & FoodPanda"
            width={ICON_WIDTH}
            height={Math.round(ICON_WIDTH * 0.80)}
          />
        </a>

        {/* Live Chat — Messenger */}
        <a
          href={FB_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-icon-btn"
          aria-label="Chat on Facebook Messenger"
        >
          <img
            src="/icon_live_chat.webp"
            alt="Live Chat — Messenger"
            width={ICON_WIDTH}
            height={Math.round(ICON_WIDTH * 0.64)}
          />
        </a>

      </div>
    </>
  )
}
