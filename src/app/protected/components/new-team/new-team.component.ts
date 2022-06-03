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

  nuevoEquipoForm: FormGroup = this.fb.group({
    nombre_equipo_asi: ['', Validators.required],
    tipo_equipo_asi: ['Proyecto', Validators.required],
    descripcion_asi: ['', Validators.required],
    nombre_lider: ['', Validators.required],
    nombre_tecnico: ['', Validators.required],
  });

  team!: Team;
  teams!: Team[];
  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  updateTeam: boolean = false;
  count!: number;

  constructor(
    private teamsService: EquiposService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.updateTeam = this.data.editTeam;
    this.team = this.data.team;
    this.teams = this.data.teams;
    this.updateForm(this.updateTeam);
    this.count = this.nuevoEquipoForm.get('descripcion_asi')?.value.length;
  }

  updateForm(status: boolean) {
    if (status) {
      this.nuevoEquipoForm.patchValue({
        nombre_equipo_asi: this.team.nombre_equipo_asi,
        tipo_equipo_asi: this.team.tipo_equipo_asi,
        descripcion_asi: this.team.descripcion_asi,
        nombre_lider: this.team.nombre_lider,
        nombre_tecnico: this.team.nombre_tecnico
      });
      this.nuevoEquipoForm.get('nombre_equipo_asi')?.disable();
      this.nuevoEquipoForm.get('tipo_equipo_asi')?.disable();
      this.nuevoEquipoForm.get('descripcion_asi')?.disable();
    }
  }

  getCtrl(controlName: string) {
    return this.nuevoEquipoForm.get(controlName);
  }

  save() {
    if (this.nuevoEquipoForm.invalid) {
      this.nuevoEquipoForm.markAllAsTouched();
    } else {
      this.updateTeam ? this.update() : this.create();
    }
  }

  create() {
    this.teamsService.add(this.nuevoEquipoForm.value)
      .subscribe({
        next: resp => {
          this.teams = resp;
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Grupo de trabajo registrado con éxito.', 'success');
        },
        error: err => Swal.fire('Error', err.error.mensaje, 'error')
      });
  }

  update() {
    if (this.team.estado_asi === false) {
      Swal.fire('¡Aviso!', 'No se puede editar un proyecto no vigente.', 'info');
    } else {
      const { nombre_lider, nombre_tecnico } = this.nuevoEquipoForm.value;
      this.teamsService.edit(this.team.id_asi!, nombre_lider, nombre_tecnico)
        .subscribe(
          {
            next: resp => {
              this.teams = resp;
              this.dialogRef.close(resp);
              Swal.fire('¡Éxito!', 'Equipo actualizado con éxito.', 'success');
            },
            error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
          }
        );
    }
  }

  onKey(event: any) {
    this.count = event.target.value.length;
  }

  exit(): void {
    this.dialogRef.close();
  }

}
