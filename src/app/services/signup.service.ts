import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  readonly URL = 'http://localhost:3000/api/users/signup';
  
  constructor(private http: HttpClient) { }
  signupNewUser(user){
    const signUpAPI: Observable<any> = this.http.post(this.URL, user);
    return signUpAPI;
  }
}
