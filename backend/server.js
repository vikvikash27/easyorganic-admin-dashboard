const express = require("express");
const cors = require("cors");

const app = express();
// Use the PORT environment variable in production, or 3001 for local development
const PORT = process.env.PORT || 3001;

// Mock Data (copied from frontend/src/mockData.ts for simplicity)
const mockProducts = [
  {
    id: "prod-001",
    name: "Wildflower Honey",
    category: "Honey",
    price: 280,
    stock: 150,
    status: "In Stock",
    imageUrl: "https://picsum.photos/seed/honey1/400",
    description:
      "A delightful and aromatic honey sourced from a variety of wildflowers, perfect for tea, toast, or baking.",
  },
  {
    id: "prod-002",
    name: "Acacia Honey",
    category: "Honey",
    price: 350,
    stock: 45,
    status: "In Stock",
    imageUrl: "https://picsum.photos/seed/honey2/400",
    description:
      "Light and clear with a mild, sweet flavor, Acacia honey is a versatile favorite that resists crystallization.",
  },
  {
    id: "prod-003",
    name: "Manuka Honey",
    category: "Honey",
    price: 950,
    stock: 8,
    status: "Low Stock",
    imageUrl: "https://picsum.photos/seed/honey3/400",
    description:
      "Known for its unique antibacterial properties, this rich, earthy honey from New Zealand is a premium wellness product.",
  },
  {
    id: "prod-004",
    name: "Organic Ghee",
    category: "Dairy",
    price: 650,
    stock: 0,
    status: "Out of Stock",
    imageUrl: "https://picsum.photos/seed/ghee/400",
    description:
      "Clarified butter made from the milk of grass-fed cows, our ghee is a lactose-free, high-heat cooking oil with a nutty flavor.",
  },
  {
    id: "prod-005",
    name: "Whole Wheat Flour",
    category: "Grains",
    price: 110,
    stock: 200,
    status: "In Stock",
    imageUrl: "https://picsum.photos/seed/flour/400",
    description:
      "Stone-ground from whole organic wheat berries, this flour is rich in fiber and perfect for rustic breads and rotis.",
  },
];

const mockOrders = [
  {
    id: "#A001",
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    date: "2024-05-20",
    total: 630,
    status: "Delivered",
    items: 2,
  },
  {
    id: "#A002",
    customerName: "Bob Williams",
    customerEmail: "bob@example.com",
    date: "2024-05-21",
    total: 950,
    status: "Shipped",
    items: 1,
  },
  {
    id: "#A003",
    customerName: "Charlie Brown",
    customerEmail: "charlie@example.com",
    date: "2024-05-21",
    total: 280,
    status: "Pending",
    items: 1,
  },
  {
    id: "#A004",
    customerName: "Diana Prince",
    customerEmail: "diana@example.com",
    date: "2024-05-22",
    total: 110,
    status: "Cancelled",
    items: 1,
  },
  {
    id: "#A005",
    customerName: "Ethan Hunt",
    customerEmail: "ethan@example.com",
    date: "2024-05-23",
    total: 760,
    status: "Shipped",
    items: 2,
  },
  {
    id: "#A006",
    customerName: "Jane Doe",
    customerEmail: "customer@example.com",
    date: "2024-05-24",
    total: 350,
    status: "Delivered",
    items: 1,
  },
  {
    id: "#A007",
    customerName: "Jane Doe",
    customerEmail: "customer@example.com",
    date: "2024-05-25",
    total: 110,
    status: "Shipped",
    items: 1,
  },
];

const mockCustomers = [
  {
    id: "cust-01",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?u=alice@example.com",
    totalSpent: 1890,
    lastOrder: "2024-05-20",
  },
  {
    id: "cust-02",
    name: "Bob Williams",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/150?u=bob@example.com",
    totalSpent: 950,
    lastOrder: "2024-05-21",
  },
  {
    id: "cust-03",
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/150?u=charlie@example.com",
    totalSpent: 420,
    lastOrder: "2024-05-21",
  },
  {
    id: "cust-04",
    name: "Diana Prince",
    email: "diana@example.com",
    avatar: "https://i.pravatar.cc/150?u=diana@example.com",
    totalSpent: 2500,
    lastOrder: "2024-05-22",
  },
];

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// API Endpoints
app.get("/api/products", (req, res) => {
  res.json(mockProducts);
});

app.get("/api/products/:id", (req, res) => {
  const product = mockProducts.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

app.get("/api/orders", (req, res) => {
  res.json(mockOrders);
});

app.get("/api/orders/by-customer", (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).send("Email query parameter is required");
  }
  const customerOrders = mockOrders.filter(
    (order) => order.customerEmail.toLowerCase() === email.toLowerCase()
  );
  res.json(customerOrders);
});

app.get("/api/customers", (req, res) => {
  res.json(mockCustomers);
});

app.get("/api/dashboard-stats", (req, res) => {
  const totalRevenue = mockOrders.reduce((acc, order) => acc + order.total, 0);
  const newOrdersCount = mockOrders.filter(
    (o) => o.status === "Pending"
  ).length;
  const totalProducts = mockProducts.length;
  const recentOrders = mockOrders.slice(0, 5);

  res.json({
    totalRevenue,
    newOrdersCount,
    totalProducts,
    recentOrders,
  });
});

app.get("/", (req, res) => {
  res.send("EasyOrganic Admin Backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
