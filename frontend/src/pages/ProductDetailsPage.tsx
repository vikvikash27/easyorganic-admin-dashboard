import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { SpinnerIcon } from '../components/icons';
import Button from '../components/ui/Button';

const API_URL = 'http://localhost:3001';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <SpinnerIcon className="h-10 w-10 text-brand-primary" />
      </div>
    );
  }

  if (error || !product) {
    return <p className="text-center text-red-500 py-20">{error || 'Product could not be loaded.'}</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-800">{product.name}</h1>
          <p className="text-lg text-slate-500 mt-2">{product.category}</p>
          <p className="text-3xl font-bold text-brand-primary my-4">₹{product.price.toFixed(2)}</p>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
          <div className="mt-6 flex items-center gap-4">
             <input 
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
                min="1"
             />
            <Button onClick={() => addToCart(product, quantity)} size="lg" disabled={product.stock === 0}>
               {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;