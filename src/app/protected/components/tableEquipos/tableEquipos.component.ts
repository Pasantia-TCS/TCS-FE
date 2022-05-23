import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { user } from 'src/app/interfaces/user';
import * as XLSX from 'xlsx';
import { equipo } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-table-equipos',
  templateUrl: './tableEquipos.component.html',
  styleUrls: ['./tableEquipos.component.css']
})
export class TableEquiposComponent implements OnInit {

  @Output() deleteEvent = new EventEmitter<string>();
  @Output() updateEvent = new EventEmitter<equipo>();

  currentUser: user = {}
  ultimatix: string | undefined = '';

  tableData: equipo[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'Nombre', 'Tipo', 'Descripción', 'Líder de equipo', 'Líder técnico', 'Estado'];
  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  equipo: equipo = {}

  equipos!: equipo[];

  id: string = '';
  _currentTeam: equipo = {};

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
    this.equiposService.show()
      .subscribe(
        {
          next: resp => this.equipos = resp
        }
      )
  }

  deleteTeam(id_asset: string) {
    this.deleteEvent.emit(id_asset);
  }

  updateTeam(team: equipo) {
    this.updateEvent.emit(team);
  }

  clickMe() {
    this.equiposService.sendClickEvent();
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
