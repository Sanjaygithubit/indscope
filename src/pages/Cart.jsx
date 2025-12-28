import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Total amount calculate pannrom
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return <p className="p-6">Cart empty 😅</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center mb-4 border-b pb-2"
        >
          <div>
            <h2>{item.name}</h2>
            <p>Qty: {item.qty}</p>
            <p className="text-primary">₹{item.price * item.qty}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="text-xl font-semibold mt-4">Total: ₹{total}</h2>

      <Link to="/checkout">
        <button className="mt-4 bg-primary text-white px-6 py-2 rounded">
          Checkout
        </button>
      </Link>
    </div>
  );
}

export default Cart;
