import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataService } from '../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface BudgetElement {
  budget_id: string;
  title: number;
  expense: number;
  category_id: string;
  add_date: string;
}

@Component({
  selector: 'pb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  @Input() user: any;
  displayedColumns: string[] = ['budget_id', 'title', 'expense', 'category_id', 'add_date', 'actions'];
  dataSource: MatTableDataSource<BudgetElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public firebaseService: FirebaseService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData(this.user.user_id).subscribe(
     data =>{ this.dataSource = new MatTableDataSource < BudgetElement > (data);
              this.dataSource.paginator = this.paginator;
      }
    );
    }
  }

