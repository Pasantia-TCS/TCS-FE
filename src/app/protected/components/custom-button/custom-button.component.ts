import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  @Input () buttonName = '';
  @Input () iconName = '';

  nuevoActivoForm: FormGroup = this.fb.group({
    area: ['', Validators.required],
    tipo: ['', Validators.required],
    edificio: ['', Validators.required],
    piso: ['', Validators.required],
    netuser: ['', Validators.required],
    hostname: ['', Validators.required],
    mac: ['', Validators.required],
    ip: ['', Validators.required],
    ipReservada: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  guardarActivos() {
    
  }

}

