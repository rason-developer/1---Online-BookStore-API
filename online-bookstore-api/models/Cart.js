const pool = require("../config/db");

class Cart {
    static async getUserCart(userId) {
        const client = await pool.connect();
        try {
            const query = `
                SELECT c.id AS cart_id, c.total_price,
                       ci.id AS item_id, ci.book_id, ci.quantity, ci.price AS item_price
                FROM cart c
                LEFT JOIN cartItems ci ON c.id = ci.cart_id
                WHERE c.user_id = $1;
            `;
            const { rows } = await client.query(query, [userId]);
    
            if (rows.length === 0) {
                return null; // No cart found for this user
            }
    
            // Extracting cart information
            const cart = {
                id: rows[0].cart_id,
                total_price: rows[0].total_price,
                items: rows.map(row => ({
                    id: row.item_id,
                    book_id: row.book_id,
                    quantity: row.quantity,
                    price: row.item_price
                })).filter(item => item.id !== null) // Filter out null items if any
            };
    
            return cart;
        } finally {
            client.release();
        }
    }
    static async addToCart(userId, bookId, quantity) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
    
            // Check if the book exists and retrieve its price
            const bookQuery = 'SELECT price FROM books WHERE id = $1';
            const { rows: [book] } = await client.query(bookQuery, [bookId]);
            if (!book) {
                throw new Error(`Book with ID ${bookId} not found`);
            }
    
            // Insert into cartItems table
            const insertQuery = `
                INSERT INTO cartItems (cart_id, book_id, quantity, price)
                SELECT c.id, $1, $2, $3
                FROM cart c
                WHERE c.user_id = $4
                RETURNING id, book_id, quantity, price;
            `;
            const { rows: [addedItem] } = await client.query(insertQuery, [bookId, quantity, book.price, userId]);
    
            // Update total_price in cart table
            const updateQuery = `
                UPDATE cart
                SET total_price = total_price + ($1::decimal * $2::decimal)
                WHERE user_id = $3
                RETURNING total_price;
            `;
            const { rows: [updatedCart] } = await client.query(updateQuery, [quantity, book.price, userId]);
    
            await client.query('COMMIT');
            return addedItem;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
    
    static async updateCartItem(userId, itemId, quantity) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
    
            // Validate item ID and retrieve current item details
            const itemQuery = `
                SELECT id, book_id, quantity, price
                FROM cartItems
                WHERE id = $1 AND cart_id IN (SELECT id FROM cart WHERE user_id = $2)
                FOR UPDATE;
            `;
            const { rows: [item] } = await client.query(itemQuery, [itemId, userId]);
            if (!item) {
                throw new Error(`Cart item with ID ${itemId} not found for user`);
            }
    
            // Retrieve book price for calculation
            const bookQuery = 'SELECT price FROM books WHERE id = $1';
            const { rows: [book] } = await client.query(bookQuery, [item.book_id]);
    
            // Update quantity and price in cartItems table with explicit type casting
            const updateQuery = `
                UPDATE cartItems
                SET quantity = $1::integer, price = ($2::decimal * $1::decimal)
                WHERE id = $3
                RETURNING id, book_id, quantity, price;
            `;
            const { rows: [updatedItem] } = await client.query(updateQuery, [quantity, book.price, itemId]);
    
            // Calculate new total price in cart table
            const updateTotalQuery = `
                UPDATE cart
                SET total_price = (SELECT COALESCE(SUM(price), 0) FROM cartItems WHERE cart_id = $1)
                WHERE id IN (SELECT id FROM cart WHERE user_id = $2)
                RETURNING total_price;
            `;
            const { rows: [updatedCart] } = await client.query(updateTotalQuery, [item.cart_id, userId]);
    
            await client.query('COMMIT');
            return updatedItem;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
    
    
    static async deleteCartItem(userId, itemId) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
    
            // Validate item ID and delete from cartItems table
            const deleteQuery = `
                DELETE FROM cartItems
                WHERE id = $1 AND cart_id IN (SELECT id FROM cart WHERE user_id = $2)
                RETURNING id, cart_id;
            `;
            const { rows: [deletedItem] } = await client.query(deleteQuery, [itemId, userId]);
            if (!deletedItem) {
                throw new Error(`Cart item with ID ${itemId} not found for user`);
            }
    
            // Calculate new total price in cart table
            const updateTotalQuery = `
                UPDATE cart
                SET total_price = (SELECT COALESCE(SUM(price), 0) FROM cartItems WHERE cart_id = $1)
                WHERE id = $1
                RETURNING total_price;
            `;
            const { rows: [updatedCart] } = await client.query(updateTotalQuery, [deletedItem.cart_id]);
    
            await client.query('COMMIT');
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }
    
}

module.exports = Cart;