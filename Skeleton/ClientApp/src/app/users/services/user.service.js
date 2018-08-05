"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var users_module_1 = require("./../users.module");
/*
It's also possible to specify that a service should be provided in a particular @NgModule.
For example, if you don't want UserService to be available to applications
unless they import a UserModule you've created, you can specify
that the service should be provided in the module: providedIn: UserModule
*/
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.register = function (user) {
        return this.http.post("/api/users/create", user);
    };
    UserService.prototype.getAll = function () {
        return this.http.get("api/users");
    };
    UserService.prototype.getByEmail = function (email) {
        return this.http.get("api/users/profile/" + email);
    };
    // no se utiliza
    UserService.prototype.getById = function (id) {
        return this.http.get("/api/users/user/" + id);
    };
    //no se utiliza
    UserService.prototype.update = function (user) {
        return this.http.put("/users/" + user.id, user);
    };
    //no se utiliza por ahora
    UserService.prototype.delete = function (id) {
        return this.http.delete("/users/" + id);
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: users_module_1.UsersModule,
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map