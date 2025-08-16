import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCustomerAuth } from '../hooks/useCustomerAuth';
import { Order, OrderStatus, Product } from '../types';
import { ChevronDownIcon, SpinnerIcon } from '../components/icons';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const API_URL = 'http://localhost:3001';

const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case 'Delivered': return 'green';
        case 'Shipped': return 'blue';
        case 'Out for Delivery': return 'blue';
        case 'Processing': return 'yellow';
        case 'Pending': return 'gray';
        case 'Cancelled': return 'red';
        default: return 'gray';
    }
};

const OrderHistoryPage: React.FC = () => {
    const { customer, loading: customerLoading } = useCustomerAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    useEffect(() => {
        // Wait until the authentication status is resolved.
        if (customerLoading) {
            return;
        }

        // After loading, if there's no customer email, show an error.
        if (!customer?.email) {
            setError("You must be logged in to view your order history.");
            setLoading(false);
            return;
        }

        const fetchOrderData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Step 1: Fetch orders for the logged-in customer.
                const ordersResponse = await fetch(`${API_URL}/api/orders/by-customer?email=${encodeURIComponent(customer.email)}`);
                if (!ordersResponse.ok) {
                    throw new Error('Failed to fetch orders.');
                }
                const ordersData: Order[] = await ordersResponse.json();
                setOrders(ordersData);

                // Step 2: If orders exist, fetch all products to get image URLs for display.
                if (ordersData.length > 0) {
                    const productsResponse = await fetch(`${API_URL}/api/products`);
                    if (productsResponse.ok) {
                        const productsData: Product[] = await productsResponse.json();
                        setProducts(productsData);
                    } else {
                        // This isn't a critical failure; images will just be missing.
                        console.warn('Could not fetch product details for images.');
                    }
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [customer, customerLoading]);

    const productMap = useMemo(() => {
        return products.reduce((map, product) => {
            map[product.id] = product;
            return map;
        }, {} as Record<string, Product>);
    }, [products]);

    const handleToggleExpand = (orderId: string) => {
        setExpandedOrderId(prev => (prev === orderId ? null : orderId));
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <SpinnerIcon className="h-8 w-8 text-brand-primary" />
                </div>
            );
        }

        if (error) {
            return <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg">Error: {error}</div>;
        }

        if (orders.length === 0) {
            return (
                <Card className="text-center py-16">
                    <h2 className="text-xl font-semibold text-slate-700">No Orders Found</h2>
                    <p className="text-slate-500 mt-2">You haven't placed any orders with us yet.</p>
                    <Link to="/">
                        <Button className="mt-6">Start Shopping</Button>
                    </Link>
                </Card>
            );
        }

        return (
            <div className="space-y-4">
                {orders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                        <Card key={order.id} className="p-0 overflow-hidden transition-shadow duration-300">
                            <div
                                className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 cursor-pointer hover:bg-slate-50"
                                onClick={() => handleToggleExpand(order.id)}
                                role="button"
                                aria-expanded={isExpanded}
                                aria-controls={`order-details-${order.id}`}
                            >
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-grow text-sm">
                                    <div>
                                        <p className="text-slate-500">Order ID</p>
                                        <p className="font-semibold text-slate-800 break-all">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Date Placed</p>
                                        <p className="font-semibold text-slate-800">{new Date(order.orderTimestamp).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Total</p>
                                        <p className="font-semibold text-slate-800">₹{order.total.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 justify-between">
                                     <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
                                     <ChevronDownIcon className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                            </div>
                            
                            {isExpanded && (
                                <div id={`order-details-${order.id}`} className="p-6 bg-slate-50/50 border-t border-slate-200 animate-fade-in-up" style={{animationDuration: '300ms'}}>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                                        <div className="md:col-span-3">
                                            <h4 className="font-semibold text-slate-800 mb-3">Items ({order.items.length})</h4>
                                            <ul className="space-y-4">
                                                {order.items.map(item => (
                                                    <li key={item.productId} className="flex items-center gap-4">
                                                        <img
                                                            src={productMap[item.productId]?.imageUrl || 'https://via.placeholder.com/150'}
                                                            alt={item.productName}
                                                            className="w-16 h-16 rounded-md object-cover border bg-white"
                                                        />
                                                        <div className="flex-grow">
                                                            <p className="font-medium text-slate-700">{item.productName}</p>
                                                            <p className="text-sm text-slate-500">Qty: {item.quantity} &times; ₹{item.price.toFixed(2)}</p>
                                                        </div>
                                                        <p className="font-semibold text-slate-800">₹{(item.quantity * item.price).toFixed(2)}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:col-span-2 space-y-4">
                                            {order.address && (
                                                <div>
                                                    <h4 className="font-semibold text-slate-800 mb-2">Shipping To</h4>
                                                    <div className="text-sm text-slate-600 bg-white p-3 rounded-md border">
                                                        <p className="font-bold">{order.address.fullName}</p>
                                                        <p>{order.address.street}</p>
                                                        <p>{order.address.city}, {order.address.state} {order.address.zip}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="font-semibold text-slate-800 mb-2">Payment Method</h4>
                                                <p className="text-sm text-slate-600 bg-white p-3 rounded-md border">{order.paymentMethod}</p>
                                            </div>
                                            <div className="pt-2">
                                                 <Link to={`/account/orders/${order.id}`} className="w-full">
                                                    <Button variant="secondary" className="w-full">View Full Details & Track</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Order History</h1>
                 <Link to="/account">
                    <Button variant="secondary">Back to Account</Button>
                </Link>
            </div>
            {renderContent()}
        </div>
    );
};

export default OrderHistoryPage;