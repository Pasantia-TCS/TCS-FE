import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user';
import { Team } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-table-equipos',
  templateUrl: './tableEquipos.component.html',
  styles: []
})
export class TableEquiposComponent implements OnInit {

  @Output() deleteEvent = new EventEmitter<string>();
  @Output() updateEvent = new EventEmitter<Team>();

  currentUser: User = {}
  ultimatix: string | undefined = '';

  tableData: Team[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'Nombre', 'Tipo', 'Descripción', 'Líder de equipo', 'Líder técnico', 'Estado'];
  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  equipo: Team = {}

  equipos!: Team[];

  id: string = '';
  _currentTeam: Team = {};

  clickEventSubscription: Subscription;

  constructor(private equiposService: EquiposService) {
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

  updateTeam(team: Team) {
    this.updateEvent.emit(team);
  }

  clickMe() {
    this.equiposService.sendClickEvent();
  }
}
