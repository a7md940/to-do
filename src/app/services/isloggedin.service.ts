import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IsloggedinService {
  readonly apiURL: string = 'http://localhost:3000/' 

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

  get token (){return localStorage.getItem('token')}

  get currentUser(){
    return {
      user: new JwtHelperService().decodeToken(localStorage.getItem('token')),
      userImage: localStorage.getItem('userImage')
   };
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('userImage');
  }
}
