import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  myForm: FormGroup = this.fb.group({
    ultimatix: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private service: LoginService, private fb: FormBuilder, private router: Router) { }

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
          next: () => this.router.navigateByUrl('/pages'),
          error: err => Swal.fire('Error', err.error.mensaje, 'error')
        });
    }

  }

}