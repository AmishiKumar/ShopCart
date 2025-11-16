# Quick Start Guide - E-Commerce Platform

## ✅ Project Status: COMPLETE

All 10 experiments have been implemented:
- ✅ Basic MERN Architecture
- ✅ Homepage & Navigation
- ✅ Core E-Commerce Modules
- ✅ Express Middleware & Routing
- ✅ RESTful APIs
- ✅ Role-Based Access Control
- ✅ Session Management
- ✅ MongoDB Atlas Configuration
- ✅ Deployment Configuration
- ✅ Shopping Cart System

## 🚀 How to Run the Project

### Step 1: Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is installed and running on your system
- Default connection: `mongodb://localhost:27017/ecommerce`

**Option B: MongoDB Atlas (Cloud)**
- Follow instructions in `backend/MONGODB_ATLAS_SETUP.md`
- Update `MONGO_URI` in `backend/.env`

### Step 2: Start Backend Server

Open a terminal and run:

```powershell
cd backend
npm install
npm run dev
```

The backend will start on **http://localhost:5000**

You should see:
```
MongoDB Connected
Server running on port 5000
```

### Step 3: Start Frontend

Open a **NEW terminal** and run:

```powershell
cd frontend
npm install
npm start
```

The frontend will start on **http://localhost:3000**

It will automatically open in your browser.

## 🎯 Testing the Application

### 1. Register a New User
- Go to http://localhost:3000/register
- Create an account (default role: customer)

### 2. Browse Products
- Visit http://localhost:3000/products
- View available products

### 3. Add to Cart
- Click on any product
- Click "Add to Cart"
- View cart at http://localhost:3000/cart

### 4. Place an Order
- Go to Cart
- Click "Proceed to Checkout"
- Fill shipping information
- Place order

### 5. View Orders
- Go to http://localhost:3000/orders
- See your order history

## 👥 User Roles

### Customer (Default)
- Browse products
- Add to cart
- Place orders
- View own orders

### Admin
- All customer features
- Manage products (create, update, delete)
- Manage offers/discounts
- View all orders
- Manage users

### Vendor
- Manage products
- Update order status
- View orders

## 🔑 Creating Admin/Vendor Users

To create an admin or vendor user, you can:

1. **Using MongoDB directly:**
   - Connect to your database
   - Update user document: `{ role: "admin" }` or `{ role: "vendor" }`

2. **Using API (after registering as customer):**
   - Login as any user
   - If you have admin access, update user role via API

3. **Manual registration (modify code temporarily):**
   - In `backend/controllers/authController.js`, change default role in register function

## 📝 Important Notes

1. **First Time Setup:**
   - Make sure `.env` file exists in `backend/` folder
   - Update `MONGO_URI` if using MongoDB Atlas
   - Update `JWT_SECRET` and `SESSION_SECRET` for production

2. **Database:**
   - Database will be created automatically when you first run the server
   - Collections: users, products, orders, offers, carts

3. **Ports:**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000
   - Make sure these ports are not in use

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct `MONGO_URI`
- Check if port 5000 is available
- Run `npm install` in backend folder

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` in frontend folder
- Clear browser cache

### MongoDB Connection Error
- Verify MongoDB is running (local) or connection string is correct (Atlas)
- Check network access (for Atlas)
- Verify credentials

### CORS Errors
- Make sure backend is running
- Check `FRONTEND_URL` in `.env` matches frontend URL
- Verify CORS settings in `backend/server.js`

## 📚 API Endpoints

### Public Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/offers` - Get all offers
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Protected Endpoints (Require Login)
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `POST /api/orders` - Create order
- `GET /api/orders` - Get orders
- `GET /api/auth/me` - Get current user

### Admin/Vendor Only
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/offers` - Create offer (Admin only)

## 🎨 Features Implemented

✅ User Authentication (Register/Login)
✅ Role-Based Access Control
✅ Product Catalog (CRUD)
✅ Shopping Cart
✅ Order Management
✅ Offer/Discount System
✅ Session Management (JWT, Cookies, Server-side)
✅ Responsive Navigation
✅ Order History
✅ Stock Management

## 📖 Documentation

- `README.md` - Project overview
- `EXPERIMENTS_SUMMARY.md` - Detailed experiment summary
- `DEPLOYMENT.md` - Deployment guide
- `backend/MONGODB_ATLAS_SETUP.md` - MongoDB Atlas setup

## 🎉 You're All Set!

The project is complete and ready to use. Start both servers and begin exploring the e-commerce platform!

