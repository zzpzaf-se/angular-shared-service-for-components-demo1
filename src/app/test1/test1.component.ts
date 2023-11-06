import { Component } from '@angular/core';
// import { Subscription } from 'rxjs';
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
  public behaviorSubject = new BehaviorSubject<IMsg>({sender: '', msg: ''});
  public compName = this.constructor.name;

  constructor(private sharedService: ShareDataService,) {

      // console.log( '>===>> 1.' + this.compName  + ' - ' + 'Constructor - '+  'Getting subTitle value from sharedService.');
      // this.subscription =  this.sharedService.getData().subscribe({
      //     next: (fmsg: IMsg) => { 
      //       if (fmsg.sender != this.compName) this.subTitle1 = fmsg.sender + ': ' + fmsg.msg;
      //       console.log( '>===>> 2.' + this.compName  + ' - ' + 'Constructor - '+  'SubTitle value from sharedService:' + fmsg.msg + ' - ' + this.subTitle1); 
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
          if (fmsg.sender != this.compName) this.subTitle1 = fmsg.sender + ': ' + fmsg.msg;
          console.log( '>===>> 2.' + this.compName  + ' - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + fmsg.msg + ' - ' + this.subTitle1); 
        }, 
        error: (error) => {
          console.log(error + this.compName  + ' - ' + 'ngOnInit - ' + 'Error getting subTitle value from sharedService.');
        }
      });

      this.sharedService.setData({sender: this.compName, msg: 'Initial Hello from ngOnInit!'}); 

  }


  onClick(msgToBeSend:string) {
    console.log( '>===>> ' + this.compName  + ' - '  + 'onClick - '+  'Sending msg to sharedService:' + ' - ' + msgToBeSend);
    this.sharedService.setData({sender: this.compName, msg: msgToBeSend});
  }


  ngOnDestroy() {
    if (!!this.subscription) this.subscription.unsubscribe();
  }

}

