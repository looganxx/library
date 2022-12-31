package com.hestega.library.book.repository;

import com.hestega.library.book.entity.BookEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
//    @Query(
//            value = "SELECT * FROM books b WHERE b.user_email =:email",
//            nativeQuery = true)
    List<BookEntity> findByUserEmail(String user_email);
}
