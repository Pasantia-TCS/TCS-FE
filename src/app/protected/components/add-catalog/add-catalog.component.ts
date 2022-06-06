import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ActivosService } from '../../services/activos.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})
export class AddCatalogComponent implements OnInit {

  newItemForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private activoService: ActivosService,
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<AddCatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { }

  ngOnInit(): void {
  }

  addItem(){
    console.log(this.data);
    console.log(this.newItemForm.value);
    
    
    if(this.data.item == 'habilidad'){
      this.profileService.addSkill(this.newItemForm.value)
      .subscribe({
        next: (resp: any) => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Habilidad registrada con éxito.', 'success');
        },
        error: (err: { error: { mensaje: string | undefined; }; }) => Swal.fire('Error', err.error.mensaje, 'error')
      });

    } else if (this.data.item == 'activo'){
      this.activoService.addAssetType(this.newItemForm.value)
      .subscribe({
        next: (resp: any) => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Activo registrada con éxito.', 'success');
        },
        error: (err: { error: { mensaje: string | undefined; }; }) => Swal.fire('Error', err.error.mensaje, 'error')
      });

    } else if(this.data.item == 'área'){
      this.activoService.addArea(this.newItemForm.value)
      .subscribe({
        next: (resp: any) => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Área registrada con éxito.', 'success');
        },
        error: (err: { error: { mensaje: string | undefined; }; }) => Swal.fire('Error', err.error.mensaje, 'error')
      });

    } else if (this.data.item == 'edifício'){
      this.activoService.addBuilding(this.newItemForm.value)
      .subscribe({
        next: (resp: any) => {
          this.dialogRef.close(resp);
          Swal.fire('Éxito', 'Edifício registrado con éxito.', 'success');
        },
        error: (err: { error: { mensaje: string | undefined; }; }) => Swal.fire('Error', err.error.mensaje, 'error')
      });

    }
    
    
  }

}
