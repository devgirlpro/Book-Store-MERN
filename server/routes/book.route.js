import express from 'express';
import { Book } from '../models/bookModel.js';

import { createBook, getAllBooks, getSingleBook, updateBook, deleteBook } from '../controllers/book.controller.js';

const router = express.Router();

//create and save a new book => post
router.post('/', createBook);

//get all books
router.get('/', getAllBooks);

//get single Book
router.get('/:id', getSingleBook);

//edite a book
router.put('/:id', updateBook);

//delete a book
router.delete('/:id', deleteBook);

export default router;
