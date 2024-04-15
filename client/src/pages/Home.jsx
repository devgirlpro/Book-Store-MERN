import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../components/home/BookTable';
import BookCard from '../components/home/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    const fetchdata = async () => {
      try {
        const response = await axios.get('http://localhost:5555/books');
        console.log(response.data.data);
        setBooks(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">BookS List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-600 text-4xl" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BookTable books={books} />
      ) : (
        (<BookCard books={books} />)
      )}
    </div>
  );
};

export default Home;
