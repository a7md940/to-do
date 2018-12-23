import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UpdateImageService } from '../services/user/update-image.service';
import { HttpEventType } from '@angular/common/http';
import { IsloggedinService } from '../services/isloggedin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  allTodos;
  completedTodos;
  userImage;
  progressBarPercentage;
  showImageForm: boolean = false;
  invalidFileTypeErr: boolean = false;

  constructor(
    public profile: UpdateImageService, 
    public loggedIn: IsloggedinService
    ) { }

  ngOnInit() {
    this.profile.getUserTodos().subscribe( (res:any)=>{
      console.log(res);
      this.allTodos = res.allTodos;
      this.completedTodos = res.completedTodo;
    })
  }

  ngAfterViewInit(){
    // upload image file vanilla js code.
    
  }

  updateImageProfile(e, image){
    e.preventDefault();

    // call update user image service.
    this.profile.updateUserImage(image.files[0])
    .subscribe( event => {

      // if the HttpEventType is upload progress.
      if(event.type === HttpEventType.UploadProgress){
        // increase progress bar with the percentage.
        this.progressBarPercentage = Math.round((event.loaded / event.total) * 100) + '%';
      }
      // if the HttpEventType is the final response.
      else if ( event.type === HttpEventType.Response){
        
        // store the image url in the local storage.
        localStorage.setItem('userImage', event.body.user.userImage);

        // if image successfully uploaded in the server, close the form after 2 seconds.
        if(event.body.success)
          return setTimeout(() => {
            // close the form.
            this.showImageForm = false;
          }, 2000);
      }
    },
    err => console.log(err));
  }

  onInputChange(image){
    const file = image.files[0];
    
    // check if the file type is an image type.
    if(!/png|jpg|jpeg|gif/i.test(file.type))
    { 
      // show error message.
      this.invalidFileTypeErr = true;
      setTimeout(()=>{
        // close the form window after 3 seconds.
        this.invalidFileTypeErr = false;
      }, 3000);
      // return.
      return;
    }

    // if file type is valid, read the file locally in browser.
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      // put the result in a field to render in html template.
      this.userImage = reader.result;
    }
  }

}
