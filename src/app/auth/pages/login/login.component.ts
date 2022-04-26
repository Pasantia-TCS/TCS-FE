import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { user } from 'src/app/interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: user = {
    ultimatix: 0,
    clave : "",
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    rol: ""
  };

  myForm: FormGroup = this.fb.group({
    ultimatix: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private service : LoginService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.service.authenticate().subscribe((data: user) =>  {
      this.user.ultimatix = data.ultimatix;
      this.user.clave = data.clave;
      this.user.nombre = data.nombre;
      this.user.apellido = data.apellido;
      this.user.telefono = data.telefono;
      this.user.correo = data.correo;
      this.user.rol = data.rol;

      console.log("User data received")
      console.log(this.user)
   

    });

  }

  valid_field(field_name: string) {
    return this.myForm.controls[field_name].errors && this.myForm.controls[field_name].touched;
  }

  login() {
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
