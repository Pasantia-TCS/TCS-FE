import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asset } from '../interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  private baseUrl: string = `${environment.localUrl}/activos`;

  constructor(private http: HttpClient) { }

  obtenerCatalogo(tipo: string) {
    const url: string = `${this.baseUrl}/${tipo}`;
    return this.http.get(url);
  }

  register(activo: Asset) {
    const url: string = `${this.baseUrl}/agregarActivo`;
    return this.http.post<Asset[]>(url, activo);
  }

  actualizar(activo: Asset) {
    const url: string = `${this.baseUrl}/actualizarActivo`;
    return this.http.post<Asset[]>(url, activo)
  }

  eliminar(id_activo: string, ultimatix: string) {
    const url: string = `${this.baseUrl}/eliminarActivo`;
    return this.http.post<Asset[]>(url, { id_activo: id_activo, id_ultimatix: ultimatix });
  }

  async mostrarActivos(ultimatix: string | undefined) {
    const url: string = `${this.baseUrl}/buscarUltimatix`;
    const source$ = this.http.post<Asset[]>(url, { id_ultimatix: ultimatix });
    return lastValueFrom(source$);
  }

  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  setAssetStatus(id: string, ultimatix: string, deliveryDate: string) {
    const url: string = `${this.baseUrl}/devolverActivo`;
    const body = { id_activo: id, id_ultimatix: ultimatix, fecha_devolucion: deliveryDate };
    return this.http.post<Asset[]>(url, body);
  }
}
