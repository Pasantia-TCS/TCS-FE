import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from 'src/app/protected/interfaces/asignacion';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styles: []
})
export class CustomTableComponent {

  @Output() deleteEvent = new EventEmitter<Assignment>();
  @Output() updateEvent = new EventEmitter<Assignment>();
  @Input() titles!: string[];
  @Input() iconNames!: string[];
  @Input() dataBody!: Assignment[];

  delete(item: Assignment) {
    this.deleteEvent.emit(item);
  }

  update(item: Assignment) {
    this.updateEvent.emit(item);
  }

}
