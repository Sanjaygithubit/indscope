import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border rounded-lg p-4 shadow">
      <img src={product.image} alt={product.name} />

      <h2 className="mt-2 font-medium">{product.name}</h2>
      <p className="text-primary font-semibold">₹{product.price}</p>

      {/* Add to cart button */}
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-primary text-white px-4 py-2 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
