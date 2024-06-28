const express = require ('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const {authenticateToken, authorizeUser} = require ("../middlewares/authMiddleware");

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', authenticateToken, authorizeUser('admin'), bookController.createBook);
router.put('/books/:id', authenticateToken, authorizeUser('admin'), bookController.updateBook);
router.delete('/books/:id', authenticateToken, authorizeUser('admin'), bookController.deleteBook);

module.exports = router;
