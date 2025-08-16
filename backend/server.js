// --- Imports and Initial Setup ---
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const connectDB = require('./db');
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const PORT = process.env.PORT || 3001;

// --- Connect to Database ---
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// --- Helper Functions ---
const getDashboardStats = async () => {
    try {
        const totalRevenueResult = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;
        const newOrdersCount = await Order.countDocuments({ status: 'Pending' });
        const totalProducts = await Product.countDocuments();
        const recentOrders = await Order.find().sort({ orderTimestamp: -1 }).limit(5);
        return { totalRevenue, newOrdersCount, totalProducts, recentOrders };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return { totalRevenue: 0, newOrdersCount: 0, totalProducts: 0, recentOrders: [] };
    }
};

// --- API Endpoints ---

// Product Endpoints
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, category, price, stock, description, imageUrl, fssai } = req.body;
        if (!name || !category || price === undefined || stock === undefined) {
            return res.status(400).send('Missing required product fields');
        }
        const newProduct = new Product({
            name, category, price, stock, description, fssai,
            imageUrl: imageUrl || `https://picsum.photos/seed/${name.replace(/\s+/g, '')}/400`,
        });
        await newProduct.save();
        io.emit('stats_update', await getDashboardStats());
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid Product ID');
        }
        const product = await Product.findById(req.params.id);
        if (product) res.json(product);
        else res.status(404).send('Product not found');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid Product ID');
        }
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        
        // Update fields from request body
        Object.assign(product, req.body);
        
        await product.save();

        io.emit('stats_update', await getDashboardStats());
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send('Invalid Product ID');
        }
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        io.emit('stats_update', await getDashboardStats());
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Order Endpoints
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderTimestamp: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
           return res.status(400).send('Invalid Order ID');
        }
        const order = await Order.findById(orderId);
        if (order) res.json(order);
        else res.status(404).send('Order not found');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/orders/by-customer', async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) return res.status(400).send('Email query parameter is required');
        const customerOrders = await Order.find({ customerEmail: { $regex: new RegExp(`^${email}$`, 'i') } }).sort({ orderTimestamp: -1 });
        res.json(customerOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { customer, items, total, paymentMethod, address } = req.body;
        if (!customer || !customer.name || !customer.email || !Array.isArray(items) || items.length === 0 || typeof total === 'undefined' || !address) {
            return res.status(400).json({ message: 'Missing or invalid order data.' });
        }
        
        const now = new Date();
        const newOrder = new Order({
            customerName: customer.name,
            customerEmail: customer.email,
            orderTimestamp: now,
            total,
            status: 'Pending',
            items,
            paymentMethod,
            address,
            transactionId: `txn_${Date.now()}`,
            statusHistory: [{ status: 'Pending', timestamp: now }]
        });

        await newOrder.save();
        io.emit('new_order', newOrder);
        io.emit('stats_update', await getDashboardStats());
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { status, notes } = req.body;
        const orderId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid Order ID');
        }
        
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).send('Order not found');

        order.status = status;
        order.statusHistory.push({ status, timestamp: new Date(), notes });
        await order.save();
        
        io.emit('order_updated', order);
        io.emit('stats_update', await getDashboardStats());
        if (status === 'Cancelled') {
            io.emit('order_cancelled', { ...order.toJSON(), message: 'Refund may be required.' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/orders/:id/cancel', async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).send('Invalid Order ID');
        }
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).send('Order not found');
        
        if (order.status !== 'Pending') {
            return res.status(400).json({ message: 'This order cannot be cancelled as it is already being processed.' });
        }

        order.status = 'Cancelled';
        order.statusHistory.push({ status: 'Cancelled', timestamp: new Date(), notes: 'Cancelled by customer' });
        await order.save();
        
        io.emit('order_updated', order);
        io.emit('stats_update', await getDashboardStats());
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Customer/User Endpoints
app.get('/api/customers', async (req, res) => {
    try {
        // This pipeline aggregates orders to get customer spending stats,
        // then joins with the users collection to get customer details.
        const customerData = await Order.aggregate([
            { $match: { status: { $ne: 'Cancelled' } } },
            { 
                $group: { 
                    _id: "$customerEmail", 
                    totalSpent: { $sum: "$total" }, 
                    lastOrder: { $max: "$orderTimestamp" } 
                } 
            },
            {
                $lookup: {
                    from: 'users',
                    let: { customerEmail: { $toLower: "$_id" } },
                    pipeline: [
                        { $match: { $expr: { $eq: [ { $toLower: "$email" }, "$$customerEmail" ] } } }
                    ],
                    as: 'userInfo'
                }
            },
            { $unwind: "$userInfo" },
            {
                $project: {
                    _id: 0,
                    id: "$userInfo._id",
                    name: "$userInfo.name",
                    email: "$userInfo.email",
                    avatar: "$userInfo.avatar",
                    totalSpent: "$totalSpent",
                    lastOrder: { $dateToString: { format: "%Y-%m-%d", date: "$lastOrder" } }
                }
            }
        ]);
        res.json(customerData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/api/customers/login', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).send('Email is required');
        const foundUser = await User.findOne({ email: email.toLowerCase() });
        if (foundUser) res.json(foundUser);
        else res.status(404).send('User not found');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/customers', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) return res.status(400).send('Name and email are required');
        
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).send('User with this email already exists.');
        }

        const newUser = new User({
            name,
            email,
            avatar: `https://i.pravatar.cc/150?u=${email}`
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Dashboard & General Endpoints
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        const stats = await getDashboardStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/', (req, res) => res.send('EasyOrganic Admin Backend is running.'));

// --- Socket.IO Connection ---
io.on('connection', (socket) => {
  console.log('An admin client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('An admin client disconnected:', socket.id);
  });
});

// --- Start Server ---
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
