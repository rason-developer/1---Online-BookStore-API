const pool = require('../config/db');


class Order {
    static async placeOrder(userId, items, totalAmount) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const orderResult = await client.query(
                'INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING *',
                [userId, totalAmount]
            );
            const orderId = orderResult.rows[0].id;

            const orderItemsPromises = items.map(item => {
                return client.query(
                    'INSERT INTO order_items (order_id, book_id, quantity, price) VALUES ($1, $2, $3, $4)',
                    [orderId, item.bookId, item.quantity, item.price]
                );
            });

            await Promise.all(orderItemsPromises);

            await client.query('COMMIT');
            return orderResult.rows[0];
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Error in placeOrder:', err);
            throw err;
        } finally {
            client.release();
        }
    }
    static async getUserOrders(userId) {
        const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
        return result.rows;
    }
    
    static async getOrderById(orderId) {
        const result = await pool.query("SELECT * FROM orders WHERE id = $1", [orderId]);
        return result.rows[0];
    }


    static async getAllOrders() {
        const client = await pool.connect();
        try {
            const query = `
                SELECT id, user_id, total_price, status, created_at
                FROM orders;
            `;
            const { rows } = await client.query(query);
            return rows;
        } finally {
            client.release();
        }
    }

    static async updateOrderStatus(orderId, status) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const updateQuery = `
                UPDATE orders
                SET status = $1
                WHERE id = $2
                RETURNING id, user_id, total_price, status, created_at;
            `;
            const { rows: [updatedOrder] } = await client.query(updateQuery, [status, orderId]);

            await client.query('COMMIT');
            return updatedOrder;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

}

module.exports = Order;