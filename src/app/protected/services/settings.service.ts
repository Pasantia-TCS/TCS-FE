import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/auth/interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private baseUrl: string = `${environment.url}/`;

  constructor(private http: HttpClient) { }

  getUsers(){
    const url: string = `${this.baseUrl}/`;
    return this.http.get<User[]>(url);
  }

  changeRole(id_ultimatix: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<User>(url, { id_ultimatix });
  
  }

}
