import React from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookSingleCard from './BookSingleCard';

// import BookModal from './BookModal';

const BookCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookSingleCard key={book._id} book ={book}/>
      ))}
    </div>
  );
};

export default BookCard;

// <BookSingleCard key={item._id} book={item} />

/*  { {showModal && (
          <BookModal book={item} onClose={() => setShowModal(false)} />
        )} } */
