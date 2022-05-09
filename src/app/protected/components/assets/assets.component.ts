import { Component, OnInit } from '@angular/core';
import { pipe, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivosService } from '../../services/activos.service';
import { activo } from '../../interfaces/activo';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  activos: activo[] = [];
  currentUser: user = {};

  constructor(private rg: ActivosService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
    this.loadAssets(this.currentUser.id_numero_Ultimatix);
    // setTimeout(() => {
    //   console.log('Activos fuera:', this.activos);
    // }, 1000);
  }


  // registrar() {
  //   this.rg.register().subscribe({
  //     next: resp => {
  //       this.activos = resp;
  //       Swal.fire('Éxito', 'Activo registrado con éxito.', 'success')
  //     },
  //     error: err => {
  //       Swal.fire('Error', err.error.mensaje, 'error')
  //     }
  //   });
  // }

  loadUser(): void {
    this.currentUser = this.userService.getUserData();
  }

  loadAssets(ultimatix: string | undefined): void {
    this.rg.mostrarActivos(ultimatix).then(resp => {
      this.activos = resp;
    });
  }

  actualizar(): void {

    Swal.fire({
      title: '¿Quieres actualizar el activo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rg.actualizar().subscribe({
          next: resp => {
            this.activos = resp;
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

  deleteItem(id_activo: string): void {

    const ultimatix = this.currentUser.id_numero_Ultimatix!;

    console.log()

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

  // mostrar() {
  //   this.rg.mostrarActivos("0000000").subscribe({
  //     next: resp => {
  //       this.activos = resp;
  //     },
  //     error: err => {
  //       Swal.fire('Error', err.error.mensaje, 'error')
  //     }
  //   });
  // }



}
