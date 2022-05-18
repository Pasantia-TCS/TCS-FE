import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { equipo } from '../../interfaces/equipo';
import { EquiposService } from '../../services/equipos.service';
import Swal from 'sweetalert2';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  aux = ["Proyecto", "Célula", "Tribu"]

  nuevoEquipoForm: FormGroup = this.fb.group({
    nombre_equipo_asi: ['Team 1', Validators.required],
    tipo_equipo_asi: [2, Validators.required],
    descripcion_asi: ['descripcion del equipo 1', Validators.required],
    nombre_lider: ['Juan', Validators.required],
    nombre_tecnico: ['Marcelo', Validators.required],
  });

  

  constructor(private equiposService: EquiposService, private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  clickMe() {
    this.equiposService.sendClickEvent();
  }

  guardarEquipo() {
    this.equiposService.agregarEquipo(this.nuevoEquipoForm.value)
      .subscribe(
        {
          next: () => {
            this.clickMe();
            Swal.fire('Éxito', 'Equipo registrado con éxito.', 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error');
          }
        }
      );
  }

}
