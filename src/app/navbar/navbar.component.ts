import { Component, OnInit } from '@angular/core';
import { IsloggedinService } from '../services/isloggedin.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  settings: boolean = false;

  constructor(
    public loggedIn: IsloggedinService, 
    private router:Router,
    private loginService: LoginService) { }

  ngOnInit() {
    // if(this.loggedIn.isLoggedIn()){
    //   document.querySelector('body').addEventListener('click', (e)=>{
        
    //     if(this.settings == true){
    //       this.settings = false;
    //       console.log(this.settings, 'body');
    //     }
  
    //     else{document.querySelector('.settings-toggler').addEventListener('click', (e)=>{
    //       e.stopPropagation()
    //         this.settings = true;
    //         console.log(this.settings, 'button');
    //     });
    //   }
    //   }, true);
    // }
  }

  logout(e: Event){
    e.stopPropagation();
    this.loggedIn.logOut();
    this.settings = false;
  }

  openSettings(){
    if(this.settings)
      this.settings = false;
    else
      this.settings = true;
  }

}
