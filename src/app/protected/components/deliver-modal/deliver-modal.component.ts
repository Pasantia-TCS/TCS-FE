import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';
import { Asset } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-deliver-modal',
  templateUrl: './deliver-modal.component.html',
  styles: []
})
export class DeliverModalComponent implements OnInit {

  ultimatix!: string;
  idAsset!: number;
  assets!: Asset[];

  deliverForm: FormGroup = this.fb.group({
    fecha_devolucion: ['', Validators.required]
  });

  constructor(
    private activosService: ActivosService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeliverModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.idAsset = this.data.idAsset;
    this.assets = this.data.assets;
    this.ultimatix = this.userService.getUltimatix()!;
  }

  deliverAsset() {
    if (this.deliverForm.invalid) {
      this.deliverForm.markAllAsTouched();
    } else {
      const { fecha_devolucion } = this.deliverForm.value;
      this.activosService
        .setStatus(this.idAsset.toString()!, this.ultimatix, fecha_devolucion)
        .subscribe({
          next: resp => {
            this.assets = resp;
            this.dialogRef.close(this.assets);
            Swal.fire('¡Éxito!', 'Se ha registrado con éxito la devolución del activo.', 'success');
          },
          error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
        });
    }
  }

}
