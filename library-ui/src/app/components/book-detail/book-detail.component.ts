import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book';
import { UserLibraryService } from 'src/app/services/user-library.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {

  book: Book = {
    id: -1,
    title: "",
    author: "",
    isbnCode: "",
    insertDate: new Date(),
    deleteDate: new Date(),
    plot: "",
    totalReadings: 0,
    userEmail: ""
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private libraryService: UserLibraryService) { }

  ngOnInit() {
    // Get id from url
    this.book.id = this.activatedRoute.snapshot.params['id'];

    this.libraryService.getBookDetails(this.book.id).subscribe(
      book => {
        this.book = book;
      }
    );

    if(this.book.id === -1) {
      this.router.navigate(['**']);
    }
  }
}
