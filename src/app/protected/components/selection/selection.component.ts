import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toAssets() {
    // TODO: validate user type
    this.router.navigateByUrl('/pages/dashboard/assets');
  }

  toTasks() {
    // TODO: validate user type
    this.router.navigateByUrl('/pages/dashboard/tasks');
  }

  toForms() {
    // TODO: validate user type
    this.router.navigateByUrl('/pages/dashboard/forms');
  }

}
