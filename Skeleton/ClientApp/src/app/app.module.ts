
/* Modulos*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';


/* Custom Modules */
import { environment } from '../environments/environment';

/*enviroment*/
import { UsersModule } from './users/users.module';


/* components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';


/* componentes navegacion */
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';

/*helpers*/
import { JwtInterceptor } from './helpers/jwt.interceptor';


/* Services*/
import { AuthenticationService } from './services/auth.service';
import { AlertService } from './services/alert.service';

/* Guards*/
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

/* Material */
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';


/*i18n */

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';


registerLocaleData(localeES, 'es-ES', localeEsExtra);



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    NavToolbarComponent,
    HomeComponent,
    LoginComponent,   
    AlertComponent,
    DashboardComponent
    
        
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, // el modulo de rutas
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    //custom modules
    UsersModule
  ],
  providers: [ //teoricamente en Angular6 no hace falta meter los providers, pero no va   
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
