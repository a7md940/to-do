import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { LoginService } from '../services/login.service';

import { Router } from '@angular/router';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  APIError;
  isAPIError: boolean = false;
  loginForm:FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private loginService: LoginService,
    private router: Router) { }
    
  get username (){
    return this.loginForm.get('username');
  }
  get email (){
    return this.loginForm.get('email');
  }
  get password (){
    return this.loginForm.get('password');
  }
  matcher = new MyErrorStateMatcher();

  ngOnInit() {   
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ])
    })
   }
  
  submitSignin(){
 
    // Send data to the API and get user info.
    this.loginService.login(this.loginForm.value)
    .subscribe(res => {
      console.log(res);
      if(res.success){
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('userImage', res.data.userImage)
        this.router.navigate(['/todo']);
        
        // reset the form and clean angular material errors validations.
        this.loginForm.reset();
        Object.keys(this.loginForm.controls).forEach(key => {
          this.loginForm.controls[key].setErrors(null)
        });
      }
     
    }, err =>{
      this.isAPIError = true;
      this.APIError = err.error.msg;
      setTimeout(()=>{
        this.isAPIError = false;        
      },3000);
    });

    
  }

}
