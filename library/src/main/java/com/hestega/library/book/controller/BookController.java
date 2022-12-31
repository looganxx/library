package com.hestega.library.book.controller;

import com.hestega.library.book.model.Book;
import com.hestega.library.book.model.SimpleBook;
import com.hestega.library.book.services.BookService;
import jakarta.persistence.Embedded;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/books")
public class BookController {

    @Autowired
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/")
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @GetMapping("/ownedUser/")
    public List<SimpleBook> getBooksByUserEmail(@RequestParam(name = "userEmail") String userEmail) {
        return bookService.getBooksByUserEmail(userEmail);
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable("id") Long id) {
        return bookService.getBook(id);
    }
}
