import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { asignacion } from '../../interfaces/asignacion';
import { AsignacionService } from '../../services/asignacion.service';
import { TableAsignacion } from '../tableAsignacion/tableAsignacion.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  titles: string[] = ['Acciones', 'Equipo', 'Tipo', 'Asignación (%)', 'Fecha de inicio', 'Fecha de finalización', 'Estado'];
  dataBody: string = 'Hola que hace!';

  proyectos!: asignacion[];
  currentProject!: asignacion;

  @ViewChild(TableAsignacion) table: any;

  constructor(private asignacionService: AsignacionService) { }

  ngOnInit(): void {
  }

  deleteItem(id_proyecto: string): void {

    Swal.fire({
      title: '¿Quieres eliminar el proyecto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignacionService.delete(id_proyecto).subscribe({
          next: () => {
            this.table.load();
            Swal.fire('Éxito', 'Proyecto eliminado con éxito.', 'success')
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error')
          }
        });
      } else if (result.isDenied) {
        Swal.fire('El proyecto no se ha eliminado.', '', 'info')
      }
    })
  }

  clickHandler() {
    
  }

}
