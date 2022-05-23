import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { equipo } from 'src/app/protected/interfaces/equipo';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl: string = `${environment.baseUrl}/equipos`;
  private teams!: equipo[];

  constructor(private http: HttpClient) { }

  updateTeams(teams: equipo[]) {
    this.teams = { ...teams };
  }

  loadTeams() {
    const url: string = `${this.baseUrl}/buscar-equipos`;
    return this.http.get<equipo[]>(url);
  }
}
