import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../interfaces/equipo';

@Component({
  selector: 'app-table-equipos',
  templateUrl: './tableEquipos.component.html',
  styles: []
})
export class TableEquiposComponent {

  @Output() changeStatusEvent = new EventEmitter<string>();
  @Output() updateEvent = new EventEmitter<Team>();
  @Input() tableHeader!: string[];
  @Input() tableBody!: Team[];

  changeStatus(id: string) {
    this.changeStatusEvent.emit(id);
  }

  updateTeam(team: Team) {
    this.updateEvent.emit(team);
  }

}
