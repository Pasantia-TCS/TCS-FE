import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { equipo } from '../../interfaces/equipo';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-table-equipos',
  templateUrl: './tableEquipos.component.html',
  styleUrls: ['./tableEquipos.component.css']
})
export class TableEquiposComponent implements OnInit {

  @Output() indexToDelete = new EventEmitter<string>();

  currentUser: user = {}
  ultimatix: string | undefined = '';

  tableData: equipo[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'Nombre', 'Tipo', 'Descripción', 'Líder de equipo', 'Líder técnico', 'Estado'];
  tipos: string[] = ['Proyecto', 'Célula, Tribu'];
  equipo: equipo = {}

  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');
  fileName: string = 'Reporte Equipos ' + this.date + '.xlsx';

  constructor(private userService: UserService ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
  
  }

  deleteItem(index: string) {
    this.indexToDelete.emit(index);
  }

  editItem(equipo: equipo) {
    this.equipo = equipo;
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
