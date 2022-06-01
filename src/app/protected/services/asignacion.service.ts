import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Assignment } from '../interfaces/asignacion';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  private baseUrl: string = `${environment.url}/asignaciones-proyectos`;

  constructor(private http: HttpClient) { }

  agregar(asignacion: Assignment) {
    const url: string = `${this.baseUrl}/agregar-asignacion-proyecto`;
    return this.http.post<Assignment[]>(url, asignacion);
  }

  obtenerAsignaciones(ultimatix: string) {
    const url: string = `${this.baseUrl}/obtener-asignaciones-ultimatix`;
    return this.http.post<Assignment[]>(url, { id_ultimatix: ultimatix });
  }

  update(id_asignacion_proyecto_asg: string, asignacion: number, fecha_fin: string) {
    const url: string = `${this.baseUrl}/actualizar-asignacion`;
    const body = { id_asignacion_proyecto_asg, asignacion, fecha_fin };
    return this.http.post<Assignment[]>(url, body);
  }

  delete(id_asignacion_proyecto_asg: string, id_equipo_asi: string, ultimatix_asi: string, asignacion: number, fecha_baja: string) {
    const url: string = `${this.baseUrl}/dar-baja`;
    const body = { id_asignacion_proyecto_asg, id_equipo_asi, ultimatix_asi, asignacion, fecha_baja };
    return this.http.post<Assignment[]>(url, body);
  }

  obtenerUsuarios() {
    const url: string = 'http://localhost:8081/asociados/buscarAsociados';
    return this.http.get<any>(url);
  }

}

