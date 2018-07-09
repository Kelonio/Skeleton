"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var angular_jwt_1 = require("@auth0/angular-jwt");
/*
If you are only interested in the JWT Decoder, and are not interested in extended injectable features,
you can simply create an instance of the utility and use it directly:
*/
var jwtHelper = new angular_jwt_1.JwtHelperService();
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http
    //public jwtHelper: JwtHelperService
    ) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (email, password) {
        return this.http.post('/api/users/token', { email: email, password: password })
            .pipe(operators_1.map(function (res) {
            // login successful if there's a jwt token in the response
            if (res && res.token) {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ email: email, token: res.token }));
            }
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        var token = this.getToken();
        // Check whether the token is expired and return
        // true or false
        if (token != null) {
            if (jwtHelper.isTokenExpired(token)) {
                //si esta caducada la borramos
                localStorage.removeItem('currentUser');
                return false;
            }
            ;
            return true;
        }
        else
            false;
    };
    AuthenticationService.prototype.getToken = function () {
        // comprobamos que no es null
        var currentU = localStorage.getItem('currentUser');
        if (currentU != null) {
            var currentUser = JSON.parse(currentU);
            return currentUser.token;
        }
        return null;
    };
    AuthenticationService.prototype.getRole = function () {
        var token = this.getToken();
        if (token != null) {
            var tokenPayload = jwtHelper.decodeToken(token); // decode the token to get its payload
            var role = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; //la key la mete el identity
            return role;
        }
        return ''; //devolvemos un role vacio ??
    };
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map