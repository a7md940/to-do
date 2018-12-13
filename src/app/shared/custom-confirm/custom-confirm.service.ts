import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CustomConfirmService {
  confirmIsActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  confrimMsg: BehaviorSubject<string> = new BehaviorSubject('');
  confirmResult: BehaviorSubject<boolean> = new BehaviorSubject(null);

  no;
  yes;

  constructor() { }

  async triggerConfrim(msg){
    this.confirmIsActive.next(true);
    this.confrimMsg.next(msg);
    
    return this.confirmResult.complete();
  }

  confirm(e){
    e.preventDefault();
    if(e.target.classList.contains('alert--yes')){
      this.confirmResult.next(true);
      this.confirmIsActive.next(false);
    }
      
    if(e.target.classList.contains('alert--no')){
      this.confirmResult.next(false);
      this.confirmIsActive.next(false);

    }

  }

}