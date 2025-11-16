/*function Footer() {
  return (
    <footer>
      <p>&copy; 2025 Shopping Cart - Amishi</p>
    </footer>
  );
}

export default Footer;
*/

// Footer.jsx
import React from "react";

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} ShopSpree. All rights reserved.</p>
      </div>
    </footer>
  );
}
