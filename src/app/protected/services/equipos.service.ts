import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private baseUrl: string = `${environment.url}/equipos`;

  constructor(private http: HttpClient) { }

  add(team: Team) {
    const url: string = `${this.baseUrl}/agregar-equipo`;
    return this.http.post<Team[]>(url, team);
  }

  show() {
    const url: string = `${this.baseUrl}/buscar-equipos`;
    return this.http.get<Team[]>(url);
  }

  changeStatus(id_equipo: string) {
    const url: string = `${this.baseUrl}/eliminar-equipo`;
    return this.http.post<Team[]>(url, { id_asi: id_equipo });
  }

  edit(id_equipo: string, lider_equipo: string, lider_tecnico: string) {
    const url: string = `${this.baseUrl}/editar-equipo`;
    const body = { id_asi: id_equipo, nombre_lider: lider_equipo, nombre_tecnico: lider_tecnico };
    return this.http.post<Team[]>(url, body);
  }

}
