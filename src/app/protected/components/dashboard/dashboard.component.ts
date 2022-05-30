import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser!: User;
  collapse = true;
  profile!: Profile;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();

    // Load profile info
    this.profileService.getProfile(this.currentUser.id_numero_Ultimatix!)
      .subscribe({
        next: resp => this.profile = resp
      });
  }

  toggleSidebar() {
    this.collapse = !this.collapse;
  }

  toLogin() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
