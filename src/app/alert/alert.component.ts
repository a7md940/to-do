import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
@Injectable()
export class AlertComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AlertComponent>
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}
