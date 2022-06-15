import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Profile } from '../../interfaces/profile';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styles: []
})
export class SelectionComponent implements OnInit, OnChanges {

  currentUser!: User;
  profile!: Profile;
  rol!: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnChanges(): void {
    this.rol = this.profile.rol!;
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    setTimeout(() => {
      this.profile = this.userService.getProfile();
    }, 100);
  }

  toAssets() {
    this.router.navigateByUrl('/pages/dashboard/assets');
  }

  toTasks() {
    this.router.navigateByUrl('/pages/dashboard/tasks');
  }

  toTeams() {
    this.router.navigateByUrl('/pages/dashboard/teams');
  }

  toReports() {
    this.router.navigateByUrl('/pages/dashboard/reports');
  }

  toLogin() {
    this.router.navigateByUrl('/');
    this.authService.logout();
  }

}
