// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/products/:id" element={<ProductDetail />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/orders" element={<Orders />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<main className="container"><h2>404: Not Found</h2></main>} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
