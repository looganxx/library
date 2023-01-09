import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { LoginService } from 'src/app/services/login.service';
import { UserLibraryService } from 'src/app/services/user-library.service';

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-book.component.html',
  styleUrls: ['./modify-book.component.css']
})
export class ModifyBookComponent {

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

  constructor(private activatedRoute: ActivatedRoute,
              private libraryService: UserLibraryService,
              private router: Router,
              private loginService: LoginService) { }
  
  ngOnInit() {

    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }

    // Get id from url
    this.book.id = this.activatedRoute.snapshot.params['id'];

    this.libraryService.getBookDetails(this.book.id).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['**']);
      }
    });
  }

  onModifyBook({value, valid}: {value: Book, valid: boolean | null} ){
    if(!valid){
      // errors
      $('#valueAlert').fadeIn();
      setTimeout( () => $('#valueAlert').fadeOut(), 4000);
      return;
    }
    
    this.libraryService.updateBook(this.book).subscribe({
      next: (book) => {
        this.book = book;
        this.router.navigate(['/book/' + this.book.id]);
      },
      error: (error) => {
        console.log(error.message);
      }
    });
  }
}
