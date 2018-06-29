"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var fetch_data_component_1 = require("./fetch-data/fetch-data.component");
var login_component_1 = require("./login/login.component");
var user_component_1 = require("./user/user.component");
var user_table_component_1 = require("./user-table/user-table.component");
var auth_guard_1 = require("./guards/auth.guard");
var role_guard_1 = require("./guards/role.guard");
exports.routes = [
    { path: '', component: dashboard_component_1.DashboardComponent, pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'fetch-data', component: fetch_data_component_1.FetchDataComponent, canActivate: [role_guard_1.RoleGuard], data: { expectedRole: 'Admin' } },
    { path: 'users', component: user_component_1.UserComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'tabla', component: user_table_component_1.UserTableComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map