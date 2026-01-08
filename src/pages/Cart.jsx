import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );
  const delivery = subtotal > 1000 ? 0 : 99;
  const total = subtotal + delivery;

  // Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl">Your cart is empty 🛒</h2>
        <Link to="/products">
          <button className="mt-4 bg-primary text-white px-6 py-2 rounded">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  // Checkout click handler
  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="px-6 py-12 grid md:grid-cols-3 gap-8">
      {/* LEFT – Cart Items */}
      <div className="md:col-span-2 space-y-6">
        {cart.map((item) => (
          <motion.div
            key={item._id}   // 🔥 MongoDB id
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow rounded-xl p-4 flex gap-4"
          >
            <img
              src={item.image}
              alt={item.name}   // ✅ a11y fix
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-primary font-bold mt-1">
                ₹{item.price}
              </p>

              {/* Quantity controls */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="border px-3 py-1 rounded"
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="border px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeItem(item._id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </div>

      {/* RIGHT – Order Summary */}
      <div className="bg-white shadow rounded-xl p-6 h-fit sticky top-24">
        <h2 className="text-lg font-semibold mb-4">
          Price Details
        </h2>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">₹{total}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-primary text-white py-3 rounded-full hover:scale-105 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
