import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

/*
If you are only interested in the JWT Decoder, and are not interested in extended injectable features,
you can simply create an instance of the utility and use it directly:
*/

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient
    //public jwtHelper: JwtHelperService
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>('/api/token', { email: email, password: password })
      .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ email, token: res.token }));
        }
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  public isAuthenticated(): boolean {

    const token = this.getToken();

    // Check whether the token is expired and return
    // true or false
    if (!token)
      return jwtHelper.isTokenExpired(token);
    else
      false;
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
