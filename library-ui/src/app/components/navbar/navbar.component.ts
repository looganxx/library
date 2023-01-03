import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: User = {
    emailId: "",
    firstName: "",
    lastName: "",
  };

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginService.getLoggedUserSubject().subscribe({
      next: (user: User) => {
        this.loggedInUser = user;
        this.isLoggedIn = true;
      },
      error: (error: any) => {
        this.isLoggedIn = false;
      }
    })
  }

  onLogoutClick(){
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}