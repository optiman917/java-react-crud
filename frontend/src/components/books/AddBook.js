import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import { AuthorContext } from "../../context/AuthorContext";

const AddBook = () => {
  const navigate = useNavigate();
  const { addBook } = useContext(BookContext);
  const { authors } = useContext(AuthorContext);
  const [title, setTitle] = useState("");
  const [authorIds, setAuthorIds] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title,
      authorIds: authorIds.map(Number), // Convert author IDs to numbers
    };
    addBook(newBook);
    setTitle("");
    setAuthorIds([]);
    navigate("/books");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-4">
        <div className="border-b border-gray-900/10 pb-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Book
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="authors"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Authors
              </label>
              <div className="mt-2">
                <select
                  id="authors"
                  name="authors"
                  multiple
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={authorIds}
                  onChange={(e) =>
                    setAuthorIds(
                      [...e.target.selectedOptions].map((option) => option.value)
                    )
                  }
                  required
                >
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 px-4">
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default AddBook;
