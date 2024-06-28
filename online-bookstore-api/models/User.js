const pool = require('../config/db');

class User {
    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
        return result.rows[0]
    }

    static async createUser(username, email, hashedPassword) {
        let client;
        try {
            client = await pool.connect();
            await client.query('BEGIN');

            // Create user
            const userInsertResult = await client.query(
                'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
                [username, email, hashedPassword]
            );
            const newUser = userInsertResult.rows[0];

            // Create cart for the user
            const cartInsertResult = await client.query(
                'INSERT INTO cart (user_id, total_price) VALUES ($1, $2) RETURNING *',
                [newUser.id, 0.00]
            );
            const newCart = cartInsertResult.rows[0];

            await client.query('COMMIT');
            
            // Add cart details to user object
            newUser.cart = newCart;

            return newUser;
        } catch (err) {
            if (client) await client.query('ROLLBACK');
            throw err;
        } finally {
            if (client) client.release();
        }
    }
}

module.exports = User;