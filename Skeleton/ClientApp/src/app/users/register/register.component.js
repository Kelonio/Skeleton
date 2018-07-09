"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(auth, formBuilder, router, userService) {
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.router = router;
        this.userService = userService;
        this.role = '';
        this.loading = false;
        this.submitted = false;
        this.descriptionError = "";
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.role = this.auth.getRole();
        this.registerForm = this.formBuilder.group({
            FirstName: ['', forms_1.Validators.required],
            LastName: ['', forms_1.Validators.required],
            username: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
        });
    };
    Object.defineProperty(RegisterComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.registerForm.controls; },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.getErrorMessage = function () {
        return this.f.email.hasError('required') ? 'You must enter a value' :
            this.f.email.hasError('email') ? 'Not a valid email' :
                '';
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(operators_1.first())
            .subscribe(function (data) {
            //this.alertService.success('Registration successful', true);
            _this.router.navigate(['/users/list']);
            console.log('El usuario se ha registrado correctamente');
            console.log(data);
        }, function (error) {
            //this.alertService.error(error);
            _this.loading = false;
            console.log(error);
            _this.descriptionError = error.error;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map