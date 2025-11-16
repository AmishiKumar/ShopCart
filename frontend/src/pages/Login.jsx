import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const login = authContext?.login || (() => ({ success: false, message: 'Auth not available' }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      // Redirect to returnTo location or home
      const returnTo = location.state?.returnTo || '/';
      navigate(returnTo);
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <main className="page login-page">
      <div className="container">
        <div className="auth-form-wrapper">
          <div className="auth-form">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account to continue shopping</p>
            </div>
            {error && (
              <div className="error-message">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading || !email || !password} 
                className="btn btn-primary btn-block btn-large"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Logging in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            <div className="auth-footer">
              <p>
                Don't have an account? <Link to="/register">Create one here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

