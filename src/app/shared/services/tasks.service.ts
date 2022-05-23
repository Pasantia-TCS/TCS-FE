import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/protected/interfaces/profile';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  users: Profile[] = [];

  async loadUsers() {
    const url: string = 'http://localhost:8081/perfil/perfiles';
    // const url: string = 'http://54.91.126.120:8081/perfil/perfiles';

    return this.http.get<Profile[]>(url)
      .subscribe(
        {
          next: resp => this.users = resp
        }
      );
  }

  getUsers() {
    return this.users;
  }

}
