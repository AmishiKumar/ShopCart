import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  
  const token = authContext?.token || null;

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        navigate('/products');
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const addToCartFn = cartContext?.addToCart;
    if (!addToCartFn || typeof addToCartFn !== 'function') {
      alert("Cart is not available. Please refresh the page.");
      return;
    }
    try {
      const result = await addToCartFn(product._id, quantity);
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
      <main className="page product-detail-page">
        <div className="container">
          <div className="loading">Loading product...</div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page product-detail-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Product not found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary btn-large">Back to Products</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}
          </div>
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="price">₹{product.price}</p>
            {product.description && (
              <div className="description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}
            {product.category && (
              <p className="category">Category: {product.category}</p>
            )}
            <div className="stock-info">
              {product.stock > 0 ? (
                <p className="in-stock">In Stock ({product.stock} available)</p>
              ) : (
                <p className="out-of-stock">Out of Stock</p>
              )}
            </div>
            <div className="quantity-selector">
              <label>Quantity:</label>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-large"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <Link to="/products" className="btn btn-secondary btn-large" style={{ marginTop: '1rem', display: 'inline-block' }}>
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
