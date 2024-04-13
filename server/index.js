import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongodbUrl } from './config.js';
import { Book } from './models/bookModels.js';
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   console.log(req);
//   res.status(200).send('welcome to mern stack');
// });

//create and save a new book => post
app.post('/', async (req, res) => {
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
});

//get all books
app.get('/', async (req, res)=> {
    try {
        const books = await Book.find({});
        res.status(200).json({
            count: books.length,
            data: books
        })

    }catch(err) {
        res.status(500).json({message: err.messahe})
    }
})

//get single Book
app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if(!book) {
            return res.status(404).json({message: "Book not found"})
        }

        res.status(200).json(book)

    } catch(err) {
        res.status(500).json({messahe: err.message})
    }
})

//edite a book
app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndUpdate(id);

        if(!book) {
            return res.status(404).json({message: "Book not found"})
        }

        const updatedBook = await Book.findByIdAndUpdate(id, req.body)
        res.status(200).json(updatedBook)

    }catch(err) {
        res.status(500).json({message: err.message})
    }
})


//delete a book
app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if(!book) {
            return res.status(404).json({message: "Book not found"})
        }

        const deletedBook = await Book.findByIdAndDelete(id)
        res.status(200).json({message: "Book is successfulls Deleted"})
        
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})
mongoose
  .connect(mongodbUrl)
  .then(() => {
    console.log('App Connected to dataBase!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, 'Connection faileed!');
  });
