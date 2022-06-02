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

  assets!: MatTableDataSource<Asset>;
  teams!: MatTableDataSource<Team>;
  assignments!: MatTableDataSource<Assignment>;

  constructor(
    private adminService: AdminService,
    private teamService: EquiposService,
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    this.loadAssets();
    this.loadTeams();
    this.loadAssignments();
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
    this.teamService.show()
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
