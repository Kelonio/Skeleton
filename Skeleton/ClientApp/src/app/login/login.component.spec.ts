import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
//import { routes } from './../app-routing.module';

import { AuthenticationService } from '.././services/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
                FormsModule,
                HttpClientModule,
                RouterTestingModule.withRoutes([{ path: 'login', component: LoginComponent }])
                //RouterTestingModule.withRoutes(routes)
      ],
      providers: [AuthenticationService],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
