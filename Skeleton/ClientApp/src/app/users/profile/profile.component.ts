import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: any;

  constructor(private userService: UserService
  ) { }

  ngOnInit() {
    //deberia sacar esto de un servicio
    let email = JSON.parse(localStorage.getItem('currentUser')).email; 

    this.userService.getByEmail(email).subscribe(res => {
      this.profile = res;
      console.log(this.profile);
    });
  }

}
