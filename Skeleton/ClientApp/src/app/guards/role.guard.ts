// src/app/auth/role-guard.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './../services/authentication';
//import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    /*
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']); 
      return false;
    }*/

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;

    const role = this.auth.getRole(); 


    if (role && role !== expectedRole) {
      this.router.navigate(['login']); // mandarle a una pagina que diga que no tiene permisos o sea el role
      return false;
    }
    return true;
  }

}
