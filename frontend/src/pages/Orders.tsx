import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table, { ColumnDefinition } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { MoreVerticalIcon, SpinnerIcon } from '../components/icons';
import { Order, OrderStatus } from '../types';

const API_URL = 'http://localhost:3001';

// This page displays a list of all orders and allows filtering by status.
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  const columns: ColumnDefinition<Order>[] = [
    { accessor: 'id', header: 'Order ID' },
    { accessor: 'customerName', header: 'Customer' },
    { accessor: 'date', header: 'Date' },
    { accessor: 'total', header: 'Total', cell: (item) => `₹${item.total.toFixed(2)}` },
    {
      accessor: 'status',
      header: 'Status',
      cell: (item) => (
         <Badge color={item.status === 'Delivered' ? 'green' : item.status === 'Shipped' ? 'blue' : item.status === 'Pending' ? 'yellow' : 'red'}>
          {item.status}
        </Badge>
      )
    },
    {
      accessor: 'id',
      header: 'Actions',
      cell: () => (
        <Button variant="secondary" className="px-2 py-1">
          <MoreVerticalIcon className="h-5 w-5" />
        </Button>
      ),
    },
  ];
  
  const statusFilters: (OrderStatus | 'All')[] = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

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
    return <Table data={filteredOrders} columns={columns} />;
  };


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Orders</h1>
      <Card>
        <div className="p-4 flex space-x-2 border-b border-slate-200">
            {statusFilters.map(status => (
                <Button 
                    key={status}
                    variant={filter === status ? 'primary' : 'secondary'}
                    onClick={() => setFilter(status)}
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