import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Team } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  update: boolean = false;

  nuevoEquipoForm: FormGroup = this.fb.group(
    {
      nombre_equipo_asi: ['', Validators.required],
      tipo_equipo_asi: ['Proyecto', Validators.required],
      descripcion_asi: ['', Validators.required],
      nombre_lider: ['', Validators.required],
      nombre_tecnico: ['', Validators.required],
    }
  );

  team: Team = {};

  constructor(
    private equiposService: EquiposService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.update = this.data.editTeam;
    this.team = this.data.team;

    if (this.update) {
      this.nuevoEquipoForm.patchValue(
        {
          nombre_equipo_asi: this.team.nombre_equipo_asi,
          tipo_equipo_asi: this.team.tipo_equipo_asi,
          descripcion_asi: this.team.descripcion_asi,
          nombre_lider: this.team.nombre_lider,
          nombre_tecnico: this.team.nombre_tecnico
        }
      );

      this.nuevoEquipoForm.get('nombre_equipo_asi')?.disable();
      this.nuevoEquipoForm.get('tipo_equipo_asi')?.disable();
      this.nuevoEquipoForm.get('descripcion_asi')?.disable();
    }
  }

  clickMe() {
    this.equiposService.sendClickEvent();
  }

  getCtrl(controlName: string) {
    return this.nuevoEquipoForm.get(controlName);
  }

  save() {
    console.log( ' Save ' + this.update);

    if (this.nuevoEquipoForm.invalid) {
      this.nuevoEquipoForm.markAllAsTouched();
    } else {
      this.update ? this.updateTeam() : this.createTeam();
    }
  }

  createTeam() {
    console.log( ' New team ' + this.update);

    this.equiposService.add(this.nuevoEquipoForm.value)
      .subscribe(
        {
          next: () => {
            this.clickMe();
            this.nuevoEquipoForm.reset({
              tipo_equipo_asi: ''
            });
            Swal.fire('Éxito', 'Equipo registrado con éxito.', 'success');
            this.dialogRef.close();
          },
          error: err => Swal.fire('Error', err.error.mensaje, 'error')
        }
      );
  }

  updateTeam() {
    console.log( ' Edit assignment ' + this.update);

    if (this.team.estado_asi === false) {
      Swal.fire('¡Aviso!', 'No se puede editar un proyecto no vigente.', 'info');
    } else {
      const { nombre_lider, nombre_tecnico } = this.nuevoEquipoForm.value;
      this.equiposService.edit(this.team.id_asi!, nombre_lider, nombre_tecnico)
        .subscribe(
          {
            next: () => {
              this.clickMe();
              Swal.fire('¡Éxito!', 'Equipo editado con éxito.', 'success');
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
