const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.",
    price: 2999,
    stock: 50,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Smart Watch Pro",
    slug: "smart-watch-pro",
    description: "Feature-rich smartwatch with fitness tracking, heart rate monitor, GPS, and 7-day battery life. Water-resistant and compatible with iOS and Android.",
    price: 12999,
    stock: 30,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Laptop Backpack",
    slug: "laptop-backpack",
    description: "Durable laptop backpack with padded compartment for up to 15.6-inch laptops. Multiple pockets, water-resistant material, and comfortable shoulder straps.",
    price: 2499,
    stock: 75,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Wireless Mouse",
    slug: "wireless-mouse",
    description: "Ergonomic wireless mouse with precision tracking, long battery life, and silent clicks. Perfect for office and gaming use.",
    price: 899,
    stock: 100,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description: "RGB backlit mechanical keyboard with Cherry MX switches. Perfect for typing and gaming with customizable lighting effects.",
    price: 4999,
    stock: 40,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33cab9ef?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "USB-C Hub",
    slug: "usb-c-hub",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery. Compatible with MacBook, iPad, and Windows laptops.",
    price: 1999,
    stock: 60,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Standing Desk Converter",
    slug: "standing-desk-converter",
    description: "Adjustable standing desk converter that fits on any desk. Ergonomic design helps improve posture and productivity. Easy to assemble.",
    price: 8999,
    stock: 25,
    category: "Furniture",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Desk Lamp with USB Charging",
    slug: "desk-lamp-usb-charging",
    description: "Modern LED desk lamp with adjustable brightness, USB charging port, and touch control. Perfect for home office or study room.",
    price: 1499,
    stock: 80,
    category: "Furniture",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Wireless Charging Pad",
    slug: "wireless-charging-pad",
    description: "Fast wireless charging pad compatible with iPhone, Samsung, and other Qi-enabled devices. Sleek design with LED indicator.",
    price: 1299,
    stock: 90,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Laptop Stand",
    slug: "laptop-stand",
    description: "Aluminum laptop stand with adjustable height and angle. Improves ergonomics and helps with laptop cooling. Fits laptops up to 17 inches.",
    price: 1799,
    stock: 55,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Noise Cancelling Earbuds",
    slug: "noise-cancelling-earbuds",
    description: "True wireless earbuds with active noise cancellation, 24-hour battery life, and premium sound quality. Perfect for commuting and workouts.",
    price: 3999,
    stock: 45,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Webcam HD 1080p",
    slug: "webcam-hd-1080p",
    description: "Full HD 1080p webcam with auto-focus, built-in microphone, and privacy shutter. Perfect for video calls, streaming, and online meetings.",
    price: 3499,
    stock: 35,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1587825143138-044a38840264?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Monitor Stand with Storage",
    slug: "monitor-stand-storage",
    description: "Dual monitor stand with built-in storage compartments. Adjustable height and tilt. Helps organize your workspace efficiently.",
    price: 4499,
    stock: 20,
    category: "Furniture",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Cable Management Box",
    slug: "cable-management-box",
    description: "Organize and hide cables with this sleek cable management box. Fits power strips and multiple cables. Keeps your desk clean and tidy.",
    price: 799,
    stock: 120,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=800&fit=crop"
    ],
    isActive: true
  },
  {
    name: "Ergonomic Office Chair",
    slug: "ergonomic-office-chair",
    description: "Comfortable ergonomic office chair with lumbar support, adjustable height, and 360-degree swivel. Perfect for long work sessions.",
    price: 12999,
    stock: 15,
    category: "Furniture",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541558869149-1b1b0b8b0b8b?w=800&h=800&fit=crop"
    ],
    isActive: true
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Successfully added ${insertedProducts.length} products!`);

    // Display summary
    console.log('\n📦 Products added:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ₹${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

// Run the seed function
seedProducts();

