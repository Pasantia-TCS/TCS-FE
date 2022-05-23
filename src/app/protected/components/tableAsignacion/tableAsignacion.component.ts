import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import * as XLSX from 'xlsx';
import { asignacion } from '../../interfaces/asignacion';
import { AsignacionService } from '../../services/asignacion.service';

@Component({
  selector: 'app-tableAsignacion',
  templateUrl: './tableAsignacion.component.html'
})
export class TableAsignacion implements OnInit {

  @Output() indexToDelete = new EventEmitter<string>();

  currentUser: user = {}
  ultimatix: string | undefined = '';

  tableData: asignacion[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'ID', 'Proyecto', 'Descripción', 'Fecha Inicio', 'Fecha Fin', 'Asignacion'];

  tipos: string[] = ['Proyecto', 'Célula, Tribu'];
  asignacion: string[] = ['0%', '25%', '50%', '75%', '100%'];
  liderProyecto: string[] = ['Juan', 'Pablo'];
  liderTecnico: string[] = ['Juan', 'Pablo'];

  project: asignacion = {};

  clickEventSubscription: Subscription;


  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');

  fileName: string = 'Reporte Asignacion ' + this.date + '.xlsx';

  users: user[] = [];

  constructor(private asignacionService: AsignacionService, private userService: UserService) {
    this.clickEventSubscription = this.asignacionService.getClickEvent()
      .subscribe(() => setTimeout(() => this.load(), 500))
  }

  ngOnInit(): void {
    this.asignacionService.obtenerAsignacion()
      .subscribe({
        next: resp => {
          this.tableData = resp;
        }
      });
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
  }

  load() {
    this.asignacionService.obtenerAsignacion()
      .subscribe((result) => {
        this.tableData = result;
      });
  }

  deleteItem(index: string) {
    this.indexToDelete.emit(index);
  }

  editItem(asignacion: asignacion) {
    this.project = asignacion;
  }

  exportTable(): void {

    let element = document.getElementById('tableAsignacion');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Generar archivo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save
    XLSX.writeFile(wb, this.fileName);

  }

  cargarUsuarios() {
    this.asignacionService.obtenerUsuarios()
      .subscribe(
        {
          next: resp => this.users = resp,
          error: err => console.log('Error: ', err)
        }
      )
  }

}
