function Checkout() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Shipping form */}
      <input className="border p-2 w-full mb-3" placeholder="Name" />
      <input className="border p-2 w-full mb-3" placeholder="Phone" />
      <input className="border p-2 w-full mb-3" placeholder="Address" />

      <button className="bg-primary text-white w-full py-2 rounded">
        Place Order (COD)
      </button>
    </div>
  );
}

export default Checkout;
