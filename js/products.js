// ============================================================
// PRODUCT CATALOG — placeholder data. Replace with your real
// products, prices and images. Each product is one object below.
// image: put files in the /images folder and reference the filename.
// ============================================================
const CATEGORIES = [
  { id: "sparklers", name: "Sparklers", icon: "✨" },
  { id: "flowerpots", name: "Flower Pots", icon: "🎇" },
  { id: "chakkers", name: "Chakkers (Ground Spinners)", icon: "🌀" },
  { id: "fountains", name: "Fountains", icon: "⛲" },
  { id: "rockets", name: "Rockets", icon: "🚀" },
  { id: "soundcrackers", name: "Sound Crackers", icon: "💥" },
  { id: "giftboxes", name: "Gift Boxes / Combos", icon: "🎁" },
  { id: "kids", name: "Kids Special", icon: "🧒" },
];

// Sparklers, Fountains and Sound Crackers rates below are taken from
// bigfestival.in's live listing (checked 2026-09-20) as a market-rate
// reference. Chakkers/Rockets/Gift boxes/Kids items are still estimates —
// replace with your own rates when ready.
const PRODUCTS = [
  { id: "p1", category: "sparklers", name: "1.5\" Twinkling Star", unit: "10 pcs", mrp: 225, price: 33, image: "placeholder.jpg" },
  { id: "p2", category: "sparklers", name: "10cm Electric Sparklers", unit: "1 Box", mrp: 200, price: 27, image: "placeholder.jpg" },
  { id: "p3", category: "sparklers", name: "10cm Red Sparklers", unit: "1 Box", mrp: 230, price: 43, image: "placeholder.jpg" },
  { id: "p4", category: "sparklers", name: "10cm Green Sparklers", unit: "1 Box", mrp: 220, price: 34, image: "placeholder.jpg" },
  { id: "p5", category: "sparklers", name: "10cm Pencil Sparklers", unit: "10 pcs", mrp: 320, price: 62, image: "placeholder.jpg" },

  { id: "p6", category: "flowerpots", name: "Small Flower Pot", unit: "Box of 5", mrp: 150, price: 110, image: "placeholder.jpg" },
  { id: "p7", category: "flowerpots", name: "Colour Flower Pot", unit: "Box of 5", mrp: 250, price: 190, image: "placeholder.jpg" },
  { id: "p8", category: "flowerpots", name: "Musical Flower Pot", unit: "Box of 4", mrp: 320, price: 240, image: "placeholder.jpg" },

  { id: "p9", category: "chakkers", name: "Ground Chakkar (Big)", unit: "Pack of 5", mrp: 100, price: 75, image: "placeholder.jpg" },
  { id: "p10", category: "chakkers", name: "Deluxe Colour Chakkar", unit: "Pack of 5", mrp: 180, price: 135, image: "placeholder.jpg" },

  { id: "p11", category: "fountains", name: "Kerala Coconut - 3 Step", unit: "3 pcs", mrp: 1600, price: 503, image: "placeholder.jpg" },
  { id: "p12", category: "fountains", name: "Mega Power Peacock", unit: "1 unit", mrp: 2000, price: 566, image: "placeholder.jpg" },

  { id: "p13", category: "rockets", name: "7 Shot Rocket", unit: "Pack of 1", mrp: 180, price: 140, image: "placeholder.jpg" },
  { id: "p14", category: "rockets", name: "Colour Smoke Rocket", unit: "Pack of 5", mrp: 250, price: 190, image: "placeholder.jpg" },

  { id: "p15", category: "soundcrackers", name: "12 Shots - Star", unit: "1 Box", mrp: 778, price: 354, image: "placeholder.jpg" },
  { id: "p16", category: "soundcrackers", name: "12 Shots - Fun Blast", unit: "1 Box", mrp: 778, price: 354, image: "placeholder.jpg" },
  { id: "p17", category: "soundcrackers", name: "Levis - 3\" Aerial Shots", unit: "1 unit", mrp: 300, price: 62, image: "placeholder.jpg" },

  { id: "p18", category: "giftboxes", name: "Family Combo Pack", unit: "1 Box (25 items)", mrp: 2500, price: 1899, image: "placeholder.jpg" },
  { id: "p19", category: "giftboxes", name: "Premium Gift Box", unit: "1 Box (40 items)", mrp: 4500, price: 3499, image: "placeholder.jpg" },

  { id: "p20", category: "kids", name: "Kids Fun Combo", unit: "1 Box (15 items)", mrp: 600, price: 450, image: "placeholder.jpg" },
  { id: "p21", category: "kids", name: "Snake Tablets", unit: "Box of 10", mrp: 40, price: 30, image: "placeholder.jpg" },
];
