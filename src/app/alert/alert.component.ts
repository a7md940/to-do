import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
@Injectable()
export class AlertComponent implements OnInit {

  alert;
  constructor() { }

  ngOnInit() {
  }

  customAlert(e){
    e.target.getAttribute('data-confirm') == "no" ? this.alert = false : this.alert = true;
    // console.log( this.alert )
  }

}
