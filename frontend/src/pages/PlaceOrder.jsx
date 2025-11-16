import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

export default function PlaceOrder() {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const cart = cartContext?.cart || null;
  const clearCart = cartContext?.clearCart || (() => ({ success: false }));
  const user = authContext?.user || null;
  const token = authContext?.token || null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [offerCode, setOfferCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart');
      return;
    }

    // Pre-fill form with user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        phone: user.phone || ''
      });
    }
  }, [token, cart, user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Prepare order items
      const items = cart.items.map(item => ({
        product: item.product._id || item.product,
        name: item.product.name,
        price: item.price,
        qty: item.quantity
      }));

      const orderData = {
        items,
        shippingAddress: formData,
        offerCode: offerCode || undefined
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok) {
        // Clear cart
        await clearCart();
        // Navigate to orders page
        navigate('/orders', { state: { orderId: data._id } });
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return (
    <main className="page place-order-page">
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>Place Order</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="order-content">
          <div className="order-form">
            <h3>Shipping Information</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Offer Code (Optional)</label>
                <input
                  type="text"
                  value={offerCode}
                  onChange={(e) => setOfferCode(e.target.value.toUpperCase())}
                  placeholder="Enter offer code"
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-primary btn-large btn-block">
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.items.map((item) => (
                <div key={item._id} className="order-item">
                  <div>
                    <strong>{item.product?.name || 'Product'}</strong>
                    <p>Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
