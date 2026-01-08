import { createContext, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item._id === product._id   // ✅ MongoDB id
      );

      let updatedWishlist;

      if (exists) {
        // Remove if already exists
        updatedWishlist = prev.filter(
          (item) => item._id !== product._id
        );
      } else {
        // Add if not exists
        updatedWishlist = [...prev, product];
      }

      // Persist
      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    });
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
