package com.bookstore.crud.repository;

import com.bookstore.crud.model.Author;
import com.bookstore.crud.model.Book;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@DataJpaTest
public class BookRepositoryTests {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    private Author author;
    private Book book;

    @BeforeEach
    public void setUp() {
        author = new Author();
        author.setName("John Doe");

        book = new Book();
        book.setTitle("Spring Boot Guide");

        Set<Author> authors = new HashSet<>();
        authors.add(author);

        book.setAuthors(authors);
        author.getBooks().add(book);

        authorRepository.save(author);
        bookRepository.save(book);
    }

    @Test
    public void testSaveBook() {
        Book savedBook = bookRepository.save(book);
        Assertions.assertNotNull(savedBook);
        Assertions.assertNotNull(savedBook.getId());
    }

    @Test
    public void testFindBookById() {
        Optional<Book> foundBook = bookRepository.findById(book.getId());
        Assertions.assertTrue(foundBook.isPresent());
        Assertions.assertEquals(book.getTitle(), foundBook.get().getTitle());
    }

    @Test
    public void testDeleteBook() {
        bookRepository.delete(book);
        Optional<Book> foundBook = bookRepository.findById(book.getId());
        Assertions.assertFalse(foundBook.isPresent());
    }
}
