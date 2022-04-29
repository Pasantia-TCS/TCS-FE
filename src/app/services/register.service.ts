import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from 'src/app/interfaces/user';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl: string = environment.baseUrl;
  private url = 'assets/loginTest_1.json';
  //private url = 'http://localhost:8080/TCS-FE';

  constructor( private http : HttpClient ) { }

  register(id_numero_Ultimatix: string, clave: string, nombre: string, apellido: string, telefono: string, correo: string) {
    const url: string = `${this.baseUrl}/asociados/agregarAsociado`
    const body = { id_numero_Ultimatix, clave, nombre, apellido, telefono, correo }
    return this.http.post<user>(url, body);
  }

}
