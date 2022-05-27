import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { Profile } from 'src/app/protected/interfaces/profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.url;
  private currentUser!: User;
  
  constructor(private http: HttpClient) { }

  updateUser(currentUser: User) {
    this.currentUser = { ...currentUser };
  }

  updateUserProfile(ultimatix: string, phone: string, email: string) {
    const url: string = `${this.baseUrl}/asociados/actualizarAsociado`;
    const body = { id_numero_Ultimatix: ultimatix, telefono: phone, correo: email };
    return this.http.post<User>(url, body);
  }

  updateNetuser(ultimatix: string, netuser: string) {
    const url: string = `${this.baseUrl}/perfil/usuarioRed`;
    return this.http.post<Profile>(url, { id_ultimatix: ultimatix, usuario_red: netuser });
  }

  getUserData(): User {
    return this.currentUser;
  }

  getUltimatix() {
    return this.currentUser.id_numero_Ultimatix;
  }
}
