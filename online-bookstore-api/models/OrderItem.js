const pool = require('../config/db');

class OrderItem {
    static async getOrderItems(orderId) {
        const client = await pool.connect();
        try {
            const query = `
                SELECT oi.id, oi.book_id, oi.quantity, oi.price
                FROM order_items oi
                WHERE oi.order_id = $1;
            `;
            const { rows } = await client.query(query, [orderId]);
            return rows;
        } finally {
            client.release();
        }
    }
}

module.exports = OrderItem;
