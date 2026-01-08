import { createContext, useState } from "react";
import { loginUser } from "../api/api";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // 🔐 Login
  const login = async (email, password) => {
    try {
      const data = await loginUser({ email, password });

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        return true; // ✅ SUCCESS
      } else {
        return false; // ❌ INVALID CREDENTIALS
      }
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
