package com.bookstore.crud.service;

import com.bookstore.crud.dto.AuthorDTO;
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
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public AuthorDTO saveAuthor(AuthorDTO authorDTO) {
        Author author = convertToEntity(authorDTO);
        author = authorRepository.save(author);
        return convertToDto(author);
    }

    public AuthorDTO getAuthorById(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Author not found with id: " + id));
        return convertToDto(author);
    }

    public void deleteAuthor(Long id) {
        if (!authorRepository.existsById(id)) {
            throw new NotFoundException("Author not found with id: " + id);
        }
        authorRepository.deleteById(id);
    }

    private AuthorDTO convertToDto(Author author) {
        AuthorDTO authorDTO = new AuthorDTO();
        authorDTO.setId(author.getId());
        authorDTO.setName(author.getName());
        authorDTO.setBookIds(author.getBooks().stream().map(Book::getId).collect(Collectors.toSet()));
        return authorDTO;
    }

    private Author convertToEntity(AuthorDTO authorDTO) {
        Author author = new Author();
        author.setId(authorDTO.getId());
        author.setName(authorDTO.getName());
        Set<Book> books = authorDTO.getBookIds().stream().map(id -> bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Book not found with id: " + id))).collect(Collectors.toSet());
        author.setBooks(books);
        return author;
    }
}
