import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY } from '../security/apykey';

const GBOOK_HTTP = "https://www.googleapis.com/books/v1/volumes"



@Injectable({
  providedIn: 'root'
})
export class GBookService {

  constructor(private http: HttpClient) { }

  getBooks(bookToSearch: String){
    let params = new HttpParams();
    params = params.set('q', bookToSearch.toString());
    params = params.set('key', API_KEY);

    return this.http.get(GBOOK_HTTP, { params: params });
  }
}
