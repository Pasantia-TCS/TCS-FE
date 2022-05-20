import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../../services/equipos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  tipos: string[] = ['Proyecto', 'Célula', 'Tribu'];
  aux = ["Proyecto", "Célula", "Tribu"]

  nuevoEquipoForm: FormGroup = this.fb.group({
    nombre_equipo_asi: ['', [Validators.required, Validators.maxLength(50)]],
    tipo_equipo_asi: ['', Validators.required],
    descripcion_asi: ['', [Validators.required, Validators.maxLength(200)]],
    nombre_lider: ['', [Validators.required, Validators.maxLength(50)]],
    nombre_tecnico: ['', [Validators.required, Validators.maxLength(50)]],
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
            this.nuevoEquipoForm.reset({
              tipo_equipo_asi: ''
            });
            Swal.fire('Éxito', 'Equipo registrado con éxito.', 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error');
          }
        }
      );
  }

}
