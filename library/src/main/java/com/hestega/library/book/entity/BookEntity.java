package com.hestega.library.book.entity;

import com.hestega.library.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
@Table(name = "books")
public class BookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private String isbnCode;
    @Column(nullable = false)
    private Date insertDate;
    private Date deleteDate;
    @Column(nullable = false)
    private String plot;
    @Column(nullable = false)
    private Integer totalReadings;

    @ManyToOne(
            cascade = CascadeType.ALL
    )
    @JoinColumn(
            name = "user_email",
            referencedColumnName = "email"
    )
    private UserEntity user;

}
