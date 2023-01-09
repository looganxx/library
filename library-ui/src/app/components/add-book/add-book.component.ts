import { animate, style, transition, trigger } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { Book } from 'src/app/model/book';
import { GBookResponse, GoogleBook } from 'src/app/model/GoogleBook';
import { GBookService } from 'src/app/services/g-book.service';
import { LoginService } from 'src/app/services/login.service';
import { UserLibraryService } from 'src/app/services/user-library.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  book: Book = {
    id: 0,
    title: '',
    author: '',
    isbnCode: '',
    insertDate: "",
    deleteDate: null,
    plot: '',
    totalReadings: 0,
    notes: "",
    rating: 0,
    user_email: ''
  }
  
  showSearchBar: boolean = false;

  googleBooks: GoogleBook[] = [];
  googleBook: GoogleBook;

  constructor(private router: Router,
              private loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private libraryService: UserLibraryService,
              private gBookService: GBookService) { }
  
  ngOnInit() {

    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  onAddBook({value, valid}: {value: Book, valid: boolean | null} ){
    if(!valid){
      // errors
      $('#valueAlert').fadeIn();
      setTimeout( () => $('#valueAlert').fadeOut(), 4000);
      return;
    }
    
    value.totalReadings = 0;
    value.user_email = this.loginService.getLoggedUser().emailId;
    const d = new Date();
    let day = String(d.getDate()).length < 2 ? '0' + d.getDate() : d.getDate()
    value.insertDate = 
      d.getFullYear() + "-" + 
      d.getMonth()+1 + "-" + day;
    value.deleteDate = null;

    this.libraryService.addBook(value).subscribe({
      next: res => {
        console.log(res);
        // Redirect
        this.router.navigate(['/userLibrary']);
      },
      error: err => {
        console.log(err);
        $('#addAlert').fadeIn();
        $('#addAlert').text(err.message);
        setTimeout( () => $('#addAlert').fadeOut(), 4000);
        return;
      }
    })
  }

  onSearchButtonClicked(){
    this.showSearchBar = !this.showSearchBar;
  }

  formatter = (book: GoogleBook) => book.volumeInfo.title;

  search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>{
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) => {
          this.gBookService.getBooks(term).subscribe({
            next: res => {
              this.googleBooks = (res as GBookResponse).items;              
            },
            error: err => {
              console.log(err);
              return [];
            }
          })
          return this.googleBooks.slice(0, 10)
        }),
    );
  }

  onSelectItemSearch(event: any){
    this.googleBook = event.item as GoogleBook;
    
    this.book.title = this.googleBook.volumeInfo.title;
    this.book.author = this.googleBook.volumeInfo.authors.at(0)!;
    this.book.plot = this.googleBook.volumeInfo.description.slice(0,255);
    this.book.isbnCode = this.googleBook.volumeInfo.industryIdentifiers.slice(-1).at(0)?.identifier!; 
  }
}