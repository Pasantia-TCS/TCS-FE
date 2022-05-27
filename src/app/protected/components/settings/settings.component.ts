import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  currentUser: User = {}
  ultimatix: string | undefined = '';

  tableData: User[] = [];
  tableKey: any = [];
  tableValue: any = [];

  tableHeader: string[] = ['Acciones', 'Ultimatix', 'Nombre', 'Rol'];
  
  constructor() { }

  ngOnInit(): void {
  }


  changeRole(){

  }
  
}
