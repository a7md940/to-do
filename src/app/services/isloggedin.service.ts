import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinService {
  constructor(private router: Router) { }

  isLoggedIn(){
    let helper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if(!token)
      return false;
    
    let expirationDate = helper.getTokenExpirationDate(token);
    let isExpired = helper.isTokenExpired(token);
    let payload = helper.decodeToken(token);

    return !isExpired;
  }

  get token (){return localStorage.getItem('token')}

  get currentUser(){
    return {
      user: new JwtHelperService().decodeToken(localStorage.getItem('token')),
      userImage: environment.apiURL + localStorage.getItem('userImage')
   };
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userImage');
    this.router.navigate(['/']);
  }
}
