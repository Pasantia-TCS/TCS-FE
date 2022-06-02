import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private baseUrl: string = `${environment.url}/perfil`;

  constructor(private http: HttpClient) { }

  getUsers() {
    const url: string = `${this.baseUrl}/perfiles`;
    return this.http.get<Profile[]>(url);
  }

  changeRole(id_ultimatix: number) {
    const url: string = `${this.baseUrl}/actualizar-rol`;
    return this.http.post<Profile>(url, { id_ultimatix });
  }

}
