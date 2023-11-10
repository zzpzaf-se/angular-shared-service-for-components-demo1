import { Injectable } from '@angular/core';
//import { Observable, Subject } from 'rxjs';
//import { Observable, BehaviorSubject } from 'rxjs';
import { Observable, ReplaySubject } from 'rxjs';


export interface IMsg {
  sender: string;
  msg: string;
}


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { 
    this.messageSubject.next({sender: this.constructor.name, msg: 'This is the Initial Behavior Subject message.'});
  }


  //public messageSubject = new Subject<IMsg>();
  //--public messageSubject = new BehaviorSubject<IMsg>({sender: this.constructor.name, msg: 'This is the Initial Behavior Subject message.'});
  // public messageSubject = new BehaviorSubject<IMsg>({sender: '', msg: ''});
  public messageSubject = new ReplaySubject<IMsg>(5, 3000);
  
  
  public setData(message: IMsg) {
   console.log( '>===>> ShareDataService - ' + 'setData - '+  'Setting message value in sharedService: ' + message.sender + ' - ' + message.msg ); 
   this.messageSubject.next(message);
  }

  public getData(): Observable<IMsg> {
    console.log( '>===>> ShareDataService - ' + 'getData - '+  'Getting message value from sharedService.');
    return this.messageSubject.asObservable();

  }


  // public getData2():IMsg {
  //   console.log( '>===>> ShareDataService - ' + 'getData - '+  'Getting message value from sharedService.');
  //   return this.messageSubject.getValue();
  // }

}