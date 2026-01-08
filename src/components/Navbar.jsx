import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import { motion } from "framer-motion";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // 🛒 Total items count (qty sum)
  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white shadow px-6 py-4"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          FASHIONX
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

       <div className="hidden md:flex gap-6 items-center">
  {/* ✅ HOME */}
  <Link to="/" className="hover:text-primary">
    Home
  </Link>

  <Link to="/products" className="hover:text-primary">
    Shop
  </Link>

  <Link to="/wishlist" className="hover:text-primary">
    Wishlist ❤️
    {wishlist.length > 0 && (
      <span className="ml-1 text-primary font-bold">
        ({wishlist.length})
      </span>
    )}
  </Link>

  <Link to="/cart" className="hover:text-primary">
    Cart
    {cartCount > 0 && (
      <span className="ml-1 text-primary font-bold">
        ({cartCount})
      </span>
    )}
  </Link>

  {user ? (
    <>
      <Link to="/profile" className="hover:text-primary">
        Profile
      </Link>
      <button
        onClick={handleLogout}
        className="text-sm hover:text-red-500"
      >
        Logout
      </button>
    </>
  ) : (
    <Link to="/login" className="hover:text-primary">
      Login
    </Link>
  )}
</div>

      </div>

      {/* Mobile dropdown */}
     {open && (
  <div className="md:hidden mt-4 flex flex-col gap-4">
    {/* ✅ HOME */}
    <Link to="/" onClick={() => setOpen(false)}>
      Home
    </Link>

    <Link to="/products" onClick={() => setOpen(false)}>
      Shop
    </Link>

    <Link to="/wishlist" onClick={() => setOpen(false)}>
      Wishlist ❤️ ({wishlist.length})
    </Link>

    <Link to="/cart" onClick={() => setOpen(false)}>
      Cart ({cartCount})
    </Link>

    {user ? (
      <>
        <Link to="/profile" onClick={() => setOpen(false)}>
          Profile
        </Link>
        <button onClick={handleLogout}>
          Logout
        </button>
      </>
    ) : (
      <Link to="/login" onClick={() => setOpen(false)}>
        Login
      </Link>
    )}
  </div>
)}

    </motion.nav>
  );
}

export default Navbar;
