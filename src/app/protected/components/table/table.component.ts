import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivosService } from '../../services/activos.service';
import { Output, EventEmitter } from '@angular/core';
import { activo } from '../../interfaces/activo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivosService2 } from 'src/app/shared/services/activos.service';
import { Subscription } from 'rxjs';

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

  tableHeader: string[] = ['Acciones', 'ID', 'Tipo', 'Área', 'Edificio', 'Fecha de entrega', 'Estado'];

  areas: string[] = ['CTB', 'EnP', 'Librarian', 'Panamá', 'Seguridad', 'SES', 'Otras'];
  tipos: string[] = ['Computador'];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  currentAsset: activo = {};

  // clickEventSubscription: Subscription;

  constructor(private activosService: ActivosService, private userService: UserService, private fb: FormBuilder, private commonService: ActivosService2) {
    // this.clickEventSubscription = this.activosService.getClickEvent().subscribe((resp) => {
    //   setTimeout(() => {
    //     this.load();
    //   }, 1000);
    // })
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
    this.load();
  }

  load() {
    this.activosService.mostrarActivos(this.ultimatix).then((result) => {
      this.tableData = result;
    });
  }

  deleteItem(index: string) {
    this.indexToDelete.emit(index);
  }

}
