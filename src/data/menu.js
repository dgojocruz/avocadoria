// ═══════════════════════════════════════════════════════════════════════════════
// MENU DATA — Admin adds/edits products here
// ═══════════════════════════════════════════════════════════════════════════════
//
// HOW TO ADD A NEW PRODUCT:
// 1. Drop the image in /public/menu/<category-id>/filename.webp
// 2. Copy any product object below and paste it in the right category
// 3. Fill in name, description, image path, tags
// 4. Save — the menu updates automatically
//
// HOW TO ADD A NEW CATEGORY:
// 1. Add a new object to the CATEGORIES array below
// 2. Give it a unique id (slug, no spaces)
// 3. Add products to its items array
// ═══════════════════════════════════════════════════════════════════════════════

export const CATEGORIES = [
  // ── 1. BEST SELLERS ────────────────────────────────────────────────────────
  {
    id:       'best-sellers',
    name:     'Best Sellers',
    emoji:    '⭐',
    tagline:  'Our most-loved avocado creations — tried and tested by thousands.',
    cover:    '/menu/Best Sellers/cover-best-sellers.png',
    featured: true,
    items: [
      {
        id:    'bs-lover',
        name:  'Avo Lover',
        desc:  'Layers of fresh avocado cream, tapioca pearls, almond crumble & chia seeds. Our original signature cup.',
        image: '/menu/Best Sellers/bs-lover.webp',
        tags:  ['Signature', 'Fan Fave'],
        new:   false,
      },
      {
        id:    'bs-naked-light-ice-cream',
        name:  'Naked Light Ice Cream',
        desc:  'Pure avocado soft-serve — silky smooth, naturally sweet and guilt-free in every bite.',
        image: '/menu/Best Sellers/bs-naked-light-ice-cream.webp',
        tags:  ['Light', 'Fan Fave'],
        new:   false,
      },
      {
        id:    'bs-avo-shake',
        name:  'Avo Shake',
        desc:  'Thick, creamy avocado shake topped with almond crumble and chia seeds — refreshingly indulgent.',
        image: '/menu/Best Sellers/bs-avo-shake.webp',
        tags:  ['Fan Fave'],
        new:   false,
      },
      {
        id:    'bs-guyabano-shake',
        name:  'Guyabano Shake',
        desc:  'Creamy avocado blended with tropical guyabano — refreshing and naturally sweet.',
        image: '/menu/Best Sellers/bs-guyabano-shake.webp',
        tags:  ['Tropical'],
        new:   false,
      },
      {
        id:    'bs-jackfruit-shake',
        name:  'Jackfruit Shake',
        desc:  'Avocado shake loaded with fresh jackfruit, almond crumble and chia seeds on top.',
        image: '/menu/Best Sellers/bs-jackfruit-shake.webp',
        tags:  ['Tropical'],
        new:   false,
      },
      {
        id:    'bs-mango-shake',
        name:  'Mango Shake',
        desc:  'Creamy avocado blended with sweet Philippine mangoes, topped with mango chunks.',
        image: '/menu/Best Sellers/bs-mango-shake.webp',
        tags:  ['Tropical'],
        new:   false,
      },
      {
        id:    'bs-matcha-senyorita',
        name:  'Matcha Señorita',
        desc:  'Avocado ice cream bar coated in matcha and crunchy pistachio — smooth, earthy and irresistible.',
        image: '/menu/Best Sellers/bs-matcha-senyorita.webp',
        tags:  ['Ice Bar', 'New'],
        new:   true,
      },
      {
        id:    'bs-choco-senyorita',
        name:  'Choco Señorita',
        desc:  'Avocado ice cream bar coated in milk chocolate and toasted almond bits — the classic crowd-pleaser.',
        image: '/menu/Best Sellers/bs-choco-senyorita.webp',
        tags:  ['Ice Bar'],
        new:   false,
      },
      {
        id:    'bs-strawberry-senyorita',
        name:  'Strawberry Señorita',
        desc:  'Avocado ice cream bar dipped in strawberry coating with fruity bits — sweet and refreshing.',
        image: '/menu/Best Sellers/bs-strawberry-senyorita.webp',
        tags:  ['Ice Bar', 'New'],
        new:   true,
      },
      {
        id:    'bs-big-tin-sansrival',
        name:  'Avocado Sansrival Cake (Big Tin)',
        desc:  'Frozen cake with avocado ice cream filling & pistachio topping. Net wt: 330g.',
        image: '/menu/Best Sellers/bs-big-tin-sansrival.webp',
        tags:  ['Frozen', 'Big Tin'],
        new:   false,
      },
      {
        id:    'bs-small-tin-sansrival',
        name:  'Avocado Sansrival Cake (Small Tin)',
        desc:  'Frozen avocado sansrival cake with pistachio topping. Perfect individual size. Net wt: 185g.',
        image: '/menu/Best Sellers/bs-small-tin-sansrival.webp',
        tags:  ['Frozen', 'Small Tin'],
        new:   false,
      },
      // ↑ ADD MORE BEST SELLERS HERE
    ],
  },

  // ── 2. AVOCADO SHAKES ──────────────────────────────────────────────────────
  {
    id:       'shakes',
    name:     'Avocado Shakes',
    emoji:    '🥤',
    tagline:  'Thick, creamy, and packed with real avocado — the perfect refreshment.',
    cover:    '/menu/Avocado Shakes/Avo_Lover.png',
    featured: false,
    items: [
      {
        id:    'avo-shake',
        name:  'Avo Shake',
        desc:  'Our signature thick and creamy avocado shake topped with almond crumble and chia seeds.',
        image: '/menu/Avocado Shakes/avo-shake.webp',
        tags:  ['Signature', 'Fan Fave'],
        new:   false,
      },
      {
        id:    'coconut-keto-shake',
        name:  'Coconut Keto Shake',
        desc:  'A guilt-free blend of avocado and coconut — low-carb, keto-friendly and delicious.',
        image: '/menu/Avocado Shakes/coconut-keto-shake.webp',
        tags:  ['Keto'],
        new:   false,
      },
      {
        id:    'dark-choco-shake',
        name:  'Dark Choco Shake',
        desc:  'Avocado meets rich dark chocolate swirls, topped with almonds and chocolate chunks.',
        image: '/menu/Avocado Shakes/dark-choco-shake.webp',
        tags:  ['Indulgent'],
        new:   false,
      },
      {
        id:    'guyabano-shake',
        name:  'Guyabano Shake',
        desc:  'Creamy avocado blended with tropical guyabano — refreshing and naturally sweet.',
        image: '/menu/Avocado Shakes/guyabano-shake.webp',
        tags:  ['Tropical'],
        new:   false,
      },
      {
        id:    'jackfruit-shake',
        name:  'Jackfruit Shake',
        desc:  'Avocado shake loaded with fresh jackfruit, almond crumble and chia seeds on top.',
        image: '/menu/Avocado Shakes/jackfruit-shake.webp',
        tags:  ['Tropical'],
        new:   false,
      },
      {
        id:    'keto-shake',
        name:  'Keto Shake',
        desc:  'Pure avocado keto shake — low-carb, no sugar added, topped with seeds and nuts.',
        image: '/menu/Avocado Shakes/keto-shake.webp',
        tags:  ['Keto'],
        new:   false,
      },
      {
        id:    'mango-shake',
        name:  'Mango Shake',
        desc:  'Creamy avocado blended with sweet Philippine mangoes, topped with mango chunks.',
        image: '/menu/Avocado Shakes/mango-shake.webp',
        tags:  ['Tropical'],
        new:   false,
      },
      // ↑ ADD MORE SHAKES HERE
    ],
  },

  // ── 3. AVOCADO CAKES ───────────────────────────────────────────────────────
  {
    id:       'cakes',
    name:     'Avocado Cakes',
    emoji:    '🎂',
    tagline:  'Celebrate every occasion with our indulgent avocado cakes.',
    cover:    '/menu/Avocado cakes/big-tin-cheesecake.webp', // use first product as cover
    featured: false,
    items: [
      {
        id:    'big-tin-cheesecake',
        name:  'Avocado Cheesecake (Big Tin)',
        desc:  'Rich and creamy avocado cheesecake packed with mixed nuts. Net wt: 400g.',
        image: '/menu/Avocado cakes/big-tin-cheesecake.webp',
        tags:  ['Big Tin'],
        new:   false,
      },
      {
        id:    'big-tin-praline',
        name:  'Dark Mocha Avocado Praline Cake (Big Tin)',
        desc:  'Dark mocha avocado cake with praline crumble topping. Net wt: 500g.',
        image: '/menu/Avocado cakes/big-tin-praline.webp',
        tags:  ['Big Tin'],
        new:   false,
      },
      {
        id:    'big-tin-sansrival',
        name:  'Avocado Sansrival Cake (Big Tin)',
        desc:  'Frozen cake with avocado ice cream filling & pistachio topping. Net wt: 330g.',
        image: '/menu/Avocado cakes/big-tin-sansrival.webp',
        tags:  ['Big Tin', 'Frozen'],
        new:   false,
      },
      {
        id:    'small-tin-cheesecake',
        name:  'Avocado Cheesecake (Small Tin)',
        desc:  'Individual-sized avocado cheesecake — perfect personal treat. Net wt: 240g.',
        image: '/menu/Avocado cakes/small-tin-cheesecake.webp',
        tags:  ['Small Tin'],
        new:   false,
      },
      {
        id:    'small-tin-praline',
        name:  'Dark Mocha Avocado Praline Cake (Small Tin)',
        desc:  'Personal-sized dark mocha avocado praline cake. Net wt: 300g.',
        image: '/menu/Avocado cakes/small-tin-praline.webp',
        tags:  ['Small Tin'],
        new:   false,
      },
      {
        id:    'small-tin-sansrival',
        name:  'Avocado Sansrival Cake (Small Tin)',
        desc:  'Frozen avocado sansrival cake with pistachio topping. Net wt: 185g.',
        image: '/menu/Avocado cakes/small-tin-sansrival.webp',
        tags:  ['Small Tin', 'Frozen'],
        new:   false,
      },
      // ↑ ADD MORE CAKES HERE
    ],
  },

  // ── 4. COFFEE ──────────────────────────────────────────────────────────────
  {
    id:       'coffee',
    name:     'Coffee',
    emoji:    '☕',
    tagline:  'Premium coffee blends to pair perfectly with your avocado treat.',
    cover:    '/menu/coffee/HOT_COFFEE.png',
    featured: false,
    items: [
      {
        id:    'avo-latte',
        name:  'Avo Latte',
        desc:  'Espresso meets creamy avocado milk — a unique and satisfying combination.',
        image: '/menu/coffee/avo-latte.webp',
        tags:  ['Signature'],
        new:   true,
      },
      {
        id:    'americano',
        name:  'Americano',
        desc:  'Classic espresso with hot water — bold, clean and refreshing.',
        image: '/menu/coffee/americano.webp',
        tags:  [],
        new:   false,
      },
      {
        id:    'hot-coffee',
        name:  'Hot Coffee',
        desc:  'Freshly brewed hot coffee served in the iconic Avocadoria cup — warm, rich and satisfying.',
        image: '/menu/coffee/HOT_COFFEE.png',
        tags:  [],
        new:   false,
      },
      {
        id:    'iced-coffee',
        name:  'Iced Coffee',
        desc:  'Chilled coffee over ice served in the iconic Avocadoria cup — cool, bold and refreshing.',
        image: '/menu/coffee/ICE_COFFEE.png',
        tags:  [],
        new:   false,
      },
      // ↑ ADD MORE COFFEE HERE
    ],
  },

  // ── 5. SOFT SERVE ──────────────────────────────────────────────────────────
  {
    id:       'soft-serve',
    name:     'Soft Serve Menu',
    emoji:    '🍦',
    tagline:  'Velvety avocado soft-serve — pure, light and irresistibly smooth.',
    cover:    '/menu/Soft Serve Menu/naked-light-ice-cream.webp',
    featured: false,
    items: [
      {
        id:    'lover',
        name:  'Avo Lover',
        desc:  'Layers of fresh avocado cream, tapioca pearls, almond crumble & chia seeds. Our original signature cup.',
        image: '/menu/Soft Serve Menu/lover.webp',
        tags:  ['Signature', 'Fan Fave'],
        new:   false,
      },
      {
        id:    'biscoff-lover',
        name:  'Biscoff Lover',
        desc:  'Avocado cream meets caramel Biscoff drizzle, toasted almonds & our signature crumble base.',
        image: '/menu/Soft Serve Menu/biscoff-lover.webp',
        tags:  ['New', 'Trending'],
        new:   true,
      },
      {
        id:    'naked-light-ice-cream',
        name:  'Naked Light Ice Cream',
        desc:  'Pure avocado soft-serve — silky smooth, naturally sweet and guilt-free in every bite.',
        image: '/menu/Soft Serve Menu/naked-light-ice-cream.webp',
        tags:  ['Light', 'Fan Fave'],
        new:   false,
      },
      {
        id:    'keto',
        name:  'Avo Keto',
        desc:  'Avocado soft-serve with whole almonds — low-carb, keto-friendly and satisfying.',
        image: '/menu/Soft Serve Menu/keto.webp',
        tags:  ['Keto', 'Light'],
        new:   false,
      },
      {
        id:    'pistachio-lover',
        name:  'Pistachio Lover',
        desc:  'Avocado cream loaded with pistachio crumble, chocolate drizzle and avocado chunks.',
        image: '/menu/Soft Serve Menu/pistachio-lover.webp',
        tags:  ['New'],
        new:   true,
      },
      // ↑ ADD MORE SOFT SERVE HERE
    ],
  },

  // ── 6. OTHERS ──────────────────────────────────────────────────────────────
  {
    id:       'others',
    name:     'Others',
    emoji:    '🥑',
    tagline:  'More avocado goodness — unique treats, snacks and seasonal specials.',
    cover:    '/menu/Others/nachos.webp',
    featured: false,
    items: [
      {
        id:    'dream',
        name:  'Avo Dream',
        desc:  'Fresh avocado half filled with silky avocado cream — a dreamy, indulgent treat served in its own shell.',
        image: '/menu/Others/dream.webp',
        tags:  ['Signature'],
        new:   false,
      },
      {
        id:    'inipit',
        name:  'Inipit',
        desc:  'Soft and fluffy Filipino sponge cake sandwich filled with rich avocado cream. A local classic reimagined.',
        image: '/menu/Others/inipit.webp',
        tags:  ['Local Fave'],
        new:   false,
      },
      {
        id:    'nachos',
        name:  'Avo Nachos',
        desc:  'Crispy nachos loaded with fresh guacamole, cheese sauce, salsa and toppings — the ultimate avocado snack.',
        image: '/menu/Others/nachos.webp',
        tags:  ['Snack'],
        new:   false,
      },
      {
        id:    'matcha-senyorita',
        name:  'Matcha Señorita',
        desc:  'Avocado ice cream bar coated in matcha and crunchy pistachio — smooth, earthy and irresistible.',
        image: '/menu/Others/matcha-senyorita.webp',
        tags:  ['Ice Bar', 'New'],
        new:   true,
      },
      {
        id:    'strawberry-senyorita',
        name:  'Strawberry Señorita',
        desc:  'Avocado ice cream bar dipped in strawberry coating and topped with fruity bits — sweet and refreshing.',
        image: '/menu/Others/strawberry-senyorita.webp',
        tags:  ['Ice Bar', 'New'],
        new:   true,
      },
      {
        id:    'white-senyorita',
        name:  'White Señorita',
        desc:  'Avocado ice cream bar coated in white chocolate and almonds — creamy, delicate and perfectly sweet.',
        image: '/menu/Others/white-senyorita.webp',
        tags:  ['Ice Bar'],
        new:   false,
      },
      {
        id:    'biscoff-senyorita',
        name:  'Biscoff Señorita',
        desc:  'Avocado ice cream bar dipped in caramel Biscoff coating — rich, buttery and absolutely addicting.',
        image: '/menu/Others/biscoff-senyorita.webp',
        tags:  ['Ice Bar', 'Trending'],
        new:   true,
      },
      {
        id:    'choco-senyorita',
        name:  'Choco Señorita',
        desc:  'Avocado ice cream bar coated in milk chocolate and toasted almond bits — the classic crowd-pleaser.',
        image: '/menu/Others/choco-senyorita.webp',
        tags:  ['Ice Bar'],
        new:   false,
      },
      {
        id:    'dark-senyorita',
        name:  'Dark Señorita',
        desc:  'Avocado ice cream bar dipped in rich dark chocolate and almond crumble — bold, bittersweet perfection.',
        image: '/menu/Others/dark-senyorita.webp',
        tags:  ['Ice Bar', 'Indulgent'],
        new:   false,
      },
      // ↑ ADD MORE OTHERS HERE
    ],
  },
]

// ── TAG COLORS — used for badges on product cards ─────────────────────────────
// Add new tags here as needed
export const TAG_COLORS = {
  'Bestseller': { bg: '#b6c548', text: '#fff'       },
  'Fan Fave':   { bg: '#b6c548', text: '#fff'       },
  'Signature':  { bg: '#3a6b35', text: '#fff'       },
  'New':        { bg: '#EF7ECB', text: '#fff'       },
  'Trending':   { bg: '#EF7ECB', text: '#fff'       },
  'Light':      { bg: '#8aaa1a', text: '#fff'       },
  'Keto':       { bg: '#3a6b35', text: '#fff'       },
  'Add-on':     { bg: '#8A5F3C', text: '#fff'       },
  'Classic':    { bg: '#8A5F3C', text: '#fff'       },
  'Made to Order': { bg: '#d4a017', text: '#fff'    },
  'Indulgent':  { bg: '#7b5c3a', text: '#fff'       },
  'Tropical':   { bg: '#e8a020', text: '#fff'       },
  'Ice Bar':    { bg: '#5ba8d4', text: '#fff'       },
  'Local Fave': { bg: '#b6c548', text: '#fff'       },
  'Snack':      { bg: '#e8a020', text: '#fff'       },
  'Frozen':     { bg: '#5ba8d4', text: '#fff'       },
  'Default':    { bg: 'rgba(182,197,72,0.15)', text: '#3a6b35' },
}
