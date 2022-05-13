import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { profile, skills } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProfile(ultimatix: string) {
    const url: string = `${this.baseUrl}/perfil/perfil`;
    return this.http.post<profile>(url, { id_ultimatix: ultimatix });
  }

  getSkills() {
    const url: string = `${this.baseUrl}/perfil/habilidades`;
    return this.http.get<skills[]>(url);
  }

  updateAboutMe(ultimatix: string, aboutMe: string) {
    const url: string = `${this.baseUrl}/perfil/sobreMi`;
    return this.http.post<profile>(url, { id_ultimatix: ultimatix, sobreMi: aboutMe });
  }

  updateMySkills(ultimatix: string, skills: string[]) {
    const url: string = `${this.baseUrl}/perfil/habilidades`;
    return this.http.post<profile>(url, { id_ultimatix: ultimatix, habilidades: skills })
  }

}
