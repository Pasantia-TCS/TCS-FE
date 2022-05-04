import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, map, of } from 'rxjs';
import { user } from '../interfaces/user';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = 'http://54.91.126.120:8081';
  //private baseUrl: string = environment.baseUrl;

  constructor( private http : HttpClient ) { }

  login(id_numero_Ultimatix: string, clave: string) {
    const url: string = `${this.baseUrl}/asociados/tcs-login`
    const body = { id_numero_Ultimatix, clave }
    return this.http.post<user>(url, body);
  }

}
