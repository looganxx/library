import { Component } from '@angular/core';
import { SimpleBook } from 'src/app/model/simpleBook';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLibraryService } from 'src/app/services/user-library.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent {

  books : SimpleBook[] = [];
  isLoad: boolean = false;
  isAnyError: boolean = false;

  constructor(private router: Router,
              private userLibraryService: UserLibraryService,
              private loginService: LoginService,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit() {

    if(!this.loginService.isLoggedIn()){
      this.router.navigate(['/']);
    }

    // Get the owned books
    this.userLibraryService.getBooksOwnedByUser()
     .subscribe({
       next: (books: SimpleBook[]) => {
          this.books = books;
          setTimeout( () => { this.isLoad = true }, 500 );
          //this.isLoad = true
       },
       error: (error: any) => {
         console.error(error);
         this.isAnyError = true;
       }
     });    
    
    // check for values
    setTimeout( () => { this.checkLoad() }, 5000 );
  }

  checkLoad(){
    if(this.isAnyError === true) {
      this.router.navigate(['**']);
    }
  }
}
