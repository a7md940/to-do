import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IsloggedinService } from '../isloggedin.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateImageService {

  constructor(
    private http: HttpClient, 
    private loggedIn: IsloggedinService) { }
  
    updateUserImage(image){
      const formData = new FormData();
      formData.append('image', image);

      if(this.loggedIn.isLoggedIn()){
        const headers = new HttpHeaders({['x-auth-token']: this.loggedIn.token});

        const updateImageAPI: Observable<any> = this.http.put(
          environment.apiURL + 'api/users/image-profile', 
          formData, 
        {
          headers: headers,
          reportProgress: true,
          observe: 'events'
        });

        return updateImageAPI;
      }
    }
}
