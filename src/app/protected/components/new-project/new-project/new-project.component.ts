import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { user } from 'src/app/interfaces/user';
import { asignacion, perfil, idp } from 'src/app/protected/interfaces/asignacion';
import { AsignacionService } from 'src/app/protected/services/asignacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  asignaciones: number[] = [0, 25, 50, 75, 100];
  lideresProyecto: string[] = ['Juan', 'Pablo'];
  lideresTecnico: string[] = ['Juan', 'Pablo'];
  tableHeader: string[] = ['Acciones', 'Ultimatix', 'Nombre', 'Habilidades', 'Asignacion'];

  asignacion: asignacion = {};

  perfiles: perfil[] = [];
    id_tipo_proyecto: idp = {
    id_tipo_proyecto: 0
  };

  tableData: user[] = [];
  tableKey: any = [];
  tableValue: any = [];

  nuevoAsignacionForm: FormGroup = this.fb.group({
    nombre: ['CTB', Validators.required],
    tipo: ['', Validators.required],
    asignacion: [0, Validators.required],
    //usuario_red: ['@juan', Validators.required],
    fecha_inicio: ['2022-01-01', Validators.required],
    fecha_fin: ['2022-01-01', Validators.required],
    nombre_lider: ['Juan', Validators.required],
    nombre_tecnico: ['Juan', Validators.required],
    perfiles: ['', Validators.required],
    //descripcion: ['proyecto 1', Validators.required],
    estado: [true]
  });

  constructor(private asignacionService: AsignacionService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  clickMe() {
    this.asignacionService.sendClickEvent();
  }

  guardarAsignacion() {
    console.log('guardar');

    this.asignacion = this.nuevoAsignacionForm.value;
    this.perfiles = [
      { id_ultimatix: 1478596 },
      { id_ultimatix: 1452639 }
    ]
    this.asignacion.perfiles = this.perfiles;
    this.id_tipo_proyecto = {
      id_tipo_proyecto: 1
    }
    this.asignacion.tipo_proyecto = this.id_tipo_proyecto;
    console.log(this.asignacion)
    this.asignacionService.register(this.asignacion).subscribe({
      next: () => {
        this.clickMe();
        this.nuevoAsignacionForm.reset();
        Swal.fire('Éxito', 'Proyecto registrado con éxito.', 'success');
      },
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error');
      }
    });
  }

}
