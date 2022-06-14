import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-catalog-building',
  templateUrl: './add-catalog-building.component.html',
  styles: []
})
export class AddCatalogBuildingComponent {

  newItemForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    piso: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    public dialogRef: MatDialogRef<AddCatalogBuildingComponent>,
  ) { }

  addItem(){
    this.settingsService.addBuilding(this.newItemForm.value)
    .subscribe({
      next: resp => {
        this.dialogRef.close(resp);
        Swal.fire('Éxito', 'Edifício registrado con éxito.', 'success');
      },
      error: err  => Swal.fire('Error', err.error.mensaje, 'error')
    });
  }

}
