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






