const pool = require("./db");
const logger = require("../logger/winston");

async function createTables() {
    try {
      await pool.query(`
        CREATE SEQUENCE IF NOT EXISTS users_id_seq;
  
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY DEFAULT nextval('users_id_seq'),
          username VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL,
          role VARCHAR(50) DEFAULT 'user'
        );
  
        CREATE TABLE IF NOT EXISTS books (
          id SERIAL PRIMARY KEY,
          title VARCHAR(100) NOT NULL,
          author VARCHAR(100) NOT NULL,
          genre VARCHAR(50),
          price DECIMAL(10, 2) NOT NULL,
          stock_quantity INTEGER NOT NULL,
          description TEXT
        );
  
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          total_price DECIMAL(10, 2) NOT NULL,
          status VARCHAR(50) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
  
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER REFERENCES orders(id),
          book_id INTEGER REFERENCES books(id),
          quantity INTEGER NOT NULL,
          price DECIMAL(10, 2) NOT NULL
        );
  
        CREATE TABLE IF NOT EXISTS cart (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          total_price DECIMAL(10, 2) NOT NULL
        );
  
        CREATE TABLE IF NOT EXISTS cartItems (
          id SERIAL PRIMARY KEY,
          cart_id INTEGER REFERENCES cart(id),
          book_id INTEGER REFERENCES books(id),
          quantity INTEGER NOT NULL,
          price DECIMAL(10, 2) NOT NULL
        );
      `);
  
      logger.info('Tables created successfully.');
    } catch (error) {
      logger.error('Error creating tables:', error);
      throw error;
    } finally {
      await pool.end();
    }
  }

  
module.exports = createTables;