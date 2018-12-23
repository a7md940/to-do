import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UpdateImageService } from '../services/user/update-image.service';
import { HttpEventType } from '@angular/common/http';
import { IsloggedinService } from '../services/isloggedin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  allTodos;
  completedTodos;

  userImage;

  progressBarPercentage;
  constructor(public profile: UpdateImageService, public loggedIn: IsloggedinService) { }

  ngOnInit() {

    this.profile.getUserTodos().subscribe( (res:any)=>{
      console.log(res);
      this.allTodos = res.allTodos;
      this.completedTodos = res.completedTodo;
    })
  }

  updateImageProfile(e, image){
    e.preventDefault();
    const file = image.files[0];
    console.log(file);

    this.profile.updateUserImage(image.files[0])
    .subscribe( event => {
      console.log(event)
      if(event.type === HttpEventType.UploadProgress){
        this.progressBarPercentage = Math.round((event.loaded / event.total) * 100) + '%';
      }else if ( event.type === HttpEventType.Response){
        localStorage.setItem('userImage', event.body.user.userImage); 
      }
    },
    err => console.log(err));
  }

  onInputChange(image){
    const file = image.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      this.userImage = reader.result;
    }
  }

}
