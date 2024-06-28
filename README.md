
# Online BookStore API

This project is a Online BookStore API built with Node.js, Express, and PostgreSQL. It provides endpoints for managing books, user authentication, shopping carts, orders, and administrative tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Testing with REST Client](#testing-with-rest-client)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Books](#books)
  - [Cart](#cart)
  - [Orders](#orders)
  - [Admin](#admin)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, login)
- CRUD operations for books
- Shopping cart management (add, update, delete items)
- Order placement and management
- Admin functionalities (view all orders, update order status)

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web application framework for Node.js
- **PostgreSQL** - Relational database management system
- **Docker** - Containerization platform
- **REST Client** - Visual Studio Code extension for API testing

## Setup

### Prerequisites

- Node.js (v14 or higher)
- Docker
- Visual Studio Code (optional, for using REST Client extension)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rason-developer/Online-BookStore-API
   cd online-bookstore-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
PORT=3000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/bookstore_db
JWT_SECRET=your_jwt_secret
```
If you are using docker dont forget to change the environmental variables on the dockerfile.
### Database Setup

This project uses Docker for PostgreSQL. Run the following commands to set up and start the database:

```bash
docker-compose build
docker-compose up
```

This command will create and start a PostgreSQL container with the necessary tables for the application.

## Usage

### Starting the Server

To start the server, run:

```bash
npm start
```

### Testing with REST Client

Use Visual Studio Code with the REST Client extension to test the API endpoints. You can find sample `.rest` files in the `tests` directory for different endpoints.

## API Endpoints

### Authentication

- `POST /api/auth/signup`: Create a new user.
- `POST /api/auth/login`: Authenticate and log in a user.

### Books

- `GET /api/books`: Get all books.
- `POST /api/books`: Add a new book.
- `GET /api/books/:id`: Get a book by ID.
- `PUT /api/books/:id`: Update a book by ID.
- `DELETE /api/books/:id`: Delete a book by ID.

### Cart

- `GET /api/cart`: Get user's cart.
- `POST /api/cart`: Add a book to the cart.
- `PUT /api/cart/:itemId`: Update cart item quantity.
- `DELETE /api/cart/:itemId`: Remove an item from the cart.

### Orders

- `POST /api/orders`: Place a new order.
- `GET /api/orders`: Get user's orders.
- `PUT /api/orders/:id`: Update order status.
- `GET /api/orders/:id/items`: Get items in a specific order.

### Admin

- `GET /api/admin/orders`: Get all orders (admin).
- `PUT /api/admin/orders/:id`: Update order status (admin).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

