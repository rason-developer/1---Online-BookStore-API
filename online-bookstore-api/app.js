const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const morganMiddleware = require("./logger/morganMiddleware");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require('./routes/cartRoutes');

const errorHandlerMiddleware = require("./middlewares/errorHandler");
const { error } = require("winston");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(morganMiddleware);
app.use(errorHandlerMiddleware);
// routes

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", bookRoutes);
app.use("/api",orderRoutes);
app.use('/api/cart', cartRoutes);

module.exports = app;