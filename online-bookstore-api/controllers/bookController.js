const Book = require("../models/Book");


exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks ();
        res.status(200).json(books);
    }catch(err) {
        res.status(500).json({message: "Error fetching books", err});
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({message:"Book not found."});
        }
        res.status(200).json(book);
    }catch(err) {
        res.status(500).json({message:"Error fetching book details", err});
    }
};

exports.createBook = async (req, res) => {
    try {
        const {title, author, genre, price, stockQuantity, description} = req.body;
        const newBook = await Book.createBook(title, author, genre, price, stockQuantity, description);
        res.status(201).json({message:'book created successfully', book: newBook});

    }catch (err) {
        res.status(500).json({message:'Error creating book', err});
    }
};

exports.updateBook = async (req, res) => {
    try {
        const {title, author, genre, price, stockQuantity, description} = req.body;
        const updatedBook = await Book.updateBook(req.params.id, title, author, genre, price, stockQuantity, description);
        if (!updatedBook) {
            return res.status(404).json({message: "Book not found"});
        }
        res.status(200).json({message:"Book updated Successfully", book: updated})
    }catch (err) {
        res.status(500).json({message: 'Book updated successfully', book: this.updatedBook});

    }
};

exports.deleteBook = async (req, res) => {
    try {
        await Book.deleteBook(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', err });
    }
};
