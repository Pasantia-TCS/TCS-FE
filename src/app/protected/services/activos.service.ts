import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  // baseUrl: string = 'http://localhost:8081/activos';
  private baseUrl: string = 'http://54.91.126.120:8081/activos';

  constructor(private http: HttpClient) { }

  register() {
    const url: string = `${this.baseUrl}/agregarActivo`;
    return this.http.post<activo[]>(url, this.registro1);
  }

  actualizar() {
    const url: string = `${this.baseUrl}/actualizarActivo`;
    return this.http.post<activo[]>(url, this.registro)
  }

  eliminar() {
    const url: string = `${this.baseUrl}/eliminarActivo`;
    return this.http.post<activo[]>(url, { id_activo: "18", id_ultimatix: "0000000" });
  }

  mostrarActivos() {
    const url: string = `${this.baseUrl}/buscarUltimatix`;
    return this.http.post<activo[]>(url, { id_ultimatix: "0000000" });
  }
}
