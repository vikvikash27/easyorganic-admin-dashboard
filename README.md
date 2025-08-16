
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
- **Backend**: Node.js, Express.js, **MongoDB**, **Mongoose**
- **APIs**: Google Maps API (for location picker)

## Directory Structure

-   `frontend/`: Contains the complete React/Vite frontend application.
-   `backend/`: Contains the Node.js/Express/MongoDB backend API server.

---

## Backend Database Setup

This application now uses MongoDB for data storage. You must set up a database and configure the backend to connect to it.

1.  **Install MongoDB**: Make sure you have a running instance of MongoDB. You can install it locally from the [official MongoDB website](https://www.mongodb.com/try/download/community) or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2.  **Create a `.env` file**: In the `backend` directory, create a new file named `.env`. This file will store your database connection string.

3.  **Add Connection String**: Open the `.env` file and add your MongoDB connection URI. If running locally, it will look like this:

    ```env
    # backend/.env
    MONGODB_URI=mongodb://127.0.0.1:27017/easyorganic
    ```
    Replace the URI with your own if you are using a different host or a cloud service.

> **Note:** The backend server will not start without a valid `MONGODB_URI` in the `.env` file.

## Local Development Setup

Follow these steps to run both the frontend and backend servers on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
-   npm (comes with Node.js)
-   A running MongoDB instance (see Database Setup above)

### Step 1: Add Google Maps API Key (Required for Checkout)

The checkout page uses the Google Maps API.

1.  Obtain a Google Maps API Key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview). Enable the **Maps JavaScript API** and **Places API**.
2.  Open the file `frontend/index.html`.
3.  Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual key.

### Step 2: Running the Backend Server

1.  Open a new terminal window.
2.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
3.  Install the necessary dependencies:
    ```sh
    npm install
    ```
4.  Ensure you have created and configured your `.env` file as described in the "Backend Database Setup" section.
5.  Start the server:
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
    ```sh
    npm run dev
    ```
The application will now be available at the local address shown in your terminal (usually `http://localhost:5173`).
