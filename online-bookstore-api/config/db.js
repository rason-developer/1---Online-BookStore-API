const {Pool} = require("pg");
const logger = require("../logger/winston");
require('dotenv').config();

const pool = new Pool({
    user:process.env.DB_USER || "user123",
    host:process.env.DB_HOST || "db",
    database:process.env.DB_NAME || "bookstore",
    password:process.env.PASSWORD || "password123",
    port: 5432
});

pool.on('connect', () => {
    logger.info("Connected to the PostSQL database.");
});

pool.on('error', (err) => {
    logger.error("Error connecting to the postsql database: ",err);
})

/*
const connectWithRetry = () => {
    pool.connect((err, client, release) => {
      if (err) {
        logger.error('Error connecting to PostgreSQL, retrying in 5 seconds...', err);
        setTimeout(connectWithRetry, 5000);
      } else {
        logger.info('Connected to the PostgreSQL database.');
        release();
      }
    });
  };
*/
module.exports = pool;