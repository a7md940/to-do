import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  APIError = false;
  resError;
  constructor(private formBuilder: FormBuilder, 
    private signUpService: SignupService,
    private router: Router) { }
  signupForm:FormGroup;
  get username (){
    return this.signupForm.get('username');
  }
  get email (){
    return this.signupForm.get('email');
  }
  get password (){
    return this.signupForm.get('password');
  }
  matcher = new MyErrorStateMatcher();

  ngOnInit() { 
    this.signupForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      username: new FormControl('',[
        Validators.required,
        Validators.minLength(3)
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ])
    })
   }
  
  submitSignUp(){
    // Send data to the API.
    this.signUpService.signupNewUser(this.signupForm.value)
    .subscribe(res => {
      console.log(res);
      
      if(res.token){
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.data._id);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('userImage', res.data.userImage)
         // reset the form and clean angular material errors validations.
        this.signupForm.reset();
        Object.keys(this.signupForm.controls).forEach(key => {
          this.signupForm.controls[key].setErrors(null)
        });
        this.router.navigate(['']);
      }
    }, err =>{
      this.APIError = true;
      this.resError = err.error.msg;
      setTimeout(()=>{
        this.APIError = false;
      },3000)
    });

   
  }

}
