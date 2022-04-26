import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from 'src/app/services/register.service';
import { user } from 'src/app/interfaces/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: user = {
    ultimatix: 0,
    clave : "",
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    rol: "",
    timestamp: "",
    status : 0,
    error: "",
    path: ""
  };

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
    this.service.register().subscribe((data: user) =>  {
      this.user.ultimatix = data.ultimatix;
      this.user.clave = data.clave;
      this.user.nombre = data.nombre;
      this.user.apellido = data.apellido;
      this.user.telefono = data.telefono;
      this.user.correo = data.correo;
      this.user.rol = data.rol;

      this.user.timestamp = data.timestamp;
      this.user.status = data.status;
      this.user.error = data.error;
      this.user.path = data.path;

      console.log("User data received")
      console.log(this.user)
   

    });
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
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else {
      // out: {ultimatix: '', password: ''}
      console.log(this.myForm.value);
      console.log(this.myForm.valid);
      this.router.navigateByUrl('/pages/selection');
      this.myForm.reset();
    }
  }
}
