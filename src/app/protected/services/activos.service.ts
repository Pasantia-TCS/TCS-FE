import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { activo } from '../interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  baseUrl: string = 'http://localhost:8081/activos';
  //private baseUrl: string = 'http://54.91.126.120:8081/activos';

  constructor(private http: HttpClient) { }

  obtenerCatalogo(tipo: string) {
    const url: string = `${this.baseUrl}/${tipo}`;
    return this.http.get(url);
  }

  register(activo: activo) {
    const url: string = `${this.baseUrl}/agregarActivo`;
    return this.http.post<activo[]>(url, activo);
  }

  actualizar(activo: activo) {
    const url: string = `${this.baseUrl}/actualizarActivo`;
    return this.http.post<activo[]>(url, activo)
  }

  eliminar(id_activo: string, ultimatix: string) {
    const url: string = `${this.baseUrl}/eliminarActivo`;
    return this.http.post<activo[]>(url, { id_activo: id_activo, id_ultimatix: ultimatix });
  }

  // mostrarActivos(ultimatix: string) {
  //   const url: string = `${this.baseUrl}/buscarUltimatix`;
  //   return this.http.post<activo[]>(url, { id_ultimatix: ultimatix });
  // }

  async mostrarActivos(ultimatix: string | undefined) {
    const url: string = `${this.baseUrl}/buscarUltimatix`;
    const source$ = this.http.post<activo[]>(url, { id_ultimatix: ultimatix });
    const result = await lastValueFrom(source$);
    return result;
  }

  getSkills() {
    const url: string = `${this.baseUrl}/skills`;
    return this.http.get<string[]>(url);
  }

  getMySkills(ultimatix: string) {
    const url: string = '';
    return this.http.post<string[]>(url, { id_ultimatix: ultimatix });
  }

  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
