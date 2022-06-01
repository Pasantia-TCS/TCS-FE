import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent implements OnChanges {

  displayedColumns: any;
  @Input() columns: any = [];
  @Input() dataSource: any;

  ngOnChanges(): void {
    this.displayedColumns = this.columns.map((c: any) => c.columnDef);
  }

}
