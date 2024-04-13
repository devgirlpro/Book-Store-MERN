import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useState,useEffect } from 'react';
import BackButton from '../components/BackButton';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        console.log(response.data);
        setBook(response.data);
        console.log(book)
        setLoading(false);

      }catch(err) {
        setError(err);
        console.log(error)
      }finally {
        setLoading(false);
      }
    } 
    fetchBookInfo()
  }, [])


  return (
    <div className='p-4'>
       <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
     
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span>{book._id}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span>{book.title}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span>{book.author}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span>{book.publishYear}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>

          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'></span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>


        </div>
      )}
    </div>
  )
}

export default ShowBook