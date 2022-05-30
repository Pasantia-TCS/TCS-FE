import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Asset } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'p-table',
  templateUrl: './table.component.html'
})
export class TableBasic implements OnInit {

  @Output() indexToDelete = new EventEmitter<string>();
  @Output() deliverEvent = new EventEmitter<string>();

  // currentUser!: User;
  // ultimatix!: string;

  @Input() tableHeader: string[] = [];
  @Input() tableData: Asset[] = [];

  // clickEventSubscription: Subscription;

  constructor(
    // private activosService: ActivosService,
    // private userService: UserService,
  ) {
    // this.clickEventSubscription = this.activosService
    //   .getClickEvent()
    //   .subscribe(() => setTimeout(() => this.load(), 500));
  }

  ngOnInit(): void {
    // this.currentUser = this.userService.getUserData();
    // this.ultimatix = this.currentUser.id_numero_Ultimatix!;
    // this.load();
  }

  // load() {
  //   this.activosService.mostrarActivos(this.ultimatix)
  //     .then(result => {
  //       this.tableData = result;
  //     });
  // }

  deleteItem(index: string) {
    this.indexToDelete.emit(index);
  }

  deliverItem(index: string) {
    this.deliverEvent.emit(index);
  }

}

