import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const GBOOK_HTTP = "https://www.googleapis.com/books/v1/volumes"
const API_KEY = "AIzaSyCmgZ-CwgB9xKQIDLdsxn_SU2DoFkgix8A";

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
