import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { activo } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  @Input() buttonName = '';
  @Input() iconName = '';

  areas: string[] = ['CTB', 'EnP', 'Librarian', 'Panamá', 'Seguridad', 'SES', 'Otras'];
  tipos: string[] = ['Computador', 'Monitor', 'Teclado', 'Mouse'];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  nuevoActivoForm: FormGroup = this.fb.group({
    area: ['', Validators.required],
    tipo: ['', Validators.required],
    edificio: ['', Validators.required],
    piso: ['', Validators.required],
    usuario_red: ['', Validators.required],
    hostname: ['', Validators.required],
    direccion_mac: ['', [Validators.required]],
    direccion_ip: ['', Validators.required],
    reservada_ip: ['', Validators.required]
  })

  activos: activo = {};

  constructor(private fb: FormBuilder, private activosService: ActivosService, private userService: UserService) { }

  ngOnInit(): void {
  }

  guardarActivos() {
    if (this.nuevoActivoForm.invalid) {
      this.nuevoActivoForm.markAllAsTouched();
      return;
    } else {
      this.activos = this.nuevoActivoForm.value;
      const userC: user  = this.userService.getUserData(); 
      this.activos.id_ultimatix = userC.id_numero_Ultimatix;
      this.activosService.register(this.activos).subscribe({
        next: () => {
          // TODO: 
          Swal.fire('Éxito', 'Activo registrado con éxito.', 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.mensaje, 'error');
        }
      });
    }
  }

}

