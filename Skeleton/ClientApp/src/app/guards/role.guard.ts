// src/app/auth/role-guard.service.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './../services/authentication';
import { AlertService } from './../services/alert.service';
import { AuthGuard } from './auth.guard';

//import decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    public alertService: AlertService,
    private _authGuard: AuthGuard
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    /*
     * https://stackoverflow.com/questions/40589878/multiple-canactivate-guards-all-run-when-first-fails?noredirect=1&lq=1
    return this._authGuard.canActivate(route, state).then((auth: boolean) => {
      if (!auth) {
        return Promise.resolve(false);
      }
      //... your role guard check code goes here
    });
    */


    console.log('this.auth.isAuthenticated()');
    console.log(this.auth.isAuthenticated());

    // esto se utiliza en otro guard , pero deberia poder hacerse de otra forma, commo intente arriba
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const role = this.auth.getRole(); 


    if (role && role !== expectedRole) {     
      this.alertService.error('You dont have permissions');
      //this.router.navigate(['home']); 
      return false;
    }
    return true;
  }

}
