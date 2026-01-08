import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { memo } from "react";

function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);

  // ✅ MongoDB id check
  const liked = wishlist.some(
    (item) => item._id === product._id
  );

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      initial={false}
      className="bg-white rounded-2xl shadow-lg overflow-hidden
                 flex flex-col h-full relative"
    >
      {/* ❤️ Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 z-10 text-xl"
      >
        {liked ? "❤️" : "🤍"}
      </button>

      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="h-64 overflow-hidden">
         <img
  src={`${product.image}?w=400&auto=format&fit=crop`}
  loading="lazy"
  decoding="async"
  alt={product.name}
  className="h-full w-full object-cover"
/>

        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="font-semibold line-clamp-2">
          {product.name}
        </h2>

        <p className="text-primary font-bold mb-3">
          ₹{product.price}
        </p>

        <div className="mt-auto">
          <Link to={`/product/${product._id}`}>
            <button className="w-full bg-primary text-white py-2 rounded-full hover:scale-105 transition">
              View Product
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ProductCard);
