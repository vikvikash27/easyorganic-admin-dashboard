import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { CustomerAuthProvider } from "./contexts/CustomerAuthContext";
import { CartProvider } from "./contexts/CartContext";
import { LocationProvider } from "./contexts/LocationContext";
import { SocketProvider } from "./contexts/SocketContext";

// Layouts
import AdminLayout from "./components/layout/AdminLayout";
import MainLayout from "./components/layout/MainLayout";

// Core Components
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import CustomerProtectedRoute from "./components/CustomerProtectedRoute";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLoginPage from "./pages/AdminLoginPage";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Payments from "./pages/Payments";

// Public (Customer) Pages
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CustomerLoginPage from "./pages/CustomerLoginPage";
import CustomerSignupPage from "./pages/CustomerSignupPage";
import MyAccountPage from "./pages/MyAccountPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import PaymentGatewayPage from "./pages/PaymentGatewayPage";

function App() {
  return (
    <AdminAuthProvider>
      <CustomerAuthProvider>
        <CartProvider>
          <LocationProvider>
            <SocketProvider>
              <BrowserRouter>
                <Routes>
                  {/* Customer-Facing Storefront */}
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<HomePage />} />
                    <Route
                      path="products/:id"
                      element={<ProductDetailsPage />}
                    />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="login" element={<CustomerLoginPage />} />
                    <Route path="signup" element={<CustomerSignupPage />} />
                    <Route
                      path="checkout"
                      element={
                        <CustomerProtectedRoute>
                          <CheckoutPage />
                        </CustomerProtectedRoute>
                      }
                    />
                    <Route
                      path="payment-gateway"
                      element={
                        <CustomerProtectedRoute>
                          <PaymentGatewayPage />
                        </CustomerProtectedRoute>
                      }
                    />
                    <Route
                      path="order-confirmation"
                      element={<OrderConfirmationPage />}
                    />
                    <Route
                      path="account"
                      element={
                        <CustomerProtectedRoute>
                          <MyAccountPage />
                        </CustomerProtectedRoute>
                      }
                    />
                    <Route
                      path="account/orders"
                      element={
                        <CustomerProtectedRoute>
                          <OrderHistoryPage />
                        </CustomerProtectedRoute>
                      }
                    />
                  </Route>

                  {/* Admin Dashboard */}
                  <Route path="/admin/login" element={<AdminLoginPage />} />
                  <Route
                    path="/admin"
                    element={
                      <AdminProtectedRoute>
                        <AdminLayout />
                      </AdminProtectedRoute>
                    }
                  >
                    <Route
                      index
                      element={<Navigate to="/admin/dashboard" replace />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SocketProvider>
          </LocationProvider>
        </CartProvider>
      </CustomerAuthProvider>
    </AdminAuthProvider>
  );
}

export default App;
