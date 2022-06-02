import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomTableComponent } from 'src/app/shared/components/custom-table/custom-table.component';
import { UserService } from 'src/app/shared/services/user.service';
import { Assignment } from '../../interfaces/asignacion';
import { Team } from '../../interfaces/equipo';
import { AsignacionService } from '../../services/asignacion.service';
import { EquiposService } from '../../services/equipos.service';
import { DarBajaComponent } from '../dar-baja/dar-baja.component';
import { NewAssignmentComponent } from '../new-assignment/new-assignment.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styles: []
})
export class TasksComponent implements OnInit {

  @ViewChild(CustomTableComponent) table: any;

  titles: string[] = ['Acciones', 'Equipo', 'Tipo', 'Asignación (%)', 'Fecha de inicio', 'Fecha de finalización', 'Fecha de salida', 'Estado'];
  icons: string[] = ['edit', 'delete'];
  assignments!: Assignment[];  // assignments
  teams!: Team[];
  proyectos!: Assignment[];
  currentProject!: Assignment;
  ultimatix!: string;

  constructor(
    private asignacionService: AsignacionService,
    private userService: UserService,
    private teamsService: EquiposService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.ultimatix = this.userService.getUltimatix()!;
    this.getAssignments();
    this.getTeams();
  }

  getAssignments() {
    this.asignacionService.obtenerAsignaciones(this.ultimatix)
      .subscribe({
        next: resp => this.assignments = resp
      });
  }

  getTeams() {
    this.teamsService.show()
      .subscribe({
        next: resp => this.teams = resp
      })
  }

  openNewAssignment() {
    this.dialog.open(NewAssignmentComponent, {
      data: {
        assignments: this.assignments,
        teams: this.teams,
        edit: false
      }
    })
      .afterClosed()
      .subscribe({
        next: resp => this.loadAssignments(resp)
      });
  }

  openUnsubscribe(item: Assignment) {
    this.dialog.open(DarBajaComponent, { data: item })
      .afterClosed()
      .subscribe({
        next: resp => this.loadAssignments(resp)
      });
  }

  openEdit(item: Assignment) {
    this.dialog.open(NewAssignmentComponent, {
      data: {
        assignment: item,
        assignments: this.assignments,
        teams: this.teams,
        edit: true
      }
    }).afterClosed().subscribe({
      next: resp => this.loadAssignments(resp)
    });
  }

  loadAssignments(assignments: Assignment[]) {
    if (assignments) {
      this.assignments = assignments;
    }
  }

}
