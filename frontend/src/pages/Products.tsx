import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Table, { ColumnDefinition } from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { SpinnerIcon } from "../components/icons";
import { Product } from "../types";
import AddProductModal, {
  ProductFormData,
} from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import ActionMenu from "../components/ui/ActionMenu";

const API_URL = "http://localhost:3001";

// This page displays a list of all products and allows for management actions.
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (productData: ProductFormData) => {
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to add product.");
    }
    setIsAddModalOpen(false);
    fetchProducts(); // Refetch products to show the new one
  };

  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      fetchProducts(); // Refetch products after deletion
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete product."
      );
      // Optional: show a toast notification for the error
    }
  };

  const handleUpdateProduct = async (productData: ProductFormData) => {
    if (!selectedProduct) return;

    const response = await fetch(
      `${API_URL}/api/products/${selectedProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productData,
          price: Number(productData.price),
          stock: Number(productData.stock),
        }),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to update product.");
    }
    setIsEditModalOpen(false);
    fetchProducts();
  };

  const columns: ColumnDefinition<Product>[] = [
    {
      accessor: "name",
      header: "Product",
      cell: (item) => (
        <div className="flex items-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-10 h-10 rounded-md object-cover mr-4"
          />
          <div>
            <div className="font-medium text-slate-800">{item.name}</div>
            <div className="text-sm text-slate-500">{item.category}</div>
          </div>
        </div>
      ),
    },
    {
      accessor: "price",
      header: "Price",
      cell: (item) => `₹${item.price.toFixed(2)}`,
    },
    {
      accessor: "stock",
      header: "Stock",
    },
    {
      accessor: "status",
      header: "Status",
      cell: (item) => (
        <Badge
          color={
            item.status === "In Stock"
              ? "green"
              : item.status === "Low Stock"
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
        <ActionMenu
          actions={[
            { label: "Edit", onClick: () => handleOpenEditModal(item) },
            {
              label: "Delete",
              onClick: () => handleDeleteProduct(item.id),
              isDanger: true,
            },
          ]}
        />
      ),
    },
  ];

  const renderContent = () => {
    if (loading && products.length === 0) {
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
        <Button onClick={() => setIsAddModalOpen(true)}>Add Product</Button>
      </div>
      <Card>{renderContent()}</Card>
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
      {selectedProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateProduct={handleUpdateProduct}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Products;
