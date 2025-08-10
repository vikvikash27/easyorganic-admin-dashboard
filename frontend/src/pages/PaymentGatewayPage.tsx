import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { CreditCardIcon, SpinnerIcon, UpiIcon } from "../components/icons";

const API_URL = "http://localhost:3001";

type PaymentTab = "card" | "upi";

const PaymentGatewayPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // The order payload passed from the checkout page
  const order = location.state?.order;

  const [activeTab, setActiveTab] = useState<PaymentTab>("card");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [upiId, setUpiId] = useState("");

  // Redirect if order data is not available
  if (!order) {
    navigate("/checkout", { replace: true });
    return null;
  }

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Auto-format card number with spaces
    if (name === "number") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    }
    // Auto-format expiry date with a slash
    if (name === "expiry") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
          2
        )}`;
      }
    }
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }
    setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validatePaymentDetails = (): boolean => {
    setError("");
    if (activeTab === "card") {
      const cardNumber = cardDetails.number.replace(/\s/g, "");
      if (!/^\d{16}$/.test(cardNumber)) {
        setError("Please enter a valid 16-digit card number.");
        return false;
      }
      if (!cardDetails.name.trim()) {
        setError("Please enter the card holder name.");
        return false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
        setError("Please enter a valid expiry date in MM/YY format.");
        return false;
      }
      if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        setError("Please enter a valid 3 or 4-digit CVV.");
        return false;
      }
    }

    if (activeTab === "upi") {
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        setError("Please enter a valid UPI ID (e.g., yourname@okbank).");
        return false;
      }
    }
    return true;
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePaymentDetails()) return;

    setIsLoading(true);
    setError("");

    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        // After mock payment is 'successful', create the order in the backend
        const response = await fetch(`${API_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText ||
              "Payment was processed, but failed to create order. Please contact support."
          );
        }

        clearCart();
        navigate("/order-confirmation");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-xl mx-auto">
        <Card className="p-0">
          <div className="p-8 text-center bg-slate-50 rounded-t-lg">
            <h1 className="text-xl font-semibold text-slate-600">
              Complete Your Payment
            </h1>
            <p className="text-4xl font-bold text-slate-800 mt-2">
              ₹{order.total.toFixed(2)}
            </p>
          </div>

          <div className="p-8">
            <div className="flex border-b mb-6">
              <button
                className={`flex-1 py-3 text-center font-semibold flex items-center justify-center gap-2 ${
                  activeTab === "card"
                    ? "text-brand-primary border-b-2 border-brand-primary"
                    : "text-slate-500"
                }`}
                onClick={() => setActiveTab("card")}
              >
                <CreditCardIcon /> Credit/Debit Card
              </button>
              <button
                className={`flex-1 py-3 text-center font-semibold flex items-center justify-center gap-2 ${
                  activeTab === "upi"
                    ? "text-brand-primary border-b-2 border-brand-primary"
                    : "text-slate-500"
                }`}
                onClick={() => setActiveTab("upi")}
              >
                <UpiIcon className="w-5 h-5" /> UPI
              </button>
            </div>

            <form onSubmit={handlePayNow}>
              {activeTab === "card" && (
                <div
                  className="space-y-4 animate-fade-in-up"
                  style={{ animationDuration: "300ms" }}
                >
                  <Input
                    label="Card Number"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleCardInputChange}
                    placeholder="0000 0000 0000 0000"
                    required
                  />
                  <Input
                    label="Card Holder Name"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardInputChange}
                    placeholder="John Doe"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      name="cvv"
                      type="password"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>
              )}

              {activeTab === "upi" && (
                <div
                  className="space-y-4 animate-fade-in-up"
                  style={{ animationDuration: "300ms" }}
                >
                  <Input
                    label="UPI ID"
                    name="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@bank"
                    required
                  />
                  <p className="text-xs text-slate-500 text-center pt-2">
                    You will receive a payment request on your UPI app.
                  </p>
                </div>
              )}

              {error && (
                <p className="text-sm text-red-600 mt-4 text-center bg-red-50 p-3 rounded-md">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full mt-8"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <SpinnerIcon className="mx-auto" />
                ) : (
                  `Pay ₹${order.total.toFixed(2)}`
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentGatewayPage;
