import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() type: string = 'text';
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() formName!: string;
  @Input() form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
