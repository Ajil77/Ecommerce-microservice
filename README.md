# 🛒 Django Microservices E-Commerce System

A **microservices-based e-commerce backend system** built using Django, Django REST Framework, PostgreSQL, and Razorpay payment integration.

## ✨ Features

- ✅ Microservices architecture
- ✅ JWT authentication
- ✅ Cart system
- ✅ Order system
- ✅ Razorpay payment integration
- ✅ PostgreSQL database
- ✅ REST API communication
- ✅ Real-time order processing

---

## 🏗️ Project Architecture

```
Frontend (HTML/JS)
        ↓
  API Gateway (optional)
        ↓
┌─────────────────────────┐
│  Cart Service    (8003) │
│  Order Service   (8004) │
│  Product Service (8002) │
│  Auth Service    (8001) │
└─────────────────────────┘
        ↓
  PostgreSQL Databases
        ↓
  Razorpay Payment Gateway
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Language | Python 3.11+ |
| Framework | Django 5+, Django REST Framework |
| Database | PostgreSQL |
| Authentication | SimpleJWT |
| Payment | Razorpay API |
| Communication | REST APIs (Requests library) |

---

## 📦 Microservices

### 🔐 1. Auth Service (Port: 8001)
Handles user registration, login, and JWT token management.

### 🛒 2. Cart Service (Port: 8003)
Manages shopping cart operations with JWT protection.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart/` | View cart |
| POST | `/api/cart/add/` | Add item to cart |
| DELETE | `/api/cart/remove/<id>/` | Remove item from cart |

### 📦 3. Order Service (Port: 8004)
Handles order creation, Razorpay integration, and payment verification.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders/checkout/` | Create order from cart |
| POST | `/api/orders/pay/<order_id>/` | Initiate payment |
| POST | `/api/orders/verify/` | Verify payment signature |

### 🛍️ 4. Product Service (Port: 8002)
Manages product listings and details.

---

## 🔐 Authentication

Uses **JWT (SimpleJWT)**. Include the token in every protected request:

```
Authorization: Bearer <access_token>
```

---

## 💳 Razorpay Payment Flow

```
User Checkout
    → Create Order (DB)
    → Generate Razorpay Order
    → Frontend Payment UI
    → Verify Signature
    → Mark Order as Paid ✅
```

---

## 🗄️ Database Schema

### CartItem
| Field | Type |
|---|---|
| user_id | Integer |
| product_id | Integer |
| quantity | Integer |

### Order
| Field | Type |
|---|---|
| user_id | Integer |
| total_price | Decimal |
| status | String |
| razorpay_order_id | String |

### OrderItem
| Field | Type |
|---|---|
| order_id | ForeignKey |
| product_id | Integer |
| price | Decimal |
| quantity | Integer |
| subtotal | Decimal |

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Ajil77/Ecommerce-microservice.git
cd Ecommerce-microservice
```

### 2. Create and activate virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in each service directory:

```env
SECRET_KEY=your_secret_key
DEBUG=True

DB_NAME=order_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

CART_SERVICE_URL=http://127.0.0.1:8003/api/cart/

RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### 5. Run migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Start all services

Open a separate terminal for each service:

```bash
# Auth Service
cd auth_service && python manage.py runserver 8001

# Product Service
cd product_service && python manage.py runserver 8002

# Cart Service
cd cart_service && python manage.py runserver 8003

# Order Service
cd order_service && python manage.py runserver 8004

# Frontend
cd frontend && python manage.py runserver 8000
```

---

## 🧪 API Testing (Postman)

### 1. Register / Login
```
POST /api/auth/register/
POST /api/auth/login/
```

### 2. Add to Cart
```
POST /api/cart/add/
Authorization: Bearer <token>
```

### 3. View Cart
```
GET /api/cart/
Authorization: Bearer <token>
```

### 4. Checkout
```
POST /api/orders/checkout/
Authorization: Bearer <token>
```

### 5. Pay
```
POST /api/orders/pay/<order_id>/
Authorization: Bearer <token>
```

---

## ⚠️ Common Issues

| Error | Fix |
|---|---|
| `SECRET_KEY error` | Check `.env` file is loading correctly |
| `Razorpay BadRequestError` | Verify API keys and ensure amount > 100 paise |
| `Order not found` | Ensure checkout returns a valid `order_id` |
| `JWT token invalid` | Refresh token or re-login |
| `DB connection error` | Check PostgreSQL is running and credentials are correct |

---

## 🚀 Future Improvements

- [ ] Auto cart clear after successful payment
- [ ] Order history dashboard
- [ ] Admin panel customization
- [ ] Docker containerization
- [ ] API Gateway (Nginx / Kong)
- [ ] React frontend integration
- [ ] Email notifications for orders

---

## 📁 Project Structure

```
Ecommerce-microservice/
├── auth_service/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── product_service/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── cart_service/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── order_service/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   └── ...
└── README.md
```

---

## 👨‍💻 Author

**AJIL K R**  
Full Stack Developer — Django & Microservices

[![GitHub](https://img.shields.io/badge/GitHub-Ajil77-black?logo=github)](https://github.com/Ajil77)

---

## 📄 License

This project is licensed under the MIT License.
