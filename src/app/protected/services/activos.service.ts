import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  registro = {
    "id_activo":"1111111",
    "area":"CTB",
    "edificio":"Centrum",
    "piso":"5",
    "tipo":"Computador",
    "usuario_red":"@networkuser",
    "hostname":"hostname",
    "direccion_mac":"10:FE:C3:65:34:09",
    "direccion_ip":"192.168.255.100",
    "reservada_ip":"false",
    "id_ultimatix":"2254680"
   }

  constructor(private http: HttpClient) { }

  register() {
    const url: string = `http://localhost:8081/activos/agregarActivo`;
    // const body = { id_numero_Ultimatix, clave, nombre, apellido, telefono, correo }
    return this.http.post<any>(url, this.registro);
  }
}
