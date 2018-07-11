import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { map,share } from 'rxjs/operators';


import { JwtHelperService } from '@auth0/angular-jwt';

/*
If you are only interested in the JWT Decoder, and are not interested in extended injectable features,
you can simply create an instance of the utility and use it directly:
*/

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthenticationService {

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient
    //public jwtHelper: JwtHelperService
  ) { }
 

  login(email: string, password: string) {
    return this.http.post<any>('/api/users/token', { email: email, password: password })
      .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email, token: res.token }));
          this.isLoginSubject.next(true);
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.isLoginSubject.next(false);
  }

  public isLoggedIn(): Observable<boolean> {
    //return this.isLoginSubject.asObservable().pipe(share()); //supuestamente es mejor esto
    return this.isLoginSubject.asObservable();
  }

  private hasToken(): boolean {
    const token = this.getToken();

    // Check whether the token is expired and return
    // true or false
    if (token != null) {
      if (jwtHelper.isTokenExpired(token)) {
        //si esta caducada la borramos
        localStorage.removeItem('currentUser');
        this.isLoginSubject.next(false);
        return false;
      };
      return true;
    }
    else
      return false;
  }

  public isAuthenticated(): boolean {

    const token = this.getToken();

    // Check whether the token is expired and return
    // true or false
    if (token != null) {
      if (jwtHelper.isTokenExpired(token)) {
        //si esta caducada la borramos
        localStorage.removeItem('currentUser');
        return false;
      };
      return true;
    }
    else
      return false;
  }


  private  isAuthenticated2(): Observable<boolean> {

    const token = this.getToken();      

    // Check whether the token is expired and return
    // true or false
    if (token != null) {
      if (jwtHelper.isTokenExpired(token)) {
        //si esta caducada la borramos
        localStorage.removeItem('currentUser');
        return of(false);
      };
      return of(true);
    }      
    else
      return of(false);
  }

  public getToken() {

    // comprobamos que no es null
    let currentU = localStorage.getItem('currentUser');

    if (currentU != null) {
      const currentUser = JSON.parse(currentU);
      return currentUser.token;
    }
    return null;   
  }


  public getRole() {    
    let token = this.getToken();

    if (token != null) {
      const tokenPayload = jwtHelper.decodeToken(token); // decode the token to get its payload
      const role = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; //la key la mete el identity
      return role;
    }

    return ''; //devolvemos un role vacio ??
    
  }

}
