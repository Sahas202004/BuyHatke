# 🛒 BuyHatke – Online Shopping Application

BuyHatke is a full-stack online shopping application built using **ASP.NET Core Web API (.NET 10)** and **React**. The application allows customers to browse products, manage their shopping cart, and securely authenticate using JWT Authentication.

The project focuses on building a clean and maintainable REST API using a **Service Layer Architecture**, Entity Framework Core, ASP.NET Identity, and SQL Server.

---

# 🚀 Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected API Endpoints
* Logout

## Products

* View all products
* View product details
* Add products
* Update products
* Delete products

## Shopping Cart

* Add items to cart
* Remove items from cart
* Update quantity
* View cart
* Calculate subtotal
* Apply discounts
* Calculate grand total

---

# 🛠 Tech Stack

### Backend

* ASP.NET Core Web API (.NET 10)
* C#
* Entity Framework Core
* SQL Server
* ASP.NET Identity
* JWT Authentication

### Frontend

* React
* React Router
* Axios
* Context API
* CSS

### Database

* SQL Server

---

# 📁 Project Structure

```text
BuyHatke
│
├── OnlineShoppingAppBackend
│   ├── Infrastructure
│   │   ├── Data
│   │   └── Migrations
│   │
│   ├── Models
│   │   ├── DTOs
│   │   └── Entities
│   │
│   ├── Services
│   │   ├── ServiceContract
│   │   └── ServiceImplementation
│   │
│   └── OnlineShoppingApp
│       ├── Controllers
│       ├── Program.cs
│       └── appsettings.json
│
└── OnlineShoppingAppFrontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   ├── context
    │   └── assets
    └── public
```

---

# 🏗 Architecture

The backend follows a **Service Layer Architecture** where controllers delegate business logic to services, and the services interact directly with Entity Framework Core through `ApplicationDbContext`.

```text
Client
   │
   ▼
Controller
   │
   ▼
Service Layer
   │
   ▼
Entity Framework Core (ApplicationDbContext)
   │
   ▼
SQL Server
```

---

# 🔐 Authentication Flow

1. User registers an account.
2. User logs in using email and password.
3. ASP.NET Identity validates the credentials.
4. A JWT token is generated.
5. The frontend stores the JWT token.
6. Protected requests include the token in the `Authorization` header.
7. The backend validates the token before allowing access.

---

# 📦 API Modules

* Authentication
* Products
* Customers
* Shopping Cart

---

# ⚙️ Getting Started

## Clone the repository

```bash
git clone https://github.com/<your-username>/BuyHatke.git
```

## Backend

```bash
cd OnlineShoppingAppBackend
dotnet restore
dotnet ef database update
dotnet run
```

## Frontend

```bash
cd OnlineShoppingAppFrontend
npm install
npm run dev
```

---

# 📸 Screenshots

You can include screenshots of:

* Login Page
* Registration Page
* Product Listing
* Shopping Cart
* Checkout Summary

---

# 📚 Learning Outcomes

This project helped strengthen my understanding of:

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* Service Layer Architecture
* Dependency Injection
* ASP.NET Identity
* JWT Authentication
* REST API Design
* DTOs
* React
* Axios
* Git & GitHub

---

# 👨‍💻 Author

**Sahas Kshirsagar**

MSc Computer Science | ASP.NET Core & React Developer

---

If you found this project helpful, consider giving it a ⭐ on GitHub.
