import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { user } from 'src/app/interfaces/user';
import { equipo } from '../../interfaces/equipo';
import { UserService } from 'src/app/shared/services/user.service';
import { EquiposService } from '../../services/equipos.service';
import { TableEquiposComponent } from '../tableEquipos/tableEquipos.component';
import { MatDialog } from '@angular/material/dialog';
import { NewTeamComponent } from '../new-team/new-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');

  fileName: string = 'Reporte Equipos ' + this.date + '.xlsx';

  @ViewChild(TableEquiposComponent) table: any;

  currentUser: user = {};
  equipo: equipo[] = [];

  constructor(private teamService: EquiposService, private userService: UserService, private dialog: MatDialog) { }

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
    let element = document.getElementById('tableEquipos');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Generar archivo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save
    XLSX.writeFile(wb, this.fileName);
  }

}
