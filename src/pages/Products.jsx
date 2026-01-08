import { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import CategoryPills from "../components/CategoryPills";

function Products({ featured = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // ✅ IMPORTANT (category change loader)
      setError("");

      try {
        const data = await getProducts(
          category === "all" ? null : category
        );

        setProducts(featured ? data.slice(0, 4) : data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [featured, category]);

  // ✅ FULL PAGE LOADER (only for main products page)
  if (loading && !featured) {
    return <Loader text="Loading products..." />;
  }

  return (
    <div className="px-8 py-16">
      {/* ✅ SINGLE HEADING */}
      <h1 className="text-3xl font-bold mb-6">
        {featured ? "Featured Collection" : "Latest Collection"}
      </h1>

      {/* ✅ CATEGORY PILLS (only non-featured page) */}
      {!featured && (
        <CategoryPills
          selected={category}
          onChange={setCategory}
        />
      )}

      {/* Error UI */}
      {error && (
        <p className="text-red-500 text-center mb-6">
          {error}
        </p>
      )}

      {/* Product Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: featured ? 4 : 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
      </div>

      {/* View all button – Home only */}
      {featured && (
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full hover:scale-105 transition"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}

export default Products;
