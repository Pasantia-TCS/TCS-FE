import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Assignment } from 'src/app/protected/interfaces/asignacion';
import { AsignacionService } from 'src/app/protected/services/asignacion.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Team } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';

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

  update: boolean = false;

  asignacion: Assignment = {};

  nuevoAsignacionForm: FormGroup = this.fb.group(
    {
      id_equipo_asi: ['', Validators.required],
      asignacion: [25, Validators.required],
      ultimatix_asi: [''],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
    }
  );

  constructor(
    public dialogRef: MatDialogRef<NewAssignmentComponent>,
    private fb: FormBuilder,
    private asignacionService: AsignacionService,
    private equiposService: EquiposService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    // Get teams
    this.equiposService.show()
      .subscribe({ next: resp => this.teams = resp });

    // Get ultimatix
    this.ultimatix = this.userService.getUltimatix()!;

    // Update
    this.update = this.data.edit;
    this.asignacion = this.data.item;

    if (this.update) {      
      this.nuevoAsignacionForm.patchValue(
        {
          id_equipo_asi: this.asignacion.id_equipo_asi,
          asignacion: this.asignacion.asignacion,
          ultimatix_asi: this.asignacion.utimatix_asi,
          fecha_inicio: this.asignacion.fecha_inicio,
          fecha_fin: this.asignacion.fecha_fin,
        }
      );

      this.nuevoAsignacionForm.get('id_equipo_asi')?.disable();
      this.nuevoAsignacionForm.get('fecha_inicio')?.disable();
    }
  }

  getCtrl(controlName: string) {
    return this.nuevoAsignacionForm.get(controlName);
  }

  clickMe() {
    this.asignacionService.sendClickEvent();
  }

  save() {
    if (this.nuevoAsignacionForm.invalid) {
      this.nuevoAsignacionForm.markAllAsTouched();
    } else {
      this.update ? this.updateItem() : this.create();
    }
  }


  create() {
    this.asignacionService.agregar(this.nuevoAsignacionForm.value)
      .subscribe(
        {
          next: () => {
            this.clickMe();
            this.nuevoAsignacionForm.reset({
              asignacion: ''
            });
            Swal.fire('Éxito', 'Asignación registrada con éxito.', 'success');
            this.dialogRef.close();
          },
          error: err => Swal.fire('Error', err.error.mensaje, 'error')
        }
      );
  }

  updateItem() {    
    if (this.asignacion.estado === false) {
      Swal.fire('¡Aviso!', 'No se puede editar una asignacion no vigente.', 'info');
    } else {
      const { asignacion, fecha_fin } = this.nuevoAsignacionForm.value;
      this.asignacionService.update(this.asignacion.id_asignacion_proyecto_asi!, asignacion, fecha_fin)
        .subscribe(
          {
            next: () => {
              this.clickMe();
              Swal.fire('¡Éxito!', 'Asignacion editado con éxito.', 'success');
              this.dialogRef.close();
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