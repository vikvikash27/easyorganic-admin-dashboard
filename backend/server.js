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
    date: "2024-05-20",
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
  },
  {
    id: "#A002",
    customerName: "Bob Williams",
    customerEmail: "bob@example.com",
    date: "2024-05-21",
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
  },
  {
    id: "#A003",
    customerName: "Charlie Brown",
    customerEmail: "charlie@example.com",
    date: "2024-05-21",
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
  },
  {
    id: "#A004",
    customerName: "Diana Prince",
    customerEmail: "diana@example.com",
    date: "2024-05-22",
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
  },
  {
    id: "#A005",
    customerName: "Ethan Hunt",
    customerEmail: "ethan@example.com",
    date: "2024-05-23",
    total: 760,
    status: "Shipped",
    items: [
      {
        productId: "prod-001",
        productName: "Wildflower Honey",
        quantity: 1,
        price: 280,
      },
      {
        productId: "prod-004",
        productName: "Organic Ghee",
        quantity: 1,
        price: 650,
        stock: 0,
      },
    ],
    paymentMethod: "Card",
    transactionId: `txn_${Date.now() - 100000}`,
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
  const recentOrders = [...mockOrders].reverse().slice(0, 5);

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
app.get("/api/orders/by-customer", (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).send("Email query parameter is required");
  const customerOrders = mockOrders.filter(
    (order) => order.customerEmail.toLowerCase() === email.toLowerCase()
  );
  res.json(customerOrders);
});

// NEW: Customer places an order
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
  const newOrder = {
    id: `#A${Date.now().toString().slice(-4)}`,
    customerName: customer.name,
    customerEmail: customer.email,
    date: new Date().toISOString().split("T")[0],
    total,
    status: "Pending",
    items,
    paymentMethod,
    address,
    transactionId: `txn_${Date.now()}`,
  };
  mockOrders.unshift(newOrder);

  // REAL-TIME: Emit events to admin clients
  io.emit("new_order", newOrder);
  io.emit("stats_update", getDashboardStats());

  res
    .status(201)
    .json({ message: "Order placed successfully", order: newOrder });
});

// NEW: Admin updates an order's status
app.put("/api/orders/:id/status", (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;
  const order = mockOrders.find((o) => o.id === orderId);

  if (order) {
    order.status = status;

    // REAL-TIME: Emit events for status change and stats update
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
