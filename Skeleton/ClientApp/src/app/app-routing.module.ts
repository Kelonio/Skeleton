import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';

import { DashboardComponent } from './dashboard/dashboard.component'
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserTableComponent } from './user-table/user-table.component';


import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'fetch-data', component: FetchDataComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'tabla', component: UserTableComponent },
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
