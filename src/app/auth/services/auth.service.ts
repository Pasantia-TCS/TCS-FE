import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = `${environment.url}/asociados`;

  constructor(private http: HttpClient, private userService: UserService) { }

  login(id_numero_Ultimatix: string, clave: string) {
    const url: string = `${this.baseUrl}/tcs-login`;
    const body = { id_numero_Ultimatix, clave };
    return this.http.post<User>(url, body);
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  register(id_numero_Ultimatix: string, clave: string, nombre: string, apellido: string, telefono: string, correo: string) {
    const url: string = `${this.baseUrl}/agregarAsociado`;
    const body = { id_numero_Ultimatix, clave, nombre, apellido, telefono, correo };
    return this.http.post<User>(url, body);
  }

  validateToken() {
    const ultimatix = sessionStorage.getItem('token') || '';
    const url: string = `${this.baseUrl}/buscar/${ultimatix}`;
    return this.http.get<User>(url)
      .pipe(
        map(resp => {
          sessionStorage.setItem('token', resp.id_numero_Ultimatix!);
          this.userService.updateUser(resp);
          return true;
        }),
        catchError(() => of(false))
      );
  }
}
