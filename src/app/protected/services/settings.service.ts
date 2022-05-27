import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/auth/interfaces/user';
import { Profile } from '../interfaces/profile';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private baseUrl: string = `${environment.url}/perfil`;
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getUsers(){
    const url: string = `${this.baseUrl}/perfiles`;
    return this.http.get<Profile[]>(url);
  }

  changeRole(id_ultimatix: number){
    const url: string = `${this.baseUrl}/actualizar-rol`;
    return this.http.post<Profile>(url, { id_ultimatix });
  
  }

}
