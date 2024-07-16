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
public class AuthorRepositoryTests {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    private Author author;
    private Book book;

    @BeforeEach
    public void setUp() {
        author = new Author();
        author.setName("John Doe");

        book = new Book();
        book.setTitle("Spring Boot Guide");

        Set<Book> books = new HashSet<>();
        books.add(book);

        author.setBooks(books);
        book.getAuthors().add(author);

        bookRepository.save(book);
        authorRepository.save(author);
    }

    @Test
    public void testSaveAuthor() {
        Author savedAuthor = authorRepository.save(author);
        Assertions.assertNotNull(savedAuthor);
        Assertions.assertNotNull(savedAuthor.getId());
    }

    @Test
    public void testFindAuthorById() {
        Optional<Author> foundAuthor = authorRepository.findById(author.getId());
        Assertions.assertTrue(foundAuthor.isPresent());
        Assertions.assertEquals(author.getName(), foundAuthor.get().getName());
    }

    @Test
    public void testDeleteAuthor() {
        authorRepository.delete(author);
        Optional<Author> foundAuthor = authorRepository.findById(author.getId());
        Assertions.assertFalse(foundAuthor.isPresent());
    }
}
