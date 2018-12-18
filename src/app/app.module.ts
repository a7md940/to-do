import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

// services
import { ListService } from './services/list.service';
import { AuthGuard } from './services/auth-guard.service';
import { ProfileGuard } from './services/profile-guard.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavbarComponent,
    AlertComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    FooterComponent,
    ProfileComponent,
    HeaderComponent,
    
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
      {path: '', component: HeaderComponent},
      {path: 'todo', component: ListComponent},
      {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
      {path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]}
    ])
  ],
  providers: [
    ListService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [ListComponent, AlertComponent]
})
export class AppModule { }
