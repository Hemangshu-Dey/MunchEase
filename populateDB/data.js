const products = [
  {
    name: "Organic Almond Butter 500g",
    description:
      "Rich and creamy organic almond butter made from premium quality almonds. Ideal for spreading, baking, or adding to smoothies. No added sugar or preservatives.",
    category: "Groceries",
    price: 15.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 120,
  },
  {
    name: "Quinoa 1kg Pack",
    description:
      "High-quality, protein-rich quinoa, perfect for salads, soups, and as a rice substitute. Gluten-free and non-GMO.",
    category: "Groceries",
    price: 8.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 200,
  },
  {
    name: "Chia Seeds 500g",
    description:
      "Organic chia seeds, packed with fiber, protein, and omega-3 fatty acids. Perfect for adding to smoothies, yogurt, or baking.",
    category: "Groceries",
    price: 6.49,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 150,
  },
  {
    name: "Dark Chocolate with Sea Salt 100g",
    description:
      "Rich dark chocolate infused with a hint of sea salt. Made with 70% cocoa and natural ingredients.",
    category: "Snacks",
    price: 3.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 75,
  },
  {
    name: "Honey Roasted Cashews 250g",
    description:
      "Premium cashews roasted to perfection and glazed with natural honey. A delicious and healthy snack option.",
    category: "Snacks",
    price: 5.49,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 90,
  },
  {
    name: "Granola Mix 500g",
    description:
      "Delicious granola mix with oats, nuts, seeds, and dried fruits. Perfect for breakfast or a healthy snack.",
    category: "Snacks",
    price: 7.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 110,
  },
  {
    name: "Organic Green Tea 20 Bags",
    description:
      "Premium organic green tea with a smooth and refreshing taste. Packed in biodegradable tea bags.",
    category: "Beverages",
    price: 4.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 130,
  },
  {
    name: "Cold Brew Coffee Concentrate 1L",
    description:
      "Smooth and bold cold brew coffee concentrate. Just add water or milk for a refreshing iced coffee.",
    category: "Beverages",
    price: 9.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 70,
  },
  {
    name: "Matcha Green Tea Powder 100g",
    description:
      "Finely ground matcha green tea powder. Perfect for making lattes, smoothies, or traditional matcha tea.",
    category: "Beverages",
    price: 12.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 55,
  },
  {
    name: "Vegan Protein Powder 1kg",
    description:
      "Plant-based protein powder made from pea and rice protein. Ideal for post-workout shakes or adding to smoothies.",
    category: "Supplements",
    price: 29.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 60,
  },
  {
    name: "Multivitamin Gummies for Adults 60 Count",
    description:
      "Delicious multivitamin gummies packed with essential vitamins and minerals. Supports overall health and wellbeing.",
    category: "Supplements",
    price: 18.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 100,
  },
  {
    name: "Omega-3 Fish Oil Capsules 120 Count",
    description:
      "High-quality fish oil capsules rich in omega-3 fatty acids. Supports heart, brain, and joint health.",
    category: "Supplements",
    price: 24.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 80,
  },
  {
    name: "Italian Extra Virgin Olive Oil 750ml",
    description:
      "Cold-pressed extra virgin olive oil made from the finest Italian olives. Perfect for dressings, cooking, and dipping.",
    category: "Pantry",
    price: 14.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 95,
  },
  {
    name: "Balsamic Vinegar of Modena 500ml",
    description:
      "Rich and tangy balsamic vinegar made in Modena, Italy. Perfect for salads, marinades, and glazes.",
    category: "Pantry",
    price: 10.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 85,
  },
  {
    name: "Organic Coconut Oil 1L",
    description:
      "Cold-pressed organic coconut oil, ideal for cooking, baking, and skincare. Unrefined and non-GMO.",
    category: "Pantry",
    price: 13.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 115,
  },
  {
    name: "Gluten-Free Pancake Mix 500g",
    description:
      "Delicious and fluffy pancake mix made without gluten. Easy to prepare and perfect for breakfast or brunch.",
    category: "Pantry",
    price: 7.49,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 140,
  },
  {
    name: "Raw Honey 500g",
    description:
      "Pure raw honey harvested from organic hives. Rich in flavor and packed with natural nutrients.",
    category: "Pantry",
    price: 11.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 125,
  },
  {
    name: "Sourdough Bread 800g",
    description:
      "Artisanal sourdough bread made with natural ingredients and a long fermentation process. Perfect for sandwiches and toasting.",
    category: "Bakery",
    price: 5.99,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 65,
  },
  {
    name: "Gluten-Free Banana Bread 600g",
    description:
      "Moist and delicious banana bread made without gluten. Perfect for breakfast or as a snack with coffee.",
    category: "Bakery",
    price: 7.49,
    imageUrl: [
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/nkkjkta63uiazppzkmjf.jpg",
      "http://res.cloudinary.com/udemy-courses/image/upload/v1698577488/shopit/demo/oc2dvvkxyxukc13y9pjv.jpg",
    ],
    stock: 50,
  },
];

export default products;
