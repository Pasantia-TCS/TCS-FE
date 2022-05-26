import { Component, Inject, OnInit } from '@angular/core';
import { Assignment } from 'src/app/protected/interfaces/asignacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AsignacionService } from 'src/app/protected/services/asignacion.service';
import Swal from 'sweetalert2';
import { EquiposService } from '../../services/equipos.service';
import { Team } from '../../interfaces/equipo';
import { UserService } from 'src/app/shared/services/user.service';
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // Get teams
    this.equiposService.show()
      .subscribe({ next: resp => this.teams = resp });

    // Get ultimatix
    this.ultimatix = this.userService.getUltimatix()!;
  }

  getCtrl(controlName: string) {
    return this.nuevoAsignacionForm.get(controlName);
  }

  clickMe() {
    this.asignacionService.sendClickEvent();
  }

  registrarAsignacion() {

    if (this.nuevoAsignacionForm.invalid) {
      this.nuevoAsignacionForm.markAllAsTouched();
    } else {
      this.nuevoAsignacionForm.patchValue({
        ultimatix_asi: this.ultimatix.toString()
      });

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
  }
  
  close(): void {
    this.dialogRef.close();
  }
}