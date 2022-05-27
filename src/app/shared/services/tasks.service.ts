import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'src/app/protected/interfaces/profile';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  users: Profile[] = [];

  async loadUsers() {
    const baseUrl: string = `${environment.url}/perfil/perfiles`;
    return this.http.get<Profile[]>(baseUrl)
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
