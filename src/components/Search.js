import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookItem from "./BookItem";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(false);
  const [shelfBooks, setShelfBooks] = useState({});

  const fetchAllBooks = async () => {
    const obj = {};
    const data = await BooksAPI.getAll();
    data.map((book) => (obj[book.id] = book));
    setShelfBooks(obj);
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  let timeout = null;

  const render = () => {
    if (!searchTerm) return "Search for a book by title or author (min. 3 characters)";

    return books.length ? (
      books.map((book) => (
        <BookItem
          inShelf={shelfBooks[book.id] ? shelfBooks[book.id] : null}
          key={book.id}
          book={book}
          searchPage={true}
        ></BookItem>
      ))
    ) : (
      <span>
        No books found with name <strong>{searchTerm}</strong>
      </span>
    );
  };

  const resetSearch = () => {
    setBooks([]);
    setSearchTerm(false);
  };

  const handleChange = (event) => {
    clearTimeout(timeout);
    const { value } = event.target;

    if (value.length) {
      timeout = setTimeout(() => {
        BooksAPI.search(value).then((data) => {
          setBooks(data);
          setSearchTerm(value);
        });
      }, 1000);
    } else {
      resetSearch();
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={handleChange} />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{render()}</ol>
      </div>
    </div>
  );
}
