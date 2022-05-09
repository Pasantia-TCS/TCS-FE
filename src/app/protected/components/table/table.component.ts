import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivosService } from '../../services/activos.service';
import { Output, EventEmitter } from '@angular/core';
import { activo } from '../../interfaces/activo';

@Component({
  selector: 'p-table',
  templateUrl: './table.component.html'
})
export class TableBasic implements OnInit {

  @Output() indexToDelete = new EventEmitter<string>();

  currentUser: user = {}
  ultimatix: string | undefined = '';

  tableData: activo[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'ID', 'Área', 'Edificio', 'Piso', 'Tipo', 'Usuario de red', 'Hostname', 'Dirección MAC', 'Dirección IP', 'IP Reservada'];


  constructor(private activosService: ActivosService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
    this.load();
  }

  // load() {
  //   this.activosService.mostrarActivos(this.ultimatix).subscribe({
  //     next: resp => {
  //       this.tableData = resp;
  //     },
  //     error: err => {
  //       Swal.fire('Error', err.error.mensaje, 'error')
  //     }
  //   });
  // }

  load() {
    this.activosService.mostrarActivos(this.ultimatix).then((result) => {
      this.tableData = [];
      this.tableData = result;
      // this.getData();
    });
  }

  // getData() {
  //   this.tableData.forEach((element: any) => {
  //     this.tableKey = Object.keys(element);
  //     this.tableValue.push(Object.values(element));
  //   });
  // }

  deleteItem(index: string) {
    this.indexToDelete.emit(index);
  }

}
