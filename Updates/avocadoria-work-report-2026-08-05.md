# Avocadoria Website — Work Report

**Date:** 5 August 2026
**Site:** avocadoria.com
**Deployed:** commit `00b6796` (staging verified, merged to production)

---

## Summary

Ten changes shipped across three areas: a production build failure caught before
release, a set of mobile layout defects, and SEO/domain corrections that were
preventing Google from indexing the site. Branch data was also restructured in
preparation for regional landing pages.

---

## 1. Critical — build failure prevented

`NewsPage.jsx` contained an unclosed `<div>` in the `PostDetail` component. The
development server tolerated it because the affected route was rarely opened,
but `npm run build` compiles every route — the next production deploy would have
failed.

Found during a routine review; fixed and verified.

---

## 2. Mobile layout fixes

| Page | Problem | Resolution |
|---|---|---|
| Our Stores | Search field collapsed to near-zero width on phones; text invisible while typing | Gave the field a real flex-basis so the toolbar wraps instead of squeezing |
| Our Stores | Input at 14px triggered iOS Safari's automatic page zoom on focus | Raised to 16px, the threshold below which iOS zooms |
| Party Cart | Hero image sized at 120% plus a 1.12 scale, causing horizontal scroll | Constrained to 100% below 767px; desktop bleed retained |
| Party Cart | Six booking-form rows locked to two columns; date and time inputs cramped | Single column below 560px |
| News | Featured card locked to two columns, compressing a video into ~165px | Stacks below 767px |
| Our Story | Story sections locked to image-beside-text | Stacks below 767px |
| Site-wide | Navbar logo floor of 85px made the header wider than a 360px viewport, clipping the menu button and causing a white strip down the right edge | Logo reduced to 64px below 480px; horizontal overflow clipped on `html` as well as `body` |
| Navbar | Duplicate `transform` key silently discarding one declaration | Removed the dead line |

---

## 3. Store locator — functional fixes

**Seven branches were effectively hidden.** The branch data contained two labels
for the same region — `Metro Manila` (87 branches) and `Luzon — Metro Manila`
(7). Customers browsing by region saw only the larger group. All 94 are now
merged under a single consistent label.

Affected branches: NLEX Drive and Dine Valenzuela, SM Hypermarket Sucat,
Crossroad Tandang Sora, Food Truck Net25, Food Truck White Plains, Times Plaza
Manila, Metroplaza Caloocan.

**The distance slider was overriding explicit requests.** Selecting "All
branches in Philippines" returned only 27 results, because the 10 km radius
filter applied regardless of what the user had asked for. A name search for a
distant branch also returned nothing. The radius now applies only to the
"Near me" flow; browsing and searching return the full set.

**Distances disappeared for returning visitors.** Location was requested only on
button click and never restored, so distances vanished on every page load. The
page now silently reuses already-granted permission — no new prompt.

**No explanation when distances were absent.** Added a tappable prompt above the
results offering to enable location.

**Radius ceiling raised** from 50 km to 100 km for provincial coverage.

---

## 4. SEO and domain corrections

**www / non-www conflict resolved.** The server redirected `avocadoria.com` to
`www.avocadoria.com`, while the site's own canonical tags and sitemap declared
the opposite. Google reported "Redirect error" and was unable to index affected
pages. Non-www is now canonical throughout, matching what the code declares.

**Duplicate meta tags removed.** `index.html` hardcoded a set of Open Graph and
Twitter Card tags, and react-helmet injected a second, page-specific set. Every
page shipped both, with the static ones always naming the homepage. Social
shares of inner pages would have displayed homepage previews.

**avocadoria.com.ph retired.** The legacy WordPress site was live and indexed
alongside the new site, splitting search authority between two domains. It now
redirects to avocadoria.com at the DNS level. The domain and its Microsoft 365
email (`official@avocadoria.com.ph`) are unaffected and retained.

**Search Console.** Sitemap confirmed submitted and processing; six primary
routes queued for indexing.

**Party Cart hero image** switched from lazy to eager loading — it is the
largest-contentful-paint element and was being deferred.

---

## 5. Homepage promo splash — built, not yet live

A promotional overlay was built to the client's specification: a centred modal
on the homepage, dismissible per promotion, with no change to the existing
layout. Includes analytics events, keyboard and screen-reader support, and a
`?promo=force` preview link for client approval before a promo goes live.

**Shipped inactive.** Facebook's video plugin does not render Reels correctly —
it produces a black frame. The component supports self-hosted MP4 as an
alternative, which also enables muted autoplay and removes third-party cookies
from the homepage. Awaiting the video file.

---

## 6. Data preparation

All 94 Metro Manila branches were tagged with a `city` field, derived from their
addresses and manually reviewed. This supports the regional landing pages
described below.

Distribution: Quezon City 25, Manila 16, Parañaque 7, Makati 7, Pasig 6,
Taguig 5, Las Piñas 5, Caloocan 5, Pasay 4, Valenzuela 3, Muntinlupa 3,
Mandaluyong 3, San Juan 2, Malabon 2, Marikina 1.

---

## Next actions

### Priority 1 — Regional landing pages

The store locator is a single URL. All 233 branches, and the structured data
describing them, currently point at `/our-stores`. Search engines treat this as
one page, so searches like "avocado dessert Cebu" have nothing specific to match.

Proposed: approximately 33 pages — 18 regional pages plus 15 Metro Manila city
pages — each listing its branches with addresses, directions and structured
data. The existing locator remains unchanged.

Note: individual per-branch pages were considered and set aside. With only a
name and address per branch, 233 near-identical pages risk being classified as
low-value content. Regional pages carry enough substance to stand on their own.

### Priority 2 — Google Business Profiles audit

For a 233-branch food brand, most "near me" searches resolve in Google Maps
rather than in web results. If branch profiles are unclaimed or carry incorrect
hours, that likely outweighs any website change. Recommend auditing coverage and
accuracy across all branches.

### Priority 3 — Activate the promo splash

Requires the promotional reel as a self-hosted MP4 (target under 3 MB) plus a
poster image. The component is built and waiting.

### Priority 4 — Smaller items

- Map zooms out to regional scale when displaying a short route
- Straight-line and driving distances displayed simultaneously without
  distinction, showing two different figures for the same branch
- Sitemap lists `/events`, which canonicalises to `/party-cart`; only one should
  be listed
- Brand font preloads remain commented out in `index.html` — confirm whether the
  licensed files were ever delivered
- Confirm `.env` files are excluded from version control; restrict the Google
  Maps API key by HTTP referrer to prevent unauthorised use
