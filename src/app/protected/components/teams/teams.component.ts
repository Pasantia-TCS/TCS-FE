import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { equipo } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';
import { GeneralService } from '../../services/general.service';
import { NewTeamComponent } from '../new-team/new-team.component';
import { TableEquiposComponent } from '../tableEquipos/tableEquipos.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  @ViewChild(TableEquiposComponent) table: any;

  currentUser: user = {};
  equipo: equipo[] = [];

  constructor(
    private teamService: EquiposService,
    private userService: UserService,
    private dialog: MatDialog,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
  }

  loadUser(): void {
    this.currentUser = this.userService.getUserData();
  }

  deleteTeam(id_team: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el equipo?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamService.delete(id_team).subscribe({
          next: resp => {
            this.equipo = resp;
            this.table.loadTeams();
            Swal.fire('¡Eliminado!', 'Equipo eliminado con éxito.', 'success');
          },
          error: err => Swal.fire('Error', err.error.mensaje, 'error')
        });
      }
    });
  }

  createTeam() {
    this.dialog.open(NewTeamComponent, { data: { team: null, editTeam: false } });
  }

  updateTeam(team: equipo) {
    this.dialog.open(NewTeamComponent, { data: { team, editTeam: true } });
  }

  exportTable(): void {
    this.generalService.exportData('tableEquipos', 'Reporte equipos');
  }

}
