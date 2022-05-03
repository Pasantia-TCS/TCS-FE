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
      next: resp => Swal.fire('Éxito', 'Activo registrado', 'success'),
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    });
  }

  actualizar() {
    this.rg.actualizar().subscribe({
      next: resp => console.log(resp),
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    });
  }

  eliminar() {
    this.rg.eliminar().subscribe({
      next: resp => console.log(resp),
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    });
  }

  mostrar() {
    this.rg.mostrarActivos().subscribe({
      // next: resp => {
      //   this.activos = resp;
      // },
      next: resp => console.log(resp),
      error: err => {
        Swal.fire('Error', err.error.mensaje, 'error')
      }
    });
  }





}
