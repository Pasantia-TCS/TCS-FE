import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { AsignacionService } from '../../services/asignacion.service';
import { Output, EventEmitter } from '@angular/core';
import { asignacion } from '../../interfaces/asignacion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

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

  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');

  fileName: string = 'Reporte Asignacion ' + this.date + '.xlsx';

  constructor(private userService: UserService) {
  
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
  }

  exportTable(): void{

    let element = document.getElementById('tableAsignacion');
    
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    // Generar archivo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    // Save
    XLSX.writeFile(wb, this.fileName);  
  
  }



}
