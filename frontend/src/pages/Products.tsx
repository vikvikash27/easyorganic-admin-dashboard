import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table, { ColumnDefinition } from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import { MoreVerticalIcon, SpinnerIcon } from '../components/icons';
import { Product } from '../types';

const API_URL = 'http://localhost:3001';

// This page displays a list of all products and allows for management actions.
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const columns: ColumnDefinition<Product>[] = [
    {
      accessor: 'name',
      header: 'Product',
      cell: (item) => (
        <div className="flex items-center">
          <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-md object-cover mr-4" />
          <div>
            <div className="font-medium text-slate-800">{item.name}</div>
            <div className="text-sm text-slate-500">{item.category}</div>
          </div>
        </div>
      ),
    },
    {
      accessor: 'price',
      header: 'Price',
      cell: (item) => `₹${item.price.toFixed(2)}`,
    },
    {
      accessor: 'stock',
      header: 'Stock',
    },
    {
      accessor: 'status',
      header: 'Status',
      cell: (item) => (
        <Badge color={item.status === 'In Stock' ? 'green' : item.status === 'Low Stock' ? 'yellow' : 'red'}>
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
    return <Table data={products} columns={columns} />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Products</h1>
        <Button>Add Product</Button>
      </div>
      <Card>
        {renderContent()}
      </Card>
    </div>
  );
};

export default Products;