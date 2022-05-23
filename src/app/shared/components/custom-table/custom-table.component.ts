import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styles: []
})
export class CustomTableComponent {

  @Input() titles: string[] = []
  @Input() iconName: string = 'delete';
  @Input() data: any = [
    {
      name: 'Leones',
      type: 'Proyecto',
      percent: 0.25,
      startDate: '5/18/2022',
      endDate: '6/19/2022',
      status: true
    },
    {
      name: 'Lobos',
      type: 'Proyecto',
      percent: 0.25,
      startDate: '5/18/2022',
      endDate: '6/19/2022',
      status: true
    }
  ];

}
