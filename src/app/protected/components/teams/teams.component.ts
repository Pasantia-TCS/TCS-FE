import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { user } from 'src/app/interfaces/user';
import { equipo } from '../../interfaces/equipo';
import { UserService } from 'src/app/shared/services/user.service';
import { EquiposService } from '../../services/equipos.service';
import { TableEquiposComponent } from '../tableEquipos/tableEquipos.component';

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

  constructor(private teamService: EquiposService, private userService: UserService) { }

  ngOnInit(): void {
  }

  loadUser(): void {
    this.currentUser = this.userService.getUserData();
  }

  deleteItem(id_team: string): void {

    Swal.fire({
      title: '¿Quieres eliminar el equipo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamService.delete(id_team).subscribe({
          next: resp => {
            this.equipo = resp;
            this.table.loadTeams();
            Swal.fire('Éxito', 'Equipo eliminado con éxito.', 'success')
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error')
          }
        });
      } else if (result.isDenied) {
        Swal.fire('El equipo no se ha eliminado.', '', 'info')
      }
    })
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
