import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'assets/loginTest_2.json';
  //private url = 'http://localhost:8080/TCS-FE';

  constructor( private http : HttpClient ) { }

  public authenticate(): Observable<any>{
    return this.http.get(this.url);

  }

}
