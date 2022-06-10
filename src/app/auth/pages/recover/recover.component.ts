import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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
    private router: Router,
    private authService: AuthService
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
    } else {
      const { ultimatix, password, securityCode } = this.recoverForm.value;
      this.authService.recover(ultimatix, securityCode, password).subscribe({
        next: () => {
          Swal.fire('¡Éxito!', ' Su contraseña ha sido cambiada con éxito.', 'success');
          this.router.navigateByUrl('/');
        },
        error: () => Swal.fire('¡Error!', 'Ha ocurrido un error. Por favor verifica que tu código de respaldo sea correcto y vuelve a intentar.', 'error')
      });
    }
  }

  message() {
    Swal.fire('¡Aviso!', 'Para restablecer tu cuenta, ponte en contacto con un administrador.', 'info');
  }

  toLogin() {
    this.router.navigateByUrl('/');
  }

}
