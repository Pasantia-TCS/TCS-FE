import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AssetType } from '../interfaces/activo';
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

  unlock(id_numero_Ultimatix: number) {
    const url: string = `${environment.url}/asociados/desbloqueo-asociado`;
    return this.http.post<Profile>(url, { id_numero_Ultimatix });
  }

  token(id_numero_Ultimatix: number) {
    const url: string = `${environment.url}/asociados/devolver-token`;
    return this.http.post<Profile>(url, { id_numero_Ultimatix });
  }  

  addSkill(nombre: string){
    const url: string = `${this.baseUrl}/agregarHabilidad`;
    return this.http.post<Profile>(url, nombre);
  }

  deleteSkill(id: string){
    const url: string = `${this.baseUrl}/eliminarHabilidad`;
    return this.http.post<Profile>(url, { id });
  }

  addSkillFunc(nombre: string){
    const url: string = `${this.baseUrl}/agregarHabilidadFuncional`;
    return this.http.post<Profile>(url, nombre);
  }

  deleteSkillFunc(id: string){
    const url: string = `${this.baseUrl}/eliminarHabilidadFuncional`;
    return this.http.post<Profile>(url, { id });
  }

  addSkillApp(nombre: string){
    const url: string = `${this.baseUrl}/agregarAplicacion`;
    return this.http.post<Profile>(url, nombre);
  }

  deleteSkillApp(id: string){
    const url: string = `${this.baseUrl}/eliminarAplicacion`;
    return this.http.post<Profile>(url, { id });
  }

  addAssetType(nombre: string){
    const url: string = `${environment.url}/activos/agregarTipo`;
    return this.http.post<AssetType>(url, nombre);
  }

  deleteAssetType(id: string){
    const url: string = `${environment.url}/activos/eliminarTipo`;
    return this.http.post<AssetType>(url, { id });
  }

  addArea(nombre: string){
    const url: string = `${environment.url}/activos/agregarArea`;
    return this.http.post<AssetType>(url, nombre);
  }

  deleteArea(id: string){
    const url: string = `${environment.url}/activos/eliminarArea`;
    return this.http.post<AssetType>(url,  { id });
  }

  addBuilding(nombre: string){
    const url: string = `${environment.url}/activos/agregarEdificio`;
    return this.http.post<AssetType>(url, nombre);
  }

  deleteBuilding(id: string){
    const url: string = `${environment.url}/activos/eliminarEdificio`;
    return this.http.post<AssetType>(url, { id });
  }

}
