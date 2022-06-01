import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asset } from '../interfaces/activo';
import { Assignment } from '../interfaces/asignacion';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAssets() {
    const url: string = `${environment.url}/activos/buscarTodo`;
    return this.http.get<Asset[]>(url);
  }

  getAssignments() {
    const url: string = `${environment.url}/asignaciones-proyectos/buscar-asignaciones`;
    return this.http.get<Assignment[]>(url);
  }
}
