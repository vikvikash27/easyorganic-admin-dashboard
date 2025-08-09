import React, { createContext, useState, useEffect, ReactNode } from "react";
import { AdminUser } from "../types";
import { mockUsers } from "../mockData";

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("admin-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse admin user from localStorage", error);
      localStorage.removeItem("admin-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<void> => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers[email.toLowerCase()];
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem("admin-user", JSON.stringify(foundUser));
          resolve();
        } else {
          reject(new Error("User not found"));
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin-user");
  };

  const value = { user, loading, login, logout };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
