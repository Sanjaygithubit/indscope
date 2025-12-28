function Login() {
  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <input className="border p-2 w-full mb-3" placeholder="Email" />
      <input className="border p-2 w-full mb-3" placeholder="Password" />

      <button className="bg-primary text-white w-full py-2 rounded">
        Login
      </button>
    </div>
  );
}

export default Login;
