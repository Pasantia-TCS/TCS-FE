import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/protected/interfaces/asignacion';
import { AsignacionService } from 'src/app/protected/services/asignacion.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styles: []
})
export class CustomTableComponent implements OnInit {

  @Output() deleteEvent = new EventEmitter<Assignment>();
  @Output() updateEvent = new EventEmitter<Assignment>();

  @Input() titles: string[] = []
  @Input() iconNames: string[] = ['edit', 'delete'];
  @Input() data!: Assignment[];

  clickEventSubscription: Subscription;
  ultimatix!: string;


  constructor(
    private asignacionService: AsignacionService,
    private userService: UserService
  ) {
    this.clickEventSubscription = this.asignacionService.getClickEvent()
      .subscribe(() => setTimeout(() => this.loadAssignments(), 500));
  }

  ngOnInit(): void {
    this.ultimatix = this.userService.getUltimatix()!;
    this.loadAssignments()
  }

  loadAssignments() {
    this.asignacionService.obtenerAsignaciones(this.ultimatix)
      .subscribe({
        next: resp => this.data = resp
      });
  }

  delete(item: Assignment) {
    this.deleteEvent.emit(item);
  }

  update(item: Assignment) {
    this.updateEvent.emit(item);
  }

  clickMe() {
    this.asignacionService.sendClickEvent();
  }

}
