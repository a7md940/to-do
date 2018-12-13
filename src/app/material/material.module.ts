import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatDialogModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatInputModule,
    Material.MatFormFieldModule
  ],
  exports: [
    Material.MatDialogModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatInputModule,
    Material.MatFormFieldModule
  ]
})
export class MaterialModule { }
