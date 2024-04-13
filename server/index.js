import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongodbUrl } from './config.js';
import bookRoute from './routes/book.route.js';
import cors from 'cors';



const app = express();

app.use(express.json());

//middleware for handling CORS POLICA
//option 1: Allow Origins with default of cors(*)
app.use(cors());

//option 2: Allow Custom Origins
// app.use(cors({
//     origin: 'HHTP://localhost:3003',
//     methods: ['GET', 'POSt', 'PUT', 'DELETE'],
//     alloweHeaders: ['Content-type']
// }))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
  });
  

app.use('/books', bookRoute);

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
