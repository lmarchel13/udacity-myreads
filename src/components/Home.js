import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

import Bookshelf from "./Bookshelf";

export default function Home() {
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    const data = await BooksAPI.getAll();
    setBooks(data);
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const moveBookToShelf = async () => {
    await fetchAllBooks();
  };

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Bookshelf books={books} moveBookToShelf={moveBookToShelf}></Bookshelf>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}
