import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: NgForm;
  errorMessage: string;
  user: User;
  users: User[] = [];

  constructor(private router: Router,
    private userService: UserService,private authenticationService:AuthenticationService) { }
    isSubmitted  =  false;
  
  ngOnInit(): void {   
    
  }

  
  login(form:NgForm): void {
    console.log(form.value)
    if ( form.value.email === null) {
          return;
         }else{
          this.authenticationService.login(form.value.email,form.value.password)
            .subscribe({
              next: (user: User) => this.emailLogin(user),
              error: err => this.errorMessage = err
            });
      }
  }

  emailLogin(user: User): void {
    if (this.loginForm) {
      this.loginForm.reset();
    }
    this.user = user;
    if (this.user.email === '') {
      return;
    } else {
      this.isSubmitted = true;
      this.router.navigate(['/register']);
    }
  }

}
