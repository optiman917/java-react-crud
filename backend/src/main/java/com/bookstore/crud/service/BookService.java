package com.bookstore.crud.service;

import com.bookstore.crud.dto.BookDTO;
import com.bookstore.crud.exception.NotFoundException;
import com.bookstore.crud.model.Author;
import com.bookstore.crud.model.Book;
import com.bookstore.crud.repository.AuthorRepository;
import com.bookstore.crud.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public BookDTO saveBook(BookDTO bookDTO) {
        Book book = convertToEntity(bookDTO);
        book = bookRepository.save(book);
        return convertToDto(book);
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Book not found with id: " + id));
        return convertToDto(book);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new NotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    private BookDTO convertToDto(Book book) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(book.getId());
        bookDTO.setTitle(book.getTitle());
        bookDTO.setAuthorIds(book.getAuthors().stream().map(Author::getId).collect(Collectors.toSet()));
        return bookDTO;
    }

    private Book convertToEntity(BookDTO bookDTO) {
        Book book = new Book();
        book.setId(bookDTO.getId());
        book.setTitle(bookDTO.getTitle());
        Set<Author> authors = bookDTO.getAuthorIds().stream().map(id -> authorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Author not found with id: " + id))).collect(Collectors.toSet());
        book.setAuthors(authors);
        return book;
    }
}
