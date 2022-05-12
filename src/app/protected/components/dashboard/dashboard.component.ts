import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: user = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
  }

  collapse = true;
  
  toggleSidebar() {
    this.collapse = !this.collapse;
  }

}
