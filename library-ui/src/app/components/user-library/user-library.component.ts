import { Component } from '@angular/core';
import { SimpleBook } from 'src/app/model/simpleBook';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLibraryService } from 'src/app/services/user-library.service';


@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent {

  userEmail: string = '';
  books : SimpleBook[] = [];
  isLoad: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userLibraryService: UserLibraryService) { }

  ngOnInit() {
    // Get id from url
    this.userEmail = this.activatedRoute.snapshot.params['userEmail'];

    // Get the owned books
    this.userLibraryService.getBooksOwnedByUser(this.userEmail)
     .subscribe(data => {
        this.books = data;
        setTimeout( () => { this.isLoad = true; }, 2000 );
      });
  }
}
