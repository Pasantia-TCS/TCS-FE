import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Profile } from '../../interfaces/profile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styles: [
  ]
})
export class EditProfileComponent implements OnInit {

  userInfoForm!: FormGroup;

  profile!: Profile;
  currentUser!: User;
  ultimatix!: string;

  constructor(
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Profile,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Load ultimatix
    this.ultimatix = this.userService.getUltimatix()!;
    this.currentUser = this.userService.getUserData();

    // Load profile data
    this.profile = this.data;

    this.userInfoForm = this.fb.group(
      {
        email: [this.currentUser.correo, [Validators.required, Validators.pattern(''), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        phone: [this.currentUser.telefono, Validators.required],
        netuser: [this.profile.usuario_red, [Validators.required, Validators.minLength(9), Validators.pattern('^@.*')]]
      }
    );
  }

  get phone() {
    return this.userInfoForm.get('phone');
  }

  get email() {
    return this.userInfoForm.get('email');
  }

  get netuser() {
    return this.userInfoForm.get('netuser');
  }

  updateUserInfo() {
    if (this.userInfoForm.invalid) {
      this.userInfoForm.markAllAsTouched();
    } else {
      const { email, phone, netuser } = this.userInfoForm.value;

      this.userService.updateUserProfile(this.ultimatix, phone, email)
        .subscribe(
          {
            next: resp => {
              this.currentUser = resp;
              this.dialogRef.close();
              Swal.fire('¡Éxito!', 'La información de usuario se ha actualizado con éxito.', 'success');
            }, 
            error: err => Swal.fire('Error', err.error.mensaje, 'error')

          }
        );

      this.userService.updateNetuser(this.ultimatix, netuser)
        .subscribe({
          next: resp => this.profile.usuario_red = resp.usuario_red
        });
    }
  }

  exit() {
    this.dialogRef.close();
  }

}
