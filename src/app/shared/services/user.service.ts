import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/interfaces/user';
import { profile } from 'src/app/protected/interfaces/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private baseUrl: string = environment.baseUrl;
  private baseUrl: string = 'http://54.91.126.120:8081/perfil/perfiles';

  constructor(private http: HttpClient) { }

  private currentUser: user = {};

  updateUser(currentUser: user) {
    this.currentUser = { ...currentUser };
  }

  updateUserProfile(ultimatix: string, phone: string, email: string) {
    const url: string = `${this.baseUrl}/asociados/actualizarAsociado`;
    const body = { id_numero_Ultimatix: ultimatix, telefono: phone, correo: email };
    return this.http.post<user>(url, body);
  }

  updateNetuser(ultimatix: string, netuser: string) {
    const url: string = `${this.baseUrl}/perfil/usuarioRed`;
    return this.http.post<profile>(url, { id_ultimatix: ultimatix, usuario_red: netuser });
  }

  getUserData(): user {
    return this.currentUser;
  }

  getUltimatix() {
    return this.currentUser.id_numero_Ultimatix;
  }
}
