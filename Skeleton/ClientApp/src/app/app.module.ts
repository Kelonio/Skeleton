
/* Modulos*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

/*enviroment*/
import { environment } from '../environments/environment';


/* components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';

/*helpers*/
import { JwtInterceptor } from './helpers/jwt.interceptor';


/* Services*/
import { AuthenticationService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';

/* Guards*/
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

/* Material */
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { UserTableComponent } from './user-table/user-table.component';




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    AlertComponent,
    DashboardComponent,
    UserTableComponent    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, // el modulo de rutas
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }), BrowserAnimationsModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, LayoutModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule
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
