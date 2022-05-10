import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { activo } from '../interfaces/activo';
import { asignacion } from '../interfaces/asignacion';
//import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  // baseUrl: string = 'http://localhost:8081/activos';
  private baseUrl: string = 'http://54.91.126.120:8081/asignacion';

  constructor(private http: HttpClient) { }

 

  obtenerCatalogo(tipo: string) {
    const url: string = `${this.baseUrl}/${tipo}`;
    return this.http.get(url);
  }

  register(asignacion: asignacion) {
    
  }

  update(asignacion: asignacion) {
    
  }

  delete(id_asignacion: string, ultimatix: string) {
    
  }

  async mostrarAsignacion(ultimatix: string | undefined) {
    
  }


}
