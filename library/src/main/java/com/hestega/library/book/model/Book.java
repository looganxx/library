package com.hestega.library.book.model;

import com.hestega.library.user.model.User;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private Long Id;
    private String title;
    private String author;
    private String isbnCode;
    private Date insertDate;
    private Date deleteDate;
    private String plot;
    private Integer totalReadings;
    private String notes;
    private Integer rating;
    private String user_email;
}
