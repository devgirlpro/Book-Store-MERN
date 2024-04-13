import { Book } from '../models/bookModel.js';


//create a book
 const createBook = async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        res
          .status(400)
          .sendStatus({
            message: 'send all required field: title, author, publishYear',
          });
      }
      const book = await Book.create(req.body)
      res.status(200).json(book)
    } catch {}
  }

  //get all books 
 const getAllBooks = async (req, res)=> {
    try {
        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        })

    }catch(err) {
        res.status(500).json({message: err.messahe})
    }
}

//get a book by id
const getSingleBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json({ messahe: err.message });
    }
  }

  //edite and update a book 
  const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id);
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      const updatedBook = await Book.findByIdAndUpdate(id, req.body);
      res.status(200).json(updatedBook);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //delete a book
const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      const deletedBook = await Book.findByIdAndDelete(id);
      res.status(200).json({ message: 'Book is successfulls Deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }


export { createBook, getAllBooks, getSingleBook, updateBook, deleteBook  };




