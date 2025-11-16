import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/"); // redirect home
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>Ecommerce</Link>

      <div style={styles.right}>
        {/* USER ICON WITH DROPDOWN */}
        <div style={styles.dropdownWrapper} ref={dropdownRef}>
          <div
            style={styles.iconWrapper}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUser size={22} />
            <span style={styles.text}>{user ? user.name : "Account"}</span>
          </div>

          {dropdownOpen && (
            <div style={styles.dropdown}>
              {!user ? (
                <>
                  <Link to="/login" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>Login</Link>
                  <Link to="/register" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>Register</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" style={styles.dropdownItem} onClick={() => setDropdownOpen(false)}>Profile</Link>
                  <div style={styles.dropdownItem} onClick={handleLogout}>Logout</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* CART ICON */}
        <Link to="/cart" style={styles.iconWrapper}>
          <FaShoppingCart size={22} />
          {cartCount > 0 && (
            <span style={styles.badge}>{cartCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#fff",
    padding: "12px 20px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative"
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#000"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    position: "relative"
  },
  iconWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#000",
    textDecoration: "none",
    fontSize: "15px",
    cursor: "pointer",
    userSelect: "none"
  },
  dropdownWrapper: {
    position: "relative"
  },
  dropdown: {
    position: "absolute",
    top: "35px",
    right: "0",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    minWidth: "120px"
  },
  dropdownItem: {
    padding: "10px 15px",
    textDecoration: "none",
    color: "#000",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid #eee"
  },
  text: {
    fontSize: "14px"
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    background: "red",
    color: "#fff",
    fontSize: "10px",
    padding: "2px 5px",
    borderRadius: "50%"
  }
};
