import { Component, OnInit } from '@angular/core';
import { menuList } from './menu.list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sideMenu = menuList;
  collapse = true;
  
  toggleSidebar() {
    this.collapse = !this.collapse;
  }

}
