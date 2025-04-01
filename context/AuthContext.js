/*
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (res.ok) setUser(data.user);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      Cookies.set("token", data.token, { expires: 7 }); // Session pendant 7 jours
      router.push("/");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
*/