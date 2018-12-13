import { Component, OnInit } from '@angular/core';
import { IsloggedinService } from '../services/isloggedin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn;
  constructor(private loggedIn: IsloggedinService, private router:Router) { }

  ngOnInit() {}

  

}
