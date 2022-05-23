import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');

  fileName: string = 'Reporte Activos ' + this.date + '.xlsx';

  constructor() { }

  exportData(id: string, filename: string, name: string = 'Sheet1'): void {
    let element = document.getElementById(id);
    const fileName: string = `${filename} ${this.date}.xlsx`;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, name);
    XLSX.writeFile(wb, fileName);
  }
}