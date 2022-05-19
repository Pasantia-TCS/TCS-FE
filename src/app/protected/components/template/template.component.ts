import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  multipleAnswers = false;
  requiredQuestion = false;
  textArea = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toForms() {
    this.router.navigateByUrl('/pages/dashboard/forms');
  }

}
