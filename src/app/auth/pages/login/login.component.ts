import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  currentUser: user = {};
  showPwd: boolean = false;

  loginForm: FormGroup = this.fb.group({
    ultimatix: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  valid_field(field_name: string) {
    return this.loginForm.controls[field_name].errors && this.loginForm.controls[field_name].touched;
  }

  login() {
    const { ultimatix, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
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

}