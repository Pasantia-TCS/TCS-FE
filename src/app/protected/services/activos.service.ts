import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asset, AssetType } from '../interfaces/activo';
import { Building } from '../interfaces/edificio';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  private baseUrl: string = `${environment.url}/activos`;

  constructor(private http: HttpClient) { }

  getTypes() {
    const url: string = `${this.baseUrl}/tipos`;
    return this.http.get<AssetType[]>(url);
  }

  getAreas() {
    const url: string = `${this.baseUrl}/areas`;
    return this.http.get<AssetType[]>(url);
  }

  getBuildings() {
    const url: string = `${this.baseUrl}/edificios`;
    return this.http.get<Building[]>(url);
  }

  register(activo: Asset) {
    const url: string = `${this.baseUrl}/agregarActivo`;
    return this.http.post<Asset[]>(url, activo);
  }

  eliminar(id_activo: string, ultimatix: string) {
    const url: string = `${this.baseUrl}/eliminarActivo`;
    return this.http.post<Asset[]>(url, { id_activo: id_activo, id_ultimatix: ultimatix });
  }

  getAssets(ultimatix: string) {
    const url: string = `${this.baseUrl}/buscarUltimatix`;
    return this.http.post<Asset[]>(url, { id_ultimatix: ultimatix });
  }

  setStatus(id: string, ultimatix: string, deliveryDate: string) {
    const url: string = `${this.baseUrl}/devolverActivo`;
    const body = { id_activo: id, id_ultimatix: ultimatix, fecha_devolucion: deliveryDate };
    return this.http.post<Asset[]>(url, body);
  }

  addAssetType(nombre: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<AssetType>(url, nombre);
  }

  addArea(nombre: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<AssetType>(url, nombre);
  }

  addBuilding(nombre: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<AssetType>(url, nombre);
  }

  deleteAssetType(id: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<AssetType>(url, id);
  }

  deleteArea(id: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<AssetType>(url, id);
  }
  
  deleteBuilding(id: string){
    const url: string = `${this.baseUrl}/`;
    return this.http.post<AssetType>(url, id);
  }

}
