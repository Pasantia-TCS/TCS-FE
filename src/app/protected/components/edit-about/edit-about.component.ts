import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styles: [
  ]
})
export class EditAboutComponent implements OnInit {

  profile!: Profile;
  ultimatix!: string;
  count!: number;
  aboutMeForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditAboutComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Profile,
    private profileService: ProfileService,
    private userServie: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profile = this.data;
    this.ultimatix = this.userServie.getUltimatix()!;

    this.aboutMeForm = this.fb.group({
      aboutMe: [this.profile.sobreMi, Validators.required]
    });

    this.count = this.aboutMeForm.get('aboutMe')?.value.length;
  }

  updateAboutMe() {
    if (this.aboutMeForm.invalid) {
      this.aboutMeForm.markAllAsTouched();
    } else {
      this.profile.sobreMi = this.aboutMeForm.value.aboutMe;
      this.profileService.updateAboutMe(this.ultimatix, this.profile.sobreMi!)
        .subscribe(
          {
            next: resp => {
              this.profile.sobreMi = resp.sobreMi;
              this.dialogRef.close();
              Swal.fire('¡Éxito!', 'La información se ha actualizado con éxito.', 'success');
            }
          }
        );
    }
  }

  onKey(event: any) {
    this.count = event.target.value.length;
  }

  exit() {
    this.dialogRef.close();
  }

}
