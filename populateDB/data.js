const products = [
  {
    name: "Fresh Organic Apples 1kg",
    description:
      "Crisp and juicy organic apples, perfect for snacking or baking. Grown without pesticides.",
    category: "Fruits",
    price: 409,
    imageUrl: [
      "https://images.unsplash.com/photo-1598170845055-806a9e9f3f72?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 100,
  },
  {
    name: "Fresh Bananas 1kg",
    description:
      "High-quality bananas, perfect for smoothies, baking, or snacking. Naturally ripened.",
    category: "Fruits",
    price: 245,
    imageUrl: [
      "https://images.unsplash.com/photo-1676495706102-ca1be8fdf676?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 150,
  },
  {
    name: "Fresh Blueberries 250g",
    description:
      "Sweet and tangy blueberries, perfect for baking, salads, or snacking. Packed with antioxidants.",
    category: "Fruits",
    price: 491,
    imageUrl: [
      "https://images.unsplash.com/photo-1532509463463-e97ece6d703f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 80,
  },
  {
    name: "Organic Carrots 1kg",
    description:
      "Fresh and crunchy organic carrots. Great for salads, cooking, or as a healthy snack.",
    category: "Vegetables",
    price: 327,
    imageUrl: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 120,
  },
  {
    name: "Fresh Broccoli 500g",
    description:
      "High-quality, fresh broccoli. Perfect for steaming, roasting, or adding to your favorite dishes.",
    category: "Vegetables",
    price: 245,
    imageUrl: [
      "https://images.unsplash.com/photo-1676091876329-f8c1166bf368?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 90,
  },
  {
    name: "Organic Spinach 500g",
    description:
      "Fresh organic spinach leaves. Rich in iron and perfect for salads, smoothies, or cooking.",
    category: "Vegetables",
    price: 368,
    imageUrl: [
      "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 75,
  },
  {
    name: "Raw Almonds 500g",
    description:
      "High-quality raw almonds, perfect for snacking or adding to dishes. No added salt or preservatives.",
    category: "Nuts",
    price: 819,
    imageUrl: [
      "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 100,
  },
  {
    name: "Roasted Cashews 250g",
    description:
      "Delicious roasted cashews with a hint of sea salt. Perfect for snacking or adding to dishes.",
    category: "Nuts",
    price: 655,
    imageUrl: [
      "https://images.unsplash.com/photo-1594900689460-fdad3599342c?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 90,
  },
  {
    name: "Pistachios 500g",
    description:
      "High-quality pistachios, lightly salted. Ideal for snacking or baking.",
    category: "Nuts",
    price: 1065,
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1726072356920-a39aaa49ce89?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 60,
  },
  {
    name: "Dark Chocolate with Almonds 100g",
    description:
      "Rich dark chocolate with crunchy almonds. Made with 70% cocoa and natural ingredients.",
    category: "Snacks",
    price: 368,
    imageUrl: [
      "https://images.unsplash.com/photo-1617054516186-ee56d15c9f75?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 80,
  },
  {
    name: "Sea Salt Popcorn 100g",
    description:
      "Air-popped popcorn with a touch of sea salt. A healthy and delicious snack option.",
    category: "Snacks",
    price: 245,
    imageUrl: [
      "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 1,
  },
  {
    name: "Organic Granola Bars 6 Pack",
    description:
      "Delicious and healthy granola bars made with organic ingredients. Perfect for on-the-go snacking.",
    category: "Snacks",
    price: 450,
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1726490291795-bbd17809623d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 100,
  },
  {
    name: "Sourdough Bread 500g",
    description:
      "Artisan sourdough bread with a crispy crust and soft interior. Made with natural ingredients.",
    category: "Bakery",
    price: 327,
    imageUrl: [
      "https://images.unsplash.com/photo-1675092637098-363c551547c0?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 60,
  },
  {
    name: "Gluten-Free Banana Bread 400g",
    description:
      "Delicious gluten-free banana bread, made with ripe bananas and natural sweeteners.",
    category: "Bakery",
    price: 368,
    imageUrl: [
      "https://images.unsplash.com/photo-1497534547324-0ebb3f052e88?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 50,
  },
  {
    name: "Whole Wheat Baguette 400g",
    description:
      "Freshly baked whole wheat baguette. Perfect for sandwiches or as a side to soups and salads.",
    category: "Bakery",
    price: 204,
    imageUrl: [
      "https://images.unsplash.com/photo-1691862329594-4eb279f01bc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 70,
  },
  {
    name: "Organic Quinoa 500g",
    description:
      "High-quality organic quinoa. Rich in protein and perfect for salads, bowls, or as a side dish.",
    category: "Organic",
    price: 573,
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1671130295828-efd9019faee0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8UXVpbm9hfGVufDB8fDB8fHww",
    ],
    stock: 80,
  },
  {
    name: "Organic Chia Seeds 300g",
    description:
      "Nutrient-dense chia seeds. Perfect for adding to smoothies, yogurt, or baking.",
    category: "Organic",
    price: 409,
    imageUrl: [
      "https://images.unsplash.com/photo-1642497393633-a19e9231fb92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 0,
  },
  {
    name: "Organic Brown Rice 1kg",
    description:
      "High-quality organic brown rice. Rich in fiber and ideal for healthy meals.",
    category: "Organic",
    price: 327,
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1671130295823-78f170465794?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 100,
  },
  {
    name: "Fresh Salmon Fillets 500g",
    description:
      "Premium quality salmon fillets, rich in omega-3 fatty acids. Ideal for grilling or baking.",
    category: "Seafood",
    price: 1311,
    imageUrl: [
      "https://images.unsplash.com/photo-1499125562588-29fb8a56b5d5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 50,
  },
  {
    name: "Jumbo Shrimp 500g",
    description:
      "Delicious jumbo shrimp, perfect for grilling, sautéing, or adding to your favorite seafood dishes.",
    category: "Seafood",
    price: 1065,
    imageUrl: [
      "https://images.unsplash.com/photo-1548587468-971ebe4c8c3b?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 60,
  },
  {
    name: "Fresh Oysters 12 Pack",
    description:
      "Freshly harvested oysters. Ideal for enjoying raw or cooked with your favorite seasonings.",
    category: "Seafood",
    price: 1639,
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1670742337957-fcd72066e4de?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 40,
  },
  {
    name: "Frozen Mixed Berries 1kg",
    description:
      "A mix of frozen strawberries, blueberries, and raspberries. Perfect for smoothies or desserts.",
    category: "Frozen",
    price: 737,
    imageUrl: [
      "https://images.unsplash.com/photo-1613082410785-22292e8426e7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 80,
  },
  {
    name: "Frozen Peas 1kg",
    description:
      "Sweet and tender frozen peas. Ideal for cooking, soups, and side dishes.",
    category: "Frozen",
    price: 286,
    imageUrl: [
      "https://images.unsplash.com/photo-1668548205372-1becd11b5641?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 100,
  },
  {
    name: "Frozen Pizza Margherita 500g",
    description:
      "Delicious frozen Margherita pizza with a crispy crust and fresh toppings.",
    category: "Frozen",
    price: 573,
    imageUrl: [
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 50,
  },
  {
    name: "Organic Tomato Sauce 500ml",
    description:
      "Rich and flavorful organic tomato sauce. Perfect for pasta, pizzas, or as a base for various dishes.",
    category: "Pantry",
    price: 368,
    imageUrl: [
      "https://images.unsplash.com/photo-1598103466091-d1e35f5822c7?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 120,
  },
  {
    name: "Whole Wheat Pasta 500g",
    description:
      "High-quality whole wheat pasta. A healthy and delicious alternative to traditional pasta.",
    category: "Pantry",
    price: 245,
    imageUrl: [
      "https://plus.unsplash.com/premium_photo-1725636096457-8010ff250866?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 90,
  },
  {
    name: "Organic Peanut Butter 500g",
    description:
      "Smooth and creamy organic peanut butter. Made with roasted peanuts and a touch of sea salt.",
    category: "Pantry",
    price: 573,
    imageUrl: [
      "https://images.unsplash.com/photo-1615110250484-e8c3b151b957?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 80,
  },
  {
    name: "Organic Ketchup 500ml",
    description:
      "Delicious organic ketchup made with vine-ripened tomatoes. A perfect condiment for any meal.",
    category: "Condiments",
    price: 327,
    imageUrl: [
      "https://images.unsplash.com/photo-1569790554690-1c0877b2fc6c?q=80&w=1787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 110,
  },
  {
    name: "Spicy Mustard 250ml",
    description:
      "Bold and spicy mustard, perfect for adding a kick to sandwiches, burgers, and more.",
    category: "Condiments",
    price: 245,
    imageUrl: [
      "https://images.unsplash.com/photo-1528750717929-32abb73d3bd9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 90,
  },
  {
    name: "Balsamic Vinegar 250ml",
    description:
      "High-quality balsamic vinegar with a rich and tangy flavor. Ideal for salads and marinades.",
    category: "Condiments",
    price: 450,
    imageUrl: [
      "https://images.unsplash.com/photo-1649533689664-55c670b25124?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    stock: 0,
  },
];

export default products;
