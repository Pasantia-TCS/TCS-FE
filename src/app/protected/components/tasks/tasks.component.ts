import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';
import { UserService } from 'src/app/shared/services/user.service';
import { Assignment } from '../../interfaces/asignacion';
import { AsignacionService } from '../../services/asignacion.service';
import { GeneralService } from '../../services/general.service';
import { DarBajaComponent } from '../dar-baja/dar-baja.component';
import { NewAssignmentComponent } from '../new-assignment/new-assignment.component';
import { TableAsignacion } from '../tableAsignacion/tableAsignacion.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {

  @ViewChild(CustomTableComponent) table: any;

  titles: string[] = ['Acciones', 'Equipo', 'Tipo', 'Asignación (%)', 'Fecha de inicio', 'Fecha de finalización', 'Fecha de salida', 'Estado'];
  dataBody!: Assignment[];

  proyectos!: Assignment[];
  currentProject!: Assignment;

  ultimatix!: string;

  constructor(
    private asignacionService: AsignacionService,
    private userService: UserService,
    private dialog: MatDialog,
    private generalService: GeneralService
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
    this.dialog.open(NewAssignmentComponent, { data: { item: null, edit: false } });
  }

  update(item: Assignment) {
    this.dialog.open(NewAssignmentComponent, { data: { item, edit: true } });
  }

  exportTable(): void {
    this.generalService.exportData('table', 'Reporte asignaciones');
  }
}
