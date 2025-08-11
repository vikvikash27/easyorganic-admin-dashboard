import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCustomerAuth } from "../hooks/useCustomerAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import MapInput from "../components/MapInput";
import { Address, CartItem } from "../types";
import { SpinnerIcon } from "../components/icons";

const API_URL = "http://localhost:3001";

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { customer } = useCustomerAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Card" | "COD">("Card");
  const [address, setAddress] = useState<Address>({
    fullName: customer?.name || "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    phone: "",
    location: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAddress((prev) => ({ ...prev, [id]: value }));
  };

  const handleMapAddressSelect = (details: {
    address: string;
    city: string;
    zip: string;
    lat: number;
    lng: number;
  }) => {
    setAddress((prev) => ({
      ...prev,
      street: details.address || prev.street,
      city: details.city || prev.city,
      zip: details.zip || prev.zip,
      location: { lat: details.lat, lng: details.lng },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const orderPayload = {
      customer,
      items: cartItems.map((item: CartItem) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cartTotal,
      address,
      paymentMethod,
    };

    if (paymentMethod === "Card") {
      // For card payments, navigate to the payment gateway page
      // and pass the order details in the navigation state.
      navigate("/payment-gateway", { state: { order: orderPayload } });
      setIsLoading(false); // Stop loading indicator on this page
      return;
    }

    // For COD, create the order directly
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        let errorMessage = "Failed to place order. Please try again.";
        const errorText = await response.text(); // Read body once
        try {
          // Try to parse as JSON
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If not JSON, use the raw text
          if (errorText && errorText.includes("Cannot POST")) {
            errorMessage =
              "Server error: Endpoint not found. Please contact support.";
          } else {
            errorMessage = errorText || errorMessage;
          }
        }
        throw new Error(errorMessage);
      }

      clearCart();
      navigate("/order-confirmation");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Checkout
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-5 gap-12"
      >
        <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <Input
              label="Full Name"
              id="fullName"
              value={address.fullName}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Street Address"
              id="street"
              value={address.street}
              onChange={handleInputChange}
              required
              placeholder="House No. & Street Name"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                id="city"
                value={address.city}
                onChange={handleInputChange}
                required
              />
              <Input
                label="State / Province"
                id="state"
                value={address.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="ZIP / Postal Code"
                id="zip"
                value={address.zip}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Country"
                id="country"
                value={address.country}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              label="Phone Number"
              id="phone"
              type="tel"
              value={address.phone}
              onChange={handleInputChange}
              required
            />
            <div className="pt-4">
              <MapInput onLocationSelect={handleMapAddressSelect} />
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                Payment Method
              </h3>
              <div className="flex gap-4">
                <label
                  className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    paymentMethod === "Card"
                      ? "border-brand-primary bg-indigo-50"
                      : "border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={() => setPaymentMethod("Card")}
                    className="mr-2"
                  />
                  Card
                </label>
                <label
                  className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    paymentMethod === "COD"
                      ? "border-brand-primary bg-indigo-50"
                      : "border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mr-2"
                  />
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Your Order</h2>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span> <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span> <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span> <span>₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-4 text-center">{error}</p>
            )}
            <Button type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? (
                <SpinnerIcon className="mx-auto" />
              ) : (
                `Place Order (₹${cartTotal.toFixed(2)})`
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
