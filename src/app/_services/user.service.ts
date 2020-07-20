import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { User } from '../_models/user';


 @Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';
  constructor(private http: HttpClient) { }

  

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<User> {
    if (id === 0) {
      return of(this.initializeUser());
    }
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
   
  getUserEmail(email: string): Observable<User> {
    if (email === '') {
      return of(this.initializeUser());
    }
    //const url = `${this.usersUrl}/${email}&${password}`;
    const url = `${this.usersUrl}/${email}`;
    return this.http.get<User>(url)
      .pipe(
        tap(data => console.log('getUser: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
   
  
   registerUser(user: User) {
    if (user.email === '') {
      return of(this.initializeUser());
    }
    return this.http.post(`${this.usersUrl}/`, { user })
    .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('registerUser', JSON.stringify(user));
                //this.currentUserSubject.next(user);
                return user;
            }));
      }
   
  // register(email, password) {
  //   let data = JSON.stringify({email: email, password: password});
  //   return this.http.post<any>(`${this.usersUrl}/`, { data })
  //       .pipe(map(user => {
  //           // store user details and jwt token in local storage to keep user logged in between page refreshes
  //           localStorage.setItem('login', JSON.stringify(user));
  //           this.currentUserSubject.next(user);
  //           return user;
  //       }));
  // }

  private handleError(err): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeUser(): User {
    // Return an initialized object
    return {
      id: 0,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };
  }
  
}
