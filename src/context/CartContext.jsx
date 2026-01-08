import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // 🛒 Add to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find(
        (i) => i._id === product._id   // ✅ MongoDB id
      );

      let updatedCart;

      if (exist) {
        updatedCart = prev.map((i) =>
          i._id === product._id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      } else {
        updatedCart = [...prev, { ...product, qty: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // ➕ Increase qty
  const increaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i._id === id ? { ...i, qty: i.qty + 1 } : i
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // ➖ Decrease qty
  const decreaseQty = (id) => {
    setCart((prev) => {
      const updated = prev.map((i) =>
        i._id === id && i.qty > 1
          ? { ...i, qty: i.qty - 1 }
          : i
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // ❌ Remove item
  const removeItem = (id) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i._id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // 🧹 Clear cart (after order success)
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
