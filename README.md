# EasyOrganic Full-Stack E-Commerce Platform

This repository contains a complete full-stack e-commerce application. It features a customer-facing storefront for shopping and a comprehensive admin dashboard for managing the store.

## Features

### 🛒 Customer Storefront

- **Browse Products**: View all available products on the home page.
- **Product Details**: Click on any product to see a detailed description.
- **Shopping Cart**: Add/remove items and update quantities.
- **Location-Based Checkout**: A multi-step checkout process with an interactive Google Map to pin the delivery address.
- **Order Confirmation**: A "Thank You" page after placing an order.

### ⚙️ Admin Dashboard

- **Secure Login**: Role-based access for administrators.
- **Analytics Dashboard**: View key metrics like total revenue, new orders, and recent activity.
- **Product Management**: View all products in a structured table.
- **Order Management**: View and filter all customer orders by status.
- **Customer Management**: See a list of all registered customers.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **APIs**: Google Maps API (for location picker)

## Directory Structure

- `frontend/`: Contains the complete React/Vite frontend application. This includes both the customer storefront and the admin panel code.
- `backend/`: Contains the Node.js/Express backend API server that provides data to the frontend.

---

## Local Development Setup

Follow these steps to run both the frontend and backend servers on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- npm (comes with Node.js)

### Step 1: Add Google Maps API Key (Required for Checkout)

The checkout page uses the Google Maps API to allow customers to pin their delivery location.

1.  Obtain a Google Maps API Key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview). Make sure it has the **Maps JavaScript API** and **Places API** enabled.
2.  Open the file `frontend/index.html`.
3.  Find the line with the Google Maps script tag.
4.  Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key:

    ````html
    <!-- BEFORE -->
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places"></script>

    <!-- AFTER -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSy...your...actual...key&libraries=places"></script>
    ``` > **Note:** Without a valid API key, the map on the checkout page will
    not load.
    ````

### Step 2: Running the Backend Server

The backend server must be running for the frontend to fetch data.

1.  Open a new terminal window.
2.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
3.  Install the necessary dependencies:
    ```sh
    npm install
    ```
4.  Start the server:
    ```sh
    npm start
    ```
    The backend API will now be running at `http://localhost:3001`. Keep this terminal window open.

### Step 3: Running the Frontend Application

1.  Open a **second, separate** terminal window.
2.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Start the Vite development server:
    `sh
npm run dev
`
    The application will now be available at the local address shown in your terminal (usually `http://localhost:5173`).

---

## How to Use the Application

Once both servers are running, you can explore the two parts of the application.

### Customer Storefront

- **URL**: `http://localhost:5173`
- **Flow**:
  1.  Browse products on the home page.
  2.  Click "Add to Cart" or view product details.
  3.  Navigate to the cart by clicking the cart icon in the header.
  4.  Proceed to checkout, fill in your address, and use the "Pin Location on Map" button.
  5.  Place the order to see the confirmation page.

### Admin Dashboard

- **URL**: `http://localhost:5173/admin/login`
- **Credentials**: Use the following mock credentials to log in:
  - **Email**: `admin@example.com` / **Password**: `password`
  - **Email**: `manager@example.com` / **Password**: `password`
  - **Email**: `staff@example.com` / **Password**: `password`
- After logging in, you can navigate through the dashboard, products, orders, and customers pages using the sidebar.
