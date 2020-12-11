import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BudgetElement } from '../dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API_URL = 'http://159.65.239.243:3000';
  dataChange: BehaviorSubject<BudgetElement[]> = new BehaviorSubject<BudgetElement[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) { }

  getData(user_id: any): Observable<any> {
    return this.http.get(this.API_URL + '/api/budget/fetch/' + user_id);
  }

  getUser(email: string): Observable<any> {
    return this.http.get(this.API_URL + '/api/user/' + email);
  }

  deleteBudget(budget_id: string): Observable<any> {
    return this.http.delete(this.API_URL + '/api/budget/delete/' + budget_id);

  }

  updateBudget(data: any): Observable<any> {
    this.dialogData = data;
    return this.http.put(this.API_URL + '/api/budget/edit', data);
  }

  getDialogData() {
    return this.dialogData;
  }

  addBudget(data: any): Observable<any> {
    this.dialogData = data;
    return this.http.post(this.API_URL + '/api/budget/add', data);
  }

  signUpUser(data: any): Observable<any> {
    return this.http.post(this.API_URL + '/api/signup', data);
  }

  getCategory(user_id: string): Observable<any> {
    return this.http.get(this.API_URL + '/api/category/' + user_id);
  }

  getMonthlyBudget(user_id: string): Observable<any> {
    return this.http.get(this.API_URL + '/api/month/budget/' + user_id);
  }

  getCategoryExpense(user_id: string): Observable<any> {
    return this.http.get(this.API_URL + '/api/month/expense/' + user_id);
  }
}
