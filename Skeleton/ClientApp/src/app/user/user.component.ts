import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication';
import { UserService } from './../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {

  public role = '';

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  descriptionError = "";

  constructor(
    public auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    //private alertService: AlertService
  ) {

  }

  ngOnInit() {
    this.role = this.auth.getRole();

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    }
    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls;}

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
      }

      this.loading = true;
      this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            //this.alertService.success('Registration successful', true);
            //.router.navigate(['/login']);
            console.log('El usuario se ha registrado correctamente');
            console.log(data);
          },
          error => {
            //this.alertService.error(error);
            this.loading = false;
            console.log(error);
            this.descriptionError = error.error;
          });
    } 

}