import { Component } from '@angular/core';
import { CustomConfirmService } from './shared/custom-confirm/custom-confirm.service';

import { AlertService } from './shared/alert.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'toDo';
  constructor(public confirmService: CustomConfirmService,
    private alertS: AlertService){}

  fireDialog(){
    this.alertS.confirm('hello there sldkfdlf');
  }
}
