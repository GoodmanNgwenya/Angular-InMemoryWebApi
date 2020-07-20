import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  private usersUrl = 'api/users';
  public token: string;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      // set token if saved in local storage
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  
  // working post method
    // registerUser(email, password) {
    //   let data = JSON.stringify({email: email, password: password});
    //   return this.http.post<any>(`${this.usersUrl}/`, { data })
    //       .pipe(map(user => {
    //           // store user details and jwt token in local storage to keep user logged in between page refreshes
    //           localStorage.setItem('login', JSON.stringify(user));
    //           this.currentUserSubject.next(user);
    //           return user;
    //       }));
    // }
  
  //login method using api
    login(email, password) {
      let data = JSON.stringify({email: email, password: password});
      return this.http.post<any>(`${this.usersUrl}/`,{data})
          .pipe(map(user => {
             localStorage.setItem('login', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
    }
  
    // Signin(email: string, password:string ): Observable<boolean> {
    //   return this.http.post(`${this.usersUrl}/`, { email, password }, {
    //     headers:new HttpHeaders().set('Content-Type','application/json'),
    //   }).map((response: any) => {
    //     const token = response.token;
    //     if (token) {
    //       // set token property
    //       this.token = token;
    //       // store username and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify({ email, token }));
    //       // return true to indicate successful login
    //       return true;
    //   } else {
    //       // return false to indicate failed login
    //       return false;
    //   }
    //  });
    // }


    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}