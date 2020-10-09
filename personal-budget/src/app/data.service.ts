import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#9A7D0A',
                '#27AE60',
                '#D0D3D4',
                '#34495E'

            ],
        }
    ],
    labels: []
};

getData(): any{
  return this.http.get('http://localhost:3000/budget');
  //.subscribe((res:any)=>{
  //   for (var i = 0; i < res.myBudget.length; i++) {
  //     this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
  //     this.dataSource.labels[i] = res.myBudget[i].title;
  //   }
  // });
  // return of(this.dataSource);
}

}
