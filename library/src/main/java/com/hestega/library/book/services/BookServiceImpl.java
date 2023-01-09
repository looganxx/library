package com.hestega.library.book.services;

import com.hestega.library.book.entity.BookEntity;
import com.hestega.library.book.model.Book;
import com.hestega.library.book.model.SimpleBook;
import com.hestega.library.book.repository.BookRepository;
import com.hestega.library.user.entity.UserEntity;
import com.hestega.library.user.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

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

    @Override
    public Book addBook(Book book) {

        UserEntity user = userRepository.findByEmail(book.getUser_email());

        BookEntity bookEntity = new BookEntity();

        BeanUtils.copyProperties(book, bookEntity);

        bookEntity.setUser(user);

        bookEntity = bookRepository.save(bookEntity);

        book.setId(bookEntity.getId());

        return book;
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
                bookEntity.getNotes(),
                bookEntity.getRating(),
                bookEntity.getUser() == null ? null : bookEntity.getUser().getEmail());
    }

    private SimpleBook buildSimpleBook(BookEntity bookEntity){
        return new SimpleBook(
                bookEntity.getId(),
                bookEntity.getTitle(),
                bookEntity.getAuthor());
    }

    @Override
    public Book deleteBook(Long id) {
        BookEntity bookEntity;
        if (bookRepository.findById(id).isPresent()) {
            bookEntity = bookRepository.findById(id).get();
        } else {
            throw new NoSuchElementException();
        }

        bookEntity.setDeleteDate(new Date(Calendar.getInstance().getTime().getTime()));

        bookRepository.save(bookEntity);

        return new Book(
                bookEntity.getId(),
                bookEntity.getTitle(),
                bookEntity.getAuthor(),
                bookEntity.getIsbnCode(),
                bookEntity.getInsertDate(),
                bookEntity.getDeleteDate(),
                bookEntity.getPlot(),
                bookEntity.getTotalReadings(),
                bookEntity.getNotes(),
                bookEntity.getRating(),
                bookEntity.getUser() == null ? null : bookEntity.getUser().getEmail());
    }

    @Override
    public Book updateBook(Book book) {
        BookEntity bookEntity;
        if (bookRepository.findById(book.getId()).isPresent()) {
            bookEntity = bookRepository.findById(book.getId()).get();
        } else {
            throw new NoSuchElementException();
        }

        bookEntity.setTitle(book.getTitle());
        bookEntity.setAuthor(book.getAuthor());
        bookEntity.setIsbnCode(book.getIsbnCode());
        bookEntity.setInsertDate(book.getInsertDate());
        bookEntity.setDeleteDate(book.getDeleteDate());
        bookEntity.setPlot(book.getPlot());
        bookEntity.setTotalReadings(book.getTotalReadings());
        bookEntity.setNotes(book.getNotes());
        bookEntity.setRating(book.getRating());

        bookRepository.save(bookEntity);

        return book;
    }
}
