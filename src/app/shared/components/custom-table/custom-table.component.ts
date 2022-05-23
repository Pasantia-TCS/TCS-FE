import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent implements OnInit {

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
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
