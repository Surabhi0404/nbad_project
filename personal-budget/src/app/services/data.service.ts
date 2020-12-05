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
}
