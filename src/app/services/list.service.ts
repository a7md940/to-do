import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IsloggedinService } from './isloggedin.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient, private isloged: IsloggedinService) { }
  URL = environment.apiURL + 'api/users/todo';

  private tokenHeader(){
    return new HttpHeaders({['x-auth-token']: localStorage.getItem('token')});
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

  updateToDo(toDoId, data){
    if(this.isloged.isLoggedIn()){
      const updateToDo:Observable<any> = this.http.put(this.URL, {toDoId: toDoId, newToDo: data} , {headers: this.tokenHeader()});
      return updateToDo;
    }
  }
}
