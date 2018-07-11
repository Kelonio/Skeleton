import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '.././services/auth.service';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.css']
})
export class NavToolbarComponent implements OnInit {

  @Input() title: string;

  isAuthentificated: boolean;
  isLoggedIn: Observable<boolean>;

  constructor(public authenticationService: AuthenticationService) {
    this.isLoggedIn = authenticationService.isLoggedIn();
  }

  ngOnInit() {
     //this.authenticationService.isAuthenticated().subscribe(res => this.isAuthentificated = res);
    
  }
  
}

