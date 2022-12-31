import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../model/user';


const USER_API_BASE_URL = "http://localhost:9001/api/v1/users/";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(USER_API_BASE_URL);
  }
}
