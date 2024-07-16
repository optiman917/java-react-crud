import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch books", error);
      setLoading(false);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await axiosInstance.post("/books", book);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Failed to add book", error);
    }
  };

  const updateBook = async (id, updatedBook) => {
    try {
      await axiosInstance.put(`/books/${id}`, updatedBook);
      await fetchBooks();
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  return (
    <BookContext.Provider
      value={{ books, loading, fetchBooks, addBook, updateBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
};
