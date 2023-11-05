import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  public behaviorSubject = new BehaviorSubject('');
  public compName = this.constructor.name;

  constructor(private sharedService: ShareDataService) {

    // OK  from within Constructor! - Using a subscription with 'normal' subscribe - this is the 'classic' new way - The servce uses just a Subject!
    // --------------------------------------------------------------------------------------------------------------------
    console.log( '>===>> 1.' + this.compName + ' - ' + 'Constructor - '+  'Getting subTitle value from sharedService.');
    this.subscription =  this.sharedService.getData().subscribe({
        next: (fmsg: IMsg) => { 
          if (fmsg.sender != this.compName) this.subTitle2 = fmsg.sender + ': ' + fmsg.msg;
          console.log( '>===>> 2.' + this.compName + ' - ' + 'Constructor - '+  'SubTitle value from sharedService:' + fmsg.msg + ' - ' + this.subTitle2); 
        }, 
        error: (error) => {
          console.log(error + this.compName  + ' - ' + 'Error getting subTitle value from sharedService.');
        }
      });


 }

  ngOnInit(): void {

    // OK  from within  ngOnInit() - Using a subscription with 'normal' subscribe - this is the 'classic' new way - The servce uses a BehaviorSubject
    // --------------------------------------------------------------------------------------------------------------------
    // console.log( '>===>> 1. Test1Component - ' + 'ngOnInit - '+  'Getting subTitle value from sharedService.');
    // this.subscription =  this.sharedService.getData().subscribe({
    //     next: (txt: string) => { 
    //       this.subTitle = txt;
    //       console.log( '>===>> 2. Test1Component - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + txt + ' - ' + this.subTitle); 
    //     }, 
    //     error: (error) => {
    //       console.log(error + 'Error getting subTitle value from sharedService.');
    //     }
    //   });


    // this.subscription =  this.sharedService.getData().subscribe(txt => {
    //   this.subTitle = txt;
    //   console.log( '>===>> 2. Test1Component - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + txt + ' - ' + this.subTitle); 
    // });


    // this.subscription = this.sharedService.getData().pipe(
    //   map((txt: string) =>  txt)
    // ).subscribe(txt => {
    //   console.log( '>===>> 2. Test1Component - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + txt + ' - ' + this.subTitle);
    //   this.subTitle = txt;
    //   console.log( '>===>> 3. Test1Component - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + txt + ' - ' + this.subTitle);
      
    // });


    // this.getMessageText().subscribe(txt => {
    //   console.log( '>===>> 3. Test1Component - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + txt + ' - ' + this.subTitle);
    // });





    // OK - Using a BehaviorSubject 
    // ----------------------------------------------------------------------------------------------------------------
    // this.sharedService.getData().subscribe(txt => { this.behaviorSubject.next(txt); });
    // this.subTitle = this.behaviorSubject.getValue();
    // console.log( '>===>> 3. Test1Component - ' + 'ngOnInit - '+  'SubTitle value from sharedService:' + ' - ' + this.subTitle);

    //this.cd.detectChanges();




    // This returns an observable:
    // this.subTitle = this.sharedService.getData().pipe(
    //   map((txt: string) =>  txt)
    // );


  }


  // getMessageText() {
  //   return this.sharedService.getData().pipe(map((txt: string) =>  txt));

  // }
  

  onClick(msgToBeSend:string) {
    console.log( '>===>> Test1Component - ' + 'onClick - '+  'Sending msg to sharedService:' + ' - ' + msgToBeSend);
    this.sharedService.setData({sender: this.compName, msg: msgToBeSend});
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
