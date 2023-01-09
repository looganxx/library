import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { SimpleBook } from '../model/simpleBook';
import { Book } from '../model/book';
import { LoginService } from './login.service';
import { User } from '../model/user';


const BOOKS_API_BASE_URL = "http://localhost:9001/api/v1/books/";
@Injectable({
  providedIn: 'root'
})
export class UserLibraryService {

  private _cachedData: SimpleBook[];
  private _userLogged: User = 
    {
      emailId: "",
      firstName: "",
      lastName: ""
    };

  constructor(private http: HttpClient,
              private loginService: LoginService) {
               }


  getBooksOwnedByUser() : Observable<SimpleBook[]>{

    this._userLogged = this.loginService.getLoggedUser();

    return this.http.get<SimpleBook[]>(
      BOOKS_API_BASE_URL + 'ownedUser/', 
      { params: new HttpParams().set('userEmail', this._userLogged.emailId) })
  }

  getBookDetails(id: number) :  Observable<Book> {
    return this.http.get<Book>(BOOKS_API_BASE_URL + id);
  }


  addBook(book: Book) :  Observable<Book> {
    return this.http.post<Book>(BOOKS_API_BASE_URL, book)
  }

  deleteBook(id: number) : Observable<Book> {
    return this.http.post<Book>(BOOKS_API_BASE_URL + "delete/" + id, {
      responseType: "json"
    });
  }

  updateBook(book: Book) : Observable<Book>  {
    return this.http.post<Book>(BOOKS_API_BASE_URL + "update", book);
  }
}
