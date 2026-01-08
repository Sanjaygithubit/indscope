import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-10 px-8 py-20 items-center">
      {/* Text section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold leading-tight">
          Discover Your{" "}
          <span className="text-primary">Style</span>
        </h1>

        <p className="mt-6 text-gray-600">
          Premium dresses for men & women
        </p>

        <Link to="/products">
          <button
            className="mt-8 bg-primary text-white px-8 py-3 rounded-full
                       hover:scale-105 transition"
          >
            Shop Collection
          </button>
        </Link>
      </motion.div>

      {/* Image section */}
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
        alt="Fashion collection banner"   
        className="rounded-2xl shadow-xl"
      />
    </div>
  );
}

export default Hero;
