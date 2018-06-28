"use strict";
// src/app/auth/role-guard.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import decode from 'jwt-decode';
var RoleGuard = /** @class */ (function () {
    function RoleGuard(auth, router, alertService, _authGuard) {
        this.auth = auth;
        this.router = router;
        this.alertService = alertService;
        this._authGuard = _authGuard;
    }
    RoleGuard.prototype.canActivate = function (route, state) {
        /*
         * https://stackoverflow.com/questions/40589878/multiple-canactivate-guards-all-run-when-first-fails?noredirect=1&lq=1
        return this._authGuard.canActivate(route, state).then((auth: boolean) => {
          if (!auth) {
            return Promise.resolve(false);
          }
          //... your role guard check code goes here
        });
        */
        // esto se utiliza en otro guard , pero deberia poder hacerse de otra forma, commo intente arriba
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        // this will be passed from the route config
        // on the data property
        var expectedRole = route.data.expectedRole;
        var role = this.auth.getRole();
        if (role && role !== expectedRole) {
            this.alertService.error('You dont have permissions');
            //this.router.navigate(['home']); 
            return false;
        }
        return true;
    };
    RoleGuard = __decorate([
        core_1.Injectable()
    ], RoleGuard);
    return RoleGuard;
}());
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=role.guard.js.map