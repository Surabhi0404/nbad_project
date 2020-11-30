import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth, private router: Router) { }

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    })
    .catch(err =>{
      this.eventAuthError.next(err);
    });
  }

  async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    }).catch(err =>{
      this.eventAuthError.next(err);
    });
  }

  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
