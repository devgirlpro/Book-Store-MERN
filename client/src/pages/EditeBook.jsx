import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';


const EditeBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setpublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        console.log("EDITE BOOK ==>")
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setpublishYear(response.data.publishYear);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(error);
      }
    };
    fetchBookInfo();
  }, []);


  const handleEditeBook = async (e) => {
    e.preventDefault();
    const inputBookData = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5555/books/${id}`, inputBookData);
      setLoading(false);
      console.log('Book saved successfully:', response.data); //
      //clear form field after successful save
      setTitle('');
      setAuthor('');
      setpublishYear('');
      // Redirect to a confirmation page
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err);
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Edite Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <form action="" onSubmit={handleEditeBook}>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setpublishYear(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <button type="submit" className="p-2 bg-sky-300 m-8">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditeBook;
