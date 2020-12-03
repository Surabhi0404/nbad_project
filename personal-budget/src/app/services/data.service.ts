import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(user_id:any): Observable<any>{
    return this.http.get('http://localhost:3000/api/budget/fetch/'+user_id);
  }

  getUser(email: string): Observable<any>{
    return this.http.get('http://localhost:3000/api/user/' + email);
  }
}
