import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSignedIn = false;
  authError: any;
  constructor(public firebaseService: FirebaseService ) {}

  private loginFlag = new BehaviorSubject<boolean>(false);
  loginFlag$ = this.loginFlag.asObservable();

  ngOnInit(): void {
    this.firebaseService.eventAuthError$.subscribe(data =>{
      this.authError = data;
    });
    if (localStorage.getItem('user') !== null) {
    this.isSignedIn = true;
    }
    else {
    this.isSignedIn = false;
    }
  }

  async onSignup(email: string, password: string){
    await this.firebaseService.signup(email, password);
    if (this.firebaseService.isLoggedIn) {
    this.isSignedIn = true;
    this.loginFlag.next(this.isSignedIn);
    }
  }

  async onSignin(email: string, password: string){
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn) {
    this.isSignedIn = true;
    this.loginFlag.next(this.isSignedIn);
    }
  }

  handleLogout(){
    this.isSignedIn = false;
    this.loginFlag.next(this.isSignedIn);

  }

}
