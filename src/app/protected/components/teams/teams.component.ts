import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');

  fileName: string = 'Reporte Equipos ' + this.date + '.xlsx';


  constructor() { }

  ngOnInit(): void {
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
