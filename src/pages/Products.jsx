import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Products() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Products</h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Products;
