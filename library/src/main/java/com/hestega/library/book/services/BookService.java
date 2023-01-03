package com.hestega.library.book.services;

import com.hestega.library.book.model.Book;
import com.hestega.library.book.model.SimpleBook;

import java.util.List;
import java.util.NoSuchElementException;

public interface BookService {
    List<Book> getBooks();

    List<SimpleBook> getBooksByUserEmail(String userEmail);

    Book getBook(Long id) throws NoSuchElementException;

    Book addBook(Book book);
}
