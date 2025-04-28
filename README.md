# 🚖 RideEasy - Real-Time Ride Hailing App (MERN Stack)

Welcome to RideEasy — a full-stack MERN (MongoDB, Express.js, React.js, Node.js) based ride-hailing application inspired by Uber. RideEasy enables users to book rides, track captains in real-time, make payments, and manage their rides efficiently.

---

## Table of Contents

- [1. Introduction](#1-introduction)
- [2. Project Functionalities](#2-project-functionalities)
- [3. Technologies Used](#3-technologies-used)
- [4. Installation](#4-installation)
- [5. Usage](#5-usage)
- [6. Live Demo](#6-live-demo)
- [7. Contributing](#7-contributing)

---

## 1. Introduction

RideEasy connects passengers with captains (drivers) through a smooth, real-time, and interactive platform.  
The platform supports both normal rides and rental bookings, EV-mode fare discounts, Razorpay online payments, and chatbot support for common user queries.

---

## 2. Project Functionalities

- **Authentication and User Management:**
  - Secure login and signup for Users and Captains using JWT and bcrypt.
  - Profile editing, viewing ride history from the sidebar.

- **Real-Time Ride Management:**
  - Users can book rides for different vehicle types (car, bike, auto).
  - Real-time ride request notifications to nearby captains using Socket.io.
  - Captains can accept or ignore multiple incoming ride requests.

- **Live Tracking and OTP Security:**
  - Live ride tracking for both users and captains.
  - OTP verification before starting the ride for enhanced security.

- **Dynamic Fare System:**
  - Fare calculated based on distance, time, vehicle type, and EV mode.
  - EV Mode provides discounted fares.
  - Multi-route suggestions with different ETAs and fares shown to users.

- **Rental Bookings:**
  - Book rental rides with hourly packages without route selection.

- **Payment Integration:**
  - Cash, Cash Split among friends, and Online Payment via Razorpay.
  - Online payment success triggers real-time socket updates to captain.

- **AI Chatbot:**
  - Embedded chatbot to answer FAQs like how to book a ride, change profile, check history, and payment-related queries.

- **Captain Features:**
  - Captains can view assigned rides, start/end rides, and see dashboard.
  - Automatic ride rating system post ride completion.

---

## 3. Technologies Used

- **Frontend:**
  - React.js (with Vite) for high-speed UI
  - Tailwind CSS for styling
  - GSAP and Framer Motion for animations
  - Axios for API requests
  - Socket.io-client for real-time sockets

- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose ORM
  - Socket.io Server
  - Razorpay Node SDK for payments
  - Google Maps APIs (Geocoding, Distance Matrix, Directions)

- **Authentication:**
  - JWT (JSON Web Tokens)
  - bcrypt.js for password encryption

- **Other Libraries:**
  - shortid for Razorpay order IDs
  - dotenv for environment variable management

---

## 4. Installation

To run RideEasy locally, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/your-username/rideeasy.git
```
2. Navigate to project directory:
```bash
cd rideeasy
```
3. Install backend dependencies:
```bash
cd Backend
npm install
```
4. Install frontend dependencies:
```bash
cd ../Frontend
npm install
```
5. Create .env files:
Backend (Backend/.env):
```bash
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
Frontend (Frontend/.env):
```bash
VITE_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_key_id
```
6. Start backend server:
```bash
cd ..
cd Backend
npx nodemon
```
7. Start frontend:
```bash
cd ../Frontend
npm run dev
```

## 5. Usage

### Book a Ride
- Select pickup and destination locations.
- Choose a vehicle type, EV switch and preferred route if multiple routes are shown.
- Confirm the ride and wait for a captain to accept.

### Track and Complete Ride
- Track captain's arrival in real-time.
- Verify ride using OTP.
- Pay either by cash, split cash among friends, or use Razorpay to pay online.

### Manage Profile and History
- View and edit profile details via sidebar options.
- Check ride history and previous trips easily.

### Use the AI Chatbot
- Ask common queries like:
  - How to book a ride?
  - How to update my profile?
  - What are the payment options?
  - How to view my ride history?
  - How to split fare among friends?

---

## 6. Live Demo

### 🚀 Coming Soon...
### (Frontend to be deployed on Vercel, Backend on Render)

---

## 7. Contributing

### Contributions are welcome!

### Fork the repository
git clone https://github.com/your-username/rideeasy.git

### Create a new branch
git checkout -b feature-name

### Commit your changes
git commit -m "Add: feature-name"

### Push to the branch
git push origin feature-name

### Submit a pull request
