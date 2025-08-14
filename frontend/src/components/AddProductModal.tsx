import React, { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { CloseIcon, SpinnerIcon } from "./icons";

export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  stock: string;
  fssai: string;
  description: string;
  imageUrl: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (productData: ProductFormData) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [productData, setProductData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    stock: "",
    fssai: "",
    description: "",
    imageUrl: "", // This will hold the base64 string
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProductData((prev) => ({ ...prev, imageUrl: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await onAddProduct(productData);
      // Resetting form is handled by parent which closes and re-mounts on open
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">
              Add New Product
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full hover:bg-slate-100"
            >
              <CloseIcon className="w-6 h-6 text-slate-600" />
            </button>
          </div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Product Name"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price (₹)"
                name="price"
                type="number"
                step="0.01"
                value={productData.price}
                onChange={handleInputChange}
                required
              />
              <Input
                label="Stock Quantity"
                name="stock"
                type="number"
                value={productData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
            <Input
              label="FSSAI Number"
              name="fssai"
              value={productData.fssai}
              onChange={handleInputChange}
            />
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Product Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={productData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Product Image
              </label>
              <div className="mt-2 flex items-center gap-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-md object-cover border"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-brand-primary hover:file:bg-violet-100"
                />
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-b-lg flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <SpinnerIcon className="w-5 h-5" /> : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
