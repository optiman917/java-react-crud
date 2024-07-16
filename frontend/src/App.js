import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Link,
} from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import { AuthorProvider } from "./context/AuthorContext";
import BookList from "./components/books/BookList";
import AddBook from "./components/books/AddBook";
import EditBook from "./components/books/EditBook";
import AuthorList from "./components/authors/AuthorList";
import AddAuthor from "./components/authors/AddAuthor";
import EditAuthor from "./components/authors/EditAuthor";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <main className="max-w-3xl mx-auto">
        <BookProvider>
          <AuthorProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<AuthorList />} />
                <Route exact path="/authors" element={<AuthorList />} />
                <Route path="/authors/add" element={<AddAuthor />} />
                <Route path="/authors/edit/:id" element={<EditAuthor />} />
                <Route exact path="/books" element={<BookList />} />
                <Route path="/books/add" element={<AddBook />} />
                <Route path="/books/edit/:id" element={<EditBook />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthorProvider>
        </BookProvider>
      </main>
    </Router>
  );
};

function Layout() {
  return (
    <>
      <nav className="py-10">
        <ul className="flex gap-4">
          <li>
            <Link
              to="/authors"
              className="text-indigo-600 hover:text-indigo-900 font-semibold"
            >
              Authors
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="text-indigo-600 hover:text-indigo-900 font-semibold"
            >
              Books
            </Link>
          </li>
        </ul>
      </nav>

      <div className="rounded-xl border border-gray-300 py-10">
        <Outlet />
      </div>
    </>
  );
}

export default App;
