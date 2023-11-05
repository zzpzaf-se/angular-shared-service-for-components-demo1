import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public compName = this.constructor.name;
  constructor() {}

  title = 'Application: intermediate-service';

}
