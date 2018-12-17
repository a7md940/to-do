import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly URL = 'api/users/login';
  constructor(private http: HttpClient) { }
  login(user){
    const loginAPI: Observable<any> = this.http.post(this.URL,user);
    return loginAPI;
  }
}
