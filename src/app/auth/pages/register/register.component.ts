import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from 'src/app/services/register.service';
import { user } from 'src/app/interfaces/user';
import Swal from 'sweetalert2';

import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Phone
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    lastname: ['', [Validators.required, Validators.maxLength(30)]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    ultimatix: ['', [Validators.required, Validators.minLength(7)]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')]]
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

  get ultimatix() {
    return this.myForm.get('ultimatix');
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
      this.service.register(ultimatix, password, name, lastname, phone.internationalNumber, email)
        .subscribe({
          next: () => {
            Swal.fire('Éxito', 'Usuario registrado con éxito', 'success');
            this.router.navigateByUrl('/');
          },
          error: err => Swal.fire('Error', err.error.mensaje, 'error')
        })
    }
  }
}