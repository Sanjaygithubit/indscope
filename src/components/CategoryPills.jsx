function CategoryPills({ selected, onChange }) {
  const categories = ["all", "men", "women", "unisex"];

  return (
    <div className="flex gap-3 flex-wrap mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 rounded-full border transition
            ${
              selected === cat
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:border-primary"
            }`}
        >
          {cat === "all"
            ? "All"
            : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CategoryPills;
