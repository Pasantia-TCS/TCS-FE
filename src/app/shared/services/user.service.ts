import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user';
import { Profile } from 'src/app/protected/interfaces/profile';
import { environment } from 'src/environments/environment';
import { ProfileService } from "../../protected/services/profile.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.url;
  private currentUser!: User;
  private currentProfile!: Profile;

  constructor(private http: HttpClient, private profileService: ProfileService) { }

  updateUser(currentUser: User) {
    this.currentUser = currentUser;
    this.profileService.getProfile(currentUser.id_numero_Ultimatix!)
      .subscribe({
        next: resp => this.currentProfile = resp
      });
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

  getProfile(): Profile {
    return this.currentProfile;
  }

  updateProfile(profile: Profile) {
    this.currentProfile = profile;
  }

  getUltimatix() {
    return this.currentUser.id_numero_Ultimatix;
  }

}
