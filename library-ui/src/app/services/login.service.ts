import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { User } from '../model/user';


const USER_API_BASE_URL = "http://localhost:9001/api/v1/users/";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _isLoggedIn: boolean = false;
  private _userData: Subject<User> = new Subject();

  user: User = {
    emailId: "",
    firstName: "",
    lastName: ""
  };

  constructor(private http: HttpClient) 
  {
  }

  getUsers() : Observable<User[]> {
    return this.http.get<User[]>(USER_API_BASE_URL);
  }

  login(user: User){
    this.user = user;
    this.broadcastLoginChange();
    this._isLoggedIn = true;
  }

  logout(){
    this.user = {
      emailId: "",
      firstName: "",
      lastName: ""
    };

    this.broadcastLoginChange();
    this._isLoggedIn = false;
  }

  getLoggedUserSubject(): Subject<User> {
    return this._userData;
  }

  broadcastLoginChange(){
    this._userData.next(this.user);
  }

  isLoggedIn() : boolean { 
    return this._isLoggedIn;
  }

  getLoggedUser() : User {
    return this.user;
  }

}
