import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assignment } from '../interfaces/asignacion';
import { Team } from '../interfaces/equipo';
@Injectable({
  providedIn: 'root'
})

export class AsignacionService {

  private baseUrl: string = `${environment.url}/asignaciones-proyectos`;
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  agregar(asignacion: Assignment) {
    const url: string = `${this.baseUrl}/agregar-asignacion-proyecto`;
    return this.http.post<Assignment[]>(url, asignacion);
  }

  showByNameID(ide: string, nombreequipo: string) {
    const url: string = `${this.baseUrl}/buscar-tipo-proyecto`;
    const equipo = { id_asi: ide, nombre_equipo_asi: nombreequipo };
    return this.http.post<Team[]>(url, equipo);
  }

  obtenerAsignaciones(ultimatix: string) {
    const url: string = `${this.baseUrl}/obtener-asignaciones-ultimatix`;
    return this.http.post<Assignment[]>(url, { id_ultimatix: ultimatix });
  }

  update(assignment: Assignment) {
    const url: string = `${this.baseUrl}/registrarAsignacion`;
    return this.http.post<Assignment[]>(url, assignment);
  }

  delete(id_asignacion_proyecto_asg: string, id_equipo_asi: string, ultimatix_asi: string, asignacion: number, fecha_baja: string) {
    const url: string = `${this.baseUrl}/dar-baja`;
    const body = { id_asignacion_proyecto_asg, id_equipo_asi, ultimatix_asi, asignacion, fecha_baja };
    console.log(body);
    return this.http.post<Assignment[]>(url, body);
  }

  obtenerUsuarios() {
    const url: string = 'http://localhost:8081/asociados/buscarAsociados';
    return this.http.get<any>(url);
  }

}

