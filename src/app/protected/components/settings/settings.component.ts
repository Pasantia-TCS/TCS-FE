import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Profile, Skills } from '../../interfaces/profile';
import { SettingsService } from '../../services/settings.service';
import { ProfileService } from '../../services/profile.service';
import { AssetType } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';
import { Building } from '../../interfaces/edificio';
import { MatDialog } from '@angular/material/dialog';
import { AddCatalogComponent } from '../add-catalog/add-catalog.component';
import { AddCatalogBuildingComponent } from '../add-catalog-building/add-catalog-building.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'id_ultimatix', 'nombres_completos', 'rol', 'estado'];
  dataSource!: MatTableDataSource<Profile>;

  //Catalogos
  displayedCatalogColumns: string[] = ['actions', 'nombre'];
  skillsData!: MatTableDataSource<Skills>;
  skillsFunc!: MatTableDataSource<Skills>;
  skillsApp!: MatTableDataSource<Skills>;

  assetsData!: MatTableDataSource<AssetType>;

  areaData!: MatTableDataSource<AssetType>;

  displayedBuildingColumns: string[] = ['actions', 'nombre', 'piso'];
  buildingData!: MatTableDataSource<Building>;


  filterForm: FormGroup = this.fb.group({
    searchItem: ['', Validators.required],
  });

  constructor(
    private settingsService: SettingsService,
    private profileService: ProfileService,
    private activosService: ActivosService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadSkills();
    this.loadSkillsFunctional();
    this.loadApplication();
    this.loadAssets();
    this.loadAreas();
    this.loadBuildings();
  }

  loadUsers() {
    this.settingsService.getUsers()
      .subscribe({
        next: resp => this.dataSource = new MatTableDataSource(resp)
      })
  }

  // Load skills list
  loadSkills(){
    this.profileService.getSkills()
      .subscribe({
        next: resp => {
          this.skillsData = new MatTableDataSource(resp)
        }
      });
  }

  // Load skills list
  loadSkillsFunctional(){
    this.profileService.getFuncSkills()
      .subscribe({
        next: resp => {
          this.skillsFunc = new MatTableDataSource(resp)
        }
      });
  }

  // Load skills list
  loadApplication(){
    this.profileService.getApps()
      .subscribe({
        next: resp => {
          this.skillsApp = new MatTableDataSource(resp)
        }
      });
  }

  // Load assets list
  loadAssets(){
    this.activosService.getTypes()
      .subscribe({
        next: resp => {
          this.assetsData = new MatTableDataSource(resp)
        }
      });
  }

  // Load areas list
  loadAreas(){
    this.activosService.getAreas()
      .subscribe({
        next: resp => {
          this.areaData = new MatTableDataSource(resp)
        }
      });
  }

  // Load buildings list
  loadBuildings(){
    this.activosService.getBuildings()
      .subscribe({
        next: resp => {
          this.buildingData = new MatTableDataSource(resp)
        }
      });
  }

  changeRole(id_ultimatix: number) {
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

  unlock(id_ultimatix: number) {
    Swal.fire({
      title: '¿Estás seguro que deseas desbloquear/bloquear este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.unlock(id_ultimatix)
          .subscribe({
            next: resp => {
              this.loadUsers();
              Swal.fire('¡Este usuario ha sido desbloqueado!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

  token(id_ultimatix: number) {
   
    this.settingsService.token(id_ultimatix)
      .subscribe({
        next: resp => {
          this.loadUsers();         
          Swal.fire('¡Envie este token al usuario!', resp.token, 'warning');
        },
        error: (err: { error: { mensaje: string | undefined; }; }) => Swal.fire('Error', err.error.mensaje, 'error')
      });
      
    
  }

  openAddSkill(){
    this.dialog.open(AddCatalogComponent, { data: { item: 'habilidad' } } )
      .afterClosed()
      .subscribe({
        next: resp => this.loadSkills()
      });
  }

  openAddSFunctionalSkill(){
    this.dialog.open(AddCatalogComponent, { data: { item: 'funcional' } } )
      .afterClosed()
      .subscribe({
        next: resp => this.loadSkillsFunctional()
      });
  }

  openAddApplications(){
    this.dialog.open(AddCatalogComponent, { data: { item: 'aplicacion' } } )
      .afterClosed()
      .subscribe({
        next: resp => this.loadApplication()
      });
  }

  openAddAssetType(){
    this.dialog.open(AddCatalogComponent, { data: { item: 'activo' } } )
      .afterClosed()
      .subscribe({
        next: resp => this.loadAssets()
      });
  }

  openAddArea(){
    this.dialog.open(AddCatalogComponent, { data: { item: 'área' } } )
      .afterClosed()
      .subscribe({
        next: resp => this.loadAreas()
      });
  }

  openAddBuilding(){
    this.dialog.open(AddCatalogBuildingComponent)
      .afterClosed()
      .subscribe({
        next: resp => this.loadBuildings()
      });
  }

  deleteSkill(id: string){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta habilidad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteSkill(id)
          .subscribe({
            next: resp => {
              this.loadSkills();
              Swal.fire('¡Esta habilidad ha sido eliminada!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

  deleteSkillFunc(id: string){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta habilidad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteSkillFunc(id)
          .subscribe({
            next: resp => {
              this.loadSkillsFunctional();
              Swal.fire('¡Esta habilidad ha sido eliminada!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

  deleteSkillApp(id: string){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta habilidad?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteSkillApp(id)
          .subscribe({
            next: resp => {
              this.loadApplication();
              Swal.fire('¡Esta habilidad ha sido eliminada!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

  deleteAsset(id: string){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este tipo de activo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteAssetType(id)
          .subscribe({
            next: resp => {
              this.loadAssets();
              Swal.fire('¡Esta tipo de activo ha sido eliminada!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

  deleteArea(id: string){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar esta área?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteArea(id)
          .subscribe({
            next: resp => {
              this.loadAreas();
              Swal.fire('¡Esta área ha sido eliminada!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

  deleteBuilding(id: string){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este edificio?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settingsService.deleteBuilding(id)
          .subscribe({
            next: resp => {
              this.loadBuildings();
              Swal.fire('¡Este edificio ha sido eliminada!', resp.mensaje, 'success');
            },
            error: err => Swal.fire('Error', err.error.mensaje, 'error')
          });
      }
    });
  }

}
