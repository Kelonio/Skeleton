import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService } from '.././services/auth.service';

@Component({
  selector: 'nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrls: ['./nav-toolbar.component.css']
})
export class NavToolbarComponent {

  @Input() title: string;    
  constructor(public authenticationService: AuthenticationService) {}
  
  }
