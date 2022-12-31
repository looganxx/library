package com.hestega.library.book.services;

import com.hestega.library.book.entity.BookEntity;
import com.hestega.library.book.model.Book;
import com.hestega.library.book.model.SimpleBook;
import com.hestega.library.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> getBooks() {
        List<BookEntity> bookEntities = bookRepository.findAll();
        List<Book> books = bookEntities.stream().map(this::buildBook).toList();

        return books;
    }

    @Override
    public List<SimpleBook> getBooksByUserEmail(String userEmail) {
        List<BookEntity> bookEntities = bookRepository.findByUserEmail(userEmail);

        List<SimpleBook> books = bookEntities.stream().map(this::buildSimpleBook).toList();

        return books;

//        return null;
    }

    @Override
    public Book getBook(Long id) throws NoSuchElementException {
        return buildBook(bookRepository.findById(id).get());
    }

    private Book buildBook(BookEntity bookEntity){
        return new Book(
                bookEntity.getId(),
                bookEntity.getTitle(),
                bookEntity.getAuthor(),
                bookEntity.getIsbnCode(),
                bookEntity.getInsertDate(),
                bookEntity.getDeleteDate(),
                bookEntity.getPlot(),
                bookEntity.getTotalReadings(),
                bookEntity.getUser() == null ? null : bookEntity.getUser().getEmail());
    }

    private SimpleBook buildSimpleBook(BookEntity bookEntity){
        return new SimpleBook(
                bookEntity.getId(),
                bookEntity.getTitle(),
                bookEntity.getAuthor());
    }
}
