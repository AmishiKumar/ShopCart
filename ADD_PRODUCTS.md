# How to Add Products with Images

## Quick Method: Use the Seed Script

I've created a seed script that will add 15 sample products with beautiful images to your database.

### Steps:

1. **Make sure your backend server is NOT running** (or run this in a separate terminal)

2. **Run the seed script:**
   ```powershell
   cd backend
   npm run seed
   ```

   Or directly:
   ```powershell
   cd backend
   node seedProducts.js
   ```

3. **You should see:**
   ```
   MongoDB Connected
   ✅ Successfully added 15 products!
   
   📦 Products added:
   1. Wireless Bluetooth Headphones - ₹2999
   2. Smart Watch Pro - ₹12999
   ...
   ```

4. **Refresh your frontend** and you'll see all the products with images!

## Products Included:

1. Wireless Bluetooth Headphones - ₹2,999
2. Smart Watch Pro - ₹12,999
3. Laptop Backpack - ₹2,499
4. Wireless Mouse - ₹899
5. Mechanical Keyboard - ₹4,999
6. USB-C Hub - ₹1,999
7. Standing Desk Converter - ₹8,999
8. Desk Lamp with USB Charging - ₹1,499
9. Wireless Charging Pad - ₹1,299
10. Laptop Stand - ₹1,799
11. Noise Cancelling Earbuds - ₹3,999
12. Webcam HD 1080p - ₹3,499
13. Monitor Stand with Storage - ₹4,499
14. Cable Management Box - ₹799
15. Ergonomic Office Chair - ₹12,999

All products include:
- High-quality images from Unsplash
- Detailed descriptions
- Realistic prices
- Stock quantities
- Categories

## Alternative: Add Products via API

You can also add products manually using the API:

### Using Postman or curl:

```bash
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN

{
  "name": "Product Name",
  "slug": "product-name",
  "description": "Product description",
  "price": 999,
  "stock": 50,
  "category": "Electronics",
  "images": [
    "https://images.unsplash.com/photo-...",
    "https://images.unsplash.com/photo-..."
  ]
}
```

### Using JavaScript (in browser console):

```javascript
fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    name: "Product Name",
    slug: "product-name",
    description: "Product description",
    price: 999,
    stock: 50,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-..."
    ]
  })
})
.then(res => res.json())
.then(data => console.log('Product added:', data));
```

## Note:

- The seed script uses **Unsplash images** which are free to use
- All images are properly formatted and optimized
- Products are categorized (Electronics, Accessories, Furniture)
- Stock quantities are set for realistic inventory management

## Troubleshooting:

If you get an error:
1. Make sure MongoDB is running
2. Check your `.env` file has correct `MONGO_URI`
3. Make sure you're in the `backend` directory
4. If products already exist, the script will add duplicates (you can modify the script to clear first)

Enjoy your products! 🎉

