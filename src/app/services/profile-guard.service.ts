import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IsloggedinService } from './isloggedin.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(private router:Router, private loggedIn: IsloggedinService) { }
  canActivate(){
    return this.loggedIn.isLoggedIn() ? true : this.router.navigate(['/signup']);
  }
}
