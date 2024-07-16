import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";

export const AuthorContext = createContext();

export const AuthorProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axiosInstance.get("/authors");
      setAuthors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch authors", error);
      setLoading(false);
    }
  };

  const addAuthor = async (author) => {
    try {
      const response = await axiosInstance.post("/authors", author);
      setAuthors([...authors, response.data]);
    } catch (error) {
      console.error("Failed to add author", error);
    }
  };

  const updateAuthor = async (id, updatedAuthor) => {
    try {
      await axiosInstance.put(`/authors/${id}`, updatedAuthor);
      await fetchAuthors();
    } catch (error) {
      console.error("Failed to update author", error);
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axiosInstance.delete(`/authors/${id}`);
      setAuthors(authors.filter((author) => author.id !== id));
    } catch (error) {
      console.error("Failed to delete author", error);
    }
  };

  return (
    <AuthorContext.Provider
      value={{ authors, loading, fetchAuthors, addAuthor, updateAuthor, deleteAuthor }}
    >
      {children}
    </AuthorContext.Provider>
  );
};
