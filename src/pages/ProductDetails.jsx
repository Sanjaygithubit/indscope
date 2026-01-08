import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { getProductById } from "../api/api";
import Loader from "../components/Loader";


function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-10">Loading product...</p>;
  }

  if (error || !product) {
    return <p className="p-10">{error}</p>;
  }
  if (loading) {
  return <Loader text="Loading product..." />;
}


  const handleAddToCart = () => {
    addToCart({
      ...product,
      qty,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 py-16 max-w-6xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[520px] object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-gray-400 mb-2">
            Home / Products / {product.name}
          </p>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-primary text-2xl mt-3">
            ₹{product.price}
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="border px-4 py-2 rounded"
            >
              −
            </button>

            <span className="text-lg font-medium">{qty}</span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="border px-4 py-2 rounded"
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="mt-8 bg-primary text-white px-10 py-3 rounded-full
                       hover:scale-105 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
