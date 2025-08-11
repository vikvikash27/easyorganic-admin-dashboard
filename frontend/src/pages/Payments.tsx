import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Table, { ColumnDefinition } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { SpinnerIcon } from "../components/icons";
import { Order } from "../types";

const API_URL = "http://localhost:3001";

const Payments: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders`);
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        setOrders(data);
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

  const handleDownloadPdf = (order: Order) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("EasyOrganic - Payment Receipt", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 105, 27, {
      align: "center",
    });

    // Order Details
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 40);
    doc.text(`Transaction ID: ${order.transactionId}`, 20, 47);
    doc.text(
      `Order Date: ${new Date(order.orderTimestamp).toLocaleDateString()}`,
      20,
      54
    );

    // Customer Details
    doc.text(`Customer: ${order.customerName}`, 120, 40);
    doc.text(`Email: ${order.customerEmail}`, 120, 47);

    // Line separator
    doc.line(20, 65, 190, 65);

    // Items Table
    let y = 75;
    doc.setFont("helvetica", "bold");
    doc.text("Product", 20, y);
    doc.text("Qty", 130, y);
    doc.text("Price", 150, y);
    doc.text("Total", 170, y);
    doc.setFont("helvetica", "normal");
    y += 7;

    order.items.forEach((item) => {
      doc.text(item.productName, 20, y);
      doc.text(item.quantity.toString(), 130, y);
      doc.text(`₹${item.price.toFixed(2)}`, 150, y);
      doc.text(`₹${(item.quantity * item.price).toFixed(2)}`, 170, y);
      y += 7;
    });

    // Totals
    doc.line(20, y + 5, 190, y + 5);
    y += 12;
    doc.setFont("helvetica", "bold");
    doc.text("Payment Method:", 120, y);
    doc.text("Total Amount:", 120, y + 7);

    doc.setFont("helvetica", "normal");
    doc.text(order.paymentMethod, 170, y);
    doc.text(`₹${order.total.toFixed(2)}`, 170, y + 7);

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, y + 25, { align: "center" });

    doc.save(`receipt-${order.id}.pdf`);
  };

  const columns: ColumnDefinition<Order>[] = [
    { accessor: "transactionId", header: "Transaction ID" },
    { accessor: "id", header: "Order ID" },
    { accessor: "customerName", header: "Customer" },
    {
      accessor: "orderTimestamp",
      header: "Date",
      cell: (item) => new Date(item.orderTimestamp).toLocaleDateString(),
    },
    {
      accessor: "total",
      header: "Amount",
      cell: (item) => `₹${item.total.toFixed(2)}`,
    },
    {
      accessor: "status",
      header: "Order Status",
      cell: (item) => (
        <Badge
          color={
            item.status === "Delivered"
              ? "green"
              : item.status === "Shipped"
              ? "blue"
              : item.status === "Pending"
              ? "yellow"
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
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleDownloadPdf(item)}
        >
          Download PDF
        </Button>
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
    return <Table data={orders} columns={columns} />;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Payments</h1>
      <Card>{renderContent()}</Card>
    </div>
  );
};

export default Payments;
