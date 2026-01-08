import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  // Empty wishlist UI
  if (wishlist.length === 0) {
    return (
      <div className="p-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Your Wishlist is Empty 🤍
        </h2>
        <p className="text-gray-500 mb-6">
          Save your favourite styles here
        </p>
        <Link to="/products">
          <button className="bg-primary text-white px-6 py-2 rounded-full">
            Browse Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-8 py-16">
      <h1 className="text-3xl font-bold mb-8">
        My Wishlist ❤️
      </h1>

      <div
        className="grid gap-8
                   grid-cols-1
                   sm:grid-cols-2
                   md:grid-cols-3
                   lg:grid-cols-4"
      >
        {wishlist.map((product) => (
          <motion.div
            key={product._id} // ✅ MongoDB id
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden
                       flex flex-col h-full relative"
          >
            {/* Remove wishlist */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-3 right-3 text-xl"
            >
              ❤️
            </button>

            {/* Image */}
            <Link to={`/product/${product._id}`}>
              <div className="h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="font-semibold line-clamp-2 mb-1">
                {product.name}
              </h2>

              <p className="text-primary font-bold mb-3">
                ₹{product.price}
              </p>

              {/* Buttons */}
              <div className="mt-auto space-y-2">
                <button
                  onClick={() =>
                    addToCart({ ...product, qty: 1 })
                  }
                  className="w-full bg-primary text-white py-2 rounded-full
                             hover:scale-105 transition"
                >
                  Add to Cart
                </button>

                <Link to={`/product/${product._id}`}>
                  <button
                    className="w-full border border-primary text-primary
                               py-2 rounded-full"
                  >
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
