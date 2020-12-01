import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  isLoggedIn = false;
  userToken: any;
  constructor(public firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient) { }
  httpOptions: {headers: HttpHeaders} ={
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  async signin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      })
    .catch(err => {
      this.eventAuthError.next(err);
    });
  }

  async signup(username: string, email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
      console.log(res.user);
      this.http.post('http://localhost:3000/api/signup', JSON.stringify({'username': username, 'email': email, 'password': password}), this.httpOptions).subscribe(res => {
        const response = res;
      });
    }).catch(err =>{
      this.eventAuthError.next(err);
    });
  }

  async logout(){
    await this.firebaseAuth.signOut();
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }

  getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged( user => {
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

  // postUser(username: string, email: string, password: string): Observable<any>{
  //   console.log("DonePost user");
  //   return this.http.post('http://localhost:3000/api/signup', {'username': username, 'email': email, 'password': password});
  // }
}
