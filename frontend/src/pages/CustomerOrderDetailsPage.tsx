import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { Order } from "../types";
import { SpinnerIcon } from "../components/icons";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import OrderTracker from "../components/OrderTracker";

const API_URL = "http://localhost:3001";

const CustomerOrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { socket } = useSocket();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/api/orders/${encodeURIComponent(id)}`
        );
        if (!response.ok) {
          throw new Error("Order not found");
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!socket || !id) return;

    const handleOrderUpdate = (updatedOrder: Order) => {
      if (updatedOrder.id === decodeURIComponent(id)) {
        setOrder(updatedOrder);
      }
    };

    socket.on("order_updated", handleOrderUpdate);

    return () => {
      socket.off("order_updated", handleOrderUpdate);
    };
  }, [socket, id]);

  const handleCancelOrder = async () => {
    if (!id) return;
    setIsCancelling(true);
    setCancelError("");
    try {
      const response = await fetch(
        `${API_URL}/api/orders/${encodeURIComponent(id)}/cancel`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel order.");
      }
      // The socket listener will update the state
    } catch (err) {
      setCancelError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <SpinnerIcon className="h-10 w-10 text-brand-primary" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-20 text-red-500">
        {error || "Could not load order details."}
      </div>
    );
  }

  const { address } = order;

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link
            to="/account/orders"
            className="text-brand-primary hover:underline"
          >
            &larr; Back to Order History
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            Order Details
          </h1>
          <p className="text-slate-500">
            Order #{order.id} &bull; Placed on{" "}
            {new Date(order.orderTimestamp).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Order Tracker */}
            <Card>
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Order Progress
              </h2>
              <OrderTracker
                statusHistory={order.statusHistory}
                currentStatus={order.status}
              />
            </Card>

            {/* Order Items */}
            <Card>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Items in this Order ({order.items.length})
              </h2>
              <ul className="divide-y divide-slate-200">
                {order.items.map((item) => (
                  <li
                    key={item.productId}
                    className="py-4 flex items-center gap-4"
                  >
                    {/* In a real app, you might fetch product image here or store it with the order */}
                    <div className="w-16 h-16 bg-slate-100 rounded-md flex-shrink-0"></div>
                    <div className="flex-grow">
                      <p className="font-semibold text-slate-700">
                        {item.productName}
                      </p>
                      <p className="text-sm text-slate-500">
                        Qty: {item.quantity} &times; ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-slate-800">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-8">
            {/* Shipping Address */}
            {address && (
              <Card>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-1 text-slate-600">
                  <p className="font-bold">{address.fullName}</p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                  <p>Phone: {address.phone}</p>
                </div>
              </Card>
            )}

            {/* Payment Summary */}
            <Card>
              <h2 className="text-xl font-semibold text-slate-800 mb-4">
                Payment Summary
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-slate-500 pt-2">
                  Paid via {order.paymentMethod}
                </p>
              </div>
            </Card>

            {/* Actions */}
            {order.status === "Pending" && (
              <Card>
                <h3 className="font-semibold text-slate-800 mb-2">
                  Need to make a change?
                </h3>
                {cancelError && (
                  <p className="text-sm text-red-600 mb-2">{cancelError}</p>
                )}
                <Button
                  variant="danger"
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="w-full"
                >
                  {isCancelling ? <SpinnerIcon /> : "Cancel Order"}
                </Button>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  You can only cancel your order while it is pending.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderDetailsPage;
