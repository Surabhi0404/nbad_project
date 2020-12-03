import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'pb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  constructor(public firebaseService: FirebaseService) { }
  @Input() budget: any;

  ngOnInit(): void {
    // this.budget.getData().subscribe(data => {
    //   console.log(data);
    // });

    console.log(this.budget);

  }

}
