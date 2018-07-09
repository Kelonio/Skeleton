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
    this.userService.getByEmail('admin@inercya.com').subscribe(res => {
      this.profile = res;
      console.log(this.profile);
    });
  }

}
