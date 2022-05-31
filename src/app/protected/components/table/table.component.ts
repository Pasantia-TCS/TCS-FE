import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Asset } from '../../interfaces/activo';

@Component({
  selector: 'p-table',
  templateUrl: './table.component.html'
})
export class TableBasic {

  @Output() indexToDelete = new EventEmitter<string>();
  @Output() deliverEvent = new EventEmitter<string>();
  @Input() tableHeader: string[] = [];
  @Input() tableData: Asset[] = [];
  @Input() rol!: string;

  deleteItem(index: string) {
    this.indexToDelete.emit(index);
  }

  deliverItem(index: string) {
    this.deliverEvent.emit(index);
  }

}

