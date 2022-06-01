import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styles: []
})
export class SelectionComponent implements OnInit {

  currentUser!: User;
  profile!: Profile;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    const ultimatix = this.userService.getUltimatix();

    this.profileService.getProfile(ultimatix!).subscribe({
      next: resp => this.profile = resp
    });
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

  toForms() {
    this.router.navigateByUrl('/pages/dashboard/forms');
  }

  toLogin() {
    this.router.navigateByUrl('/');
    this.authService.logout();
  }

}
