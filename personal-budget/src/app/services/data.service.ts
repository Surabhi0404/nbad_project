import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BudgetElement } from '../about/about.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataChange: BehaviorSubject<BudgetElement[]> = new BehaviorSubject<BudgetElement[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) { }

  getData(user_id:any): Observable<any>{
    return this.http.get('http://localhost:3000/api/budget/fetch/'+user_id);
  }

  getUser(email: string): Observable<any>{
    return this.http.get('http://localhost:3000/api/user/' + email);
  }

  deleteBudget(budget_id: string): Observable<any>{
    return this.http.delete('http://localhost:3000/api/budget/delete/' + budget_id);

  }

  updateBudget(data: any): Observable<any>{
    this.dialogData = data;
    return this.http.put('http://localhost:3000/api/budget/edit', data);
  }

  getDialogData() {
    return this.dialogData;
  }

  addBudget(data: any):Observable<any>{
    this.dialogData = data;
    return this.http.post('http://localhost:3000/api/budget/add', data);
  }

  signUpUser(data: any):Observable<any>{
    return this.http.post('http://localhost:3000/api/signup', data);
  }

  getCategory(user_id: string):Observable<any>{
    return this.http.get('http://localhost:3000/api/category/'+user_id);
  }

  getMonthlyBudget(user_id: string):Observable<any>{
    return this.http.get('http://localhost:3000/api/month/budget/'+user_id);
  }
}
