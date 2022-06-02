import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Profile } from '../../interfaces/profile';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'id_ultimatix', 'nombres_completos', 'rol'];
  dataSource!: MatTableDataSource<Profile>;

  filterForm: FormGroup = this.fb.group({
    searchItem: ['', Validators.required],
  });

  constructor(private settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.settingsService.getUsers()
      .subscribe({
        next: resp => this.dataSource = new MatTableDataSource(resp)
      })
  }

  update(id_ultimatix: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas cambiar el rol de este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.changeRole(id_ultimatix)
          .subscribe({
            next: resp => {
              this.loadUsers();
              Swal.fire('¡El rol de este usuario ha cambiado!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

}
