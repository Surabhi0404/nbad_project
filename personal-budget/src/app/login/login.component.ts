import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import {Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSignedIn = false;
  authError: any;
  constructor(public firebaseService: FirebaseService, private router: Router ) {}

  ngOnInit(): void {
    this.firebaseService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
    // if (localStorage.getItem('user') !== null) {
    // this.isSignedIn = true;
    // }
    // else {
    // this.isSignedIn = false;
    // }
    window.setTimeout(() => {
    $('.alert').fadeTo(500, 0).slideUp(500, function(){
        $(this).remove();
    });
}, 5000);
  }

  async onSignup(username: string, email: string, password: string){
    await this.firebaseService.signup(username, email, password);
    if (this.firebaseService.isLoggedIn) {
    this.isSignedIn = true;
    //console.log(await this.firebaseService.postUser(username, email, password));
    }
  }

  async onSignin(email: string, password: string){
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn) {
    this.isSignedIn = true;
    }
  }

  handleLogout(){
    this.isSignedIn = false;
    this.authError="";
    this.router.navigate(['/']);
  }


}
