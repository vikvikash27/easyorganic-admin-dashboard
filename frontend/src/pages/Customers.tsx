import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table, { ColumnDefinition } from '../components/ui/Table';
import { MoreVerticalIcon, SpinnerIcon } from '../components/icons';
import { Customer } from '../types';

const API_URL = 'http://localhost:3001';

// This page displays a list of all customers.
const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/customers`);
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const columns: ColumnDefinition<Customer>[] = [
    {
      accessor: 'name',
      header: 'Customer',
      cell: (item) => (
        <div className="flex items-center">
          <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover mr-4" />
          <div>
            <div className="font-medium text-slate-800">{item.name}</div>
            <div className="text-sm text-slate-500">{item.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessor: 'lastOrder',
      header: 'Last Order',
    },
    {
      accessor: 'totalSpent',
      header: 'Total Spent',
      cell: (item) => `₹${item.totalSpent.toFixed(2)}`,
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
    return <Table data={customers} columns={columns} />;
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
        <Button>Add Customer</Button>
      </div>
      <Card>
        {renderContent()}
      </Card>
    </div>
  );
};

export default Customers;