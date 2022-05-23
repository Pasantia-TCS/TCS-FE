import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Assignment } from '../../interfaces/asignacion';
import { AsignacionService } from '../../services/asignacion.service';

@Component({
  selector: 'app-tableAsignacion',
  templateUrl: './tableAsignacion.component.html',
  styles: []
})
export class TableAsignacion implements OnInit {

  @Output() indexToDelete = new EventEmitter<string>();

  currentUser: User = {}
  ultimatix: string | undefined = '';

  tableData: Assignment[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'ID', 'Proyecto', 'Descripción', 'Fecha Inicio', 'Fecha Fin', 'Asignacion'];

  tipos: string[] = ['Proyecto', 'Célula, Tribu'];
  asignacion: string[] = ['0%', '25%', '50%', '75%', '100%'];
  liderProyecto: string[] = ['Juan', 'Pablo'];
  liderTecnico: string[] = ['Juan', 'Pablo'];

  project: Assignment = {};

  clickEventSubscription: Subscription;

  users: User[] = [];

  constructor(
    private asignacionService: AsignacionService,
    private userService: UserService
  ) {
    this.clickEventSubscription = this.asignacionService.getClickEvent()
      .subscribe(() => setTimeout(() => this.load(), 500))
  }

  ngOnInit(): void {
    this.asignacionService.obtenerAsignacion()
      .subscribe({
        next: resp => {
          this.tableData = resp;
        }
      });
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
  }

  load() {
    this.asignacionService.obtenerAsignacion()
      .subscribe((result) => {
        this.tableData = result;
      });
  }

  deleteItem(index: string) {
    this.indexToDelete.emit(index);
  }

  editItem(assignment: Assignment) {
    this.project = assignment;
  }

  cargarUsuarios() {
    this.asignacionService.obtenerUsuarios()
      .subscribe(
        {
          next: resp => this.users = resp,
          error: err => console.log('Error: ', err)
        }
      )
  }

}
