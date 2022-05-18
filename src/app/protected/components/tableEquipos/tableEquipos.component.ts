import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { equipo } from '../../interfaces/equipo';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { EquiposService } from '../../services/equipos.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-table-equipos',
  templateUrl: './tableEquipos.component.html',
  styleUrls: ['./tableEquipos.component.css']
})
export class TableEquiposComponent implements OnInit {

  @Output() indexToDelete = new EventEmitter<string>();

  currentUser: user = {}
  ultimatix: string | undefined = '';

  tableData: equipo[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'Nombre', 'Tipo', 'Descripción', 'Líder de equipo', 'Líder técnico', 'Estado'];
  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  aux = ["Proyecto", "Célula", "Tribu"]
  equipo: equipo = {}

  equipos!: equipo[];


  nuevoEquipoForm: FormGroup = this.fb.group({
    nombre_equipo_asi: ['Team 1', Validators.required],
    tipo_equipo_asi: [2, Validators.required],
    descripcion_asi: ['descripcion del equipo 1', Validators.required],
    nombre_lider: ['Juan', Validators.required],
    nombre_tecnico: ['Marcelo', Validators.required],
  });

  pipe = new DatePipe('en-US');
  date = this.pipe.transform(Date.now(), 'dd-MM-yyyy');
  fileName: string = 'Reporte Equipos ' + this.date + '.xlsx';

  clickEventSubscription: Subscription;

  constructor(private equiposService: EquiposService, private fb: FormBuilder) {
    this.clickEventSubscription = this.equiposService.getClickEvent()
      .subscribe(() => setTimeout(() => this.loadTeams(), 500))
  }

  ngOnInit(): void {
    this.loadTeams()
  }

  loadTeams() {
    this.equiposService.mostrarEquipos()
      .subscribe(
        {
          next: resp => this.equipos = resp
        }
      )
  }

  deleteItem(index: string) {
    console.log(index)
    this.indexToDelete.emit(index);
  }

  editItem(equipo: equipo) {
    this.equipo = equipo;
  }

  clickMe() {
    this.equiposService.sendClickEvent();
  }

  guardarEquipo() {
    this.equiposService.agregarEquipo(this.nuevoEquipoForm.value)
      .subscribe(
        {
          next: () => {
            this.clickMe();
            Swal.fire('Éxito', 'Equipo registrado con éxito.', 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error');
          }
        }
      );
  }

  exportTable(): void {

    let element = document.getElementById('tableEquipos');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // Generar archivo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save
    XLSX.writeFile(wb, this.fileName);

  }
  

}
