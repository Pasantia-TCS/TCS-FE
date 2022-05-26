import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timeInterval } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Assignment } from '../../interfaces/asignacion';
import { AsignacionService } from '../../services/asignacion.service';
import { DarBajaComponent } from '../dar-baja/dar-baja.component';
import { NewAssignmentComponent } from '../new-assignment/new-assignment.component';
import { TableAsignacion } from '../tableAsignacion/tableAsignacion.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {

  titles: string[] = ['Acciones', 'Equipo', 'Tipo', 'Asignación (%)', 'Fecha de inicio', 'Fecha de finalización', 'Fecha de salida', 'Estado'];
  dataBody!: Assignment[];

  proyectos!: Assignment[];
  currentProject!: Assignment;

  ultimatix!: string;

  constructor(
    private asignacionService: AsignacionService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Get ultimatix
    this.ultimatix = this.userService.getUltimatix()!;

    // Load assignments
    this.asignacionService.obtenerAsignaciones(this.ultimatix)
      .subscribe({ next: resp => this.dataBody = resp });
  }

  openUnsubscribe(item: Assignment) {
    this.dialog.open(DarBajaComponent, { data: { item } });
  }

  newAssignment() {
    this.dialog.open(NewAssignmentComponent);
  }
}
