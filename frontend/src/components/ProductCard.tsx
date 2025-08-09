import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import Button from './ui/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking the button
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
        <div className="relative overflow-hidden h-48">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-800 truncate">{product.name}</h3>
          <p className="text-sm text-slate-500">{product.category}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-brand-primary">₹{product.price.toFixed(2)}</p>
            <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;