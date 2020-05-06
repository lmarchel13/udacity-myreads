import React from "react";
import BookItem from "./BookItem";

const SHELFS = {
  "Currently Reading": "currentlyReading",
  "Want to Read": "wantToRead",
  Read: "read",
};

const Bookshelf = ({ books = [], moveBookToShelf }) => {
  const renderBooks = (shelf) => {
    return books
      .filter((book) => book.shelf === shelf)
      .map((book) => <BookItem key={book.id} book={book} moveBookToShelf={moveBookToShelf} />);
  };

  const renderShelfs = () => {
    return Object.keys(SHELFS).map((shelf) => {
      return (
        <div key={shelf}>
          <h2 className="bookshelf-title">{shelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">{renderBooks(SHELFS[shelf])}</ol>
          </div>
        </div>
      );
    });
  };

  return <div className="bookshelf">{renderShelfs()}</div>;
};

export default Bookshelf;
