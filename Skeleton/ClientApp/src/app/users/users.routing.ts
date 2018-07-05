import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';

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
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] }
    ]
  }
];

export const UsersRouting = RouterModule.forChild(usersRoutes);
