// Home.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

export default function Home(){
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  
  const token = authContext?.token || null;

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      // Show first 6 products as featured
      setFeaturedProducts(data.slice(0, 6));
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    // Use the context directly to ensure we have the function
    const addToCartFn = cartContext?.addToCart;
    if (!addToCartFn || typeof addToCartFn !== 'function') {
      console.error('addToCart is not available', { cartContext });
      alert("Cart is not available. Please refresh the page.");
      return;
    }
    try {
      const result = await addToCartFn(productId, 1);
      if (result && result.success) {
        // Show success message
        alert("Product added to cart!");
      } else {
        alert(result?.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
      alert("Error adding to cart: " + error.message);
    }
  };

  return (
    <main className="page home-page">
      <section className="hero container">
        <div className="hero-left">
          <h1>Welcome to ShopSpree</h1>
          <p>Discover quality products at great prices. Shop the latest trends and find everything you need in one place.</p>
          <Link to="/products" className="btn btn-primary btn-large">Shop Now</Link>
        </div>
        <div className="hero-right">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop" alt="Shopping" />
        </div>
      </section>

      <section className="container featured">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Featured Products</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Hand-picked items just for you</p>
        </div>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <p>No products available yet. Check back soon!</p>
          </div>
        )}
        {featuredProducts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/products" className="btn btn-secondary btn-large">View All Products</Link>
          </div>
        )}
      </section>
    </main>
  );
}
