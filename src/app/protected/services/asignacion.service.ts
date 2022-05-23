import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Assignment } from '../interfaces/asignacion';

@Injectable({
  providedIn: 'root'
})

export class AsignacionService {

  baseUrl: string = 'http://localhost:8081/asignaciones';
  // private baseUrl: string = 'http://54.91.126.120:8081/asignaciones';

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  register(asignacion: Assignment) {
    const url: string = `${this.baseUrl}/agregar-asignacion-proyecto`;
    return this.http.post<Assignment[]>(url, asignacion);
  }

  obtenerAsignacion() {
    const url: string = `${this.baseUrl}/obtenerAsignaciones`;
    return this.http.get<Assignment[]>(url);
  }


  update(assignment: Assignment) {
    const url: string = `${this.baseUrl}/registrarAsignacion`;
    return this.http.post<Assignment[]>(url, assignment);
  }


  delete(id_asignacion: string) {
    const url: string = `${this.baseUrl}/eliminarAsignacion`;
    return this.http.post<Assignment>(url, { id_asg: id_asignacion });
  }

  obtenerUsuarios() {
    const url: string = 'http://localhost:8081/asociados/buscarAsociados';
    return this.http.get<any>(url);
  }

}

