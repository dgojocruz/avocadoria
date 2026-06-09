// ═══════════════════════════════════════════════════════════════════════════════
// POSTS DATA STORE — Admin adds new posts here
// ═══════════════════════════════════════════════════════════════════════════════
//
// HOW TO ADD A NEW POST:
// 1. Copy any object below and paste it at the TOP of the correct array
// 2. Give it a unique id (e.g. 'news-005')
// 3. Fill in title, date, excerpt, content, image (optional)
// 4. Save the file — the site updates automatically
//
// DATE FORMAT: 'YYYY-MM-DD'
// IMAGE:       put the file in /public/posts/ then use '/posts/filename.jpg'
//              set to null if no image
// ═══════════════════════════════════════════════════════════════════════════════

// ── OUR STORY ─────────────────────────────────────────────────────────────────
// Single page — just edit the content blocks below
export const OUR_STORY = {
  headline:  'Happiness in Avocado',
  subheading: 'How a simple love for avocado became the Philippines\' No. 1 avocado dessert brand.',
  founded:   '2017',
  sections: [
    {
      id:      'beginning',
      title:   'How it all began',
      content: 'Avocadoria started in 2017 with one simple belief — that avocado deserved its own spotlight. What started as a small stall in a local bazaar quickly grew into a movement, as Filipinos fell in love with rich, creamy, guilt-free avocado desserts made from real fruit.',
      image:   null,
    },
    {
      id:      'mission',
      title:   'Our mission',
      content: 'We are on a mission to bring happiness through avocado — one cup at a time. Every product we serve is crafted with real avocado, no artificial flavors, and a whole lot of love. We believe indulgence and health can coexist.',
      image:   null,
    },
    {
      id:      'farmers',
      title:   'Supporting local farmers',
      content: 'We proudly partner with local avocado farmers across the Philippines. Every cup you enjoy directly supports Filipino farming communities and helps grow a sustainable, local supply chain.',
      image:   null,
    },
  ],
}

// ── NEWS & UPDATES ────────────────────────────────────────────────────────────
// Add newest posts at the TOP of this array
export const NEWS_POSTS = [
  {
    id:       'news-008',
    title:    'NEW: Knafeh Pistachio & Biscoff Series',
    date:     '2025-06-01',
    category: 'New Product',
    excerpt:  'The ultimate fusion — rich pistachio knafeh meets creamy avocado and Biscoff. A limited edition you cannot miss.',
    content:  'The ultimate fusion — rich pistachio knafeh meets creamy avocado and Biscoff. A limited edition you cannot miss.',
    image:    '/products/Knafeh_Pistachio_and_Biscoff.png',
    featured: true,
    tag:      'Limited Edition',
  },
  {
    id:       'news-007',
    title:    'Avocado Shakes — Now in 4 Variants!',
    date:     '2025-05-20',
    category: 'New Product',
    excerpt:  'Our beloved avocado shakes now come in 4 exciting variants. Real avocado, real happiness in every sip.',
    content:  'Our beloved avocado shakes now come in 4 exciting variants. Real avocado, real happiness in every sip.',
    image:    '/products/Shakes.png',
    featured: false,
    tag:      'New Variants',
  },
  {
    id:       'news-006',
    title:    'Avo Lover — Our Best Seller is Back & Better',
    date:     '2025-05-10',
    category: 'Featured',
    excerpt:  'The Avo Lover that started it all — now elevated with premium toppings and a refreshed recipe.',
    content:  'The Avo Lover that started it all — now elevated with premium toppings and a refreshed recipe.',
    image:    '/products/Avo_Lover.png',
    featured: false,
    tag:      'Best Seller',
  },
  {
    id:       'news-005',
    title:    'Introducing the Keto Series',
    date:     '2025-04-25',
    category: 'New Product',
    excerpt:  'Guilt-free indulgence is here. Our new Keto Series lets you enjoy avocado desserts that fit your lifestyle.',
    content:  'Guilt-free indulgence is here. Our new Keto Series lets you enjoy avocado desserts that fit your lifestyle.',
    image:    '/products/Keto_Series.png',
    featured: false,
    tag:      'Health Pick',
  },
  {
    id:       'news-004',
    title:    'Naked & Inipit — A Playful New Pairing',
    date:     '2025-04-15',
    category: 'New Product',
    excerpt:  'Avocadoria naked ice cream meets the classic Filipino inipit. Sweet, creamy, and uniquely ours.',
    content:  'Avocadoria naked ice cream meets the classic Filipino inipit. Sweet, creamy, and uniquely ours.',
    image:    '/products/Naked___Inipit.png',
    featured: false,
    tag:      'New',
  },
  {
    id:       'news-003',
    title:    'Avocado Senyorita — A Tropical Twist',
    date:     '2025-04-05',
    category: 'New Product',
    excerpt:  'Meet the Avocado Senyorita — a tropical fusion of avocado, pistachio, and Biscoff in one irresistible cup.',
    content:  'Meet the Avocado Senyorita — a tropical fusion of avocado, pistachio, and Biscoff in one irresistible cup.',
    image:    '/products/Avocado_Senyorita.png',
    featured: false,
    tag:      'New',
  },
  {
    id:       'news-002',
    title:    'Dark Choco Avocado Shake',
    date:     '2025-03-20',
    category: 'New Product',
    excerpt:  'Rich dark chocolate meets real avocado in this indulgent shake. For the chocolate lover in you.',
    content:  'Rich dark chocolate meets real avocado in this indulgent shake. For the chocolate lover in you.',
    image:    '/products/Dark_choco_Shake.png',
    featured: false,
    tag:      'Fan Fave',
  },
  {
    id:       'news-001',
    title:    'Avocado Biscoff — The Collab You Asked For',
    date:     '2025-03-10',
    category: 'New Product',
    excerpt:  'Creamy avocado meets the legendary Biscoff. Layers of flavor that will keep you coming back.',
    content:  'Creamy avocado meets the legendary Biscoff. Layers of flavor that will keep you coming back.',
    image:    '/products/Avocado_Biscoff.png',
    featured: false,
    tag:      'New',
  },
  // ↑ ADD NEW NEWS POSTS ABOVE THIS LINE
]

// ── RECOGNITIONS ─────────────────────────────────────────────────────────────
// Add newest recognitions at the TOP of this array
export const RECOGNITIONS = [
  {
    id:       'award-001',
    title:    'Best Dessert Brand — Food & Beverage PH Awards 2024',
    date:     '2024-11-15',
    category: 'Award',
    issuer:   'Food & Beverage Philippines',
    excerpt:  'Avocadoria was recognized as the Best Dessert Brand at the 2024 Food & Beverage PH Awards.',
    content:  'We are incredibly honored to receive the Best Dessert Brand award at the 2024 Food & Beverage PH Awards. This recognition is a testament to the hard work of our entire team and the love of our customers.',
    image:    null,
    featured: true,
  },
  {
    id:       'award-002',
    title:    'Top 10 Filipino Food Brands to Watch — 2024',
    date:     '2024-08-01',
    category: 'Feature',
    issuer:   'BusinessWorld Philippines',
    excerpt:  'Avocadoria was named one of the Top 10 Filipino Food Brands to Watch in 2024 by BusinessWorld.',
    content:  'BusinessWorld Philippines recognized Avocadoria as one of the Top 10 Filipino Food Brands to Watch in 2024, citing our rapid growth, product innovation, and commitment to local sourcing.',
    image:    null,
    featured: false,
  },
  // ↑ ADD NEW RECOGNITIONS ABOVE THIS LINE
]

// ── AVO CARES ────────────────────────────────────────────────────────────────
// Add newest initiatives at the TOP of this array
export const AVO_CARES_POSTS = [
  {
    id:       'cares-001',
    title:    'Planting 1,000 Avocado Trees with Local Farmers',
    date:     '2025-03-15',
    category: 'Environment',
    excerpt:  'As part of our commitment to sustainability, Avocadoria partnered with local farmers to plant 1,000 avocado trees across Benguet.',
    content:  'As part of our commitment to sustainability, Avocadoria partnered with local farmers to plant 1,000 avocado trees across Benguet province. This initiative supports local livelihoods and helps ensure a sustainable supply of fresh avocados for generations to come.',
    image:    null,
    featured: true,
  },
  {
    id:       'cares-002',
    title:    'Feeding Program — Avocadoria Gives Back',
    date:     '2025-01-20',
    category: 'Community',
    excerpt:  'Avocadoria organized a feeding program for 200 children in partnership with local barangay councils.',
    content:  'Avocadoria organized a feeding program for 200 children in partnership with local barangay councils in Quezon City. Happiness in avocado means sharing it with those who need it most.',
    image:    null,
    featured: false,
  },
  // ↑ ADD NEW AVO CARES POSTS ABOVE THIS LINE
]
