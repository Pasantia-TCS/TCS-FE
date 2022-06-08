import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile, Skills } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl: string = `${environment.url}/perfil`;

  constructor(private http: HttpClient) { }

  getProfile(ultimatix: string) {
    const url: string = `${this.baseUrl}/perfil`;
    return this.http.post<Profile>(url, { id_ultimatix: ultimatix });
  }

  getSkills() {
    const url: string = `${this.baseUrl}/habilidades`;
    return this.http.get<Skills[]>(url);
  }

  updateAboutMe(ultimatix: string, aboutMe: string) {
    const url: string = `${this.baseUrl}/sobreMi`;
    return this.http.post<Profile>(url, { id_ultimatix: ultimatix, sobreMi: aboutMe });
  }

  updateMySkills(ultimatix: string, skills: string[], knowledgeLevel: string[]) {
    const url: string = `${this.baseUrl}/editarMisHabilidades`;
    const body = { id_ultimatix: ultimatix, habilidades: skills, nivel_habilidad: knowledgeLevel };
    return this.http.post<Profile>(url, body);
  }

}
