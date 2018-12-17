import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UpdateImageService } from '../services/user/update-image.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userImage;

  constructor(private updateImageService: UpdateImageService) { }

  ngOnInit() {

    
  }

  updateImageProfile(e, image){
    e.preventDefault();
    const file = image.files[0];
    console.log(file);

    this.updateImageService.updateUserImage(image.files[0])
    .subscribe( event => {
      console.log(event)
      if(event.type === HttpEventType.UploadProgress){
        console.log( (event.loaded / event.total) *100 + '%' );
      }
      // localStorage.setItem('userImage', res.user.userImage);
    },
    err => console.log(err.error.msg));
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
