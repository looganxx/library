import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  users: User[];
  selectedUser: String;

  constructor(private loginService: LoginService,
              private router: Router) {
    this.users = [];
    this.selectedUser = '-1';
  }

  ngOnInit(): void {
      this.loginService.getUsers().subscribe(
        users => {
          this.users = users;
        });
  }

  onLogin(){
    if(this.selectedUser === '-1'){
      alert("You must choose a user");
      return;
    }
    this.router.navigate(['/userLibrary/'+ this.selectedUser]);
  }
}
