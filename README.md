# MERN E-Commerce Platform

A full-stack e-commerce application built with MongoDB, Express.js, React, and Node.js.

## Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Role-Based Access Control**: Customer, Vendor, and Admin roles
- **Product Management**: CRUD operations for products (Admin/Vendor)
- **Shopping Cart**: Add, update, and remove items from cart
- **Order Management**: Create and track orders
- **Offer/Discount System**: Apply discount codes to orders
- **Session Management**: JWT tokens, cookies, and server-side sessions

## Project Structure

```
ecommerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── offerController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── cartModel.js
│   │   ├── offerModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── offerRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── App.jsx
    └── package.json
```

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string and secrets.

5. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Update `MONGO_URI` in `.env` file:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin/Vendor)
- `PUT /api/products/:id` - Update product (Admin/Vendor)
- `DELETE /api/products/:id` - Delete product (Admin/Vendor)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/item/:itemId` - Update cart item (protected)
- `DELETE /api/cart/item/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (Admin/Vendor)

### Offers
- `GET /api/offers` - Get all offers
- `GET /api/offers/code/:code` - Get offer by code
- `POST /api/offers` - Create offer (Admin)
- `PUT /api/offers/:id` - Update offer (Admin)
- `DELETE /api/offers/:id` - Delete offer (Admin)

## User Roles

- **Customer**: Can browse products, add to cart, place orders
- **Vendor**: Can manage products and update order status
- **Admin**: Full access to all features

## Session Management

The application supports three session management methods:

1. **JWT Tokens**: Stored in localStorage and sent via Authorization header
2. **Cookies**: JWT tokens can also be stored in HTTP-only cookies
3. **Server-Side Sessions**: Using express-session with MongoDB store

## Deployment

### Backend Deployment (Render/Heroku)

1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Add environment variable: `REACT_APP_API_URL`

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Router, Context API
- **Authentication**: JWT, bcryptjs
- **Session Management**: express-session, cookie-parser

## License

ISC

