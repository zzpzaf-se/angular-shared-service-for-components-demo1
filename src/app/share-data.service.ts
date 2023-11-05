import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


export interface IMsg {
  sender: string;
  msg: string;
}


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }


  public messageSubject = new Subject<IMsg>();
  //public messageSubject = new BehaviorSubject<string>('Nothing here');

  public setData(message: IMsg) {
   console.log( '>===>> ShareDataService - ' + 'setData - '+  'Setting message value in sharedService: ' + message ); 
   this.messageSubject.next(message);
  }

  public getData(): Observable<IMsg> {
    console.log( '>===>> ShareDataService - ' + 'getData - '+  'Getting message value from sharedService.');
    return this.messageSubject.asObservable();

 }


}
