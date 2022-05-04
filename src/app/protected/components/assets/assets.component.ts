import { Component, OnInit } from '@angular/core';
import { pipe, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivosService } from '../../services/activos.service';
import { activo } from '../../interfaces/activo';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  constructor(private rg: ActivosService) { }

  ngOnInit(): void {
  }

  activos: activo[] = [];

  registrar() {
    this.rg.register().subscribe({
      next: resp => {
        this.activos = resp;
        Swal.fire('Éxito', 'Activo registrado con éxito.', 'success')
      },
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    });
  }

  actualizar() {

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

  eliminar() {
    Swal.fire({
      title: '¿Quieres eliminar el activo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rg.eliminar().subscribe({
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

  mostrar() {
    this.rg.mostrarActivos().subscribe({
      next: resp => {
        this.activos = resp;
      },
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    });
  }

}
