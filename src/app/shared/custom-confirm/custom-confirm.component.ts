import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CustomConfirmService } from './custom-confirm.service';
@Component({
  selector: 'custom-confirm',
  templateUrl: './custom-confirm.component.html',
  styleUrls: ['./custom-confirm.component.scss'],
})
export class CustomConfirmComponent implements OnInit, AfterViewInit {
  @ViewChild('no') no:ElementRef;
  @ViewChild('yes') yes:ElementRef;

  constructor(private confirmS: CustomConfirmService) { }
  msg:string;
  confirmIsActive;

  ngAfterViewInit(){}
  ngOnInit() {
    this.confirmS.confirmIsActive.subscribe(v => {
      this.confirmIsActive = v;
    });
    this.confirmS.confrimMsg.subscribe(msg => this.msg = msg);

  }

  // triggerConfirm(){
  //   this.confirmS.triggerConfrim('are you want to delete this ahmed atef?');
  //   console.log(this.no)
  // }

  confirm(e){
    this.confirmS.confirm(e);
  }

 
}
