//import React, { createContext, useState, useEffect, ReactNode } from 'react';
//import { User } from '../types';
//import { mockUsers } from '../mockData';

//interface AuthContextType {
//user: User | null;
//loading: boolean;
//login: (email: string) => Promise<void>;
//logout: () => void;
//}

//export const AuthContext = createContext<AuthContextType | undefined>(undefined);

//interface AuthProviderProps {
//children: ReactNode;
//}

// This provider component wraps the application and makes auth object
// available to any child component that calls useAuth().
//export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
// const [user, setUser] = useState<User | null>(null);
//const [loading, setLoading] = useState(true);

// useEffect(() => {
// On initial load, try to get user from localStorage
// try {
// const storedUser = localStorage.getItem('admin-user');
//if (storedUser) {
//  setUser(JSON.parse(storedUser));
// }
//} catch (error) {
//console.error("Failed to parse user from localStorage", error);
//localStorage.removeItem('admin-user');
//} finally {
//setLoading(false);
//}
//}, []);

// Mock login function
//const login = async (email: string): Promise<void> => {
//setLoading(true);
//return new Promise((resolve, reject) => {
//setTimeout(() => {
//const foundUser = mockUsers[email.toLowerCase()];
//if (foundUser) {
//setUser(foundUser);
//localStorage.setItem('admin-user', JSON.stringify(foundUser));
//resolve();
//} else {
//reject(new Error("User not found"));
//}
//setLoading(false);
//}, 1000); // Simulate network delay
//});
//};

// Logout function
//const logout = () => {
//setUser(null);
//localStorage.removeItem('admin-user');
//};

//const value = { user, loading, login, logout };

// Don't render children until loading is false
//return (
//<AuthContext.Provider value={value}>
//{children}
//</AuthContext.Provider>
//);
//};
