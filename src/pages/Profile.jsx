import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getOrders } from "../api/api";
import Loader from "../components/Loader";


function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?.token) {
          const data = await getOrders(user.token);
          setOrders(data);
        }
      } catch (err) {
        console.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
      {loading && <Loader text="Fetching orders..." />}

    };

    fetchOrders();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-primary mb-6">
          My Profile
        </h1>

        {/* User Info */}
        <div className="mb-8">
          <p className="text-gray-500 text-sm">Email</p>
          <p className="font-medium">{user?.user?.email}</p>
        </div>

        {/* Orders */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Order History
          </h2>

          {/* Loading */}
          {loading && (
            <p className="text-gray-500">
              Loading orders...
            </p>
          )}

          {/* Empty */}
          {!loading && orders.length === 0 && (
            <p className="text-gray-500">
              No orders yet 😕
            </p>
          )}

          {/* Orders list */}
          {!loading &&
            orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 mb-4"
              >
                <p className="text-sm text-gray-500">
                  Order ID
                </p>
                <p className="text-xs break-all mb-2">
                  {order._id}
                </p>

                <p className="font-medium">
                  Total: ₹{order.totalAmount}
                </p>

                <p className="text-sm text-green-600">
                  Payment: {order.paymentStatus}
                </p>
              </div>
            ))}
        </div>

        <button
          onClick={logout}
          className="bg-primary text-white px-6 py-2 rounded-full hover:scale-105 transition"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
}

export default Profile;
