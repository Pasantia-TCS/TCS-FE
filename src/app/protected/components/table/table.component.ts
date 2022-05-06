import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { activo } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'p-table',
  templateUrl: './table.component.html'
})
export class TableBasic implements OnInit {

  ultimatix: string = '0000000';

  tableData: any[] = [];
  tableKey: any = [];
  tableValue: any = [];


  constructor(private activosService: ActivosService) {
    this.load();
    this.getData();
  }

  ngOnInit(): void {


  }

  load() {
    // console.log("load");
    this.activosService.mostrarActivos(this.ultimatix).subscribe({
      next: resp => {
        this.tableData = resp;
        // console.log(this.tableData);
      },
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    });
  }

  getData() {
    console.log("getData");
    this.tableData.forEach((element: any) => {

      this.tableKey = Object.keys(element);
      this.tableValue.push(Object.values(element));
      //console.log(element)
    });
    //console.log(this.tableKey)
    //console.log(this.tableValue)
  }

}
