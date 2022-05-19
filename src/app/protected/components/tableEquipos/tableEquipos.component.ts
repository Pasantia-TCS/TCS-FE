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

  id: string = '';
  _currentTeam: equipo = {};

  nuevoEquipoForm: FormGroup = this.fb.group({
    nombre_equipo_asi: [{ value: '', disabled: true }, Validators.required],
    tipo_equipo_asi: [{ value: '', disabled: true }, Validators.required],
    descripcion_asi: [{ value: '', disabled: true }, Validators.required],
    nombre_lider: ['', Validators.required],
    nombre_tecnico: ['', Validators.required],
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

  clickMe() {
    this.equiposService.sendClickEvent();
  }

  currentTeam(team: equipo) {
    this._currentTeam = team;

    this.nuevoEquipoForm.patchValue({
      nombre_equipo_asi: this._currentTeam.nombre_equipo_asi,
      tipo_equipo_asi: this._currentTeam.tipo_equipo_asi,
      descripcion_asi: this._currentTeam.descripcion_asi,
      nombre_lider: this._currentTeam.nombre_lider,
      nombre_tecnico: this._currentTeam.nombre_tecnico,
    });
  }

  editarEquipo() {

    if (this._currentTeam.estado_asi === false) {
      Swal.fire('Advertencia!', 'No se puede editar un proyecto no vigente.', 'info');
    } else {
      const { nombre_lider, nombre_tecnico } = this.nuevoEquipoForm.value;

      this.equiposService.editar(this._currentTeam.id_asi!, nombre_lider, nombre_tecnico)
        .subscribe(
          {
            next: () => {
              this.clickMe();
              Swal.fire('Éxito', 'Equipo editado con éxito.', 'success');
            },
            error: err => {
              Swal.fire('Error', err.error.mensaje, 'error');
            }
          }
        );
    }
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
