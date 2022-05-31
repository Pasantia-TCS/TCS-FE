import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Assignment } from '../../interfaces/asignacion';
import { AsignacionService } from '../../services/asignacion.service';

@Component({
  selector: 'app-dar-baja',
  templateUrl: './dar-baja.component.html',
  styles: []
})
export class DarBajaComponent implements OnInit {

  salidaForm: FormGroup = this.fb.group({
    fecha_baja: ['', Validators.required]
  });

  assignment!: Assignment;
  assignments!: Assignment[];
  ultimatix!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<DarBajaComponent>,
    private asignacionService: AsignacionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.ultimatix = this.userService.getUltimatix()!;
    this.assignment = this.data;
  }

  darBaja(): void {
    if (this.salidaForm.invalid) {
      this.salidaForm.markAllAsTouched();
    } else {
      Swal.fire({
        title: '¿Estás seguro que deseas desvincularte del equipo?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.asignacionService.delete(
            this.assignment.id_asignacion_proyecto_asi!,
            this.assignment.id_equipo_asi!,
            this.ultimatix,
            this.assignment.asignacion!,
            this.salidaForm.get('fecha_baja')?.value
          ).subscribe({
            next: resp => {
              this.assignments = resp;
              this.dialogRef.close(resp);
              Swal.fire('Éxito', 'Fecha de salida guardada con éxito.', 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
        }
      });
    }
  }




}
