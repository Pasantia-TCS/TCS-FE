import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interfaces/user';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  currentUser: User = {}
  ultimatix: string | undefined = '';

  users!: User[];
  tableHeader: string[] = ['Acciones', 'Ultimatix', 'Nombre', 'Rol'];
  

  pipe!: PipeTransform;
  filterForm: FormGroup = this.fb.group(
    {
      searchItem: ['', Validators.required],
    }
  );

  clickEventSubscription: Subscription;

  constructor( private settingsService: SettingsService, private fb: FormBuilder ) {
    this.clickEventSubscription = this.settingsService.getClickEvent()
      .subscribe(() => setTimeout(() => this.loadUsers(), 500));

  }

  ngOnInit(): void {
   this.loadUsers()
  }

  loadUsers(){
    this.settingsService.getUsers()
    .subscribe({ 
      next: resp => { this.users = resp }
    })

  }

  changeRole(){

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
