import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { placeOrder } from "../api/api";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);

  // 🔐 Address state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const handlePlaceOrder = async () => {
    setError("");

    // 🔐 Auth safety
    if (!user) {
      navigate("/login");
      return;
    }

    // ❌ Validation
    if (!name || !phone || !address || !pincode) {
      setError("Please fill all delivery details");
      return;
    }

    if (phone.length !== 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      // 🧾 Backend order create
      const order = await placeOrder(
        {
          items: cart,
          totalAmount: total,
          paymentMethod: payment,
          deliveryAddress: {
            name,
            phone,
            address,
            pincode,
          },
        },
        user.token
      );

      clearCart();

      navigate("/success", {
        state: { orderId: order._id },
      });
    } catch (err) {
      setError("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
      {/* LEFT – Address */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold mb-4">
          Delivery Address
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error}
          </p>
        )}
      </motion.div>

      {/* RIGHT – Payment */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold mb-4">
          Payment Options
        </h2>

        <label className="flex items-center gap-3 mb-3">
          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />
          Cash on Delivery
        </label>

        <label className="flex items-center gap-3 mb-6">
          <input
            type="radio"
            checked={payment === "online"}
            onChange={() => setPayment("online")}
          />
          Online Payment (Mock)
        </label>

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span className="text-primary">₹{total}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-full
                     hover:scale-105 transition disabled:opacity-60"
        >
          {loading
            ? "Placing Order..."
            : payment === "cod"
            ? "Place Order"
            : "Pay & Place Order"}
        </button>
      </motion.div>
    </div>
  );
}

export default Checkout;
