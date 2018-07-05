import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { UsersRouting } from './users.routing';

@NgModule({
  providers: [
    UserService
  ],

  imports: [
    CommonModule,
    //Material
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,    
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    //Flex
    FlexLayoutModule,
    //Form
    FormsModule,
    ReactiveFormsModule,
    //Router
    RouterModule,
    //Rutas
    UsersRouting
  ],
  declarations: [RegisterComponent, ListComponent]
})
export class UsersModule { }
