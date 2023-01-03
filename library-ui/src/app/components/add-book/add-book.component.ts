import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
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
    user_email: ''
  }

  constructor(private router: Router,
              private loginService: LoginService,
              private activatedRoute: ActivatedRoute,
              private libraryService: UserLibraryService) { }
  
  ngOnInit() {

    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  onAddBook({value, valid}: {value: Book, valid: boolean | null} ){
    if(!valid){
      // errors
      alert('Please chek inserted value')
    }
    else{
      value.totalReadings = 0;
      value.user_email = this.loginService.getLoggedUser().emailId;
      const d = new Date();
      let day = String(d.getDate()).length < 2 ? '0' + d.getDate() : d.getDate()
      value.insertDate = 
        d.getFullYear() + "-" + 
        d.getMonth()+1 + "-" + day;
      value.user_email = "z@gmail.com"
      value.deleteDate = null;
      console.log(value);

      this.libraryService.addBook(value).subscribe({
        next: res => {
          console.log(res);
          // Redirect
          this.router.navigate(['/userLibrary']);
        },
        error: err => {
          console.log(err);
          alert(err.message);
        }
      })
    }
  }
}
