import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import AuthContext from './AuthContext';

const CartContext = createContext({
  cart: null,
  cartCount: 0,
  loading: false,
  addToCart: () => ({ success: false, message: 'Cart not available' }),
  updateCartItem: () => ({ success: false }),
  removeFromCart: () => ({ success: false }),
  clearCart: () => ({ success: false }),
  refreshCart: () => {}
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Safely get token from AuthContext
  const authContext = useContext(AuthContext);
  const token = authContext?.token || null;

  const API_URL = 'http://localhost:5000/api/cart';

  // Load guest cart from localStorage
  const loadGuestCart = useCallback(() => {
    try {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        const parsed = JSON.parse(guestCart);
        if (parsed && parsed.items) {
          setCart(parsed);
          const count = parsed.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(count);
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
    }
    // Initialize empty cart
    const emptyCart = { items: [] };
    setCart(emptyCart);
    setCartCount(0);
    return emptyCart;
  }, []);

  // Save guest cart to localStorage
  const saveGuestCart = useCallback((cartData) => {
    try {
      localStorage.setItem('guestCart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  }, []);

  const fetchCart = async () => {
    if (!token) {
      // Load guest cart from localStorage
      loadGuestCart();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data);
        const count = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Migrate guest cart to server when user logs in
  const migrateGuestCart = async (authToken) => {
    if (!authToken) return;
    
    try {
      const guestCart = localStorage.getItem('guestCart');
      if (!guestCart) return;

      const parsed = JSON.parse(guestCart);
      if (!parsed.items || parsed.items.length === 0) return;

      // Add each item from guest cart to server cart
      for (const item of parsed.items) {
        const productId = item.product?._id || item.product;
        if (productId) {
          try {
            await fetch(`${API_URL}/add`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
              },
              body: JSON.stringify({ productId, quantity: item.quantity })
            });
          } catch (error) {
            console.error('Error migrating cart item:', error);
          }
        }
      }

      // Clear guest cart after migration
      localStorage.removeItem('guestCart');
    } catch (error) {
      console.error('Error migrating guest cart:', error);
    }
  };

  // Initialize cart on mount
  useEffect(() => {
    if (token) {
      // Migrate guest cart first, then fetch server cart
      migrateGuestCart(token).then(() => {
        fetchCart();
      });
    } else {
      // Load guest cart when not logged in
      loadGuestCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Ensure cart is initialized even if useEffect hasn't run yet
  useEffect(() => {
    if (!cart && !token) {
      loadGuestCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    // Guest cart - store in localStorage
    if (!token) {
      try {
        // Fetch product details
        const productRes = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!productRes.ok) {
          return { success: false, message: 'Product not found' };
        }
        const product = await productRes.json();

        // Load existing guest cart
        let guestCart = loadGuestCart();
        if (!guestCart.items) {
          guestCart = { items: [] };
        }

        // Check if item already exists
        const existingItemIndex = guestCart.items.findIndex(
          item => item.product?._id === productId || item.product === productId
        );

        if (existingItemIndex > -1) {
          // Update quantity
          const newQuantity = guestCart.items[existingItemIndex].quantity + quantity;
          if (newQuantity > product.stock) {
            return { success: false, message: 'Insufficient stock' };
          }
          guestCart.items[existingItemIndex].quantity = newQuantity;
          guestCart.items[existingItemIndex].price = product.price;
        } else {
          // Add new item
          guestCart.items.push({
            product: {
              _id: product._id,
              name: product.name,
              images: product.images,
              stock: product.stock,
              slug: product.slug
            },
            quantity,
            price: product.price,
            _id: `guest_${Date.now()}_${Math.random()}`
          });
        }

        saveGuestCart(guestCart);
        setCart(guestCart);
        const count = guestCart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Error adding to cart' };
      }
    }

    // Authenticated cart - use API
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
        const count = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  }, [token, loadGuestCart, saveGuestCart]);

  const updateCartItem = useCallback(async (itemId, quantity) => {
    // Guest cart
    if (!token) {
      try {
        let guestCart = loadGuestCart();
        if (!guestCart.items) {
          return { success: false };
        }

        const itemIndex = guestCart.items.findIndex(item => item._id === itemId);
        if (itemIndex === -1) {
          return { success: false, message: 'Item not found' };
        }

        if (quantity < 1) {
          // Remove item
          guestCart.items.splice(itemIndex, 1);
        } else {
          // Update quantity
          const productId = guestCart.items[itemIndex].product?._id || guestCart.items[itemIndex].product;
          const productRes = await fetch(`http://localhost:5000/api/products/${productId}`);
          if (productRes.ok) {
            const product = await productRes.json();
            if (quantity > product.stock) {
              return { success: false, message: 'Insufficient stock' };
            }
            guestCart.items[itemIndex].quantity = quantity;
            guestCart.items[itemIndex].price = product.price;
          }
        }

        saveGuestCart(guestCart);
        setCart(guestCart);
        const count = guestCart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Error updating cart' };
      }
    }

    // Authenticated cart
    try {
      const response = await fetch(`${API_URL}/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
        const count = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  }, [token, loadGuestCart, saveGuestCart]);

  const removeFromCart = useCallback(async (itemId) => {
    // Guest cart
    if (!token) {
      try {
        let guestCart = loadGuestCart();
        if (!guestCart.items) {
          return { success: false };
        }

        guestCart.items = guestCart.items.filter(item => item._id !== itemId);
        saveGuestCart(guestCart);
        setCart(guestCart);
        const count = guestCart.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Error removing from cart' };
      }
    }

    // Authenticated cart
    try {
      const response = await fetch(`${API_URL}/item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
        const count = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setCartCount(count);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  }, [token, loadGuestCart, saveGuestCart]);

  const clearCart = useCallback(async () => {
    // Guest cart
    if (!token) {
      try {
        const emptyCart = { items: [] };
        saveGuestCart(emptyCart);
        setCart(emptyCart);
        setCartCount(0);
        return { success: true };
      } catch (error) {
        return { success: false, message: 'Error clearing cart' };
      }
    }

    // Authenticated cart
    try {
      const response = await fetch(`${API_URL}/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setCart(null);
        setCartCount(0);
        return { success: true };
      }
    } catch (error) {
      return { success: false, message: 'Network error' };
    }
  }, [token, saveGuestCart]);

  // Memoize fetchCart
  const refreshCart = useCallback(() => {
    fetchCart();
  }, [token]);

  // Ensure all functions are defined - use useMemo to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return {
      cart,
      cartCount,
      loading,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      refreshCart
    };
  }, [cart, cartCount, loading, addToCart, updateCartItem, removeFromCart, clearCart, refreshCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

