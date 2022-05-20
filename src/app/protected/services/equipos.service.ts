import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private baseUrl: string = `${environment.baseUrl}/equipos`;

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  add(equipo: equipo) {
    const url: string = `${this.baseUrl}/agregar-equipo`;
    return this.http.post<equipo[]>(url, equipo);
  }

  show() {
    const url: string = `${this.baseUrl}/buscar-equipos`;
    return this.http.get<equipo[]>(url);
  }

  showByType(type: number) {
    const url: string = `${this.baseUrl}/buscar-tipo-proyecto`;
    return this.http.post<equipo[]>(url, { tipo_equipo_asi: type });
  }

  delete(id_equipo: string) {
    const url: string = `${this.baseUrl}/eliminar-equipo`;
    return this.http.post<equipo[]>(url, { id_asi: id_equipo });
  }

  edit(id_equipo: string, lider_equipo: string, lider_tecnico: string) {
    const url: string = `${this.baseUrl}/editar-equipo`;
    const body = { id_asi: id_equipo, nombre_lider: lider_equipo, nombre_tecnico: lider_tecnico };
    return this.http.post<equipo[]>(url, body);
  }

}
