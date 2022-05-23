import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Asset } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';
import { GeneralService } from '../../services/general.service';
import { DeliverModalComponent } from '../deliver-modal/deliver-modal.component';
import { NewAssetComponent } from '../new-asset/new-asset.component';
import { TableBasic } from '../table/table.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styles: []
})
export class AssetsComponent implements OnInit, AfterViewInit {

  activos: Asset[] = [];
  currentUser: User = {};
  activoActual: Asset = {};

  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');

  fileName: string = 'Reporte Activos ' + this.date + '.xlsx';

  @ViewChild(TableBasic) table: any;

  constructor(
    private activosService: ActivosService,
    private userService: UserService,
    public dialog: MatDialog,
    public generalService: GeneralService
  ) { }

  ngAfterViewInit(): void {
    this.table.load();
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadAssets(this.currentUser.id_numero_Ultimatix);
  }

  loadUser(): void {
    this.currentUser = this.userService.getUserData();
  }

  loadAssets(ultimatix: string | undefined): void {
    this.activosService.mostrarActivos(ultimatix).then(resp => {
      this.activos = resp;
    });
  }

  openNewAsset(): void {
    this.dialog.open(NewAssetComponent);
  }

  deleteItem(id_activo: string): void {

    const ultimatix = this.currentUser.id_numero_Ultimatix!;

    Swal.fire({
      title: '¿Quieres eliminar el activo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activosService.eliminar(id_activo, ultimatix).subscribe({
          next: resp => {
            this.activos = resp;
            this.table.load();
            Swal.fire('Éxito', 'Activo eliminado con éxito.', 'success')
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error')
          }
        });
      } else if (result.isDenied) {
        Swal.fire('El activo no se ha eliminado.', '', 'info')
      }
    })
  }

  openDeliverItem(asset: Asset) {
    this.dialog.open(DeliverModalComponent, { data: { asset } });
  }

  exportTable(): void {
    this.generalService.exportData('tableActivos', 'Reporte activos');
  }

}
