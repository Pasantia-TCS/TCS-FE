import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { activo } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
  styleUrls: ['./new-asset.component.css']
})
export class NewAssetComponent implements OnInit {

  areas: string[] = ['CTB', 'EnP', 'Librarian', 'Panamá', 'Seguridad', 'SES', 'Otras'];
  tipos: string[] = ['Computador'];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  nuevoActivoForm: FormGroup = this.fb.group({
    area: ['CTB', Validators.required],
    tipo: ['Computador', Validators.required],
    edificio: ['Inluxor', Validators.required],
    piso: ['Piso 3', Validators.required],
    hostname: ['hostname', Validators.required],
    direccion_mac: ['00-00-00-00-00-00', [Validators.required, Validators.pattern('^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$')]],
    direccion_ip: ['192.168.1.1', [Validators.required, Validators.pattern("^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\\d)|1?\\d?\\d)){4}$")]],
    reservada_ip: ['true', Validators.required],
    fecha_entrega: ['', Validators.required]
  });

  activo: activo = {};

  constructor(private activosService: ActivosService, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  clickMe() {
    this.activosService.sendClickEvent();
  }

  guardarActivo() {
    if (this.nuevoActivoForm.invalid) {
      this.nuevoActivoForm.markAllAsTouched();
      return;
    } else {
      this.activo = this.nuevoActivoForm.value;
      const userC: user = this.userService.getUserData();
      this.activo.id_ultimatix = userC.id_numero_Ultimatix;
      console.log(this.activo);
      this.activosService.register(this.activo).subscribe({
        next: () => {
          this.clickMe();
          this.nuevoActivoForm.reset();
          this.nuevoActivoForm.patchValue({
            area: "CTB",
            tipo: "Computador",
            edificio: "Centrum",
            piso: "Piso 1",
            reservada_ip: "No"
          });
          Swal.fire('Éxito', 'Activo registrado con éxito.', 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.mensaje, 'error');
        }
      });
    }
  }

}
