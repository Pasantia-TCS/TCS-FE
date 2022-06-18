import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { ultimatixPattern } from '../../validators/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  currentUser!: User;
  showPwd: boolean = false;

  loginForm: FormGroup = this.fb.group({
    ultimatix: ['', [Validators.required, Validators.minLength(7), Validators.pattern(ultimatixPattern)]],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  validField(field: string) {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  get ultimatix() {
    return this.loginForm.get('ultimatix');
  }

  login() {
    const { ultimatix, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(ultimatix, password)
        .subscribe({
          next: resp => {
            sessionStorage.setItem('token', resp.id_numero_Ultimatix!);
            this.userService.updateUser(resp);
            this.router.navigateByUrl('/pages');
          },
          error: err => Swal.fire('Error', err.error.mensaje, 'error')
        });
    }
  }

  toRecover() {
    this.router.navigateByUrl('/auth/recover');
  }

  toRegister() {
    this.router.navigateByUrl('/auth/register');
  }

  keyPressNumbers(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}
