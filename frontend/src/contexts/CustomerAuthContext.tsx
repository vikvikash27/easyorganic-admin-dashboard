import React, { createContext, useState, useEffect, ReactNode } from "react";
import { CustomerUser } from "../types";

interface CustomerAuthContextType {
  customer: CustomerUser | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

export const CustomerAuthContext = createContext<
  CustomerAuthContextType | undefined
>(undefined);

const API_URL = "http://localhost:3001";

interface CustomerAuthProviderProps {
  children: ReactNode;
}

export const CustomerAuthProvider: React.FC<CustomerAuthProviderProps> = ({
  children,
}) => {
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("customer-user");
      if (storedUser) {
        setCustomer(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse customer user from localStorage", error);
      localStorage.removeItem("customer-user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/customers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("User not found");
    }

    const user = await response.json();
    setCustomer(user);
    localStorage.setItem("customer-user", JSON.stringify(user));
  };

  const signup = async (name: string, email: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Could not sign up.");
    }
  };

  const logout = () => {
    setCustomer(null);
    localStorage.removeItem("customer-user");
  };

  const value = { customer, loading, login, signup, logout };

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  );
};
