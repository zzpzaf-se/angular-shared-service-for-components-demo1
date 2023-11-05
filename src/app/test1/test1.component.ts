import { Component } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IMsg, ShareDataService } from '../share-data.service';

@Component({
  selector: 'test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {

  private subscription!: Subscription ;
  public subTitle1: string = ''; 
  public behaviorSubject = new BehaviorSubject('');
  public compName = this.constructor.name;

  constructor(private sharedService: ShareDataService,) {

      // OK  from within Constructor! - Using a subscription with 'normal' subscribe - this is the 'classic' new way - The servce uses just a Subject!
      // --------------------------------------------------------------------------------------------------------------------
      console.log( '>===>> 1.' + this.compName  + ' - ' + 'Constructor - '+  'Getting subTitle value from sharedService.');
      this.subscription =  this.sharedService.getData().subscribe({
          next: (fmsg: IMsg) => { 
            if (fmsg.sender != this.compName) this.subTitle1 = fmsg.sender + ': ' + fmsg.msg;
            console.log( '>===>> 2.' + this.compName  + ' - ' + 'Constructor - '+  'SubTitle value from sharedService:' + fmsg.msg + ' - ' + this.subTitle1); 
          }, 
          error: (error) => {
            console.log(error + this.compName  + ' - ' + 'Error getting subTitle value from sharedService.');
          }
        });
  }



  onClick(msgToBeSend:string) {

    console.log( '>===>> ' + this.compName  + ' - '  + 'onClick - '+  'Sending msg to sharedService:' + ' - ' + msgToBeSend);
    this.sharedService.setData({sender: this.compName, msg: msgToBeSend});
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

