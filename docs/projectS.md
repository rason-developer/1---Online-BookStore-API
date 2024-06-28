### Project Structure

online-bookstore-api/
├── config/
│   ├── db.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── adminController.js
│   └── userController.js
├── logger/
│   ├── morganMiddleware.js
│   └── winston.js
├── middlewares/
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Book.js
│   ├── Order.js
│   ├── OrderItem.js
│   ├── Cart.js
│   └── CartItem.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── adminRoutes.js
│   └── userRoutes.js
|
├── utils/
│   ├── dbHelper.js
│   └── jwtHelper.js
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
└── README.md
