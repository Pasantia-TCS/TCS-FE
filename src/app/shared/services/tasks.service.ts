import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { profile } from 'src/app/protected/interfaces/profile';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  users: profile[] = [];

  async loadUsers() {
    const url: string = 'http://localhost:8081/perfil/perfiles';
    // const url: string = 'http://54.91.126.120:8081/perfil/perfiles';
    
    return this.http.get<profile[]>(url)
      .subscribe({
        next: resp => {
          this.users = resp;
        }
      });
  }

  getUsers() {
    return this.users;
  }

}
