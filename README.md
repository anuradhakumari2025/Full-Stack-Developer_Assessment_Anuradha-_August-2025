# GreenCart Delivery Simulation System

A full-stack MERN application to manage delivery drivers, routes, orders, and run delivery simulations to calculate profit, efficiency, and performance.

---

## 🚀 Features
### **Backend**
- Import CSV data for Drivers, Routes, and Orders
- CRUD APIs for:
  - Drivers
  - Routes
  - Orders
- Delivery Simulation API
- JWT Authentication for Manager access

### **Frontend**
- React.js SPA with responsive design
- Pages:
  - Login / Register (JWT Authentication)
  - Dashboard (KPI & charts)
  - Drivers Management
  - Routes Management
  - Orders Management
  - Simulation Runner
- Protected routes — only logged-in users can access dashboard & data pages
- Consistent theme across all pages

---

## 📂 Folder Structure
```

backend/
│   server.js
│   package.json
│   .env
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   ├── routes/
│   └── utils/
│       └── importData.js
│
frontend/
│   package.json
│
├── public/
├── src/
│   ├── api/
│   │   └── axiosInstance.js
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Drivers.jsx
│   │   ├── Routes.jsx
│   │   ├── Orders.jsx
│   │   └── Simulation.jsx
│   ├── styles/
│   │   ├── Auth.css
│   │   ├── Dashboard.css
│   │   ├── Drivers.css
│   │   ├── Orders.css
│   │   ├── Routes.css
│   │   └── Simulation.css
│   └── App.jsx

````

---

## 🛠️ Installation & Setup

### **Backend**
```bash
cd backend
npm install
````

1. Create `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

2. Import CSV data:

```bash
node src/utils/importData.js
```

3. Start backend:

```bash
npm run dev
```

---

### **Frontend**

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Authentication Flow

1. **Register** → `/api/auth/register` with `username`, `email`, `password`.
2. **Login** → `/api/auth/login` returns JWT token.
3. Token stored in `localStorage` & attached to every API request using Axios.
4. **Protected Routes** → Backend checks token using `authMiddleware`.
5. Navbar updates to show Dashboard/Drivers/Routes/Orders only after login.

---

## 📊 Simulation Logic

* Calculates **total profit**, **efficiency score**, **on-time deliveries**, **late deliveries**.
* Factors in:

  * Fuel cost & surcharge for high traffic routes
  * Bonus for high-value orders
  * Penalty for late deliveries
* Saves simulation results in DB for later review.

---

## 📸 Screenshots

<img width="1351" height="616" alt="image" src="https://github.com/user-attachments/assets/fe3ab614-d134-4b17-b05f-1aa0263a6f28" />
<img width="1348" height="609" alt="image" src="https://github.com/user-attachments/assets/c542f0ac-005d-4a77-9c3b-214c0729fbe9" />


---

## 👩‍💻 Tech Stack

* **Frontend:** React.js, Chart.js
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Auth:** JWT, bcrypt
* **CSV Parsing:** csv-parser



























# GreenCart Logistics – Backend

Backend service for **GreenCart Logistics – Delivery Simulation & KPI Dashboard**.  
Manages Drivers, Routes, Orders, and runs simulations based on company rules to calculate KPIs.

---

## 🚀 Tech Stack
- **Node.js** + **Express**
- **MongoDB Atlas** + **Mongoose**
- **csv-parser** (for CSV import)
- **dotenv**
- **Postman** (for API testing)

---

## 📂 Folder Structure
```
backend/
├── src/
│ ├── controllers/ # API controllers
│ ├── models/ # Mongoose models
│ ├── routes/ # API route definitions
│ ├── utils/ # CSV import scripts
│ └── db/ # Database connection
├── .env # Environment variables
├── package.json
└── server.js
```


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your_repo_url>
cd backend
```
### 2️⃣ Install Dependencies
 ``` bash
npm install
```
### 3️⃣ Create .env File
``` bash
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```
### 4️⃣ Import Initial Data from CSV
Place drivers.csv, routes.csv, and orders.csv in the utils folder.
Then run:
``` bash
node src/utils/importData.js
```
### 5️⃣ Start the Server
``` bash
nodemon server.js
```
### Server runs at:
http://localhost:5000
## 📌 API Endpoints
### Drivers
| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/drivers`     | Get all drivers   |
| GET    | `/api/drivers/:id` | Get single driver |
| POST   | `/api/drivers`     | Create driver     |
| PUT    | `/api/drivers/:id` | Update driver     |
| DELETE | `/api/drivers/:id` | Delete driver     |
### Routes
| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/routes`     | Get all routes   |
| GET    | `/api/routes/:id` | Get single route |
| POST   | `/api/routes`     | Create route     |
| PUT    | `/api/routes/:id` | Update route     |
| DELETE | `/api/routes/:id` | Delete route     |
### Orders
| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | `/api/orders`     | Get all orders   |
| GET    | `/api/orders/:id` | Get single order |
| POST   | `/api/orders`     | Create order     |
| PUT    | `/api/orders/:id` | Update order     |
| DELETE | `/api/orders/:id` | Delete order     |
### 📊 Simulation API
Request Example:
``` bash
{
  "availableDrivers": 5,
  "startTime": "09:00",
  "maxHoursPerDriver": 8
}
```
Response Example:
``` bash
{
  "totalProfit": 12345,
  "efficiencyScore": 85,
  "onTimeDeliveries": 42,
  "lateDeliveries": 8,
  "fuelCostBreakdown": {
    "baseCost": 2000,
    "surcharge": 400
  }
}
```
## ✅ Testing with Postman

1. Open Postman.
2. Choose an API endpoint from the table above.
3. For POST/PUT requests:
   - Select **Body** → **raw** → **JSON**.
   - Enter your request data in JSON format.
4. Click **Send** and verify the






