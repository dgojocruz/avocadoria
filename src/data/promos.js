/**
 * Promo data — the single source of truth for all three surfaces:
 *
 *   1. PromoSplash        — one flagship promo, shown as a modal on the homepage
 *   2. PromoCarousel      — rotating cards on the homepage
 *   3. PromosPage         — the full list at /about/promos
 *
 * TO ADD A PROMO: copy an entry, fill it in, set active: true. That is the
 * whole job — all three surfaces pick it up automatically.
 *
 * TO END A PROMO: set endDate. It disappears from every surface the day after,
 * with no code change. Leave endDate null only for evergreen offers.
 *
 * FIELDS
 *   id          Unique + permanent. This is the splash dismissal key — a
 *               visitor who closes a promo never sees that id again, so give
 *               a re-run campaign a NEW id.
 *   title       Short headline. Used on cards and the promos page.
 *   body        One or two sentences. Optional.
 *   media       { type:'image', src, alt }  — square artwork works best
 *               { type:'video', src, poster, alt, controls }
 *   branches    Optional array of participating branch names.
 *   period      Optional free-text line describing the run dates, shown to
 *               customers. Independent of startDate/endDate, which control
 *               visibility — keep the two in step.
 *   coverage    Optional array of free-text availability lines. Use this
 *               instead of `branches` when availability varies by product
 *               or is regional rather than a fixed branch list.
 *   ctaLabel    Button text.
 *   ctaHref     Internal path or full URL.
 *   startDate   'YYYY-MM-DD'. Hidden before this. Optional.
 *   endDate     'YYYY-MM-DD', inclusive. Hidden after this. Optional.
 *   active      false parks a promo without deleting it.
 *   featured    true = this is the one the splash modal shows. Only the first
 *               featured promo is used; the rest appear in the carousel only.
 */

export const PROMOS = [

  {
    id: 'foodpanda-100-off-2026-09',
    title: '₱100 off on foodpanda',
    body: 'Get ₱100 off with a minimum spend of ₱699. Valid at participating branches.',
    media: {
      type: 'image',
      src: '/promos/foodpanda-100-off.webp',
      alt: '₱100 off with a minimum spend of ₱699 on foodpanda. '
         + 'Valid at participating branches. Terms and conditions apply.',
    },
    branches: [
      'SM City Marikina',
      'SM City North EDSA City Center',
      'SM City North EDSA Sky Garden',
      'Robinsons Place Magnolia',
      'Up Town Center',
      'SM City Grand Central',
      'SM City Sta. Rosa',
      'SM Mall of Asia',
      'Riverbanks Mall',
      'SM City Lipa',
      'SM City Batangas',
      'Up Town Center BGC',
      'SM City Taytay',
      'SM City San Mateo',
      'SM City Sto. Tomas',
      'SM City Urdaneta',
      'Mayor Gil Fernando Avenue, Marikina',
      'SM Megamall',
      'Ayala 30th',
    ],
    ctaLabel: 'Order on foodpanda',
    ctaHref: 'https://foodpanda.ph/chain/cy2uf/avocadoria-ph',
    startDate: '2026-09-09',
    // No end date — running until further notice. Set this when the campaign
    // ends, or the promo advertises indefinitely.
    endDate: null,
    active: true,
    featured: true,
  },


  {
    id: 'new-shakes-2026-09',
    title: 'Shake it. Sip into it.',
    body: 'Two new shakes: Avocado Yogurt Shake, and Coconut Milk Shake '
        + '— keto friendly, less sugar.',
    // Shown on the card and the promos page so customers know the window.
    period: 'Available 15 September – 31 October 2026',
    media: {
      type: 'image',
      src: '/promos/new-products-nationwide.webp',
      alt: 'New Avocadoria products: Avocado Yogurt Shake PHP 249 and '
         + 'Coconut Milk Shake, keto friendly, PHP 250.',
    },
    coverage: ['Available nationwide'],
    ctaLabel: null,
    ctaHref: null,
    startDate: '2026-09-15',
    endDate: '2026-10-31',
    active: true,
    featured: false,   // foodpanda keeps the splash modal
  },

  {
    id: 'croissant-avo-pops-2026-09',
    title: 'Croissant Avo Pops',
    body: 'Senyorita avocado ice cream in a flaky croissant.',
    media: {
      type: 'image',
      src: '/promos/new-products-metro-manila.webp',
      alt: 'Croissant Avo Pops, PHP 185, with Avocado Yogurt Shake and '
         + 'Coconut Milk Shake.',
    },
    period: 'Available 15 September – 31 October 2026',
    branches: [
      'Net 25 - Central Avenue',
      'SM City Caloocan',
      'SM City Sangandaan',
      'Waltermart Caloocan',
      'Evia Lifestyle Mall',
      'Robinsons Place Las Pinas',
      'SM Center Las Pinas',
      'SM City Southmall',
      'Landmark Makati',
      'One Ayala Mall',
      'The Market Place - Glorietta',
      'Waltermart Makati',
      'Zuellig Building',
      'Robinsons Place Malabon',
      'SMDC Light Mall',
      'Starmall Shaw Boulevard',
      '168 Mall - 5th Floor',
      '168 Mall - Ground Floor',
      '999 Shopping Mall',
      'Ayala Malls Manila Bay',
      'Greenhills Unimart',
      'Greenhills Virra Mall',
      'LRT Pasay Taft Rotonda',
      'Moriones, Tondo',
      'R. Square',
      'Robinsons Place Manila',
      'SM City Manila',
      'SM City San Lazaro',
      'SM City Sta. Mesa',
      'Tutuban Mall',
      'Ugbo - Tondo Manila',
      'UPAD Hotel - Taft',
      'Victory Mall - Quiapo Underpass',
      'Youniversity Suites',
      'Ayala Malls Marikina',
      'Festival Mall Alabang',
      'SM Center Muntinlupa',
      'Waltermart Muntinlupa',
      'Alabang Town Center',
      'Landmark - Manila Bay',
      'PITX',
      'Shopwise Sucat',
      'SM City BF Paranaque',
      'SM City Bicutan',
      'SM City Sucat',
      'SM Hypermarket Sucat',
      'Waltermart Sucat',
      'Double Dragon Plaza',
      'C. Raymundo',
      'Estancia Mall',
      'Robinsons Place Metro East',
      'SM Center Pasig',
      'SM City East Ortigas',
      'Ayala Malls Cloverleaf',
      'Ayala Malls Trinoma',
      'Batasan Hills',
      'Centris Mall',
      'Crossroad Tandang Sora',
      'Ever Commonwealth',
      'Fishermall QC',
      'Gateway Mall Cubao',
      'Landmark - Trinoma',
      'Robinsons Place Galleria',
      'SM Araneta City - Cubao',
      'SM City Fairview',
      'SM City Novaliches',
      'SM Hypermarket Cubao',
      'SM Hypermarket Novaliches',
      'SMDC Mplace',
      'SMDC Sun Mall',
      'UP Shopping Center',
      'Waltermart E. Rodriguez',
      'Waltermart North Edsa',
      'Whiteplains QC',
      'Wilcon City Center',
      'AsiaTown McKinley West',
      'Ayala Malls Market Market',
      'Food District BGC',
      'FTI Hypermarket',
      'Venice Grand Canal Mall',
      'Vista Mall Taguig',
      'Drive and Dine NLEX',
      'One Mall Valenzuela',
      'SM City Valenzuela',
      'Metroplaza Caloocan',
      'Times Plaza',
      'SM City Marikina',
      'SM City North EDSA City Center',
      'SM City North EDSA Sky Garden',
      'Robinsons Place Magnolia',
      'Up Town Center',
      'SM City Grand Central',
      'SM Mall of Asia',
      'Riverbanks Mall',
      'Up Town Center BGC',
      'SM City Taytay',
      'SM City San Mateo',
      'Mayor Gil Fernando Avenue, Marikina',
      'SM Megamall',
    ],
    ctaLabel: null,
    ctaHref: null,
    startDate: '2026-09-15',
    endDate: '2026-10-31',
    active: true,
    featured: false,
  },
]

/** Returns true when `promo` should be visible right now. */
function isLive(promo, now) {
  if (!promo || promo.active === false) return false

  if (promo.startDate) {
    const start = new Date(`${promo.startDate}T00:00:00`)
    if (Number.isNaN(start.getTime()) || now < start) return false
  }

  if (promo.endDate) {
    const end = new Date(`${promo.endDate}T23:59:59`)
    if (Number.isNaN(end.getTime()) || now > end) return false
  }

  return true
}

/**
 * Every promo currently running, in array order.
 * Used by the homepage carousel and the promos page.
 */
export function getLivePromos(now = new Date()) {
  return PROMOS.filter((p) => isLive(p, now))
}

/**
 * Promos that have finished — for the "past promos" section, if wanted.
 */
export function getExpiredPromos(now = new Date()) {
  return PROMOS.filter(
    (p) => p.active !== false && p.endDate && new Date(`${p.endDate}T23:59:59`) < now
  )
}

/**
 * The single promo the splash modal shows: the first live one flagged
 * `featured`, falling back to the first live promo of any kind.
 *
 * Async on purpose so swapping to an admin/API source later is a one-line
 * change here rather than a change in every component.
 */
export async function getActivePromo({ ignoreGates = false } = {}) {
  if (ignoreGates) return PROMOS[0] || null

  const live = getLivePromos()
  return live.find((p) => p.featured) || live[0] || null
}

/**
 * Builds a Facebook video plugin URL. Retained for promos using an embed.
 * NOTE: Facebook's player does not render Reels correctly — it shows a black
 * frame. Use a self-hosted MP4 (type:'video') instead.
 */
export function buildFacebookEmbedUrl(href, width, height) {
  const params = new URLSearchParams({
    href,
    width: String(width),
    height: String(height),
    show_text: 'false',
    t: '0',
  })
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`
}
