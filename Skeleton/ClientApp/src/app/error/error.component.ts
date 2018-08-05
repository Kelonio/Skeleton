import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { ErrorService } from '../services/error.service'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public error: HttpErrorResponse;
  //private sub: Subscription; // para subscribirse


  constructor(private route: ActivatedRoute, private errorService: ErrorService) { }

  ngOnInit() {
    /* // este codigo es para pillar parametros 
    this.sub = this.route.params.subscribe(params => {
      this.error = params['error'];      
    });
    */
    this.error = this.errorService.error;
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

}
