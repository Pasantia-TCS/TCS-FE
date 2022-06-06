import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styles: []
})
export class RecoverComponent {

  showPwd: boolean = false;

  recoverForm: FormGroup = this.fb.group({
    ultimatix: ['', Validators.required],
    password: ['', Validators.required],
    securityCode: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  get ultimatix() {
    return this.recoverForm.get('ultimatix');
  }

  get password() {
    return this.recoverForm.get('password');
  }

  get securityCode() {
    return this.recoverForm.get('securityCode');
  }

  recoverPassword() {
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
    }
  }

  toLogin() {
    this.router.navigateByUrl('/');
  }

}
