"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var list_datasource_1 = require("./list-datasource");
var ListComponent = /** @class */ (function () {
    function ListComponent(userService) {
        var _this = this;
        this.userService = userService;
        /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
        this.displayedColumns = ['email', 'username', 'firstname', 'lastname'];
        this.userService.getAll().subscribe(function (users) {
            _this.dataSource = new list_datasource_1.UserTableDataSource(_this.paginator, _this.sort, users);
        });
    }
    ListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator)
    ], ListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort)
    ], ListComponent.prototype, "sort", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        })
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map