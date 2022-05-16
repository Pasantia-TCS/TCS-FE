import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  currentUser: user = {};

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
  }

  toAssets() {
    // TODO: validate user type
    this.router.navigateByUrl('/pages/dashboard/assets');
  }

  toTasks() {
    // TODO: validate user type
    this.router.navigateByUrl('/pages/dashboard/tasks');
  }

  toForms() {
    // TODO: validate user type
    this.router.navigateByUrl('/pages/dashboard/forms');
  }

  toLogin() {
    this.router.navigateByUrl('/');
    this.authService.logout();
  }

}
