import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject, tap } from 'rxjs';
import { asignacion } from '../interfaces/asignacion';

@Injectable({
  providedIn: 'root'
})

export class AsignacionService {

  baseUrl: string = 'http://localhost:8081/asignaciones';
  //private baseUrl: string = 'http://54.91.126.120:8081/asignaciones';

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  register(asignacion: asignacion) {
    const url: string = `${this.baseUrl}/agregarAsignacion`;
    return this.http.post<asignacion[]>(url, asignacion).pipe(
      tap(resp => console.log(Response))
    );
  }


  async obtenerAsignacion(asignacion: asignacion) {
    const url: string = `${this.baseUrl}/obtenerAsignaciones`;
    const source$ = this.http.get<asignacion[]>(url)
      .pipe(
        tap(resp => console.log(resp))
      );
    const result = await lastValueFrom(source$);
    return result;
  }


  update(asignacion: asignacion) {
    const url: string = `${this.baseUrl}/registrarAsignacion`;
    return this.http.post<asignacion[]>(url, asignacion);
  }


  delete(id_asignacion: string) {
    const url: string = `${this.baseUrl}/eliminarAsignacion`;
    return this.http.post<asignacion[]>(url, { id_asignacion: id_asignacion });
  }



  obtenerUsuarios() {
    const url: string = 'localhost:8081/asociado/buscarAsociados';
    return this.http.get(url);
  }



}

