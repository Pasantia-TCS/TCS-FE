import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { activo } from '../interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  registro = {
    "id_activo": "17",
    "area": "Seguridad",
    "edificio": "Luxor",
    "piso": "2",
    "tipo": "Computador",
    "usuario_red": "@networkuser",
    "hostname": "hostname",
    "direccion_mac": "10:FF:C3:65:E4:60",
    "direccion_ip": "172.16.1.2",
    "reservada_ip": "false",
    "id_ultimatix": "0000000"
  }

  registro1 = {
    "area": "Seguridad",
    "edificio": "Luxor",
    "piso": "2",
    "tipo": "Computador",
    "usuario_red": "@networkuser",
    "hostname": "hostname",
    "direccion_mac": "10:FF:C3:65:44:66",
    "direccion_ip": "172.16.1.22",
    "reservada_ip": "false",
    "id_ultimatix": "0000000"
  }

  baseUrl: string = 'http://localhost:8081/activos';
  //private baseUrl: string = 'http://54.91.126.120:8081/activos';

  constructor(private http: HttpClient) { }

  obtenerCatalogo(tipo: string) {
    const url: string = `${this.baseUrl}/${tipo}`;
    return this.http.get(url);
  }

  register(activo: activo) {
    const url: string = `${this.baseUrl}/agregarActivo`;
    return this.http.post<activo[]>(url, activo);
  }

  actualizar() {
    const url: string = `${this.baseUrl}/actualizarActivo`;
    return this.http.post<activo[]>(url, this.registro)
  }

  eliminar(id_activo: string, ultimatix: string) {
    const url: string = `${this.baseUrl}/eliminarActivo`;
    return this.http.post<activo[]>(url, { id_activo: id_activo, id_ultimatix: ultimatix });
  }

  // mostrarActivos(ultimatix: string) {
  //   const url: string = `${this.baseUrl}/buscarUltimatix`;
  //   return this.http.post<activo[]>(url, { id_ultimatix: ultimatix });
  // }

  async mostrarActivos(ultimatix: string | undefined) {
    const url: string = `${this.baseUrl}/buscarUltimatix`;
    const source$ = this.http.post<activo[]>(url, { id_ultimatix: ultimatix });
    const result = await lastValueFrom(source$);
    return result;
  }

  getSkills() {
    const url: string = `${this.baseUrl}/skills`;
    return this.http.get<string[]>(url);
  }

  getMySkills(ultimatix: string) {
    const url: string = '';
    return this.http.post<string[]>(url, {id_ultimatix: ultimatix});
  }
}
