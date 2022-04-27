import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { user } from 'src/app/interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  private baseUrl: string = environment.baseUrl;

  constructor( private http : HttpClient ) { }

  register(id_numero_Ultimatix: string, clave: string, nombre: string, apellido: string, telefono: string, correo: string) {
    const url: string = `${this.baseUrl}/asociados/agregarAsociado`
    const body = { id_numero_Ultimatix, clave, nombre, apellido, telefono, correo }
    return this.http.post<user>(url, body)
      .pipe(
        tap(resp => console.log(resp))
      )
  }

}
