import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivosService } from '../../services/activos.service';
import { Output, EventEmitter } from '@angular/core';
import { activo } from '../../interfaces/activo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'p-table',
  templateUrl: './table.component.html'
})
export class TableBasic implements OnInit {

  @Output() indexToDelete = new EventEmitter<string>();
  @Output() indexToDeliver = new EventEmitter<string>();

  currentUser: user = {}
  ultimatix: string | undefined = '';

  tableData: activo[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'Área', 'Edificio', 'Activo', 'Fecha de adjudicación', 'Fecha de devolución', 'Estado'];

  areas: string[] = ['CTB', 'EnP', 'Librarian', 'Panamá', 'Seguridad', 'SES', 'Otras'];
  tipos: string[] = ['Computador'];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  asset: activo = {};

  clickEventSubscription: Subscription;

  deliverForm: FormGroup = this.fb.group({
    fecha_devolucion: ['', Validators.required]
  });

  constructor(private activosService: ActivosService, private userService: UserService, private fb: FormBuilder) {
    this.clickEventSubscription = this.activosService.getClickEvent()
      .subscribe(() => setTimeout(() => this.load(), 500))
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

  currentAsset(activo: activo) {
    this.asset = activo;
  }

  deliverAsset() {
    if (this.deliverForm.invalid) {
      this.deliverForm.markAllAsTouched()
      return;
    } else {
      const { fecha_devolucion } = this.deliverForm.value;
      this.activosService.setAssetStatus(this.asset.id_activo?.toString()!, this.currentUser.id_numero_Ultimatix?.toString()!, fecha_devolucion)
        .subscribe({
          next: resp => {
            this.tableData = resp;
            Swal.fire('¡Éxito!', 'Se ha registrado con éxito la devolución del activo.', 'success');
          },
          error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
        });
    }
  }

}

