import { createContext, useState } from "react";

// CartContext create pannrom
export const CartContext = createContext();

function CartProvider({ children }) {
  // Cart items store panna state
  const [cartItems, setCartItems] = useState([]);

  // Add to cart function
  const addToCart = (product) => {
    // Already product irukka nu check
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      // Quantity increase pannrom
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      // New product add pannrom
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // Remove product
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
