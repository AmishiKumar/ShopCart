import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <div className="product-image">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="placeholder-image">No Image</div>
          )}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-price">₹{product.price}</p>
          {product.stock !== undefined && (
            <p className="product-stock">
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </p>
          )}
        </div>
      </Link>
      <button
        onClick={() => onAddToCart(product._id)}
        className="btn btn-primary"
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
}
