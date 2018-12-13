import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private matDialog: MatDialog) { }

  confirm(msg){
    return this.matDialog.open(AlertComponent,{
      width: '500px',
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      data: {
        message: msg
      }
    });
  }
}
