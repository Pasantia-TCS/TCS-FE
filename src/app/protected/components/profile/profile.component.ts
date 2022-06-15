import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Profile } from '../../interfaces/profile';
import { EditAboutComponent } from '../edit-about/edit-about.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditSkillsComponent } from '../edit-skills/edit-skills.component';
import { EditFuncSkillsComponent } from "../edit-func-skills/edit-func-skills.component";
import { EditAppsComponent } from '../edit-apps/edit-apps.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ultimatix!: string;
  currentUser!: User;
  profile!: Profile;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    setTimeout(() => {
      this.profile = this.userService.getProfile();
    }, 150);
  }

  openUserInfo() {
    this.dialog.open(EditProfileComponent, { data: this.profile, minWidth: '400px' });
  }

  openAboutMe() {
    this.dialog.open(EditAboutComponent, { data: this.profile, minWidth: '400px' });
  }

  openTechSkills() {
    this.dialog.open(EditSkillsComponent, { data: this.profile, minWidth: '500px' });
  }

  openFuncSkills() {
    this.dialog.open(EditFuncSkillsComponent, { data: this.profile, minWidth: '500px' });
  }

  openApps() {
    this.dialog.open(EditAppsComponent, { data: this.profile, minWidth: '500px' });
  }

}
