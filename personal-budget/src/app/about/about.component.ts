import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'pb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  constructor(public firebaseService: FirebaseService, private budget: DataService) { }

  ngOnInit(): void {
    this.budget.getData().subscribe(data => {
      console.log(data);
    });
  }

}
