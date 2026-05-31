# 🛒 Django Microservices E-Commerce System

A **microservices-based e-commerce backend** built using **Django**, **Django REST Framework**, **PostgreSQL**, **JWT Authentication**, and **Razorpay Payment Gateway**.

## 🚀 Features

* Microservices Architecture (4 Independent Services)
* JWT Authentication with SimpleJWT
* Product Management Service
* Cart Management Service
* Order Processing Service
* Razorpay Payment Integration
* PostgreSQL Database (Separate DB per Service)
* Environment-Based Configuration (`.env`)
* CORS Enabled for Frontend Integration
* RESTful API Communication Between Services

---

## 🏗️ System Architecture

```text
Frontend (HTML/CSS/JavaScript)
           │
           ▼
┌──────────────────────────────┐
│   Auth Service      : 8001   │
│   Product Service   : 8002   │
│   Cart Service      : 8003   │
│   Order Service     : 8004   │
└──────────────────────────────┘
           │
           ▼
 PostgreSQL Databases
 (One Database Per Service)
           │
           ▼
 Razorpay Payment Gateway
```

---

## ⚙️ Tech Stack

| Category          | Technology             |
| ----------------- | ---------------------- |
| Language          | Python 3.11+           |
| Framework         | Django 5.x             |
| API Framework     | Django REST Framework  |
| Authentication    | JWT (SimpleJWT)        |
| Database          | PostgreSQL             |
| Payment Gateway   | Razorpay               |
| API Communication | REST APIs (`requests`) |
| Frontend          | HTML, CSS, JavaScript  |

---

## 📦 Microservices

### 🔐 Auth Service (Port 8001)

Handles user registration, authentication, and profile management.

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/signup/`  | Register User |
| POST   | `/api/auth/login/`   | Login User    |
| GET    | `/api/auth/profile/` | User Profile  |

---

### 🛍️ Product Service (Port 8002)

Handles product catalog operations.

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | `/api/products/`      | Get All Products |
| GET    | `/api/products/<id>/` | Product Details  |

---

### 🛒 Cart Service (Port 8003)

Handles shopping cart operations.

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| GET    | `/api/cart/`             | View Cart           |
| POST   | `/api/cart/add/`         | Add Product to Cart |
| PUT    | `/api/cart/update/<id>/` | Update Quantity     |
| DELETE | `/api/cart/remove/<id>/` | Remove Product      |

---

### 📦 Order Service (Port 8004)

Handles checkout and payments.

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| POST   | `/api/orders/checkout/`       | Create Order          |
| POST   | `/api/orders/pay/<order_id>/` | Create Razorpay Order |
| POST   | `/api/orders/verify/`         | Verify Payment        |
| GET    | `/api/orders/`                | User Orders           |

---

## 🔐 Authentication

Protected APIs require a JWT access token.

```http
Authorization: Bearer <access_token>
```

---

## 💳 Razorpay Payment Workflow

```text
User Checkout
      │
      ▼
Create Order
      │
      ▼
Generate Razorpay Order
      │
      ▼
Open Razorpay Checkout
      │
      ▼
Payment Success
      │
      ▼
Verify Signature
      │
      ▼
Update Payment Status → PAID
```

---

## 🗄️ Database Models

### CartItem

| Field      | Type    |
| ---------- | ------- |
| user_id    | Integer |
| product_id | Integer |
| quantity   | Integer |

### Order

| Field             | Type                |
| ----------------- | ------------------- |
| user_id           | Integer             |
| total_price       | Decimal             |
| status            | PENDING / CONFIRMED |
| payment_status    | PAID / UNPAID       |
| razorpay_order_id | String              |

### OrderItem

| Field        | Type       |
| ------------ | ---------- |
| order        | ForeignKey |
| product_id   | Integer    |
| product_name | String     |
| price        | Decimal    |
| quantity     | Integer    |
| subtotal     | Decimal    |

---

## 🛠️ Installation Guide

### 1. Clone Repository

```bash
git clone https://github.com/Ajil77/Ecommerce-microservice.git
cd Ecommerce-microservice
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Create a `.env` file inside each microservice directory.

#### Example

```env
SECRET_KEY=ecom
DEBUG=True

DB_NAME=auth_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOW_ALL=True
```

For Cart and Order services, configure service URLs:

```env
AUTH_SERVICE_URL=http://127.0.0.1:8001/api
PRODUCT_SERVICE_URL=http://127.0.0.1:8002/api
CART_SERVICE_URL=http://127.0.0.1:8003/api
```

For Razorpay:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxxxxx
```

---

### 5. Create PostgreSQL Databases

```sql
CREATE DATABASE auth_db;
CREATE DATABASE product_db;
CREATE DATABASE cart_db;
CREATE DATABASE order_db;
```

---

### 6. Run Migrations

```bash
cd auth_service
python manage.py migrate

cd ../product_service
python manage.py migrate

cd ../cart_service
python manage.py migrate

cd ../order_service
python manage.py migrate
```

---

### 7. Start Services

Open separate terminals:

```bash
cd auth_service
python manage.py runserver 8001
```

```bash
cd product_service
python manage.py runserver 8002
```

```bash
cd cart_service
python manage.py runserver 8003
```

```bash
cd order_service
python manage.py runserver 8004
```

---

## 📁 Project Structure

```text
Ecommerce-microservice/
│
├── auth_service/
│   ├── accounts/
│   ├── auth_service/
│   ├── .env
│   └── manage.py
│
├── product_service/
│   ├── products/
│   ├── product_service/
│   ├── .env
│   └── manage.py
│
├── cart_service/
│   ├── cart/
│   ├── cart_service/
│   ├── .env
│   └── manage.py
│
├── order_service/
│   ├── orders/
│   ├── order_service/
│   ├── .env
│   └── manage.py
│
├── frontend/
│   ├── config.js
│   ├── auth.js
│   ├── cart.html
│   ├── orders.html
│   ├── payment.html
│   └── index.html
│
├── requirements.txt
└── README.md
```

---

## ⚠️ Troubleshooting

| Issue               | Solution                            |
| ------------------- | ----------------------------------- |
| SECRET_KEY Error    | Verify `.env` placement             |
| JWT Invalid         | Login again to generate a new token |
| Product Unavailable | Ensure Product Service is running   |
| Order Not Found     | Verify checkout response            |
| Razorpay 400 Error  | Check Razorpay credentials          |
| Database Error      | Verify PostgreSQL and DB names      |
| CORS Error          | Enable `CORS_ALLOW_ALL=True`        |

---

## 🔮 Future Enhancements

* Auto-clear Cart After Payment
* Docker & Docker Compose Setup
* API Gateway (Nginx / Kong)
* React Frontend
* Product Search & Filters
* Email Notifications
* Admin Dashboard
* Inventory Management
* Order Tracking System

---

## 👨‍💻 Author

**AJIL K R**
Full Stack Developer

GitHub: https://github.com/Ajil77

---

## 📄 License

This project is licensed under the MIT License.
