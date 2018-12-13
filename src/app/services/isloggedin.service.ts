import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinService {

  constructor() { }

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

  get currentUser(){
    let token = localStorage.getItem('token');
    return new JwtHelperService().decodeToken(token);;
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }
}
