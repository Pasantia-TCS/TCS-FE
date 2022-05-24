import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styles: []
})
export class NewAssignmentComponent {

  types: string[] = ['Proyecto', 'Célula', 'Tribu'];
  projects: string[] = ['Proyecto 1', 'Proyecto 2', 'Proyecto 3', 'Proyecto 4', 'Proyecto 5', 'Proyecto 6'];

  nuevoAsignacionForm: FormGroup = this.fb.group(
    {
      nombre_equipo_asi: ['', Validators.required],
      id_equipo_asi: [2, Validators.required],
      usuario_red: ['@user', Validators.required],
      asignacion: [0, Validators.required],
      fecha_inicio: ['2019-12-10', Validators.required],
      fecha_fin: ['2019-12-10', Validators.required],
    }
  );

  constructor(
    public dialogRef: MatDialogRef<NewAssignmentComponent>,
    private fb: FormBuilder
  ) { }

  close(): void {
    this.dialogRef.close();
  }

}