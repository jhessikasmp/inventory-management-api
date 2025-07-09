# 📦 Inventory Management API

Inventory control system developed with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. Includes full CRUD operations, automatic stock adjustment on sales, weekly PDF report generation, and interactive Swagger documentation.

---

## 📋 Features

- ✅ **Product CRUD**: Create, list, update, and delete products  
- ✅ **Sales Registration**: Automatically subtracts sold quantity from stock  
- ✅ **Weekly PDF Report**: Generates detailed downloadable reports  
- ✅ **Swagger Documentation**: Interactive interface to test the API  
- ✅ **Structured Logging**: Monitoring with Winston  
- ✅ **12-Factor Compliance**: Best practices for modern applications  

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **PDFKit** – PDF generation  
- **Winston** – Logging system  
- **Swagger** – API documentation  
- **dotenv** – Environment variable management  

---

## 📁 Project Structure

```
inventory-api/
├── src/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── reportController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── reportRoutes.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── services/
│   │   └── reportService.js
│   ├── models/
│   │   └── Product.js
│   ├── logger.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Installation & Configuration

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Step-by-Step

```bash
git clone <repository-url>
cd inventory-api
npm install
```

Create a `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/inventory
PORT=3000
```

Start MongoDB locally or configure your Atlas URI.

Start the server:

```bash
npm run dev
```

Access:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/api-docs`

---

## 📚 API Endpoints

### Products

| Method | Endpoint                | Description                      |
|--------|-------------------------|----------------------------------|
| GET    | /api/products           | List all products                |
| GET    | /api/products/:id       | Get product by ID                |
| POST   | /api/products           | Create a new product             |
| PUT    | /api/products/:id       | Update a product                 |
| DELETE | /api/products/:id       | Delete a product                 |
| POST   | /api/products/:id/sell  | Register a sale and adjust stock|

### Reports

| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| GET    | /api/reports/weekly   | Generate weekly PDF report       |

---

## 🧪 Usage Examples

### Create Product

```bash
POST /api/products
Content-Type: application/json

{
  "name": "Barilla Pasta",
  "sku": "PAST-001",
  "quantity": 100,
  "price": 1.49,
  "expiryDate": "2025-12-01"
}
```

### Register Sale

```bash
POST /api/products/{id}/sell
Content-Type: application/json

{
  "quantitySold": 5
}
```

### Generate Report

```bash
GET /api/reports/weekly
```

---

## 🔧 Available Scripts

```json
{
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

- `npm run dev`: Development mode  
- `npm start`: Production mode

---

## 📊 Product Schema

```javascript
{
  name: String,        // Product name
  sku: String,         // Unique code (SKU)
  quantity: Number,    // Stock quantity
  price: Number,       // Unit price
  expiryDate: Date,    // Expiry date
  createdAt: Date,     // Creation date
  updatedAt: Date      // Last update date
}
```

---

## 🧪 Testing with Postman

- Import the Swagger collection (`/api-docs`)
- Set base URL: `http://localhost:3000`
- Test the endpoints using the examples above

---

## 📝 Logging with Winston

- Product creation and updates  
- Sales records  
- System errors  

---

## 🔒 Environment Variables

| Variable      | Description                  | Example                               |
|---------------|------------------------------|---------------------------------------|
| MONGODB_URI   | MongoDB connection string    | mongodb://localhost:27017/inventory   |
| PORT          | Server port                  | 3000                                  |

---

## 🚀 Deployment

### Render

- Connect your repo
- Set `.env` variables
- Automatic deployment on push

### Heroku

```bash
heroku create your-app-name
heroku config:set MONGODB_URI=<your-uri>
git push heroku main
```

---

## 🤝 Contributing

1. Fork the project  
2. Create your branch: `git checkout -b feature/new-feature`  
3. Commit your changes: `git commit -m 'Add new feature'`  
4. Push to branch: `git push origin feature/new-feature`  
5. Open a Pull Request  

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Support

- GitHub Issues  
- Email: `your-email@example.com`  
- Docs: [localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🏗️ Architecture – 12-Factor App

| Principle             | ✔️ Applied? |
|-----------------------|-------------|
| Codebase              | ✅          |
| Dependencies          | ✅          |
| Config                | ✅          |
| Backing Services      | ✅          |
| Build, Release, Run   | ✅          |
| Processes             | ✅          |
| Port Binding          | ✅          |
| Concurrency           | ✅          |
| Disposability         | ✅          |
| Dev/Prod Parity       | ✅          |
| Logs                  | ✅          |
| Admin Processes       | ✅          |

---

Built with ❤️ for modern, simple, and efficient inventory management.