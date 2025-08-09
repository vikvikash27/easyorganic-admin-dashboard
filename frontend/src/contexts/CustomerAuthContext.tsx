import React, { createContext, useState, useEffect, ReactNode } from "react";
import { CustomerUser } from "../types";
import { mockCustomerUsers, addMockCustomerUser } from "../mockData";

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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockCustomerUsers[email.toLowerCase()];
        if (foundUser) {
          setCustomer(foundUser);
          localStorage.setItem("customer-user", JSON.stringify(foundUser));
          resolve();
        } else {
          reject(new Error("User not found"));
        }
      }, 500);
    });
  };

  const signup = async (name: string, email: string): Promise<void> => {
    const newUser: CustomerUser = {
      id: `cust-user-${Date.now()}`,
      name,
      email,
    };
    return addMockCustomerUser(newUser);
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
