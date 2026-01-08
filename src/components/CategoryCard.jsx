import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CategoryCard({ title, image, category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // category query use pannitu products page pogum
    navigate(`/products?category=${category}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
      className="cursor-pointer rounded-2xl overflow-hidden shadow-lg relative"
    >
      <img
        src={image}
        alt={title}
        className="h-64 w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-white text-2xl font-bold">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}

export default CategoryCard;
