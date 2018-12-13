import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IsloggedinService } from './isloggedin.service';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient, private isloged: IsloggedinService) { }
  URL = 'http://localhost:3000/api/users/todo';

  private tokenHeader(){
    let token = localStorage.getItem('token');
    let header = new HttpHeaders({['x-auth-token']: token});
    return header;
  }

  getAllToDos(){
    if(this.isloged.isLoggedIn()){
      const getTODO:Observable<any> = this.http.get(this.URL,{headers: this.tokenHeader()}); 
      return getTODO;
    }
  }

  getOneToDo(toDoId){
    if(this.isloged.isLoggedIn()){
      const getOneTODO:Observable<any> = this.http.get(this.URL + '?toDoId='+toDoId,{headers: this.tokenHeader()}); 
      return getOneTODO;
    }
  }

  addToDo(toDo){
    if(this.isloged.isLoggedIn()){
    const addToDo:Observable<any> = this.http.post(this.URL, toDo, {headers: this.tokenHeader()});
    return addToDo;
    }
  }

  deleteToDo(toDoId){
    if(this.isloged.isLoggedIn()){
      const deleteToDo:Observable<any> = this.http.delete(this.URL +'/'+ toDoId, {headers: this.tokenHeader()});
      return deleteToDo;
      }
  }
}
