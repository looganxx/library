import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { LoginService } from 'src/app/services/login.service';
import { UserLibraryService } from 'src/app/services/user-library.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  hoverRating: boolean = false;
  textAreaColor: String = "white";
  rating: number;
  notes: String = "";

  book: Book = {
    id: -1,
    title: "",
    author: "",
    isbnCode: "",
    insertDate: "",
    deleteDate: "",
    plot: "",
    totalReadings: 0,
    notes: "",
    rating: 0,
    user_email: ""
  };

  constructor(private router: Router,
              private loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private libraryService: UserLibraryService) { }

  ngOnInit() {

    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }
    
    // Get id from url
    this.book.id = this.activatedRoute.snapshot.params['id'];

    this.libraryService.getBookDetails(this.book.id).subscribe({
      next: (book) => {
        this.book = book;
        this.rating = this.book.rating;
        this.notes = this.book.notes ? this.book.notes : '';
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['**']);
      }
    });
  }

  onDelete(){
    // Already confirmed
    this.libraryService.deleteBook(this.book.id).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (e) => {
        console.error(e.message);
      }
    });
  }

  onIncrease(){
    let bookToUpdate: Book = {
      id: -1,
      title: "",
      author: "",
      isbnCode: "",
      insertDate: "",
      deleteDate: "",
      plot: "",
      totalReadings: 0,
      notes: "",
      rating: 0,
      user_email: ""
    };

    Object.assign(bookToUpdate, this.book);
    bookToUpdate.totalReadings++;

    this.libraryService.updateBook(bookToUpdate).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (e) => {
        console.error(e.message);
      }
    });
  }

  onDecrease(){
    let bookToUpdate: Book = {
      id: -1,
      title: "",
      author: "",
      isbnCode: "",
      insertDate: "",
      deleteDate: "",
      plot: "",
      totalReadings: 0,
      notes: "",
      rating: 0,
      user_email: ""
    };

    Object.assign(bookToUpdate, this.book);
    bookToUpdate.totalReadings--;

    this.libraryService.updateBook(bookToUpdate).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (e) => {
        console.error(e.message);
      }
    });
  }

  onModify(){
    this.router.navigate(['/modify/' + this.book.id]);
  }

  onSubmitNotes(){

    let bookToUpdate: Book = {
      id: -1,
      title: "",
      author: "",
      isbnCode: "",
      insertDate: "",
      deleteDate: "",
      plot: "",
      totalReadings: 0,
      notes: "",
      rating: 0,
      user_email: ""
    };

    Object.assign(bookToUpdate, this.book);
    bookToUpdate.notes = this.notes;

    this.libraryService.updateBook(bookToUpdate).subscribe({
      next: (book) => {
        this.book = book;
        this.textAreaColor = "#0d6efd";

        setTimeout(() => {
          this.textAreaColor = 'white';
        }, 1000);
      },
      error: (e) => {
        console.error(e.message);
      }
    });
  }

  onClearNote(){

    let bookToUpdate: Book = {
      id: -1,
      title: "",
      author: "",
      isbnCode: "",
      insertDate: "",
      deleteDate: "",
      plot: "",
      totalReadings: 0,
      notes: "",
      rating: 0,
      user_email: ""
    };

    Object.assign(bookToUpdate, this.book);
    this.notes = "";
    bookToUpdate.notes = this.notes;

    this.libraryService.updateBook(bookToUpdate).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (e) => {
        console.error(e.message);
      }
    });
  }

  onHover(){
    this.hoverRating = true;
    
  }

  onLeave(){
    this.hoverRating = false;
  }

  onRatingChanged(){
    let bookToUpdate: Book = {
      id: -1,
      title: "",
      author: "",
      isbnCode: "",
      insertDate: "",
      deleteDate: "",
      plot: "",
      totalReadings: 0,
      notes: "",
      rating: 0,
      user_email: ""
    };

    Object.assign(bookToUpdate, this.book);
    bookToUpdate.rating = this.rating;

    if(this.hoverRating === true){
      this.libraryService.updateBook(bookToUpdate).subscribe({
        next: (book) =>
        {
          this.book = book;
        },
        error: (e) =>
        {
          console.error(e.message);
        }
      });
    }
    
  }
}
