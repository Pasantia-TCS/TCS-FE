import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user';
import Swal from 'sweetalert2';
import { Profile } from '../../interfaces/profile';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  currentUser: User = {}
  ultimatix: string | undefined = '';

  users!: Profile[];
  tableHeader: string[] = ['Acciones', 'Ultimatix', 'Nombre', 'Rol'];


  pipe!: PipeTransform;
  filterForm: FormGroup = this.fb.group(
    {
      searchItem: ['', Validators.required],
    }
  );

  clickEventSubscription: Subscription;

  constructor(private settingsService: SettingsService, private fb: FormBuilder) {
    this.clickEventSubscription = this.settingsService.getClickEvent()
      .subscribe(() => setTimeout(() => this.loadUsers(), 500));

  }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers() {
    this.settingsService.getUsers()
      .subscribe({
        next: resp => {
          this.users = resp
        }
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
          .subscribe(
            {
              next: resp => {
                this.loadUsers();
                Swal.fire('El rol de este usuario ha cambiado!', resp.mensaje, 'success');
              },
              error: err => Swal.fire('Error', err.error.mensaje, 'error')
            }
          );
      }
    });


  }

  /*
  search(): User[] {
    
    const { searchItem } = this.filterForm.value;
    console.log(searchItem);
  
    return this.users.filter(user => {
      return this.pipe.transform(user.nombre).includes(searchItem.toLowerCase())
          || this.pipe.transform(user.apellido).includes(searchItem.toLowerCase())
          || this.pipe.transform(user.rol).includes(searchItem.toLowerCase());
    });
  }
  */

}
