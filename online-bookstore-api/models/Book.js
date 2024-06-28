const pool = require('../config/db');

class Book {
    static async getAllBooks() {
        const result = await pool.query('SELECT * FROM books');
        return result.rows;
    }
    
    static async getBookById(id) {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async createBook(title, author, genre, price, stockQuantity, description) {
        const result = await pool.query(
            'INSERT INTO books (title, author, genre, price, stock_quantity, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, author, genre, price, stockQuantity, description]
        );
        return result.rows[0];
    }

    
    static async updateBook(id, title, author, genre, price, stockQuantity, description) {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, genre = $3, price = $4, stock_quantity = $5, description = $6 WHERE id = $7 RETURNING *',
            [title, author, genre, price, stockQuantity, description, id]
        );
        return result.rows[0];
    }
    static async deleteBook(id) {
        await pool.query('DELETE FROM books where id= $1', [id]);
    }
}

module.exports = Book;