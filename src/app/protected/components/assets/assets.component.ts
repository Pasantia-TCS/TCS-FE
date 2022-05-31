import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Asset } from '../../interfaces/activo';
import { Profile } from '../../interfaces/profile';
import { ActivosService } from '../../services/activos.service';
import { GeneralService } from '../../services/general.service';
import { ProfileService } from '../../services/profile.service';
import { DeliverModalComponent } from '../deliver-modal/deliver-modal.component';
import { NewAssetComponent } from '../new-asset/new-asset.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styles: []
})
export class AssetsComponent implements OnInit {

  t1 = ['Acciones', 'Área', 'Edificio', 'Activo', 'Fecha de adjudicación', 'Fecha de devolución', 'Estado'];
  titles!: string[];
  assets!: Asset[];
  currentUser!: User;
  ultimatix!: string;
  profile!: Profile;

  constructor(
    private activosService: ActivosService,
    private userService: UserService,
    private profileService: ProfileService,
    public dialog: MatDialog,
    public generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.ultimatix = this.userService.getUltimatix()!;
    this.loadProfile();
  }

  loadAssets(rol: string) {
    if (rol === 'admin') {
      this.activosService.getAll()
        .subscribe({
          next: resp => this.assets = resp
        })
    } else {
      this.activosService.getAssets(this.ultimatix)
        .subscribe({
          next: resp => this.assets = resp
        })
    }
  }

  loadProfile() {
    this.profileService.getProfile(this.ultimatix)
    .subscribe({
      next: resp => {
        this.profile = resp;
        this.loadAssets(this.profile.rol!);
        if (this.profile.rol === 'admin') {
          this.t1.splice(1, 0, 'Ultimatix');
          this.t1.splice(0, 1);
        } 
        this.titles = this.t1;
      }
    });
  }

  openNewAsset(): void {
    this.dialog.open(NewAssetComponent, {
      data: this.assets,
      width: '600px',
    }).afterClosed()
      .subscribe({
        next: resp => { if (resp) { this.assets = resp } }
      });
  }

  deleteItem(id_activo: string): void {
    Swal.fire({
      title: '¿Quieres eliminar el activo?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.activosService.eliminar(id_activo, this.ultimatix)
          .subscribe({
            next: resp => {
              this.assets = resp;
              Swal.fire('Éxito', 'Activo eliminado con éxito.', 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

  openDeliverItem(idAsset: string) {
    this.dialog.open(DeliverModalComponent, {
      data: { idAsset, assets: this.assets }
    }).afterClosed()
      .subscribe({
        next: resp => { if (resp) { this.assets = resp; } }
      });
  }

  exportTable(): void {
    this.generalService.exportData('tableActivos', 'Reporte activos');
  }

}
