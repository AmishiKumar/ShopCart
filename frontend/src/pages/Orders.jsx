import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="page orders-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Please login to view your orders</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Sign in to see your order history.</p>
            <Link to="/login" className="btn btn-primary btn-large">Login</Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="page orders-page">
        <div className="container">
          <div className="loading">Loading orders...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="page orders-page">
      <div className="container">
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)' }}>My Orders</h2>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>You have no orders yet.</p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Start shopping to see your orders here.</p>
            <Link to="/products" className="btn btn-primary btn-large">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order._id.slice(-6)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`order-status status-${order.status}`}>
                    {order.status.toUpperCase()}
                  </div>
                </div>
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span>{item.name}</span>
                      <span>Qty: {item.qty}</span>
                      <span>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total: ₹{order.total.toFixed(2)}</span>
                    {order.discount > 0 && (
                      <span className="discount">
                        (Discount: ₹{order.discount.toFixed(2)})
                      </span>
                    )}
                  </div>
                  {order.shippingAddress && (
                    <div className="shipping-address">
                      <p><strong>Shipping to:</strong></p>
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.address}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
