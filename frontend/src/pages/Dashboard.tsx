import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useSocket } from "../hooks/useSocket";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import { OrderIcon, ProductIcon, SpinnerIcon } from "../components/icons";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { Order } from "../types";

interface DashboardStats {
  totalRevenue: number;
  newOrdersCount: number;
  totalProducts: number;
  recentOrders: Order[];
}

const API_URL = "http://localhost:3001";

const Dashboard: React.FC = () => {
  const { user } = useAdminAuth();
  const { socket } = useSocket();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/dashboard-stats`);
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleStatsUpdate = (newStats: DashboardStats) => {
      console.log("Received stats update:", newStats);
      setStats(newStats);
    };

    socket.on("stats_update", handleStatsUpdate);

    return () => {
      socket.off("stats_update", handleStatsUpdate);
    };
  }, [socket]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <SpinnerIcon className="h-8 w-8 text-brand-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">
        Welcome back, {user?.name.split(" ")[0]}!
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${stats?.totalRevenue.toLocaleString() ?? 0}`}
          icon={<span className="text-2xl">💰</span>}
          color="green"
        />
        <StatCard
          title="Pending Orders"
          value={stats?.newOrdersCount.toString() ?? "0"}
          icon={<OrderIcon className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts.toString() ?? "0"}
          icon={<ProductIcon className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="Conversion Rate"
          value="2.5%"
          icon={<span className="text-2xl">📈</span>}
          color="red"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Recent Orders
            </h3>
            <ul className="space-y-4">
              {stats?.recentOrders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-sm text-slate-700">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-slate-500">{order.id}</p>
                  </div>
                  <Badge
                    color={
                      order.status === "Delivered"
                        ? "green"
                        : order.status === "Shipped"
                        ? "blue"
                        : order.status === "Pending"
                        ? "yellow"
                        : "red"
                    }
                  >
                    {order.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
