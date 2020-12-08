import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  public currentUser: any;
  isLoggedIn = false;
  userToken: any;
  constructor(public firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient, private dataService: DataService) { }
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch(err => {
        this.eventAuthError.next(err);
      });
  }

  async signup(username: string, email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
        var user = { 'username': username, 'email': email, 'password': password };
        this.dataService.signUpUser(user).subscribe();
      }).catch(err => {
        this.eventAuthError.next(err);
      });
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(idToken => {
            this.userToken = idToken;
            localStorage.setItem('jwt', this.userToken);
            resolve(idToken);
          });
        }
      });
    })
  }
}
