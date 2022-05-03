import { Component, OnInit } from '@angular/core';
import { pipe, tap } from 'rxjs';
import { ActivosService } from '../../services/activos.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  constructor(private rg: ActivosService) { }

  ngOnInit(): void {
  }

  activos = [];

  registrar() {
    this.rg.register().subscribe(pipe(
      tap((resp: any) => console.log(resp))
    ));
  }

}
