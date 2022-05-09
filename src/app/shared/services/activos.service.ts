import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivosService2 {

  private subject = new Subject<any>();

  constructor() { }

  sendClickEvent() {
    this.subject.next(true);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
