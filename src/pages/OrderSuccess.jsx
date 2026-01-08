import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl text-primary">Order placed successfully 🎉</h1>
      <p className="mt-4">Order ID: #FX12345</p>

      <Link to="/">
        <button className="mt-6 bg-primary text-white px-6 py-2 rounded">
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
