import { Component, OnInit } from '@angular/core';
import { IMsg, ShareDataService } from '../share-data.service';
import { BehaviorSubject, Subscription, map, tap } from 'rxjs';

@Component({
  selector: 'test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component {

  private subscription!: Subscription ;
  public subTitle2: string = ''; 
  public behaviorSubject = new BehaviorSubject<IMsg>({sender: '', msg: ''});
  public compName = this.constructor.name;

  constructor(private sharedService: ShareDataService) {

    // OK  from within Constructor! - Using a subscription with 'normal' subscribe - this is the 'classic' new way - The servce uses just a Subject!
    // --------------------------------------------------------------------------------------------------------------------
    // console.log( '>===>> 1.' + this.compName + ' - ' + 'Constructor - '+  'Getting subTitle value from sharedService.');
    // this.subscription =  this.sharedService.getData().subscribe({
    //     next: (fmsg: IMsg) => { 
    //       if (fmsg.sender != this.compName) this.subTitle2 = fmsg.sender + ': ' + fmsg.msg;
    //       console.log( '>===>> 2.' + this.compName + ' - ' + 'Constructor - '+  'SubTitle value from sharedService:' + fmsg.msg + ' - ' + this.subTitle2); 
    //     }, 
    //     error: (error) => {
    //       console.log(error + this.compName  + ' - ' + 'Error getting subTitle value from sharedService.');
    //     }
    //   });

 }

  ngOnInit(): void {

    console.log( '>===>> 1.' + this.compName  + ' - ' + 'ngOnInit - ' +  'Getting subTitle value from sharedService.');
    this.subscription =  this.sharedService.getData().subscribe({
        next: (fmsg: IMsg) => { 
          if (fmsg.sender != this.compName) this.subTitle2 = fmsg.sender + ': ' + fmsg.msg;
          console.log( '>===>> 2.' + this.compName  + ' - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + fmsg.msg + ' - ' + this.subTitle2); 
        }, 
        error: (error) => {
          console.log(error + this.compName  + ' - ' + 'ngOnInit - ' + 'Error getting subTitle value from sharedService.');
        }
      });

      this.sharedService.setData({sender: this.compName, msg: 'Initial Hello from ngOnInit!'});
    
    }

  
  onClick(msgToBeSend:string) {
    console.log( '>===>> Test1Component - ' + 'onClick - '+  'Sending msg to sharedService:' + ' - ' + msgToBeSend);
    this.sharedService.setData({sender: this.compName, msg: msgToBeSend});
  }


  ngOnDestroy() {
    if (!!this.subscription) this.subscription.unsubscribe();
  }

}
