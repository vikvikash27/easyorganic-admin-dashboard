const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for this example
    methods: ["GET", "POST", "PUT"],
  },
});

const PORT = process.env.PORT || 3001;

// --- Mock Data Store ---
let mockProducts = [
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
    fssai: "10012011000001",
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
    fssai: "10012011000002",
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
    fssai: "10012011000003",
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
    fssai: "10012011000004",
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
    fssai: "10012011000005",
  },
];

let mockOrders = [
  {
    id: "#A001",
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    orderTimestamp: "2024-05-20T10:30:05.123Z",
    total: 630,
    status: "Delivered",
    items: [
      {
        productId: "prod-001",
        productName: "Wildflower Honey",
        quantity: 1,
        price: 280,
      },
      {
        productId: "prod-002",
        productName: "Acacia Honey",
        quantity: 1,
        price: 350,
      },
    ],
    paymentMethod: "Card",
    transactionId: `txn_${Date.now() - 500000}`,
    address: {
      fullName: "Alice Johnson",
      street: "456 Oak Avenue",
      city: "Metropolis",
      state: "State",
      zip: "12345",
      country: "India",
      phone: "9876543210",
      location: { lat: 28.6139, lng: 77.209 },
    },
    statusHistory: [
      { status: "Pending", timestamp: "2024-05-20T10:30:10.123Z" },
      { status: "Processing", timestamp: "2024-05-20T11:00:00.000Z" },
      {
        status: "Shipped",
        timestamp: "2024-05-20T18:00:00.000Z",
        notes: "Carrier: BlueDart, Tracking: BD12345",
      },
      { status: "Out for Delivery", timestamp: "2024-05-21T09:00:00.000Z" },
      { status: "Delivered", timestamp: "2024-05-21T14:35:10.000Z" },
    ],
  },
  {
    id: "#A002",
    customerName: "Bob Williams",
    customerEmail: "bob@example.com",
    orderTimestamp: "2024-05-21T11:45:30.456Z",
    total: 950,
    status: "Shipped",
    items: [
      {
        productId: "prod-003",
        productName: "Manuka Honey",
        quantity: 1,
        price: 950,
      },
    ],
    paymentMethod: "Card",
    transactionId: `txn_${Date.now() - 400000}`,
    address: {
      fullName: "Bob Williams",
      street: "789 Pine Street",
      city: "Gotham",
      state: "State",
      zip: "54321",
      country: "India",
      phone: "9876543211",
      location: { lat: 19.076, lng: 72.8777 },
    },
    statusHistory: [
      { status: "Pending", timestamp: "2024-05-21T11:45:35.456Z" },
      { status: "Processing", timestamp: "2024-05-21T12:30:00.000Z" },
      {
        status: "Shipped",
        timestamp: "2024-05-22T10:00:00.000Z",
        notes: "Carrier: Delhivery, Tracking: DL67890",
      },
    ],
  },
  {
    id: "#A003",
    customerName: "Charlie Brown",
    customerEmail: "charlie@example.com",
    orderTimestamp: "2024-05-21T15:00:15.789Z",
    total: 280,
    status: "Pending",
    items: [
      {
        productId: "prod-001",
        productName: "Wildflower Honey",
        quantity: 1,
        price: 280,
      },
    ],
    paymentMethod: "COD",
    transactionId: `txn_${Date.now() - 300000}`,
    address: {
      fullName: "Charlie Brown",
      street: "123 Maple Lane",
      city: "Star City",
      state: "State",
      zip: "67890",
      country: "India",
      phone: "9876543212",
      location: { lat: 12.9716, lng: 77.5946 },
    },
    statusHistory: [
      { status: "Pending", timestamp: "2024-05-21T15:00:20.789Z" },
    ],
  },
  {
    id: "#A004",
    customerName: "Diana Prince",
    customerEmail: "diana@example.com",
    orderTimestamp: "2024-05-22T09:05:00.111Z",
    total: 110,
    status: "Cancelled",
    items: [
      {
        productId: "prod-005",
        productName: "Whole Wheat Flour",
        quantity: 1,
        price: 110,
      },
    ],
    paymentMethod: "Card",
    transactionId: `txn_${Date.now() - 200000}`,
    address: {
      fullName: "Diana Prince",
      street: "101 Amazon Trail",
      city: "Themyscira",
      state: "State",
      zip: "11223",
      country: "India",
      phone: "9876543213",
      location: { lat: 13.0827, lng: 80.2707 },
    },
    statusHistory: [
      { status: "Pending", timestamp: "2024-05-22T09:05:05.111Z" },
      {
        status: "Cancelled",
        timestamp: "2024-05-22T10:00:00.000Z",
        notes: "Cancelled by admin.",
      },
    ],
  },
];

let mockCustomers = [
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

const mockCustomerUsers = {
  "customer@example.com": {
    id: "cust-user-001",
    name: "Jane Doe",
    email: "customer@example.com",
  },
};

// --- Middleware ---
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// --- Helper Functions ---
const getDashboardStats = () => {
  const totalRevenue = mockOrders.reduce(
    (acc, order) => (order.status !== "Cancelled" ? acc + order.total : acc),
    0
  );
  const newOrdersCount = mockOrders.filter(
    (o) => o.status === "Pending"
  ).length;
  const totalProducts = mockProducts.length;
  const recentOrders = [...mockOrders]
    .sort(
      (a, b) =>
        new Date(b.orderTimestamp).getTime() -
        new Date(a.orderTimestamp).getTime()
    )
    .slice(0, 5);
  return { totalRevenue, newOrdersCount, totalProducts, recentOrders };
};

// --- API Endpoints ---
app.get("/api/products", (req, res) => res.json(mockProducts));
app.post("/api/products", (req, res) => {
  const { name, category, price, stock, description, imageUrl, fssai } =
    req.body;
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).send("Missing required product fields");
  }
  const newProduct = {
    id: `prod-${Date.now()}`,
    name,
    category,
    price: Number(price),
    stock: Number(stock),
    status:
      Number(stock) > 10
        ? "In Stock"
        : Number(stock) > 0
        ? "Low Stock"
        : "Out of Stock",
    imageUrl:
      imageUrl || `https://picsum.photos/seed/${name.replace(/\s+/g, "")}/400`,
    description,
    fssai,
  };
  mockProducts.unshift(newProduct);
  io.emit("stats_update", getDashboardStats()); // Also update stats on new product
  res.status(201).json(newProduct);
});
app.get("/api/products/:id", (req, res) => {
  const product = mockProducts.find((p) => p.id === req.params.id);
  if (product) res.json(product);
  else res.status(404).send("Product not found");
});

app.get("/api/orders", (req, res) => res.json(mockOrders));

// NEW: Get a single order by ID
app.get("/api/orders/:id", (req, res) => {
  // The '#' in the ID needs to be URL encoded on the frontend.
  const orderId = decodeURIComponent(req.params.id);
  const order = mockOrders.find((o) => o.id === orderId);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send("Order not found");
  }
});

app.get("/api/orders/by-customer", (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).send("Email query parameter is required");
  const customerOrders = mockOrders.filter(
    (order) => order.customerEmail.toLowerCase() === email.toLowerCase()
  );
  res.json(
    customerOrders.sort(
      (a, b) =>
        new Date(b.orderTimestamp).getTime() -
        new Date(a.orderTimestamp).getTime()
    )
  );
});

// UPDATED: Customer places an order
app.post("/api/orders", (req, res) => {
  const { customer, items, total, paymentMethod, address } = req.body;
  if (
    !customer ||
    !customer.name ||
    !customer.email ||
    !Array.isArray(items) ||
    items.length === 0 ||
    typeof total === "undefined" ||
    !address
  ) {
    return res
      .status(400)
      .json({
        message:
          "Missing or invalid order data. Customer, items, total, and address are required.",
      });
  }

  const now = new Date().toISOString();

  const newOrder = {
    id: `#A${Date.now().toString().slice(-4)}`,
    customerName: customer.name,
    customerEmail: customer.email,
    orderTimestamp: now,
    total,
    status: "Pending",
    items,
    paymentMethod,
    address,
    transactionId: `txn_${Date.now()}`,
    statusHistory: [{ status: "Pending", timestamp: now }],
  };
  mockOrders.unshift(newOrder);

  // REAL-TIME: Emit events to admin clients
  io.emit("new_order", newOrder);
  io.emit("stats_update", getDashboardStats());

  res
    .status(201)
    .json({ message: "Order placed successfully", order: newOrder });
});

// UPDATED: Admin updates an order's status
app.put("/api/orders/:id/status", (req, res) => {
  const { status, notes } = req.body; // notes can be added by admin
  const orderId = decodeURIComponent(req.params.id);
  const order = mockOrders.find((o) => o.id === orderId);

  if (order) {
    order.status = status;
    const newStatusEvent = {
      status,
      timestamp: new Date().toISOString(),
      ...(notes && { notes }),
    };
    order.statusHistory.push(newStatusEvent);

    io.emit("order_updated", order);
    io.emit("stats_update", getDashboardStats());

    if (status === "Cancelled") {
      io.emit("order_cancelled", {
        ...order,
        message: "Refund may be required.",
      });
    }

    res.json(order);
  } else {
    res.status(404).send("Order not found");
  }
});

// NEW: Customer cancels an order
app.post("/api/orders/:id/cancel", (req, res) => {
  const orderId = decodeURIComponent(req.params.id);
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).send("Order not found");
  }

  if (order.status !== "Pending") {
    return res
      .status(400)
      .json({
        message:
          "This order cannot be cancelled as it is already being processed.",
      });
  }

  order.status = "Cancelled";
  order.statusHistory.push({
    status: "Cancelled",
    timestamp: new Date().toISOString(),
    notes: "Cancelled by customer",
  });

  // REAL-TIME: Emit events for status change and stats update
  io.emit("order_updated", order); // Use the same event as admin update
  io.emit("stats_update", getDashboardStats());

  res.json(order);
});

app.get("/api/customers", (req, res) => res.json(mockCustomers));
app.post("/api/customers/login", (req, res) => {
  const { email } = req.body;
  const foundUser = mockCustomerUsers[email.toLowerCase()];
  if (foundUser) res.json(foundUser);
  else res.status(404).send("User not found");
});
app.post("/api/customers", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).send("Name and email are required");
  if (
    mockCustomerUsers[email.toLowerCase()] ||
    mockCustomers.find((c) => c.email.toLowerCase() === email.toLowerCase())
  ) {
    return res.status(409).send("User with this email already exists.");
  }
  const newCustomer = {
    id: `cust-${Date.now()}`,
    name,
    email,
    avatar: `https://i.pravatar.cc/150?u=${email}`,
    totalSpent: 0,
    lastOrder: new Date().toISOString().split("T")[0],
  };
  mockCustomers.push(newCustomer);
  const newCustomerUser = { id: `cust-user-${Date.now()}`, name, email };
  mockCustomerUsers[email.toLowerCase()] = newCustomerUser;
  res.status(201).json(newCustomerUser);
});

app.get("/api/dashboard-stats", (req, res) => res.json(getDashboardStats()));
app.get("/", (req, res) => res.send("EasyOrganic Admin Backend is running."));

// --- Socket.IO Connection ---
io.on("connection", (socket) => {
  console.log("An admin client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("An admin client disconnected:", socket.id);
  });
});

// --- Start Server ---
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
