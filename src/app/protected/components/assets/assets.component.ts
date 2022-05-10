import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { pipe, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivosService } from '../../services/activos.service';
import { activo } from '../../interfaces/activo';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableBasic } from '../table/table.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit, AfterViewInit {

  activos: activo[] = [];
  currentUser: user = {};
  activoActual: activo = {};

  @ViewChild(TableBasic) table: any;

  constructor(private rg: ActivosService, private userService: UserService, private fb: FormBuilder) { }

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
    this.rg.mostrarActivos(ultimatix).then(resp => {
      this.activos = resp;
    });
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
        this.rg.eliminar(id_activo, ultimatix).subscribe({
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
}
