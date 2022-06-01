import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Assignment } from 'src/app/protected/interfaces/asignacion';
import { AsignacionService } from 'src/app/protected/services/asignacion.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Team } from '../../interfaces/equipo';

@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styles: [
    `
  form label {
    margin-left: 12px;
  }
  `
  ]
})
export class NewAssignmentComponent implements OnInit {

  types: string[] = ['Proyecto', 'Célula', 'Tribu'];
  teams!: Team[];
  ultimatix!: string;
  editAssignment: boolean = false;
  assignment!: Assignment;
  assignments!: Assignment[];

  nuevoAsignacionForm: FormGroup = this.fb.group({
    id_equipo_asi: ['', Validators.required],
    asignacion: [25, Validators.required],
    ultimatix_asi: [''],
    fecha_inicio: ['', Validators.required],
    fecha_fin: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<NewAssignmentComponent>,
    private fb: FormBuilder,
    private asignacionService: AsignacionService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    this.ultimatix = this.userService.getUltimatix()!;

    this.editAssignment = this.data.edit;
    this.teams = this.data.teams;
    this.assignments = this.data.assignments;
    this.assignment = this.data.assignment;

    this.loadFields(this.editAssignment);
  }

  getCtrl(controlName: string) {
    return this.nuevoAsignacionForm.get(controlName);
  }

  loadFields(edit: boolean) {
    if (edit) {
      this.nuevoAsignacionForm.patchValue({
        id_equipo_asi: this.assignment.id_equipo,
        asignacion: this.assignment.asignacion,
        ultimatix_asi: this.assignment.ultimatix_asi,
        fecha_inicio: this.assignment.fecha_inicio,
        fecha_fin: this.assignment.fecha_fin,
      });

      this.nuevoAsignacionForm.get('id_equipo_asi')?.disable();
      this.nuevoAsignacionForm.get('fecha_inicio')?.disable();
    }
  }

  save() {
    if (this.nuevoAsignacionForm.invalid) {
      this.nuevoAsignacionForm.markAllAsTouched();
    } else {
      this.editAssignment ? this.updateItem() : this.createItem();
    }
  }

  createItem() {
    this.nuevoAsignacionForm.patchValue({
      ultimatix_asi: this.ultimatix
    });

    this.asignacionService.agregar(this.nuevoAsignacionForm.value)
      .subscribe({
        next: resp => {
          this.assignments = resp;
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Asignación registrada con éxito.', 'success');
        },
        error: err => Swal.fire('Error', err.error.mensaje, 'error')
      });
  }

  updateItem() {
    if (this.assignment.estado === false) {
      Swal.fire('¡Aviso!', 'No se puede editar una asignacion no vigente.', 'info');
    } else {
      const { asignacion, fecha_fin } = this.nuevoAsignacionForm.value;
      this.asignacionService.update(this.assignment.id_asignacion_proyecto_asi!, asignacion, fecha_fin)
        .subscribe(
          {
            next: resp => {
              this.assignments = resp
              Swal.fire('¡Éxito!', 'Asignacion editado con éxito.', 'success');
              this.dialogRef.close(resp);
            },
            error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
          }
        );
    }
  }

  exit(): void {
    this.dialogRef.close();
  }

}