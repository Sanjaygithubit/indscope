import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);

    if (success) {
      navigate("/profile");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-primary">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Login to continue shopping
        </p>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-primary"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:outline-primary"
            required
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          New here?{" "}
          <Link to="/register" className="text-primary font-medium">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
