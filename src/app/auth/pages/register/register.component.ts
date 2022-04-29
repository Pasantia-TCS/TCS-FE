import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from 'src/app/services/register.service';
import { user } from 'src/app/interfaces/user';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.maxLength(30)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("(09)[8-9]{1}[0-9]{7}")]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    ultimatix: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private service: RegisterService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  get email() {
    return this.myForm.get('email');
  }

  get phone() {
    return this.myForm.get('phone');
  }

  get password() {
    return this.myForm.get('password');
  }

  valid_field(field_name: string) {
    return this.myForm.controls[field_name].errors && this.myForm.controls[field_name].touched;
  }

  register() {
    const { name, lastname, phone, email, ultimatix, password } = this.myForm.value;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else {
      this.service.register(ultimatix, password, name, lastname, phone, email)
        .subscribe(obj => {
          if (obj.status === 409) {
            Swal.fire('Error', obj.mensaje, 'error')
          } else {
            this.router.navigateByUrl('/');
          }
        })
    }
  }
}
