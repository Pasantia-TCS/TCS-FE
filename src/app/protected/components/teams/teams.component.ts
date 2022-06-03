import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user';
import Swal from 'sweetalert2';
import { Team } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';
import { NewTeamComponent } from '../new-team/new-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styles: []
})
export class TeamsComponent implements OnInit {

  tableHeader: string[] = ['Acciones', 'Nombre', 'Tipo', 'Descripción', 'Líder de equipo', 'Líder técnico', 'Estado'];
  teams!: Team[];

  currentUser: User = {};

  constructor(
    private teamService: EquiposService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadTeams()
  }

  loadTeams() {
    this.teamService.show()
      .subscribe({ next: resp => this.teams = resp })
  }

  changeStatus(id_team: string): void {
    Swal.fire({
      title: '¿Estás seguro de cambiar el estado del grupo de trabajo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamService.changeStatus(id_team)
          .subscribe(
            {
              next: resp => {
                this.teams = resp;
                Swal.fire('¡Éxito!', 'El estado del grupo de trabajo se ha actualizado con éxito.', 'success');
              },
              error: err => Swal.fire('Error', err.error.mensaje, 'error')
            }
          );
      }
    });
  }

  openCreateModal() {
    this.dialog.open(NewTeamComponent, { data: { teams: this.teams, editTeam: false } })
      .afterClosed().subscribe({
        next: resp => {
          if (resp) { this.teams = resp }
        }
      });
  }

  updateTeam(team: Team) {
    this.dialog.open(NewTeamComponent, { data: { team, editTeam: true } })
      .afterClosed()
      .subscribe({
        next: resp => {
          if (resp) {
            this.teams = resp;
          }
        }
      });
  }
}
