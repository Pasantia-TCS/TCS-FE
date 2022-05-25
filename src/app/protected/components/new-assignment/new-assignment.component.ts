import { Component, Inject, OnInit } from '@angular/core';
import { Assignment } from 'src/app/protected/interfaces/asignacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AsignacionService } from 'src/app/protected/services/asignacion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styles: []
})
export class NewAssignmentComponent {

  types: string = '';
  projects: string = '';

  asignacion: Assignment = {};

  nuevoAsignacionForm: FormGroup = this.fb.group(
    {
      projects: ['', Validators.required],
      types: ['', Validators.required],
      id_equipo_asi: ['', Validators.required],
      utimatix_asi: ['', Validators.required],
      asignacion: [0, Validators.required],
      fecha_inicio: ['2022-10-08', Validators.required],
      fecha_fin: ['2022-10-10', Validators.required],
    }
  );

  constructor(
    public dialogRef: MatDialogRef<NewAssignmentComponent>,
    private fb: FormBuilder,
    private asignacionService: AsignacionService,
  ) { }

  getTeam() {
    return this.asignacionService.showByNameID(this.types, this.projects)
  }
  getCtrl(controlName: string) {
    return this.nuevoAsignacionForm.get(controlName);
  }

  clickMe() {
    this.asignacionService.sendClickEvent();
  }
  registrarAsignacion() {
    this.asignacionService.agregar(this.nuevoAsignacionForm.value)
      .subscribe(
        {
          next: () => {
            this.clickMe();
            this.nuevoAsignacionForm.reset(
              {
                asignacion: ''
              }
            );
            Swal.fire('Éxito', 'Asignación registrada con éxito.', 'success');
            this.dialogRef.close();
          },
          error: err => Swal.fire('Error', err.error.mensaje, 'error')
        }
      );
  }
  close(): void {
    this.dialogRef.close();
  }
}