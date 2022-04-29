import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, map, of } from 'rxjs';
import { user } from '../interfaces/user';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'http://localhost:8081/asociados/tcs-login';
  //private baseUrl: string = environment.baseUrl;

  constructor( private http : HttpClient ) { }

  login(id_numero_Ultimatix: string, clave: string) {
    const body = { id_numero_Ultimatix, clave }

    return this.http.post<user>(this.url, body)
      .pipe(
        map(resp => resp.status),
        catchError(err => of(err.error.mensaje))
      )
  }

}
