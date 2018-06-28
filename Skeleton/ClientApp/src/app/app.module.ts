import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AlertComponent } from './alert/alert.component';


import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AuthenticationService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';


import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';



import { AppRoutingModule } from './app-routing.module';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,    
    FetchDataComponent,
    LoginComponent,
    UserComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, // el modulo de rutas
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ //teoricamente en Angular6 no hace falta meter los providers, pero no va 
    UserService, 
    AlertService,
    AuthGuard,
    RoleGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
