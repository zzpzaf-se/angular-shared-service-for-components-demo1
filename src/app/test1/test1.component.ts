import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMsg, ShareDataService } from '../share-data.service';

@Component({
  selector: 'test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit{

  private subscription!: Subscription ;
  public msgReceived: string = ''; 
  public msgSent : string = ''; 
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

  ngOnInit (): void { 
    this.subscription =  this.sharedService.getData().subscribe({
        next: (fmsg: IMsg) => { 
          if (fmsg.sender != this.compName) this.msgReceived = (this.msgReceived.trim().length == 0 ) ? fmsg.sender + ': ' + fmsg.msg + '\n' : this.msgReceived + fmsg.sender + ': ' + fmsg.msg + '\n';
          console.log( '>===>> ' + this.compName  + ' - ' + 'ngOnInit - '+  'Message value from sharedService: ' + this.msgReceived); //+ fmsg.sender + ': ' + fmsg.msg ); 
        }, 
        error: (error) => {
          console.log('>===>> ' + error + this.compName  + ' - ' + 'ngOnInit - ' + 'Error getting message value from sharedService.');
        }
      });

      let msg = {sender: this.compName, msg: 'Initial Hello from ngOnInit!'}
      this.sharedService.setData(msg); 
      this.msgSent = (msg.msg) + '\n';
  }


  onClick(msgToBeSend:string) {
    console.log( '>===>> ' + this.compName  + ' - '  + 'onClick - '+  'Sending msg to sharedService:' + ' - ' + msgToBeSend);
    this.sharedService.setData({sender: this.compName, msg: msgToBeSend});
    this.msgSent = this.msgSent + msgToBeSend + '\n';
  }


  ngOnDestroy() {
    if (!!this.subscription) this.subscription.unsubscribe();
  }

}

