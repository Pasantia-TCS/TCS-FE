import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styles: []
})
export class FormsComponent {

  constructor(private router: Router) { }

  toNewTemplate() {
    this.router.navigateByUrl('/pages/dashboard/new-template');
  }

}
