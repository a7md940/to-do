import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { CustomConfirmComponent } from './custom-confirm.component';
import { CustomConfirmService } from './custom-confirm.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConfirmComponent,
    CustomConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ 
    ConfirmComponent,
    CustomConfirmComponent 
  ],
  providers: [
    CustomConfirmService
  ]
})
export class CustomConfirmModule { }
