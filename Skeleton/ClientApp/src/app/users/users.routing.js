"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var register_component_1 = require("./register/register.component");
var list_component_1 = require("./list/list.component");
var profile_component_1 = require("./profile/profile.component");
/* deberiamos meter los guards en el modulo ???*/
var auth_guard_1 = require("./../guards/auth.guard");
var role_guard_1 = require("./../guards/role.guard");
/*
import { UserCanDeactivate } from './user.canDeactivate';
import { AuthCanActivate } from './auth.canActivate';
*/
var usersRoutes = [
    {
        path: 'users',
        children: [
            { path: 'list', component: list_component_1.ListComponent, canActivate: [role_guard_1.RoleGuard], data: { expectedRole: 'Admin' } },
            { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
            { path: 'register', component: register_component_1.RegisterComponent }
        ]
    }
];
exports.UsersRouting = router_1.RouterModule.forChild(usersRoutes);
//# sourceMappingURL=users.routing.js.map