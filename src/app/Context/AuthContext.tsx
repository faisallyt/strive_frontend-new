// app/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  refreshToken: string | null;
  userData: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    // Check if user is already logged in and parse user data

    const userData = localStorage.getItem("userData");
    const parsedUserData = userData? JSON.parse(userData) : null;

    // Check if refresh token is stored in cookies
    const storedRefreshToken = Cookies.get("refreshToken");
    console.log("User data from localStorage:", userData);
    console.log("Refresh token from Cookies:", storedRefreshToken);

    if (userData && storedRefreshToken && parsedUserData.username) {
      setIsAuthenticated(true);
      setUserData(parsedUserData);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, refreshToken, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
