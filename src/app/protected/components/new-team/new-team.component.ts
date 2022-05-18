import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  tipos: string[] = ['Proyecto', 'Célula, Tribu'];
  aux = ["Proyecto", "Célula", "Tribu"]


  nuevoEquipoForm: FormGroup = this.fb.group({
    nombre_equipo: ['Team 1', Validators.required],
    tipo: [2, Validators.required],
    descripcion: ['descripcion del equipo 1', Validators.required],
    lider_equipo: ['Juan', Validators.required],
    lider_tecnico: ['Marcelo', Validators.required],
  }); 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  guardarEquipo(){
    console.log('Save Team');
    
  }

}
