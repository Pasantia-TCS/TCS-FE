import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Asset } from '../../interfaces/activo';
import { Assignment } from '../../interfaces/asignacion';
import { Team } from '../../interfaces/equipo';
import { AdminService } from '../../services/admin.service';
import { EquiposService } from '../../services/equipos.service';
import { assignmentColumns, teamColumns, assetColumns, profileColumns } from './structure';
import { environment } from 'src/environments/environment';
import { Profile } from '../../interfaces/profile';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: []
})
export class ReportsComponent implements OnInit {

  assetColumns = assetColumns;
  teamColumns = teamColumns;
  assignmentColumns = assignmentColumns;
  profileColumns = profileColumns;

  assetst!: MatTableDataSource<Asset>;
  assets!: MatTableDataSource<Asset>;
  teams!: MatTableDataSource<Team>;
  assignments!: MatTableDataSource<Assignment>;
  assignmentst!: MatTableDataSource<Assignment>;
  profiles!: MatTableDataSource<Profile>;

  baseUrl: string = `${environment.url}/`;

  constructor(
    private adminService: AdminService,
    private teamService: EquiposService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.loadAssets();
    this.loadTeams();
    this.loadAssignments();
    this.loadProfiles();
  }

  loadAssets() {
    this.adminService.getAssets()
      .subscribe({
        next: resp => this.assets = new MatTableDataSource(resp)
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

  loadProfiles() {
    this.profileService.getProfiles()
      .subscribe({
        next: resp => this.profiles = new MatTableDataSource(resp)
      });
  }

}
