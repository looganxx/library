package com.hestega.library.book.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleBook {
    private Long Id;
    private String title;
    private String author;
}
