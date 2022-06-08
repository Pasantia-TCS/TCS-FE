import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-catalog-building',
  templateUrl: './add-catalog-building.component.html',
  styleUrls: ['./add-catalog-building.component.css']
})
export class AddCatalogBuildingComponent implements OnInit {

  newItemForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    piso: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    public dialogRef: MatDialogRef<AddCatalogBuildingComponent>,
  ) { }

  ngOnInit(): void {
  }

  addItem(){    
    this.settingsService.addBuilding(this.newItemForm.value)
    .subscribe({
      next: (resp: any) => {
        this.dialogRef.close(resp);
        Swal.fire('Éxito', 'Edifício registrado con éxito.', 'success');
      },
      error: (err: { error: { mensaje: string | undefined; }; }) => Swal.fire('Error', err.error.mensaje, 'error')
    });

    
  }

}
