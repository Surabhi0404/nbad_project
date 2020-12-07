import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataService } from '../services/data.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../dialogs/edit/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from '../dialogs/add/add-dialog/add-dialog.component';
import { Chart } from 'chart.js';


export class BudgetElement {
  budget_id: string;
  title: number;
  expense: number;
  category: string;
  budget_date: string;
}

@Component({
  selector: 'pb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  myPieChart;
  @Input() user: any;
  displayedColumns: string[] = ['budget_id', 'title', 'expense', 'category', 'budget_date', 'actions'];
  dataSource: MatTableDataSource<BudgetElement>;
   index: string;
  id: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  public budgetSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [
  ],
        }
    ],
    labels: []
};


  constructor(public firebaseService: FirebaseService, public dialog: MatDialog, private dataService: DataService) {


  }

  ngOnInit() {
    this.dataService.getData(this.user.user_id).subscribe(
     data => { this.dataSource = new MatTableDataSource < BudgetElement > (data);
               console.log(data);
               this.dataSource.paginator = this.paginator;
               this.createChart();

      }

    );
    this.createChart();
    }

    addNew() {
      const dialogRef = this.dialog.open(AddDialogComponent, {
        data: {budget: BudgetElement, user_id: this.user.user_id }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          // After dialog is closed we're doing frontend updates
          // For add we're just pushing a new row inside DataService
          this.dataService.dataChange.value.push(this.dataService.getDialogData());
          this.refresh();
          this.createChart();
        }
      });
    }

    startEdit(i: string, budget_id: string, title: string, expense: string, category: string, budget_date: string) {
      this.id = budget_id;
      // index row is used just for debugging proposes and can be removed
      this.index = i;
      console.log(this.index);
      const dialogRef = this.dialog.open(EditDialogComponent, {
        data: {budget_id: budget_id, title: title, expense: expense, category: category, budget_date: budget_date, user_id: this.user.user_id}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          // When using an edit things are little different, firstly we find record inside DataService by id
          const foundIndex = this.dataService.dataChange.value.findIndex(x => x.budget_id === this.id);
          // Then you update that record using data from dialogData (values you enetered)
          this.dataService.dataChange.value[foundIndex] = this.dataService.getDialogData();
          // And lastly refresh table
          this.refresh();
          this.createChart();
        }
      });
    }

    deleteItem(i: string, budget_id: string, title: string, expense: string, category: string, budget_date: string) {
      this.index = i;
      this.id = budget_id;
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: {budget_id: budget_id, title: title, expense: expense, category: category, budget_date: budget_date}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 1) {
          const foundIndex = this.dataService.dataChange.value.findIndex(x => x.budget_id === this.id);
          // for delete we use splice in order to remove single object from DataService
          this.dataService.dataChange.value.splice(foundIndex, 1);
          this.refresh();
          this.createChart();

        }
      });
    }

    refresh() {
      this.dataService.getData(this.user.user_id).subscribe(
        data => { this.dataSource = new MatTableDataSource < BudgetElement > (data);
                  this.dataSource.paginator = this.paginator;
         }
       );
  }
  createChart() {
    this.dataService.getCategory(this.user.user_id).subscribe((response : any[])=> {

      this.budgetSource = {
        datasets: [
            {
                data: [],
                backgroundColor: []
            }
        ],
        labels: []
    };
      for (var i = 0 ; i < response.length; i++) {
      this.budgetSource.datasets[0].data[i] = response[i].expense;
      this.budgetSource.labels[i] = response[i].category;
      this.budgetSource.datasets[0].backgroundColor[i]= this.dynamicColors();
  }
      if (this.myPieChart) {
    this.myPieChart.destroy();
  }

      var ctx = document.getElementById('myChart');
      this.myPieChart = new Chart (ctx, {
        type: 'pie',
        data: this.budgetSource,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          plugins: {

            colorschemes: {

              scheme: 'brewer.Paired12'

            }

          }
      }
    });
  });
  }

  dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};


}
