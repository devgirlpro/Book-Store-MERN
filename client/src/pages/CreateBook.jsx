import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import axios from 'axios';
import Spinner from '../components/Spinner';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setpublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSaveBook = async (e) => {
    e.preventDefault();
    const inputBookData = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:5555/books',
        inputBookData
      );
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
      <h1 className="text-3x1 my-4">CreateBook</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <form action="" onSubmit={handleSaveBook}>
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

export default CreateBook;
