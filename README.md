# Avocadoria Website

> "Happiness in avocado" — The Philippines' No. 1 Avocado-Based Dessert Brand  
> Built with React 18 + Vite + Tailwind CSS · Deployed on Hostinger

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Project Structure

```
avocadoria/
├── public/
│   ├── .htaccess          ← CRITICAL: Apache rewrite rules for Hostinger
│   ├── fonts/             ← Place licensed WOFF2 font files here
│   ├── favicon.svg
│   └── og-image.jpg
│
├── src/
│   ├── assets/fonts/      ← Alternative: import fonts via CSS @font-face
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx          ← Root layout wrapper (all pages)
│   │   │   ├── Navbar.jsx          ← Responsive navigation bar
│   │   │   ├── Footer.jsx          ← Footer with links + contact info
│   │   │   ├── SocialSidebar.jsx   ← Fixed left: sound + social icons
│   │   │   └── FloatingWidgets.jsx ← Fixed right: GrabFood + Messenger
│   │   │
│   │   ├── ui/
│   │   │   ├── SEO.jsx             ← Per-page meta tags (React Helmet)
│   │   │   ├── PageLoader.jsx      ← Loading spinner (Suspense fallback)
│   │   │   └── ScrollToTop.jsx     ← Scroll reset on route change
│   │   │
│   │   └── sections/              ← Phase 3: page section components
│   │       ├── HeroSection.jsx
│   │       ├── AvoFavesSection.jsx
│   │       ├── FranchiseTeaserSection.jsx
│   │       └── NewsSection.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── OurStoresPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── FranchisePage.jsx
│   │   ├── PartyCartPage.jsx
│   │   ├── CareersPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── hooks/             ← Phase 3: custom React hooks
│   ├── utils/
│   │   └── constants.js   ← Site URLs, nav links, brand colors
│   ├── context/           ← Phase 3: global state (cart, etc.)
│   │
│   ├── App.jsx            ← Router + lazy page loading
│   ├── main.jsx           ← React entry point
│   └── index.css          ← Tailwind directives + global styles
│
├── tailwind.config.js     ← All brand colors, fonts, spacing
├── vite.config.js         ← Build config + sitemap plugin
├── postcss.config.js
└── package.json
```

---

## Brand Tokens

All brand values are in `tailwind.config.js`. To change any color site-wide, edit it there:

| Token              | Hex       | Use                                  |
|--------------------|-----------|--------------------------------------|
| `avo-cream`        | `#F4FAEC` | Page backgrounds, hero              |
| `avo-brown`        | `#8A5F3C` | Logo, body text, footer             |
| `avo-olive`        | `#b6c548` | Primary CTAs, nav active, headings  |
| `avo-yellow`       | `#DFD438` | Accent, highlights, tags            |
| `avo-pale`         | `#D0E8AF` | Section backgrounds, cards          |
| `avo-pink`         | `#EF7ECB` | Secondary CTAs, playful accents     |

---

## Font Setup (Action Required)

The three official brand fonts require commercial licenses:

1. **Bubblebody Neue Inline** — Logo only  
2. **Zing Rust Script** — Section subheadings  
3. **Neue Einstellung** — Body text, UI, navigation  

**Steps:**
1. Purchase web font licenses from the respective foundries
2. Get WOFF2 files for each font/weight
3. Place them in `/public/fonts/`
4. Uncomment the `@font-face` blocks in `src/index.css`
5. Uncomment the `<link rel="preload">` tags in `index.html`

---

## Deployment to Hostinger

```bash
# 1. Build
npm run build

# 2. The /dist folder is your deployable output
# 3. Upload ALL contents of /dist to public_html on Hostinger
#    (via File Manager or FTP/FileZilla)
# 4. The .htaccess file in /public is automatically copied to /dist
#    It MUST be present in public_html for React Router to work
# 5. Set up SSL in Hostinger dashboard
```

> ⚠ The `.htaccess` file is critical. Without it, every page except `/`
> will return a 404 on refresh because Hostinger runs Apache.

---

## Environment Variables

Create a `.env` file in the project root (never commit this):

```env
VITE_GRABFOOD_URL=https://food.grab.com/ph/en/restaurant/avocadoria
VITE_FB_PAGE_ID=avocadoria.ph
VITE_FORMSPREE_FRANCHISE=your_formspree_id
VITE_FORMSPREE_PARTYCART=your_formspree_id
VITE_FORMSPREE_CAREERS=your_formspree_id
VITE_GOOGLE_MAPS_KEY=your_maps_api_key
```

---

## Phase Roadmap

| Phase | Status | Scope |
|-------|--------|-------|
| 1 — Brand & Planning   | ✅ Done | Colors, fonts, sitemap, tech stack |
| 2 — Project Scaffold   | ✅ Done | Folder structure, router, layout, config |
| 3 — Component Build    | 🔜 Next | All page sections, product cards, forms |
| 4 — Core Features      | ⏳      | Menu filter, gallery lightbox, maps, forms |
| 5 — Performance & SEO  | ⏳      | Images, lazy load, Lighthouse audit |
| 6 — QA & Accessibility | ⏳      | Cross-browser, WCAG, keyboard nav |
| 7 — Deployment         | ⏳      | Hostinger upload, domain, SSL |
