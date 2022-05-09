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

  tableHeader: string[] = ['Acciones', 'ID', 'Área', 'Edificio', 'Piso', 'Tipo', 'Usuario de red', 'Hostname', 'Dirección MAC', 'Dirección IP', 'IP Reservada'];

  areas: string[] = ['CTB', 'EnP', 'Librarian', 'Panamá', 'Seguridad', 'SES', 'Otras'];
  tipos: string[] = ['Computador'];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  currentAsset: activo = {};

  actualizarActivoForm: FormGroup = this.fb.group({
    area: [''],
    tipo: [''],
    edificio: [''],
    piso: [''],
    usuario_red: [''],
    hostname: [''],
    direccion_mac: [''],
    direccion_ip: [''],
    reservada_ip: [''],
    id_activo: ['']
  });

  clickEventSubscription: Subscription;

  constructor(private activosService: ActivosService, private userService: UserService, private fb: FormBuilder, private commonService: ActivosService2) {
    this.clickEventSubscription = this.activosService.getClickEvent().subscribe((resp) => {
      setTimeout(() => {
        this.load();
      }, 1000);
    })
  }

  /** */
  
  /** */

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

  updateItem(): void {

    this.currentAsset = { ...this.actualizarActivoForm.value };
    this.currentAsset.id_ultimatix = this.ultimatix;
    
    this.load();

    Swal.fire({
      title: '¿Quieres actualizar el activo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activosService.actualizar(this.currentAsset).subscribe({
          next: () => {
            this.load()
            Swal.fire('Éxito', 'Activo actualizado con éxito.', 'success')
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error')
          }
        });
      } else if (result.isDenied) {
        Swal.fire('El activo no se ha actualizado.', '', 'info')
      }
    })
  }

  activoActual(activo: activo) {
    this.currentAsset = activo;
    this.actualizarActivoForm.patchValue({
      area: activo.area,
      tipo: activo.tipo,
      edificio: activo.edificio,
      piso: activo.piso,
      usuario_red: activo.usuario_red,
      hostname: activo.hostname,
      direccion_mac: activo.direccion_mac,
      direccion_ip: activo.direccion_ip,
      reservada_ip: activo.reservada_ip,
      id_activo: activo.id_activo
    });
  }



}
