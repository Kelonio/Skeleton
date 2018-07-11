import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY, of } from 'rxjs';
import { map, tap, catchError } from "rxjs/operators";

import { AlertService } from './../services/alert.service';
import { ErrorService } from './../services/error.service';
import { Router } from '@angular/router';





@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService, private router: Router, private errorService: ErrorService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }


    
   /* interceptor para la respuesta , los 500 ,401 los mandamos al componente error, utilizamos un
    * servicio errorService para pasarle el objeto entero
    * */
    
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }
      ,(err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.errorService.error = err;
          this.router.navigateByUrl('app-error');
          //this.router.navigate(['error', { error: err }]); err es un objeto no lo puedo pasar bien por la url          
        }
      })
      
        
    );


    /* esto es para interceptar la respuesta y si es un 401 ir a login,
     * pero no hace falta puesto que ya lo hace el guard
     *
     * 
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }),
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            //this.authService.loginRedirect();
            console.log('redirect angular to login');

          }
          return throwError(error);
          //return kk;//observableThrowError(this.handleError(error));
        }
      })
    );

    */
  }
    
}
