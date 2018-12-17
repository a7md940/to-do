import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  readonly URL = 'api/users/signup';
  
  constructor(private http: HttpClient) { }
  signupNewUser(user){
    const signUpAPI: Observable<any> = this.http.post(this.URL, user);
    return signUpAPI;
  }
}
