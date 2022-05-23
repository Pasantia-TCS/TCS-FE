import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { user } from 'src/app/interfaces/user';
import { asignacion } from 'src/app/protected/interfaces/asignacion';
import { AsignacionService } from 'src/app/protected/services/asignacion.service';
import { TasksService } from 'src/app/shared/services/tasks.service';
import { profile } from 'src/app/protected/interfaces/profile';
import { ProfileService } from 'src/app/protected/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  asignaciones: number[] = [0, 25, 50, 75, 100];
  lideresProyecto: string[] = ['Juan', 'Pablo', 'JUAN'];
  lideresTecnico: string[] = ['Juan', 'Pablo', 'MARCELO'];
  tableHeader: string[] = ['Acciones', 'Ultimatix', 'Nombre', 'Habilidades', 'Asignacion'];

  asignacion: asignacion = {};

  perfiles: number[] = [];

  tableData: user[] = [];
  tableKey: any = [];
  tableValue: any = [];

  nuevoAsignacionForm: FormGroup = this.fb.group({
    nombre_proyecto: ['Banca Web3', Validators.required],
    tipo_proyecto: [2, Validators.required],
    usuario_red: ['@user', Validators.required],
    asignacion: [0, Validators.required],
    fecha_inicio: ['2019-12-10', Validators.required],
    fecha_fin: ['2019-12-10', Validators.required],
    descripcion: ['proyecto CTB', Validators.required],
    nombre_lider: ['JUAN', Validators.required],
    nombre_tecnico: ['MARCELO', Validators.required],
  });

  users!: profile[];
  usersTemp: profile[] = [];

  ultimatix: string = '';
  currentUser!: profile;

  aux = ["Proyecto", "Célula", "Tribu"]

  constructor(private asignacionService: AsignacionService, private fb: FormBuilder, private tasksService: TasksService, private profileService: ProfileService, private userService: UserService) { }

  ngOnInit(): void {
    this.tasksService.loadUsers();
    setTimeout(() => this.users = this.tasksService.getUsers(), 100);
    this.ultimatix = this.userService.getUltimatix()!;
    this.profileService.getProfile(this.ultimatix)
      .subscribe({
        next: resp => this.currentUser = resp
      });
  }

  clickMe() {
    this.asignacionService.sendClickEvent();
  }

  guardarAsignacion() {
    this.asignacion = this.nuevoAsignacionForm.value;
    this.usersTemp.forEach((user) => {
      this.perfiles.push(user.id_ultimatix);
    });
    // this.asignacion.perfiles = this.perfiles;

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

  addUserTemp(user: profile) {
    this.usersTemp.push(user);
  }

  deleteUserTemp(index: number) {
    this.usersTemp.splice(index);
  }

}
