import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  areas: string[] = ['CTB', 'EnP', 'Librarian', 'Panamá', 'Seguridad', 'SES'];
  tipos: string[] = ['Computador'];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  nuevoActivoForm: FormGroup = this.fb.group({
    area: ['CTB', Validators.required],
    tipo: ['Computador', Validators.required],
    edificio: ['Inluxor', Validators.required],
    piso: ['Piso 1', Validators.required],
    hostname: ['', Validators.required],
    direccion_mac: ['', [Validators.required, Validators.pattern('^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$')]],
    direccion_ip: ['', [Validators.required, Validators.pattern("^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\\d)|1?\\d?\\d)){4}$")]],
    reservada_ip: ['false', Validators.required],
    fecha_entrega: ['', Validators.required]
  });

  activo: activo = {};

  constructor(
    private activosService: ActivosService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewAssetComponent>
  ) { }

  ngOnInit(): void {
  }

  getCtrl(controlName: string) {
    return this.nuevoActivoForm.get(controlName);
  }

  clickMe() {
    this.activosService.sendClickEvent();
  }

  saveAsset() {
    if (this.nuevoActivoForm.invalid) {
      this.nuevoActivoForm.markAllAsTouched();
      return;
    } else {
      this.activo = this.nuevoActivoForm.value;
      const userC: user = this.userService.getUserData();
      this.activo.id_ultimatix = userC.id_numero_Ultimatix;
      this.activosService.register(this.activo)
        .subscribe({
          next: () => {
            this.clickMe();
            this.nuevoActivoForm.reset({
              area: ['CTB'],
              tipo: 'Computador',
              edificio: ['Inluxor'],
              piso: ['Piso 1'],
              reservada_ip: ['false'],
            });
            this.dialogRef.close();
            Swal.fire('¡Éxito!', 'Activo registrado con éxito.', 'success');
          },
          error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
        });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
