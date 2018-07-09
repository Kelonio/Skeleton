import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';

/* deberiamos meter los guards en el modulo ???*/
import { AuthGuard } from './../guards/auth.guard';
import { RoleGuard } from './../guards/role.guard';

/*
import { UserCanDeactivate } from './user.canDeactivate';
import { AuthCanActivate } from './auth.canActivate';
*/

const usersRoutes: Routes = [
  {
    path: 'users',
    children: [
      { path: 'list', component: ListComponent, canActivate: [RoleGuard], data: { expectedRole: 'Admin' } },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

export const UsersRouting = RouterModule.forChild(usersRoutes);
