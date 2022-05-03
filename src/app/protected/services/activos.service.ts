import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { activo } from '../interfaces/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  registro = {
    "id_activo": "1111111",
    "area": "Seguridad",
    "edificio": "Luxor",
    "piso": "2",
    "tipo": "Computador",
    "usuario_red": "@networkuser",
    "hostname": "hostname",
    "direccion_mac": "10:FF:C3:65:E4:60",
    "direccion_ip": "192.168.255.119",
    "reservada_ip": "false",
    "id_ultimatix": "0000000"
  }

  constructor(private http: HttpClient) { }

  register() {
    const url: string = `http://localhost:8081/activos/agregarActivo`;
    return this.http.post<activo>(url, this.registro);
  }

  actualizar() {
    const url: string = 'http://localhost:8081/activos/actualizarActivo';
    return this.http.post<any>(url, this.registro)
  }

  eliminar() {
    const url: string = 'http://localhost:8081/activos/eliminarActivo';
    return this.http.post<any>(url, { id_activo: "1111111", id_ultimatix: "0000000" });
  }

  mostrarActivos() {
    const url: string = 'http://localhost:8081/activos/buscarUltimatix';
    return this.http.post<activo[]>(url, { id_ultimatix: "0000000" });
  }
}
