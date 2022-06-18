import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { emailPattern, passwordPattern, ultimatixPattern } from '../../validators/validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent {

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;

  showPwd: boolean = false;

  registerForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    ultimatix: ['', [Validators.required, Validators.minLength(7), Validators.pattern(ultimatixPattern)]],
    password: ['', [Validators.required, Validators.pattern(passwordPattern)]]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  get email() { return this.registerForm.get('email'); }

  get phone() { return this.registerForm.get('phone'); }

  get password() { return this.registerForm.get('password'); }

  get ultimatix() { return this.registerForm.get('ultimatix'); }

  validField(field: string) {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  register() {
    const { name, lastname, phone, email, ultimatix, password } = this.registerForm.value;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.authService
        .register(ultimatix, password, name, lastname, phone.internationalNumber, email)
        .subscribe({
          next: resp => {
            Swal.fire({
              title: '¡Éxito!',
              icon: 'success',
              html:
                'Usuario registrado con éxito.' +
                '<br>' +
                '<br>' +
                'Puedes utilizar este código de respaldo para restablecer tu cuenta. Manténlo seguro.' +
                '<br>' +
                '<br>' +
                '<strong>Código de respaldo: </strong>' +
                resp.token
            });
            this.router.navigateByUrl('/');
          },
          error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
        });
    }
  }

  toLogin() {
    this.router.navigateByUrl('/auth/login');
  }

}
