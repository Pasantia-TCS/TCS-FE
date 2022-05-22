import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { activo } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deliver-modal',
  templateUrl: './deliver-modal.component.html',
  styleUrls: ['./deliver-modal.component.css']
})
export class DeliverModalComponent implements OnInit {

  currentUser: user = {};
  currentAsset: activo = {};
  ultimatix: string | undefined = '';

  asset: activo = {};
  tableData: activo[] = [];

  deliverForm: FormGroup = this.fb.group({
    fecha_devolucion: ['', Validators.required]
  });

  fechaEntrega!: string;

  constructor(
    private activosService: ActivosService,
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeliverModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.asset = this.data.asset;
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
  }

  clickMe() {
    this.activosService.sendClickEvent();
  }

  deliverAsset() {
    if (this.deliverForm.invalid) {
      this.deliverForm.markAllAsTouched()
      return;
    } else {
      const { fecha_devolucion } = this.deliverForm.value;

      this.activosService.setAssetStatus(this.asset.id_activo?.toString()!, this.asset.id_ultimatix?.toString()!, fecha_devolucion)
        .subscribe({
          next: resp => {
            this.tableData = resp;
            this.clickMe();
            Swal.fire('¡Éxito!', 'Se ha registrado con éxito la devolución del activo.', 'success');
            this.dialogRef.close();
          },
          error: err => Swal.fire('¡Error!', err.error.mensaje, 'error')
        });
    }
  }

}
