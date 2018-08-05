"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(alertService, router, errorService) {
        this.alertService = alertService;
        this.router = router;
        this.errorService = errorService;
    }
    JwtInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        // add authorization header with jwt token if available
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + currentUser.token
                }
            });
        }
        /* interceptor para la respuesta , los 500 ,401 los mandamos al componente error, utilizamos un
         * servicio errorService para pasarle el objeto entero
         * */
        return next.handle(request).pipe(operators_1.tap(function (event) {
            if (event instanceof http_1.HttpResponse) {
                // do stuff with response if you want
            }
        }, function (err) {
            if (err instanceof http_1.HttpErrorResponse) {
                _this.errorService.error = err;
                _this.router.navigateByUrl('app-error');
                //this.router.navigate(['error', { error: err }]); err es un objeto no lo puedo pasar bien por la url          
            }
        }));
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
    };
    JwtInterceptor = __decorate([
        core_1.Injectable()
    ], JwtInterceptor);
    return JwtInterceptor;
}());
exports.JwtInterceptor = JwtInterceptor;
//# sourceMappingURL=jwt.interceptor.js.map