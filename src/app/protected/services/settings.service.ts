import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/auth/interfaces/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  private baseUrl: string = `${environment.url}/asociados`;
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getUsers(){
    const url: string = `${this.baseUrl}/buscarAsociados`;
    return this.http.get<User[]>(url);
  }

  changeRole(id_ultimatix: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<User>(url, { id_ultimatix });
  
  }

}
