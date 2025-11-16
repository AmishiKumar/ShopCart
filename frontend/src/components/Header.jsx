/*function Header() {
  return (
    <header>
      <h2>My E-Commerce Store</h2>
    </header>
  );
}

export default Header;
*/
// Header.jsx
import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();
  
  const user = authContext?.user || null;
  const logout = authContext?.logout || (() => {});
  const cartCount = cartContext?.cartCount || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <NavLink to="/" className="logo">ShopSpree</NavLink>
        </div>

        <nav className={`nav ${open ? "open" : ""}`}>
          <NavLink to="/" end className={({isActive})=>isActive ? "active" : ""} onClick={()=>setOpen(false)}>Home</NavLink>
          <NavLink to="/products" className={({isActive})=>isActive ? "active" : ""} onClick={()=>setOpen(false)}>Products</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive ? "active" : ""} onClick={()=>setOpen(false)}>About</NavLink>
          
          <NavLink to="/cart" className={({isActive})=>isActive ? "active" : ""} onClick={()=>setOpen(false)}>
            Cart ({cartCount})
          </NavLink>
          {user ? (
            <>
              <NavLink to="/orders" className={({isActive})=>isActive ? "active" : ""} onClick={()=>setOpen(false)}>Orders</NavLink>
              <div className="user-menu">
                <span className="user-name">{user.name}</span>
                <span className="user-role">({user.role})</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({isActive})=>isActive ? "active" : ""} onClick={()=>setOpen(false)}>Login</NavLink>
              <NavLink to="/register" className={({isActive})=>isActive ? "active" : ""} onClick={()=>setOpen(false)}>Register</NavLink>
            </>
          )}
        </nav>

        <button className="hamburger" onClick={()=>setOpen(s=>!s)} aria-label="Toggle menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
}
