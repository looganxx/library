import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SimpleBook } from '../model/simpleBook';
import { Book } from '../model/book';


const BOOKS_API_BASE_URL = "http://localhost:9001/api/v1/books/";
@Injectable({
  providedIn: 'root'
})
export class UserLibraryService {

  constructor(private http: HttpClient) { }


  getBooksOwnedByUser(userEmail: string) : Observable<SimpleBook[]>{
    var params:HttpParams = new HttpParams().set('userEmail', userEmail);

    return this.http.get<SimpleBook[]>(BOOKS_API_BASE_URL + 'ownedUser/', { params: params });

  }

  getBookDetails(id: number) :  Observable<Book> {
    return this.http.get<Book>(BOOKS_API_BASE_URL + id);
  }
}
