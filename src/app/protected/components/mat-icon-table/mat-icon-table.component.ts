import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-mat-icon-table',
  templateUrl: './mat-icon-table.component.html',
  styleUrls: ['./mat-icon-table.component.css']
})
export class MatIconTableComponent implements OnChanges {

  displayedColumns: any;
  @Input() columns: any = [];
  @Input() dataSource: any;
  @Output() clickEvent = new EventEmitter<string>();

  ngOnChanges(): void {
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
  }

  open(id: string) {
    this.clickEvent.emit(id);
  }

}
