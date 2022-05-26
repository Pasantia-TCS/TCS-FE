import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AsignacionService } from '../../services/asignacion.service';
import { Assignment } from '../../interfaces/asignacion';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dar-baja',
  templateUrl: './dar-baja.component.html',
  styles: [
  ]
})
export class DarBajaComponent implements OnInit {

  salidaForm: FormGroup = this.fb.group({
    fecha_baja: ['', Validators.required]
  });

  assignment!: Assignment;
  ultimatix!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<DarBajaComponent>,
    private asignacionService: AsignacionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // Get ultimatix
    this.ultimatix = this.userService.getUltimatix()!;

    this.assignment = this.data.item;
  }

  clickMe() {
    this.asignacionService.sendClickEvent();
  }

  darBaja(): void {
    if (this.salidaForm.invalid) {
      this.salidaForm.markAllAsTouched();
    } else {
      Swal.fire({
        title: '¿Estás seguro que deseas desvicularte del equipo?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        denyButtonText: 'No',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.asignacionService
            .delete(
              this.assignment.id_asignacion_proyecto_asi!,
              this.assignment.id_equipo_asi!,
              this.ultimatix,
              this.assignment.asignacion!,
              this.salidaForm.get('fecha_baja')?.value
            ).subscribe(
              {
                next: () => {
                  this.clickMe();
                  this.dialogRef.close();
                  Swal.fire('Éxito', 'Fecha de salida guardada con éxito.', 'success');
                },
                error: err => Swal.fire('Error', err.error.mensaje, 'error')
              }
            );
        } else if (result.isDenied) {
          Swal.fire('No se ha podido guardar la fecha de salida', '', 'info');
        }
      });
    }
  }




}
