import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asset } from '../interfaces/activo';
import { Assignment } from '../interfaces/asignacion';
import { Team } from '../interfaces/equipo';

@Injectable({

  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getTeam() {
    const url: string = `${environment.url}/reportes/equipos-reportes`;
    return this.http.get< Team []>(url);
  }
  getAssetsT() {
    const url: string = `${environment.url}/activos/buscarTodo`;
    return this.http.get<Asset[]>(url);
  }
  getAssets() {
    const url: string = `${environment.url}/reportes/activos-reportes`;
    return this.http.get<Asset[]>(url);
  }
  getAssignmentsT() {
    const url: string = `${environment.url}/asignaciones-proyectos/buscar-asignaciones`;
    return this.http.get<Assignment[]>(url);
  }
  getAssignments() {
    const url: string = `${environment.url}/reportes/asignaciones-reportes`;
    return this.http.get<Assignment[]>(url);
  }
}
