import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand Name */}
      <h1 className="text-xl font-semibold">MyShop</h1>

      {/* Navigation links */}
      <div className="space-x-6">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;
