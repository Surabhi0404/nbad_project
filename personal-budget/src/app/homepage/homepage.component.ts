import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  @Output() isLogout = new EventEmitter<void>();
  constructor(public firebaseService: FirebaseService) {   }

  ngOnInit(): void {

  }

  logout():void{
    this.firebaseService.logout();
    this.isLogout.emit();

  }




}
