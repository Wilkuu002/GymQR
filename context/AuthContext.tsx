import React, { createContext, useContext, useState } from "react";
import { User, UserCredential } from "firebase/auth";
import { useAuth } from "@/hooks/useAuth";
import { AuthContextType, AuthProviderProps } from "./types"; // Zaimportuj typy

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const userCredential = await auth.login(email, password);
    setLoading(false);
    return userCredential;
  };

  const logout = async () => {
    await auth.logout();
  };

  const contextValue = {
    user: auth.user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
