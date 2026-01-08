function ProductSkeleton() {
  return (
   <div className="bg-white rounded-2xl shadow-lg p-4 animate-pulse [animation-duration:1.8s]">

      {/* Image skeleton */}
      <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>

      {/* Text skeleton */}
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 rounded-full"></div>
    </div>
  );
}

export default ProductSkeleton;
