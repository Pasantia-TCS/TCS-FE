import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { pipe, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivosService } from '../../services/activos.service';
import { activo } from '../../interfaces/activo';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableBasic } from '../table/table.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit, AfterViewInit {

  activos: activo[] = [];
  currentUser: user = {};
  activoActual: activo = {};

  modalName = "exampleModal";

  @ViewChild(TableBasic) table: any;

  areas: string[] = ['CTB', 'EnP', 'Librarian', 'Panamá', 'Seguridad', 'SES', 'Otras'];
  tipos: string[] = ['Computador'];
  pisos: string[] = ['Piso 1', 'Piso 2', 'Piso 3', 'Piso 4', 'Piso 5', 'Piso 6'];
  edificios: string[] = ['Centrum', 'Inluxor'];

  nuevoActivoForm: FormGroup = this.fb.group({
    area: ['', Validators.required],
    tipo: ['', Validators.required],
    edificio: ['', Validators.required],
    piso: ['', Validators.required],
    hostname: ['', Validators.required],
    direccion_mac: ['', [Validators.required, Validators.pattern('^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$')]],
    direccion_ip: ['', [Validators.required, Validators.pattern("^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\\d)|1?\\d?\\d)){4}$")]],
    reservada_ip: ['', Validators.required],
    date: ['', Validators.required]
  })

  activo: activo = {};

  constructor(private activosService: ActivosService, private userService: UserService, private fb: FormBuilder) { }

  ngAfterViewInit(): void {
    this.table.load();
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadAssets(this.currentUser.id_numero_Ultimatix);
  }

  loadUser(): void {
    this.currentUser = this.userService.getUserData();
  }

  loadAssets(ultimatix: string | undefined): void {
    this.activosService.mostrarActivos(ultimatix).then(resp => {
      this.activos = resp;
    });
  }

  deleteItem(id_activo: string): void {

    const ultimatix = this.currentUser.id_numero_Ultimatix!;

    Swal.fire({
      title: '¿Quieres eliminar el activo?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.activosService.eliminar(id_activo, ultimatix).subscribe({
          next: resp => {
            this.activos = resp;
            this.table.load();
            Swal.fire('Éxito', 'Activo eliminado con éxito.', 'success')
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error')
          }
        });
      } else if (result.isDenied) {
        Swal.fire('El activo no se ha eliminado.', '', 'info')
      }
    })
  }

    /* */
    clickMe() {
      this.activosService.sendClickEvent();
    }
    /* */
  
    guardarActivos() {
      if (this.nuevoActivoForm.invalid) {
        this.nuevoActivoForm.markAllAsTouched();
        return;
      } else {
        this.activo = this.nuevoActivoForm.value;
        const userC: user = this.userService.getUserData();
        this.activo.id_ultimatix = userC.id_numero_Ultimatix;
        this.activosService.register(this.activo).subscribe({
          next: () => {
            // TODO: 
            this.clickMe();
            this.nuevoActivoForm.reset();
            this.nuevoActivoForm.patchValue({
              area: "CTB",
              tipo: "Computador",
              edificio: "Centrum",
              piso: "Piso 1",
              reservada_ip: "No"
            });
            Swal.fire('Éxito', 'Activo registrado con éxito.', 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.mensaje, 'error');
          }
        });
      }
    }
}
