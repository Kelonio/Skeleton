import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserTableDataSource } from './list-datasource';
import { UserService } from './../services/user.service';
import { User } from './../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserTableDataSource;


  constructor(private userService: UserService) {
    this.userService.getAll().subscribe(users => {
      this.dataSource = new UserTableDataSource(this.paginator, this.sort, users);
    });

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['email', 'username', 'firstname', 'lastname'];

  ngOnInit() {
  }

}
