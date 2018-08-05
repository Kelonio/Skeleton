import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { UsersModule } from './../users.module';

import { User } from '../models/user';

/*
It's also possible to specify that a service should be provided in a particular @NgModule.
For example, if you don't want UserService to be available to applications
unless they import a UserModule you've created, you can specify
that the service should be provided in the module: providedIn: UserModule
*/

@Injectable({
  providedIn: UsersModule,
})
export class UserService {
  constructor(private http: HttpClient) { }


  register(user: User) {
    return this.http.post(`/api/users/create`, user);
  }

  getAll() {
    return this.http.get<User[]>(`api/users`);
  }

  getByEmail(email: string) {
    return this.http.get(`api/users/profile/` + email);
  }

  // no se utiliza
  getById(id: string) {
    return this.http.get(`/api/users/user/` + id);
  }
     
  //no se utiliza
  update(user: User) {
    return this.http.put(`/users/` + user.id, user);
  }

  //no se utiliza por ahora
  delete(id: number) {
    return this.http.delete(`/users/` + id);
  }
}
