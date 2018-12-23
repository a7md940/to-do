import { Injectable } from '@angular/core';
import { IsloggedinService } from './isloggedin.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LandingPageGuard implements CanActivate{

  constructor(private isLoggedIn: IsloggedinService, private router: Router) { }
  canActivate(){
    if(this.isLoggedIn.isLoggedIn()){
      this.router.navigate(['/todo']);
      return false;
    } 
    return true;
  }
}
