import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from '../../interfaces/activo';
import { Assignment } from '../../interfaces/asignacion';
import { Team } from '../../interfaces/equipo';
import { AdminService } from '../../services/admin.service';
import { EquiposService } from '../../services/equipos.service';
import { GeneralService } from '../../services/general.service';
import { assignmentColumns, teamColumns, assetColumns } from './structure';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: [
  ]
})
export class ReportsComponent implements OnInit {

  assetcolumns = assetColumns;
  teamColumns = teamColumns;
  assignmentColumns = assignmentColumns;

  assetst!: MatTableDataSource<Asset>;
  assets!: MatTableDataSource<Asset>;
  teams!: MatTableDataSource<Team>;
  teamst!: MatTableDataSource<Team>;
  assignments!: MatTableDataSource<Assignment>;
  assignmentst!: MatTableDataSource<Assignment>;

  constructor(
    private adminService: AdminService,
    private teamService: EquiposService,
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    this.loadAssets();
    this.loadTeams();
    this.loadAssignments();
    this.loadAssetsT();
    this.loadTeamsT();
    this.loadAssignmentsT();
  }

loadAssetsT(){
  this.adminService.getAssetsT()
  .subscribe({
    next: resp => {
      this.assetst = new MatTableDataSource(resp)
    }
  });
}

loadTeamsT(){
  this.teamService.show()
  .subscribe({
    next: resp => {
      this.teamst = new MatTableDataSource(resp)
    }
  });
}
loadAssignmentsT() {
  this.adminService.getAssignmentsT()
    .subscribe({
      next: resp => this.assignmentst = new MatTableDataSource(resp)
    });
}

  loadAssets() {
    this.adminService.getAssets()
      .subscribe({
        next: resp => {
          this.assets = new MatTableDataSource(resp)
        }
      });
  }

  loadTeams() {
    this.adminService.getTeam()
      .subscribe({
        next: resp => this.teams = new MatTableDataSource(resp)
      });
  }

  loadAssignments() {
    this.adminService.getAssignments()
      .subscribe({
        next: resp => this.assignments = new MatTableDataSource(resp)
      });
  }

  exportTable(data: any, reportName: string): void {
    this.generalService.exportData(data.filteredData, reportName);
  }

}
