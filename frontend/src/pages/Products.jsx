import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  
  const user = authContext?.user || null;
  const token = authContext?.token || null;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    const addToCartFn = cartContext?.addToCart;
    if (!addToCartFn || typeof addToCartFn !== 'function') {
      alert("Cart is not available. Please refresh the page.");
      return;
    }
    try {
      const result = await addToCartFn(productId, 1);
      if (result && result.success) {
        alert("Product added to cart!");
      } else {
        alert(result?.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert("Error adding to cart");
    }
  };

  if (loading) {
    return (
      <main className="page products-page">
        <div className="container">
          <div className="loading">Loading products...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="page products-page">
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>All Products</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Browse our complete collection of quality products
          </p>
        </div>
        <div className="products-grid">
          {products.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No products available</p>
              <p>Check back soon for new products!</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
