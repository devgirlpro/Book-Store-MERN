import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      require: true,
      type: String,
    },
    author: {
      require: true,
      type: String,
    },
    publishYear: {
      require: true,
      type: Number,
    },
  },
  { timestamps: true }
);


export const Book = mongoose.model("Books", bookSchema)