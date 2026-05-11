import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // auto login
  useEffect(() => {
    const token = localStorage.getItem("@connexa_token");
    const userData = localStorage.getItem("@connexa_user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  // login
  const login = (token, userData) => {
    localStorage.setItem("@connexa_token", token);
    localStorage.setItem("@connexa_user", JSON.stringify(userData));

    setUser(userData);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("@connexa_token");
    localStorage.removeItem("@connexa_user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};