import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';

// services
import { ListService } from './services/list.service';
import { AlertComponent } from './alert/alert.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavbarComponent,
    AlertComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Http Module
    HttpClientModule,
    // Angular Material Module
    MaterialModule,
    // Router Module..
    RouterModule.forRoot([
      {path: '', component: ListComponent},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
    ])
  ],
  providers: [
    ListService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ListComponent, AlertComponent]
})
export class AppModule { }
