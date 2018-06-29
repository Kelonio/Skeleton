import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { UserTableDataSource } from './user-table-datasource';
import { UserService } from './../services/user.service';
import { User } from './../models/user';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserTableDataSource;
  

  constructor(private userService: UserService) {
    
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username'];

  
  ngOnInit() {

    this.userService.getAll().subscribe(users => {     
      this.dataSource = new UserTableDataSource(this.paginator, this.sort, users);
    });

    
  }
}
