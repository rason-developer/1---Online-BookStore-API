
```markdown
# Online Bookstore API

## Overview
The Online Bookstore API is designed to manage an online bookstore. It allows users to browse books, view book details, manage their cart, and place orders. Admins can manage the inventory, add new books, update existing ones, and delete books from the catalog. The API uses Node.js with Express.js for the server-side logic and PostgreSQL as the database.

## Features

### User Management
- User registration and login (JWT authentication).
- User profile management.

### Book Management
- CRUD operations for books (Create, Read, Update, Delete).
- Book details include title, author, genre, price, stock quantity, and description.

### Browsing and Searching
- Browse books by category, author, and other criteria.
- Search functionality with advanced querying (full-text search).

### Shopping Cart
- Add books to the cart.
- Update cart items (change quantity, remove items).
- View cart.

### Order Management
- Place an order.
- View order history.
- Manage order statuses (admin).

### Admin Panel
- Manage inventory (add/update/delete books).
- View and manage all orders.

## Technologies Used
- **Node.js & Express.js**: For server-side logic and routing.
- **PostgreSQL**: For database management.
- **pg**: Node.js PostgreSQL client.
- **JWT**: For authentication.
- **bcrypt**: For hashing passwords.
- **morgan**: For HTTP request logging.
- **winston**: For logging.


## Installation

### Prerequisites
- Node.js
- PostgreSQL

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/online-bookstore-api.git
   cd online-bookstore-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_postgresql_database_url
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Set up the database:
   Run the following command to create the necessary tables:
   ```bash
   node utils/dbHelper.js
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. The API will be running on `http://localhost:5000`.

## API Documentation

### User Endpoints
- `POST /api/register`: Register a new user.
- `POST /api/login`: User login.

### Book Endpoints
- `GET /api/books`: Get all books.
- `GET /api/books/:id`: Get book details by ID.
- `POST /api/books`: Add a new book (admin).
- `PUT /api/books/:id`: Update book details (admin).
- `DELETE /api/books/:id`: Delete a book (admin).

### Cart Endpoints
- `GET /api/cart`: Get user's cart.
- `POST /api/cart`: Add a book to the cart.
- `PUT /api/cart/:itemId`: Update cart item quantity.
- `DELETE /api/cart/:itemId`: Remove an item from the cart.

### Order Endpoints
- `POST /api/orders`: Place a new order.
- `GET /api/orders`: Get user's order history.
- `GET /api/orders/:id`: Get order details by ID.

### Admin Endpoints
- `GET /api/admin/orders`: Get all orders (admin).
- `PUT /api/admin/orders/:id`: Update order status (admin).

## Error Handling
Custom error handling middleware is used to manage errors and provide meaningful messages.

## Authentication


JWT is used for securing endpoints. Include the token in the `Authorization` header as `Bearer <token>`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any bugs or improvements.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, please reach out to `rasondeveloper@gmail.com`.
```

