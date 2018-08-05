"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var register_component_1 = require("./register/register.component");
var list_component_1 = require("./list/list.component");
var user_service_1 = require("./services/user.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var flex_layout_1 = require("@angular/flex-layout");
var users_routing_1 = require("./users.routing");
var profile_component_1 = require("./profile/profile.component");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            providers: [
                user_service_1.UserService
            ],
            imports: [
                common_1.CommonModule,
                //Material
                material_1.MatGridListModule,
                material_1.MatCardModule,
                material_1.MatMenuModule,
                material_1.MatIconModule,
                material_1.MatButtonModule,
                material_1.MatToolbarModule,
                material_1.MatSidenavModule,
                material_1.MatListModule,
                material_1.MatTableModule,
                material_1.MatPaginatorModule,
                material_1.MatSortModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                //Flex
                flex_layout_1.FlexLayoutModule,
                //Form
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                //Router
                router_1.RouterModule,
                //Rutas
                users_routing_1.UsersRouting
            ],
            declarations: [register_component_1.RegisterComponent, list_component_1.ListComponent, profile_component_1.ProfileComponent]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map