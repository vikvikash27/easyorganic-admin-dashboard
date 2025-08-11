import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Table, { ColumnDefinition } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { SpinnerIcon } from "../components/icons";
import { Order, OrderStatus } from "../types";
import { useSocket } from "../hooks/useSocket";

const API_URL = "http://localhost:3001";

const statusFilters: (OrderStatus | "All")[] = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];
const updatableStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const OrderStatusSelector: React.FC<{
  order: Order;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}> = ({ order, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as OrderStatus;
    setIsLoading(true);
    try {
      await fetch(
        `${API_URL}/api/orders/${encodeURIComponent(order.id)}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      // The parent component will receive a socket event to update the state
      // but we can update it locally for immediate feedback.
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      setIsLoading(false);
    }
  };

  // An order cannot be changed if it's already delivered or cancelled by an admin
  if (order.status === "Delivered" || order.status === "Cancelled") {
    return (
      <Badge color={order.status === "Delivered" ? "green" : "red"}>
        {order.status}
      </Badge>
    );
  }

  return (
    <div className="relative">
      <select
        value={currentStatus}
        onChange={handleSelectChange}
        disabled={isLoading}
        className="pl-3 pr-8 py-1.5 border border-slate-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary"
      >
        {updatableStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {isLoading && (
        <SpinnerIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
      )}
    </div>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderStatus | "All">("All");
  const { socket } = useSocket();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(
          data.sort(
            (a: Order, b: Order) =>
              new Date(b.orderTimestamp).getTime() -
              new Date(a.orderTimestamp).getTime()
          )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewOrder = (newOrder: Order) => {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    };

    const handleOrderUpdate = (updatedOrder: Order) => {
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
      );
    };

    socket.on("new_order", handleNewOrder);
    socket.on("order_updated", handleOrderUpdate);

    return () => {
      socket.off("new_order", handleNewOrder);
      socket.off("order_updated", handleOrderUpdate);
    };
  }, [socket]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    // Optimistically update UI while waiting for socket event
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const columns: ColumnDefinition<Order>[] = [
    { accessor: "id", header: "Order ID" },
    { accessor: "customerName", header: "Customer" },
    {
      accessor: "orderTimestamp",
      header: "Timestamp",
      cell: (item) => new Date(item.orderTimestamp).toLocaleString(),
    },
    {
      accessor: "total",
      header: "Total",
      cell: (item) => `₹${item.total.toFixed(2)}`,
    },
    {
      accessor: "status",
      header: "Status",
      cell: (item) => (
        <Badge
          color={
            item.status === "Delivered"
              ? "green"
              : item.status === "Shipped" || item.status === "Out for Delivery"
              ? "blue"
              : item.status === "Processing"
              ? "yellow"
              : item.status === "Pending"
              ? "gray"
              : "red"
          }
        >
          {item.status}
        </Badge>
      ),
    },
    {
      accessor: "id",
      header: "Actions",
      cell: (item) => (
        <OrderStatusSelector order={item} onStatusChange={handleStatusChange} />
      ),
    },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <SpinnerIcon className="h-8 w-8 text-brand-primary" />
        </div>
      );
    }
    if (error) {
      return <div className="text-red-500 text-center p-8">Error: {error}</div>;
    }
    return (
      <Table
        data={filteredOrders}
        columns={columns}
        rowClassName={(order) =>
          order.status === "Cancelled" ? "bg-red-50 hover:bg-red-100" : ""
        }
      />
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
      <Card>
        <div className="p-4 flex space-x-2 border-b border-slate-200 overflow-x-auto">
          {statusFilters.map((status) => (
            <Button
              key={status}
              variant={filter === status ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter(status)}
              className="flex-shrink-0"
            >
              {status}
            </Button>
          ))}
        </div>
        {renderContent()}
      </Card>
    </div>
  );
};

export default Orders;
