import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Team } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';
import { GeneralService } from '../../services/general.service';
import { NewTeamComponent } from '../new-team/new-team.component';
import { TableEquiposComponent } from '../tableEquipos/tableEquipos.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styles: []
})
export class TeamsComponent {

  @ViewChild(TableEquiposComponent) table: any;

  currentUser: User = {};
  equipo: Team[] = [];

  constructor(
    private teamService: EquiposService,
    private userService: UserService,
    private dialog: MatDialog,
    private generalService: GeneralService
  ) { }

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
        this.teamService.delete(id_team)
          .subscribe(
            {
              next: resp => {
                this.equipo = resp;
                this.table.loadTeams();
                Swal.fire('¡Eliminado!', 'Equipo eliminado con éxito.', 'success');
              },
              error: err => Swal.fire('Error', err.error.mensaje, 'error')
            }
          );
      }
    });
  }

  createTeam() {
    this.dialog.open(NewTeamComponent, { data: { team: null, editTeam: false } });
  }

  updateTeam(team: Team) {
    this.dialog.open(NewTeamComponent, { data: { team, editTeam: true } });
  }

  exportTable(): void {
    this.generalService.exportData('tableEquipos', 'Reporte equipos');
  }

}
