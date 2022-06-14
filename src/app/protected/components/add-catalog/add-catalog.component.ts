import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styles: []
})
export class AddCatalogComponent {

  newItemForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    public dialogRef: MatDialogRef<AddCatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addItem(){
    if(this.data.item == 'habilidad'){
      this.settingsService.addSkill(this.newItemForm.value)
      .subscribe({
        next: resp => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Habilidad registrada con éxito.', 'success');
        },
        error: err => Swal.fire('Error', err.error.mensaje, 'error')
      });

    } else if(this.data.item == 'funcional'){
      this.settingsService.addSkillFunc(this.newItemForm.value)
      .subscribe({
        next: resp => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Habilidad registrada con éxito.', 'success');
        },
        error: err => Swal.fire('Error', err.error.mensaje, 'error')
      });
    } else if(this.data.item == 'aplicacion'){
      this.settingsService.addSkillApp(this.newItemForm.value)
      .subscribe({
        next: resp=> {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Habilidad registrada con éxito.', 'success');
        },
        error: err => Swal.fire('Error', err.error.mensaje, 'error')
      });
    } else if (this.data.item == 'activo'){
      this.settingsService.addAssetType(this.newItemForm.value)
      .subscribe({
        next: resp => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Activo registrada con éxito.', 'success');
        },
        error: err => Swal.fire('Error', err.error.mensaje, 'error')
      });

    } else if(this.data.item == 'área'){
      this.settingsService.addArea(this.newItemForm.value)
      .subscribe({
        next: resp => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Área registrada con éxito.', 'success');
        },
        error: err => Swal.fire('Error', err.error.mensaje, 'error')
      });
    }
  }

}
