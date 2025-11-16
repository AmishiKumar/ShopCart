import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

export default function Cart() {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  
  const cart = cartContext?.cart || null;
  const loading = cartContext?.loading || false;
  const updateCartItem = cartContext?.updateCartItem || (() => ({ success: false }));
  const removeFromCart = cartContext?.removeFromCart || (() => ({ success: false }));
  const user = authContext?.user || null;
  const token = authContext?.token || null;

  // Guest cart is now allowed - no need to check for token here

  if (loading) {
    return (
      <main className="page cart-page">
        <div className="container">
          <div className="loading">Loading cart...</div>
        </div>
      </main>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <main className="page cart-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Your Cart is Empty</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-large">Continue Shopping</Link>
            {!token && (
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link> to save your cart
              </p>
            )}
          </div>
        </div>
      </main>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId);
    } else {
      await updateCartItem(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!token) {
      // Prompt to login before checkout
      if (window.confirm('Please login to proceed with checkout. Would you like to login now?')) {
        navigate('/login', { state: { returnTo: '/place-order' } });
      }
      return;
    }
    navigate('/place-order', { state: { cart } });
  };

  return (
    <main className="page cart-page">
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>Shopping Cart</h2>
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  {item.product?.images?.[0] ? (
                    <img src={item.product.images[0]} alt={item.product.name} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h3>
                    <Link to={`/products/${item.product?._id || item.product}`}>
                      {item.product?.name || 'Product'}
                    </Link>
                  </h3>
                  <p className="price">₹{item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    className="qty-btn"
                    disabled={item.quantity >= (item.product?.stock || 0)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="btn-remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary btn-block">
              {token ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
            {!token && (
              <Link to="/login" className="btn btn-secondary btn-block" style={{ marginTop: '0.5rem' }}>
                Login / Register
              </Link>
            )}
            <Link to="/products" className="btn btn-secondary btn-block" style={{ marginTop: '0.5rem' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

