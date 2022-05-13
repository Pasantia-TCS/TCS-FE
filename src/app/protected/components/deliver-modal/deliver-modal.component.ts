import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { activo } from '../../interfaces/activo';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-deliver-modal',
  templateUrl: './deliver-modal.component.html',
  styleUrls: ['./deliver-modal.component.css']
})
export class DeliverModalComponent implements OnInit {

  currentUser: user = {};
  currentAsset: activo = {};
  ultimatix: string | undefined = '';

  deliverForm: FormGroup = this.fb.group({
    fecha_devolucion: ['', Validators.required]
  });

  fechaEntrega!: string;

  constructor(private activosService: ActivosService, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUserData();
    this.ultimatix = this.currentUser.id_numero_Ultimatix;
  }

  // deliverAsset() {
  //   if (this.deliverForm.invalid) {
  //     this.deliverForm.markAllAsTouched()
  //     return;
  //   } else {
  //     this.activosService.setAssetStatus(this.currentAsset.id_activo!, this.currentUser.id_numero_Ultimatix!, this.deliverForm.value)
  //       .subscribe({
  //         next: resp => this.currentAsset.fecha_devolucion = resp.fecha_devolucion
  //       });
  //   }
  // }

}
