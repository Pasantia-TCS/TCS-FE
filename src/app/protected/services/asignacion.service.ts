import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { asignacion } from '../interfaces/asignacion';
//import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  // baseUrl: string = 'http://localhost:8081/asignacion';
  private baseUrl: string = 'http://54.91.126.120:8081/asignacion';

  constructor(private http: HttpClient) { }

 

  obtenerCatalogo(tipo: string) {
    const url: string = `${this.baseUrl}/${tipo}`;
    return this.http.get(url);
  }

  register(asignacion: asignacion) {
    const url: string = `${this.baseUrl}/agregarAsignacion`;
    return this.http.post<asignacion[]>(url, asignacion);
  }

  update(asignacion: asignacion) {
    const url: string = `${this.baseUrl}/actualizarAsignacion`;
    return this.http.post<asignacion[]>(url, asignacion); 
  }

  delete(id_asignacion: string, ultimatix: string) {
    const url: string = `${this.baseUrl}/eliminarAsignacion`;
    return this.http.post<asignacion[]>(url, { id_asignacion: id_asignacion, id_ultimatix: ultimatix });
  }

  async mostrarAsignacion(ultimatix: string | undefined) {
    const url: string = `${this.baseUrl}/buscarUltimatix`;
    const source$ = this.http.post<asignacion[]>(url, { id_ultimatix: ultimatix });
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

