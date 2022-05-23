import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private baseUrl: string = `${environment.localUrl}/equipos`;
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  add(team: Team) {
    const url: string = `${this.baseUrl}/agregar-equipo`;
    return this.http.post<Team[]>(url, team);
  }

  show() {
    const url: string = `${this.baseUrl}/buscar-equipos`;
    return this.http.get<Team[]>(url);
  }

  showByType(type: number) {
    const url: string = `${this.baseUrl}/buscar-tipo-proyecto`;
    return this.http.post<Team[]>(url, { tipo_equipo_asi: type });
  }

  delete(id_equipo: string) {
    const url: string = `${this.baseUrl}/eliminar-equipo`;
    return this.http.post<Team[]>(url, { id_asi: id_equipo });
  }

  edit(id_equipo: string, lider_equipo: string, lider_tecnico: string) {
    const url: string = `${this.baseUrl}/editar-equipo`;
    const body = { id_asi: id_equipo, nombre_lider: lider_equipo, nombre_tecnico: lider_tecnico };
    return this.http.post<Team[]>(url, body);
  }

}
