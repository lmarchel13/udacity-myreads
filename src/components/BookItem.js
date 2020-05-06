import React from "react";
import * as BooksAPI from "../BooksAPI";
import { useHistory } from "react-router-dom";

const BookItem = ({ book, moveBookToShelf, inShelf = null }) => {
  const history = useHistory();
  const { imageLinks: { smallThumbnail = "" } = {}, title, authors = [], shelf } = book;

  const handleChange = async (event) => {
    const { value: shelf } = event.target;

    await BooksAPI.update(book, shelf);

    return !moveBookToShelf ? history.push("/") : moveBookToShelf();
  };

  const getShelfDefaultValue = () => {
    if (inShelf) return inShelf.shelf;
    return shelf ? shelf : "none";
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${smallThumbnail}")`,
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={handleChange} value={getShelfDefaultValue()}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    </li>
  );
};

export default BookItem;
