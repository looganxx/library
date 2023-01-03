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

    const currentLoggedUser: User = this.loginService.getLoggedUser();
/*
    if (currentLoggedUser.emailId != "" &&
        this._userLogged === currentLoggedUser && 
        this._cachedData){
      console.log('cached');
      return of(this._cachedData);
    }
    else
    {
    */
      console.log('not cached');
      this._userLogged = currentLoggedUser;
      return this.http.get<SimpleBook[]>(
        BOOKS_API_BASE_URL + 'ownedUser/', 
        { params: new HttpParams().set('userEmail', currentLoggedUser.emailId) })
        .pipe(
          tap((res) => { this._cachedData = res; })
        )
    // }
  }

  getBookDetails(id: number) :  Observable<Book> {
    return this.http.get<Book>(BOOKS_API_BASE_URL + id);
  }


  addBook(book: Book){
    return this.http.post<Book>(BOOKS_API_BASE_URL, book)
  }
}
