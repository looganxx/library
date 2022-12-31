\c library;

create table
    users (
        email varchar(255) not null,
        first_name varchar(255) not null,
        last_name varchar(255) not null,
        primary key (email)
    );

create table
   books (
      id bigserial not null,
      author varchar(255) not null,
      delete_date date,
      insert_date date not null,
      isbn_code varchar(255) not null,
      plot varchar(255) not null,
      title varchar(255) not null,
      total_readings integer not null,
      user_email varchar(255),
      primary key (id)
   );

insert into users (email, first_name, last_name) 
values ('x@gmail.com', 'giuseppe', 'x');

insert into users (email, first_name, last_name) 
values ('y@gmail.com', 'marco', 'y');

insert into users (email, first_name, last_name) 
values ('z@gmail.com', 'luca', 'z');

insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
values ('Dan Brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);

-- 7) Genki Kawamura, narrativa, Se i gatti scomparissero dal mondo
-- 8) Irène Némirovsky, romanzo, Jezabel
-- 9) Harper Lee, romanzo, Il buio oltre la siepe
-- 10) Marcello Fois, mystery, Meglio morti
-- 11) Virginia Woolf, saggio, Una stanza tutta per sé
-- 12) Antoine de Saint-Exupéry, fiaba, Il piccolo principe 
-- 13) Leonardo Sciascia, romanzo, Il giorno della civetta
-- 14) Alexandre Dumas, romanzo, Il conte di Montecristo 
-- 15) Seth Godin, marketing, La mucca viola


insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings, user_email) 
values ('Emily Bronte', 'romanzo', 'Cime tempestose ', NULL, '2021-06-12', '111111', 0, 'x@gmail.com' );
insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings, user_email) 
values ('Carlos Ruiz Zafón', 'thriller', 'L’ombra del vento', NULL, '2021-03-12', '222222', 1, 'x@gmail.com' );
insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings, user_email)  
values ('George Orwell', 'distopico', '1984', NULL, '2021-10-21', '333333', 2, 'y@gmail.com' );
insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings, user_email) 
values ('Giacomo Mazzariol', 'narrativa', 'Gli squali', NULL, '2021-11-13', '444444', 3, 'y@gmail.com' );
insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings, user_email)  
values ('Domenico Starnone', 'romanzo', 'Lacci', '2022-10-12', '2020-10-12', '555555', 2, 'z@gmail.com' );

-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('Fëdor Dostoevskij ', 'narrativa', 'Le notti bianche', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);
-- insert into books (author, plot, title, delete_date, insert_date, isbn_code, total_readings) 
-- values ('dan brown', 'thriller', 'Crypto', NULL, '2021-10-12', '123456', 2);


