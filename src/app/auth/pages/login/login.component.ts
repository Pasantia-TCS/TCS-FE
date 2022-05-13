import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/shared/services/user.service';

import { user } from 'src/app/interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  currentUser: user = {};

  myForm: FormGroup = this.fb.group({
    ultimatix: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private service: LoginService, private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  valid_field(field_name: string) {
    return this.myForm.controls[field_name].errors && this.myForm.controls[field_name].touched;
  }

  login() {

    const { ultimatix, password } = this.myForm.value;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else {
      this.service.login(ultimatix, password)
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