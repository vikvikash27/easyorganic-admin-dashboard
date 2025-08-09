import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCustomerAuth } from "../hooks/useCustomerAuth";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import MapInput from "../components/MapInput";
import LocationSelectorModal from "../components/LocationSelectorModal";
import { Address } from "../types";

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { customer } = useCustomerAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    // Optimistically update location for map preview
    setAddress((prev) => ({ ...prev, location }));

    // Check if Google Maps API and Geocoder are available
    if (!window.google || !window.google.maps.Geocoder) {
      console.error("Google Maps Geocoder not available.");
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const addressComponents = results[0].address_components;
        const get = (type: string) =>
          addressComponents.find((c) => c.types.includes(type))?.long_name ||
          "";

        const streetNumber = get("street_number");
        const route = get("route");
        const street = `${streetNumber} ${route}`.trim();

        const city = get("locality") || get("administrative_area_level_3");
        const state = get("administrative_area_level_1");
        const zip = get("postal_code");
        const country = get("country");

        setAddress((prev) => ({
          ...prev,
          street: street || prev.street,
          city: city || prev.city,
          state: state || prev.state,
          zip: zip || prev.zip,
          country: country || prev.country,
        }));
      } else {
        console.error(
          `Geocode was not successful for the following reason: ${status}`
        );
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", {
      address,
      items: cartItems,
      total: cartTotal,
    });
    clearCart();
    navigate("/order-confirmation");
  };

  // This check is now handled by CustomerProtectedRoute, but it's good for safety.
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
              <MapInput
                selectedLocation={address.location ?? null}
                onLocationSelect={handleLocationSelect}
                onOpenModal={() => setIsModalOpen(true)}
              />
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
            <Button type="submit" className="w-full mt-6">
              Place Order
            </Button>
          </div>
        </div>
      </form>
      <LocationSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLocationSelect}
        currentLocation={address.location}
      />
    </div>
  );
};

export default CheckoutPage;
